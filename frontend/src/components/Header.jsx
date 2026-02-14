import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Header = ({ count = 0 }) => {
  const [email, setEmail] = useState(localStorage.getItem("email"));

  useEffect(() => {
    const handleStorage = () => {
      setEmail(localStorage.getItem("email"));
    };

    window.addEventListener("storage", handleStorage);

    // ALSO update on page load
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
          coding ninja
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary">
            Home
          </Link>
          <Link to="/deals" className="text-gray-600 hover:text-primary">
            Deals
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-primary">
            About
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-5">

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-3xl text-gray-600" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>

          {/* Auth */}
          {!token ? (
            <>
              <Link to="/login" className="text-gray-600 font-medium">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* EMAIL LETTER CIRCLE */}
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                {firstLetter}
              </div>

              {/* Logout */}
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="text-red-500 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
