import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SuggestionBox from "../components/SuggestionBox";
import ProductGrid from "../components/ProductGrid";

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        const products = data.products || [];
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    setSearchQuery(query);

    const filtered = allProducts.filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(lowerQuery);
      const descriptionMatch = product.description?.toLowerCase().includes(lowerQuery);
      const categoryMatch = product.category?.toLowerCase().includes(lowerQuery);
      const cityMatch = product.city?.toLowerCase().includes(lowerQuery);
      const ownerMatch =
        product.owner?.firstName?.toLowerCase().includes(lowerQuery) ||
        product.owner?.lastName?.toLowerCase().includes(lowerQuery);

      return titleMatch || descriptionMatch || categoryMatch || cityMatch || ownerMatch;
    });

    setFilteredProducts(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredProducts(allProducts);
    setNoResults(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-xl text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

      {searchQuery && (
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-semibold text-blue-600">Found {filteredProducts.length}</span> item{filteredProducts.length !== 1 ? "s" : ""} matching "{searchQuery}"
          </p>
        </div>
      )}

      {noResults && (
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <SuggestionBox
            type="INFO"
            title="No Items Found"
            text={`Try searching with different keywords, looking for items in other cities, or browse all available items.`}
          />
        </div>
      )}

      {!searchQuery && allProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <SuggestionBox
            type="LEND"
            title="📦 Have Items to Lend?"
            text="Upload your items and start earning trust in the community. Click 'Upload Item' in the header!"
          />
          <SuggestionBox
            type="BORROW"
            title="🤝 Looking to Borrow?"
            text="Browse items from trusted community members. Click on any item to see details and connect with lenders."
          />
        </div>
      )}

      {!noResults && filteredProducts.length > 0 && (
        <ProductGrid
          title={searchQuery ? "🔍 Search Results" : "🛠 Community Items"}
          products={filteredProducts}
        />
      )}

      {!searchQuery && allProducts.length === 0 && (
        <div className="flex justify-center py-20 text-xl text-gray-600">
          No items uploaded yet. Be the first to share!
        </div>
      )}
    </div>
  );
};

export default HomePage;
