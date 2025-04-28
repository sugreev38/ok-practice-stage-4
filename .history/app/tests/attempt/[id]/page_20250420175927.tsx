"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Package, Clock, AlertCircle } from "lucide-react";
import { useStore, type TestResult } from "@/lib/store";
import { testData } from "@/lib/test-data";

export default function AttemptTestPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { purchasedTests, updateTestStatus, saveTestResult, getTestResult } = useStore();

  const testId = Number.parseInt(params.id);
  const purchasedTest = purchasedTests.find((test) => test.id === testId);
  const test = testData[testId as keyof typeof testData];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const submitTest = () => {
  //   if (isSubmitted) return;
  //   setIsSubmitted(true);
  //   // rest of your existing submitTest function
  // };
  
  useEffect(() => {
    if (!test) {
      toast({
        title: "Test not found",
        description: "This test does not exist.",
        variant: "destructive",
      });
      router.push("/dashboard/purchased-tests");
      return;
    }

    const initialAnswers = Array(test.questions.length).fill("");
    setAnswers(initialAnswers);
    setTimeLeft(test.duration * 60);

    const existingResult = getTestResult(testId);
    if (existingResult) {
      setAnswers(existingResult.answers);
    }

    if (purchasedTest && purchasedTest.status === "Not Started") {
      updateTestStatus(testId, "In Progress", false);
    }

    setIsLoading(false);
  }, [test, purchasedTest, testId, getTestResult, updateTestStatus, router]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    // if (timeLeft <= 0) {
    //   setIsTimeUpDialogOpen(true);
    //   return;
    // }
    if (timeLeft <= 0) {
      setIsTimeUpDialogOpen(true);
    
      // Automatically submit the test when time is up after a short delay
      setTimeout(() => {
        submitTest();
      }, 3000); // 3 seconds delay to show "time's up" dialog
      return;
    }
    

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft]);

  useEffect(() => {
    const newAnswered = answers.reduce<number[]>((acc, answer, idx) => {
      if (answer) acc.push(idx);
      return acc;
    }, []);
    setAnsweredQuestions(newAnswered);
  }, [answers]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (value: string) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = value;
      return updated;
    });
  };

  const navigateQuestion = (direction: "next" | "prev") => {
    setCurrentQuestion((prev) => {
      if (direction === "next" && prev < test.questions.length - 1) return prev + 1;
      if (direction === "prev" && prev > 0) return prev - 1;
      return prev;
    });
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const submitTest = () => {
    const score = answers.reduce((acc, answer, idx) => {
      return answer === test.questions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);

    const percentage = Math.round((score / test.questions.length) * 100);

    const result: TestResult = {
      testId,
      score,
      totalQuestions: test.questions.length,
      percentage,
      answers,
      completedAt: new Date().toISOString(),
    };

    saveTestResult(result);
    router.push(
      `/tests/results/${testId}?score=${score}&total=${test.questions.length}&percentage=${percentage}`
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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
    );
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

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
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-16 bg-muted p-2 border-r">
          <div className="flex flex-col gap-2">
            {test.questions.map((_, idx) => {
              const isCurrent = currentQuestion === idx;
              const isAnswered = answeredQuestions.includes(idx);
              let buttonClass = "";

              if (isCurrent && isAnswered) buttonClass = "bg-blue-600 text-white hover:bg-blue-700";
              else if (isCurrent) buttonClass = "bg-blue-500 text-white hover:bg-blue-600";
              else if (isAnswered) buttonClass = "bg-green-500 text-white hover:bg-green-600";
              else buttonClass = "bg-gray-300 text-black hover:bg-gray-400";

              return (
                <button
                  key={idx}
                  onClick={() => goToQuestion(idx)}
                  className={`rounded-full h-10 w-10 font-bold ${buttonClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6">
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
                <span className="text-sm text-muted-foreground">
                  {answeredQuestions.length} answered
                </span>
              </div>
              <Progress value={progress} />
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{test.questions[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswerSelect}>
                  {test.questions[currentQuestion].options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={option} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button onClick={() => navigateQuestion("prev")} disabled={currentQuestion === 0}>
                Previous
              </Button>
              <Button onClick={() => navigateQuestion("next")} disabled={currentQuestion === test.questions.length - 1}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit the test? You won’t be able to change your answers after submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submitTest}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isTimeUpDialogOpen} onOpenChange={setIsTimeUpDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Time's Up!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your time for this test has ended. Submitting your answers automatically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={submitTest}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
