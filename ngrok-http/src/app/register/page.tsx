// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { fbAuth } from "@/firebase/FirebaseConfig";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(fbAuth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      const token = await userCredential.user.getIdToken();

      const res = await fetch("http://localhost:8000/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) throw new Error("Error al registrar en el backend");

      router.push("/dashboard");
    } catch (error) {
      console.error("Error de registro:", error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}
