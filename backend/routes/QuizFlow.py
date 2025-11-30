import os
import re
from datetime import datetime
from typing import List, Literal, Optional

from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from db.connection import (
    quizzes_collection,
    preguntas_collection,
    opciones_collection,
    intentos_quiz_collection,
    respuestas_estudiante_collection,
)

# Gemini (opcional)
try:
    import google as genai
except Exception:  # pragma: no cover - dependencia opcional
    genai = None

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if genai and GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

router = APIRouter(prefix="/quiz", tags=["Quiz Flow"])


def serialize_id(value):
    if isinstance(value, ObjectId):
        return str(value)
    return value


def serialize_doc(doc: dict) -> dict:
    return {k: serialize_id(v) for k, v in doc.items()}


class RespuestaPayload(BaseModel):
    id_pregunta: str
    respuesta: str
    tipo: Optional[Literal["opcion_multiple", "abierta"]] = None


class SubmitQuizPayload(BaseModel):
    pin: str
    estudiante_nombre: str
    respuestas: List[RespuestaPayload]


class GenerarQuizPayload(BaseModel):
    curso: str
    tema: str
    cantidad_preguntas: int
    puntos_por_pregunta: int = 10


@router.get("/pin/{pin}")
async def get_quiz_by_pin(pin: str):
    quiz = await quizzes_collection.find_one({"pin_acceso": pin})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz no encontrado")
    return serialize_doc(quiz)


@router.get("/{quiz_id}/detalle")
async def get_quiz_detalle(quiz_id: str):
    try:
        oid = ObjectId(quiz_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID invalido")

    quiz = await quizzes_collection.find_one({"_id": oid})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz no encontrado")

    preguntas = await preguntas_collection.find({"id_quiz": oid}).to_list(500)
    pregunta_ids = [p["_id"] for p in preguntas]
    opciones = []
    if pregunta_ids:
        opciones = await opciones_collection.find(
            {"id_pregunta": {"$in": pregunta_ids}}
        ).to_list(2000)
    opciones_por_pregunta = {}
    for op in opciones:
        opciones_por_pregunta.setdefault(op["id_pregunta"], []).append(serialize_doc(op))

    preguntas_serializadas = []
    for p in preguntas:
        ps = serialize_doc(p)
        ps["opciones"] = opciones_por_pregunta.get(p["_id"], [])
        preguntas_serializadas.append(ps)

    return {
        "quiz": serialize_doc(quiz),
        "preguntas": preguntas_serializadas,
    }


def _retroalimentacion(pregunta: dict, respuesta: str, es_correcta: bool) -> str:
    """Genera retroalimentacion; usa Gemini si hay API_KEY y libreria instalada."""
    if es_correcta:
        return "Respuesta correcta. Buen trabajo."

    correcta = pregunta.get("respuesta_correcta", "")
    tipo = (pregunta.get("tipo") or "").lower()

    if not correcta:
        return "Esta pregunta aún no tiene configurada una respuesta correcta. Pide a tu docente que la revise."

    # Fallback generico
    fallback = (
        f"La respuesta correcta era '{correcta}'. Repasa las opciones y sus diferencias."
        if tipo == "opcion_multiple"
        else f"La respuesta esperada era '{correcta}'. Revisa el procedimiento para llegar a ese resultado."
    )

    if not (genai and GEMINI_API_KEY):
        return fallback

    prompt = f"""
Eres un tutor escolar. Da retroalimentacion breve (<=60 palabras) en español.
Pregunta: {pregunta.get('enunciado','')}
Tipo: {tipo or 'abierta'}
Respuesta correcta esperada: {correcta}
Respuesta del estudiante: {respuesta}
Di qué faltó o cómo mejorar, con tono empático y concreto. Si es opción múltiple, explica por qué la correcta lo es.
"""
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        resp = model.generate_content(prompt)
        texto = resp.text.strip() if resp and getattr(resp, "text", None) else ""
        return texto or fallback
    except Exception:
        return fallback


def _pasos_guia(pregunta: dict, correcta: str) -> list[str]:
    enunciado = (pregunta.get("enunciado") or "").strip()
    tipo = (pregunta.get("tipo") or "abierta").lower()

    # Intentar dar procedimiento matematico para ecuaciones lineales sencillas con x
    def pasos_ecuacion_lineal(enun: str):
        texto = enun.replace(" ", "").lower()
        m = re.search(r"([-+]?\\d*\\.?\\d+)?x\\s*([+\\-]\\s*\\d+\\.?\\d*)?\\s*=\\s*([-+]?\\d+\\.?\\d*)", texto)
        if not m:
            return None
        a_raw, b_raw, c_raw = m.groups()
        try:
            a = float(a_raw) if a_raw not in (None, "", "+", "-") else (1.0 if a_raw != "-" else -1.0)
            b = float((b_raw or "0").replace(" ", ""))
            c = float(c_raw)
            x_val = (c - b) / a
        except Exception:
            return None
        pasos = [
            f"1) Partimos de la ecuacion: {enunciado}",
            f"2) Aisla x restando {b} a ambos lados: {a}x = {c} - {b}",
            f"3) Divide ambos lados entre {a}: x = ({c} - {b}) / {a}",
            f"4) Calcula: x = {x_val}",
            f"5) Verifica sustituyendo x en la ecuacion original para comprobar que obtienes {c}.",
        ]
        return pasos

    pasos_lineal = pasos_ecuacion_lineal(enunciado)
    if pasos_lineal:
        return pasos_lineal

    # Generico
    pasos = [
        f"1) Lee la pregunta: {enunciado[:80]}" if enunciado else "1) Lee la pregunta completa.",
        "2) Identifica los datos conocidos y la incognita.",
    ]
    if tipo == "opcion_multiple":
        pasos.append("3) Evalua cada opcion contra la definicion/regla del tema y descarta las que no cumplen.")
    else:
        pasos.append("3) Despeja la incognita aplicando la formula o propiedad del tema.")
    pasos.append(f"4) Sustituye y comprueba que el resultado coincide con: {correcta or 'la solucion esperada'}.")
    pasos.append("5) Si no coincide, revisa la operacion donde pudiste equivocarte y repite el calculo.")
    return pasos


def _pin():
    import random
    import string

    return "".join(random.choices(string.ascii_uppercase + string.digits, k=5))


@router.post("/{quiz_id}/submit")
async def submit_quiz(quiz_id: str, payload: SubmitQuizPayload):
    try:
        oid = ObjectId(quiz_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID invalido")

    quiz = await quizzes_collection.find_one({"_id": oid})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz no encontrado")
    if quiz.get("pin_acceso") != payload.pin:
        raise HTTPException(status_code=403, detail="PIN incorrecto para este quiz")

    # Preparar mapa de preguntas
    pregunta_ids = [ObjectId(r.id_pregunta) for r in payload.respuestas]
    preguntas_db = await preguntas_collection.find({"_id": {"$in": pregunta_ids}}).to_list(
        500
    )
    preguntas_map = {str(p["_id"]): p for p in preguntas_db}

    resultados_detalle = []
    correctas = 0
    total = max(len(payload.respuestas), 1)

    for r in payload.respuestas:
        p = preguntas_map.get(r.id_pregunta)
        if not p:
            # si no se encuentra, marcar incorrecta
            resultados_detalle.append(
                {
                    "id_pregunta": r.id_pregunta,
                    "respuesta": r.respuesta,
                    "es_correcta": False,
                    "retroalimentacion": "Pregunta no encontrada en el banco.",
                }
            )
            continue

        tipo = (r.tipo or p.get("tipo") or "").lower()
        correcta_raw = (p.get("respuesta_correcta") or "").strip()
        respuesta_usuario_raw = (r.respuesta or "").strip()
        correcta = correcta_raw.lower().replace(" ", "")
        respuesta_usuario = respuesta_usuario_raw.lower().replace(" ", "")

        es_correcta = False
        if correcta_raw:
            if tipo == "opcion_multiple":
                # Evaluar por igualdad de texto exacta
                es_correcta = respuesta_usuario == correcta
            else:
                # Evaluacion para preguntas abiertas evitando falsos positivos por substring
                es_correcta = respuesta_usuario == correcta
                if not es_correcta:
                    try:
                        correcta_num = float(correcta_raw.replace(",", "."))
                        resp_num = float(respuesta_usuario_raw.replace(",", "."))
                        es_correcta = abs(correcta_num - resp_num) < 1e-6
                    except ValueError:
                        es_correcta = False

        if es_correcta:
            correctas += 1

        retro = _retroalimentacion(p, r.respuesta, es_correcta)
        pasos = _pasos_guia(p, correcta_raw)
        resultados_detalle.append(
            {
                "id_pregunta": r.id_pregunta,
                "respuesta": r.respuesta,
                "es_correcta": es_correcta,
                "retroalimentacion": retro,
                "pasos": pasos,
            }
        )

    puntaje = round((correctas / total) * 10, 2)
    ahora = datetime.utcnow()

    intento_doc = {
        "id_quiz": oid,
        "pin": payload.pin,
        "estudiante_nombre": payload.estudiante_nombre,
        "fecha_inicio": ahora,
        "fecha_envio": ahora,
        "puntaje_total": puntaje,
        "evaluado_por_IA": True,
    }
    intento_result = await intentos_quiz_collection.insert_one(intento_doc)

    respuestas_docs = []
    for det in resultados_detalle:
        respuestas_docs.append(
            {
                "id_intento": intento_result.inserted_id,
                "id_pregunta": ObjectId(det["id_pregunta"])
                if ObjectId.is_valid(det["id_pregunta"])
                else det["id_pregunta"],
                "respuesta": det["respuesta"],
                "es_correcta": det["es_correcta"],
                "retroalimentacion_ia": det["retroalimentacion"],
                "pasos_ia": det.get("pasos", []),
            }
        )
    if respuestas_docs:
        await respuestas_estudiante_collection.insert_many(respuestas_docs)

    return {
        "puntaje": puntaje,
        "correctas": correctas,
        "total": total,
        "intento_id": str(intento_result.inserted_id),
        "detalle": resultados_detalle,
    }


@router.get("/pin/{pin}/resultados")
async def resultados_por_pin(pin: str):
    quiz = await quizzes_collection.find_one({"pin_acceso": pin})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz no encontrado")
    intentos = await intentos_quiz_collection.find({"id_quiz": quiz["_id"]}).to_list(1000)
    intentos_serializados = [serialize_doc(i) for i in intentos]
    return {"quiz": serialize_doc(quiz), "intentos": intentos_serializados}


def _generar_preguntas_base(curso: str, tema: str, cantidad: int, puntos: int):
    preguntas = []
    opciones = []
    for i in range(cantidad):
        enunciado = f"{tema.capitalize()}: aplica el concepto en un ejemplo. Pregunta {i+1}."
        respuesta_correcta = f"Respuesta modelo {i+1}"
        pid = ObjectId()
        preguntas.append(
            {
                "_id": pid,
                "enunciado": enunciado,
                "tipo": "opcion_multiple",
                "respuesta_correcta": respuesta_correcta.lower(),
                "puntos": puntos,
                "curso": curso,
                "tema": tema,
            }
        )
        opciones.extend(
            [
                {"_id": ObjectId(), "id_pregunta": pid, "texto_opcion": respuesta_correcta, "es_correcta": True},
                {"_id": ObjectId(), "id_pregunta": pid, "texto_opcion": f"Distractor {i+1}A", "es_correcta": False},
                {"_id": ObjectId(), "id_pregunta": pid, "texto_opcion": f"Distractor {i+1}B", "es_correcta": False},
                {"_id": ObjectId(), "id_pregunta": pid, "texto_opcion": f"Distractor {i+1}C", "es_correcta": False},
            ]
        )
    return preguntas, opciones


@router.post("/generar")
async def generar_quiz(payload: GenerarQuizPayload):
    if payload.cantidad_preguntas <= 0 or payload.cantidad_preguntas > 30:
        raise HTTPException(status_code=400, detail="cantidad_preguntas debe estar entre 1 y 30")
    if payload.puntos_por_pregunta <= 0:
        raise HTTPException(status_code=400, detail="puntos_por_pregunta debe ser mayor que 0")

    pin = _pin()
    quiz_doc = {
        "titulo": f"{payload.curso} - {payload.tema}".strip(),
        "descripcion": f"Generado por IA para el curso {payload.curso}, tema {payload.tema}",
        "curso": payload.curso,
        "tema": payload.tema,
        "pin_acceso": pin,
        "fecha_creacion": datetime.utcnow(),
    }
    quiz_result = await quizzes_collection.insert_one(quiz_doc)

    preguntas, opciones = _generar_preguntas_base(
        payload.curso, payload.tema, payload.cantidad_preguntas, payload.puntos_por_pregunta
    )
    for p in preguntas:
        p["id_quiz"] = quiz_result.inserted_id
    if preguntas:
        await preguntas_collection.insert_many(preguntas)
    if opciones:
        await opciones_collection.insert_many(opciones)

    preguntas_serializadas = []
    for p in preguntas:
        ps = serialize_doc(p)
        ps["opciones"] = [serialize_doc(o) for o in opciones if o["id_pregunta"] == p["_id"]]
        preguntas_serializadas.append(ps)

    quiz_serializado = serialize_doc({**quiz_doc, "_id": quiz_result.inserted_id})

    return {"pin": pin, "quiz": quiz_serializado, "preguntas": preguntas_serializadas}
