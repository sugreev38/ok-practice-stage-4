"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Package } from "lucide-react"
import Link from "next/link"
import  { useStore } from "@/lib/store"

export default function ProtectedRoute({
  children,
  requireVerification = false,
}: {
  children: React.ReactNode
  requireVerification?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser } = useStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem("auth_token")

        if (!token) {
          // Store the current path to redirect back after login
          sessionStorage.setItem("redirectAfterLogin", pathname)
          router.push("/login")
          return
        }

        // If we have a user already, just check verification
        if (user) {
          if (requireVerification && !user.isVerified) {
            router.push("/verify")
            return
          }
          setIsLoading(false)
          return
        }

        // Fetch user data from API
        const response = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          localStorage.removeItem("auth_token")
          sessionStorage.setItem("redirectAfterLogin", pathname)
          router.push("/login")
          return
        }

        const userData = await response.json()
        setUser(userData.user)

        if (requireVerification && !userData.user.isVerified) {
          router.push("/verify")
          return
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Auth error:", error)
        localStorage.removeItem("auth_token")
        sessionStorage.setItem("redirectAfterLogin", pathname)
        router.push("/login")
      }
    }

    checkAuth()
  }, [user, router, pathname, requireVerification, setUser])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6 text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">TestHub</span>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  return <>{children}</>
}
