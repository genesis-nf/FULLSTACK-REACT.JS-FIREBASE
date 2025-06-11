# import firebase_admin
# from firebase_admin import credentials, auth
# from fastapi import Request, HTTPException
# from dotenv import load_dotenv
# from pathlib import Path
# # import os





# from pathlib import Path
# basedir = Path(__file__).resolve().parent
# cred = credentials.Certificate(basedir / "serviceAccountKey.json")


# # basedir = Path(__file__).resolve().parent
# # cred = credentials.Certificate(basedir / "serviceAccountKey.json")
# # firebase_admin.initialize_app(cred)
# # load_dotenv(basedir / ".env")
# # firebase_admin.initialize_app()


# # # Ruta absoluta al archivo
# # ruta_clave = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")
# # print("Ruta usada para la clave:", ruta_clave)

# # cred = credentials.Certificate(ruta_clave)
# # firebase_admin.initialize_app(cred)


# def verify_token(request: Request):
#     token = request.headers.get("Authorization")
#     if not token:
#         raise HTTPException(status_code=401, detail="Token requerido")
#     try:
#         decoded = auth.verify_id_token(token.split(" ")[1])
#         return decoded
#     except Exception:
#         raise HTTPException(status_code=401, detail="Token inválido")

# def get_user_email(request: Request):
#     decoded_token = verify_token(request)
#     return decoded_token.get("auth_email")

# auth.py





















# from firebase_admin import credentials, auth, initialize_app, _apps
# from pathlib import Path
# from fastapi import Request, HTTPException
# from dotenv import load_dotenv
# import os

# basedir = Path(__file__).resolve().parent
# load_dotenv(basedir / ".env")

# cred_path = basedir / os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# if not _apps:
#     cred = credentials.Certificate(cred_path)
#     initialize_app(cred)

# def verify_token(request: Request):
#     token = request.headers.get("Authorization")
#     if not token:
#         raise HTTPException(status_code=401, detail="Token requerido")
#     try:
#         decoded = auth.verify_id_token(token.split(" ")[1])
#         return decoded
#     except Exception:
#         raise HTTPException(status_code=401, detail="Token inválido")





























# auth.py
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Request, HTTPException
from pathlib import Path
from dotenv import load_dotenv
import os

# Cargar variables de entorno
basedir = Path(__file__).resolve().parent
load_dotenv(basedir / ".env")

print("Directorio base:", basedir)

# Ruta al archivo de credenciales
cred_path = basedir / os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "serviceAccountKey.json")

print("FRONTEND_URL:", os.getenv("FRONTEND_URL"))

# Inicializar Firebase solo si no está ya inicializado
if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

# Función para verificar token
def verify_token(request: Request):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Token requerido")
    try:
        decoded = auth.verify_id_token(token.split(" ")[1])
        return decoded
    except Exception:
        raise HTTPException(status_code=401, detail="Token inválido")
