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
      <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
        <NavLink
          to="/home"
          className="navbar-brand text-white text-uppercase fw-bold fs-5 me-3"
        >
          Home
        </NavLink>

        <ul className="list-unstyled d-flex flex-wrap align-items-center gap-3 mb-0">
          <li>
            <NavLink
              to="/home/about"
              className="nav-link-like text-white fw-medium"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/contact"
              className="nav-link-like text-white fw-medium"
            >
              Contact
            </NavLink>
          </li>
          <li className="position-relative">
            <NavLink
              to="/home/cart"
              className="nav-link-like text-white fw-medium position-relative"
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
            >
              Checkout
            </NavLink>
          </li>
          {userToken && (
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm"
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
