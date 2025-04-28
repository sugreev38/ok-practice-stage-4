import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const payload = await verifyJwtToken(token)

    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get user stats
    const userId = payload.id

    // Get total purchased tests
    const totalTests = await prisma.purchasedTest.count({
      where: { userId },
    })

    // Get completed tests
    const completedTests = await prisma.purchasedTest.count({
      where: {
        userId,
        status: "COMPLETED",
      },
    })

    // Get average score
    const testResults = await prisma.testResult.findMany({
      where: { userId },
    })

    let averageScore = 0
    if (testResults.length > 0) {
      const totalScore = testResults.reduce((sum, result) => sum + result.score, 0)
      averageScore = Math.round(totalScore / testResults.length)
    }

    // Get credits (placeholder for now)
    const credits = 25

    return NextResponse.json({
      totalTests,
      completedTests,
      averageScore,
      credits,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
