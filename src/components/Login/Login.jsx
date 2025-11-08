import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Auth/Auth.css";

export default function Login({ toggleForm }) {
  const { login } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      ),
  });

  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit } = form;

  async function handelLogin(values) {
    setIsLoading(true);
    setApiError("");
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );
      if (res.data.message === "success") {
        login(res.data.token);
        toast.success("Logged in successfully 👋");
        setTimeout(() => navigate("/home"), 800);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Login failed";
      setApiError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const formEl = document.querySelector(".auth-form");
    if (formEl) formEl.classList.add("fade-slide-up");
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-3">
      <form
        onSubmit={handleSubmit(handelLogin)}
        className="auth-form card p-4 shadow-lg w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-danger">Welcome Back</h2>
        {apiError && (
          <div className="alert alert-danger text-center">{apiError}</div>
        )}

        <div className="mb-3">
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="form-control form-control-lg stylish-input"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="form-control form-control-lg stylish-input"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-danger w-100 mb-3 stylish-btn"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <p className="text-center mb-0 text-secondary">
          Don't have an account?{" "}
          <span
            className="text-danger fw-bold switch-form"
            onClick={toggleForm}
            style={{ cursor: "pointer" }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
