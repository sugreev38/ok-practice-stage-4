import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { createJwtToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 400 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 400 })
    }

    // Check if user is verified
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

    // Create token
    const token = createJwtToken({
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    })

    // Set cookie
    const body = await request.json();

    // For example, if you're generating token asynchronously
    const token = await generateToken(body); // <-- make sure this returns string
  
    const cookieStore = cookies();
    cookieStore.set({
      name: "auth_token",
      value: token, // ✅ now a resolved string
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
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
function generateToken(body: any) {
  throw new Error("Function not implemented.")
}

