import { NextResponse } from "next/server"
import Razorpay from "razorpay"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency = "INR", receipt } = body

    // Validate the request
    if (!amount) {
      return NextResponse.json({ success: false, error: "Amount is required" }, { status: 400 })
    }

    // Check if environment variables are set
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ success: false, error: "Razorpay credentials not configured" }, { status: 500 })
    }

    // Create an order with Razorpay using environment variables
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects amount in smallest currency unit (paise for INR)
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    })

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
