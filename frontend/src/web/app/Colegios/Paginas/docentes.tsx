export default function Docentes() {
  return (
    <main className="flex flex-1 flex-col">
      {/* 🔹 Header superior */}
      <header className="flex h-[69px] items-center justify-between border-b border-gray-200 bg-white px-8">
        <div className="flex items-center gap-8">
          <label className="relative flex min-w-40 max-w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              search
            </span>
            <input
              className="form-input flex w-full rounded-lg border-gray-300 bg-gray-50 h-10 pl-10 text-sm font-normal placeholder:text-gray-500"
              placeholder="Buscar docentes..."
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

      {/* 🔹 Contenido principal */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* 🧭 Encabezado */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex min-w-72 flex-col gap-1">
              <p className="text-3xl font-bold text-gray-900">
                Gestión de Docentes
              </p>
              <p className="text-base text-gray-500">
                Administra los perfiles, permisos y cuentas de los docentes.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-lg bg-[#135bec] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f4cc9]">
                <span className="material-symbols-outlined">add</span>
                <span>Añadir Docente</span>
              </button>
            </div>
          </div>

          {/* 🔍 Filtros */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <label className="relative flex min-w-40 max-w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  search
                </span>
                <input
                  className="form-input flex w-full rounded-lg border-gray-300 bg-gray-50 h-10 pl-10 text-sm font-normal placeholder:text-gray-500"
                  placeholder="Buscar por nombre..."
                />
              </label>

              <div className="relative min-w-40">
                <select className="form-select w-full rounded-lg border-gray-300 bg-gray-50 text-sm">
                  <option>Filtrar por Especialidad</option>
                  <option>Matemáticas</option>
                  <option>Ciencias</option>
                  <option>Historia</option>
                </select>
              </div>

              <div className="relative min-w-40">
                <select className="form-select w-full rounded-lg border-gray-300 bg-gray-50 text-sm">
                  <option>Filtrar por Estado</option>
                  <option>Activo</option>
                  <option>Inactivo</option>
                  <option>Suspendido</option>
                </select>
              </div>
            </div>
          </div>

          {/* 📋 Tabla de docentes */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Especialidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Colegio Asociado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    nombre: "Dr. Carlos Ramirez",
                    correo: "carlos.ramirez@example.com",
                    especialidad: "Matemáticas",
                    colegio: "Colegio San José",
                    estado: "Activo",
                    color: "green",
                  },
                  {
                    nombre: "María González",
                    correo: "maria.gonzalez@example.com",
                    especialidad: "Ciencias Naturales",
                    colegio: "Instituto Cervantes",
                    estado: "Activo",
                    color: "green",
                  },
                  {
                    nombre: "Juan Pérez",
                    correo: "juan.perez@example.com",
                    especialidad: "Historia",
                    colegio: "Liceo Nacional",
                    estado: "Inactivo",
                    color: "yellow",
                  },
                  {
                    nombre: "Ana Martínez",
                    correo: "ana.martinez@example.com",
                    especialidad: "Literatura",
                    colegio: "Colegio San José",
                    estado: "Suspendido",
                    color: "red",
                  },
                ].map((docente, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div
                            className="bg-center bg-cover rounded-full size-10"
                            style={{
                              backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgOjjV8rShEnF7USiGnq8hFmbUad0D08voErj7EjINFFRhfKQTwkYt5lOqoElcSBmnTPSMvLT4NFZDV1LKCtlXI0Hxp-JQaMa6bBRDsK2FquNuJZu_9-6ROn8e7LBJNP1L_OSbK78tA377HH9Uoq8CKcWiShSiRQqd1qT47dY-kkxpkhcWRDju0CCLNUWkIauPQK8EvanfR3naam3UEwUswBEVRCBEB37HDbUooUiWpkMtFyEtUT8GreOvpyczkzy5NdVMne2T4oQ')",
                            }}
                          ></div>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {docente.nombre}
                          </div>
                          <div className="text-gray-500">{docente.correo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {docente.especialidad}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {docente.colegio}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full bg-${docente.color}-100 px-2 text-xs font-semibold leading-5 text-${docente.color}-800`}
                      >
                        {docente.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100">
                          <span className="material-symbols-outlined text-base">
                            edit
                          </span>
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100">
                          <span className="material-symbols-outlined text-base">
                            key
                          </span>
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-100">
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
        </div>
      </div>
    </main>
  );
}
