from fastapi import APIRouter
from db import get_cursor

router = APIRouter()
mydb, cursor = get_cursor()

@router.get("/api/proveedores")
def get_proveedores():
    cursor.execute("SELECT * FROM proveedores")
    return cursor.fetchall()