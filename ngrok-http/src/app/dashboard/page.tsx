'use client';
import { useState, FormEvent } from 'react';
import AuthGuard from '@/lib/authGuard';

type Cliente = { Cli_Id: number; Cli_RazonSocial: string };

export default function PageAdmin() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [razonSocial, setRazonSocial] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState('');

  const limpiar = () => {
    setRazonSocial('');
    setEditandoId(null);
  };

  const agregarCliente = async (e: FormEvent) => {
    e.preventDefault();
    if (!razonSocial.trim()) return;

    if (editandoId === null) {
      // Agregar nuevo
      try {
        const res = await fetch('http://localhost:8000/api/clientes/agregar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre: razonSocial }),
        });

        const { id } = await res.json();
        setClientes([...clientes, { Cli_Id: id, Cli_RazonSocial: razonSocial }]);
        setMensaje('Cliente agregado');
        limpiar();
      } catch {
        setMensaje('Error al agregar cliente');
      }
    } else {
      // Editar existente
      try {
        await fetch(`http://localhost:8000/api/clientes/actualizar/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Cli_RazonSocial: razonSocial }),
        });

        setClientes(clientes.map(c =>
          c.Cli_Id === editandoId ? { ...c, Cli_RazonSocial: razonSocial } : c
        ));
        setMensaje('Cliente actualizado');
        limpiar();
      } catch {
        setMensaje('Error al actualizar cliente');
      }
    }

    setTimeout(() => setMensaje(''), 2000);
  };

  const editar = (cliente: Cliente) => {
    setRazonSocial(cliente.Cli_RazonSocial);
    setEditandoId(cliente.Cli_Id);
  };

  const eliminar = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/api/clientes/eliminar/${id}`, {
        method: 'DELETE',
      });

      setClientes(clientes.filter(c => c.Cli_Id !== id));
      setMensaje('Cliente eliminado');
      setTimeout(() => setMensaje(''), 2000);
    } catch {
      setMensaje('Error al eliminar cliente');
    }
  };

  return (
    <AuthGuard>
      {/* <ClientesFormulario
        clientes={clientes}
        razonSocial={razonSocial}
        setRazonSocial={setRazonSocial}
        editandoId={editandoId}
        setEditandoId={setEditandoId}
        agregarCliente={agregarCliente}
        editar={editar}
        eliminar={eliminar}
        mensaje={mensaje}
        limpiar={limpiar}
      /> */}
  

    <div style={{ padding: 20 }}>
      <h2 className='text-xl font-bold mb-5 m-2'>{editandoId ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      <h1>Bienvenido al Dashboard Privado</h1>
        <p>Solo puedes ver esto si has iniciado sesión.</p>

        
      <form onSubmit={agregarCliente} className='font-sans text-white p-4 rounded shadow flex'>
        <input
          className='border p-2 rounded w-full mb-4 mr-5'
          type="text"
          value={razonSocial}
          onChange={(e) => setRazonSocial(e.target.value)}
          placeholder="Razón Social"
          required
        />
        <button className='bg-green-500 text-white p-2 rounded h-11' type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        {editandoId && <button onClick={limpiar} className='bg-red-500 text-white p-2 rounded ml-2'>Cancelar</button>}
      </form>

      {mensaje && <p>{mensaje}</p>}

      {clientes.length > 0 && (
        <ul className='bg-gray-800 p-4 rounded shadow mt-4 w-md-5/9 m-auto'>
          <h3 className='text-blue-500 mb-4'>LISTADO DE NUEVOS CLIENTES INGRESADOS:</h3>
          
          {clientes.map((c) => (
            <li key={c.Cli_Id} className='flex justify-between items-center py-2 border-b'>
              <span className='text-white'>
                {c.Cli_Id} - {c.Cli_RazonSocial}
              </span>
              <div>
                <button onClick={() => editar(c)} className='text-blue-500 hover:underline'>✏️</button>
                <button onClick={() => eliminar(c.Cli_Id)} className='text-red-500 hover:underline ml-2'>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      )}  
     
    </div> 
    </AuthGuard>
  );
}























// 'use client';
// import { useState } from 'react';

// type Cliente = { Cli_Id: number; Cli_RazonSocial: string };

// export default function ClientesFormulario() {
//   const [clientes, setClientes] = useState<Cliente[]>([]);
//   const [razonSocial, setRazonSocial] = useState('');
//   const [mensaje, setMensaje] = useState('');

//   const agregarCliente = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!razonSocial.trim()) return;

//     try {
//       const res = await fetch('http://localhost:8000/api/clientes/agregar', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nombre: razonSocial }),
//       });

//       const { id } = await res.json();
//       setClientes([...clientes, { Cli_Id: id, Cli_RazonSocial: razonSocial }]);
//       setRazonSocial('');
//       setMensaje('Cliente agregado');
//       setTimeout(() => setMensaje(''), 2000);
//     } catch {
//       setMensaje('Error al agregar cliente');
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Agregar Cliente</h2>
//       <form onSubmit={agregarCliente}>
//         <input
//           type="text"
//           value={razonSocial}
//           onChange={(e) => setRazonSocial(e.target.value)}
//           placeholder="Razón Social"
//           required
//         />
//         <button type="submit">Agregar</button>
//       </form>

//       {mensaje && <p>{mensaje}</p>}

//       {clientes.length > 0 && (
//         <ul>
//           {clientes.map((c) => (
//             <li key={c.Cli_Id}>
//               {c.Cli_Id} - {c.Cli_RazonSocial}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }























// 'use client';
// import React, { useState, ChangeEvent, FormEvent } from 'react';

// // Interface para el cliente
// interface Cliente {
//   Cli_Id: number;
//   Cli_RazonSocial: string;
// }

// export default function ClientesFormulario() {
//   const [clientes, setClientes] = useState<Cliente[]>([]);
//   const [razonSocial, setRazonSocial] = useState<string>('');
//   const [mensaje, setMensaje] = useState<string>('');

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setRazonSocial(e.target.value);
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!razonSocial.trim()) {
//       setMensaje('La razón social no puede estar vacía.');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:8000/api/clientes/agregar', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nombre: razonSocial }),
//       });

//       if (!res.ok) throw new Error('Error al agregar cliente');
//       const result = await res.json();

//       const nuevoCliente: Cliente = {
//         Cli_Id: result.id,
//         Cli_RazonSocial: razonSocial,
//       };

//       setClientes((prev) => [...prev, nuevoCliente]);
//       setRazonSocial('');
//       setMensaje('Cliente agregado exitosamente');

//       setTimeout(() => setMensaje(''), 2000);
//     } catch (error) {
//       console.error(error);
//       setMensaje('Error al agregar cliente');
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Agregar Cliente</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Razón Social"
//           value={razonSocial}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Agregar</button>
//       </form>

//       {mensaje && <p>{mensaje}</p>}

//       {clientes.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h3>Clientes agregados en esta sesión:</h3>
//           <ul>
//             {clientes.map((cliente) => (
//               <li key={cliente.Cli_Id}>
//                 {cliente.Cli_Id} - {cliente.Cli_RazonSocial}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }













// 'use client';
// import React, { useState } from 'react';

// export default function ClientesFormulario() {
//   const [clientes, setClientes] = useState([]);
//   const [formData, setFormData] = useState({ Cli_RazonSocial: '' });
//   const [mensaje, setMensaje] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, Cli_RazonSocial: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.Cli_RazonSocial.trim()) return;

//     try {
//       const res = await fetch('http://localhost:8000/api/clientes/agregar', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nombre: formData.Cli_RazonSocial }),
//       });

//       if (!res.ok) throw new Error('Error al agregar cliente');

//       const result = await res.json();

//       setClientes((prev) => [
//         ...prev,
//         { Cli_Id: result.id, Cli_RazonSocial: formData.Cli_RazonSocial },
//       ]);
//       setFormData({ Cli_RazonSocial: '' });
//       setMensaje('Cliente agregado exitosamente');

//       setTimeout(() => setMensaje(''), 2000);
//     } catch (err) {
//       console.error(err);
//       setMensaje('Error al agregar cliente');
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Agregar Cliente</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Razón Social"
//           value={formData.Cli_RazonSocial}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Agregar</button>
//       </form>

//       {mensaje && <p>{mensaje}</p>}

//       {clientes.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h3>Clientes agregados en esta sesión:</h3>
//           <ul>
//             {clientes.map((cli) => (
//               <li key={cli.Cli_Id}>
//                 {cli.Cli_Id} - {cli.Cli_RazonSocial}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }























// 'use client'

// import React, { useEffect, useState } from 'react';

// export default function Page() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);


// // Comentario para saber que se tiene que hacer un formulario de clientes
// // para agregar, actualizar y eliminar clientes a la base de datos



//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/clientes/agregar")
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Cargando...</p>;

  

//   return (
//     <div>
//       <h1>Clientes</h1>
//       <div>
//         {data.map((cliente) => (
//           <div key={cliente.Cli_Id}>{cliente.Cli_RazonSocial}</div>
//         ))}
//       </div>
//     </div>
//   );
// }
