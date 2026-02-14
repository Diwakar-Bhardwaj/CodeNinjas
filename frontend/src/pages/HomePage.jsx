import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products"); // backend endpoint
        const data = await res.json();
        setProducts(data.products); // assuming backend returns { products: [...] }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-xl text-gray-600">
        Loading products...
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center py-20 text-xl text-gray-600">
        No products uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SearchBar />

      <ProductGrid title="🛠 Community Items" products={products} />
    </div>
  );
};

export default HomePage;
