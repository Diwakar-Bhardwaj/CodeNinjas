import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaStar, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../services/CartContext";

const Transactions = () => {
  const navigate = useNavigate();
  const { transactions, removeTransaction } = useCart();
  const [filter, setFilter] = useState("all"); // all, lend, borrow

  const lendItems = transactions.filter((t) => t.transactionType === "lend");
  const borrowItems = transactions.filter((t) => t.transactionType === "borrow");

  const displayItems =
    filter === "all"
      ? transactions
      : filter === "lend"
      ? lendItems
      : borrowItems;

  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please login to view transactions</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-semibold"
      >
        <FaArrowLeft /> Back to Home
      </button>

      <h1 className="text-4xl font-bold mb-8 text-gray-800">My Transactions</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-gray-600 text-sm">Total Items</p>
          <p className="text-3xl font-bold text-blue-600">{transactions.length}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <p className="text-gray-600 text-sm">Items I'm Lending</p>
          <p className="text-3xl font-bold text-green-600">{lendItems.length}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <p className="text-gray-600 text-sm">Items I'm Borrowing</p>
          <p className="text-3xl font-bold text-purple-600">{borrowItems.length}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            filter === "all"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          All ({transactions.length})
        </button>
        <button
          onClick={() => setFilter("lend")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            filter === "lend"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800 hover:bg-green-200"
          }`}
        >
          Lending ({lendItems.length})
        </button>
        <button
          onClick={() => setFilter("borrow")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            filter === "borrow"
              ? "bg-purple-600 text-white"
              : "bg-purple-100 text-purple-800 hover:bg-purple-200"
          }`}
        >
          Borrowing ({borrowItems.length})
        </button>
      </div>

      {/* Transactions List */}
      {displayItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">
            {filter === "all"
              ? "No transactions yet"
              : filter === "lend"
              ? "You're not lending any items"
              : "You're not borrowing any items"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Browse Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.transactionId}
              className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border-l-4 ${
                item.transactionType === "lend"
                  ? "border-green-500 bg-green-50"
                  : "border-purple-500 bg-purple-50"
              }`}
            >
              {/* Image */}
              <div className="relative h-40">
                <img
                  src={
                    item.imageUrl ||
                    (item.image
                      ? `http://localhost:5000/uploads/${item.image}`
                      : "https://via.placeholder.com/300x300?text=No+Image")
                  }
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
                <div
                  className={`absolute top-2 right-2 px-3 py-1 rounded text-white text-sm font-bold ${
                    item.transactionType === "lend"
                      ? "bg-green-600"
                      : "bg-purple-600"
                  }`}
                >
                  {item.transactionType === "lend" ? "🎁 Lending" : "📦 Borrowing"}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h3>

                {/* Category & City */}
                <div className="flex gap-2 text-sm text-gray-600 mb-2">
                  <span>{item.category}</span>
                  {item.city && <span>• {item.city}</span>}
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {/* Owner Info */}
                {item.owner && (
                  <div className="bg-white p-2 rounded mb-3">
                    <p className="text-xs font-semibold text-gray-700">
                      👤{" "}
                      {item.owner.firstName || item.owner.email?.split("@")[0] || "Unknown"}
                    </p>
                    {item.owner.averageRating > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-xs text-gray-600">
                          {item.owner.averageRating.toFixed(1)} ({item.owner.totalReviews} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Duration */}
                {item.maxDuration && (
                  <p className="text-xs text-blue-600 mb-3">
                    📅 Max Duration: {item.maxDuration} days
                  </p>
                )}

                {/* Product Rating */}
                {item.reviews && item.reviews.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-xs text-gray-600">
                        {(
                          item.reviews.reduce((sum, r) => sum + r.rating, 0) /
                          item.reviews.length
                        ).toFixed(1)}{" "}
                        ({item.reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm font-semibold transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => removeTransaction(item.transactionId)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 text-sm font-semibold transition flex items-center justify-center gap-1"
                  >
                    <FaTrash size={14} /> Remove
                  </button>
                </div>

                {/* Added Date */}
                <p className="text-xs text-gray-500 mt-2">
                  Added: {new Date(item.addedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
