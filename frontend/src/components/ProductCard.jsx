import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import AddToCartButton from "./AddToCartButton";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
          size={14}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const imageUrl = product.imageUrl
    ? product.imageUrl
    : product.image
    ? `http://localhost:5000/uploads/${product.image}`
    : "https://via.placeholder.com/300x300?text=No+Image";

  const ownerName = product.owner?.firstName || product.owner?.email?.split("@")[0] || "Unknown";
  const avgRating = product.owner?.averageRating || 0;
  const totalReviews = product.owner?.totalReviews || 0;
  const avgProductRating = product.reviews?.length
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition h-full flex flex-col">
      {/* Image - Clickable Link to Product Detail */}
      <Link to={`/product/${product._id}`} className="relative overflow-hidden group block">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Unavailable</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-1">{product.title}</h3>

        {/* Category & City */}
        <div className="flex gap-2 text-xs text-gray-500 mb-2">
          <span>{product.category}</span>
          {product.city && <span>• {product.city}</span>}
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{product.description}</p>

        {/* Owner Info */}
        {product.owner && (
          <div className="bg-gray-50 p-2 rounded mb-2 border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-1">📦 Owner: {ownerName}</p>
            {product.owner.profileDescription && (
              <p className="text-xs text-gray-600 line-clamp-2">{product.owner.profileDescription}</p>
            )}
            {avgRating > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <StarRating rating={avgRating} />
                <span className="text-xs text-gray-600">({totalReviews} reviews)</span>
              </div>
            )}
          </div>
        )}

        {/* Product Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mb-2">
            <p className="text-xs font-semibold text-gray-700 mb-1">⭐ Product Rating:</p>
            <StarRating rating={avgProductRating} />
            {product.reviews.length > 0 && (
              <p className="text-xs text-gray-600 mt-1">
                Sample Review: "{product.reviews[0].comment?.substring(0, 40)}..."
              </p>
            )}
          </div>
        )}

        {/* Duration */}
        {product.maxDuration && (
          <p className="text-xs text-blue-600 mb-2">📅 Max Duration: {product.maxDuration} days</p>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="p-3 pt-0">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
