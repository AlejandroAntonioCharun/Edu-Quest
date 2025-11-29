from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db.connection import usuarios_collection

router = APIRouter(prefix="/auth", tags=["Autenticacion"])


class LoginRequest(BaseModel):
    username: str
    password: str


def _serialize_user(user: dict) -> dict:
    """Convierte el usuario de Mongo en un dict serializable para el frontend."""
    return {
        "id": str(user.get("_id")),
        "username": user.get("username"),
        "nombre": user.get("nombre"),
        "rol": user.get("rol"),
        "correo": user.get("correo"),
        "email": user.get("email"),
    }


@router.post("/login_json")
async def login_json(credentials: LoginRequest):
    user = await usuarios_collection.find_one({"username": credentials.username})

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    # Validacion sin hash: compara texto plano almacenado en el campo "password".
    if user.get("password") != credentials.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    rol = (user.get("rol") or "").lower()
    if rol not in {"admin", "estudiante", "docente"}:
        raise HTTPException(status_code=403, detail="Rol no autorizado")

    return {
        "access_token": "login-ok",
        "rol": rol,
        "usuario": _serialize_user(user),
        "perfil": user.get("perfil") or {},
    }
