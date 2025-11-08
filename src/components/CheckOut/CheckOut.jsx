import React, { useState, useContext } from "react";
import { CartContext } from "../Home/CartContext/CartContext";

export default function Checkout() {
  const { cartItems, clearCart, addToCart, decreaseFromCart } =
    useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "cash",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (isSubmitted) {
    return (
      <div
        className="container text-center py-5"
        style={{ paddingTop: "100px" }}
      >
        <h3 className="text-success fw-bold mb-3">✅ Order Confirmed!</h3>
        <p className="text-muted">
          Thank you, {form.name || "Customer"} — your order will be delivered
          soon.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ paddingTop: "100px" }}>
      <h2 className="text-center fw-bold text-danger mb-4">Checkout</h2>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <ul className="list-group mb-3">
                {cartItems.length > 0 ? (
                  cartItems.map((p) => (
                    <li
                      key={p._id || p.id}
                      className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2"
                    >
                      <div className="text-center text-sm-start w-100">
                        <span className="fw-semibold d-block">{p.title}</span>
                        <small className="text-muted d-block mb-1">
                          {typeof p.category === "object"
                            ? p.category.name
                            : p.category || ""}
                        </small>
                        <div className="d-flex justify-content-center justify-content-sm-start align-items-center gap-2">
                          <button
                            onClick={() => decreaseFromCart(p.id || p._id)}
                            className="btn btn-outline-danger btn-sm px-2 py-0"
                          >
                            −
                          </button>
                          <span className="fw-semibold">{p.quantity}</span>
                          <button
                            onClick={() => addToCart(p)}
                            className="btn btn-outline-success btn-sm px-2 py-0"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <strong className="text-nowrap">
                        {(p.price * (p.quantity || 1)).toLocaleString()} EGP
                      </strong>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center text-muted">
                    No items in your cart
                  </li>
                )}
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong className="text-danger">
                    {totalPrice.toLocaleString()} EGP
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Billing Details</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="2"
                    value={form.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    name="payment"
                    className="form-select"
                    value={form.payment}
                    onChange={handleChange}
                  >
                    <option value="cash">Cash on Delivery</option>
                    <option value="visa">Credit Card</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100 fw-semibold mt-3"
                >
                  Confirm Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
