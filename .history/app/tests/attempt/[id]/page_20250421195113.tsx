"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Package, Clock, AlertCircle, Flag, CheckCircle, HelpCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
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
import { saveTestResult } from "@/app/actions/tests";
import { testCatalog } from "@/lib/test-catalog";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-provider";
import { verifyToken } from "@/lib/auth";

// Define TypeScript interfaces
interface User {
  id: string;
  email: string;
  name?: string;
}

interface PurchasedTest {
  id: number;
  title: string;
  purchasedAt: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
  type: string;
  difficulty: string;
}

interface Test {
  id: number;
  title: string;
  description: string;
  duration?: number;
  questions: Question[];
}

interface TestResult {
  answers: string[];
}

interface SaveTestResultInput {
  testId: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: string[];
  questionDetails: {
    id: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    topic: string;
    type: string;
    difficulty: string;
  }[];
  timeTaken: number;
}

interface SaveTestResultResponse {
  success: boolean;
  error?: string;
}

interface AttemptTestPageProps {
  params: { id: string };
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">Loading test...</p>
      </div>
    </div>
  );
}

export default function AttemptTestPage({ params }: AttemptTestPageProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Test-related state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [purchasedTests, setPurchasedTests] = useState<PurchasedTest[]>([]);
  const [isTestPurchased, setIsTestPurchased] = useState(false);

  // Validate params.id
  const testId = Number.parseInt(params.id);
  if (isNaN(testId)) {
    toast({
      title: "Invalid Test ID",
      description: "The test ID must be a valid number.",
      variant: "destructive",
    });
    router.push("/dashboard/purchased-tests?error=invalid-id");
    return null;
  }

  const test = testCatalog.all.find((t) => t.id === testId);

  // Authentication and purchased tests fetching
  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  //     router.push(`/login?callbackUrl=/tests/attempt/${testId}`);
  //     return;
  //   }

  //   if (isAuthenticated && user) {
  //     const fetchPurchasedTests = async () => {
  //       try {
  //         setIsPageLoading(true);
  //         const token = localStorage.getItem("auth_token");
  //         if (!token) {
  //           throw new Error("No auth token found");
  //         }

  //         const verifiedUser = verifyToken(token);
  //         if (!verifiedUser) {
  //           throw new Error("Invalid or expired token");
  //         }

  //         const response = await fetch("/api/purchased-tests", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         if (!response.ok) {
  //           let errorMessage = `Failed to fetch purchased tests: HTTP ${response.status}`;
  //           try {
  //             const errorData = await response.json();
  //             errorMessage = errorData.error || errorMessage;
  //           } catch {
  //             console.error("Non-JSON response:", await response.text());
  //           }

  //           if (response.status === 401) {
  //             throw new Error("Unauthorized: Invalid or expired token");
  //           } else if (response.status === 403) {
  //             throw new Error("Forbidden: Insufficient permissions");
  //           } else if (response.status === 404) {
  //             throw new Error("Purchased tests endpoint not found");
  //           }
  //           throw new Error(errorMessage);
  //         }

  //         const data = await response.json();
  //         if (data.success) {
  //           setPurchasedTests(data.purchasedTests);
  //           const isPurchased = data.purchasedTests.some((test: PurchasedTest) => test.id === testId);
  //           setIsTestPurchased(isPurchased);

  //           if (!isPurchased) {
  //             toast({
  //               title: "Test not purchased",
  //               description: "You need to purchase this test before attempting it.",
  //               variant: "destructive",
  //             });
  //             router.push("/tests?error=not-purchased");
  //           }
  //         } else {
  //           throw new Error(data.error || "Failed to fetch purchased tests");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching purchased tests:", error);
  //         toast({
  //           variant: "destructive",
  //           title: "Error",
  //           description: error instanceof Error ? error.message : "Failed to verify test access",
  //         });
  //         if (error.message.includes("token")) {
  //           localStorage.removeItem("auth_token");
  //           router.push(`/login?callbackUrl=/tests/attempt/${testId}`);
  //         } else {
  //           router.push("/tests?error=api-failure");
  //         }
  //       } finally {
  //         setIsPageLoading(false);
  //       }
  //     };

  //     fetchPurchasedTests();
  //   }
  // }, [isAuthenticated, loading, user, testId, router, toast]);

  // Initialize answers and flagged questions



  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!loading && !isAuthenticated) {
      router.push("/login?callbackUrl=/tests/attempt/${testId}")
      return
    }

    // If authenticated, fetch dashboard stats
    if (isAuthenticated && user) {
      const fetchStats = async () => {
        try {
          setIsLoadingStats(true)
          const token = localStorage.getItem("auth_token")

          if (!token) {
            throw new Error("No auth token found")
          }

          const response = await fetch("/tests/attempt/${testId}/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) {
            throw new Error("Failed to fetch dashboard stats")
          }

          const data = await response.json()
          setStats(data)
        } catch (error) {
          console.error("Error fetching dashboard stats:", error)
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load dashboard statistics",
          })
        } finally {
          setIsLoadingStats(false)
        }
      }

      fetchStats()
    }
  }, [isAuthenticated, loading, user, router, toast])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading ...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, this will redirect (see useEffect)
  if (!isAuthenticated || !user) {
    return null
  }







  useEffect(() => {
    if (test && answers.length === 0 && isTestPurchased) {
      if (test.questions.length === 0) {
        toast({
          title: "Invalid Test",
          description: "This test has no questions.",
          variant: "destructive",
        });
        router.push("/dashboard/purchased-tests?error=invalid-test");
        return;
      }
      setAnswers(Array(test.questions.length).fill(""));
      setFlaggedQuestions(Array(test.questions.length).fill(false));
      setTimeLeft(Math.max(test.duration || 10, 1) * 60);
      setStartTime(new Date());
    }
  }, [test, answers.length, isTestPurchased, router, toast]);

  // Check if test exists
  useEffect(() => {
    if (!test && !isPageLoading && !loading) {
      toast({
        title: "Test not found",
        description: "The requested test could not be found.",
        variant: "destructive",
      });
      router.push("/dashboard/purchased-tests?error=test-not-found");
    }
  }, [test, isPageLoading, loading, router, toast]);

  // Update test status to In Progress
  useEffect(() => {
    const updateTestStatus = async () => {
      if (isTestPurchased && test) {
        try {
          const token = localStorage.getItem("auth_token");
          if (!token) {
            throw new Error("No auth token found");
          }

          const verifiedUser = verifyToken(token);
          if (!verifiedUser) {
            throw new Error("Invalid or expired token");
          }

          const response = await fetch("/api/update-test-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              testId,
              status: "In Progress",
              completed: false,
            }),
          });

          if (!response.ok) {
            throw new Error(`Failed to update test status: HTTP ${response.status}`);
          }
        } catch (error) {
          console.error("Error updating test status:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to update test status",
          });
          if (error.message.includes("token")) {
            localStorage.removeItem("auth_token");
            router.push(`/login?callbackUrl=/tests/attempt/${testId}`);
          }
        }
      }
    };

    if (isTestPurchased && !isPageLoading) {
      updateTestStatus();
    }
  }, [isTestPurchased, testId, test, isPageLoading, toast, router]);

  // Check for existing test result
  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          throw new Error("No auth token found");
        }

        const verifiedUser = verifyToken(token);
        if (!verifiedUser) {
          throw new Error("Invalid or expired token");
        }

        const response = await fetch(`/api/test-result/${testId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          let errorMessage = `Failed to fetch test result: HTTP ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            console.error("Non-JSON response:", await response.text());
          }
          throw new Error(errorMessage);
        }

        const data: { success: boolean; result?: TestResult } = await response.json();
        if (data.success && data.result) {
          setAnswers(data.result.answers);
        }
      } catch (error) {
        console.error("Error fetching test result:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load previous test answers",
        });
        if (error.message.includes("token")) {
          localStorage.removeItem("auth_token");
          router.push(`/login?callbackUrl=/tests/attempt/${testId}`);
        }
      }
    };

    if (isTestPurchased && !isPageLoading && isAuthenticated) {
      fetchTestResult();
    }
  }, [isTestPurchased, testId, isPageLoading, isAuthenticated, toast, router]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    if (isPageLoading || timeLeft <= 0) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeLeft, isPageLoading]);

  // Handle time up
  useEffect(() => {
    if (!isPageLoading && timeLeft === 0 && !isTimeUpDialogOpen) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsTimeUpDialogOpen(true);
    }
  }, [timeLeft, isPageLoading, isTimeUpDialogOpen]);

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  // Toggle flagged status
  const toggleFlagged = () => {
    const newFlagged = [...flaggedQuestions];
    newFlagged[currentQuestion] = !newFlagged[currentQuestion];
    setFlaggedQuestions(newFlagged);
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (test && currentQuestion < test.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Calculate test statistics
  const getTestStats = useCallback(() => {
    const answered = answers.filter((a) => a !== "").length;
    const flagged = flaggedQuestions.filter((f) => f).length;
    const unanswered = answers.length - answered;

    return { answered, flagged, unanswered };
  }, [answers, flaggedQuestions]);

  // Submit test
  const submitTest = async () => {
    if (!test || !user || test.questions.length === 0) {
      toast({
        title: "Error",
        description: "Cannot submit test: Invalid test or user data",
        variant: "destructive",
      });
      return;
    }

    let score = 0;
    const questionDetails: SaveTestResultInput["questionDetails"] = [];

    answers.forEach((answer, index) => {
      if (test.questions[index]) {
        const question = test.questions[index];
        const isCorrect = answer === question.correctAnswer;

        if (isCorrect) {
          score++;
        }

        questionDetails.push({
          id: question.id,
          question: question.question,
          userAnswer: answer || "No answer provided",
          correctAnswer: question.correctAnswer,
          isCorrect,
          topic: question.topic,
          type: question.type,
          difficulty: question.difficulty,
        });
      }
    });

    const percentage = Math.round((score / test.questions.length) * 100);
    const endTime = new Date();
    const timeTaken = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0;

    try {
      const result: SaveTestResultResponse = await saveTestResult({
        testId,
        score,
        totalQuestions: test.questions.length,
        percentage,
        answers,
        questionDetails,
        timeTaken,
      });

      if (result.success) {
        router.push(`/tests/results/${testId}`);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save test result. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving test result:", error);
      toast({
        title: "Error",
        description: "Failed to save test result. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading || isPageLoading) {
    return <LoadingSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (!test || !isTestPurchased) {
    return null;
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const { answered, flagged, unanswered } = getTestStats();

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
                    aria-label={flaggedQuestions[currentQuestion] ? "Unflag question" : "Flag question"}
                  >
                    <Flag className="h-4 w-4 mr-1" />
                    {flaggedQuestions[currentQuestion] ? "Flagged" : "Flag"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-medium mb-4">{test.questions[currentQuestion].question}</div>
                  <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswerSelect}>
                    {test.questions[currentQuestion].options.map((option, index) => (
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
                        let buttonVariant: "ghost" | "default" | "destructive" | "outline" = "ghost";
                        let icon = null;

                        if (currentQuestion === index) {
                          buttonVariant = "default";
                        } else if (flaggedQuestions[index]) {
                          buttonVariant = "destructive";
                          icon = <Flag className="h-3 w-3" />;
                        } else if (answers[index]) {
                          buttonVariant = "outline";
                          icon = <CheckCircle className="h-3 w-3 text-green-500" />;
                        } else {
                          icon = <HelpCircle className="h-3 w-3 text-muted-foreground" />;
                        }

                        return (
                          <Button
                            key={index}
                            variant={buttonVariant}
                            className="h-10 w-10 p-0 flex items-center justify-center"
                            onClick={() => setCurrentQuestion(index)}
                            aria-label={`Go to question ${index + 1}`}
                            aria-current={currentQuestion === index ? "true" : undefined}
                          >
                            {icon || index + 1}
                          </Button>
                        );
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
      <AlertDialog
        open={isTimeUpDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            submitTest();
          }
          setIsTimeUpDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your time for this test has ended. Your answers will be submitted when you click "View Results".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={submitTest}>View Results</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function setIsLoadingStats(arg0: boolean) {
  throw new Error("Function not implemented.");
}
