import React from "react";

export default function Contact() {
  return (
    <div className="contact-page container py-5" style={{ paddingTop: "100px" }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold text-danger">Contact Us</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Have any questions or ideas? We'd love to hear from you!  
          Fill out the form below and our team will get back to you shortly.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form className="p-4 border rounded-4 shadow-sm bg-light">
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-semibold">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="form-control"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-danger px-4 fw-semibold"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mt-5">
        <h5 className="fw-bold text-danger mb-2">Our Office</h5>
        <p className="text-muted mb-1">
          123 Main Street, Cairo, Egypt
        </p>
        <p className="text-muted mb-0">
          <i className="fas fa-envelope me-2"></i> support@yourcompany.com
        </p>
      </div>
    </div>
  );
}
