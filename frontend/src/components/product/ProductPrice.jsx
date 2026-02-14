import React from "react";
import { formatPrice } from "../../utils/formatPrice";

const ProductPrice = ({ product, originalPrice }) => {
  return (
    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
      
      {/* 2-column layout */}
      <div className="grid grid-cols-2 items-center">

        {/* LEFT SIDE - PRICE */}
        <div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-extrabold text-blue-700">
              {formatPrice(product.price)}
            </span>

            <span className="text-sm text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>

            <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          </div>
        </div>

        {/* RIGHT SIDE - BUY NOW BUTTON */}
        <div className="flex justify-end">
          <button className="bg-blue-400 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow w-md py-3 ">
            Buy Now
          </button>
        </div>

      </div>
      
    </div>
  );
};

export default ProductPrice;
