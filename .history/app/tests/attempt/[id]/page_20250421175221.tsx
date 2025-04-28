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

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('attemp/test')
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

  if (loading) return <div className="p-6">Loading dashboard...</div>
  if (!stats) return <div className="p-6">No statistics available.</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Statistics</h1>
      <ul className="space-y-2">
        <li>Total Tests: <strong>{stats.totalTests}</strong></li>
        <li>Completed Tests: <strong>{stats.completedTests}</strong></li>
        <li>Average Score: <strong>{stats.averageScore}%</strong></li>
      </ul>
    </div>
  )
}

export default DashboardPage
