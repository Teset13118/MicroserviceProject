const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;


// กำหนด CORS และ middleware อื่นๆ
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(express.json());

// Proxy API ไปที่ Product Service
app.use("/api/products", createProxyMiddleware({ target: PRODUCT_SERVICE_URL, changeOrigin: true }));

// Check route
app.get("/", (req, res) => {
  res.send("Hello World, Backend API");
});

// Start server
app.listen(port, () => {
  console.log("-------------------------");
  console.log(`Server is running on port: ${port}`);
});
