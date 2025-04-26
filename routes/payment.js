const express = require("express");
const Razorpay = require("razorpay");
require('dotenv').config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// POST /create-order
router.post("/create-order", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    console.log("Order created:", order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error while creating order:", error); // 👈 important
    res.status(500).json({ success: false });
  }
});


module.exports = router;
