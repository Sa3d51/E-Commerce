import axios from "axios";
import React, { useEffect, useState, useContext, useRef } from "react";
import { CartContext } from "./CartContext/CartContext";
import "../animations/animations.css";

export default function Home() {
  const [apiProduct, setApiProduct] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const { addToCart, decreaseFromCart, cartItems } = useContext(CartContext);
  const observerRef = useRef(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setApiProduct(JSON.parse(savedProducts));
    } else {
      async function fetchProducts() {
        try {
          const { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/products"
          );
          setApiProduct(data.data);
          localStorage.setItem("products", JSON.stringify(data.data));
        } catch (err) {
          console.error("Error fetching products:", err);
        }
      }
      fetchProducts();
    }

    const savedCounts = JSON.parse(
      localStorage.getItem("productCounts") || "{}"
    );
    setProductCounts(savedCounts);
  }, []);

  useEffect(() => {
    const newCounts = {};
    cartItems.forEach((item) => {
      const id = item.id || item._id;
      newCounts[id] = item.quantity;
    });
    setProductCounts(newCounts);
    localStorage.setItem("productCounts", JSON.stringify(newCounts));
  }, [cartItems]);

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [apiProduct]);

  const handleAddToCart = (product) => addToCart(product, false);
  const handleDecrease = (product) => {
    const id = product.id || product._id;
    if (!productCounts[id]) return;
    if (typeof decreaseFromCart === "function") {
      decreaseFromCart(id, false);
    } else {
      console.error("❌ decreaseFromCart is not a function");
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-3 justify-content-center">
        {apiProduct.length > 0 ? (
          apiProduct.map((product, index) => {
            const id = product.id || product._id;
            const count = productCounts[id] || 0;

            return (
              <div
                key={id}
                className="col-12 col-sm-6 col-md-4 col-lg-3  animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="item text-center border rounded-4 p-3 h-100 d-flex flex-column justify-content-between shadow-sm bg-white hover-scale">
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
