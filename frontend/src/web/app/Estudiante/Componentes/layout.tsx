import Header from "../Componentes/navbar_estudiantes";
import DashboardEstudiantes from "../paginas/dashboard";
import EstudianteHub from "../paginas/hub";

export default function EstudianteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="flex-1 flex justify-center items-start px-4 sm:px-10 lg:px-20 py-8">
        <div className="w-full max-w-6xl space-y-10">
          <EstudianteHub />
          <DashboardEstudiantes />
        </div>
      </main>
    </div>
  );
}
