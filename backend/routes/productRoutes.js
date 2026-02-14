const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Product = require("../models/Product");


// Upload Product + Image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;

    const newProduct = new Product({
      title,
      price,
      image: req.file.filename,
    });

    await newProduct.save();

    res.json({ message: "Product Uploaded", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get All Products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
