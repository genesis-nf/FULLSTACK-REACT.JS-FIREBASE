import { AuthProvider } from "@/context/authContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}





// ✅ 4. Cómo usar el contexto en cualquier componente
// tsx
// Copiar código
// import { useUserAuth } from "@/context/AuthContext";

// export default function Dashboard() {
//   const { user, logOut } = useUserAuth();

//   return (
//     <div>
//       <h1>Hola {user?.displayName || "usuario"}!</h1>
//       <button onClick={logOut}>Cerrar sesión</button>
//     </div>
//   );
// }