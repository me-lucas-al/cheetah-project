import React, { createContext, useContext, useState, useEffect } from "react";

// Criando o Contexto do Usuário
const UserContext = createContext();

// Provider que envolve os componentes e fornece o estado do usuário
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Verifica se o userId existe no localStorage e define-o no estado
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para consumir o contexto do usuário
export const useUser = () => {
  return useContext(UserContext);
};
