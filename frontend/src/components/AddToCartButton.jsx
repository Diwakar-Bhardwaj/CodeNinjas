import React from "react";
import { FaHandshake } from "react-icons/fa";
import { useCart } from "../services/CartContext";

const AddToCartButton = ({ product }) => {
  const { transactions, addTransaction } = useCart();

  // Check if user already has a transaction for this product
  const hasTransaction = transactions.some(
    (t) => t._id === product._id
  );

  const handleLend = () => {
    if (!hasTransaction) {
      addTransaction(product, "lend");
    }
  };

  const handleBorrow = () => {
    if (!hasTransaction) {
      addTransaction(product, "borrow");
    }
  };

  return (
    <div className="w-full space-y-2">
      {/* Lend Button */}
      <button
        disabled={hasTransaction}
        onClick={handleLend}
        className={`w-full text-md font-bold py-3 rounded-lg shadow-md transition-all transform flex justify-center items-center ${
          hasTransaction
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 hover:from-green-200 hover:to-emerald-200 border-2 border-green-300 hover:shadow-lg hover:scale-105"
        }`}
      >
        <FaHandshake className="mr-2" />
        {hasTransaction ? "✓ Selected" : "🎁 Lend This"}
      </button>

      {/* Borrow Button */}
      <button
        disabled={hasTransaction}
        onClick={handleBorrow}
        className={`w-full text-md font-bold py-3 rounded-lg shadow-md transition-all transform flex justify-center items-center ${
          hasTransaction
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200 border-2 border-blue-300 hover:shadow-lg hover:scale-105"
        }`}
      >
        <FaHandshake className="mr-2" />
        {hasTransaction ? "✓ Selected" : "📦 Borrow This"}
      </button>
    </div>
  );
};

export default AddToCartButton;
