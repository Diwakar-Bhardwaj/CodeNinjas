const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    city: String,
    imageUrl: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    available: { type: Boolean, default: true },
    maxDuration: { type: Number, default: 7 }, // days
    reviews: [
      {
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    image: String, // filename for backwards compatibility
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
