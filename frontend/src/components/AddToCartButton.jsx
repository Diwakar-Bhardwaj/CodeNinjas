import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../services/CartContext";

const AddToCartButton = ({ product }) => {
  const { cart, addToCart } = useCart();

  // Check if this product already exists in cart
  const inCart = cart.some((item) => item.id === product.id);

  return (
    <button
      disabled={inCart} // disable when already added
      onClick={() => addToCart(product)}
      className={`w-full text-lg font-bold py-4 rounded-xl shadow-xl transition-all flex justify-center items-center
        ${inCart 
          ? "bg-gray-400 cursor-not-allowed text-gray-200"   // disabled style
          : "bg-blue-600 hover:bg-blue-700 text-white"
        }
      `}
    >
      <FaShoppingCart className="mr-2" />
      {inCart ? "Added to Cart" : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
