// src/components/Auth/Login.jsx
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";

export default function Login({ toggleForm }) {
  const { login } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handelLogin(values) {
    setIsLoading(true);
    console.log(values);
    axios
      .post("https://linked-posts.routemisr.com/users/signin", values)
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
    <form
      onSubmit={handleSubmit(handelLogin)}
      className="max-w-md my-12 mx-auto"
    >
      <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
      {apiError && (
        <p className="bg-red-500 text-white p-2 rounded text-center mb-4">
          {apiError}
        </p>
      )}
      <input
        type="email"
        {...register("email")}
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-2 rounded mb-4"
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
      <p className="text-center">
        Don't have an account?{" "}
        <span onClick={toggleForm} className="text-blue-500 cursor-pointer">
          Register
        </span>
      </p>
    </form>
  );
}
