import { useEffect, useState } from "react";
import axios from "axios";

interface Quiz {
  _id: string;
  nombre: string;
  clase: string;
  formato: string;
  dificultad: string;
  docente?: string;
  fecha_creacion?: string;
  estado?: string;
  cantidad_aplicaciones?: number;
}

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(
    /\/+$/,
    ""
  );
  const API_URL = `${API_BASE}/mongo/quizzes`;

  const cargarQuizzes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_URL);
      setQuizzes(response.data);
    } catch (err: any) {
      console.error(err);
      setError("Error al conectar con el backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarQuizzes();
  }, []);

  const quizzesFiltrados = quizzes.filter((q) =>
    (q.nombre || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="flex flex-1 flex-col">
      {/* Encabezado */}
      <header className="flex h-[69px] items-center justify-between border-b border-gray-200 bg-white px-8">
        <h1 className="text-xl font-bold text-gray-900">Gestion de Quizzes</h1>
        <div className="flex items-center justify-end gap-4">
          <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">notifications</span>
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">settings</span>
          </button>
        </div>
      </header>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Titulo */}
          <div className="flex flex-col gap-1">
            <p className="text-3xl font-bold text-gray-900">Quizzes Generados</p>
            <p className="text-base text-gray-500">
              Administra, monitorea y revisa todos los quizzes de la plataforma.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-4">
            <label className="relative flex min-w-40 max-w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                search
              </span>
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="form-input w-full rounded-lg border-gray-300 bg-white h-10 pl-10 text-sm placeholder:text-gray-500"
                placeholder="Buscar por titulo..."
              />
            </label>

            <button
              onClick={cargarQuizzes}
              className="flex items-center gap-2 rounded-lg bg-[#135bec] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f4cc9]"
            >
              <span className="material-symbols-outlined">refresh</span>
              Recargar
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Cargando quizzes...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : quizzesFiltrados.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No hay quizzes disponibles.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Titulo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Clase
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Dificultad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Formato
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {quizzesFiltrados.map((q) => (
                      <tr key={q._id}>
                        <td className="px-6 py-4 text-gray-900 font-medium">{q.nombre}</td>
                        <td className="px-6 py-4 text-gray-500">{q.clase}</td>
                        <td className="px-6 py-4 text-gray-500">{q.dificultad}</td>
                        <td className="px-6 py-4 text-gray-500">{q.formato}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              q.estado === "Activo"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {q.estado || "Inactivo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 rounded-lg hover:bg-gray-100">
                              <span className="material-symbols-outlined text-base">visibility</span>
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100">
                              <span className="material-symbols-outlined text-base">edit</span>
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-50">
                              <span className="material-symbols-outlined text-base text-red-600">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
