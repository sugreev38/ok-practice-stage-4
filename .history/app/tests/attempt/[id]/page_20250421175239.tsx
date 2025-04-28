// "use client"
// import { useState, useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import { Package, Clock, AlertCircle, Flag, CheckCircle, HelpCircle } from "lucide-react"
// import { Progress } from "@/components/ui/progress"
// import { useToast } from "@/components/ui/use-toast"

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { saveTestResult } from "@/app/actions/tests"
// import { testCatalog } from "@/lib/test-catalog"
// import { Badge } from "@/components/ui/badge"

// export default function AttemptTestPage({ params }: { params: { id: string } }) {
//   const router = useRouter()
//   const { toast } = useToast()
//   const timerRef = useRef<NodeJS.Timeout | null>(null)

//   const testId = Number.parseInt(params.id)

//   // Find the test in the catalog
//   const test = testCatalog.all.find((t) => t.id === testId)

//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [answers, setAnswers] = useState<string[]>([])
//   const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>([])
//   const [timeLeft, setTimeLeft] = useState(0) // in seconds
//   const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
//   const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false)
//   const [isPageLoading, setIsPageLoading] = useState(true)
//   const [startTime, setStartTime] = useState<Date | null>(null)
//   const [purchasedTests, setPurchasedTests] = useState<any[]>([])
//   const [isTestPurchased, setIsTestPurchased] = useState(false)
//   const [user, setUser] = useState<any>(null)

//   // Check authentication
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = localStorage.getItem("auth_token")
//         if (!token) {
//           router.push(`/login?callbackUrl=/tests/attempt/${testId}`)
//           return
//         }

//         // Decode token to get user info
//         const response = await fetch("/api/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         if (!response.ok) {
//           throw new Error("Failed to authenticate")
//         }

//         const data = await response.json()
//         if (data.success) {
//           setUser(data.user)
//         } else {
//           router.push(`/login?callbackUrl=/tests/attempt/${testId}`)
//         }
//       } catch (error) {
//         console.error("Authentication error:", error)
//         router.push(`/login?callbackUrl=/tests/attempt/${testId}`)
//       }
//     }

//     checkAuth()
//   }, [router, testId])

//   // Fetch purchased tests


// // ... other imports remain the same ...

// export default function AttemptTestPage({ params }: { params: { id: string } }) {
//   // ... existing state declarations ...

//   // Consolidated initialization effect
//   useEffect(() => {
//     const initializeTest = async () => {
//       setIsPageLoading(true);
//       try {
//         const token = localStorage.getItem("auth_token");
//         if (!token) {
//           router.push(`/login?callbackUrl=/tests/attempt/${testId}`);
//           return;
//         }

//         // Fetch user data
//         const userResponse = await fetch("/api/me", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (!userResponse.ok) throw new Error("Authentication failed");
//         const userData = await userResponse.json();
//         if (!userData?.user) throw new Error("Authentication failed");
//         setUser(userData.user);

//         // Check test existence
//         if (!test) {
//           toast({
//             title: "Test not found",
//             description: "The requested test could not be found.",
//             variant: "destructive",
//           });
//           router.push("/dashboard/purchased-tests");
//           return;
//         }

//         // Check purchased tests
//         const purchasedResponse = await fetch("/api/purchased-tests", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (!purchasedResponse.ok) throw new Error("Failed to fetch purchased tests");
//         const purchasedData = await purchasedResponse.json();
        
//         const isPurchased = purchasedData.purchasedTests.some((t: any) => t.id === testId);
//         if (!isPurchased) {
//           toast({
//             title: "Test not purchased",
//             description: "You need to purchase this test before attempting it.",
//             variant: "destructive",
//           });
//           router.push("/tests");
//           return;
//         }

//         // Initialize test state
//         setAnswers(Array(test.questions.length).fill(""));
//         setFlaggedQuestions(Array(test.questions.length).fill(false));
//         setTimeLeft((test.duration || 10) * 60);
//         setStartTime(new Date());

//         // Load existing results
//         const resultResponse = await fetch(`/api/test-result/${testId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (resultResponse.ok) {
//           const resultData = await resultResponse.json();
//           if (resultData.result) setAnswers(resultData.result.answers);
//         }

//       } catch (error) {
//         console.error("Initialization error:", error);
//         toast({
//           title: "Error",
//           description: "Failed to initialize test session",
//           variant: "destructive",
//         });
//         router.push("/dashboard");
//       } finally {
//         setIsPageLoading(false);
//       }
//     };

//     initializeTest();
//   }, [router, testId]); // Removed unnecessary dependencies

//   // Simplified timer effect
//   useEffect(() => {
//     if (isPageLoading || timeLeft <= 0) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prev => Math.max(0, prev - 1));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [isPageLoading, timeLeft]);

//   // ... rest of the component remains the same ...
// }
//   useEffect(() => {
//     const fetchPurchasedTests = async () => {
//       try {
//         const token = localStorage.getItem("auth_token")
//         if (!token) return

//         const response = await fetch("/api/purchased-tests", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         if (!response.ok) {
//           throw new Error("Failed to fetch purchased tests")
//         }

//         const data = await response.json()
//         if (data.success) {
//           setPurchasedTests(data.purchasedTests)
//           const isPurchased = data.purchasedTests.some((test: any) => test.id === testId)
//           setIsTestPurchased(isPurchased)

//           if (!isPurchased) {
//             toast({
//               title: "Test not purchased",
//               description: "You need to purchase this test before attempting it.",
//               variant: "destructive",
//             })
//             router.push("/tests")
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching purchased tests:", error)
//         toast({
//           title: "Error",
//           description: "Failed to verify test access",
//           variant: "destructive",
//         })
//       }
//     }

//     if (user) {
//       fetchPurchasedTests()
//     }
//   }, [user, router, testId, toast])

//   // Initialize answers and flagged questions arrays
//   useEffect(() => {
//     if (test && answers.length === 0) {
//       setAnswers(Array(test.questions.length).fill(""))
//       setFlaggedQuestions(Array(test.questions.length).fill(false))
//       // Make sure we're setting a reasonable time limit (at least 10 minutes if duration is missing)
//       setTimeLeft((test.duration || 10) * 60)
//     }
//   }, [test, answers.length])

//   // Check if test exists
//   useEffect(() => {
//     if (!test && !isPageLoading) {
//       toast({
//         title: "Test not found",
//         description: "The requested test could not be found.",
//         variant: "destructive",
//       })
//       router.push("/dashboard/purchased-tests")
//     }

//     // Simulate loading state
//     const timer = setTimeout(() => {
//       setIsPageLoading(false)
//       setStartTime(new Date())
//     }, 500)

//     return () => clearTimeout(timer)
//   }, [test, router, isPageLoading, toast])

//   // Update test status to In Progress when starting
//   useEffect(() => {
//     const updateTestStatus = async () => {
//       if (isTestPurchased && test) {
//         try {
//           const token = localStorage.getItem("auth_token")
//           if (!token) return

//           await fetch("/api/update-test-status", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               testId,
//               status: "In Progress",
//               completed: false,
//             }),
//           })
//         } catch (error) {
//           console.error("Error updating test status:", error)
//         }
//       }
//     }

//     if (isTestPurchased && !isPageLoading) {
//       updateTestStatus()
//     }
//   }, [isTestPurchased, testId, test, isPageLoading])

//   // Check for existing test result
//   useEffect(() => {
//     const fetchTestResult = async () => {
//       try {
//         const token = localStorage.getItem("auth_token")
//         if (!token) return

//         const response = await fetch(`/api/test-result/${testId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         if (response.ok) {
//           const data = await response.json()
//           if (data.success && data.result) {
//             setAnswers(data.result.answers)
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching test result:", error)
//       }
//     }

//     if (isTestPurchased && !isPageLoading) {
//       fetchTestResult()
//     }
//   }, [isTestPurchased, testId, isPageLoading])

//   // Format time as MM:SS
//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60)
//     const remainingSeconds = seconds % 60
//     return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
//   }

//   // Timer effect
//   useEffect(() => {
//     // Only start the timer when the test is loaded and not in loading state
//     if (isPageLoading || timeLeft <= 0) {
//       return
//     }

//     timerRef.current = setInterval(() => {
//       setTimeLeft((prev) => prev - 1)
//     }, 1000)

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current)
//     }
//   }, [timeLeft, isPageLoading])

//   // Add a separate effect to handle time up
//   useEffect(() => {
//     if (!isPageLoading && timeLeft === 0) {
//       // Clear any existing timer
//       if (timerRef.current) {
//         clearInterval(timerRef.current)
//         timerRef.current = null
//       }
//       setIsTimeUpDialogOpen(true)
//     }
//   }, [timeLeft, isPageLoading])

//   // Handle answer selection
//   const handleAnswerSelect = (value: string) => {
//     const newAnswers = [...answers]
//     newAnswers[currentQuestion] = value
//     setAnswers(newAnswers)
//   }

//   // Toggle flagged status for current question
//   const toggleFlagged = () => {
//     const newFlagged = [...flaggedQuestions]
//     newFlagged[currentQuestion] = !newFlagged[currentQuestion]
//     setFlaggedQuestions(newFlagged)
//   }

//   // Navigate to next question
//   const nextQuestion = () => {
//     if (test && currentQuestion < test.questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1)
//     }
//   }

//   // Navigate to previous question
//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1)
//     }
//   }

//   // Calculate test statistics
//   const getTestStats = () => {
//     const answered = answers.filter((a) => a !== "").length
//     const flagged = flaggedQuestions.filter((f) => f).length
//     const unanswered = answers.length - answered

//     return { answered, flagged, unanswered }
//   }

//   // Submit test
//   const submitTest = async () => {
//     if (!test || !user) return

//     // Calculate score
//     let score = 0
//     const questionDetails = []

//     answers.forEach((answer, index) => {
//       if (index !== null && index !== undefined && test.questions[index]) {
//         const question = test.questions[index]
//         const isCorrect = answer === question.correctAnswer

//         if (isCorrect) {
//           score++
//         }

//         questionDetails.push({
//           id: question.id,
//           question: question.question,
//           userAnswer: answer,
//           correctAnswer: question.correctAnswer,
//           isCorrect,
//           topic: question.topic,
//           type: question.type,
//           difficulty: question.difficulty,
//         })
//       }
//     })

//     const percentage = Math.round((score / test.questions.length) * 100)
//     const endTime = new Date()
//     const timeTaken = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0

//     // Save test result
//     try {
//       const result = await saveTestResult({
//         testId,
//         score,
//         totalQuestions: test.questions.length,
//         percentage,
//         answers,
//         questionDetails,
//         timeTaken,
//       })

//       if (result.success) {
//         // Navigate to results page with score
//         router.push(`/tests/results/${testId}`)
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to save test result. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error saving test result:", error)
//       toast({
//         title: "Error",
//         description: "Failed to save test result. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   // Loading state
//   if (isPageLoading || !test) {
//     return (
//       <div className="flex min-h-screen flex-col">
//         <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
//           <Link href="/" className="flex items-center gap-2 font-semibold">
//             <Package className="h-6 w-6" />
//             <span>TestHub</span>
//           </Link>
//         </header>
//         <main className="flex-1 p-4 md:p-6">
//           <div className="mx-auto max-w-4xl">
//             <div className="h-8 w-48 animate-pulse rounded-md bg-muted mb-6"></div>
//             <div className="h-4 w-64 animate-pulse rounded-md bg-muted mb-6"></div>

//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="h-4 w-32 animate-pulse rounded-md bg-muted"></div>
//                 <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
//               </div>
//               <div className="h-2 w-full animate-pulse rounded-full bg-muted"></div>
//             </div>

//             <Card className="mb-6">
//               <CardHeader>
//                 <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
//                 <div className="h-4 w-full animate-pulse rounded-md bg-muted"></div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div key={i} className="flex items-center space-x-2">
//                       <div className="h-4 w-4 animate-pulse rounded-full bg-muted"></div>
//                       <div className="h-4 w-full animate-pulse rounded-md bg-muted"></div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   const progress = ((currentQuestion + 1) / test.questions.length) * 100
//   const { answered, flagged, unanswered } = getTestStats()

//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
//         <Link href="/" className="flex items-center gap-2 font-semibold">
//           <Package className="h-6 w-6" />
//           <span>TestHub</span>
//         </Link>
//         <div className="ml-auto flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <Clock className="h-4 w-4" />
//             <span className="font-medium">{formatTime(timeLeft)}</span>
//           </div>
//           <Button variant="destructive" size="sm" onClick={() => setIsSubmitDialogOpen(true)}>
//             Submit Test
//           </Button>
//         </div>
//       </header>
//       <main className="flex-1 p-4 md:p-6">
//         <div className="mx-auto max-w-4xl">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold">{test.title}</h1>
//             <p className="text-muted-foreground">{test.description}</p>
//           </div>

//           <div className="mb-6">
//             <div className="flex items-center justify-between mb-2">
//               <span>
//                 Question {currentQuestion + 1} of {test.questions.length}
//               </span>
//               <span>{Math.round(progress)}% Complete</span>
//             </div>
//             <Progress value={progress} className="h-2" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//             <div className="md:col-span-3">
//               <Card className="mb-6">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <div>
//                     <CardTitle>Question {currentQuestion + 1}</CardTitle>
//                     <CardDescription className="mt-1">
//                       <Badge variant="outline" className="mr-2">
//                         {test.questions[currentQuestion].type}
//                       </Badge>
//                       <Badge variant="outline" className="mr-2">
//                         {test.questions[currentQuestion].topic}
//                       </Badge>
//                       <Badge variant="outline">{test.questions[currentQuestion].difficulty}</Badge>
//                     </CardDescription>
//                   </div>
//                   <Button
//                     variant={flaggedQuestions[currentQuestion] ? "destructive" : "outline"}
//                     size="sm"
//                     onClick={toggleFlagged}
//                   >
//                     <Flag className="h-4 w-4 mr-1" />
//                     {flaggedQuestions[currentQuestion] ? "Flagged" : "Flag"}
//                   </Button>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-lg font-medium mb-4">{test.questions[currentQuestion].question}</div>
//                   <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswerSelect}>
//                     {test.questions[currentQuestion].options.map((option, index) => (
//                       <div key={index} className="flex items-center space-x-2 mb-4 p-2 rounded-md hover:bg-muted">
//                         <RadioGroupItem value={option} id={`option-${index}`} />
//                         <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer py-2">
//                           {option}
//                         </Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </CardContent>
//               </Card>

//               <div className="flex justify-between">
//                 <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
//                   Previous
//                 </Button>

//                 {currentQuestion < test.questions.length - 1 ? (
//                   <Button onClick={nextQuestion}>Next</Button>
//                 ) : (
//                   <Button variant="default" onClick={() => setIsSubmitDialogOpen(true)}>
//                     Finish Test
//                   </Button>
//                 )}
//               </div>
//             </div>

//             <div>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Test Progress</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-sm">Answered</span>
//                         <span className="text-sm font-medium">
//                           {answered}/{test.questions.length}
//                         </span>
//                       </div>
//                       <Progress value={(answered / test.questions.length) * 100} className="h-2 bg-muted" />
//                     </div>
//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-sm">Flagged</span>
//                         <span className="text-sm font-medium">
//                           {flagged}/{test.questions.length}
//                         </span>
//                       </div>
//                       <Progress value={(flagged / test.questions.length) * 100} className="h-2 bg-muted" />
//                     </div>
//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-sm">Unanswered</span>
//                         <span className="text-sm font-medium">
//                           {unanswered}/{test.questions.length}
//                         </span>
//                       </div>
//                       <Progress value={(unanswered / test.questions.length) * 100} className="h-2 bg-muted" />
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <h3 className="text-sm font-medium mb-2">Question Navigator</h3>
//                     <div className="grid grid-cols-5 gap-2">
//                       {test.questions.map((_, index) => {
//                         let buttonVariant = "ghost"
//                         let icon = null

//                         if (currentQuestion === index) {
//                           buttonVariant = "default"
//                         } else if (flaggedQuestions[index]) {
//                           buttonVariant = "destructive"
//                           icon =  {
//                           buttonVariant = "destructive"
//                           icon = <Flag className="h-3 w-3" />
//                         } else if (answers[index]) {
//                           buttonVariant = "outline"
//                           icon = <CheckCircle className="h-3 w-3 text-green-500" />
//                         } else {
//                           icon = <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        
//                         }
//                       }
//                         return (
//                           <Button
//                             key={index}
//                             variant={buttonVariant as any}
//                             className="h-10 w-10 p-0 flex items-center justify-center"
//                             onClick={() => setCurrentQuestion(index)}
//                           >
//                             {icon ? icon : index + 1}
//                           </Button>
//                         )
//                       })}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Submit Test Dialog */}
//       <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Submit Test?</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to submit your test? You won't be able to change your answers after submission.
//               {unanswered > 0 && (
//                 <div className="mt-2 flex items-center gap-2 text-amber-500">
//                   <AlertCircle className="h-4 w-4" />
//                   <span>You have {unanswered} unanswered questions.</span>
//                 </div>
//               )}
//               {flagged > 0 && (
//                 <div className="mt-2 flex items-center gap-2 text-amber-500">
//                   <Flag className="h-4 w-4" />
//                   <span>You have {flagged} flagged questions.</span>
//                 </div>
//               )}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={submitTest}>Submit</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Time Up Dialog */}
//       <AlertDialog
//         open={isTimeUpDialogOpen}
//         onOpenChange={(open) => {
//           // Only allow closing the dialog by clicking the View Results button
//           if (!open) {
//             submitTest()
//           }
//           setIsTimeUpDialogOpen(open)
//         }}
//       >
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Time's Up!</AlertDialogTitle>
//             <AlertDialogDescription>
//               Your time for this test has ended. Your answers will be submitted when you click "View Results".
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogAction onClick={submitTest}>View Results</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }
"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
// ... other imports remain the same ...

export default function AttemptTestPage({ params }: { params: { id: string } }) {
  // ... existing state declarations ...

  // Consolidated initialization effect
  useEffect(() => {
    const initializeTest = async () => {
      setIsPageLoading(true);
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push(`/login?callbackUrl=/tests/attempt/${testId}`);
          return;
        }

        // Fetch user data
        const userResponse = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!userResponse.ok) throw new Error("Authentication failed");
        const userData = await userResponse.json();
        if (!userData?.user) throw new Error("Authentication failed");
        setUser(userData.user);

        // Check test existence
        if (!test) {
          toast({
            title: "Test not found",
            description: "The requested test could not be found.",
            variant: "destructive",
          });
          router.push("/dashboard/purchased-tests");
          return;
        }

        // Check purchased tests
        const purchasedResponse = await fetch("/api/purchased-tests", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!purchasedResponse.ok) throw new Error("Failed to fetch purchased tests");
        const purchasedData = await purchasedResponse.json();
        
        const isPurchased = purchasedData.purchasedTests.some((t: any) => t.id === testId);
        if (!isPurchased) {
          toast({
            title: "Test not purchased",
            description: "You need to purchase this test before attempting it.",
            variant: "destructive",
          });
          router.push("/tests");
          return;
        }

        // Initialize test state
        setAnswers(Array(test.questions.length).fill(""));
        setFlaggedQuestions(Array(test.questions.length).fill(false));
        setTimeLeft((test.duration || 10) * 60);
        setStartTime(new Date());

        // Load existing results
        const resultResponse = await fetch(`/api/test-result/${testId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resultResponse.ok) {
          const resultData = await resultResponse.json();
          if (resultData.result) setAnswers(resultData.result.answers);
        }

      } catch (error) {
        console.error("Initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to initialize test session",
          variant: "destructive",
        });
        router.push("/dashboard");
      } finally {
        setIsPageLoading(false);
      }
    };

    initializeTest();
  }, [router, testId]);

  // Fixed question navigator rendering
  const renderQuestionButtons = () => {
    return test.questions.map((_, index) => {
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
        >
          {icon || index + 1}
        </Button>
      );
    });
  };

  // ... rest of the component remains the same with the fixed renderQuestionButtons usage ...
}