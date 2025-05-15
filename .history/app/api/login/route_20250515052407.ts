// /app/api/login/route.ts
"use client"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 400 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 400 })
    }

    if (!user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          error: "Account not verified",
          requiresVerification: true,
          userId: user.id,
          emailVerified: user.emailVerified,
          phoneVerified: user.phoneVerified,
        },
        { status: 403 },
      )
    }

    // Generate the JWT token using the user's payload
    const token = await createToken({ id: user.id, name: user.name, email: user.email, isVerified: user.isVerified })

    (await cookies()).set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to login",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
