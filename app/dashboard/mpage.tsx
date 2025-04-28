"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalTests: number
  completedTests: number
  averageScore: number
  credits: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (!response.ok) throw new Error('Failed to fetch stats')
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div className="p-4 text-center">Loading...</div>
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <StatCard title="Total Tests" value={stats?.totalTests} />
          <StatCard title="Completed Tests" value={stats?.completedTests} />
          <StatCard title="Average Score" value={`${stats?.averageScore}%`} />
          <StatCard title="Available Credits" value={stats?.credits} />
        </div>

        <Link
          href="/purchased-tests"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg
                   hover:bg-blue-700 transition-colors duration-200
                   flex items-center justify-center gap-2"
        >
          <span>View Purchased Tests</span>
          <span className="bg-white/20 px-2 py-1 rounded-md">
            {stats?.totalTests}
          </span>
        </Link>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string | number | undefined }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">
        {value ?? '--'}
      </p>
    </div>
  )
}