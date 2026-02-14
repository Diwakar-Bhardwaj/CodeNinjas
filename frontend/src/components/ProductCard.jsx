import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { formatPrice } from '../utils/formatPrice';
import ShareButton from './product/ShareButton';

const ProductCard = ({ product }) => {

  // --------------- IMAGE FIX -------------------
  // Filter out invalid images like "...", null, empty
  const validImages = product.images?.filter(
    (img) => img && img !== "..." && img.trim() !== ""
  );

  const imageUrl =
    validImages?.[0] ??
    (product.thumbnail && product.thumbnail !== "..." ? product.thumbnail : null) ??
    "https://via.placeholder.com/300x300?text=No+Image";
  // ----------------------------------------------

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out block"
    >
      <div className="relative">
        {/* SHARE BUTTON (floating) */}
        <ShareButton 
          url={`http://localhost:3000/product/${product.id}`}
          floating={true}
        />
        <img 
          src={imageUrl} 
          alt={product.title} 
          className="w-full h-48 object-contain p-4" 
        />

        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {product.discountPercentage ? `${Math.round(product.discountPercentage)}%` : product.discount} OFF
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.title}>
          {product.title}
        </h3>
        
       <div className="flex items-center justify-between mt-2">

  {/* LEFT — PRICE */}
  <div className="flex items-center space-x-1">
    <span className="text-xl font-bold text-primary">
      {formatPrice(product.price)}
    </span>

    {product.realPrice && (
      <span className="text-sm text-gray-500 line-through">
        {formatPrice(product.realPrice)}
      </span>
    )}
  </div>

  {/* CENTER — RATING */}
  <div className="flex items-center space-x-1 text-yellow-500">
    <FaStar />
    <span className="text-sm font-semibold">{product.rating}</span>
  </div>

  {/* RIGHT — SHARE BUTTON */}
  <ShareButton 
    url={`http://localhost:3000/product/${product.id}`} 
    floating={false}
  />

</div>

        
        <button 
          className="mt-4 w-full bg-primary text-white py-2 rounded-md font-semibold bg-blue-400 hover:bg-blue-700 transition"
          onClick={(e) => {
            e.preventDefault(); 
            window.open(product.buyLink, '_blank');
          }}
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
