import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Botones/Button";

interface NavItem {
  label: string;
  to: string;
}

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Inicio", to: "/" },
    { label: "Sobre Nosotros", to: "/how-it-works" },
  ];

  // Cerrar menú al cambiar a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 border-b border-[#e7ebf3] shadow-sm">
      <div className="flex items-center justify-between px-6 lg:px-10 py-3 max-w-7xl mx-auto">
        
        {/* Logo */}
        <div className="flex items-center gap-3 text-[#0d121b] cursor-pointer">
          <div className="size-6">
            <svg
              viewBox="0 0 48 48"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-[-0.015em]">EduQuest</h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[#0d121b] text-sm font-medium hover:text-indigo-600 transition"
            >
              {item.label}
            </Link>
          ))}

          <div className="flex gap-3">
            <Button text="Ingresar" to="/login" size="sm" />
            <Button
              text="Comenzar"
              to="/signup"
              size="sm"
              variant="secondary"
              className="bg-[#e7ebf3]"
            />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Abrir menú"
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg  
            width="28"
      height="28"
      viewBox="0 0 24 24"
      stroke="black"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg  width="28"
      height="28"
      viewBox="0 0 24 24"
      stroke="black"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none">
              <path d="M4 6h18M4 12h18M4 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden absolute left-0 w-full bg-white shadow-md border-b border-gray-200
          transition-all duration-300 overflow-hidden
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="p-6 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-[#0d121b] text-base font-medium"
            >
              {item.label}
            </Link>
          ))}

          <Button text="Ingresar" to="/Login" size="md" />
          <Button text="Comenzar" to="/Signup" size="md" variant="secondary" />
        </div>
      </div>
    </header>
  );
}
