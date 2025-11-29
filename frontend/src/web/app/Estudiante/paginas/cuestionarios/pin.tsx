import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizByPin } from "../../../api";


export default function EnterPin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verificarPin = async () => {
    if (!pin.trim()) {
      setError("Por favor ingresa un PIN valido.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const quiz = await getQuizByPin(pin);
      navigate(`/quizzes/${pin}`, { state: { quiz } });
    } catch (err) {
      setError("PIN incorrecto o quiz no encontrado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white flex flex-col items-center text-center">
        <h2 className="text-[#0d121b] text-3xl font-bold mb-6">
          Ingresa el PIN de  la sala
        </h2>

        <div className="w-full px-2 mb-6">
          <input
            placeholder="Ejemplo: AS-4938"
            value={pin}
            onChange={(e) => setPin(e.target.value.toUpperCase())}
            className="
              w-full h-14 
              border border-[#cfd7e7] 
              rounded-xl 
              bg-[#f8f9fc] 
              px-4 text-base 
              text-[#0d121b] 
              placeholder:text-[#4c669a]
              focus:outline-none 
              focus:ring-2 
              focus:ring-[#135bec] 
              focus:border-transparent
              uppercase
            "
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4 font-medium">{error}</p>}

        <button
          onClick={verificarPin}
          disabled={loading}
          className={`
            w-full h-12 rounded-lg font-semibold transition 
            ${loading ? "opacity-50 cursor-not-allowed" : "bg-[#e7ebf3] hover:bg-[#d6ddeb]"} 
            text-[#0d121b]
          `}
        >
          {loading ? "Verificando..." : "Comenzar"}
        </button>
      </div>
    </div>
  );
}
