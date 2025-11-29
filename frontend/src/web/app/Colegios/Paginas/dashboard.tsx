import React from "react";

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col">
      {/* 🔹 TopNavBar */}
      <header className="flex h-[69px] items-center justify-between whitespace-nowrap border-b border-gray-200 bg-white px-8">
        <div className="flex items-center gap-8">
          <label className="relative flex min-w-40 max-w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              search
            </span>
            <input
              className="form-input flex w-full rounded-lg border-gray-300 bg-gray-50 h-10 pl-10 text-sm font-normal placeholder:text-gray-500"
              placeholder="Buscar..."
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
          {/* 🧭 Encabezado de página */}
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex min-w-72 flex-col gap-1">
              <p className="text-3xl font-bold text-gray-900">Dashboard</p>
              <p className="text-base font-normal text-gray-500">
                ¡Bienvenido de nuevo, Admin! Aquí tienes una vista general del
                sistema.
              </p>
            </div>
          </div>

          {/* 📊 Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Total de Colegios", value: "150", growth: "+5%" },
              { title: "Total de Docentes", value: "1,200", growth: "+8%" },
              { title: "Total de Estudiantes", value: "25,480", growth: "+12%" },
              { title: "Quizzes Creados", value: "8,950", growth: "+15%" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6"
              >
                <p className="text-sm font-medium text-gray-600">{item.title}</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold tracking-tight text-gray-900">
                    {item.value}
                  </p>
                  <p className="text-sm font-medium text-green-500">
                    {item.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 📈 Gráficos */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 🔹 Gráfico de usuarios */}
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-base font-medium text-gray-900">
                Registro de Usuarios
              </p>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-bold tracking-tight text-gray-900 truncate">
                  5,230
                </p>
                <p className="text-sm font-medium text-green-500">+10.2%</p>
              </div>
              <p className="text-sm text-gray-500">Últimos 30 días</p>

              {/* Mini gráfico de barras */}
              <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center pt-4">
                {[
                  { h: "30%", label: "Semana 1" },
                  { h: "70%", label: "Semana 2" },
                  { h: "90%", label: "Semana 3", active: true },
                  { h: "40%", label: "Semana 4" },
                ].map((bar, i) => (
                  <React.Fragment key={i}>
                    <div
                      className={`w-full rounded-t-lg ${
                        bar.active
                          ? "bg-[#135bec]"
                          : "bg-[#135bec]/20"
                      }`}
                      style={{ height: bar.h }}
                    ></div>
                    <p
                      className={`text-xs ${
                        bar.active
                          ? "font-bold text-[#135bec]"
                          : "text-gray-500"
                      }`}
                    >
                      {bar.label}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 🔹 Gráfico de actividad de quizzes */}
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-base font-medium text-gray-900">
                Actividad de Quizzes
              </p>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-bold tracking-tight text-gray-900 truncate">
                  12,800 partidas
                </p>
                <p className="text-sm font-medium text-green-500">+18.5%</p>
              </div>
              <p className="text-sm text-gray-500">Últimos 30 días</p>

              {/* SVG decorativo */}
              <div className="flex flex-col gap-8 pt-4">
                <svg
                  fill="none"
                  height="148"
                  preserveAspectRatio="none"
                  viewBox="-3 0 478 150"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                    fill="url(#paint0_linear_chart)"
                  ></path>
                  <path
                    d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                    stroke="#135bec"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_chart"
                      x1="236"
                      x2="236"
                      y1="1"
                      y2="149"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#135bec" stopOpacity="0.3"></stop>
                      <stop
                        offset="1"
                        stopColor="#135bec"
                        stopOpacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-around -mt-4">
                  {["Semana 1", "Semana 2", "Semana 3", "Semana 4"].map(
                    (week, i) => (
                      <p
                        key={i}
                        className="text-xs font-medium text-gray-500"
                      >
                        {week}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
