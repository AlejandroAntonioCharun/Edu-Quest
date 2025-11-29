import { useState } from "react";
import {
  faSearch,
  faBell,
  faMoon,
  faSun,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 sm:px-10 lg:px-20 py-3 bg-white dark:bg-gray-800/50 sticky top-0 z-10 backdrop-blur-sm">
      {/* 🧠 Logo + Buscador */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 text-gray-900 dark:text-white">
          <FontAwesomeIcon icon={faChartPie} className="text-indigo-600 text-xl" />
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            EduQuest
          </h2>
        </div>

        {/* 🔍 Buscador */}
        <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full items-stretch rounded-lg h-full">
            <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4 rounded-l-lg bg-gray-100 dark:bg-gray-700">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="flex-1 rounded-r-lg border-none bg-gray-100 dark:bg-gray-700 px-4 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
          </div>
        </label>
      </div>

      {/* 🔔 Botones de acción */}
      <div className="flex items-center justify-end gap-2 sm:gap-4">
        {/* Notificaciones */}
        <button className="flex items-center justify-center rounded-lg h-10 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <FontAwesomeIcon icon={faBell} />
        </button>

        {/* Modo oscuro */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center rounded-lg h-10 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>

        {/* Avatar */}
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-300 dark:border-gray-600"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLa97ZCu6CAyQfeBEhROjSFu3wdG5Yre22XvVAvF7CG33TiqCCxgyrMwOBafHJ6L7ThZaa5JEi4xVUHBMK-PlCRdAddTqLiKjFJGZuj1LP6pVYaPTx196gylZN5BhAuxrtgOPaoF3ow0gyPbCkGUe-8VmX2zpezMmJ7nj92EiOArIYKyr15PSXRug9ToZ8YidA781c6dT2fCyewoomkGJ-zyQuBIfw6kXd_Dli2r0LQVs7LDlAFNTGt2Bv3PJ3nQbf3RbcuVVtFlg')",
          }}
        ></div>
      </div>
    </header>
  );
}