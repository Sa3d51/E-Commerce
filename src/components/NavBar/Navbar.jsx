import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <div
      id="navbar"
      className=" navbar bg-danger w-100  p-3 fixed-top text-white text-center"
    >
      <ul className="list-unstyled d-flex gap-4 mb-0 pb-0">
        <li>
          <NavLink
            to="/"
            className="navbar-brand text-white text-uppercase fw-bolder fs-2"
          >
            {" "}
            All Products
          </NavLink>
        </li>
        <div className="d-flex gap-4 align-items-center ">
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
            <NavLink to="parent" className="text-decoration-none text-white">
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="Gallery" className="text-decoration-none text-white">
              Gallery
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
}
