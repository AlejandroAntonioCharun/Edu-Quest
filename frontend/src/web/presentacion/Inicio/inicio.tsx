import Button from "../../UI/Botones/Button";
import imagen from "../../../assets/imagen.png";

export default function FeatureSection() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          
          {/* Texto */}
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                La enseñanza no tiene que ser aburrida
              </h2>

              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Genera cuestionarios y monitorea el progreso de tus estudiantes
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-700">
                Optimiza el proceso de aprendizaje mediente cuestionarios interactivos y seguimiento detallado del rendimiento estudiantil. Proporcionando recomendaciones basados en datos historicos              </p>


              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                
                {/* Item 1 */}
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                      />
                    </svg>
                    Cuestionarios Generados por IA.
                  </dt>
                  <dd className="inline">
                      Explicale a la IA el tema que quieres evaluar y generara cuestionarios personalizados en segundos.
                  </dd>
                </div>

                {/* Item 2 */}
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                      />
                    </svg>
                    Monitorea el progeso de aprendizaje de cada estudiante.
                  </dt>
                  <dd className="inline">
                    Visualiza informes detallados del rendimiento de tus estudiantes y adapta tus estrategias de enseñanza para maximizar su éxito.
                  </dd>
                </div>

                {/* Item 3 */}
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                    >
                      <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z"
                      />
                    </svg>
                    Conversa con tus estudiantes dentro de la app.
                  </dt>
                  <dd className="inline">
                    Facilita la comunicación directa con tus estudiantes para resolver dudas y brindar apoyo adicional durante su proceso de aprendizaje.
                  </dd>
                </div>

                <Button 
                  text="Comienza ahora"
                  to="IA"
                  size="lg"
                  variant="primary"
                />

              </dl>
            </div>
          </div>

          {/* Imagen */}
          <img
            width="2432"
            height="1442"
            src={imagen}
            alt="Product screenshot"
            className="w-3xl mt-36  max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
          />


        </div>
      </div>
    </div>
  );
}
