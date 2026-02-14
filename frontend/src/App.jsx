import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { CartProvider } from "./services/CartContext";
import CartPage from "./pages/CartPage";

// AUTH PAGES
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// ✅ NEW IMPORT (UPLOAD PAGE)
import UploadItem from "./pages/UploadItem";

function App() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">

        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>

            {/* MAIN ROUTES */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* AUTH ROUTES */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* ✅ IMAGE UPLOAD ROUTE */}
            <Route path="/upload" element={<UploadItem />} />

          </Routes>
        </main>

        <Footer />

      </div>
    </CartProvider>
  );
}

export default App;
