import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAllSubCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/subcategories"
      );
      setSubCategories(data.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllSubCategories();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center text-danger">
        All Subcategories
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {subCategories.map((sub) => (
            <div className="col-6 col-md-4 col-lg-3" key={sub._id}>
              <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
                <h6 className="fw-semibold text-capitalize">{sub.name}</h6>
                <p className="text-muted small mb-0">{sub.category?.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
