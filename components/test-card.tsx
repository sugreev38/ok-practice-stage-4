"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Star } from "lucide-react"
import { useTestStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"

interface TestType {
  id: number
  title: string
  description: string
  price: number
  level: string
  duration: number
  questions: any[]
  subcategory?: string
  category?: string
  childCategory?: string
  rating?: number
  reviews?: number
  popularity?: number
  lastUpdated?: string
  questionCount?: number
}

interface TestCardProps {
  test: TestType
  onAddToCart: (test: TestType) => void
  isInCart: boolean
  isPurchased: boolean
  icon: React.ReactNode
}

export function TestCard({ test, onAddToCart, isInCart, isPurchased, icon }: TestCardProps) {
  const router = useRouter()
  const { addPurchasedTest } = useTestStore()

  // Extract the necessary properties from the test object
  const { id, title, description, price, level, duration, rating, reviews } = test

  // Get the question count safely - ensure it's always 100
  const questionCount = Array.isArray(test.questions) ? test.questions.length : test.questionCount || 100

  // Get badge color based on level
  const getLevelBadgeColor = () => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 border-none"
      case "intermediate":
        return "bg-blue-100 text-blue-800 border-none"
      case "advanced":
        return "bg-purple-100 text-purple-800 border-none"
      default:
        return "bg-gray-100 text-gray-800 border-none"
    }
  }

  // Handle attempting a test
  const handleAttemptTest = () => {
    // For demo purposes, add it to purchased tests if not already purchased
    if (!isPurchased) {
      const purchasedTest = {
        id: test.id,
        title: test.title,
        description: test.description,
        price: test.price,
        duration: test.duration,
        questions: test.questions.length,
        status: "Not Started",
        completed: false,
        purchaseDate: new Date().toISOString(),
      }

      // Add to purchased tests
      addPurchasedTest([purchasedTest])

      toast({
        title: "Test Added",
        description: "This test has been added to your purchased tests for demo purposes.",
      })
    }

    // Navigate to attempt page
    router.push(`/tests/attempt/${id}`)
  }

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="group-hover:text-purple-600 transition-colors">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </div>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Badge className={getLevelBadgeColor()}>{level}</Badge>
            {rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
                <span className="ml-1 text-xs text-gray-500">({reviews})</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{questionCount} questions</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{duration} min</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold">₹{price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        {isPurchased ? (
          <Button
            className="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            onClick={handleAttemptTest}
          >
            Attempt Test
          </Button>
        ) : isInCart ? (
          <Button className="w-full rounded-full" variant="outline" asChild>
            <Link href="/cart">View in Cart</Link>
          </Button>
        ) : (
          <>
            <Button className="w-1/2 rounded-full" variant="outline" onClick={() => onAddToCart(test)}>
              Add to Cart
            </Button>
            <Button
              className="w-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              onClick={handleAttemptTest}
            >
              Attempt Test
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
