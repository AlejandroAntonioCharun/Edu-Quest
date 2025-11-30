import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardData {
  promedioGeneral: number;
  cambioPromedio: number;
  quizzesCompletados: number;
  cambioQuizzes: number;
  medallasGanadas: number;
  cambioMedallas: number;
  pendientes: { titulo: string; vence: string; color: string; icono: string }[];
  calificaciones: { titulo: string; completado: string; nota: number }[];
  progreso: { materia: string; porcentaje: number; color: string }[];
  logros: { icono: string; color: string; titulo: string; bloqueado?: boolean }[];
  recomendaciones: { titulo: string; descripcion: string; color?: string }[];
}

export default function EstudianteDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //url de la API
  const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
  const API_URL = `${API_BASE}/api/estudiantes/dashboard`;

  const cargarDashboard = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Error al obtener los datos del estudiante.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDashboard();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Cargando tu progreso...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  // Datos para probar
  const dashboard = data || {
    promedioGeneral: 8.5,
    cambioPromedio: 0.5,
    quizzesCompletados: 24,
    cambioQuizzes: 2,
    medallasGanadas: 6,
    cambioMedallas: 1,
    pendientes: [
      { titulo: "Quiz de Álgebra", vence: "24 de Octubre", color: "primary", icono: "calculate" },
      { titulo: "Química Orgánica", vence: "26 de Octubre", color: "teal", icono: "science" },
      { titulo: "Historia Universal", vence: "28 de Octubre", color: "amber", icono: "history_edu" },
    ],
    calificaciones: [
      { titulo: "Quiz de Geometría", completado: "20 de Octubre", nota: 9.2 },
      { titulo: "Examen de Biología Celular", completado: "18 de Octubre", nota: 7.8 },
    ],
    progreso: [
      { materia: "Matemáticas", porcentaje: 85, color: "primary" },
      { materia: "Ciencias", porcentaje: 70, color: "teal" },
      { materia: "Historia", porcentaje: 92, color: "amber" },
    ],
    logros: [
      { icono: "emoji_events", color: "primary", titulo: "Maestro de Álgebra" },
      { icono: "local_fire_department", color: "teal", titulo: "Racha de 5 días" },
      { icono: "star", color: "amber", titulo: "Puntaje Perfecto" },
      { icono: "bolt", color: "fuchsia", titulo: "Velocista" },
      { icono: "lock", color: "gray", titulo: "Bloqueado", bloqueado: true },
      { icono: "lock", color: "gray", titulo: "Bloqueado", bloqueado: true },
    ],
    recomendaciones: [
      {
        titulo: "Refuerza Álgebra",
        descripcion: "Practica ecuaciones de primer grado para mejorar tu promedio.",
        color: "primary",
      },
      {
        titulo: "Practica la lección de historia",
        descripcion: "Un nuevo quiz sobre la Revolución Francesa está disponible.",
      },
    ],
  };

  return (
    <main className="flex-1 px-4 sm:px-10 lg:px-20 py-8">
      <div className="flex flex-col max-w-[1200px] mx-auto w-full">
        {/* Encabezado */}
        <div className="flex justify-between gap-3 p-4">
          <div className="flex flex-col gap-2">
            <p className="text-gray-900 text-4xl font-black leading-tight">
              ¡Hola, Alex!
            </p>
            <p className="text-gray-500 text-base">
              Aquí tienes un resumen de tu progreso.
            </p>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <StatCard
            titulo="Promedio General"
            valor={`${dashboard.promedioGeneral}/10`}
            cambio={`+${dashboard.cambioPromedio}%`}
          />
          <StatCard
            titulo="Quizzes Completados"
            valor={dashboard.quizzesCompletados}
            cambio={`+${dashboard.cambioQuizzes}`}
          />
          <StatCard
            titulo="Medallas Ganadas"
            valor={dashboard.medallasGanadas}
            cambio={`+${dashboard.cambioMedallas}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          {/* Izquierda */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <QuizzesPendientes data={dashboard.pendientes} />
            <Calificaciones data={dashboard.calificaciones} />
          </div>

          {/* Derecha */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <ProgresoMaterias data={dashboard.progreso} />
            <Logros data={dashboard.logros} />
            <Recomendaciones data={dashboard.recomendaciones} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* COMPONENTES REUTILIZABLES */

function StatCard({ titulo, valor, cambio }: any) {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white shadow-sm border border-gray-200">
      <p className="text-gray-900 text-base font-medium">{titulo}</p>
      <p className="text-gray-900 text-3xl font-bold">{valor}</p>
      <p className="text-teal-500 text-base font-medium">{cambio}</p>
    </div>
  );
}

function QuizzesPendientes({ data }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-gray-900 text-xl font-bold px-6 pt-5 pb-3">
        Quizzes Pendientes
      </h2>
      <div className="flex flex-col">
        {data.map((q: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 px-6 py-3 border-t border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center rounded-lg bg-${q.color}/20 text-${q.color} size-12`}
              >
                <span className="material-symbols-outlined">{q.icono}</span>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-900 text-base font-medium">
                  {q.titulo}
                </p>
                <p className="text-gray-500 text-sm">Vence: {q.vence}</p>
              </div>
            </div>
            <button className="rounded-lg h-10 px-4 bg-primary text-white text-sm font-medium">
              Comenzar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Calificaciones({ data }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-gray-900 text-xl font-bold px-6 pt-5 pb-3">
        Calificaciones Recientes
      </h2>
      <div className="flex flex-col">
        {data.map((c: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 px-6 py-3 border-t border-gray-200"
          >
            <div>
              <p className="text-gray-900 text-base font-medium">{c.titulo}</p>
              <p className="text-gray-500 text-sm">
                Completado: {c.completado}
              </p>
            </div>
            <p className="text-gray-900 text-lg font-bold">{c.nota}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgresoMaterias({ data }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
      <h3 className="text-gray-900 text-xl font-bold">Progreso por Materia</h3>
      <div className="space-y-4">
        {data.map((m: any, i: number) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <p className="text-gray-900 text-sm font-medium">{m.materia}</p>
              <p className="text-gray-500 text-sm">{m.porcentaje}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-${m.color}-500 h-2 rounded-full`}
                style={{ width: `${m.porcentaje}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Logros({ data }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-900 text-xl font-bold mb-4">
        Logros y Medallas
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {data.map((l: any, i: number) => (
          <div
            key={i}
            className={`flex items-center justify-center aspect-square rounded-full p-2 ${
              l.bloqueado
                ? "bg-gray-200 text-gray-400"
                : `bg-${l.color}-500/10 text-${l.color}-500`
            }`}
            title={l.titulo}
          >
            <span className="material-symbols-outlined !text-3xl">
              {l.icono}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Recomendaciones({ data }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-900 text-xl font-bold mb-4">
        Recomendaciones de IA
      </h3>
      <div className="flex flex-col gap-3">
        {data.map((r: any, i: number) => (
          <div
            key={i}
            className={`flex items-start gap-4 p-4 rounded-lg ${
              r.color ? `bg-${r.color}/10` : "bg-gray-100"
            }`}
          >
            <div className={r.color ? `text-${r.color}` : "text-gray-600"}>
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <p className="text-gray-900 font-medium">{r.titulo}</p>
              <p className="text-gray-600 text-sm">{r.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
