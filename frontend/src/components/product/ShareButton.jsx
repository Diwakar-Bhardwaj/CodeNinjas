import React from "react";
import { RiShareForwardFill } from "react-icons/ri";

const ShareButton = ({ url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this product!",
          url,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  return (
    <button
    onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  handleShare();
}}
      className="p-1 rounded-full hover:bg-gray-100"
    >
      <RiShareForwardFill size={22} className="text-gray-700" />
    </button>
  );
};

export default ShareButton;
