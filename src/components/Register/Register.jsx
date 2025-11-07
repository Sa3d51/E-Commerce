// src/components/Auth/Register.jsx
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";

export default function Register({ toggleForm }) {
  const { login } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    rePassword: z.string(),
  }).refine(data => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"]
  });

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", rePassword: "" },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit } = form;

  const handelRegister = (values) => {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        if (res.data.message === "success") {
          login(res.data.token);
        }
      })
      .catch((err) => {
        setApiError(err.response?.data?.error || "Error");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(handelRegister)} className="max-w-md my-12 mx-auto">
      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
      {apiError && <p className="bg-red-500 text-white p-2 rounded text-center mb-4">{apiError}</p>}
      <input type="text" {...register("name")} placeholder="Name" className="w-full mb-4 p-2 border rounded" />
      <input type="email" {...register("email")} placeholder="Email" className="w-full mb-4 p-2 border rounded" />
      <input type="password" {...register("password")} placeholder="Password" className="w-full mb-4 p-2 border rounded" />
      <input type="password" {...register("rePassword")} placeholder="Confirm Password" className="w-full mb-4 p-2 border rounded" />
      <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white p-2 rounded mb-4">
        {isLoading ? "Loading..." : "Register"}
      </button>
      <p className="text-center">
        Already have an account?{" "}
        <span onClick={toggleForm} className="text-blue-500 cursor-pointer">Login</span>
      </p>
    </form>
  );
}
