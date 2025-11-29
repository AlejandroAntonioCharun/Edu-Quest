import { useEffect, useState } from "react";
import { API_BASE, fetchCollection, getResultadosPorPin, generarQuizIA } from "../api";

type Intento = { _id: string; estudiante_nombre?: string; puntaje_total?: number; fecha_envio?: string };
type Quiz = { _id: string; titulo?: string; pin_acceso?: string; descripcion?: string };
type QuizGenerado = { pin: string; quiz: Quiz };

export default function DocentePanel() {
  const [pin, setPin] = useState("");
  const [resultados, setResultados] = useState<{ quiz?: Quiz; intentos?: Intento[] }>({});
  const [cargandoPin, setCargandoPin] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [data, setData] = useState<Record<string, any[]>>({});
  const [curso, setCurso] = useState("");
  const [tema, setTema] = useState("");
  const [cantidadPreguntas, setCantidadPreguntas] = useState(5);
  const [puntos, setPuntos] = useState(10);
  const [quizGenerado, setQuizGenerado] = useState<QuizGenerado | null>(null);
  const [cargandoQuiz, setCargandoQuiz] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const entradas = (await Promise.all([
          ["quizzes", await fetchCollection<any[]>("quizzes")],
          ["aulas", await fetchCollection<any[]>("aulas")],
          ["estudiantes", await fetchCollection<any[]>("estudiantes")],
          ["intentos_quiz", await fetchCollection<any[]>("intentos_quiz")],
          ["resultados_aula", await fetchCollection<any[]>("resultados_aula")],
        ])) as [string, any[]][];
        const mapa: Record<string, any[]> = {};
        entradas.forEach(([k, v]) => (mapa[k] = v as any[]));
        setData(mapa);
      } catch (err: any) {
        setMensaje(err.message || "No se pudieron cargar los datos");
      }
    };
    cargar();
  }, []);

  const buscarPorPin = async () => {
    setCargandoPin(true);
    setMensaje("");
    try {
      const res = (await getResultadosPorPin(pin.trim())) as { quiz?: Quiz; intentos?: Intento[] };
      setResultados(res);
    } catch (err: any) {
      setMensaje(err.message || "No se encontraron intentos para ese PIN");
      setResultados({});
    } finally {
      setCargandoPin(false);
    }
  };

  const generarQuiz = async () => {
    setCargandoQuiz(true);
    setMensaje("");
    setQuizGenerado(null);
    try {
      const res = (await generarQuizIA({
        curso: curso.trim(),
        tema: tema.trim(),
        cantidad_preguntas: cantidadPreguntas,
        puntos_por_pregunta: puntos,
      })) as QuizGenerado;
      setQuizGenerado(res);
      setMensaje("Quiz generado correctamente.");
      const nuevasColecciones = await Promise.all([
        ["quizzes", await fetchCollection<any[]>("quizzes")],
        ["preguntas", await fetchCollection<any[]>("preguntas")],
        ["opciones", await fetchCollection<any[]>("opciones")],
      ]);
      const mapa = { ...data };
      nuevasColecciones.forEach(([k, v]) => (mapa[k as string] = v as any[]));
      setData(mapa);
    } catch (err: any) {
      setMensaje(err.message || "No se pudo generar el quiz");
    } finally {
      setCargandoQuiz(false);
    }
  };

  return (
    <div className="space-y-8 bg-white p-12 ">
      <header className="flex flex-col gap-1">
        <p className="text-3xl font-black text-gray-900">Panel de docente</p>
        <p className="text-sm text-gray-600">
          Datos en tiempo real desde <span className="font-mono text-indigo-700">{API_BASE}</span>
        </p>
      </header>

      <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">
        <p className="font-semibold text-gray-900">Generar quiz con IA</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-black">
          <input
            className="border border-gray-300 rounded-lg h-11 px-3"
            placeholder="Curso (p.ej. Matemática)"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-lg h-11 px-3"
            placeholder="Tema (p.ej. Ecuaciones lineales)"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-lg h-11 px-3"
            type="number"
            min={1}
            max={30}
            placeholder="# de preguntas"
            value={cantidadPreguntas}
            onChange={(e) => setCantidadPreguntas(Number(e.target.value))}
          />
          <input
            className="border border-gray-300 rounded-lg h-11 px-3"
            type="number"
            min={1}
            placeholder="Puntos por pregunta"
            value={puntos}
            onChange={(e) => setPuntos(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={generarQuiz}
            disabled={!curso.trim() || !tema.trim() || cargandoQuiz}
            className="h-11 px-4 rounded-lg bg-green-600 text-white font-semibold disabled:opacity-50"
          >
            {cargandoQuiz ? "Generando..." : "Generar quiz y PIN"}
          </button>
          {quizGenerado?.pin && (
            <span className="text-sm bg-indigo-50 text-indigo-800 px-3 py-2 rounded-lg font-semibold">
              PIN generado: {quizGenerado.pin}
            </span>
          )}
        </div>
        {quizGenerado?.quiz && (
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
            <p className="text-sm text-gray-800">
              Quiz creado: <strong>{quizGenerado.quiz.titulo}</strong> (PIN: {quizGenerado.pin})
            </p>
            <p className="text-xs text-gray-600">{quizGenerado.quiz.descripcion}</p>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat titulo="Quizzes" valor={data.quizzes?.length || 0} />
        <Stat titulo="Aulas" valor={data.aulas?.length || 0} />
        <Stat titulo="Estudiantes" valor={data.estudiantes?.length || 0} />
        <Stat titulo="Intentos" valor={data.intentos_quiz?.length || 0} />
      </section>

      <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">
        <p className="font-semibold text-gray-900">Resultados por PIN</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg h-11 px-3 text-black"
            placeholder="PIN del quiz (ej. AB123)"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button
            onClick={buscarPorPin}
            disabled={!pin.trim() || cargandoPin}
            className="h-11 px-4 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
          >
            {cargandoPin ? "Buscando..." : "Ver resultados"}
          </button>
        </div>
        {resultados.quiz && (
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
            <p className="text-sm text-gray-800">
              Quiz: <strong>{resultados.quiz.titulo || resultados.quiz._id}</strong> — PIN:{" "}
              {resultados.quiz.pin_acceso}
            </p>
            <p className="text-xs text-gray-600">{resultados.quiz.descripcion}</p>
          </div>
        )}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {(resultados.intentos || []).map((i) => (
            <div key={i._id} className="border border-gray-200 rounded-lg p-3">
              <p className="font-semibold text-gray-900">{i.estudiante_nombre || "Anonimo"}</p>
              <p className="text-sm text-gray-700">Puntaje: {i.puntaje_total}</p>
              <p className="text-xs text-gray-500">{i.fecha_envio}</p>
            </div>
          ))}
          {(resultados.intentos || []).length === 0 && (
            <p className="text-sm text-gray-500">Sin intentos registrados para este PIN.</p>
          )}
        </div>
        {mensaje && <p className="text-sm text-gray-600">{mensaje}</p>}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <List titulo="Aulas" items={data.aulas} campos={["nombre_aula", "grado", "seccion"]} />
        <List titulo="Estudiantes" items={data.estudiantes} campos={["nombres", "apellidos", "dni"]} />
        <List titulo="Resultados de aula" items={data.resultados_aula} campos={["promedio_puntaje", "id_aula"]} />
        <List titulo="Intentos recientes" items={data.intentos_quiz} campos={["estudiante_nombre", "puntaje_total"]} />
      </section>
    </div>
  );
}

function Stat({ titulo, valor }: { titulo: string; valor: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <p className="text-sm text-gray-500">{titulo}</p>
      <p className="text-3xl font-bold text-gray-900">{valor}</p>
    </div>
  );
}

function List({
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
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-gray-900">{titulo}</p>
        <span className="text-xs text-gray-500">{items.length}</span>
      </div>
      <div className="space-y-2 max-h-56 overflow-y-auto">
        {items.slice(0, 6).map((it) => (
          <div key={it._id} className="text-sm text-gray-800 border-b border-gray-100 pb-1">
            {campos.map((c) => (
              <span key={c} className="block">
                <strong>{c}:</strong> {String(it[c] ?? "")}
              </span>
            ))}
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-gray-500">Sin registros</p>}
      </div>
    </div>
  );
}
