from fastapi import APIRouter

router = APIRouter()

@router.get("/", tags=["root"])
async def read_root():
    return {"message": "Welcome to your todo list."}

@router.get("/api/saludo")
async def root():
    return {"message": "Hola mundo!"}
