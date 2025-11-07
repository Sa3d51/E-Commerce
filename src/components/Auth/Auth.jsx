// src/components/Auth/Auth.jsx
import React, { useState, useContext } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { UserContext } from "../UserContext/UserContext";
import Products from "../Home/Home"; 

export default function Auth() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { userToken } = useContext(UserContext);

  const toggleForm = () => setIsLoginForm(!isLoginForm);

  if (userToken) {
    return <Products />;
  }

  return (
    <div>
      {isLoginForm ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
    </div>
  );
}
