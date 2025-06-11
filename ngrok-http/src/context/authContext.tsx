"use client";

import React, { createContext, useContext } from "react";
import { User } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";

interface AuthContextType {
  user: User | null;
  googleSignIn: () => void;
  logOut: () => void;
  error?: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, googleSignIn, logOut, error } = useAuth();

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useUserAuth must be used within an AuthProvider");
  return context;
};
