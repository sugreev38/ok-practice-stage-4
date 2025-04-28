"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

interface Stats {
  totalTests: number
  completedTests: number
  averageScore: number
}

const DashboardPage: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [answer, setAnswer] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/login?callbackUrl=/dashboard')
        return
      }

      try {
        const res = await fetch('/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to fetch stats')
        const data: Stats = await res.json()
        setStats(data)
      } catch (err: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message || 'Unable to load stats',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [router, toast])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Navigate to result page after slight delay (simulate processing)
    setTimeout(() => {
      router.push('/dashboard/result')
    }, 300)
  }

  if (loading) return <div className="p-6">Loading dashboard...</div>
  if (!stats) return <div className="p-6">No statistics available.</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Statistics</h1>
      <ul className="space-y-2 mb-6">
        <li>Total Tests: <strong>{stats.totalTests}</strong></li>
        <li>Completed Tests: <strong>{stats.completedTests}</strong></li>
        <li>Average Score: <strong>{stats.averageScore}%</strong></li>
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="q1" className="block font-medium mb-1">
            What is 2 + 2?
          </label>
          <input
            id="q1"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border px-2 py-1 w-full"
            placeholder="Enter your answer"
            disabled={submitted}
          />
        </div>
        {!submitted ? (
          <button
            type="submit"
            disabled={!answer}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Submit Answer
          </button>
        ) : (
          <div className="text-green-600 font-semibold">Answer submitted! Redirecting...</div>
        )}
      </form>
    </div>
  )
}

export default DashboardPage
