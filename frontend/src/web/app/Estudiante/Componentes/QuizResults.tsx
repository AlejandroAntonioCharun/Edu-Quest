import React from "react";

export interface FeedbackPregunta {
  comentario?: string;
  nivel_aprendizaje?: string;
  pasos_ia?: string[];
  recursos_sugeridos?: { tipo?: string; url?: string }[];
}

export interface PreguntaResultado {
  id: string;
  pregunta: string;
  respuestaUsuario: string;
  respuestaCorrecta: string;
  correcta: boolean;
  puntajeObtenido: number;
  feedback?: FeedbackPregunta | null;
}

interface QuizResultsProps {
  quizTitle: string;
  quizDescription: string;
  puntajeTotal: number;
  correctas: number;
  incorrectas: number;
  preguntas: PreguntaResultado[];
  pin?: string;
}

export default function QuizResults({
  quizTitle,
  quizDescription,
  puntajeTotal,
  correctas,
  incorrectas,
  preguntas,
  pin,
}: QuizResultsProps) {
  return (
    <div className="px-6 lg:px-16 flex flex-1 justify-center py-5 pt-16 bg-white">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-2">
            <p className="text-[#0d121b] text-[32px] font-bold leading-tight">{quizTitle}</p>
            <p className="text-[#4c669a] text-sm">{quizDescription}</p>
            {pin && <p className="text-[#4c669a] text-xs">PIN del quiz: {pin}</p>}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-[#e7ebf3]">
            <p className="text-[#0d121b] font-bold">Nota Total</p>
            <p className="text-[#0d121b] text-2xl font-bold">{puntajeTotal}</p>
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-[#e7ebf3]">
            <p className="text-[#0d121b] font-medium">Correctas</p>
            <p className="text-[#0d121b] text-2xl font-bold">{correctas}</p>
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-[#e7ebf3]">
            <p className="text-[#0d121b] font-medium">Incorrectas</p>
            <p className="text-[#0d121b] text-2xl font-bold">{incorrectas}</p>
          </div>
        </div>

        <h2 className="text-[#0d121b] text-[22px] font-bold px-4 pb-3 pt-5">Tabla de Resultados</h2>

        <div className="px-4 py-3 text-[#0d121b]">
          <div className="overflow-hidden rounded-xl border border-[#cfd7e7] bg-[#f8f9fc]">
            <table className="flex-1 w-full">
              <thead>
                <tr className="bg-[#f8f9fc]">
                  <th className="px-4 py-3 text-left text-sm font-medium">Pregunta</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Respuesta</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Resultado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#4c669a]">Feedback IA</th>
                </tr>
              </thead>

              <tbody>
                {preguntas.map((p) => (
                  <React.Fragment key={p.id}>
                    <tr className="border-t border-[#cfd7e7]">
                      <td className="px-4 py-2 text-sm">{p.pregunta}</td>

                      <td className="px-4 py-2 text-sm text-[#4c669a]">
                        {p.respuestaUsuario || "No respondida"}
                      </td>

                      <td className="px-4 py-2 text-sm">
                        <span
                          className={`inline-flex rounded-xl h-8 px-4 items-center text-white ${
                            p.correcta ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {p.correcta ? "Correcto" : "Incorrecto"}
                        </span>
                      </td>

                      <td className="px-4 py-2 text-sm font-bold text-[#4c669a]">
                        {p.feedback?.comentario ? "Entregado" : "Pendiente"}
                      </td>
                    </tr>

                    {p.feedback && (
                      <tr>
                        <td colSpan={4} className="px-4 py-3 bg-white text-sm border-t space-y-2">
                          <p className="font-bold text-[#0d121b]">Explicacion y recomendacion:</p>
                          <div className="text-[#4c669a] whitespace-pre-line">{p.feedback.comentario}</div>
                          {p.feedback.pasos_ia?.length ? (
                            <div className="text-xs text-[#0d121b] space-y-1 mt-2">
                              <p className="font-semibold">Pasos sugeridos por la IA:</p>
                              <ul className="list-disc ml-5 space-y-1">
                                {p.feedback.pasos_ia.map((paso, idx) => (
                                  <li key={idx}>{paso}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                          {p.feedback.nivel_aprendizaje && (
                            <p className="text-xs text-[#0d121b]">
                              Nivel de aprendizaje estimado: {p.feedback.nivel_aprendizaje}
                            </p>
                          )}
                          {p.feedback.recursos_sugeridos?.length ? (
                            <div className="text-xs">
                              <p className="font-semibold text-[#0d121b] mb-1">Recursos sugeridos:</p>
                              <ul className="list-disc ml-5 space-y-1">
                                {p.feedback.recursos_sugeridos.map((r, idx) => (
                                  <li key={idx}>
                                    <a href={r.url} target="_blank" rel="noreferrer" className="text-[#135bec] underline">
                                      {r.tipo || "Recurso"} - {r.url}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
