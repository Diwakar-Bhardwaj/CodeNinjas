import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// const apiUrl =process.env.REACT_APP_API_URL;
// console.log("API URL:", apiUrl);
import ProductImages from "../components/product/ProductImages";
import ProductInfo from "../components/product/ProductInfo";
import ProductPrice from "../components/product/ProductPrice";
import ProductMeta from "../components/product/ProductMeta";
import AddToCartButton from "../components/AddToCartButton";
import PriceChart from "../components/PriceChart";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";
import ShareButton from "../components/product/ShareButton";


const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.images[0]);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-10">

      {/* TOP SECTION — LEFT 50% (IMAGE + DETAILS) | RIGHT 50% (CHART) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* SMALLER PRODUCT IMAGE */}
          <div className="w-full max-w-md mx-auto">
            <ProductImages
              images={product.images}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
              imageHeight="h-64"   // <<--- Smaller height
            />
          </div>

          {/* DETAILS BELOW IMAGE */}
          <div className="space-y-4">
            <ProductInfo product={product} />
            <ProductPrice product={product} originalPrice={originalPrice} />
            <ProductMeta product={product} />
            <AddToCartButton product={product} />
          </div>
        </div>

        {/* RIGHT SIDE — PRICE CHART */}
        <div className="bg-white p-4 rounded-xl shadow border h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-2">Price History</h2>
          <PriceChart />
        </div>

      </div>

      {/* REVIEWS */}
      <ProductReviews reviews={product.reviews} />

      {/* RELATED PRODUCTS */}
      <RelatedProducts category={product.category} />

    </div>
  );
};

export default ProductDetailsPage;
