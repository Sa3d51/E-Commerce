// src/components/Auth/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) setUserToken(token);
  }, []);

  const login = (token) => {
    localStorage.setItem("userToken", token);
    setUserToken(token);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
  };

  return (
    <UserContext.Provider value={{ userToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
