import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCircleCheck, faCircleExclamation, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const LOGIN_URL = `${API_BASE}/auth/login_json`;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState<{ text: string; type: string }>({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje({ text: "Validando credenciales...", type: "loading" });

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: nombre,
          password: contrasena,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Error de autenticacion");

      const rolNormalizado = (data.rol || "").toLowerCase();
      let destino = "";

      if (rolNormalizado === "admin") {
        destino = "/login/colegios";
      } else if (rolNormalizado === "estudiante") {
        destino = "/login/estudiantes";
      } else if (rolNormalizado === "docente") {
        destino = "/login/docentes";
      } else {
        throw new Error("Rol no reconocido");
      }

      localStorage.setItem("token", data.access_token || "");
      localStorage.setItem("rol", rolNormalizado);
      if (data.usuario) localStorage.setItem("usuario", JSON.stringify(data.usuario));
      if (data.perfil) localStorage.setItem("perfil", JSON.stringify(data.perfil));

      setMensaje({ text: "Inicio de sesion exitoso. Redirigiendo...", type: "success" });

      setTimeout(() => {
        navigate(destino, { replace: true });
      }, 800);
    } catch (error: any) {
      setMensaje({ text: "Credenciales incorrectas o rol invalido, vuelva a ingresar la contrasena", type: "error" });
    }
  };

  const renderMensaje = () => {
    if (!mensaje.text) return null;
    let icon = null;
    let color = "text-gray-700";
    if (mensaje.type === "loading") {
      icon = <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />;
      color = "text-blue-600";
    } else if (mensaje.type === "success") {
      icon = <FontAwesomeIcon icon={faCircleCheck} className="mr-2 text-green-600" />;
      color = "text-green-600";
    } else if (mensaje.type === "error") {
      icon = <FontAwesomeIcon icon={faCircleExclamation} className="mr-2 text-red-600" />;
      color = "text-red-600";
    }
    return (
      <div className={`flex items-center justify-center mb-5 text-sm font-semibold ${color} animate-fadeIn`}>
        {icon}
        <span>{mensaje.text}</span>
      </div>
    );
  };

  return (
    <main className="flex w-full min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-[#0d121b] text-4xl font-black tracking-tighter">Bienvenido de vuelta</h1>
          <p className="mt-2 text-[#4c669a]">Inicia sesion para continuar en tu cuenta.</p>
        </div>

        <div className="rounded-xl border border-[#d1d5db] bg-white p-6 shadow-md sm:p-8">
          {renderMensaje()}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#0d121b] pb-2">Nombre de usuario</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre"
                autoComplete="username"
                required
                className="block w-full rounded-lg border border-[#cfd7e7] bg-[#f8f9fc] placeholder:text-[#4c669a] text-[#0d121b] focus:border-[#135bec] focus:ring-[#135bec] h-12 text-base p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0d121b] pb-2">Contrasena</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Ingresa tu contrasena"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg border border-[#cfd7e7] bg-[#f8f9fc] placeholder:text-[#4c669a] text-[#0d121b] focus:border-[#135bec] focus:ring-[#135bec] h-12 pr-10 text-base p-3"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#4c669a] hover:text-[#135bec] transition"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border border-[#cfd7e7] text-[#135bec] focus:ring-[#135bec]"
                />
                <label className="ml-2 text-sm text-[#4c669a]">Recordarme</label>
              </div>
            </div>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-[#135bec] px-4 py-3 text-sm font-bold text-white hover:bg-[#1049b3] focus:outline-none focus:ring-2 focus:ring-[#135bec] focus:ring-offset-2 transition"
            >
              Iniciar Sesion
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#4c669a]">
          No tienes una cuenta?{" "}
          <Link to="/Signup" className="font-medium text-[#135bec] hover:text-[#1049b3]">
            Registrate aqui
          </Link>
        </p>
      </div>
    </main>
  );
}
