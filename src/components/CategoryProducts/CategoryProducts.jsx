import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Home/CartContext/CartContext";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart, decreaseFromCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
        );
        setProducts(data.data);
      } catch (err) {
        console.error("Error fetching category products:", err);
      }
    }
    fetchProducts();
  }, [id]);

  const getQuantity = (productId) => {
    const item = cartItems.find((i) => i.id === productId || i._id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product) => addToCart(product);
  const handleDecrease = (product) => decreaseFromCart(product.id || product._id);

  return (
    <div className="container py-4">
      <div className="row g-3 justify-content-center">
        {products.length > 0 ? (
          products.map((product) => {
            const id = product.id || product._id;
            const count = getQuantity(id);
            return (
              <div
                key={id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="item text-center border rounded-4 p-3 h-100 d-flex flex-column justify-content-between shadow-sm bg-white">
                  <div className="flex-grow-1">
                    <img
                      className="w-100 rounded-3 mb-2"
                      src={product.imageCover}
                      alt={product.title}
                      style={{ height: "160px", objectFit: "cover" }}
                    />
                    <h6 className="fw-bold text-truncate">{product.title}</h6>
                    <p className="text-muted small mb-1">
                      Price:{" "}
                      <span className="fw-semibold text-danger">
                        {product.price} EGP
                      </span>
                    </p>
                    <p className="small text-secondary mb-0">
                      ⭐ {product.ratingsAverage}
                    </p>
                  </div>

                  {count > 0 ? (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleDecrease(product)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        −
                      </button>
                      <span className="fw-bold">{count}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-outline-success btn-sm"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-danger w-100 mt-3 fw-semibold"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
