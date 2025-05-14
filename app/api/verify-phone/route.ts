// import { NextResponse } from "next/server"
// import prisma from "@/lib/prisma"
// import twilio from "twilio"

// // Configure Twilio client
// const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

// // Generate a random 6-digit token
// function generateToken() {
//   return Math.floor(100000 + Math.random() * 900000).toString()
// }

// // POST: Send verification SMS
// export async function POST(request: Request) {
//   try {
//     const { phone, userId } = await request.json()

//     if (!phone) {
//       return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 })
//     }

//     // Generate a verification token
//     const token = generateToken()
//     const expires = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now

//     // Store the token in the database - Note the lowercase 'verificationtoken'
//     await prisma.verificationToken.create({
//       data: {
//         id: crypto.randomUUID(), // Add the required id field
//         token,
//         phone,
//         type: "PHONE",
//         expires,
//         email: null, // Add null for optional fields
//       },
//     })

//     // Send verification SMS
//     if (process.env.NODE_ENV === "production") {
//       await twilioClient.messages.create({
//         body: `Your verification code is: ${token}. It will expire in 30 minutes.`,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: phone,
//       })
//     }

//     // In development, return the token for testing
//     const responseData: { success: boolean; message: string; token?: string } = {
//       success: true,
//       message: "Verification code sent successfully",
//     }

//     if (process.env.NODE_ENV === "development") {
//       responseData.token = token
//     }

//     return NextResponse.json(responseData)
//   } catch (error) {
//     console.error("Phone verification error:", error)
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to send verification SMS",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     )
//   }
// }

// // PUT: Verify phone token
// export async function PUT(request: Request) {
//   try {
//     const { phone, token, userId } = await request.json()

//     if (!phone || !token) {
//       return NextResponse.json({ success: false, error: "Phone number and token are required" }, { status: 400 })
//     }

//     // Find the token in the database - Note the lowercase 'verificationtoken'
//     const verificationToken = await prisma.verificationToken.findFirst({
//       where: {
//         phone,
//         token,
//         type: "PHONE",
//         expires: {
//           gt: new Date(),
//         },
//       },
//     })

//     if (!verificationToken) {
//       return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 400 })
//     }

//     // Delete the token
//     await prisma.verificationToken.delete({
//       where: { id: verificationToken.id },
//     })

//     // Update user's phone verification status
//     if (userId) {
//       await prisma.user.update({
//         where: { id: userId },
//         data: {
//           phoneVerified: true,
//           isVerified: true, // Mark user as fully verified
//         },
//       })
//     }

//     // Generate a JWT token for the user
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     })

//     if (!user) {
//       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
//     }

//     // Import the createJwtToken function
//     const { createJwtToken } = await import("@/lib/auth")

//     // Create a JWT token
//     const jwtToken = await createJwtToken({
//       id: user.id,
//       name: user.name || "",
//       email: user.email,
//       isVerified: true,
//     })

//     return NextResponse.json({
//       success: true,
//       message: "Phone verified successfully",
//       token: jwtToken,
//     })
//   } catch (error) {
//     console.error("Phone verification error:", error)
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to verify phone",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     )
//   }
// }
