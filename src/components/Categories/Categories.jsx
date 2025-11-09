import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container py-5 categories-container">
      <h2 className="fw-bold mb-4 text-center text-danger">Categories</h2>
      <div className="row g-3 g-md-4">
        {categories.map((cat) => (
          <div className="col-6 col-md-4 col-lg-3" key={cat._id}>
            <div
              className="category-card card border-0 shadow-sm rounded-4 overflow-hidden h-100"
              onClick={() => navigate(`/home/categories/${cat._id}`)}
            >
              <div className="image-wrapper">
                <img
                  src={cat.image}
                  className="card-img-top"
                  alt={cat.name}
                  loading="lazy"
                />
              </div>
              <div className="card-body text-center">
                <h6 className="fw-semibold text-capitalize text-dark mb-0">
                  {cat.name}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
