import { NextResponse } from "next/server"
import crypto from "crypto"
import { getCurrentUser } from "@/app/actions/auth"
import { getPurchasedTests } from "@/app/actions/tests"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, testIds } = body

    // Validate the request
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters",
        },
        { status: 400 },
      )
    }

    // Verify the payment signature using the secret key
    const secret = process.env.RAZORPAY_KEY_SECRET

    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing Razorpay secret key",
        },
        { status: 500 },
      )
    }

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex")

    const isAuthentic = generated_signature === razorpay_signature

    if (isAuthentic) {
      // Get the current user
      const auth = await getCurrentUser()

      if (!auth.success || !auth.user) {
        return NextResponse.json(
          {
            success: false,
            error: "Not authenticated",
          },
          { status: 401 },
        )
      }

      // Add tests to user's purchased tests
      if (testIds && Array.isArray(testIds)) {
        await getPurchasedTests(testIds)
      }

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to verify payment",
      },
      { status: 500 },
    )
  }
}
