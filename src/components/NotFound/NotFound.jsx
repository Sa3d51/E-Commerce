import React from "react";
import "../NotFound/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Page Not Found</h2>
      <p className="notfound-text">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <a href="#/home" className="btn btn-danger mt-3 px-4 fw-semibold">
        Go Home
      </a>
    </div>
  );
}
