import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from './CartContext/CartContext';

export default function Home() {
  const [apiProduct, setApiProduct] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setApiProduct(JSON.parse(savedProducts));
    } else {
      async function fetchProducts() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        setApiProduct(data.data);
        localStorage.setItem("products", JSON.stringify(data.data));
      }
      fetchProducts();
    }
  }, []);

  return (
    <div className="row">
      {apiProduct.length > 0 ? (
        apiProduct.map((product) => (
          <div className="col-6 col-md-4 col-lg-2 mb-3" key={product.id || product._id}>
            <div className="item text-center border rounded p-2 h-100 d-flex flex-column justify-content-between">
              <div>
                <img className="w-100" src={product.imageCover} alt={product.title} />
                <p className="mt-2 mb-0">
                  <strong>{product.title}</strong> <br />
                  Price: {product.price} EGP <br />
                  Rate: {product.ratingsAverage}
                </p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="btn btn-danger mt-2 w-100"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
<div className="d-flex justify-content-center align-items-center py-5">
  <div className="spinner-border text-danger" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>


      )}
    </div>
  );
}
