// src/components/product/ProductReviews.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

const ProductReviews = ({ reviews }) => {
  if (!reviews.length) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center">
              {[...Array(5)].map((_, j) => (
                <FaStar
                  key={j}
                  className={j < review.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <p className="text-sm mt-2">"{review.comment}"</p>
            <p className="text-xs text-gray-500 mt-1">
              – {review.reviewerName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
