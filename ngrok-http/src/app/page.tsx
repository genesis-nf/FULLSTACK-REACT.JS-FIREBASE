// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "@/firebase/FirebaseConfig";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    });
  }, [router]);

  return (
    <div>
      <p>Redirigiendo...</p>
    </div>
  );
}




// 'use client';
// import React from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { fbAuth } from "../firebase/FirebaseConfig";

// export default function LoginPage() {
//   async function handleLogin() {
//     const userCredential = await signInWithEmailAndPassword(
//       fbAuth,
//       "usuario@email.com",
//       "contraseña123"
//     );
//     const token = await userCredential.user.getIdToken();

//     // Enviamos el token al backend
//     const res = await fetch("http://localhost:8000/user-data", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     console.log(data);
//   }

//   return <button onClick={handleLogin}>Iniciar sesión</button>;
// }
