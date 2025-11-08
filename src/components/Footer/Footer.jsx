import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-custom bg-danger text-white text-center py-4 px-3">
      <h5 className="fw-bold mb-2 fs-5">Your Company</h5>
      <p className="mb-3" style={{ fontSize: "14px" }}>
        Building digital experiences with passion and precision.
      </p>

      <div
        className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-3"
        style={{ fontSize: "18px" }}
      >
        <a href="#" className="text-white">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-white">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-white">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="text-white">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>

      <p className="mb-0" style={{ fontSize: "13px" }}>
        © 2025 Your Company. All rights reserved.
      </p>
    </footer>
  );
}
