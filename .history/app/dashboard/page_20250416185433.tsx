"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, CreditCard, Package, Settings, Building, GraduationCap, BookOpen } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"
import TestList from "@/components/test-list"
import UserDropdown from "@/components/user-dropdown"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalTests: 0,
    completedTests: 0,
    averageScore: 0,
    credits: 0,
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!loading && !isAuthenticated) {
      router.push("/login?callbackUrl=/dashboard")
      return
    }

    // If authenticated, fetch dashboard stats
    if (isAuthenticated && user) {
      const fetchStats = async () => {
        try {
          setIsLoadingStats(true)
          const token = localStorage.getItem("auth_token")

          if (!token) {
            throw new Error("No auth token found")
          }

          const response = await fetch("/api/dashboard/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) {
            throw new Error("Failed to fetch dashboard stats")
          }

          const data = await response.json()
          setStats(data)
        } catch (error) {
          console.error("Error fetching dashboard stats:", error)
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load dashboard statistics",
          })
        } finally {
          setIsLoadingStats(false)
        }
      }

      fetchStats()
    }
  }, [isAuthenticated, loading, user, router, toast])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, this will redirect (see useEffect)
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>TestHub</span>
        </Link>
        <Tabs defaultValue="overview" className="ml-auto mr-4 hidden md:block">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tests">My Tests</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
          <UserDropdown />
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <DashboardNav className="hidden border-r md:block" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoadingStats ? <div className="h-8 w-16 animate-pulse rounded bg-muted"></div> : stats.totalTests}
                </div>
                <p className="text-xs text-muted-foreground">4 purchased this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Tests</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoadingStats ? (
                    <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                  ) : (
                    stats.completedTests
                  )}
                </div>
                <p className="text-xs text-muted-foreground">3 completed this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoadingStats ? (
                    <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                  ) : (
                    `${stats.averageScore}%`
                  )}
                </div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credits</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoadingStats ? <div className="h-8 w-16 animate-pulse rounded bg-muted"></div> : stats.credits}
                </div>
                <p className="text-xs text-muted-foreground">
                  <Link href="/tests" className="text-primary hover:underline">
                    Purchase more
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Tests</CardTitle>
                  <CardDescription>You have 4 tests in progress.</CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/tests">
                    View All
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <TestList />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Tests</CardTitle>
                <CardDescription>Based on your interests and performance.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-muted p-2">
                    <Building className="h-8 w-8" />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">Haryana Police Constable</p>
                    <p className="text-sm text-muted-foreground">Complete preparation for Haryana Police Exam</p>
                  </div>
                  <Button size="sm" className="ml-auto">
                    View
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-muted p-2">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">SSC CGL Tier 1</p>
                    <p className="text-sm text-muted-foreground">Complete test series for SSC CGL Exam</p>
                  </div>
                  <Button size="sm" className="ml-auto">
                    View
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-muted p-2">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">UP Lekhpal</p>
                    <p className="text-sm text-muted-foreground">Practice tests for UP Lekhpal Exam</p>
                  </div>
                  <Button size="sm" className="ml-auto">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
