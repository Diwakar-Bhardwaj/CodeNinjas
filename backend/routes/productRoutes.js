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

    console.log("📝 Review submission:", { userId: req.userId, productId: req.params.id, rating, comment });

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ msg: "Rating must be between 1 and 5" });
    }

    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({ msg: "Comment cannot be empty" });
    }

    // Fetch product with owner populated
    let product = await Product.findById(req.params.id).populate("owner");
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    console.log("📦 Product fetched:", { productId: product._id, owner: product.owner?._id });

    // If product has no owner, return error
    if (!product.owner || !product.owner._id) {
      console.error("❌ Product has no owner assigned");
      return res.status(400).json({ msg: "Product has no valid owner assigned. Cannot add review." });
    }

    // Create review object
    const review = {
      reviewer: req.userId,
      rating: Number(rating),
      comment: String(comment).trim(),
      createdAt: new Date(),
    };

    // Add review to product
    product.reviews.push(review);
    
    console.log("📋 Review added to product array, saving...");
    
    // Save product with markModified to ensure reviews are saved
    product.markModified("reviews");
    await product.save();

    console.log("✅ Review saved to product");

    // Update owner's average rating
    if (product.owner && product.owner._id) {
      const allReviews = await Product.aggregate([
        { $match: { owner: product.owner._id } },
        { $unwind: "$reviews" },
        { $group: { _id: null, avgRating: { $avg: "$reviews.rating" }, count: { $sum: 1 } } },
      ]);

      console.log("📊 Aggregated reviews:", allReviews);

      if (allReviews.length > 0) {
        const owner = await User.findById(product.owner._id);
        if (owner) {
          owner.averageRating = Number(allReviews[0].avgRating);
          owner.totalReviews = Number(allReviews[0].count);
          await owner.save();
          console.log("✅ Owner rating updated:", { avg: owner.averageRating, count: owner.totalReviews });
        }
      }
    }

    // Re-fetch product to get latest data
    product = await Product.findById(req.params.id)
      .populate("owner", "email firstName lastName profileDescription averageRating totalReviews")
      .populate("reviews.reviewer", "email firstName lastName");
    
    console.log("✅ Review endpoint successful");

    res.json({ msg: "Review added successfully", product });
  } catch (err) {
    console.error("❌ Add review failed:", err.message);
    console.error("Error stack:", err.stack);
    res.status(500).json({ msg: "Add review failed", error: err.message });
  }
});

module.exports = router;
