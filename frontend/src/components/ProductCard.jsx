import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {
  const imageUrl = product.image
    ? `http://localhost:5000/uploads/${product.image}` // images served from /uploads folder
    : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition p-2 flex flex-col h-full">
      <Link
        to={`/product/${product._id}`}
        className="block flex-grow"
      >
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
        <div className="mt-2">
          <h3 className="font-semibold text-gray-800">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
      </Link>
      <div className="mt-3">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
