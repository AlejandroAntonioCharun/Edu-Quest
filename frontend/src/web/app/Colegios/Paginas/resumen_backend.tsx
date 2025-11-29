import { useEffect, useState } from "react";
import { API_BASE, fetchCollection } from "../../api";

export default function ColegiosBackendResumen() {
  const [data, setData] = useState<Record<string, any[]>>({});
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const entradas = (await Promise.all([
          ["colegios", await fetchCollection<any[]>("colegios")],
          ["docentes", await fetchCollection<any[]>("docentes")],
          ["estudiantes", await fetchCollection<any[]>("estudiantes")],
          ["aulas", await fetchCollection<any[]>("aulas")],
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

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <p className="text-2xl font-bold text-gray-900">Colegios conectados</p>
        <p className="text-sm text-gray-600">
          Fuente: <span className="font-mono text-indigo-700">{API_BASE}</span>
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat titulo="Colegios" valor={data.colegios?.length || 0} />
        <Stat titulo="Docentes" valor={data.docentes?.length || 0} />
        <Stat titulo="Estudiantes" valor={data.estudiantes?.length || 0} />
        <Stat titulo="Aulas" valor={data.aulas?.length || 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <List titulo="Colegios" items={data.colegios} campos={["nombre", "direccion", "telefono"]} />
        <List titulo="Docentes" items={data.docentes} campos={["nombres", "apellidos", "id_colegio"]} />
        <List titulo="Estudiantes" items={data.estudiantes} campos={["nombres", "apellidos", "dni"]} />
        <List titulo="Aulas" items={data.aulas} campos={["nombre_aula", "grado", "seccion"]} />
      </div>

      {mensaje && <p className="text-sm text-gray-600">{mensaje}</p>}
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
