import { useState, useEffect } from "react";

interface PreguntaModuloProps {
  numeroPregunta: number;
  totalPreguntas: number;
  pregunta: string;
  enunciado: string;
  tiempoLimiteSegundos: number;
  respuestaInicial: string;

  validarRespuesta: (respuesta: string) => boolean;
  puntaje: number;

  onEnviar: (
    respuesta: string,
    numero: number,
    esCorrecta: boolean,
    tiempoUsado: number,
    puntajeObtenido: number
  ) => void;

  onNext: () => void;
  onPrev: () => void;
  opciones?: string[];
}

export default function PreguntaModulo({
  numeroPregunta,
  totalPreguntas,
  pregunta,
  enunciado,
  tiempoLimiteSegundos,
  respuestaInicial,
  validarRespuesta,
  puntaje,
  onEnviar,
  onNext,
  onPrev,
  opciones = [],
}: PreguntaModuloProps) {
  const [respuesta, setRespuesta] = useState(respuestaInicial);
  const [tiempoRestante, setTiempoRestante] = useState(tiempoLimiteSegundos);
  const [tiempoPausado, setTiempoPausado] = useState(false);

  const esUltima = numeroPregunta === totalPreguntas;

  useEffect(() => {
    setRespuesta(respuestaInicial);
    setTiempoRestante(tiempoLimiteSegundos);
    setTiempoPausado(false);
  }, [numeroPregunta, respuestaInicial, tiempoLimiteSegundos]);

  useEffect(() => {
    if (tiempoPausado) return;

    if (tiempoRestante <= 0) {
      const tiempoUsado = tiempoLimiteSegundos;
      onEnviar("", numeroPregunta, false, tiempoUsado, 0);
      if (!esUltima) onNext();
      setTiempoPausado(true);
      return;
    }

    const timer = setInterval(() => {
      setTiempoRestante((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [tiempoRestante, tiempoPausado]);

  const manejarSiguiente = () => {
    const correcta = validarRespuesta(respuesta);
    const tiempoUsado = tiempoLimiteSegundos - tiempoRestante;
    const puntajeObtenido = correcta ? puntaje : 0;

    onEnviar(respuesta, numeroPregunta, correcta, tiempoUsado, puntajeObtenido);
    onNext();
  };

  const manejarEnvioFinal = () => {
    const correcta = validarRespuesta(respuesta);
    const tiempoUsado = tiempoLimiteSegundos - tiempoRestante;
    const puntajeObtenido = correcta ? puntaje : 0;

    onEnviar(respuesta, numeroPregunta, correcta, tiempoUsado, puntajeObtenido);
  };

  const formatoTiempo = () => `${Math.floor(tiempoRestante / 60)}:${String(tiempoRestante % 60).padStart(2, "0")}`;

  return (
    <div className="px-10 flex flex-1 justify-center py-5">
      <div className="flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap gap-2 p-4">
          <a className="text-[#4c669a]" href="#">
            Quizzes
          </a>
          <span className="text-[#4c669a]">/</span>
          <span className="text-[#0d121b] font-medium">Pregunta {numeroPregunta}</span>
        </div>

        <h2 className="text-[#0d121b] text-[28px] font-bold px-4 pb-3 pt-5">
          Pregunta {numeroPregunta}: {pregunta}
        </h2>

        <p className="text-[#0d121b] text-base px-4 pb-3">{enunciado}</p>

        <div className="px-4 pb-3 flex items-center gap-4">
          <span className="px-3 py-1 rounded-lg bg-[#e7ebf3] text-[#0d121b] text-sm font-bold">
            Tiempo restante: {formatoTiempo()}
          </span>

          <span className="px-3 py-1 rounded-lg bg-[#e7ebf3] text-[#0d121b] text-sm font-bold">
            Puntaje: {puntaje} pts
          </span>
        </div>

        <div className="flex max-w-[600px] px-4 py-3">
          {opciones.length > 0 ? (
            <div className="flex flex-col gap-2 w-full">
              {opciones.map((op) => (
                <label key={op} className="flex items-center gap-2 text-sm text-[#0d121b]">
                  <input
                    type="radio"
                    name={`preg-${numeroPregunta}`}
                    value={op}
                    checked={respuesta === op}
                    onChange={(e) => setRespuesta(e.target.value)}
                  />
                  <span>{op}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              placeholder="Escribe tu solución aquí..."
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              className="w-full resize-none rounded-xl min-h-36 p-[15px] text-[#0d121b] border border-[#cfd7e7] bg-[#f8f9fc] focus:outline-0 focus:ring-0"
            ></textarea>
          )}
        </div>

        <div className="flex justify-between px-4 py-3">
          <div className="flex gap-3">
            <button onClick={onPrev} disabled={numeroPregunta === 1} className="h-10 px-4 rounded-xl bg-[#e7ebf3] text-black">
              ⬅ Anterior
            </button>

            {!esUltima && (
              <button onClick={manejarSiguiente} className="h-10 px-4 rounded-xl bg-[#e7ebf3] text-black">
                Siguiente ➝
              </button>
            )}
          </div>

          {esUltima && (
            <button onClick={manejarEnvioFinal} className="h-10 px-4 rounded-xl bg-[#135bec] text-white">
              Enviar solución
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
