import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
const apiUrl = import.meta.env.VITE_API_URL;


const HomePage = () => {
  const [dailyOffers, setDailyOffers] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/products?limit=20`);
        const data = await res.json();

        // Products को अलग-अलग sections में बाँटना
        setDailyOffers(data.products.slice(0, 16));      // Daily Offers = पहले 8 products
        setTrendingProducts(data.products.slice(16, 32)); // Trending = अगले 8 products
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-xl text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="space-y-12">
      
      {/* Hero Search Bar Section */}
      <SearchBar />

      {/* Daily Offers Section */}
      <ProductGrid 
        title="🔥 Daily Offers"
        products={dailyOffers}
      />

      {/* Trending Products Section */}
      <ProductGrid 
        title="📈 Trending Products"
        products={trendingProducts}
      />
    </div>
  );
};

export default HomePage;
