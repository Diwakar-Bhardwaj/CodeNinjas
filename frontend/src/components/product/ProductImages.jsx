import React from "react";

const ProductImages = ({ images, selectedImage, onSelect }) => {
  return (
    <div className="space-y-4">

      {/* Main Image */}
      <div className="aspect-square bg-gray-50 rounded-xl border p-3 flex items-center justify-center">
        <img
          src={selectedImage}
          alt="Product"
          className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails - scrollable on mobile */}
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide py-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onSelect(img)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg border transition-all duration-200 ${
              img === selectedImage
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </button>
        ))}
      </div>

    </div>
  );
};

export default ProductImages;
