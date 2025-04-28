"use server"

import Razorpay from "razorpay"

export async function createRazorpayOrder(amount: number) {
  try {
    // Validate inputs
    if (!amount || amount <= 0) {
      return { success: false, error: "Invalid amount" }
    }

    // Check if environment variables are set
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return { success: false, error: "Razorpay credentials not configured" }
    }

    // Create an order with Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects amount in smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        type: "test_purchase",
        platform: "TestHub",
      },
    })

    return { success: true, order }
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return { success: false, error: "Failed to create order. Please try again." }
  }
}
