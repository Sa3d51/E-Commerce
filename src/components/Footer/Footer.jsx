import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-custom bg-danger text-white text-center py-3">
      <h5 style={{ fontWeight: "bold", marginBottom: "8px" }}>Your Company</h5>
      <p style={{ fontSize: "14px", marginBottom: "15px" }}>
        Building digital experiences with passion and precision.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          fontSize: "18px",
          marginBottom: "15px",
        }}
      >
        <a href="#" style={{ color: "white" }}>
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" style={{ color: "white" }}>
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" style={{ color: "white" }}>
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" style={{ color: "white" }}>
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>

      <p style={{ fontSize: "13px", margin: 0 }}>
        © 2025 Your Company. All rights reserved.
      </p>
    </footer>
  );
}
