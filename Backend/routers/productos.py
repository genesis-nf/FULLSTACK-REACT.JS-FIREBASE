from fastapi import APIRouter
from db import get_cursor

router = APIRouter()
mydb, cursor = get_cursor()

@router.get("/api/productos")
def get_productos():
    cursor.execute("SELECT * FROM productos")
    return cursor.fetchall()

@router.get("/api/productos/{producto_id}")
def get_productos_id(producto_id: int = None):
    if producto_id is not None:
        cursor.execute("SELECT * FROM productos WHERE Prod_Id = %s", (producto_id,))
        producto = cursor.fetchone()
        if not producto:
            return {"message": "Producto no encontrado."}
        return producto
    cursor.execute("SELECT * FROM productos")
    return cursor.fetchall()



# @router.get("/api/clientes/productos/{producto_id}")
# def clientes_por_producto(producto_id: int, nombre: str = None):
#     if nombre:
#         query = """
#             SELECT DISTINCT c.*
#             FROM clientes c
#             JOIN ventas v ON c.Cli_Id = v.Ventas_CliId
#             JOIN ventas_detalle vd ON v.Ventas_Id = vd.VD_VentasId
#             WHERE vd.VD_ProdId = %s AND c.Cli_RazonSocial LIKE %s
#         """
#         cursor.execute(query, (producto_id, f"%{nombre}%"))
#     else:
#         query = """
#             SELECT DISTINCT c.*
#             FROM clientes c
#             JOIN ventas v ON c.Cli_Id = v.Ventas_CliId
#             JOIN ventas_detalle vd ON v.Ventas_Id = vd.VD_VentasId
#             WHERE vd.VD_ProdId = %s
#         """
#         cursor.execute(query, (producto_id,))
#     return cursor.fetchall()
