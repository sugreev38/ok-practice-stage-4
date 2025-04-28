"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2, Flag, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

type Question = {
  id: string
  text: string
  options: {
    id: string
    text: string
  }[]
}

type Test = {
  id: string
  title: string
  description: string
  timeLimit: number // in minutes
  questions: Question[]
}

export default function TestAttemptPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch test data
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`/lib/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch test")
        }
        const data = await response.json()
        if (data.success) {
          setTest(data.test)
          setTimeRemaining(data.test.timeLimit * 60) // Convert minutes to seconds
        } else {
          setError(data.error || "Failed to load test")
        }
      } catch (error) {
        setError("An error occurred while loading the test")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTest()
  }, [params.id])

  // Timer countdown
  useEffect(() => {
    if (!timeRemaining || timeRemaining <= 0 || !test) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, test])

  // Format time remaining
  const formatTime = useCallback((seconds: number | null) => {
    if (seconds === null) return "--:--"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  // Handle flagging questions
  const toggleFlagQuestion = (index: number) => {
    setFlaggedQuestions((prev) => {
      const newFlagged = new Set(prev)
      if (newFlagged.has(index)) {
        newFlagged.delete(index)
      } else {
        newFlagged.add(index)
      }
      return newFlagged
    })
  }

  // Navigate to next question
  const goToNextQuestion = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  // Navigate to specific question
  const goToQuestion = (index: number) => {
    if (test && index >= 0 && index < test.questions.length) {
      setCurrentQuestionIndex(index)
    }
  }

  // Submit test
  const handleSubmitTest = async () => {
    if (!test) return

    setSubmitting(true)
    try {
      const response = await fetch("/api/submit-test-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId: test.id,
          answers,
          timeSpent: test.timeLimit * 60 - (timeRemaining || 0),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Test submitted successfully",
          description: "Redirecting to results...",
        })
        router.push(`/tests/results/${data.resultId}`)
      } else {
        toast({
          title: "Error submitting test",
          description: data.error || "Please try again",
          variant: "destructive",
        })
        setSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting test:", error)
      toast({
        title: "Error submitting test",
        description: "Please try again",
        variant: "destructive",
      })
      setSubmitting(false)
    }
  }

  // Calculate progress
  const progress = test ? (Object.keys(answers).length / test.questions.length) * 100 : 0

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-lg">Loading test...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">{error}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/tests")}>Back to Tests</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Test Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">The requested test could not be found.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/tests")}>Back to Tests</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentQuestion = test.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0
  const isFlagged = flaggedQuestions.has(currentQuestionIndex)

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{test.title}</h1>
          <p className="text-muted-foreground">{test.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{formatTime(timeRemaining)}</span>
          </div>
          <Button
            variant="destructive"
            onClick={() => {
              if (window.confirm("Are you sure you want to submit your test?")) {
                handleSubmitTest()
              }
            }}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Test"
            )}
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Object.keys(answers).length} of {test.questions.length} answered
          </span>
        </div>
        <Progress value={progress} className="h-2 w-full" />
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card className="min-h-[400px]">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">
              Question {currentQuestionIndex + 1}
              {isFlagged && (
                <Badge variant="outline" className="ml-2 bg-yellow-100">
                  Flagged
                </Badge>
              )}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleFlagQuestion(currentQuestionIndex)}
              className={isFlagged ? "text-yellow-600" : ""}
            >
              <Flag className={`mr-2 h-4 w-4 ${isFlagged ? "fill-yellow-500 text-yellow-600" : ""}`} />
              {isFlagged ? "Unflag" : "Flag"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-lg">{currentQuestion.text}</p>
            </div>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
            >
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="mb-3 flex items-start space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label
                    htmlFor={option.id}
                    className="cursor-pointer rounded-md p-2 text-base font-normal hover:bg-muted"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={goToPrevQuestion} disabled={isFirstQuestion}>
              Previous
            </Button>
            <Button onClick={goToNextQuestion} disabled={isLastQuestion}>
              Next
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {test.questions.map((_, index) => {
                  const isAnswered = answers[test.questions[index].id] !== undefined
                  const isCurrentQuestion = index === currentQuestionIndex
                  const isQuestionFlagged = flaggedQuestions.has(index)

                  return (
                    <Button
                      key={index}
                      variant={isCurrentQuestion ? "default" : isAnswered ? "outline" : "secondary"}
                      className={`h-10 w-10 p-0 ${isQuestionFlagged ? "border-2 border-yellow-500" : ""}`}
                      onClick={() => goToQuestion(index)}
                    >
                      {index + 1}
                    </Button>
                  )
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span className="text-xs">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full border border-input bg-background"></div>
                  <span className="text-xs">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-secondary"></div>
                  <span className="text-xs">Unanswered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full border-2 border-yellow-500"></div>
                  <span className="text-xs">Flagged</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Questions:</span>
                <span className="font-medium">{test.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Answered:</span>
                <span className="font-medium">{Object.keys(answers).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Flagged:</span>
                <span className="font-medium">{flaggedQuestions.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining:</span>
                <span className="font-medium">{test.questions.length - Object.keys(answers).length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
