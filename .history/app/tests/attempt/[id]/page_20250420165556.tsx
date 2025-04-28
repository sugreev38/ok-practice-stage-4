"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Package, Clock, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize test data
  useEffect(() => {
    if (test) {
      setAnswers(Array(test.questions.length).fill(""));
      setTimeLeft(test.duration * 60);
    }
  }, [test]);

  // Check if test exists in purchased tests
  useEffect(() => {
    if (!purchasedTest && !isLoading) {
      toast({
        title: "Test not found",
        description: "This test is not in your purchased tests.",
        variant: "destructive",
      });
      router.push("/dashboard/purchased-tests");
    }

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [purchasedTest, router, isLoading]);

  // Update test status to In Progress when starting
  useEffect(() => {
    if (purchasedTest && purchasedTest.status === "Not Started") {
      updateTestStatus(testId, "In Progress", false);
    }
  }, [purchasedTest, testId, updateTestStatus]);

  // Check for existing test result
  useEffect(() => {
    const result = getTestResult(testId);
    if (result) {
      setAnswers(result.answers);
    }
  }, [testId, getTestResult]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUpDialogOpen(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Submit test
  const submitTest = () => {
    // Calculate score
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === test.questions[index].correctAnswer) {
        score++;
      }
    });

    const percentage = Math.round((score / test.questions.length) * 100);

    // Save test result
    const result: TestResult = {
      testId,
      score,
      totalQuestions: test.questions.length,
      percentage,
      answers,
      completedAt: new Date().toISOString(),
    };

    saveTestResult(result);

    // Navigate to results page with score
    router.push(`/tests/results/${testId}?score=${score}&total=${test.questions.length}&percentage=${percentage}`);
  };

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
                 
::contentReference[oaicite:0]{index=0}
 
