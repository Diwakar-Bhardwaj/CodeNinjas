import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaExchangeAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useCart } from "../services/CartContext";

const Header = ({ count = 0 }) => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const token = localStorage.getItem("token");
  const firstLetter = email ? email.charAt(0).toUpperCase() : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setEmail(null);
    setShowDropdown(false);
    navigate("/login");
  };

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

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="text-gray-600 hover:text-primary transition text-2xl flex items-center justify-center"
              onClick={() => setShowDropdown(!showDropdown)}
              title={email || "User"}
            >
              {token ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {firstLetter}
                </div>
              ) : (
                <FaUserCircle />
              )}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {token ? (
                  <>
                    {/* User Email */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm text-gray-600">Logged in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{email}</p>
                    </div>

                    {/* Profile Link */}
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaUser className="mr-3 text-blue-500" />
                      <span>My Profile</span>
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition border-t border-gray-200"
                    >
                      <FaSignOutAlt className="mr-3" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Login Link */}
                    <Link 
                      to="/login" 
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaUser className="mr-3 text-blue-500" />
                      <span>Login</span>
                    </Link>

                    {/* Register Link */}
                    <Link 
                      to="/register" 
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaUserCircle className="mr-3 text-green-500" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
