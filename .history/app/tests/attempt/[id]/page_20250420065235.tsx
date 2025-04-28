"use client"

import { useState, useEffect, useRef, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Package, Clock, AlertCircle, Flag, CheckCircle, HelpCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useStore, type TestResult } from "@/lib/store"
import { testCatalog } from "@/lib/test-catalog"
import { Badge } from "@/components/ui/badge"

export default function AttemptTestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { purchasedTests, updateTestStatus, saveTestResult, getTestResult } = useStore()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const testId = Number.parseInt(params.id)
  const purchasedTest = purchasedTests.find((test) => test.id === testId)

  // Find the test in the catalog
  const test = testCatalog.all.find((t) => t.id === testId)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(test?.questions.length || 0).fill(""))
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(test?.questions.length || 0).fill(false))
  const [timeLeft, setTimeLeft] = useState(test?.duration * 60 || 0) // in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [startTime, setStartTime] = useState<Date | null>(null)

  // Check if test exists in purchased tests
  useEffect(() => {
    if (!purchasedTest && !isLoading) {
      toast({
        title: "Test not found",
        description: "This test is not in your purchased tests.",
        variant: "destructive",
      })
      router.push("/dashboard/purchased-tests")
    }

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
      setStartTime(new Date())
    }, 500)

    return () => clearTimeout(timer)
  }, [purchasedTest, router, isLoading])

  // Update test status to In Progress when starting
  useEffect(() => {
    if (purchasedTest && purchasedTest.status === "Not Started") {
      updateTestStatus(testId, "In Progress", false)
    }
  }, [purchasedTest, testId, updateTestStatus])

  // Check for existing test result
  useEffect(() => {
    const result = getTestResult(testId)
    if (result) {
      setAnswers(result.answers)
    }
  }, [testId, getTestResult])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUpDialogOpen(true)
      return
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timeLeft])

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  // Toggle flagged status for current question
  const toggleFlagged = () => {
    const newFlagged = [...flaggedQuestions]
    newFlagged[currentQuestion] = !newFlagged[currentQuestion]
    setFlaggedQuestions(newFlagged)
  }

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  // Calculate test statistics
  const getTestStats = () => {
    const answered = answers.filter((a) => a !== "").length
    const flagged = flaggedQuestions.filter((f) => f).length
    const unanswered = answers.length - answered

    return { answered, flagged, unanswered }
  }

  // Submit test
  const submitTest = () => {
    // Calculate score
    let score = 0
    const questionDetails: { id: any; question: any; userAnswer: string; correctAnswer: any; isCorrect: boolean; topic: any; type: any; difficulty: any }[] = []

    answers.forEach((answer, index) => {
      const question = test.questions[index]
      const isCorrect = answer === question.correctAnswer

      if (isCorrect) {
        score++
      }

      questionDetails.push({
        id: question.id,
        question: question.question,
        userAnswer: answer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        topic: question.topic,
        type: question.type,
        difficulty: question.difficulty,
      })
    })

    const percentage = Math.round((score / test.questions.length) * 100)
    const endTime = new Date()
    const timeTaken = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0

    // Save test result
    const result: TestResult = {
      testId,
      score,
      totalQuestions: test.questions.length,
      percentage,
      answers,
      questionDetails,
      timeTaken,
      completedAt: new Date().toISOString(),
    }

    saveTestResult(result)

    // Navigate to results page with score
    router.push(`/tests/results/${testId}`)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>TestHub</span>
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-4xl">
            <div className="h-8 w-48 animate-pulse rounded-md bg-muted mb-6"></div>
            <div className="h-4 w-64 animate-pulse rounded-md bg-muted mb-6"></div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-32 animate-pulse rounded-md bg-muted"></div>
                <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
              </div>
              <div className="h-2 w-full animate-pulse rounded-full bg-muted"></div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
                <div className="h-4 w-full animate-pulse rounded-md bg-muted"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="h-4 w-4 animate-pulse rounded-full bg-muted"></div>
                      <div className="h-4 w-full animate-pulse rounded-md bg-muted"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // If test not found
  if (!test) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Test Not Found</CardTitle>
            <CardDescription>The test you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/purchased-tests">Back to Tests</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100
  const { answered, flagged, unanswered } = getTestStats()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>TestHub</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setIsSubmitDialogOpen(true)}>
            Submit Test
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{test.title}</h1>
            <p className="text-muted-foreground">{test.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span>
                Question {currentQuestion + 1} of {test.questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="md:col-span-3">
              <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Question {currentQuestion + 1}</CardTitle>
                    <CardDescription className="mt-1">
                      <Badge variant="outline" className="mr-2">
                        {test.questions[currentQuestion].type}
                      </Badge>
                      <Badge variant="outline" className="mr-2">
                        {test.questions[currentQuestion].topic}
                      </Badge>
                      <Badge variant="outline">{test.questions[currentQuestion].difficulty}</Badge>
                    </CardDescription>
                  </div>
                  <Button
                    variant={flaggedQuestions[currentQuestion] ? "destructive" : "outline"}
                    size="sm"
                    onClick={toggleFlagged}
                  >
                    <Flag className="h-4 w-4 mr-1" />
                    {flaggedQuestions[currentQuestion] ? "Flagged" : "Flag"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-medium mb-4">{test.questions[currentQuestion].question}</div>
                  <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswerSelect}>
                    {test.questions[currentQuestion].options.map((option: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                      <div key={index} className="flex items-center space-x-2 mb-4 p-2 rounded-md hover:bg-muted">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer py-2">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>

                {currentQuestion < test.questions.length - 1 ? (
                  <Button onClick={nextQuestion}>Next</Button>
                ) : (
                  <Button variant="default" onClick={() => setIsSubmitDialogOpen(true)}>
                    Finish Test
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Test Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Answered</span>
                        <span className="text-sm font-medium">
                          {answered}/{test.questions.length}
                        </span>
                      </div>
                      <Progress value={(answered / test.questions.length) * 100} className="h-2 bg-muted" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Flagged</span>
                        <span className="text-sm font-medium">
                          {flagged}/{test.questions.length}
                        </span>
                      </div>
                      <Progress value={(flagged / test.questions.length) * 100} className="h-2 bg-muted" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Unanswered</span>
                        <span className="text-sm font-medium">
                          {unanswered}/{test.questions.length}
                        </span>
                      </div>
                      <Progress value={(unanswered / test.questions.length) * 100} className="h-2 bg-muted" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Question Navigator</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {test.questions.map((_, index) => {
                        let buttonVariant = "ghost"
                        let icon = null

                        if (currentQuestion === index) {
                          buttonVariant = "default"
                        } else if (flaggedQuestions[index]) {
                          buttonVariant = "destructive"
                          icon = <Flag className="h-3 w-3" />
                        } else if (answers[index]) {
                          buttonVariant = "outline"
                          icon = <CheckCircle className="h-3 w-3 text-green-500" />
                        } else {
                          icon = <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        }

                        return (
                          <Button
                            key={index}
                            variant={buttonVariant}
                            className="h-10 w-10 p-0 flex items-center justify-center"
                            onClick={() => setCurrentQuestion(index)}
                          >
                            {icon ? icon : index + 1}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Submit Test Dialog */}
      <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your test? You won't be able to change your answers after submission.
              {unanswered > 0 && (
                <div className="mt-2 flex items-center gap-2 text-amber-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>You have {unanswered} unanswered questions.</span>
                </div>
              )}
              {flagged > 0 && (
                <div className="mt-2 flex items-center gap-2 text-amber-500">
                  <Flag className="h-4 w-4" />
                  <span>You have {flagged} flagged questions.</span>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submitTest}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time Up Dialog */}
      <AlertDialog open={isTimeUpDialogOpen} onOpenChange={submitTest}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your time for this test has ended. Your answers will be submitted automatically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={submitTest}>View Results</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

