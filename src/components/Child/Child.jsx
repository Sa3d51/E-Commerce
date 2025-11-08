import React from "react";

export default function Child({
  product,
  deleteProduct,
  updateProduct,
  index,
}) {
  const { id, code, price, onSale, category } = product;

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4">
      <div className="card bg-info text-white p-3 rounded-3 position-relative h-100">
        <h1 className="h5">Name: {code}</h1>
        <h6>Category: {category}</h6>
        <h4>Price: {price}</h4>

        {onSale === true && (
          <div className="bg-danger position-absolute top-0 end-0 p-1 rounded-start">
            onSale
          </div>
        )}

        <div className="mt-3 d-flex flex-column flex-sm-row gap-2">
          <button
            onClick={() => deleteProduct(id)}
            className="btn btn-danger flex-fill"
          >
            Delete <i className="fa fa-trash"></i>
          </button>
          <button
            onClick={() => updateProduct(index)}
            className="btn btn-dark flex-fill"
          >
            Update <i className="fa fa-pen"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
