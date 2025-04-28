// File: app/test/attempt.page.tsx

"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { TestResult } from "@/lib/store"

export default function TestResultPage() {
  const searchParams = useSearchParams()
  const testIdParam = searchParams.get("id")
  const router = useRouter()

  const { user, isAuthenticated } = useAuthStore()
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResult = async () => {
      if (!testIdParam) return

      try {
        const token = localStorage.getItem("auth_token")
        if (!token) {
          setError("You must be logged in to view this result.")
          return
        }

        const res = await fetch(`/api/test-result/${testIdParam}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (!data.success) {
          setError(data.error || "Result not found")
        } else {
          setResult(data.result)
        }
      } catch (err) {
        console.error(err)
        setError("Something went wrong.")
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [testIdParam])

  if (loading) return <div className="p-4 text-center">Loading result...</div>
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>
  if (!result) return null

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Test Result</h1>
      <div className="space-y-2">
        <p><strong>Test ID:</strong> {result.testId}</p>
        <p><strong>Score:</strong> {result.score}/{result.totalQuestions}</p>
        <p><strong>Percentage:</strong> {result.percentage}%</p>
        <p><strong>Time Taken:</strong> {result.timeTaken ? `${Math.floor(result.timeTaken / 60)}m ${result.timeTaken % 60}s` : "N/A"}</p>
        <p><strong>Completed At:</strong> {new Date(result.completedAt).toLocaleString()}</p>
        <p><strong>Rank:</strong> {result.rank || "N/A"} / {result.totalParticipants || "N/A"}</p>
      </div>
    </div>
  )
}
