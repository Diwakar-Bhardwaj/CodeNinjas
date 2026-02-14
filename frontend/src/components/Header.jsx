import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaExchangeAlt } from "react-icons/fa";
import { useCart } from "../services/CartContext";

const Header = ({ count = 0 }) => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const { getTotalCount } = useCart();
  const transactionCount = getTotalCount();

  useEffect(() => {
    const handleStorage = () => {
      setEmail(localStorage.getItem("email"));
    };

    window.addEventListener("storage", handleStorage);
    setEmail(localStorage.getItem("email"));

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const token = localStorage.getItem("token");
  const firstLetter = email ? email.charAt(0).toUpperCase() : "";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          ShareCircle
        </Link>
        
        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary transition">Home</Link>
          <Link to="/upload" className="text-gray-600 hover:text-primary transition">Upload Items</Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition">About</Link>
          <Link to="/help" className="text-gray-600 hover:text-primary transition">Help</Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-5">

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-600 hover:text-primary transition text-xl">
            <FaShoppingCart className="text-3xl" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>

          {/* Transactions */}
          {token && (
            <Link to="/transactions" className="relative">
              <FaExchangeAlt className="text-3xl text-gray-600 hover:text-primary transition" />
              {transactionCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {transactionCount}
                </span>
              )}
            </Link>
          )}

          {/* User Icon */}
          <button className="text-gray-600 hover:text-primary transition text-2xl">
            <FaUserCircle />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
