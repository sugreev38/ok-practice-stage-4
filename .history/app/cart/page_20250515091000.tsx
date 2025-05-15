//app/api/cart/page.tsx
//app/api/cart/layout.tsx
//app/api/cart/actions.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { useStore, type Test } from "@/lib/store"
import { createRazorpayOrder } from "./actions"
import { testCatalog } from "@/lib/test-catalog"

// Define Razorpay types
declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CartPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { cartItems, removeFromCart, clearCart, addPurchasedTest } = useStore()
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  useEffect(() => {
    // Check if Razorpay is loaded
    if (window.Razorpay) {
      setRazorpayLoaded(true)
    }
  }, [])

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      // Create an order using the server action
      const result = await createRazorpayOrder(total)

      if (!result.success) {
        throw new Error(result.error || "Failed to create order")
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: result.order!.amount, // Amount from the created order
        currency: "INR",
        name: "TestHub",
        description: "Purchase Tests",
        image: "/placeholder.svg?height=50&width=50",
        order_id: result.order!.id, // Order ID from the created order
        handler: (response: any) => {
          // Handle successful payment

          verifyPayment(response)
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "TestHub Headquarters",
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
            toast({
              title: "Payment cancelled",
              description: "You can try again when you're ready.",
              variant: "destructive",
            })
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Add this function to verify the payment
  const verifyPayment = async (response: any) => {
    try {
      // Make sure we have all required fields from Razorpay
      if (!response.razorpay_order_id || !response.razorpay_payment_id || !response.razorpay_signature) {
        throw new Error("Incomplete payment response from Razorpay")
      }

      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      })

      // Check if the response is ok before trying to parse JSON
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Server responded with ${res.status}: ${errorText}`)
      }

      const data = await res.json()

      if (data.success) {
        toast({
          title: "Payment successful!",
          description: "Your payment ID: " + response.razorpay_payment_id,
        })

        // Process cart items (both individual tests and packages)
        const purchasedTests: Test[] = []

        // Process each cart item
        for (const item of cartItems) {
          if (item.isPackage && item.testIds) {
            // For packages, get test details from testCatalog
            const packageTests = item.testIds
              .map((testId) => {
                // Find the test in the catalog
                const test = testCatalog.all.find((t) => t.id === testId)

                if (test) {
                  return {
                    id: test.id,
                    title: test.title,
                    description: test.description,
                    price: test.price,
                    duration: test.duration || 90, // Default duration if not specified
                    questions: test.questions ? test.questions.length : 50, // Default questions if not specified
                    status: "Not Started",
                    completed: false,
                    purchaseDate: new Date().toISOString(),
                  }
                }
                return null
              })
              .filter(Boolean) as Test[]

            purchasedTests.push(...packageTests)
          } else {
            // For individual tests
            const test = testCatalog.all.find((t) => t.id === item.id)
            if (test) {
              purchasedTests.push({
                id: test.id,
                title: test.title,
                description: test.description,
                price: test.price,
                duration: test.duration || 90, // Default duration if not specified
                questions: test.questions ? test.questions.length : 50, // Default questions if not specified
                status: "Not Started",
                completed: false,
                purchaseDate: new Date().toISOString(),
              })
            }
          }
        }

        // Add to purchased tests
        addPurchasedTest(purchasedTests)
        // Clear the cart
        clearCart()

        // Navigate to purchased tests
        router.push("/dashboard/purchased-tests")
      } else {
        throw new Error(data.error || "Payment verification failed")
      }
    } catch (error) {
      console.error("Verification error:", error)
      toast({
        title: "Verification error",
        description: "There was an error verifying your payment. Please contact support.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <div className="flex min-h-screen flex-col">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        strategy="lazyOnload"
      />
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>TestHub</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/tests">
            <Button variant="outline" size="sm">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>
          <p className="text-muted-foreground">Review your items before checkout</p>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <p className="font-medium">₹{item.price.toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-xl font-medium">Your cart is empty</h3>
                    <p className="text-center text-muted-foreground">
                      Looks like you haven't added any tests to your cart yet.
                    </p>
                    <Button asChild className="mt-4">
                      <Link href="/tests">Browse Tests</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Review your order details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax (10%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isLoading || cartItems.length === 0 || !razorpayLoaded}
                  >
                    {isLoading ? "Processing..." : "Pay with Razorpay"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
