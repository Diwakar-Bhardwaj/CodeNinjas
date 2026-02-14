import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Please login to add a review.");
      return;
    }

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a comment.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/products/${productId}/review`,
        { rating, comment },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Review added successfully!");
      setRating(0);
      setComment("");

      if (onReviewAdded) {
        onReviewAdded(response.data.product);
      }

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.msg || err.message || "Failed to add review";
      
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(errorMsg);
      }
      
      console.error("Review submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-6 border-2 border-yellow-300">
        <h3 className="text-xl font-bold mb-4">Add Your Review</h3>
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded text-center">
          <p className="mb-3">You need to be logged in to leave a review.</p>
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-xl font-bold mb-4">Add Your Review</h3>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 border border-red-300">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 border border-green-300">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-semibold mb-2">Rating *</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transition"
                disabled={loading}
              >
                <FaStar
                  size={28}
                  className={
                    star <= (hoverRating || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
          {rating > 0 && <p className="text-sm text-gray-600 mt-2">Rating: {rating} / 5</p>}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-semibold mb-2">Your Comment *</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this item..."
            className="w-full border-2 border-gray-300 rounded p-3 focus:border-blue-500 focus:outline-none h-24"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded font-bold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding Review..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
