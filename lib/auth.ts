import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key"

export type UserPayload = {
  id: string
  name: string | null
  email: string
  isVerified: boolean
}

export async function createJwtToken(user: UserPayload): Promise<string> {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}
