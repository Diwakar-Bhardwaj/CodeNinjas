require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

/* 🔹 Connect Database */
connectDB();

/* 🔹 Middlewares */
app.use(cors());
app.use(express.json());

/* 🔹 VERY IMPORTANT — Serve Uploaded Images */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
