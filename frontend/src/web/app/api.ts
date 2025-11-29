const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(
  /\/+$/,
  ""
);

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail || "Error al conectar con el backend");
  return data as T;
}

export function fetchCollection<T = any>(name: string) {
  return request<T>(`/mongo/${name}`);
}

export function getQuizByPin(pin: string) {
  return request(`/quiz/pin/${pin}`);
}

export function getQuizDetalle(quizId: string) {
  return request(`/quiz/${quizId}/detalle`);
}

export function submitQuiz(quizId: string, payload: any) {
  return request(`/quiz/${quizId}/submit`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getResultadosPorPin(pin: string) {
  return request(`/quiz/pin/${pin}/resultados`);
}

export function generarQuizIA(payload: { curso: string; tema: string; cantidad_preguntas: number; puntos_por_pregunta: number }) {
  return request(`/quiz/generar`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export { API_BASE };
