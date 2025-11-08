import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container container py-5 px-3 px-md-5">
      <div className="text-center mb-5 fade-up">
        <h2 className="fw-bold text-danger fs-1 fs-md-2">About Us</h2>
        <p className="text-muted fs-6 fs-md-5">
          We’re redefining online shopping — fast, easy, and reliable.
        </p>
      </div>

      <div className="row g-4 text-center justify-content-center">
        <div className="col-10 col-sm-8 col-md-4 fade-up delay-1">
          <div className="p-4 border rounded-4 shadow-sm bg-white h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="fs-1 mb-3">🚀</div>
            <h5 className="fw-bold text-danger fs-5">Our Mission</h5>
            <p className="text-muted fs-6">
              To make online shopping in Egypt simple, affordable, and enjoyable
              for everyone.
            </p>
          </div>
        </div>

        <div className="col-10 col-sm-8 col-md-4 fade-up delay-2">
          <div className="p-4 border rounded-4 shadow-sm bg-white h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="fs-1 mb-3">💎</div>
            <h5 className="fw-bold text-danger fs-5">Our Values</h5>
            <p className="text-muted fs-6">
              Trust, quality, and customer satisfaction are at the heart of
              everything we do.
            </p>
          </div>
        </div>

        <div className="col-10 col-sm-8 col-md-4 fade-up delay-3">
          <div className="p-4 border rounded-4 shadow-sm bg-white h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="fs-1 mb-3">⚡</div>
            <h5 className="fw-bold text-danger fs-5">Our Promise</h5>
            <p className="text-muted fs-6">
              Fast delivery, secure payments, and genuine products every time.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-5 fade-up delay-4">
        <h5 className="fw-bold mb-2 text-danger fs-5">Join Our Journey</h5>
        <p className="text-muted mb-3 fs-6">
          Be part of the next generation of smarter shopping.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="btn btn-danger px-4 py-2 fw-semibold rounded-3"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
