export default function Estudiantes() {
  const estudiantes = [
    {
      nombre: "Ana García Pérez",
      colegio: "Colegio San Patricio",
      clases: "Matemáticas 101, Historia del Arte",
      estado: "Activo",
      color: "green",
    },
    {
      nombre: "Luis Martínez Rodríguez",
      colegio: "Liceo Francés",
      clases: "Ciencias Naturales",
      estado: "Activo",
      color: "green",
    },
    {
      nombre: "Sofía Hernández López",
      colegio: "Instituto Cervantes",
      clases: "Matemáticas 101",
      estado: "Inactivo",
      color: "gray",
    },
    {
      nombre: "Carlos Gómez Fernández",
      colegio: "Colegio San Patricio",
      clases: "Historia del Arte",
      estado: "Suspendido",
      color: "red",
    },
    {
      nombre: "Laura Díaz Moreno",
      colegio: "Liceo Francés",
      clases: "Ciencias Naturales, Matemáticas 101",
      estado: "Activo",
      color: "green",
    },
  ];

  return (
    <main className="flex flex-1 flex-col">
      {/* 🔹 Header */}
      <header className="flex h-[69px] items-center justify-between border-b border-gray-200 bg-white px-8">
        <div className="flex items-center gap-8">
          <label className="relative flex min-w-40 max-w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              search
            </span>
            <input
              className="form-input flex w-full rounded-lg border-gray-300 bg-gray-50 h-10 pl-10 text-sm font-normal placeholder:text-gray-500"
              placeholder="Buscar estudiantes..."
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">
              notifications
            </span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">
              settings
            </span>
          </button>
          <div
            className="bg-center bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4RRuZXOUXxs-pAI-hsTudQ1pcxlCRvQCtXpfWSMn5dNj57a6TN6fG6sf-oGxtbIV7JTjdiEZVQS_q3375-aNYGi8B1PGYiqeXIWw6bSSmTmyuZcpWTeD1582aKkcQzywD5w5BtuA5OH36gJx9iVYyzZ6EPxSyF9fKOGLPtzd9mN-Zhg7oCg3ctdwN8MD-iUXx-2wCKden9yljx-ZAtqVZmpryPmiou1dGegCY-MoOrBoWweO2_DJX8_55q_7rvAiEsPpcp3qSC0')",
            }}
          ></div>
        </div>
      </header>

      {/* 🔹 Contenido */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* 🧭 Encabezado */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Gestión de Estudiantes
              </h1>
              <p className="text-base text-gray-500">
                Añade, edita y administra los perfiles de los estudiantes.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#135bec] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0f4cc9]">
              <span className="material-symbols-outlined text-base">add</span>
              <span>Añadir Estudiante</span>
            </button>
          </div>

          {/* 🔍 Filtros */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-48">
              <select className="form-select w-full rounded-lg border-gray-300 bg-white h-10 text-sm font-normal pl-3 pr-8">
                <option>Filtrar por Colegio</option>
                <option>Colegio San Patricio</option>
                <option>Liceo Francés</option>
                <option>Instituto Cervantes</option>
              </select>
            </div>
            <div className="relative min-w-48">
              <select className="form-select w-full rounded-lg border-gray-300 bg-white h-10 text-sm font-normal pl-3 pr-8">
                <option>Filtrar por Clase</option>
                <option>Matemáticas 101</option>
                <option>Historia del Arte</option>
                <option>Ciencias Naturales</option>
              </select>
            </div>
            <div className="relative min-w-48">
              <select className="form-select w-full rounded-lg border-gray-300 bg-white h-10 text-sm font-normal pl-3 pr-8">
                <option>Filtrar por Estado</option>
                <option>Activo</option>
                <option>Inactivo</option>
                <option>Suspendido</option>
              </select>
            </div>
          </div>

          {/* 📋 Tabla de estudiantes */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3">Colegio</th>
                  <th className="px-6 py-3">Clases</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((e, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {e.nombre}
                    </td>
                    <td className="px-6 py-4">{e.colegio}</td>
                    <td className="px-6 py-4">{e.clases}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full bg-${e.color}-100 px-2.5 py-0.5 text-xs font-medium text-${e.color}-800`}
                      >
                        {e.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-md hover:bg-gray-100">
                          <span className="material-symbols-outlined text-base">
                            edit
                          </span>
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-gray-100">
                          <span className="material-symbols-outlined text-base">
                            key
                          </span>
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-gray-100">
                          <span className="material-symbols-outlined text-base">
                            assignment_ind
                          </span>
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-red-100 text-red-500">
                          <span className="material-symbols-outlined text-base">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 🔸 Paginación */}
            <div className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">
                Mostrando <span className="font-semibold text-gray-900">1</span>{" "}
                a <span className="font-semibold text-gray-900">5</span> de{" "}
                <span className="font-semibold text-gray-900">100</span>
              </span>
              <div className="inline-flex -space-x-px rounded-md text-sm">
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100"
                >
                  Anterior
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100"
                >
                  Siguiente
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
