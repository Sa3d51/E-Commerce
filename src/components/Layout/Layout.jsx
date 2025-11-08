import React from "react";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./../NavBar/Navbar";

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 container py-4 mt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
