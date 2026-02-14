import React from "react";
import { useCart } from "../services/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  if (cart.length === 0) {
    return <h1 className="text-center text-2xl mt-10">Your cart is empty 🛒</h1>;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 bg-white shadow rounded-xl"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.thumbnail || item.images[0]}
              className="w-20 h-20 rounded-lg object-cover"
              alt={item.title}
            />

            <div>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p className="font-semibold text-blue-600">${item.price}</p>

              {/* Quantity Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-gray-200 p-2 rounded-full"
                >
                  <FaMinus />
                </button>

                <span className="text-lg font-semibold">{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-gray-200 p-2 rounded-full"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={22} />
          </button>
        </div>
      ))}

      {/* Summary */}
      <div className="p-4 bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
        <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
