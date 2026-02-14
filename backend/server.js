require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

/* 🔹 Connect Database */
connectDB();

/* 🔹 Middlewares */
app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 🔹 Ensure uploads folder exists */
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Uploads folder created at:", uploadsDir);
}

/* 🔹 VERY IMPORTANT — Serve Uploaded Images */
app.use("/uploads", express.static(uploadsDir, {
  setHeaders: (res) => {
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
})); // serve uploaded images

/* 🔹 Routes */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

/* 🔹 Test Route */
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

/* 🔹 Start Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
