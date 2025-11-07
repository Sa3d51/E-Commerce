import React, { useContext } from "react";
import { CartContext } from './../Home/CartContext/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  if (cartItems.length === 0)
    return <h3 className="text-center py-5">Your Cart is Empty 🛒</h3>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>
      <div className="row g-3">
        {cartItems.map((item) => (
          <div className="col-6 col-md-4 col-lg-3" key={item.id}>
            <div className="border rounded p-2 text-center">
              <img src={item.imageCover} alt={item.title} className="w-100 rounded" />
              <h6 className="mt-2">{item.title}</h6>
              <p className="mb-1">Price: {item.price} EGP</p>
              <p className="mb-2">Qty: {item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn btn-outline-danger btn-sm w-100"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button onClick={clearCart} className="btn btn-danger">
          Clear Cart
        </button>
      </div>
    </div>
  );
}
