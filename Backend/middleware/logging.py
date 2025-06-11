from fastapi import Request

async def log_requests(request: Request, call_next):
    print(f"📥 Recibida petición: {request.method} {request.url}")
    response = await call_next(request)
    print(f"📤 Respuesta con status: {response.status_code}")
    return response
