import React, { useState } from "react";
import Child from "../Child/Child";

export default function Parent() {
  const [products, _setProducts] = useState([
    { id: 11, code: "samsung", price: 5000, onSale: false, category: "mobile" },
    { id: 12, code: "iphone", price: 6000, onSale: true, category: "mobile" },
    { id: 13, code: "realm", price: 7000, onSale: false, category: "mobile" },
    { id: 14, code: "sony", price: 8000, onSale: true, category: "mobile" },
    { id: 15, code: "xai", price: 9000, onSale: false, category: "mobile" },
    { id: 16, code: "mac", price: 99000, onSale: true, category: "mobile" },
  ]);

  function deleteProduct(productId) {
    let myProduct = structuredClone(products);
    let newProducts = myProduct.filter((product) => product.id !== productId);
    _setProducts(newProducts);
  }
  function updateProduct(index) {
    let myProduct = structuredClone(products);
    myProduct[index].price += 1000;
    _setProducts(myProduct);
  }

  return (
    <>
      <h1>Cart</h1>
      <div className="container ">
        <div className="row g-5 ">
          {products.map((myElement, i) => (
            <Child
              index={i}
              key={myElement.id}
              product={myElement}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
            />
          ))}
        </div>
      </div>
    </>
  );
}
