import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { CartContext } from "../Home/CartContext/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { userToken, setUserToken } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/");
  };

  const cartCount =
    cartItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <nav id="navbar" className="navbar navbar-expand bg-danger navbar-dark fixed-top">
      <div className="container-fluid d-flex justify-content-center align-items-center flex-wrap px-3">
        {userToken && (
          <ul className="navbar-nav flex-row flex-wrap align-items-center gap-3 mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink to="/home/categories" className="nav-link px-2">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/home/all-products" className="nav-link px-2">
                All Products
              </NavLink>
            </li>
            <li className="nav-item position-relative">
              <NavLink to="/home/cart" className="nav-link position-relative px-2">
                <i className="fa-solid fa-cart-shopping"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/home/checkout" className="nav-link px-2">
                <i className="fa-solid fa-credit-card"></i>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle btn-sm"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end bg-danger border-0 shadow-sm"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <NavLink className="dropdown-item text-white" to="/home/about">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item text-white" to="/home/contact">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <button
                    className="dropdown-item text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
