import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./services/CartContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";


// AUTH PAGES
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
// UPLOAD PAGE
import UploadItem from "./pages/UploadItem";

function AppContent() {
  const { cart } = useCart();
  const cartCount = cart.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header count={cartCount} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* MAIN ROUTE */}
          <Route path="/" element={<HomePage />} />

          {/* AUTH ROUTES */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
          {/* UPLOAD ROUTE */}
          <Route path="/upload" element={<UploadItem />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
