const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

// Routers
const farmerAuthRouter = require("./routes/farmer");
const consumerAuthRouter = require("./routes/consumer");
const productRouter = require("./routes/product");
const paymentRouter = require("./routes/payment");

// Middleware
app.use(cors());
app.use(express.json());

// Route prefixes
app.use(farmerAuthRouter);
app.use(consumerAuthRouter);
app.use(productRouter);
app.use(paymentRouter); // 👈 now your /create-order endpoint is /api/payments/create-order

// DB Connection
const DB = process.env.MONGO_URI;
mongoose.connect(DB)
  .then(() => console.log("Connected to MongoDB..!"))
  .catch(error => console.error("MongoDB connection error: " + error));

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
