import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "testihub-secret-key"

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string
      email: string
      name: string
      isVerified: boolean
    }

    // Get request body
    const body = await request.json()
    const { testId, status, completed } = body

    if (!testId || !status) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Update test status
    await prisma.purchasedTest.updateMany({
      where: {
        userId: decoded.id,
        testId: testId.toString(),
      },
      data: {
        status,
        completed: completed || false,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in /api/update-test-status:", error)
    return NextResponse.json({ success: false, error: "Failed to update test status" }, { status: 500 })
  }
}
