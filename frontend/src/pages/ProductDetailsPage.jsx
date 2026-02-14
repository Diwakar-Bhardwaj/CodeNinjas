import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProductDetailsPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Convert image paths to full URLs
        const fullImages = data.images.map(
          (img) => `http://localhost:5000/${img}`
        );

        setProduct({ ...data, images: fullImages });
        setSelectedImage(fullImages[0]);
      });
  }, [id]);

  if (!product) return <div className="text-center p-10">Loading...</div>;

  const originalPrice = product.price / (1 - product.discount / 100);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* LEFT — Images */}
      <ProductImages
        images={product.images}
        selectedImage={selectedImage}
        onSelect={setSelectedImage}
      />

      {/* RIGHT — Details */}
      <div className="space-y-6">
        <ProductInfo product={product} />
        <ProductPrice product={product} originalPrice={originalPrice} />
        <ProductMeta product={product} />
        <AddToCartButton product={product} />
      </div>

    </div>
  );
};

export default ProductDetailsPage;
