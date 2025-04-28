"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

enum RegistrationStep {
  INITIAL_INFO = 0,
  EMAIL_VERIFICATION = 1,
  PHONE_VERIFICATION = 2,
  COMPLETE = 3,
}

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Verification state
  const [emailToken, setEmailToken] = useState("")
  const [phoneToken, setPhoneToken] = useState("")
  const [userId, setUserId] = useState("")

  // UI state
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(RegistrationStep.INITIAL_INFO)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")

  // Handle initial registration
  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate phone number format (simple validation)
    const phoneRegex = /^\+?[1-9]\d{9,14}$/
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number (10+ digits, optionally with + prefix)")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }),
      })

      const data = await response.json()

      if (data.success) {
        setUserId(data.userId)
        setSuccess("Account created! Please verify your email.")
        // Send email verification
        await sendEmailVerification(email, data.userId)
        setCurrentStep(RegistrationStep.EMAIL_VERIFICATION)
      } else {
        setError(data.error || "Registration failed")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Send email verification code
  const sendEmailVerification = async (email: string, userId: string) => {
    setLoading(true)
    setError("")

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
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/verify-email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token: emailToken }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Email verified successfully! Now verify your phone number.")
        // Send phone verification
        await sendPhoneVerification(phone, userId)
        setCurrentStep(RegistrationStep.PHONE_VERIFICATION)
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

  // Send phone verification code
  const sendPhoneVerification = async (phone: string, userId: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/verify-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, userId }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Verification code sent to your phone")
        // For development, auto-fill the token
        if (process.env.NODE_ENV === "development" && data.token) {
          setPhoneToken(data.token)
        }
      } else {
        setError(data.error || "Failed to send verification SMS")
      }
    } catch (err) {
      setError("An error occurred sending verification SMS")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Verify phone token
  const verifyPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/verify-phone", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, token: phoneToken, userId }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Phone verified successfully! Your account is now active.")
        setCurrentStep(RegistrationStep.COMPLETE)

        // Log the user in with the returned token
        if (data.token) {
          login(data.token)
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        }
      } else {
        setError(data.error || "Phone verification failed")
      }
    } catch (err) {
      setError("An error occurred verifying phone")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Resend verification codes
  const resendEmailCode = () => {
    sendEmailVerification(email, userId)
  }

  const resendPhoneCode = () => {
    sendPhoneVerification(phone, userId)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {currentStep === RegistrationStep.INITIAL_INFO && "Create a new account"}
            {currentStep === RegistrationStep.EMAIL_VERIFICATION && "Verify your email"}
            {currentStep === RegistrationStep.PHONE_VERIFICATION && "Verify your phone"}
            {currentStep === RegistrationStep.COMPLETE && "Registration complete!"}
          </CardTitle>
          <CardDescription className="text-center">
            {currentStep === RegistrationStep.INITIAL_INFO && (
              <>
                Or{" "}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  sign in to your account
                </Link>
              </>
            )}
            {currentStep === RegistrationStep.EMAIL_VERIFICATION && "Enter the verification code sent to your email"}
            {currentStep === RegistrationStep.PHONE_VERIFICATION && "Enter the verification code sent to your phone"}
            {currentStep === RegistrationStep.COMPLETE && "Your account has been successfully created and verified"}
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

          {currentStep === RegistrationStep.INITIAL_INFO && (
            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="+1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          )}

          {currentStep === RegistrationStep.EMAIL_VERIFICATION && (
            <form onSubmit={verifyEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailToken">Email Verification Code</Label>
                <Input
                  id="emailToken"
                  name="emailToken"
                  type="text"
                  required
                  placeholder="123456"
                  value={emailToken}
                  onChange={(e) => setEmailToken(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              <div className="text-center">
                <Button type="button" variant="link" onClick={resendEmailCode} disabled={loading}>
                  Resend verification code
                </Button>
              </div>
            </form>
          )}

          {currentStep === RegistrationStep.PHONE_VERIFICATION && (
            <form onSubmit={verifyPhone} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneToken">Phone Verification Code</Label>
                <Input
                  id="phoneToken"
                  name="phoneToken"
                  type="text"
                  required
                  placeholder="123456"
                  value={phoneToken}
                  onChange={(e) => setPhoneToken(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Phone"
                )}
              </Button>

              <div className="text-center">
                <Button type="button" variant="link" onClick={resendPhoneCode} disabled={loading}>
                  Resend verification code
                </Button>
              </div>
            </form>
          )}

          {currentStep === RegistrationStep.COMPLETE && (
            <div className="text-center py-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">Your account is now active!</p>
              <p className="text-gray-500 mt-2">Redirecting to dashboard...</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          {currentStep !== RegistrationStep.INITIAL_INFO && currentStep !== RegistrationStep.COMPLETE && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(RegistrationStep.INITIAL_INFO)}
              disabled={loading}
            >
              Start Over
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
