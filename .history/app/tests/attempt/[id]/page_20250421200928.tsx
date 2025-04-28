import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks/useAuth" // your custom auth hook
import { toast } from "@/components/ui/use-toast"

export default function TestAttemptPage() {
  const router = useRouter()
  const { isAuthenticated, loading, user } = useAuth()
  const [questions, setQuestions] = useState([])
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login?callbackUrl=" + encodeURIComponent(router.asPath))
      return
    }

    if (isAuthenticated && user) {
      const fetchQuestions = async () => {
        try {
          setIsLoadingQuestions(true)
          const token = localStorage.getItem("auth_token")

          if (!token) throw new Error("No auth token found")

          const response = await fetch(`/api/test/${router.query.testId}/questions`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) throw new Error("Failed to load test questions")

          const data = await response.json()
          setQuestions(data.questions) // Adjust based on your API shape
        } catch (error) {
          console.error("Error loading test questions:", error)
          toast({
            variant: "destructive",
            title: "Error",
            description: "Unable to load the test. Please try again.",
          })
        } finally {
          setIsLoadingQuestions(false)
        }
      }

      fetchQuestions()
    }
  }, [isAuthenticated, loading, user, router, toast])
