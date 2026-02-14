import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ title, products }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* 
        grid-cols-2 → default on mobile → 2 columns
        md:grid-cols-3 → tablets
        lg:grid-cols-4 → desktops
      */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
