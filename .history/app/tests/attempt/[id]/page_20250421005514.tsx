"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  const [isLoading, setIsLoading] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    setCurrentQuestion(0);
  }, [test, purchasedTest, testId, getTestResult, updateTestStatus, router]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (timeLeft <= 0 && !isSubmitted) {
      submitTest();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isSubmitted]);

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
    if (isSubmitted) return;
    setIsSubmitted(true);

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
      {/* All original JSX stays as is */}
    </div>
  );
}
