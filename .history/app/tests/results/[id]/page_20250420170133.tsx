"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, CheckCircle, XCircle, Clock, Medal, Users, BarChart3, PieChart, BookOpen } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { testCatalog } from "@/lib/test-catalog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Bar,
  BarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useToast } from "@/components/ui/use-toast"
import { useAuthStore } from "@/lib/store"

export default function TestResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthStore()
  const [testResult, setTestResult] = useState<any>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const { toast } = useToast()

  const resolvedParams = React.use(params)
  const testId = Number.parseInt(resolvedParams.id)

  // Find the test in tzhe catalog
  const test = testCatalog.all.find((t) => t.id === testId)

  // Fetch test result
  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        if (!token) {
          router.push("/login?callbackUrl=/dashboard/purchased-tests")
          return
        }

        const response = await fetch(`/api/test-result/${testId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch test result")
        }

        const data = await response.json()
        if (data.success) {
          setTestResult(data.result)
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch test result",
            variant: "destructive",
          })
          router.push("/dashboard/purchased-tests")
        }
      } catch (error) {
        console.error("Error fetching test result:", error)
        toast({
          title: "Error",
          description: "Failed to fetch test result",
          variant: "destructive",
        })
        router.push("/dashboard/purchased-tests")
      } finally {
        setIsPageLoading(false)
      }
    }

    if (!isLoading && isAuthenticated) {
      fetchTestResult()
    } else if (!isLoading && !isAuthenticated) {
      router.push("/login?callbackUrl=/dashboard/purchased-tests")
    }
  }, [isAuthenticated, isLoading, router, testId, toast])

  if (isPageLoading || isLoading || !test || !testResult) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>TestHub</span>
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <div className="h-8 w-64 mx-auto animate-pulse rounded-md bg-muted"></div>
              <div className="h-4 w-96 mx-auto mt-2 animate-pulse rounded-md bg-muted"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader className="text-center">
                  <div className="h-6 w-32 mx-auto animate-pulse rounded-md bg-muted"></div>
                  <div className="h-4 w-48 mx-auto mt-2 animate-pulse rounded-md bg-muted"></div>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-muted">
                    <div className="h-12 w-12 animate-pulse rounded-md bg-muted"></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
                  <div className="h-4 w-64 mt-2 animate-pulse rounded-md bg-muted"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-32 animate-pulse rounded-md bg-muted"></div>
                      <div className="h-4 w-8 animate-pulse rounded-md bg-muted"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-32 animate-pulse rounded-md bg-muted"></div>
                      <div className="h-4 w-8 animate-pulse rounded-md bg-muted"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const { score, totalQuestions, percentage, timeTaken, rank, totalParticipants, questionDetails } = testResult

  // Determine pass/fail status (assuming 60% is passing)
  const isPassed = percentage >= 60

  // Get performance grade
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return "A"
    if (percentage >= 80) return "B"
    if (percentage >= 70) return "C"
    if (percentage >= 60) return "D"
    return "F"
  }

  // Format time taken
  const formatTimeTaken = (seconds = 0) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`
    }

    return `${minutes}m ${remainingSeconds}s`
  }

  // Calculate percentile
  const percentile = rank && totalParticipants ? Math.round(((totalParticipants - rank) / totalParticipants) * 100) : 0

  // Prepare data for topic performance chart
  const topicPerformanceData = questionDetails
    ? Object.entries(
        questionDetails.reduce((acc: Record<string, { correct: number; total: number }>, q) => {
          if (!acc[q.topic]) {
            acc[q.topic] = { correct: 0, total: 0 }
          }
          acc[q.topic].total += 1
          if (q.isCorrect) {
            acc[q.topic].correct += 1
          }
          return acc
        }, {}),
      ).map(([topic, data]) => ({
        topic,
        percentage: Math.round((data.correct / data.total) * 100),
        correct: data.correct,
        total: data.total,
      }))
    : []

  // Prepare data for difficulty performance chart
  const difficultyPerformanceData = questionDetails
    ? Object.entries(
        questionDetails.reduce((acc: Record<string, { correct: number; total: number }>, q) => {
          if (!acc[q.difficulty]) {
            acc[q.difficulty] = { correct: 0, total: 0 }
          }
          acc[q.difficulty].total += 1
          if (q.isCorrect) {
            acc[q.difficulty].correct += 1
          }
          return acc
        }, {}),
      ).map(([difficulty, data]) => ({
        difficulty,
        percentage: Math.round((data.correct / data.total) * 100),
        correct: data.correct,
        total: data.total,
      }))
    : []

  // Prepare data for question type performance chart
  const typePerformanceData = questionDetails
    ? Object.entries(
        questionDetails.reduce((acc: Record<string, { correct: number; total: number }>, q) => {
          if (!acc[q.type]) {
            acc[q.type] = { correct: 0, total: 0 }
          }
          acc[q.type].total += 1
          if (q.isCorrect) {
            acc[q.type].correct += 1
          }
          return acc
        }, {}),
      ).map(([type, data]) => ({
        type,
        percentage: Math.round((data.correct / data.total) * 100),
        correct: data.correct,
        total: data.total,
      }))
    : []

  // Prepare data for pie chart
  const pieChartData = [
    { name: "Correct", value: score, color: "#22c55e" },
    { name: "Incorrect", value: totalQuestions - score, color: "#ef4444" },
  ]

  // COLORS for charts
  const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>TestHub</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/dashboard/purchased-tests">
            <Button variant="outline" size="sm">
              Back to Tests
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">{test.title} - Results</h1>
            <p className="text-muted-foreground">{test.description}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Your Score</CardTitle>
                <CardDescription>Test performance summary</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-muted">
                  <div className="text-center">
                    <span className="text-4xl font-bold">{percentage}%</span>
                    <p className="text-sm text-muted-foreground">Grade: {getGrade(percentage)}</p>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Score</span>
                    <span className="font-medium">
                      {score}/{totalQuestions}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>

                <div className="flex items-center justify-center gap-2">
                  {isPassed ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-500">Passed</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="font-medium text-red-500">Failed</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>Detailed breakdown of your test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Correct Answers</span>
                    <span className="font-medium text-green-500">{score}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Incorrect Answers</span>
                    <span className="font-medium text-red-500">{totalQuestions - score}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Accuracy</span>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Time Taken</span>
                    <span className="font-medium">{formatTimeTaken(timeTaken)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium">Recommendations</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    {isPassed ? (
                      <>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                          <span>Great job! You've demonstrated a good understanding of the material.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                          <span>Consider taking more advanced tests to challenge yourself further.</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <XCircle className="mt-0.5 h-4 w-4 text-red-500 shrink-0" />
                          <span>Review the areas where you made mistakes and try again.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="mt-0.5 h-4 w-4 text-red-500 shrink-0" />
                          <span>Consider our study materials to improve your understanding.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Ranking</CardTitle>
                <CardDescription>How you compare to others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-muted">
                    <div className="text-center">
                      <Medal
                        className={`h-8 w-8 mx-auto ${
                          percentile >= 90 ? "text-yellow-500" : percentile >= 70 ? "text-gray-400" : "text-amber-600"
                        }`}
                      />
                      <span className="text-2xl font-bold">#{rank}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Out of {totalParticipants} test takers</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Percentile</span>
                    <span className="font-medium">{percentile}%</span>
                  </div>
                  <Progress value={percentile} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    You performed better than {percentile}% of test takers
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Average score: {Math.round(percentage * 0.9)}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Average time: {formatTimeTaken(Math.round((timeTaken || 0) * 1.2))}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="performance">
                <BarChart3 className="h-4 w-4 mr-2" />
                Performance Analysis
              </TabsTrigger>
              <TabsTrigger value="answers">
                <BookOpen className="h-4 w-4 mr-2" />
                Answer Key
              </TabsTrigger>
              <TabsTrigger value="comparison">
                <PieChart className="h-4 w-4 mr-2" />
                Detailed Breakdown
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance by Topic</CardTitle>
                    <CardDescription>Your score breakdown by topic area</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ChartContainer
                      config={{
                        percentage: {
                          label: "Percentage",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topicPerformanceData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="topic" type="category" width={100} />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="percentage" fill="var(--color-percentage)" radius={[0, 4, 4, 0]}>
                            {topicPerformanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.percentage >= 60 ? "#22c55e" : "#ef4444"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance by Difficulty</CardTitle>
                    <CardDescription>How you performed across difficulty levels</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ChartContainer
                      config={{
                        percentage: {
                          label: "Percentage",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={difficultyPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="difficulty" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="percentage" fill="var(--color-percentage)" radius={[4, 4, 0, 0]}>
                            {difficultyPerformanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.percentage >= 60 ? "#22c55e" : "#ef4444"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="answers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Answer Key</CardTitle>
                  <CardDescription>Review your answers and see the correct solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {questionDetails?.map((question, index) => (
                      <AccordionItem key={question.id} value={question.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <Badge
                              variant={question.isCorrect ? "success" : "destructive"}
                              className="h-6 w-6 rounded-full p-0 flex items-center justify-center"
                            >
                              {question.isCorrect ? (
                                <CheckCircle className="h-3.5 w-3.5" />
                              ) : (
                                <XCircle className="h-3.5 w-3.5" />
                              )}
                            </Badge>
                            <div>
                              <span className="font-medium">Question {index + 1}</span>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {question.topic}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {question.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-10">
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium">{question.question}</p>
                            </div>
                            <div className="grid gap-2">
                              <div className="flex items-start gap-2">
                                <span className="font-medium">Your Answer:</span>
                                <span className={question.isCorrect ? "text-green-500" : "text-red-500"}>
                                  {question.userAnswer || "No answer provided"}
                                </span>
                              </div>
                              {!question.isCorrect && (
                                <div className="flex items-start gap-2">
                                  <span className="font-medium">Correct Answer:</span>
                                  <span className="text-green-500">{question.correctAnswer}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Performance</CardTitle>
                    <CardDescription>Correct vs. Incorrect Answers</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance by Question Type</CardTitle>
                    <CardDescription>How you performed across different question types</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ChartContainer
                      config={{
                        percentage: {
                          label: "Percentage",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={typePerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="type" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="percentage" fill="var(--color-percentage)" radius={[4, 4, 0, 0]}>
                            {typePerformanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.percentage >= 60 ? "#22c55e" : "#ef4444"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/purchased-tests">Back to Tests</Link>
            </Button>
            <Button asChild>
              <Link href={`/tests/attempt/${testId}`}>Retake Test</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
