"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Loader2, Clock, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTestStore } from "@/lib/store"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

interface TestData {
  id: number
  title: string
  description: string
  duration: number
  questions: Question[]
}

export default function AttemptTestPage() {
  const params = useParams()
  const router = useRouter()
  const testId = Number(params.id)
  const { updateTestStatus } = useTestStore()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [test, setTest] = useState<TestData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch test data
  useEffect(() => {
    const fetchTest = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll generate a test
        const response = await fetch(`/api/tests/${testId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch test")
        }

        const data = await response.json()
        setTest(data)
        setTimeLeft(data.duration * 60) // Convert minutes to seconds
        setSelectedAnswers(new Array(data.questions.length).fill(-1))
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError("Failed to load test. Please try again.")
        setLoading(false)
      }
    }

    fetchTest()
  }, [testId])

  // Timer countdown
  useEffect(() => {
    if (!loading && test && timeLeft > 0 && !testSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleSubmitTest()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [loading, test, timeLeft, testSubmitted])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < (test?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Submit test
  const handleSubmitTest = async () => {
    if (!test) return

    setSubmitting(true)

    try {
      // Calculate score
      let correctAnswers = 0
      for (let i = 0; i < test.questions.length; i++) {
        if (selectedAnswers[i] === test.questions[i].correctAnswer) {
          correctAnswers++
        }
      }

      const score = correctAnswers
      const percentage = Math.round((correctAnswers / test.questions.length) * 100)

      // In a real app, this would be an API call to save the result
      const response = await fetch("/api/submit-test-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId,
          answers: selectedAnswers,
          score,
          percentage,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit test")
      }

      // Update test status in store
      updateTestStatus(testId, "completed", true)

      // Navigate to results page
      router.push(`/tests/results/${testId}`)
    } catch (err) {
      console.error(err)
      setError("Failed to submit test. Please try again.")
      setSubmitting(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-lg">Loading test...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto max-w-4xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 text-center">
          <Button onClick={() => router.push("/tests")}>Back to Tests</Button>
        </div>
      </div>
    )
  }

  // Show test not found state
  if (!test) {
    return (
      <div className="container mx-auto max-w-4xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Test not found</AlertDescription>
        </Alert>
        <div className="mt-4 text-center">
          <Button onClick={() => router.push("/tests")}>Back to Tests</Button>
        </div>
      </div>
    )
  }

  const currentQuestion = test.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{test.title}</CardTitle>
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className={`font-mono ${timeLeft < 60 ? "text-red-500" : ""}`}>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <CardDescription>{test.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>
                Question {currentQuestionIndex + 1} of {test.questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="mb-6">
            <h3 className="mb-4 text-lg font-medium">
              {currentQuestionIndex + 1}. {currentQuestion.text}
            </h3>
            <RadioGroup
              value={selectedAnswers[currentQuestionIndex].toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="mb-3 flex items-start space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {test.questions.map((_, index) => (
              <Button
                key={index}
                variant={selectedAnswers[index] === -1 ? "outline" : "default"}
                size="sm"
                className={`h-10 w-10 ${currentQuestionIndex === index ? "ring-2 ring-primary ring-offset-2" : ""}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          <div className="flex gap-2">
            {currentQuestionIndex < test.questions.length - 1 ? (
              <Button onClick={handleNextQuestion}>Next</Button>
            ) : (
              <Button onClick={handleSubmitTest} disabled={submitting} className="bg-green-600 hover:bg-green-700">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Test"
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <div className="mt-4 rounded-lg border bg-gray-50 p-4">
        <h3 className="mb-2 font-medium">Test Instructions:</h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>Answer all questions to the best of your ability.</li>
          <li>You can navigate between questions using the navigation buttons or question numbers.</li>
          <li>The test will automatically submit when the timer reaches zero.</li>
          <li>Questions with selected answers are highlighted in blue, unanswered questions remain outlined.</li>
          <li>You can review and change your answers before submitting.</li>
        </ul>
      </div>
    </div>
  )
}
