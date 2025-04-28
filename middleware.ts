import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Define public paths that don't require authentication
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/verify",
  "/api/login",
  "/api/register",
  "/api/verify-email",
  "/api/verify-phone",
]

// Define API paths that should be checked for authentication
const apiPaths = [
  "/api/me",
  "/api/dashboard",
  "/api/purchased-tests",
  "/api/test-result",
  "/api/create-razorpay-order",
  "/api/verify-payment",
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is public
  const isPublicPath = publicPaths.some((pp) => path === pp || path.startsWith(pp))

  // Check if the path is an API that requires auth
  const isProtectedApi = apiPaths.some((ap) => path.startsWith(ap))

  // If it's a public path or not a protected API, allow access
  if (isPublicPath || (!isProtectedApi && path.startsWith("/api/"))) {
    return NextResponse.next()
  }

  // Get the token from cookies or Authorization header
  const token = request.cookies.get("auth_token")?.value || request.headers.get("Authorization")?.replace("Bearer ", "")

  // If no token, redirect to login
  if (!token) {
    if (path.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  try {
    // Verify the token
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key")
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Check if user is verified
    if (!payload.isVerified) {
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "Account not verified" }, { status: 403 })
      }

      const url = new URL("/login", request.url)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  } catch (error) {
    // If token is invalid, redirect to login
    if (path.startsWith("/api/")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
