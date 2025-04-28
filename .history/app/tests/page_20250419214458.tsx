"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useCartStore, useTestStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"
import { testCatalog } from "@/lib/test-catalog"
import {
  Package,
  Search,
  ShoppingCart,
  Building,
  Shield,
  BookOpen,
  FileText,
  PenToolIcon as Tool,
  Landmark,
  Train,
  Award,
  Filter,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


// Define the test type to ensure proper typing
interface TestType {
  id: number
  title: string
  description: string
  price: number
  level: string
  duration: number
  questions: any[]
  subcategory?: string
  category?: string
  childCategory?: string
  rating?: number
  reviews?: number
  popularity?: number
  lastUpdated?: string
  questionCount?: number
}

export default function TestsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryParam = searchParams.get("category")
  const subcategoryParam = searchParams.get("subcategory")
  const childCategoryParam = searchParams.get("childCategory")
  const pageParam = searchParams.get("page")
  const sortParam = searchParams.get("sort") || "popular"
  const priceParam = searchParams.get("price") || "all"
  const levelParam = searchParams.get("level") || "all"

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryParam || "")
  const [selectedChildCategory, setSelectedChildCategory] = useState(childCategoryParam || "")
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({})
  const [currentPage, setCurrentPage] = useState(pageParam ? Number.parseInt(pageParam) : 1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState(sortParam)
  const [priceFilter, setPriceFilter] = useState(priceParam)
  const [levelFilter, setLevelFilter] = useState(levelParam)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const testsPerPage = 12

  // Use separate stores for cart and test functionality
  const { addToCart, cartItems = [] } = useCartStore()
  const { purchasedTests = [] } = useTestStore()

  // Initialize open subcategories based on URL params
  useEffect(() => {
    if (categoryParam) {
      // Open the category
      setOpenSubcategories((prev) => ({
        ...prev,
        [categoryParam]: true,
      }))

      if (subcategoryParam) {
        // Open the subcategory
        setOpenSubcategories((prev) => ({
          ...prev,
          [subcategoryParam]: true,
        }))
      }
    }
  }, [categoryParam, subcategoryParam])

  // Update URL when selections change
  useEffect(() => {
    let url = "/tests"
    const params = new URLSearchParams()

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory)

      if (selectedSubcategory) {
        params.set("subcategory", selectedSubcategory)

        if (selectedChildCategory) {
          params.set("childCategory", selectedChildCategory.toLowerCase().replace(/\s+/g, "-"))
        }
      }
    }

    if (currentPage > 1) {
      params.set("page", currentPage.toString())
    }

    if (sortBy !== "popular") {
      params.set("sort", sortBy)
    }

    if (priceFilter !== "all") {
      params.set("price", priceFilter)
    }

    if (levelFilter !== "all") {
      params.set("level", levelFilter)
    }

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    router.push(url, { scroll: false })
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedChildCategory,
    currentPage,
    sortBy,
    priceFilter,
    levelFilter,
    router,
  ])

  // Update active tab based on selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setActiveTab("all")
    } else if (selectedCategory === "haryana") {
      setActiveTab("haryana")
    } else if (selectedCategory === "rajasthan") {
      setActiveTab("rajasthan")
    } else if (selectedCategory === "up") {
      setActiveTab("up")
    } else if (selectedCategory === "central") {
      setActiveTab("central")
    }
  }, [selectedCategory])

  const handleAddToCart = (test: TestType) => {
    // Check if test is already purchased
    if (purchasedTests.some((pt) => pt.id === test.id)) {
      toast({
        title: "Already purchased",
        description: "You already own this test. Check your purchased tests.",
        variant: "destructive",
      })
      return
    }

    // Create a simplified version of the test for the cart
    const cartItem = {
      id: test.id,
      title: test.title,
      description: test.description,
      price: test.price,
      duration: test.duration,
      questions: test.questions.length, // Pass the length instead of the array
    }

    // Use the addToCart function from the cart store
    addToCart(cartItem)

    toast({
      title: "Added to cart",
      description: `${test.title} has been added to your cart.`,
    })
  }

  const isInCart = (id: number) => cartItems.some((item) => item.id === id)
  const isPurchased = (id: number) => purchasedTests.some((test) => test.id === id)

  // Update the getUnfilteredTests function to properly handle child categories
  const getUnfilteredTests = useMemo(() => {
    if (selectedChildCategory) {
      // Show tests for selected child category
      const childCategoryKey = selectedChildCategory.toLowerCase().replace(/\s+/g, "-")
      return testCatalog.all.filter((test) => {
        return (
          test.category === selectedCategory &&
          test.subcategory === selectedSubcategory &&
          test.childCategory === childCategoryKey
        )
      })
    } else if (selectedSubcategory) {
      // Show tests for selected subcategory
      return testCatalog.all.filter(
        (test) => test.category === selectedCategory && test.subcategory === selectedSubcategory,
      )
    } else if (selectedCategory !== "all") {
      // Show tests for selected category
      return testCatalog.all.filter((test) => test.category === selectedCategory)
    } else {
      // Show all tests
      return testCatalog.all
    }
  }, [selectedCategory, selectedSubcategory, selectedChildCategory])

  // Apply filters
  const filteredTests = useMemo(() => {
    let tests = getUnfilteredTests

    // Filter by search query
    if (searchQuery) {
      tests = tests.filter(
        (test) =>
          test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by price
    if (priceFilter !== "all") {
      if (priceFilter === "free") {
        tests = tests.filter((test) => test.price === 0)
      } else if (priceFilter === "under-100") {
        tests = tests.filter((test) => test.price > 0 && test.price < 100)
      } else if (priceFilter === "100-200") {
        tests = tests.filter((test) => test.price >= 100 && test.price <= 200)
      } else if (priceFilter === "200-plus") {
        tests = tests.filter((test) => test.price > 200)
      }
    }

    // Filter by level
    if (levelFilter !== "all") {
      tests = tests.filter((test) => test.level.toLowerCase() === levelFilter.toLowerCase())
    }

    // Sort tests
    if (sortBy === "price-low") {
      tests = [...tests].sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      tests = [...tests].sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      tests = [...tests].sort((a, b) => b.id - a.id)
    } else if (sortBy === "rating") {
      tests = [...tests].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (sortBy === "popular") {
      tests = [...tests].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    }

    return tests
  }, [getUnfilteredTests, searchQuery, sortBy, priceFilter, levelFilter])

  // Update total pages when filtered tests change
  useEffect(() => {
    setTotalPages(Math.ceil(filteredTests.length / testsPerPage))
  }, [filteredTests, testsPerPage])

  // Get paginated tests
  const paginatedTests = useMemo(() => {
    return filteredTests.slice((currentPage - 1) * testsPerPage, currentPage * testsPerPage)
  }, [filteredTests, currentPage, testsPerPage])

  // Get icon based on subcategory
  const getIcon = (category?: string, subcategory?: string) => {
    if (subcategory) {
      switch (subcategory.toLowerCase()) {
        case "police":
          return <Shield className="h-6 w-6 text-blue-600" />
        case "teaching":
          return <BookOpen className="h-6 w-6 text-purple-600" />
        case "clerical":
          return <FileText className="h-6 w-6 text-green-600" />
        case "technical":
          return <Tool className="h-6 w-6 text-orange-600" />
        case "ssc":
          return <Award className="h-6 w-6 text-red-600" />
        case "banking":
          return <Landmark className="h-6 w-6 text-emerald-600" />
        case "railway":
          return <Train className="h-6 w-6 text-cyan-600" />
        case "defense":
          return <Shield className="h-6 w-6 text-indigo-600" />
      }
    }

    return <Building className="h-6 w-6 text-gray-600" />
  }

  // Toggle subcategory collapse
  const toggleSubcategory = (subcategory: string) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [subcategory]: !prev[subcategory],
    }))
  }

  // Get child categories for a subcategory
  const getChildCategories = (subcategory: string) => {
    const subKey = subcategory.toLowerCase().replace(/\s+/g, "-")

    switch (subKey) {
      case "haryana-police":
        return ["Police Constable", "Police SI", "Police Head Constable", "Police Commando", "Police Driver"]
      case "haryana-teaching":
        return ["JBT Teacher", "HTET", "PGT", "TGT", "CTET"]
      case "haryana-clerical":
        return ["Clerk", "Gram Sachiv", "Patwari", "Kanungo", "Accountant"]
      case "haryana-technical":
        return ["JE Civil", "JE Electrical", "JE Mechanical", "Computer Operator", "Draftsman"]
      case "rajasthan-police":
        return ["Police Constable", "Police SI", "Police Head Constable", "Police Driver", "Police Wireless Operator"]
      case "rajasthan-teaching":
        return ["REET Level 1", "REET Level 2", "Senior Teacher", "Grade II Teacher", "Grade III Teacher"]
      case "rajasthan-clerical":
        return ["LDC", "UDC", "Gram Sevak", "Patwari", "Stenographer"]
      case "rajasthan-technical":
        return ["JE Civil", "JE Electrical", "JE Mechanical", "Technical Helper", "Lab Assistant"]
      case "up-police":
        return ["Police Constable", "Police SI", "Head Constable", "Fireman", "Jail Warder"]
      case "up-teaching":
        return ["UPTET", "Assistant Teacher", "TGT", "PGT", "Shiksha Mitra"]
      case "up-clerical":
        return ["Lekhpal", "VDO", "Revenue Inspector", "Clerk", "Stenographer"]
      case "up-technical":
        return ["JE Civil", "JE Electrical", "JE Mechanical", "Technical Assistant", "Lab Technician"]
      case "ssc":
        return ["CGL", "CHSL", "MTS", "CPO", "GD Constable"]
      case "banking":
        return ["PO", "Clerk", "SO", "RRB", "NABARD"]
      case "railway":
        return ["Group D", "NTPC", "ALP", "JE", "Station Master"]
      case "defense":
        return ["NDA", "CDS", "AFCAT", "Airmen", "Navy Sailor"]
      default:
        return []
    }
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>,
      )

      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <span className="px-4">...</span>
          </PaginationItem>,
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={currentPage === i} onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <span className="px-4">...</span>
          </PaginationItem>,
        )
      }

      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  // Update the child category selection to properly format the category key
  const handleChildCategorySelect = (childCategory: string) => {
    setSelectedChildCategory(childCategory)
    setCurrentPage(1)
  }

  // Reset all filters
  const resetFilters = () => {
    setPriceFilter("all")
    setLevelFilter("all")
    setSortBy("popular")
  }

  // Get the breadcrumb title for the current selection
  const getBreadcrumbTitle = () => {
    if (selectedChildCategory) {
      return selectedChildCategory
    } else if (selectedSubcategory) {
      return selectedSubcategory
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    } else if (selectedCategory !== "all") {
      return selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
    } else {
      return "All Tests"
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "all") {
      setSelectedCategory("all")
    } else {
      setSelectedCategory(value)
    }
    setSelectedSubcategory("")
    setSelectedChildCategory("")
    setCurrentPage(1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6 text-purple-600" />
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">TestHub</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/packages">
            <Button variant="outline" size="sm" className="rounded-full">
              Test Packages
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart ({cartItems?.length || 0})
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/" className="text-sm text-gray-500 hover:text-purple-600">
                  Home
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-sm font-medium">Tests</span>
                {selectedCategory !== "all" && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span className="text-sm font-medium">{getBreadcrumbTitle()}</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Test Catalog
              </h1>
              <p className="text-gray-500">Browse and attempt tests for your needs</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search tests..."
                  className="w-full rounded-full pl-8 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile filter button */}
              <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden rounded-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filter Tests</SheetTitle>
                    <SheetDescription>Narrow down tests based on your preferences</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Sort By</h3>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Price Range</h3>
                      <Select value={priceFilter} onValueChange={setPriceFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Prices</SelectItem>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="under-100">Under ₹100</SelectItem>
                          <SelectItem value="100-200">₹100 - ₹200</SelectItem>
                          <SelectItem value="200-plus">₹200+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Difficulty Level</h3>
                      <Select value={levelFilter} onValueChange={setLevelFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Difficulty level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" className="flex-1 rounded-full" onClick={resetFilters}>
                        Reset
                      </Button>
                      <SheetClose asChild>
                        <Button className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                          Apply Filters
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Category Tabs - Visible on mobile and desktop */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap bg-transparent p-0 h-auto">
              <TabsTrigger
                value="all"
                className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
              >
                All Tests
              </TabsTrigger>
              <TabsTrigger
                value="haryana"
                className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
              >
                Haryana
              </TabsTrigger>
              <TabsTrigger
                value="rajasthan"
                className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
              >
                Rajasthan
              </TabsTrigger>
              <TabsTrigger
                value="up"
                className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
              >
                UP
              </TabsTrigger>
              <TabsTrigger
                value="central"
                className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
              >
                Central Govt
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar with categories - Hidden on mobile */}
            <div className="hidden md:block md:col-span-1">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">{/* Category content here */}</CardContent>
              </Card>
            </div>

            {/* Test listing */}
            <div className="md:col-span-3">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl">
                      {selectedChildCategory
                        ? `${selectedChildCategory} Tests`
                        : selectedSubcategory
                          ? `${selectedSubcategory
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")} Tests`
                          : selectedCategory !== "all"
                            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tests`
                            : "All Tests"}
                    </CardTitle>
                    <CardDescription>{filteredTests.length} tests available</CardDescription>
                  </div>

                  {/* Desktop sort dropdown */}
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] rounded-lg">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>

                <CardContent>
                  {paginatedTests.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {paginatedTests.map((test) => (
                        <TestCard
                          key={test.id}
                          test={{
                            ...test,
                            rating: 4.5 + Math.random() * 0.5,
                            reviews: Math.floor(Math.random() * 300) + 50,
                            popularity: Math.floor(Math.random() * 1000) + 100,
                            lastUpdated: new Date(
                              Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
                            ).toISOString(),
                          }}
                          onAddToCart={handleAddToCart}
                          isInCart={isInCart(test.id)}
                          isPurchased={isPurchased(test.id)}
                          icon={getIcon(test.category, test.subcategory)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No tests found</h3>
                      <p className="text-gray-500 mb-4">We couldn't find any tests matching your criteria.</p>
                      <Button variant="outline" className="rounded-full" onClick={resetFilters}>
                        Reset Filters
                      </Button>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <Pagination>
                        <PaginationContent>
                          {currentPage > 1 && (
                            <PaginationItem>
                              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                            </PaginationItem>
                          )}

                          {renderPaginationItems()}

                          {currentPage < totalPages && (
                            <PaginationItem>
                              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                            </PaginationItem>
                          )}
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-gray-300 mt-auto">
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
