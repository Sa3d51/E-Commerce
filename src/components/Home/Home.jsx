import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [apiProduct, setApiProduct] = useState([]);
  async function _getApi() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    console.log(data.data);
    setApiProduct(data.data);
  }

  useEffect(() => {
    _getApi();
  }, []);
  return (
    <>
      <div className="row">
        {apiProduct.length > 0 ? (
          apiProduct.map(function (apiProduct) {
            return (
              <div className=" col-2 " key={apiProduct.id}>
                <div className="item">
                  <img className="w-100" src={apiProduct.imageCover} alt="" />
                  <p>
                    Title:{apiProduct.title} <br /> price:{apiProduct.price}{" "}
                    <br />
                    ratingsAverage: {apiProduct.ratingsAverage}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
        )}
      </div>
    </>
  );
}
