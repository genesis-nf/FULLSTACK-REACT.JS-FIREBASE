import { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { fbAuth } from "@/firebase/FirebaseConfig";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(fbAuth, provider);
      setUser(result.user);
    } catch (err) {
      setError("Error al iniciar sesión con Google");
    }
  };

  const logOut = async () => {
    try {
      await signOut(fbAuth);
      setUser(null);
    } catch (err) {
      setError("Error al cerrar sesión");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return { user, googleSignIn, logOut, error };
};
