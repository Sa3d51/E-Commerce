import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { CartContext } from "../Home/CartContext/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { userToken, logout } = useContext(UserContext);
  const { cartItems = [] } = useContext(CartContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = document.getElementById("navbar");
    if (nav) nav.classList.add("navbar-fade-in");

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  return (
    <nav
      id="navbar"
      className={`navbar bg-danger fixed-top text-white px-3 py-2 ${
        scrolled ? "navbar-scrolled shadow-sm" : ""
      }`}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <NavLink
          to="/home"
          className="navbar-brand text-white text-uppercase fw-bold fs-5"
        >
          Home
        </NavLink>

        <button
          className="btn btn-outline-light d-md-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        <ul
          className={`list-unstyled d-md-flex align-items-center gap-4 mb-0 ${
            menuOpen
              ? "mobile-menu open d-flex flex-column text-center bg-danger w-100 mt-3 p-3 rounded"
              : "d-none d-md-flex"
          }`}
        >
          <li>
            <NavLink
              to="/home/about"
              className="nav-link-like text-white fw-medium"
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/contact"
              className="nav-link-like text-white fw-medium"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
          </li>
          <li className="position-relative">
            <NavLink
              to="/home/cart"
              className="nav-link-like text-white fw-medium position-relative"
              onClick={() => setMenuOpen(false)}
            >
              Cart
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/checkout"
              className="nav-link-like text-white fw-medium"
              onClick={() => setMenuOpen(false)}
            >
              Checkout
            </NavLink>
          </li>
          {userToken && (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="btn btn-outline-light btn-sm mt-2 mt-md-0"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
