import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Auth/Auth.css";

export default function Register({ toggleForm }) {
  const { login } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const schema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      rePassword: z.string(),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", rePassword: "" },
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function handleRegister(values) {
    try {
      setIsLoading(true);
      setApiError("");
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (res.data.message === "success") {
        login(res.data.token);
        toast.success("Account created successfully 🎉");
        setTimeout(() => navigate("/home"), 800);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
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
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="auth-form card p-4 shadow-sm mx-auto my-5"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="text-center mb-4 fw-bold text-success">Create Account</h2>
      {apiError && (
        <div className="alert alert-danger text-center">{apiError}</div>
      )}

      <div className="mb-3">
        <input
          type="text"
          {...register("name")}
          placeholder="Name"
          className={`form-control form-control-lg stylish-input ${
            errors.name ? "is-invalid" : ""
          }`}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>

      <div className="mb-3">
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className={`form-control form-control-lg stylish-input ${
            errors.email ? "is-invalid" : ""
          }`}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className={`form-control form-control-lg stylish-input ${
            errors.password ? "is-invalid" : ""
          }`}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <div className="mb-3">
        <input
          type="password"
          {...register("rePassword")}
          placeholder="Confirm Password"
          className={`form-control form-control-lg stylish-input ${
            errors.rePassword ? "is-invalid" : ""
          }`}
        />
        {errors.rePassword && (
          <div className="invalid-feedback">{errors.rePassword.message}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-success w-100 mb-3 stylish-btn"
      >
        {isLoading ? "Loading..." : "Register"}
      </button>

      <p className="text-center mb-0 text-secondary">
        Already have an account?{" "}
        <span className="text-success fw-bold switch-form" onClick={toggleForm}>
          Login
        </span>
      </p>
    </form>
  );
}
