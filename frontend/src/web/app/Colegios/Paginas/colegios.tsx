
export default function Colegios() {
  return (
    <main className="flex flex-1 flex-col">
      {/* 🔹 Header superior */}
      <header className="flex h-[69px] items-center justify-between border-b border-gray-200 bg-white px-8">
        <div className="flex items-center gap-8"></div>

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

      {/* 🔹 Contenido principal */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* 🏫 Título y botón */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-72 flex-col gap-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Gestión de Colegios
              </h1>
              <p className="text-base text-gray-500">
                Añade, edita y gestiona los colegios de la plataforma.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-lg bg-[#135bec] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0f4cc9]">
                <span className="material-symbols-outlined">add</span>
                <span>Añadir Colegio</span>
              </button>
            </div>
          </div>

          {/* 🔍 Buscador y filtros */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[280px]">
              <label className="relative flex">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  search
                </span>
                <input
                  className="form-input w-full rounded-lg border-gray-300 bg-white h-10 pl-10 text-sm placeholder:text-gray-500"
                  placeholder="Buscar por nombre o dirección..."
                />
              </label>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <span className="material-symbols-outlined text-base">
                  filter_list
                </span>
                <span>Filtros</span>
              </button>
            </div>
          </div>

          {/* 📋 Tabla de colegios */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-3">Nombre del Colegio</th>
                  <th className="px-6 py-3">Dirección</th>
                  <th className="px-6 py-3 text-center">Docentes</th>
                  <th className="px-6 py-3 text-center">Estudiantes</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    nombre: "Colegio Internacional del Sol",
                    direccion: "Av. Siempre Viva 123, Springfield",
                    docentes: 45,
                    estudiantes: 850,
                  },
                  {
                    nombre: "Liceo Moderno del Norte",
                    direccion: "Calle Falsa 456, Capital City",
                    docentes: 62,
                    estudiantes: 1120,
                  },
                  {
                    nombre: "Escuela Primaria Central",
                    direccion: "Plaza Mayor 1, Pueblo Paleta",
                    docentes: 30,
                    estudiantes: 600,
                  },
                  {
                    nombre: "Instituto de Bellas Artes",
                    direccion: "Boulevard de los Artistas 789",
                    docentes: 25,
                    estudiantes: 450,
                  },
                  {
                    nombre: "Academia de Ciencias Futuras",
                    direccion: "Paseo de la Innovación 101",
                    docentes: 80,
                    estudiantes: 1500,
                  },
                ].map((colegio, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      scope="row"
                    >
                      {colegio.nombre}
                    </th>
                    <td className="px-6 py-4">{colegio.direccion}</td>
                    <td className="px-6 py-4 text-center">
                      {colegio.docentes}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {colegio.estudiantes}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 rounded-md hover:bg-gray-200 text-gray-600">
                          <span className="material-symbols-outlined text-base">
                            edit
                          </span>
                        </button>
                        <button className="p-2 rounded-md hover:bg-gray-200 text-gray-600">
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
          </div>

          {/* 📑 Paginación */}
          <nav
            aria-label="Table navigation"
            className="flex items-center justify-between pt-4"
          >
            <span className="text-sm text-gray-500">
              Mostrando{" "}
              <span className="font-semibold text-gray-900">1-5</span> de{" "}
              <span className="font-semibold text-gray-900">150</span>
            </span>
            <ul className="inline-flex -space-x-px text-sm h-8">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  Anterior
                </a>
              </li>
              {[1, 2, 3].map((num) => (
                <li key={num}>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 border border-gray-300 ${
                      num === 1
                        ? "text-[#135bec] bg-blue-50 font-semibold"
                        : "text-gray-500 bg-white hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  Siguiente
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
