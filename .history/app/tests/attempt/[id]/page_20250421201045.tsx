"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
// …other imports…

export default function AttemptTestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  // … all your state and effects …

  // 1️⃣ Loading / test-not-found state
  if (isPageLoading || !test) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="…">
          <Link href="/">TestHub</Link>
        </header>
        <main className="…">
          {/* your skeleton UI */}
        </main>
      </div>
    )
  }

  // 2️⃣ Actual test UI
  return (
    <div className="flex min-h-screen flex-col">
      <header className="…">
        {/* Timer + Submit button */}
      </header>
      <main className="…">
        {/* Question card, navigation panel, etc. */}
      </main>

      {/* Submit dialog */}
      <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              {/* … */}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submitTest}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time up dialog */}
      <AlertDialog open={isTimeUpDialogOpen} onOpenChange={() => {/*…*/}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time’s Up!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={submitTest}>View Results</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
