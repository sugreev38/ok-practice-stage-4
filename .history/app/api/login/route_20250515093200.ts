// This is a Next.js API route for user login
//
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { createJwtToken } from "@/lib/auth"

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
      error: "Email not verified",
      requiresVerification: true,
      userId: user.id,
      isVerified: user.isVerified,
      phone: user.phone,
    },
    { status: 403 }
  )
}

    const token = await createJwtToken({
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    })

    ;(await cookies()).set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
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
        phone: user.phone, // include phone number in response if needed
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
      { status: 500 }
    )
  }
}
