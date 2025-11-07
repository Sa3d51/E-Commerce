import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="navbar bg-danger w-100 py-2 px-3 fixed-top text-white"
      style={{
        minHeight: "60px",
      }}
    >
      <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0 w-100">
        <li>
          <NavLink
            to="/"
            className="navbar-brand text-white text-uppercase fw-bolder fs-5"
          >
            Home
          </NavLink>
        </li>

        <div className="d-flex gap-4 align-items-center">
          <li>
            <NavLink to="about" className="text-decoration-none text-white">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="contact" className="text-decoration-none text-white">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="cart" className="text-decoration-none text-white">
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="gallery" className="text-decoration-none text-white">
              Checkout
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
