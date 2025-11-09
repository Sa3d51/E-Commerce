import React, { useContext } from "react";
import { CartContext } from "./../Home/CartContext/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, addToCart, decreaseFromCart, removeFromCart, clearCart } =
    useContext(CartContext);

  if (cartItems.length === 0)
    return <h3 className="text-center py-5">Your Cart is Empty 🛒</h3>;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>
      <div className="row g-3">
        {cartItems.map((item) => (
          <div className="col-6 col-md-4 col-lg-3" key={item.id || item._id}>
            <div className="border rounded p-2 text-center h-100 d-flex flex-column justify-content-between shadow-sm">
              <div>
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-100 rounded"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <h6 className="mt-2 text-truncate">{item.title}</h6>
                <p className="mb-1 text-muted">Price: {item.price} EGP</p>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                <button
                  onClick={() => decreaseFromCart(item.id || item._id)}
                  className="btn btn-outline-danger btn-sm px-3"
                >
                  ➖
                </button>
                <span className="fw-bold fs-6">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="btn btn-outline-success btn-sm px-3"
                >
                  ➕
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id || item._id)}
                className="btn btn-outline-danger btn-sm w-100 mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <h4 className="mb-3 fw-semibold">Total: {totalPrice.toFixed(2)} EGP</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={clearCart}
            className="btn btn-danger px-4 py-2 fw-semibold"
          >
            Clear Cart
          </button>
          <Link
            to="/home/checkout"
            className="btn btn-success px-4 py-2 fw-semibold"
          >
            Go to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
