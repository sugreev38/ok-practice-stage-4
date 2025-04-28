import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "testihub-secret-key"

export async function GET(request: NextRequest) {
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

    // Get purchased tests
    const purchasedTests = await prisma.purchasedTest.findMany({
      where: {
        userId: decoded.id,
      },
      include: {
        test: true,
      },
      orderBy: {
        purchaseDate: "desc",
      },
    })

    // Format the data for the client
    const formattedTests = purchasedTests.map((purchase) => ({
      id: purchase.test.id,
      title: purchase.test.title,
      description: purchase.test.description,
      price: purchase.test.price,
      duration: purchase.test.duration,
      questions: purchase.test.numQuestions,
      status: purchase.status,
      completed: purchase.completed,
      purchaseDate: purchase.purchaseDate.toISOString(),
    }))

    return NextResponse.json({ success: true, purchasedTests: formattedTests })
  } catch (error) {
    console.error("Error in /api/purchased-tests:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch purchased tests" }, { status: 500 })
  }
}
