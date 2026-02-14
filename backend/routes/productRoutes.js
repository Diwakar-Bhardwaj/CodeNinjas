const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");
const User = require("../models/User");
const router = express.Router();

// Middleware to verify token and get user ID
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload a new item
router.post("/upload", verifyToken, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const { title, description, category, city, maxDuration } = req.body;
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const product = new Product({
      title,
      description,
      category,
      city,
      maxDuration: maxDuration || 7,
      imageUrl,
      image: req.file.filename,
      owner: req.userId,
      available: true,
    });
    await product.save();
    await product.populate("owner", "email firstName lastName profileDescription");

    console.log("✅ Product uploaded:", {
      id: product._id,
      title: product.title,
      owner: product.owner,
    });

    res.json({
      msg: "Item uploaded successfully",
      product: product.toObject(),
    });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ msg: "Upload failed", error: err.message });
  }
});

// Get all products (optionally by category or city)
router.get("/", async (req, res) => {
  const { category, city } = req.query;
  try {
    const filter = {};
    if (category) filter.category = category;
    if (city) filter.city = city;

    const products = await Product.find(filter)
      .populate("owner", "email firstName lastName profileDescription averageRating totalReviews")
      .populate("reviews.reviewer", "email firstName lastName")
      .sort({ createdAt: -1 });

    res.json({ products });
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    res.status(500).json({ msg: "Fetch failed", error: err.message });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("owner", "email firstName lastName profileDescription averageRating totalReviews city")
      .populate("reviews.reviewer", "email firstName lastName");

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ product });
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    res.status(500).json({ msg: "Fetch failed", error: err.message });
  }
});

// Add review to a product
router.post("/:id/review", verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ msg: "Rating must be between 1 and 5" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const review = {
      reviewer: req.userId,
      rating,
      comment,
      createdAt: new Date(),
    };

    product.reviews.push(review);
    await product.save();

    // Update owner's average rating
    const owner = await User.findById(product.owner);
    if (owner) {
      const allReviews = await Product.aggregate([
        { $match: { owner: product.owner } },
        { $unwind: "$reviews" },
        { $group: { _id: null, avgRating: { $avg: "$reviews.rating" }, count: { $sum: 1 } } },
      ]);

      if (allReviews.length > 0) {
        owner.averageRating = allReviews[0].avgRating;
        owner.totalReviews = allReviews[0].count;
        await owner.save();
      }
    }

    await product.populate("reviews.reviewer", "email firstName lastName");

    res.json({ msg: "Review added successfully", product });
  } catch (err) {
    console.error("❌ Add review failed:", err);
    res.status(500).json({ msg: "Add review failed", error: err.message });
  }
});

module.exports = router;
