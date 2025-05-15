import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import prisma from "@/lib/prisma"
import crypto from "crypto"
import jwt from "jsonwebtoken" // Make sure to install: npm install jsonwebtoken

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Generate a random 6-digit token
function generateToken() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Helper to generate JWT token for login
function generateLoginToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" })
}

// POST: Send verification email
export async function POST(request: Request) {
  try {
    const { email, userId } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    // Generate a verification token
    const token = generateToken()
    const expires = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now

    // Store the token in the database
    await prisma.verificationToken.create({
      data: {
        id: crypto.randomUUID(),
        token,
        email,
        type: "EMAIL",
        expires,
        userId,
      },
    })

    // Send verification email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Email Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Verify Your Email</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f4f4f4; padding: 10px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; margin: 20px 0;">
            ${token}
          </div>
          <p>This code will expire in 30 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    // In development, return the token for testing
    const responseData: { success: boolean; message: string; token?: string } = {
      success: true,
      message: "Verification code sent successfully",
    }

    if (process.env.NODE_ENV === "development") {
      responseData.token = token
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send verification email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// PUT: Verify email token
export async function PUT(request: Request) {
  try {
    const { email, verificationToken, userId } = await request.json()
    const token = verificationToken

    if (!email || !token) {
      return NextResponse.json({ success: false, error: "Email and token are required" }, { status: 400 })
    }

    // Find the token in the database
    const verificationTokenRecord = await prisma.verificationToken.findFirst({
      where: {
        email,
        token,
        type: "EMAIL",
        expires: {
          gt: new Date(),
        },
      },
    })

    if (!verificationTokenRecord) {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 400 })
    }

    // Mark the token as used
    await prisma.verificationToken.update({
      where: { id: verificationTokenRecord.id },
      data: { used: true },
    })

    // Update user's email verification status
    if (verificationTokenRecord.userId) {
      await prisma.user.update({
        where: { id: verificationTokenRecord.userId },
        data: { emailVerified: true },
      })
    }

    // Optional: Issue login token after verification
    if (!verificationTokenRecord.userId) {
      return NextResponse.json({ success: false, error: "User ID missing from verification token" }, { status: 400 })
    }
    const jwtToken = generateLoginToken(verificationTokenRecord.userId)

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
      token: jwtToken,
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to verify email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
