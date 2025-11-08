import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
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
