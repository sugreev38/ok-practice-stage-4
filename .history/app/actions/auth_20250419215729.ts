"use server"

import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret-key"

// Register a new user
export async function registerUser(formData: {
  name: string
  email: string
  phone: string
  password: string
}) {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: formData.email },
    })

    if (existingUser) {
      return { success: false, error: "User already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password, 10)

    // Create new user
    const user = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: hashedPassword,
        isVerified: false, // User will need to verify email/phone
      },
    })

    // Create token for verification (in a real app, you'd use this for email/SMS)
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })

    return {
      success: true,
      userId: user.id,
      token,
    }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, error: "Failed to register user" }
  }
}

// Login user
export async function loginUser(credentials: { email: string; password: string }) {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    })

    if (!user) {
      return { success: false, error: "Invalid credentials" }
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

    if (!isPasswordValid) {
      return { success: false, error: "Invalid credentials" }
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, isVerified: user.isVerified },
      JWT_SECRET,
      { expiresIn: "30d" },
    )

    // Set cookie - using await with cookies()
    const cookieStore = await cookies()
    await cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
      },
    }
  } catch (error) {
    console.error("Error logging in:", error)
    return { success: false, error: "Failed to login" }
  }
}

// Get current user from token
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

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

// Logout user
export async function logoutUser() {
  try {
    const cookieStore = await cookies()
    await cookieStore.delete("auth_token")
    return { success: true }
  } catch (error) {
    console.error("Error logging out:", error)
    return { success: false, error: "Failed to logout" }
  }
}

// Update user verification status
export async function updateUserVerification(userId: string, isVerified: boolean) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isVerified },
    })

    // Update the token with new verification status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
      },
    })

    if (user) {
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, isVerified: user.isVerified },
        JWT_SECRET,
        { expiresIn: "30d" },
      )

      // Fix: Use await with cookies()
      const cookieStore = cookies()
      await cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      })
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating user verification:", error)
    return { success: false, error: "Failed to update verification status" }
  }
}
