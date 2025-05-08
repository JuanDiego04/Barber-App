import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// Proveedor del contexto de autenticación
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Almacena los datos del usuario autenticado
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Limpia los datos del usuario al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}