from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import MongoAPI, Auth, QuizFlow
from db.connection import init_indexes

app = FastAPI(title="Programa Colegio API")

# Middleware CORS (para permitir peticiones desde frontend o localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringir a tu dominio frontend si prefieres
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas registradas
app.include_router(MongoAPI.router)
app.include_router(Auth.router)
app.include_router(QuizFlow.router)


@app.get("/")
def root():
    return {"message": "FastAPI desplegado correctamente"}


@app.on_event("startup")
async def startup_event():
    await init_indexes()
