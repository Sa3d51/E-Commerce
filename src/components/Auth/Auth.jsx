import React, { useState, useContext } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { UserContext } from "../UserContext/UserContext";
import { Navigate } from "react-router-dom";

export default function Auth() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { userToken } = useContext(UserContext);

  const toggleForm = () => setIsLoginForm(!isLoginForm);

  if (userToken) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center px-3 py-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {isLoginForm ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Register toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
}
