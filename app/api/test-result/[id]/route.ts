import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "testihub-secret-key"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const testId = Number.parseInt(params.id)

    if (isNaN(testId)) {
      return NextResponse.json({ success: false, error: "Invalid test ID" }, { status: 400 })
    }

    // Get test result
    const result = await prisma.testResult.findFirst({
      where: {
        userId: decoded.id,
        testId,
      },
    })

    if (!result) {
      return NextResponse.json({ success: false, error: "Test result not found" }, { status: 404 })
    }

    // Parse JSON fields
    const parsedResult = {
      ...result,
      answers: result.answers,
      questionDetails: result.questionDetails,
    }

    return NextResponse.json({ success: true, result: parsedResult })
  } catch (error) {
    console.error("Error in /api/test-result/[id]:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch test result" }, { status: 500 })
  }
}
