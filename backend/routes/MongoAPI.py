from fastapi import APIRouter, HTTPException
from bson import ObjectId
from db.connection import (
    quizzes_collection,
    preguntas_collection,
    results_collection,
    docentes_collection,
    usuarios_collection,
    colegios_collection,
    aulas_collection,
    estudiantes_collection,
    intentos_quiz_collection,
    respuestas_estudiante_collection,
    opciones_collection,
    resultados_aula_collection,
)

router = APIRouter(prefix="/mongo", tags=["Mongo API"])


def serialize_doc(doc: dict) -> dict:
    doc = dict(doc)
    doc["_id"] = str(doc["_id"])
    return doc


def get_collection(coleccion: str):
    mapping = {
        "quizzes": quizzes_collection,
        "preguntas": preguntas_collection,
        "results": results_collection,
        "docentes": docentes_collection,
        "usuarios": usuarios_collection,
        "colegios": colegios_collection,
        "aulas": aulas_collection,
        "estudiantes": estudiantes_collection,
        "intentos_quiz": intentos_quiz_collection,
        "respuestas_estudiante": respuestas_estudiante_collection,
        "opciones": opciones_collection,
        "resultados_aula": resultados_aula_collection,
    }
    return mapping.get(coleccion)


@router.get("/{coleccion}")
async def listar_todos(coleccion: str):
    coleccion_ref = get_collection(coleccion)
    if coleccion_ref is None:
        raise HTTPException(status_code=400, detail="Coleccion no valida")
    docs = await coleccion_ref.find().to_list(1000)
    return [serialize_doc(d) for d in docs]


@router.get("/{coleccion}/{id}")
async def obtener_por_id(coleccion: str, id: str):
    coleccion_ref = get_collection(coleccion)
    if coleccion_ref is None:
        raise HTTPException(status_code=400, detail="Coleccion no valida")
    doc = await coleccion_ref.find_one({"_id": ObjectId(id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    return serialize_doc(doc)


@router.post("/{coleccion}")
async def crear_documento(coleccion: str, data: dict):
    coleccion_ref = get_collection(coleccion)
    if coleccion_ref is None:
        raise HTTPException(status_code=400, detail="Coleccion no valida")
    result = await coleccion_ref.insert_one(data)
    nuevo_doc = await coleccion_ref.find_one({"_id": result.inserted_id})
    return {"message": "Documento creado", "data": serialize_doc(nuevo_doc)}


@router.put("/{coleccion}/{id}")
async def actualizar_documento(coleccion: str, id: str, data: dict):
    coleccion_ref = get_collection(coleccion)
    if coleccion_ref is None:
        raise HTTPException(status_code=400, detail="Coleccion no valida")
    result = await coleccion_ref.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="No se actualizo ningun documento")
    updated_doc = await coleccion_ref.find_one({"_id": ObjectId(id)})
    return {"message": "Documento actualizado", "data": serialize_doc(updated_doc)}


@router.delete("/{coleccion}/{id}")
async def eliminar_documento(coleccion: str, id: str):
    coleccion_ref = get_collection(coleccion)
    if coleccion_ref is None:
        raise HTTPException(status_code=400, detail="Coleccion no valida")
    result = await coleccion_ref.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    return {"message": "Documento eliminado correctamente"}
