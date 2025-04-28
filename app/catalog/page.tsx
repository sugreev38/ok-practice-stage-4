"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, BookOpen, Shield, FileText, PenToolIcon as Tool, Landmark, ArrowRight } from "lucide-react"
import { useStore } from "@/lib/store"

export default function CatalogPage() {
  const { user } = useStore()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6 text-purple-600" />
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">TestHub</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
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
      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Test Catalog
            </h1>
            <p className="text-gray-600">Browse our comprehensive collection of test categories</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* State Exams */}
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  State Government Exams
                </CardTitle>
                <CardDescription>Prepare for various state government recruitment exams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    <span>Haryana Government Exams</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    <span>Rajasthan Government Exams</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    <span>UP Government Exams</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    <span>Delhi Government Exams</span>
                  </li>
                </ul>
                <div className="mt-4">
                  {user ? (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/tests?category=haryana">
                        View Tests <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/login">
                        Login to View <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Central Exams */}
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Landmark className="h-5 w-5 mr-2 text-purple-600" />
                  Central Government Exams
                </CardTitle>
                <CardDescription>Prepare for prestigious central government recruitment exams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    <span>SSC (Staff Selection Commission)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    <span>Banking Exams (IBPS, SBI)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    <span>Railway Recruitment Board (RRB)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    <span>Defense Exams (NDA, CDS, AFCAT)</span>
                  </li>
                </ul>
                <div className="mt-4">
                  {user ? (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/tests?category=central">
                        View Tests <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/login">
                        Login to View <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Teaching Exams */}
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                  Teaching Exams
                </CardTitle>
                <CardDescription>Prepare for various teaching and educational recruitment exams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    <span>CTET (Central Teacher Eligibility Test)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    <span>State TET Exams (UPTET, HTET, RTET)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    <span>PGT/TGT/PRT Recruitment</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    <span>KVS/NVS Recruitment</span>
                  </li>
                </ul>
                <div className="mt-4">
                  {user ? (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/tests?category=teaching">
                        View Tests <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/login">
                        Login to View <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Police Exams */}
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-red-600" />
                  Police & Defense Exams
                </CardTitle>
                <CardDescription>Prepare for police and defense recruitment exams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    <span>State Police Constable Exams</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    <span>Sub-Inspector (SI) Recruitment</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    <span>Paramilitary Forces (CAPF, CRPF, BSF)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    <span>Military Police Recruitment</span>
                  </li>
                </ul>
                <div className="mt-4">
                  {user ? (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/tests?category=police">
                        View Tests <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/login">
                        Login to View <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Clerical Exams */}
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-orange-600" />
                  Clerical & Administrative Exams
                </CardTitle>
                <CardDescription>Prepare for clerical and administrative position exams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    <span>Clerk & LDC/UDC Exams</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    <span>Stenographer Recruitment</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    <span>Gram Panchayat/Sachiv Exams</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    <span>Patwari & Revenue Exams</span>
                  </li>
                </ul>
                <div className="mt-4">
                  {user ? (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/tests?category=clerical">
                        View Tests <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/login">
                        Login to View <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Technical Exams */}
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tool className="h-5 w-5 mr-2 text-cyan-600" />
                  Technical & Engineering Exams
                </CardTitle>
                <CardDescription>Prepare for technical and engineering position exams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-600 rounded-full mr-2"></span>
                    <span>Junior Engineer (JE) Exams</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-600 rounded-full mr-2"></span>
                    <span>Assistant Engineer Recruitment</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-600 rounded-full mr-2"></span>
                    <span>Technical Assistant Exams</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-600 rounded-full mr-2"></span>
                    <span>Draftsman & Surveyor Exams</span>
                  </li>
                </ul>
                <div className="mt-4">
                  {user ? (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/tests?category=technical">
                        View Tests <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full rounded-full">
                      <Link href="/login">
                        Login to View <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Preparing?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of successful candidates who have achieved their goals with TestHub.
            </p>
            {user ? (
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                <Link href="/tests">
                  Explore All Tests <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                <Link href="/register">
                  Register Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
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
