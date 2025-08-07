require("dotenv").config(); // 🔥 must be first line

const express = require("express");
const Razorpay = require("razorpay");
const crypto = require('crypto');
const router = express.Router();

console.log("🔑 Razorpay Key ID:", process.env.RAZORPAY_KEY_ID ? "Loaded ✅" : "Missing ❌");
console.log("🔐 Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET? "Loaded ✅" : "Missing ❌");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to get Razorpay key for frontend
router.get("/get-key", (req, res) => {
  return res.json({ 
    success: true, 
    key: process.env.RAZORPAY_KEY_ID 
  });
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        error: true, 
        message: "Valid amount is required" 
      });
    }

    // Ensure amount is in paise (multiply by 100 if needed)
    const amountInPaise = Math.round(amount);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    console.log("✅ Order Created:", order);
    return res.json({ 
      success: true, 
      order,
      key: process.env.RAZORPAY_KEY_ID 
    });
  } catch (error) {
    console.error("❌ Razorpay Error (Full):", error);

    return res.status(500).json({
      error: true,
      message: "Failed to create order",
      details: error.message,
    });
  }
});

// Route to verify payment
router.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        error: true,
        message: "Missing payment verification parameters"
      });
    }

    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      // Payment is valid - you can save to database here
      console.log("✅ Payment verified successfully:", {
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });

      return res.json({
        success: true,
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id
      });
    } else {
      console.log("❌ Payment verification failed");
      return res.status(400).json({
        error: true,
        message: "Payment verification failed"
      });
    }
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return res.status(500).json({
      error: true,
      message: "Payment verification failed",
      details: error.message
    });
  }
});

module.exports = router;
