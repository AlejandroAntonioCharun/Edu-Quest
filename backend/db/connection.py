import os

from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME", "eduquest")

if not MONGO_URL:
    raise RuntimeError("MONGO_URL no esta definida en las variables de entorno")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Colecciones principales (expuestas a las rutas genericas)
quizzes_collection = db.quizzes
preguntas_collection = db.preguntas
results_collection = db.results
docentes_collection = db.docentes
usuarios_collection = db.usuarios
colegios_collection = db.colegios
aulas_collection = db.aulas
estudiantes_collection = db.estudiantes
intentos_quiz_collection = db.intentos_quiz
respuestas_estudiante_collection = db.respuestas_estudiante
opciones_collection = db.opciones
resultados_aula_collection = db.resultados_aula


async def init_indexes():
    # Resultados (pin + dni) unico para evitar duplicados
    await results_collection.create_index([("pin", 1), ("dni", 1)], unique=True)
    # Usuarios
    await usuarios_collection.create_index("username", unique=True)
    await usuarios_collection.create_index("email", unique=True)
    # Preguntas por quiz
    await preguntas_collection.create_index("id_quiz")
    # Intentos por estudiante
    await intentos_quiz_collection.create_index("id_estudiante")
    # Opciones por pregunta
    await opciones_collection.create_index("id_pregunta")
