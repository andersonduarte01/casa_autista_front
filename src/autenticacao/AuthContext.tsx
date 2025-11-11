// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { getUser, isAuthenticated, logout } from "./auth";

interface User {
  id: number;
  email: string;
  nome: string;
  tipo: string;
  painel_url: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUser());

  useEffect(() => {
    if (!isAuthenticated()) setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
