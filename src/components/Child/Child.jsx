import React from "react";

export default function Child({ product, deleteProduct, updateProduct, index }) {
  let { id, code, price, onSale, category, } = product;
  return (
    <>
      <div className="col-md-4">
        <div className="card bg-info text-white p-3 rounded-3 position-relative ">
          <h1 className="h4"> Name: {code}</h1>
          <h6>Category: {category}</h6>
          <h3>Price: {price}</h3>
          {onSale == true ? (
            <div className="bg-danger position-absolute top-0 end-0 p-1">
              onsSale
            </div>
          ) : null}
          <button onClick={() => deleteProduct(id)} className="btn btn-danger">
            Delete <i className="fa fa-trash"></i>
          </button>
          <button onClick={() => updateProduct(index)} className="btn btn-dark my-2">
            update <i className="fa fa-pen"></i>
          </button>
        </div>
      </div>
    </>
  );
}
