// src/app/login/page.tsx
// / Necesitamos crear una página de inicio de 
// sesión que permita a los usuarios
"use client";

// iniciar sesión con su correo y contraseña utilizando Firebase Authentication.
// Esta página debe tener un formulario con campos para el correo y la contraseña,

// y un botón para iniciar sesión. Al hacer clic en el botón, se debe llamar a la función
// `signInWithEmailAndPassword` de Firebase Authentication para autenticar al usuario.
// Si la autenticación es exitosa, se debe redirigir al usuario a la página de inicio
// de la aplicación. Si la autenticación falla, se debe mostrar un mensaje de error.
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fbAuth } from "@/firebase/FirebaseConfig";
import { useRouter } from "next/navigation";

// En caso que no tengas acceso, pueda enviarlo a registrarse
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(fbAuth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { fbAuth } from "@/firebase/FirebaseConfig";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(fbAuth, email, password);
//       router.push("/dashboard");
//     } catch (error: any) {
//       alert("Error al iniciar sesión: " + error.message);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Iniciar Sesión</h2>
//       <input
//         type="email"
//         placeholder="Correo"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       /><br />
//       <input
//         type="password"
//         placeholder="Contraseña"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       /><br />
//       <button onClick={handleLogin}>Entrar</button>
//     </div>
//   );
// }
