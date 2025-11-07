import React from "react";

export default function About() {
  return (
    <div className="container py-5" style={{ paddingTop: "100px", maxWidth: "800px" }}>
      <h2 className="text-center fw-bold text-danger mb-4">About Us</h2>

      <p className="text-muted lead text-center mb-5">
        We are passionate about crafting seamless digital experiences that connect people, inspire trust, and deliver value.
      </p>

      <div className="mb-5">
        <h4 className="fw-semibold mb-3 text-dark">Our Mission</h4>
        <p className="text-secondary">
          Our mission is to provide high-quality products and services that combine performance, design, and reliability. 
          We believe in innovation, transparency, and continuous improvement to meet the needs of our customers.
        </p>
      </div>

      <div className="mb-5">
        <h4 className="fw-semibold mb-3 text-dark">Our Vision</h4>
        <p className="text-secondary">
          We aim to become a trusted brand that people rely on globally, recognized for integrity, creativity, and customer satisfaction. 
          Our focus is to build a digital environment where technology simplifies life.
        </p>
      </div>

      <div className="mb-5">
        <h4 className="fw-semibold mb-3 text-dark">Our Values</h4>
        <ul className="list-unstyled text-secondary ps-3">
          <li>✅ Integrity — honesty and openness in everything we do.</li>
          <li>✅ Innovation — always exploring smarter ways to improve.</li>
          <li>✅ Customer First — your satisfaction is our top priority.</li>
          <li>✅ Teamwork — success comes through collaboration.</li>
        </ul>
      </div>

      <div className="text-center border-top pt-4">
        <p className="text-muted small mb-0">
          © 2025 Your Company. Designed with ❤️ by our creative team.
        </p>
      </div>
    </div>
  );
}
