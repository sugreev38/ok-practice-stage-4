"use server"

import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { revalidatePath } from "next/cache"

const JWT_SECRET = process.env.JWT_SECRET || "testihub-secret-key"

// Get current user from token
async function getCurrentUser() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.("auth_token")?.value

    if (!token) {
      return { success: false, error: "Not authenticated" }
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string
      email: string
      name: string
      isVerified: boolean
    }

    // Get fresh user data
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isVerified: true,
      },
    })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    return { success: true, user }
  } catch (error) {
    console.error("Error getting current user:", error)
    return { success: false, error: "Failed to authenticate" }
  }
}

// Save test result
export async function saveTestResult(result: {
  testId: number
  score: number
  totalQuestions: number
  percentage: number
  answers: string[]
  questionDetails?: any[]
  timeTaken?: number
}) {
  try {
    const auth = await getCurrentUser()

    if (!auth.success || !auth.user) {
      return { success: false, error: "Not authenticated" }
    }

    // Generate random rank and total participants for demo
    const totalParticipants = Math.floor(Math.random() * 500) + 100
    const rank = Math.floor(Math.random() * ((totalParticipants * result.percentage) / 100)) + 1

    // Check if result already exists
    const existingResult = await prisma.testResult.findFirst({
      where: {
        userId: auth.user.id,
        testId: result.testId,
      },
    })

    if (existingResult) {
      // Update existing result
      await prisma.testResult.update({
        where: { id: existingResult.id },
        data: {
          score: result.score,
          totalQuestions: result.totalQuestions,
          percentage: result.percentage,
          answers: result.answers,
          questionDetails: result.questionDetails,
          timeTaken: result.timeTaken,
          rank,
          totalParticipants,
        },
      })
    } else {
      // Create new result
      await prisma.testResult.create({
        data: {
          userId: auth.user.id,
          testId: result.testId,
          score: result.score,
          totalQuestions: result.totalQuestions,
          percentage: result.percentage,
          answers: result.answers,
          questionDetails: result.questionDetails,
          timeTaken: result.timeTaken,
          rank,
          totalParticipants,
        },
      })
    }

    // Update test status to completed
    await prisma.purchasedTest.updateMany({
      where: {
        userId: auth.user.id,
        testId: result.testId.toString(),
      },
      data: {
        status: "Completed",
        completed: true,
      },
    })

    revalidatePath(`/tests/results/${result.testId}`)
    return { success: true }
  } catch (error) {
    console.error("Error saving test result:", error)
    return { success: false, error: "Failed to save test result" }
  }
}

// Get purchased tests
export async function getPurchasedTests() {
  try {
    const auth = await getCurrentUser()

    if (!auth.success || !auth.user) {
      return { success: false, error: "Not authenticated" }
    }

    const purchasedTests = await prisma.purchasedTest.findMany({
      where: {
        userId: auth.user.id,
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

    return { success: true, purchasedTests: formattedTests }
  } catch (error) {
    console.error("Error fetching purchased tests:", error)
    return { success: false, error: "Failed to fetch purchased tests" }
  }
}

// Get test result
export async function getTestResult(testId: number) {
  try {
    const auth = await getCurrentUser()

    if (!auth.success || !auth.user) {
      return { success: false, error: "Not authenticated" }
    }

    const result = await prisma.testResult.findFirst({
      where: {
        userId: auth.user.id,
        testId,
      },
    })

    if (!result) {
      return { success: false, error: "Test result not found" }
    }

    // Parse the JSON if needed
    const parsedResult = {
      ...result,
      answers: result.answers,
      questionDetails: result.questionDetails,
    }

    return { success: true, result: parsedResult }
  } catch (error) {
    console.error("Error fetching test result:", error)
    return { success: false, error: "Failed to fetch test result" }
  }
}
