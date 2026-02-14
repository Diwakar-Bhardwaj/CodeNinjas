import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { CartProvider } from "./services/CartContext";

import CartPage from "./pages/CartPage";



function App() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />

          </Routes>
        </main>

        <Footer />

      </div>
    </CartProvider>
  );
}

export default App;
