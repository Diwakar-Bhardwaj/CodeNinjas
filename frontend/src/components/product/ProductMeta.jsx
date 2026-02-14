// src/components/product/ProductMeta.jsx
import React from "react";
import { FaBoxOpen, FaTag, FaShippingFast, FaUndo } from "react-icons/fa";

const ProductMeta = ({ product }) => {
  return (
    <div className="grid grid-cols-2 gap-3 text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-xl">

      <div className="flex items-center"><FaBoxOpen className="mr-2 text-blue-500" /> {product.stock} Left</div>
      <div className="flex items-center"><FaTag className="mr-2 text-blue-500" /> SKU: {product.sku}</div>
      <div className="flex items-center"><FaUndo className="mr-2 text-blue-500" /> {product.returnPolicy}</div>
      <div className="flex items-center"><FaShippingFast className="mr-2 text-blue-500" /> {product.shippingInformation}</div>

    </div>
  );
};

export default ProductMeta;
