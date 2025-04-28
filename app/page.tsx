"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, BookOpen, Shield, Award, Users, ArrowRight } from "lucide-react"
import { useStore } from "@/lib/store"

export default function HomePage() {
  const { user } = useStore()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6 text-purple-600" />
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">TestHub</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/catalog">
            <Button variant="ghost" size="sm">
              Catalog
            </Button>
          </Link>
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href="/tests">
                <Button variant="ghost" size="sm">
                  Tests
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" size="sm" className="rounded-full">
                  Cart
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="sm" className="rounded-full">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Prepare for Success with TestHub
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The ultimate platform for government exam preparation. Practice tests, mock exams, and comprehensive study
              materials.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link href="/catalog">
                <Button size="lg" variant="outline" className="rounded-full">
                  Browse Catalog
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose TestHub?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Tests</h3>
                <p className="text-gray-600">
                  Access thousands of practice questions across all major government exams.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exam Simulations</h3>
                <p className="text-gray-600">Experience real exam conditions with our timed test simulations.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
                <p className="text-gray-600">Track your progress with detailed performance reports and insights.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Rahul Sharma</h4>
                    <p className="text-sm text-gray-500">Selected for SSC CGL</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "TestHub's practice tests were instrumental in my success. The questions were very similar to the
                  actual exam."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Priya Patel</h4>
                    <p className="text-sm text-gray-500">Selected for Bank PO</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The detailed analytics helped me identify my weak areas. I could focus my preparation and improve
                  significantly."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Amit Kumar</h4>
                    <p className="text-sm text-gray-500">Selected for Railway NTPC</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The exam simulation experience was so realistic. It helped me manage my time better during the actual
                  exam."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Preparation?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of successful candidates who have achieved their goals with TestHub.
            </p>
            {user ? (
              <Link href="/tests">
                <Button size="lg" variant="secondary" className="rounded-full">
                  Explore Tests <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" variant="secondary" className="rounded-full">
                  Register Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Package className="h-6 w-6 text-purple-400 mr-2" />
              <span className="font-bold text-white">TestHub</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <a href="#" className="text-sm hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="text-sm hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="text-sm hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm hover:text-white transition-colors">
                Privacy
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm">
            © 2024 TestHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
