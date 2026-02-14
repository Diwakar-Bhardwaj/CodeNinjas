const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");
const router = express.Router();

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
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const { title, category } = req.body;
    const product = new Product({
      title,
      category,
      image: req.file.filename,
    });
    await product.save();

    console.log("✅ Product uploaded:", {
      id: product._id,
      filename: req.file.filename,
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
    });

    res.json({
      msg: "Item uploaded successfully",
      product: {
        ...product.toObject(),
        imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
      },
    });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ msg: "Upload failed", error: err.message });
  }
});

// Get all products (optionally by category)
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ msg: "Fetch failed", error: err.message });
  }
});

module.exports = router;
