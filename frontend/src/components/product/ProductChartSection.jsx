// src/components/product/ProductChartSection.jsx
import React from "react";
import PriceChart from "../PriceChart";
import SuggestionBox from "../SuggestionBox";

const ProductChartSection = ({ product }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-10">

      <div className="lg:col-span-2">
        <PriceChart />
      </div>

      <div className="space-y-4">
        <SuggestionBox
          type="BUY"
          title="Great Deal!"
          text={`Price is ${product.discountPercentage}% lower than average.`}
        />
        <SuggestionBox
          type="WAIT"
          title="Limited Stock"
          text={`Only ${product.stock} items remaining.`}
        />
      </div>

    </div>
  );
};

export default ProductChartSection;
