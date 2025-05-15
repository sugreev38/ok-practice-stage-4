"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  // Get params from URL
  const userId = searchParams.get("userId") || ""
  const email = searchParams.get("email") || ""
  const initialEmailVerified = searchParams.get("emailVerified") === "true"

  // State
  const [emailToken, setEmailToken] = useState("")
  const [emailVerified, setEmailVerified] = useState(initialEmailVerified)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  // Send email verification code
  const sendEmailVerification = async () => {
    if (!email) {
      setError("Email address is required")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userId }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Verification code sent to your email")
        // For development, auto-fill the token
        if (process.env.NODE_ENV === "development" && data.token) {
          setEmailToken(data.token)
        }
      } else {
        setError(data.error || "Failed to send verification email")
      }
    } catch (err) {
      setError("An error occurred sending verification email")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Verify email token
  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailToken) {
      setError("Verification code is required")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/verify-email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationToken: emailToken, userId }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Email verified successfully!")
        setEmailVerified(true)

        // Log the user in with the returned token
        if (data.token) {
          login(data.token)
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        }
      } else {
        setError(data.error || "Email verification failed")
      }
    } catch (err) {
      setError("An error occurred verifying email")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {emailVerified ? "Verification Complete" : "Verify Your Email"}
          </CardTitle>
          <CardDescription className="text-center">
            {emailVerified
              ? "Your account is now fully verified"
              : "Verify your email address to activate your account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-500 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {emailVerified ? (
            <div className="text-center py-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">Your account is now active!</p>
              <p className="text-gray-500 mt-2">Redirecting to dashboard...</p>
              <Button className="mt-4" onClick={() => router.push("/dashboard")}>
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <form onSubmit={verifyEmail} className="space-y-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input value={email} disabled className="bg-gray-50" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailToken">Verification Code</Label>
                  <Button type="button" variant="link" size="sm" onClick={sendEmailVerification} disabled={loading}>
                    Send Code
                  </Button>
                </div>
                <Input
                  id="emailToken"
                  placeholder="Enter verification code"
                  value={emailToken}
                  onChange={(e) => setEmailToken(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading || !emailToken}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
