from fastapi import APIRouter
from db import get_cursor

router = APIRouter()
mydb, cursor = get_cursor()

@router.get("/api/ventas")
def get_ventas():
    cursor.execute("SELECT * FROM ventas")
    return cursor.fetchall()

@router.get("/api/ventas_detalle")
def get_ventas_detalle():
    cursor.execute("SELECT * FROM ventas_detalle")
    return cursor.fetchall()
