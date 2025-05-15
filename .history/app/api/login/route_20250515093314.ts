// Next.js API route for user login with JWT auth and secure cookie handling

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { createJwtToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // 1. Input validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      )
    }

    // 2. Find user by email
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 400 }
      )
    }

    // 3. Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 400 }
      )
    }

    // 4. Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          error: "Email not verified",
          requiresVerification: true,
          userId: user.id,
          isVerified: false,
          phone: user.phone,
        },
        { status: 403 }
      )
    }

    // 5. Create JWT token
    const token = await createJwtToken({
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: true,
    })

    // 6. Set auth cookie
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    // 7. Success response
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: true,
        phone: user.phone,
      },
    })
  } catch (error) {
    console.error("Login error:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to login",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
