import React from "react";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from './../NavBar/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />

<div className="container py-5 my-4">
        <Outlet />
</div>


      <Footer />
    </>
  );
}
