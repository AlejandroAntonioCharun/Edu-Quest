export interface RecursoIA {
  icon: string;
  titulo: string;
  url?: string;
  descripcion?: string;
}

export interface RevisionPreguntaProps {
  pregunta: string;
  respuestaUsuario: string;
  respuestaCorrecta: string;

  explicacionIA: string;
  pasosIA: string;
  recursosIA: RecursoIA[];
  pasosPorPregunta?: { pregunta: string; pasos: string[] }[];

  puntajeTotal: number;
  tiempoTotal: string;
  precision: number;

  temasRecomendados: string[];

  onGenerarIA: () => void;
}

export function RevisionPregunta({
  explicacionIA,
  pasosIA,
  recursosIA,
  pasosPorPregunta = [],
  puntajeTotal,
  tiempoTotal,
  precision,
  temasRecomendados,
  onGenerarIA,
}: RevisionPreguntaProps) {
  return (
    <div className="flex flex-col w-full py-6 px-4 sm:px-10 md:px-20">
      <div className="flex flex-wrap justify-between gap-3 pb-4">
        <p className="text-[#0d121b] text-[28px] md:text-[32px] font-bold leading-tight min-w-72">
          Ruta de Aprendizaje Personalizada
        </p>
      </div>

      <h3 className="text-[#0d121b] text-lg font-bold px-1 pb-2 pt-4">
        Resumen del Rendimiento del Cuestionario
      </h3>

      <div className="flex flex-wrap gap-4 p-1">
        <div className="flex min-w-[150px] flex-1 flex-col gap-2 rounded-lg p-4 border border-[#cfd7e7]">
          <p className="text-[#0d121b] text-sm font-medium">Puntuación</p>
          <p className="text-[#0d121b] text-2xl font-bold">{puntajeTotal}</p>
        </div>

        <div className="flex min-w-[150px] flex-1 flex-col gap-2 rounded-lg p-4 border border-[#cfd7e7]">
          <p className="text-[#0d121b] text-sm font-medium">Tiempo Invertido</p>
          <p className="text-[#0d121b] text-2xl font-bold">{tiempoTotal}</p>
        </div>

        <div className="flex min-w-[150px] flex-1 flex-col gap-2 rounded-lg p-4 border border-[#cfd7e7]">
          <p className="text-[#0d121b] text-sm font-medium">Precisión</p>
          <p className="text-[#0d121b] text-2xl font-bold">{precision}%</p>
        </div>
      </div>

      <h3 className="text-[#0d121b] text-lg font-bold px-1 pb-2 pt-6">
        Temas Recomendados para Mejorar
      </h3>

      <div className="flex gap-3 p-1 flex-wrap">
        {temasRecomendados.map((tema, i) => (
          <div
            key={i}
            className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-[#e7ebf3] px-4"
          >
            <p className="text-[#0d121b] text-sm font-medium">{tema}</p>
          </div>
        ))}
      </div>

      <h3 className="text-[#0d121b] text-lg font-bold px-1 pb-2 pt-6">
        Explicación de Temas Clave (Generada por IA)
      </h3>

      {!explicacionIA ? (
        <div className="px-1 pb-4">
          <button
            onClick={onGenerarIA}
            className="px-4 py-2 bg-[#135bec] text-white rounded-xl font-bold"
          >
            Generar Explicación IA
          </button>
        </div>
      ) : (
        <p className="text-[#0d121b] text-base leading-normal pb-3 pt-1 px-1 whitespace-pre-line">
          {explicacionIA}
        </p>
      )}

      {pasosIA && (
        <>
          <h3 className="text-[#0d121b] text-lg font-bold px-1 pb-2 pt-6">
            Pasos a Seguir
          </h3>
          <p className="text-[#0d121b] text-base px-1 pb-3 whitespace-pre-line">
            {pasosIA}
          </p>
        </>
      )}

      {pasosPorPregunta.length > 0 && (
        <div className="mt-4">
          <h3 className="text-[#0d121b] text-lg font-bold px-1 pb-2 pt-4">
            Pasos de resolución por pregunta
          </h3>
          <div className="flex flex-col gap-3 px-1">
            {pasosPorPregunta.map((item, idx) => (
              <div key={idx} className="border border-[#cfd7e7] rounded-lg p-3 bg-[#f8f9fc]">
                <p className="text-sm font-semibold text-[#0d121b] mb-2">{item.pregunta}</p>
                <ul className="list-decimal ml-5 space-y-1 text-sm text-[#0d121b]">
                  {item.pasos.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="text-[#0d121b] text-lg font-bold px-1 pb-2 pt-6">
        Recursos Sugeridos
      </h3>

      <div className="flex overflow-x-auto px-1 gap-4 py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {recursosIA.map((r, i) => (
          <div key={i} className="flex flex-col gap-3 min-w-[160px] max-w-[200px]">
            <div
              className="aspect-[3/4] bg-center bg-cover rounded-lg"
              style={{ backgroundImage: `url(${r.icon})` }}
            ></div>

            <p className="text-[#0d121b] font-medium">{r.titulo}</p>
            <p className="text-[#4c669a] text-sm">{r.descripcion || "Recurso recomendado"}</p>
            {r.url && (
              <a
                className="text-sm text-[#135bec] underline"
                href={r.url}
                target="_blank"
                rel="noreferrer"
              >
                Ver recurso
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
