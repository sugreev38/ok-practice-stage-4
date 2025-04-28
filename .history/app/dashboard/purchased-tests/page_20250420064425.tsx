"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Clock, Calendar } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { format } from "date-fns"

export default function PurchasedTestsPage() {
  const { purchasedTests } = useStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>TestHub</span>
          </Link>
        </header>
        <div className="grid flex-1 md:grid-cols-[220px_1fr]">
          <DashboardNav className="hidden border-r md:block" />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center">
              <div className="h-8 w-48 animate-pulse rounded-md bg-muted"></div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="flex flex-col">
                  <CardHeader>
                    <div className="h-6 w-3/4 animate-pulse rounded-md bg-muted"></div>
                    <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted"></div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid gap-2">
                      <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted"></div>
                      <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted"></div>
                      <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted"></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>TestHub</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/tests">
            <Button variant="outline" size="sm">
              Browse Tests
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <DashboardNav className="hidden border-r md:block" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div>
            <h1 className="text-2xl font-bold">Purchased Tests</h1>
            <p className="text-muted-foreground">Start or continue your tests</p>
          </div>

          {purchasedTests.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No tests purchased yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't purchased any tests yet. Browse our catalog to find tests that match your needs.
              </p>
              <Button asChild>
                <Link href="/tests">Browse Tests</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {purchasedTests.map((test) => (
                <Card key={test.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{test.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{test.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Purchased: {format(new Date(test.purchaseDate), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={test.completed ? "success" : "outline"}>{test.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/tests/attempt/${test.id}`}>{test.completed ? "Review Test" : "Start Test"}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

