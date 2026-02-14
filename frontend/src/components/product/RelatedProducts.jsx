import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setItems(data.products));
  }, [category]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow border space-y-4">
      <h2 className="text-2xl font-bold">Similar Products</h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            onClick={handleClick}
            className="bg-gray-50 rounded-xl p-3 border hover:shadow transition flex flex-col"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-32 w-full object-contain rounded-lg"
            />

            <p className="text-sm font-semibold mt-2 line-clamp-2">
              {product.title}
            </p>

            <p className="text-blue-600 font-bold text-lg mt-1">
              ${product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
