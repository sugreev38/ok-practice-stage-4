"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verificationNeeded, setVerificationNeeded] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setVerificationNeeded(false)
    setLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.status === 403 && data.requiresVerification) {
        setVerificationNeeded(true)
        setError(data.error || "Please verify your account")
      } else if (res.ok) {
        alert("Login successful! Welcome " + data.user.name)
        router.push("/dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="password">Password</label><br />
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <p>Don't have an account?</p>
        <button
          onClick={() => router.push("/register")}
          disabled={loading}
          style={{ width: "100%", padding: 10 }}
        >
          Register
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
          {verificationNeeded && (
            <span> - Please check your email or phone to verify your account.</span>
          )}
        </p>
      )}
    </div>
  )
}
