const express = require("express");
const Razorpay = require("razorpay");
require('dotenv').config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// console.log(process.env.RAZORPAY_KEY_ID);
// console.log(process.env.RAZORPAY_SECRET);

// POST /create-order
router.post("/api/payment/create-order", async (req, res) => {
  // console.log("Inside /create-order route");
  try {
    // console.log("Request body:", req.body);

    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    // console.log("Order created:", order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error while creating order:", error); 
    res.status(500).json({ success: false,
      message: "Order creation failed",
  error: error.message || "Unknown error",
     });
  }
});


module.exports = router;
