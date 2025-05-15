import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"  // Adjust import if needed
import { verifyToken } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const payload = await verifyToken(token)

    if (!payload || !payload.id) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const userId = payload.id

    // Fetch stats concurrently for performance
    const [totalTests, completedTests, testResults] = await Promise.all([
      prisma.purchasedTest.count({ where: { userId } }),
      prisma.purchasedTest.count({ where: { userId, status: "COMPLETED" } }),
      prisma.testResult.findMany({ where: { userId } }),
    ])

    // Calculate average score
    let averageScore = 0
    if (testResults.length > 0) {
      const totalScore = testResults.reduce((sum, r) => sum + r.score, 0)
      averageScore = Math.round(totalScore / testResults.length)
    }

    // Placeholder credits (you can replace with real logic)
    const credits = 25

    return NextResponse.json({
      success: true,
      totalTests,
      completedTests,
      averageScore,
      credits,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard stats" },
      { status: 500 }
    )
  }
}
