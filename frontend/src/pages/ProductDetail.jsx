import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import ReviewForm from "../components/ReviewForm";
import AddToCartButton from "../components/AddToCartButton";

const StarRating = ({ rating }) => {
  // Ensure rating is a number
  const numRating = Number(rating) || 0;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < Math.floor(numRating) ? "text-yellow-400" : "text-gray-300"}
          size={18}
        />
      ))}
      <span className="text-lg text-gray-600">({Number(numRating).toFixed(1)})</span>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      setProduct(data.product);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const handleReviewAdded = (updatedProduct) => {
    setProduct(updatedProduct);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-xl text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const imageUrl = product.imageUrl || (product.image ? `http://localhost:5000/uploads/${product.image}` : "https://via.placeholder.com/500x500?text=No+Image");
  const ownerName = product.owner?.firstName || product.owner?.email?.split("@")[0] || "Unknown";
  const avgProductRating = product.reviews?.length
    ? Number((product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1))
    : 0;

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-semibold"
      >
        <FaArrowLeft /> Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left: Image */}
        <div className="flex flex-col">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500x500?text=No+Image";
            }}
          />
          {!product.available && (
            <div className="mt-4 bg-red-100 text-red-700 p-4 rounded text-center font-bold">
              This item is currently unavailable
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          {/* Title & Status */}
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-4 mb-4 text-gray-600">
            <span className="text-lg">{product.category}</span>
            {product.city && <span>📍 {product.city}</span>}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 leading-relaxed">{product.description}</p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded">
            <div>
              <p className="text-sm text-gray-600">Max Duration</p>
              <p className="text-lg font-bold">{product.maxDuration} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-bold">{product.available ? "Available" : "Unavailable"}</p>
            </div>
          </div>

          {/* Owner Info */}
          {product.owner && (
            <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
              <h3 className="text-lg font-bold mb-2">📦 About the Owner</h3>
              <p className="text-gray-700 mb-2">
                <strong>Name:</strong> {ownerName}
              </p>
              {product.owner.profileDescription && (
                <p className="text-gray-700 mb-2">
                  <strong>Bio:</strong> {product.owner.profileDescription}
                </p>
              )}
              {product.owner.city && (
                <p className="text-gray-700 mb-2">
                  <strong>Location:</strong> {product.owner.city}
                </p>
              )}
              {product.owner.averageRating > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">Lender Rating:</p>
                  <StarRating rating={product.owner.averageRating} />
                  <p className="text-sm text-gray-600 mt-1">({product.owner.totalReviews} reviews)</p>
                </div>
              )}
            </div>
          )}

          {/* Add to Cart */}
          {product.available && (
            <div className="mb-6">
              <AddToCartButton product={product} />
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Review Form */}
        <div className="md:col-span-1">
          <ReviewForm productId={product._id} onReviewAdded={handleReviewAdded} />
        </div>

        {/* Display Reviews */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">
              Product Reviews ({product.reviews?.length || 0})
            </h3>

            {product.reviews && product.reviews.length > 0 ? (
              <>
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600 mb-2">Average Rating</p>
                  <StarRating rating={avgProductRating} />
                </div>

                <div className="space-y-4">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">
                            {review.reviewer?.firstName || review.reviewer?.email?.split("@")[0] || "Anonymous"}
                          </p>
                          <StarRating rating={review.rating} />
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
