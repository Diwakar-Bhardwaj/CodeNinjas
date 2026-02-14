// src/components/product/ProductInfo.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import ShareButton from "./ShareButton";

const ProductInfo = ({ product }) => {
  return (
    <div className="space-y-4">

      <h3 className="text-sm text-blue-600 font-bold uppercase tracking-wide bg-blue-50 px-3 py-1 rounded-full inline-block">
        {product.brand} • {product.category}
      </h3>

      <h1 className="text-3xl font-extrabold">{product.title}</h1>

      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
          <FaStar className="text-yellow-500" />
          <span className="ml-1 font-bold">{product.rating}</span>
          
        </div>
        <span className="text-gray-500">{product.reviews.length} Reviews</span>
        <span> <ShareButton url={window.location.href} /> </span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

    </div>
  );
};

export default ProductInfo;
