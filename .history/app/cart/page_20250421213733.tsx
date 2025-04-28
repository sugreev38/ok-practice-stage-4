"use server";

import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma"; // Assuming you have a Prisma client instance
import { v4 as uuidv4 } from "uuid";

export async function createRazorpayOrder(
  amount: number,
  userId: string,
  testIds?: number[],
  packageId?: number,
  currency: string = "INR"
) {
  try {
    // Validate inputs
    if (!amount || amount <= 0) {
      return { success: false, error: "Invalid amount" };
    }
    if (!userId) {
      return { success: false, error: "User ID is required" };
    }

    // Validate user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Validate testIds or packageId
    if (testIds) {
      const tests = await prisma.test.findMany({ where: { id: { in: testIds } } });
      if (tests.length !== testIds.length) {
        return { success: false, error: "Invalid test IDs" };
      }
    }
    if (packageId) {
      const pkg = await prisma.package.findUnique({ where: { id: packageId } });
      if (!pkg) {
        return { success: false, error: "Package not found" };
      }
    }

    // Check Razorpay credentials
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return { success: false, error: "Razorpay credentials not configured" };
    }

    // Create Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${userId}_${uuidv4()}`,
      notes: {
        type: testIds ? "test_purchase" : "package_purchase",
        platform: "TestHub",
        userId,
      },
    });

    // Save order to database
    await prisma.order.create({
      data: {
        userId,
        razorpayOrderId: order.id,
        amount: amount / 100,
        status: "Pending",
        testIds: testIds ? { testIds } : undefined,
        packageId,
      },
    });

    return { success: true, order };
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    const errorMessage =
      error?.error?.description || "Failed to create order. Please try again.";
    return { success: false, error: errorMessage };
  }
}