import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Try to connect to the database
    await prisma.$connect()

    // Check if the User table exists by trying to count records
    try {
      const userCount = await prisma.user.count()
      return NextResponse.json({
        success: true,
        message: "Database connection successful",
        tables: {
          user: { exists: true, count: userCount },
        },
      })
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Database connected but User table doesn't exist",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to connect to database",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  } finally {
    await prisma.$disconnect()
  }
}
