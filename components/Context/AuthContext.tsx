"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  // Load session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("super-admin-user");
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (email: string) => {
    setUser(email);
    localStorage.setItem("super-admin-user", email);
    router.push("/super-admin");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("super-admin-user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
