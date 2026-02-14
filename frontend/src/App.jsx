import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./services/CartContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";

// AUTH PAGES
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// UPLOAD PAGE
import UploadItem from "./pages/UploadItem";

// TRANSACTIONS PAGE
import Transactions from "./pages/Transactions";

function AppContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* MAIN ROUTE */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* AUTH ROUTES */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* UPLOAD ROUTE */}
          <Route path="/upload" element={<UploadItem />} />

          {/* TRANSACTIONS ROUTE */}
          <Route path="/transactions" element={<Transactions />} />
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
