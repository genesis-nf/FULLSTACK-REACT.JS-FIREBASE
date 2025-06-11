from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from db import get_cursor
# from fastapi import Body
from middleware.logging import log_requests
from routers import clientes_routes, productos, proveedores, ventas, saludos
from auth import verify_token
from fastapi import Depends
from db import get_cursor

db = get_cursor()
app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Middleware de ejemplo (logging)
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f">>> {request.method} {request.url}")
    response = await call_next(request)
    print(f"<<< {response.status_code}")
    return response

# # Registrar el router
# app.include_router(clientes_routes)

# app.middleware("http")(log_requests)

app.include_router(saludos.router)
app.include_router(clientes_routes.router)
app.include_router(productos.router)
app.include_router(proveedores.router)
app.include_router(ventas.router)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.post("/register-user")
def register_user(request: Request, user=Depends(verify_token)):
    db = get_cursor()
    cursor = db.cursor()

    try:
        # Insertar solo si no existe aún
        cursor.execute("SELECT * FROM personas_autorizadas WHERE auth_email = %s", (user["auth_email"],))
        exists = cursor.fetchone()
        if exists:
            return {"message": "Usuario ya registrado"}

        cursor.execute(
            "INSERT INTO personas_autorizadas (auth_email, auth_nombre) VALUES (%s, %s)",
            (user["auth_email"], user.get("auth_name", "Sin nombre")),
        )
        db.commit()
        return {"message": "Usuario guardado en la base de datos"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error al guardar usuario")
    finally:
        cursor.close()
        db.close()
        
        
@app.get("/user-data")
def get_user_data(user=Depends(verify_token)):
    cursor = get_cursor()

    # Verificar si el usuario está autorizado
    cursor.execute("SELECT * FROM personas_autorizadas WHERE auth_email = %s", (user["auth_email"],))
    autorizado = cursor.fetchone()
    if not autorizado:
        cursor.close()
        db.close()
        return {"message": "Usuario no autorizado"}

    # Obtener los datos del usuario si está en la tabla personas_autorizadas
    cursor.execute("SELECT * FROM personas_autorizadas WHERE auth_id = %s", (user["auth_id"],))
    data = cursor.fetchone()
    cursor.close()
    db.close()

    if not data:
        return {"message": "Usuario no encontrado"}

    return {"usuario": data}

# @app.middleware("http")
# async def log_requests(request: Request, call_next):
#     print(f"📥 Recibida petición: {request.method} {request.url}")
#     response = await call_next(request)
#     print(f"📤 Respuesta con status: {response.status_code}")
#     return response

# mydb, cursor = get_cursor()
  
# # limitar los datos a mostrar
# @app.get("/api/clientes")
# def get_usuarios():
#     select_query = "SELECT * FROM clientes LIMIT 20"
#     cursor.execute(select_query)
#     results = cursor.fetchall()
#     return results




# @app.get("/api/productos")
# def select_users(limit: int = 20):
#     select_query = f"SELECT * from productos LIMIT {limit}"
#     cursor.execute(select_query)
#     results = cursor.fetchall()
#     return results



# @app.get("/api/clientes/productos/{producto_id}")
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



# @app.get("/api/proveedores")
# def select_users(limit: int = 20):
#     select_query = f"SELECT * from proveedores LIMIT {limit}"
#     cursor.execute(select_query)
#     results = cursor.fetchall()
#     return results


# @app.get("/api/ventas")
# def select_users(limit: int = 20):
#     select_query = f"SELECT * from ventas LIMIT {limit}"
#     cursor.execute(select_query)
#     results = cursor.fetchall()
#     return results


# @app.get("/api/ventas_detalle")
# def select_users(limit: int = 20):
#     select_query = f"SELECT * from ventas_detalle LIMIT {limit}"
#     cursor.execute(select_query)
#     results = cursor.fetchall()
#     return results


# @app.get("/api/saludo")
# async def root():
#     return {"message": "Hola mundo!"}




# @app.post("/api/clientes/agregar", status_code=status.HTTP_201_CREATED)
# def create_user(cliente: dict = Body(...)):
#     # Validar si el campo viene en el cuerpo
#     if 'nombre' not in cliente:
#         raise HTTPException(status_code=400, detail="Falta el campo 'nombre'.")

#     insert_query = "INSERT INTO clientes (Cli_RazonSocial) VALUES (%s)"
#     values = (cliente['nombre'],)
#     cursor.execute(insert_query, values)
#     mydb.commit()

#     return {
#         "message": "Cliente creado exitosamente",
#         "id": cursor.lastrowid
#     }
    
    
    
    
    
# @app.put("/api/clientes/actualizar/{id}", status_code=status.HTTP_200_OK)
# def update_user(id: int, cliente: dict = Body(...)):
#     # Validar si el campo viene en el cuerpo
#     if 'nombre' not in cliente:
#         raise HTTPException(status_code=400, detail="Falta el campo 'nombre'.")

#     update_query = "UPDATE clientes SET Cli_RazonSocial = %s WHERE Cli_Id = %s"
#     values = (cliente['nombre'], id)
#     cursor.execute(update_query, values)
#     mydb.commit()

#     if cursor.rowcount == 0:
#         raise HTTPException(status_code=404, detail="Cliente no encontrado.")

#     return {"message": "Cliente actualizado exitosamente"}
    
    
    
    
    
    
# @app.get("/api/saludo2")
# async def saludo():
#     return {"message": "¿Qué tal?"}

# # python -m uvicorn main:app --reload






# # elegir clientes para eliminar de la tabla donde se encuentra y pasarlo 
# # a la tabla listado_clientes_deshabilitados con tres campos
# # id(recuentro en autoincremento), ref(id del cliente) y 
# # nombre(nombre del cliente), trasladando si id y nombre.

# @app.delete("/api/clientes/eliminar/{id}", status_code=status.HTTP_204_NO_CONTENT)
# def delete_user(id: int):
#     # Verificar si el cliente existe
#     select_query = "SELECT * FROM clientes WHERE Cli_Id = %s"
#     cursor.execute(select_query, (id,))
#     cliente = cursor.fetchone()

#     if not cliente:
#         raise HTTPException(status_code=404, detail="Cliente no encontrado.")

#     # Insertar en la tabla de deshabilitados
#     insert_query = "INSERT INTO listado_clientes_deshabilitados (ref, nombre) VALUES (%s, %s)"
#     values = (cliente['Cli_Id'], cliente['Cli_RazonSocial'])
#     cursor.execute(insert_query, values)

#     # Eliminar del cliente original
#     delete_query = "DELETE FROM clientes WHERE Cli_Id = %s"
#     cursor.execute(delete_query, (id,))
#     mydb.commit()

#     return {"message": "Cliente eliminado exitosamente."}




# # y el update de la tabla la tabla clientes
# @app.put("/api/clientes/actualizar/{id}", status_code=status.HTTP_200_OK)
# def update_disabled_user(id: int, cliente: dict = Body(...)):
#     # Validar si el campo viene en el cuerpo
#     if 'Cli_RazonSocial' not in cliente:
#         raise HTTPException(status_code=400, detail="Falta el campo 'Cli_RazonSocial'.")

#     # Actualizar en la tabla
#     update_query = "UPDATE clientes SET Cli_RazonSocial = %s WHERE Cli_Id = %s"
#     values = (cliente['Cli_RazonSocial'], id)
#     cursor.execute(update_query, values)
#     mydb.commit()

#     if cursor.rowcount == 0:
#         raise HTTPException(status_code=404, detail="Cliente no encontrado.")

#     return {"message": "Cliente actualizado exitosamente"}









  

# #y el update de la tabla listado_clientes_deshabilitados y la tabla clientes
# @app.put("/api/clientes/deshabilitados/actualizar/{id}", status_code=status.HTTP_200_OK)
# def update_disabled_user(id: int, cliente: dict = Body(...)):
#     # Validar si el campo viene en el cuerpo
#     if 'nombre' not in cliente:
#         raise HTTPException(status_code=400, detail="Falta el campo 'nombre'.")

#     # Actualizar en la tabla de deshabilitados
#     update_query = "UPDATE listado_clientes_deshabilitados SET nombre = %s WHERE ref = %s"
#     values = (cliente['nombre'], id)
#     cursor.execute(update_query, values)
#     mydb.commit()

#     if cursor.rowcount == 0:
#         raise HTTPException(status_code=404, detail="Cliente deshabilitado no encontrado.")

#     return {"message": "Cliente deshabilitado actualizado exitosamente"}    