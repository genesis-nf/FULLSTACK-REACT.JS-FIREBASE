from fastapi import APIRouter, Body, HTTPException, status
from db import get_cursor

router = APIRouter()
mydb, cursor = get_cursor()

@router.get("/api/clientes")
def get_clientes():
    cursor.execute("SELECT * FROM clientes")
    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    results = [dict(zip(columns, row)) for row in rows]
    return results

@router.post("/api/clientes/agregar", status_code=status.HTTP_201_CREATED)
def create_cliente(cliente: dict = Body(...)):
    if 'nombre' not in cliente:
        raise HTTPException(status_code=400, detail="Falta el campo 'nombre'.")
    cursor.execute("INSERT INTO clientes (Cli_RazonSocial) VALUES (%s)", (cliente['nombre'],))
    mydb.commit()
    return {"message": "Cliente creado exitosamente", "id": cursor.lastrowid}


@router.put("/api/clientes/actualizar/{id}", status_code=status.HTTP_200_OK)
def update_cliente(id: int, cliente: dict = Body(...)):
    if 'Cli_RazonSocial' not in cliente:
        raise HTTPException(status_code=400, detail="Falta el campo 'Cli_RazonSocial'.")
    cursor.execute("UPDATE clientes SET Cli_RazonSocial = %s WHERE Cli_Id = %s", (cliente['Cli_RazonSocial'], id))
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Cliente no encontrado.")
    return {"message": "Cliente actualizado exitosamente"}





@router.delete("/api/clientes/eliminar/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cliente(id: int):
    cursor.execute("SELECT * FROM clientes WHERE Cli_Id = %s", (id,))
    cliente = cursor.fetchone()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado.")
    cursor.execute(
        "INSERT INTO listado_clientes_deshabilitados (ref, nombre) VALUES (%s, %s)",
        (cliente['Cli_Id'], cliente['Cli_RazonSocial'])
    )
    cursor.execute("DELETE FROM clientes WHERE Cli_Id = %s", (id,))
    mydb.commit()
    return {"message": "Cliente eliminado exitosamente."}



@router.get("/api/clientes/productos/{producto_id}")
def clientes_por_producto(producto_id: int, nombre: str = None):
    if nombre:
        query = """
            SELECT DISTINCT c.* FROM clientes c
            JOIN ventas v ON c.Cli_Id = v.Ventas_CliId
            JOIN ventas_detalle vd ON v.Ventas_Id = vd.VD_VentasId
            WHERE vd.VD_ProdId = %s AND c.Cli_RazonSocial LIKE %s
        """
        cursor.execute(query, (producto_id, f"%{nombre}%"))
    else:
        query = """
            SELECT DISTINCT c.* FROM clientes c
            JOIN ventas v ON c.Cli_Id = v.Ventas_CliId
            JOIN ventas_detalle vd ON v.Ventas_Id = vd.VD_VentasId
            WHERE vd.VD_ProdId = %s
        """
        cursor.execute(query, (producto_id,))
    return cursor.fetchall()