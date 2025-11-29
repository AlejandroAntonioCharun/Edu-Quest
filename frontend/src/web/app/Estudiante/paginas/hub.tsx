import { useEffect, useMemo, useState } from "react";
import {
  API_BASE,
  fetchCollection,
  getQuizByPin,
  getQuizDetalle,
  submitQuiz,
} from "../../api";
import PreguntaModulo from "../Componentes/PreguntaModulo";
import QuizResults, { type PreguntaResultado } from "../Componentes/QuizResults";
import { RevisionPregunta, type RecursoIA } from "../Componentes/RevisionPregunta";

type Quiz = { _id: string; titulo?: string; descripcion?: string; pin_acceso?: string };
type Pregunta = {
  _id: string;
  enunciado: string;
  tipo?: string;
  respuesta_correcta?: string;
  opciones?: Opcion[];
};
type Opcion = { _id: string; texto_opcion?: string; es_correcta?: boolean; id_pregunta?: string; texto?: string };

type ResultadoEnvio = {
  puntaje: number;
  correctas: number;
  total: number;
  detalle: { id_pregunta: string; respuesta: string; es_correcta: boolean; retroalimentacion: string; pasos?: string[] }[];
};

const coleccionesEstudiante = [
  "quizzes",
  "preguntas",
  "aulas",
  "intentos_quiz",
  "respuestas_estudiante",
  "opciones",
  "resultados_aula",
];

export default function EstudianteHub() {
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState<Record<string, any[]>>({});
  const [pin, setPin] = useState("");
  const [nombre, setNombre] = useState("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [detalle, setDetalle] = useState<{ quiz: Quiz; preguntas: Pregunta[] } | null>(null);
  const [paso, setPaso] = useState<1 | 2 | 3 | 4>(1);
  const [resultado, setResultado] = useState<ResultadoEnvio | null>(null);
  const [mensaje, setMensaje] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tracking, setTracking] = useState<
    Record<string, { respuesta: string; tiempo: number; puntaje: number; correcta: boolean }>
  >({});
  const [explicacionIA, setExplicacionIA] = useState("");
  const [pasosIA, setPasosIA] = useState("");
  const [recursosIA, setRecursosIA] = useState<RecursoIA[]>([]);
  const [temasIA, setTemasIA] = useState<string[]>([]);
  const [mostrarRuta, setMostrarRuta] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      setLoadingData(true);
      try {
        const entradas = await Promise.all(
          coleccionesEstudiante.map(async (c) => [c, await fetchCollection<any[]>(c)] as [string, any[]])
        );
        const mapa: Record<string, any[]> = {};
        entradas.forEach(([key, val]) => (mapa[key] = val));
        setData(mapa);
      } catch (err: any) {
        setMensaje(err.message || "Error cargando datos");
      } finally {
        setLoadingData(false);
      }
    };
    cargar();
  }, []);

  const totalQuizzes = data.quizzes?.length || 0;
  const totalPreguntas = data.preguntas?.length || 0;
  const totalIntentos = data.intentos_quiz?.length || 0;
  const totalRespuestas = data.respuestas_estudiante?.length || 0;

  const preguntasConOpciones = useMemo(() => detalle?.preguntas || [], [detalle]);

  const manejarPin = async () => {
    try {
      setMensaje("");
      const q = (await getQuizByPin(pin.trim())) as Quiz;
      setQuiz(q);
      setPaso(2);
    } catch (err: any) {
      setMensaje(err.message || "PIN incorrecto");
    }
  };

  const manejarNombre = async () => {
    if (!quiz?._id) return;
    try {
      const det = (await getQuizDetalle(quiz._id)) as { quiz: Quiz; preguntas: Pregunta[] };
      setDetalle(det);
      setPaso(3);
      setCurrentIndex(0);
      setTracking({});
    } catch (err: any) {
      setMensaje(err.message || "No se pudo cargar el quiz");
    }
  };

  const manejarGuardarRespuesta = (
    respuesta: string,
    numero: number,
    esCorrecta: boolean,
    tiempoUsado: number,
    puntajeObtenido: number
  ) => {
    const q = preguntasConOpciones[numero - 1];
    setTracking((prev) => ({
      ...prev,
      [q._id]: { respuesta, tiempo: tiempoUsado, puntaje: puntajeObtenido, correcta: esCorrecta },
    }));
    if (numero === preguntasConOpciones.length) {
      enviarQuiz();
    }
  };

  const enviarQuiz = async () => {
    if (!detalle?.quiz?._id) return;
    try {
      setMensaje("Enviando y evaluando respuestas...");
      const payload = {
        pin,
        estudiante_nombre: nombre,
        respuestas: preguntasConOpciones.map((p) => ({
          id_pregunta: p._id,
          respuesta: tracking[p._id]?.respuesta || "",
          tipo: p.tipo,
        })),
      };
      const res = (await submitQuiz(detalle.quiz._id, payload)) as ResultadoEnvio;
      setResultado(res);
      setPaso(4);
      setMensaje("Retroalimentacion lista.");
      setMostrarRuta(false);

      const temas = preguntasConOpciones
        .filter((p) => !(res.detalle || []).find((d: any) => d.id_pregunta === p._id && d.es_correcta))
        .map((p) => (p.tipo || "tema").toString().toUpperCase() + " - " + (p.enunciado?.slice(0, 40) || ""));
      setTemasIA(temas.length ? temas : ["Repaso general"]);
      setExplicacionIA(
        res.detalle?.map((d: any) => d.retroalimentacion).join("\n\n") ||
          "La IA generara una explicacion personalizada para tus respuestas."
      );
      setPasosIA("1) Revisa cada explicacion.\n2) Practica 3 ejercicios similares.\n3) Vuelve a intentar el quiz.");
      setRecursosIA([
        {
          icon: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=60",
          titulo: "Guia rapida del tema",
          url: "https://www.khanacademy.org/",
          descripcion: "Refuerza el concepto clave con teoria y ejemplos",
        },
        {
          icon: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=60",
          titulo: "Video explicativo",
          url: "https://www.youtube.com/playlist?list=PLrweXOC7Jb4CzGo0b8b1K5ohuaXMljC1x",
          descripcion: "Clase rapida para practicar el tema en minutos",
        },
      ]);
    } catch (err: any) {
      setMensaje(err.message || "No se pudo enviar el quiz");
    }
  };

  const preguntasResultado: PreguntaResultado[] =
    resultado && detalle
      ? preguntasConOpciones.map((p) => {
          const det = resultado.detalle.find((d: any) => d.id_pregunta === p._id);
          const esCorrecta = !!det?.es_correcta;
          const retro = det?.retroalimentacion;
          const pasos = (det?.pasos as string[] | undefined) || [];
          const recos = esCorrecta || !retro ? [] : [{ tipo: "Explicacion IA", url: "https://ai.google.dev/" }];
          return {
            id: p._id,
            pregunta: p.enunciado,
            respuestaUsuario: det?.respuesta || tracking[p._id]?.respuesta || "",
            respuestaCorrecta: p.respuesta_correcta || "",
            correcta: esCorrecta,
            puntajeObtenido: esCorrecta ? 1 : 0,
            feedback: retro
              ? {
                  comentario: retro,
                  nivel_aprendizaje: esCorrecta ? "Dominado" : "En progreso",
                  pasos_ia: pasos,
                  recursos_sugeridos: recos,
                }
              : null,
          };
        })
      : [];

  const pasosPorPregunta = preguntasResultado
    .map((pr) => ({
      pregunta: pr.pregunta,
      pasos: pr.feedback?.pasos_ia || [],
    }))
    .filter((p) => p.pasos.length > 0);

  const preguntaActual = preguntasConOpciones[currentIndex];

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-2">
        <p className="text-gray-900 text-3xl font-black leading-tight">Centro de estudiante</p>
        <p className="text-gray-600">
          Conectado al backend en <span className="font-mono text-sm text-indigo-700">{API_BASE}</span>
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard titulo="Quizzes" valor={totalQuizzes} detalle="Total en la base" />
        <StatCard titulo="Preguntas" valor={totalPreguntas} detalle="En todos los quizzes" />
        <StatCard titulo="Intentos" valor={totalIntentos} detalle="Registrados" />
        <StatCard titulo="Respuestas" valor={totalRespuestas} detalle="Enviadas por estudiantes" />
      </section>

      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Presentar un quiz</h2>
          <span className="text-sm text-gray-500">Paso {paso} de 4</span>
        </div>

        {paso === 1 && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">PIN de acceso</label>
            <input
              className="w-full h-12 rounded-lg border border-gray-300 px-4 text-black"
              placeholder="Ej: AB123"
              value={pin}
              onChange={(e) => setPin(e.target.value.trim())}
            />
            <button onClick={manejarPin} className="w-full h-11 rounded-lg bg-indigo-600 text-white font-semibold ">
              Validar PIN
            </button>
          </div>
        )}

        {paso === 2 && quiz && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
              <p className="text-sm font-medium text-indigo-900">Quiz: {quiz.titulo || "Sin titulo"}</p>
              <p className="text-sm text-indigo-800">{quiz.descripcion}</p>
            </div>
            <label className="block text-sm font-semibold text-gray-700">Tu nombre</label>
            <input
              className="w-full h-12 rounded-lg border border-gray-300 px-4 text-black"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <button
              onClick={manejarNombre}
              disabled={!nombre.trim()}
              className="w-full h-11 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Continuar
            </button>
          </div>
        )}

        {paso === 3 && detalle && preguntaActual && (
          <PreguntaModulo
            numeroPregunta={currentIndex + 1}
            totalPreguntas={preguntasConOpciones.length}
            pregunta={preguntaActual.enunciado}
            enunciado={preguntaActual.enunciado}
            tiempoLimiteSegundos={60}
            respuestaInicial={tracking[preguntaActual._id]?.respuesta || ""}
            validarRespuesta={(r) => {
              const correcta = (preguntaActual.respuesta_correcta || "").toLowerCase().trim();
              return (r || "").toLowerCase().trim() === correcta;
            }}
            puntaje={10}
            opciones={(preguntaActual.opciones || []).map((o) => o.texto_opcion || o.texto || "")}
            onEnviar={(respuesta, numero, esCorrecta, tiempoUsado, puntajeObtenido) =>
              manejarGuardarRespuesta(respuesta, numero, esCorrecta, tiempoUsado, puntajeObtenido)
            }
            onNext={() => setCurrentIndex((i) => Math.min(i + 1, preguntasConOpciones.length - 1))}
            onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          />
        )}

        {paso === 4 && resultado && detalle && (
          <div className="space-y-6">
            <QuizResults
              quizTitle={detalle.quiz.titulo || "Resultado de quiz"}
              quizDescription={detalle.quiz.descripcion || ""}
              puntajeTotal={resultado.puntaje}
              correctas={resultado.correctas}
              incorrectas={resultado.total - resultado.correctas}
              pin={pin}
              preguntas={preguntasResultado}
            />

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-lg font-bold text-gray-900">Ruta de aprendizaje generada por IA</p>
                  <p className="text-sm text-gray-600">Haz clic para ver la retroalimentacion detallada y los recursos.</p>
                </div>
                <button
                  onClick={() => setMostrarRuta(true)}
                  className="h-11 px-4 rounded-lg bg-indigo-600 text-white font-semibold"
                >
                  Ruta de aprendizaje generada por IA
                </button>
              </div>
            </div>

            {mostrarRuta && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto relative">
                  <button
                    onClick={() => setMostrarRuta(false)}
                    className="absolute top-3 right-3 h-9 px-3 rounded-lg bg-gray-900 text-white text-sm"
                  >
                    Cerrar
                  </button>
                  <RevisionPregunta
                    explicacionIA={explicacionIA}
                    pasosIA={pasosIA}
                    recursosIA={recursosIA}
                    pasosPorPregunta={pasosPorPregunta}
                    puntajeTotal={resultado.puntaje}
                    tiempoTotal="1-2 min"
                    precision={Math.round((resultado.correctas / Math.max(1, resultado.total)) * 100)}
                    temasRecomendados={temasIA}
                    onGenerarIA={() => setExplicacionIA(explicacionIA || "La IA genero tu explicacion.")}
                    pregunta=""
                    respuestaUsuario=""
                    respuestaCorrecta=""
                  />
                </div>
              </div>
            )}


            <button
              onClick={() => {
                setPaso(1);
                setQuiz(null);
                setDetalle(null);
                setResultado(null);
                setPin("");
                setNombre("");
                setExplicacionIA("");
                setPasosIA("");
                setRecursosIA([]);
                setTemasIA([]);
                setTracking({});
                setMostrarRuta(false);
              }}
              className="w-full h-11 rounded-lg bg-gray-900 text-white font-semibold"
            >
              Presentar otro quiz
            </button>
          </div>
        )}

        {mensaje && <p className="text-sm text-gray-700">{mensaje}</p>}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleList titulo="Quizzes" items={data.quizzes} campos={["titulo", "pin_acceso"]} />
        <SimpleList titulo="Preguntas" items={data.preguntas} campos={["enunciado", "tipo", "respuesta_correcta"]} />
        <SimpleList titulo="Intentos" items={data.intentos_quiz} campos={["estudiante_nombre", "puntaje_total"]} />
        <SimpleList titulo="Respuestas" items={data.respuestas_estudiante} campos={["respuesta", "es_correcta", "retroalimentacion_ia"]} />
      </section>

      {loadingData && <p className="text-sm text-gray-500">Cargando colecciones...</p>}
    </div>
  );
}

function StatCard({ titulo, valor, detalle }: { titulo: string; valor: number | string; detalle: string }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
      <p className="text-sm text-gray-500">{titulo}</p>
      <p className="text-3xl font-bold text-gray-900">{valor}</p>
      <p className="text-xs text-gray-500">{detalle}</p>
    </div>
  );
}

function SimpleList({
  titulo,
  items = [],
  campos,
}: {
  titulo: string;
  items: any[];
  campos: string[];
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-gray-900">{titulo}</p>
        <span className="text-xs text-gray-500">{items.length} items</span>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {items.slice(0, 6).map((item) => (
          <div key={item._id} className="text-sm text-gray-800 border-b border-gray-100 pb-2">
            {campos.map((c) => (
              <span key={c} className="block">
                <strong>{c}:</strong> {String(item[c] ?? "")}
              </span>
            ))}
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-gray-500">Sin registros</p>}
      </div>
    </div>
  );
}
