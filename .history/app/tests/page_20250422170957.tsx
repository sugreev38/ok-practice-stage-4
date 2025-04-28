```tsx
"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useStore } from "@/lib/store"
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
  ChevronDown,
  ChevronRight,
  Clock,
  Star,
  Filter,
  SlidersHorizontal,
  X,
  Users,
  GraduationCap,
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
interface TestCardProps {
  test: {
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
  }
  onAddToCart: (test: any) => void
  isInCart: boolean
  isPurchased: boolean
  icon: React.ReactNode
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
  const { addToCart, cartItems, purchasedTests } = useStore()

  // Initialize open subcategories based on URL params
  useEffect(() => {
    const initialOpen = {}
    if (categoryParam) {
      initialOpen[categoryParam] = true
      if (subcategoryParam) {
        initialOpen[subcategoryParam] = true
        if (childCategoryParam) {
          initialOpen[childCategoryParam] = true
        }
      }
    }
    setOpenSubcategories(initialOpen)
  }, [categoryParam, subcategoryParam, childCategoryParam])

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

  const handleAddToCart = (test: any) => {
    if (purchasedTests.some((pt) => pt.id === test.id)) {
      toast({
        title: "Already purchased",
        description: "You already own this test. Check your purchased tests.",
        variant: "destructive",
      })
      return
    }

    const cartItem = {
      id: test.id,
      title: test.title,
      description: test.description,
      price: test.price,
      duration: test.duration,
      questions: test.questions.length,
    }

    addToCart(cartItem)
    toast({
      title: "Added to cart",
      description: `${test.title} has been added to your cart.`,
    })
  }

  const isInCart = (id: number) => cartItems.some((item) => item.id === id)
  const isPurchased = (id: number) => purchasedTests.some((test) => test.id === id)

  // Updated getUnfilteredTests with normalized childCategory
  const getUnfilteredTests = useMemo(() => {
    let result
    if (selectedChildCategory) {
      const childCategoryKey = selectedChildCategory.toLowerCase().replace(/\s+/g, "-")
      result = testCatalog.all.filter((test) => {
        const testChildCategory = test.childCategory?.toLowerCase().replace(/\s+/g, "-") || ""
        return (
          test.category === selectedCategory &&
          test.subcategory === selectedSubcategory &&
          testChildCategory === childCategoryKey
        )
      })
    } else if (selectedSubcategory) {
      result = testCatalog.all.filter(
        (test) => test.category === selectedCategory && test.subcategory === selectedSubcategory
      )
    } else if (selectedCategory !== "all") {
      result = testCatalog.all.filter((test) => test.category === selectedCategory)
    } else {
      result = testCatalog.all
    }
    console.log(
      `Unfiltered tests for category=${selectedCategory}, subcategory=${selectedSubcategory}, childCategory=${selectedChildCategory}:`,
      result
    )
    return result
  }, [selectedCategory, selectedSubcategory, selectedChildCategory])

  // Apply filters
  const filteredTests = useMemo(() => {
    let tests = getUnfilteredTests

    if (searchQuery) {
      tests = tests.filter(
        (test) =>
          test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

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

    if (levelFilter !== "all") {
      tests = tests.filter((test) => test.level.toLowerCase() === levelFilter.toLowerCase())
    }

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

    console.log("Filtered tests:", tests)
    return tests
  }, [getUnfilteredTests, searchQuery, sortBy, priceFilter, levelFilter])

  // Update total pages
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
        case "haryana-police":
        case "rajasthan-police":
        case "up-police":
          return <Shield className="h-6 w-6 text-blue-600" />
        case "haryana-teaching":
        case "rajasthan-teaching":
        case "up-teaching":
          return <BookOpen className="h-6 w-6 text-purple-600" />
        case "haryana-clerical":
        case "rajasthan-clerical":
        case "up-clerical":
          return <FileText className="h-6 w-6 text-green-600" />
        case "haryana-technical":
        case "rajasthan-technical":
        case "up-technical":
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

  // Toggle subcategory/child category collapse
  const toggleSubcategory = (key: string) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Updated getChildCategories to include tests
  const getChildCategories = useMemo(
    () => (subcategory: string) => {
      const subKey = subcategory.toLowerCase().replace(/\s+/g, "-")
      let categoryLabels: string[] = []
      switch (subKey) {
        case "haryana-police":
          categoryLabels = [
            "Police Constable",
            "Police SI",
            "Police Head Constable",
            "Police Commando",
            "Police Driver",
          ]
          break
        case "haryana-teaching":
          categoryLabels = ["JBT Teacher", "HTET", "PGT", "TGT", "CTET"]
          break
        case "haryana-clerical":
          categoryLabels = ["Clerk", "Gram Sachiv", "Patwari", "Kanungo", "Accountant"]
          break
        case "haryana-technical":
          categoryLabels = ["JE Civil", "JE Electrical", "JE Mechanical", "Computer Operator", "Draftsman"]
          break
        case "rajasthan-police":
          categoryLabels = [
            "Police Constable",
            "Police SI",
            "Police Head Constable",
            "Police Driver",
            "Police Wireless Operator",
          ]
          break
        case "rajasthan-teaching":
          categoryLabels = [
            "REET Level 1",
            "REET Level 2",
            "Senior Teacher",
            "Grade II Teacher",
            "Grade III Teacher",
          ]
          break
        case "rajasthan-clerical":
          categoryLabels = ["LDC", "UDC", "Gram Sevak", "Patwari", "Stenographer"]
          break
        case "rajasthan-technical":
          categoryLabels = ["JE Civil", "JE Electrical", "JE Mechanical", "Technical Helper", "Lab Assistant"]
          break
        case "up-police":
          categoryLabels = ["Police Constable", "Police SI", "Head Constable", "Fireman", "Jail Warder"]
          break
        case "up-teaching":
          categoryLabels = ["UPTET", "Assistant Teacher", "TGT", "PGT", "Shiksha Mitra"]
          break
        case "up-clerical":
          categoryLabels = ["Lekhpal", "VDO", "Revenue Inspector", "Clerk", "Stenographer"]
          break
        case "up-technical":
          categoryLabels = ["JE Civil", "JE Electrical", "JE Mechanical", "Technical Assistant", "Lab Technician"]
          break
        case "ssc":
          categoryLabels = ["CGL", "CHSL", "MTS", "CPO", "GD Constable"]
          break
        case "banking":
          categoryLabels = ["PO", "Clerk", "SO", "RRB", "NABARD"]
          break
        case "railway":
          categoryLabels = ["Group D", "NTPC", "ALP", "JE", "Station Master"]
          break
        case "defense":
          categoryLabels = ["NDA", "CDS", "AFCAT", "Airmen", "Navy Sailor"]
          break
        default:
          return []
      }

      return categoryLabels.map((label) => {
        const key = label.toLowerCase().replace(/\s+/g, "-")
        const tests = testCatalog.all.filter(
          (test) =>
            test.subcategory === subKey &&
            test.childCategory?.toLowerCase().replace(/\s+/g, "-") === key &&
            test.category === selectedCategory
        )
        return { label, key, tests }
      })
    },
    [selectedCategory]
  )

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
        </PaginationItem>
      )
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <span className="px-4">...</span>
          </PaginationItem>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={currentPage === i} onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <span className="px-4">...</span>
          </PaginationItem>
        )
      }
      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  // Handle child category selection
  const handleChildCategorySelect = (childCategory: string) => {
    setSelectedChildCategory(childCategory)
    setCurrentPage(1)
  }

  // Reset filters
  const resetFilters = () => {
    setPriceFilter("all")
    setLevelFilter("all")
    setSortBy("popular")
    setSearchQuery("")
  }

  // Get breadcrumb title
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
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            TestHub
          </span>
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
              Cart ({cartItems.length})
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
              <p className="text-gray-500">Browse and purchase tests for your needs</p>
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

              {/* Mobile category button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden rounded-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Categories
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Test Categories</SheetTitle>
                    <SheetDescription>Select a category to view tests</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-2">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "ghost"}
                      className="w-full justify-start rounded-lg"
                      onClick={() => {
                        setSelectedCategory("all")
                        setSelectedSubcategory("")
                        setSelectedChildCategory("")
                        setCurrentPage(1)
                      }}
                    >
                      <Building className="h-4 w-4 mr-2" />
                      All Tests
                    </Button>

                    {/* Haryana */}
                    <Collapsible open={openSubcategories["haryana"]}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant={selectedCategory === "haryana" ? "default" : "ghost"}
                          className="w-full justify-between rounded-lg"
                          onClick={() => {
                            setSelectedCategory("haryana")
                            setSelectedSubcategory("")
                            setSelectedChildCategory("")
                            setCurrentPage(1)
                            toggleSubcategory("haryana")
                          }}
                        >
                          <span className="flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            Haryana Exams
                          </span>
                          {openSubcategories["haryana"] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 space-y-1 mt-1">
                        {["haryana-police", "haryana-teaching", "haryana-clerical", "haryana-technical"].map(
                          (subcategory) => (
                            <Collapsible key={subcategory} open={openSubcategories[subcategory]}>
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant={selectedSubcategory === subcategory ? "default" : "ghost"}
                                  className="w-full justify-between rounded-lg"
                                  onClick={() => {
                                    setSelectedSubcategory(subcategory)
                                    setSelectedChildCategory("")
                                    toggleSubcategory(subcategory)
                                    setCurrentPage(1)
                                  }}
                                >
                                  <span className="flex items-center">
                                    {getIcon(selectedCategory, subcategory)}
                                    {subcategory.split("-")[1].charAt(0).toUpperCase() +
                                      subcategory.split("-")[1].slice(1)}
                                  </span>
                                  {openSubcategories[subcategory] ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="pl-4 space-y-1 mt-1">
                                {getChildCategories(subcategory).map((childCategory) => (
                                  <Collapsible
                                    key={childCategory.key}
                                    open={openSubcategories[childCategory.key]}
                                  >
                                    <CollapsibleTrigger asChild>
                                      <Button
                                        variant={
                                          selectedChildCategory === childCategory.label ? "default" : "ghost"
                                        }
                                        size="sm"
                                        className="w-full justify-between rounded-lg"
                                        onClick={() => {
                                          handleChildCategorySelect(childCategory.label)
                                          toggleSubcategory(childCategory.key)
                                        }}
                                      >
                                        <span className="flex items-center">
                                          {getIcon(selectedCategory, subcategory)}
                                          {childCategory.label}
                                        </span>
                                        {openSubcategories[childCategory.key] ? (
                                          <ChevronDown className="h-3 w-3" />
                                        ) : (
                                          <ChevronRight className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pl-6 space-y-2 mt-1">
                                      {childCategory.tests.length > 0 ? (
                                        childCategory.tests.slice(0, 5).map((test) => (
                                          <CompactTestCard
                                            key={test.id}
                                            test={test}
                                            onAddToCart={handleAddToCart}
                                            isInCart={isInCart(test.id)}
                                            isPurchased={isPurchased(test.id)}
                                            icon={getIcon(test.category, test.subcategory)}
                                          />
                                        ))
                                      ) : (
                                        <p className="text-sm text-gray-500">
                                          No tests available for {childCategory.label}
                                        </p>
                                      )}
                                      {childCategory.tests.length > 5 && (
                                        <Button
                                          variant="link"
                                          className="text-sm"
                                          onClick={() => {
                                            handleChildCategorySelect(childCategory.label)
                                          }}
                                        >
                                          View all {childCategory.tests.length} tests
                                        </Button>
                                      )}
                                    </CollapsibleContent>
                                  </Collapsible>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          )
                        )}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Rajasthan, UP, Central (similar structure) */}
                    {["rajasthan", "up", "central"].map((category) => (
                      <Collapsible key={category} open={openSubcategories[category]}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant={selectedCategory === category ? "default" : "ghost"}
                            className="w-full justify-between rounded-lg"
                            onClick={() => {
                              setSelectedCategory(category)
                              setSelectedSubcategory("")
                              setSelectedChildCategory("")
                              setCurrentPage(1)
                              toggleSubcategory(category)
                            }}
                          >
                            <span className="flex items-center">
                              <Building className="h-4 w-4 mr-2" />
                              {category.charAt(0).toUpperCase() + category.slice(1)} Exams
                            </span>
                            {openSubcategories[category] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 space-y-1 mt-1">
                          {category === "central"
                            ? ["ssc", "banking", "railway", "defense"]
                            : [
                                `${category}-police`,
                                `${category}-teaching`,
                                `${category}-clerical`,
                                `${category}-technical`,
                              ].map((subcategory) => (
                                <Collapsible key={subcategory} open={openSubcategories[subcategory]}>
                                  <CollapsibleTrigger asChild>
                                    <Button
                                      variant={selectedSubcategory === subcategory ? "default" : "ghost"}
                                      className="w-full justify-between rounded-lg"
                                      onClick={() => {
                                        setSelectedSubcategory(subcategory)
                                        setSelectedChildCategory("")
                                        toggleSubcategory(subcategory)
                                        setCurrentPage(1)
                                      }}
                                    >
                                      <span className="flex items-center">
                                        {getIcon(category, subcategory)}
                                        {subcategory.split("-")[1]?.charAt(0).toUpperCase() +
                                          subcategory.split("-")[1]?.slice(1) || subcategory}
                                      </span>
                                      {openSubcategories[subcategory] ? (
                                        <ChevronDown className="h-4 w-4" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="pl-4 space-y-1 mt-1">
                                    {getChildCategories(subcategory).map((childCategory) => (
                                      <Collapsible
                                        key={childCategory.key}
                                        open={openSubcategories[childCategory.key]}
                                      >
                                        <CollapsibleTrigger asChild>
                                          <Button
                                            variant={
                                              selectedChildCategory === childCategory.label
                                                ? "default"
                                                : "ghost"
                                            }
                                            size="sm"
                                            className="w-full justify-between rounded-lg"
                                            onClick={() => {
                                              handleChildCategorySelect(childCategory.label)
                                              toggleSubcategory(childCategory.key)
                                            }}
                                          >
                                            <span className="flex items-center">
                                              {getIcon(category, subcategory)}
                                              {childCategory.label}
                                            </span>
                                            {openSubcategories[childCategory.key] ? (
                                              <ChevronDown className="h-3 w-3" />
                                            ) : (
                                              <ChevronRight className="h-3 w-3" />
                                            )}
                                          </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="pl-6 space-y-2 mt-1">
                                          {childCategory.tests.length > 0 ? (
                                            childCategory.tests.slice(0, 5).map((test) => (
                                              <CompactTestCard
                                                key={test.id}
                                                test={test}
                                                onAddToCart={handleAddToCart}
                                                isInCart={isInCart(test.id)}
                                                isPurchased={isPurchased(test.id)}
                                                icon={getIcon(test.category, test.subcategory)}
                                              />
                                            ))
                                          ) : (
                                            <p className="text-sm text-gray-500">
                                              No tests available for {childCategory.label}
                                            </p>
                                          )}
                                          {childCategory.tests.length > 5 && (
                                            <Button
                                              variant="link"
                                              className="text-sm"
                                              onClick={() => {
                                                handleChildCategorySelect(childCategory.label)
                                              }}
                                            >
                                              View all {childCategory.tests.length} tests
                                            </Button>
                                          )}
                                        </CollapsibleContent>
                                      </Collapsible>
                                    ))}
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

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

          {/* Category Tabs */}
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
            {/* Sidebar with categories and tests */}
            <div className="hidden md:block md:col-span-1">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "ghost"}
                    className="w-full justify-start rounded-lg"
                    onClick={() => {
                      setSelectedCategory("all")
                      setSelectedSubcategory("")
                      setSelectedChildCategory("")
                      setCurrentPage(1)
                    }}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    All Tests
                  </Button>

                  {/* Haryana */}
                  <Collapsible open={openSubcategories["haryana"]}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={selectedCategory === "haryana" ? "default" : "ghost"}
                        className="w-full justify-between rounded-lg"
                        onClick={() => {
                          setSelectedCategory("haryana")
                          setSelectedSubcategory("")
                          setSelectedChildCategory("")
                          setCurrentPage(1)
                          toggleSubcategory("haryana")
                        }}
                      >
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          Haryana Exams
                        </span>
                        {openSubcategories["haryana"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1 mt-1">
                      {["haryana-police", "haryana-teaching", "haryana-clerical", "haryana-technical"].map(
                        (subcategory) => (
                          <Collapsible key={subcategory} open={openSubcategories[subcategory]}>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant={selectedSubcategory === subcategory ? "default" : "ghost"}
                                className="w-full justify-between rounded-lg"
                                onClick={() => {
                                  setSelectedSubcategory(subcategory)
                                  setSelectedChildCategory("")
                                  toggleSubcategory(subcategory)
                                  setCurrentPage(1)
                                }}
                              >
                                <span className="flex items-center">
                                  {getIcon(selectedCategory, subcategory)}
                                  {subcategory.split("-")[1].charAt(0).toUpperCase() +
                                    subcategory.split("-")[1].slice(1)}
                                </span>
                                {openSubcategories[subcategory] ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-4 space-y-1 mt-1">
                              {getChildCategories(subcategory).map((childCategory) => (
                                <Collapsible
                                  key={childCategory.key}
                                  open={openSubcategories[childCategory.key]}
                                >
                                  <CollapsibleTrigger asChild>
                                    <Button
                                      variant={
                                        selectedChildCategory === childCategory.label ? "default" : "ghost"
                                      }
                                      size="sm"
                                      className="w-full justify-between rounded-lg"
                                      onClick={() => {
                                        handleChildCategorySelect(childCategory.label)
                                        toggleSubcategory(childCategory.key)
                                      }}
                                    >
                                      <span className="flex items-center">
                                        {getIcon(selectedCategory, subcategory)}
                                        {childCategory.label}
                                      </span>
                                      {openSubcategories[childCategory.key] ? (
                                        <ChevronDown className="h-3 w-3" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3" />
                                      )}
                                    </Button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="pl-6 space-y-2 mt-1">
                                    {childCategory.tests.length > 0 ? (
                                      childCategory.tests.slice(0, 5).map((test) => (
                                        <CompactTestCard
                                          key={test.id}
                                          test={test}
                                          onAddToCart={handleAddToCart}
                                          isInCart={isInCart(test.id)}
                                          isPurchased={isPurchased(test.id)}
                                          icon={getIcon(test.category, test.subcategory)}
                                        />
                                      ))
                                    ) : (
                                      <p className="text-sm text-gray-500">
                                        No tests available for {childCategory.label}
                                      </p>
                                    )}
                                    {childCategory.tests.length > 5 && (
                                      <Button
                                        variant="link"
                                        className="text-sm"
                                        onClick={() => {
                                          handleChildCategorySelect(childCategory.label)
                                        }}
                                      >
                                        View all {childCategory.tests.length} tests
                                      </Button>
                                    )}
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        )
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Rajasthan */}
                  <Collapsible open={openSubcategories["rajasthan"]}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={selectedCategory === "rajasthan" ? "default" : "ghost"}
                        className="w-full justify-between rounded-lg"
                        onClick={() => {
                          setSelectedCategory("rajasthan")
                          setSelectedSubcategory("")
                          setSelectedChildCategory("")
                          setCurrentPage(1)
                          toggleSubcategory("rajasthan")
                        }}
                      >
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          Rajasthan Exams
                        </span>
                        {openSubcategories["rajasthan"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1 mt-1">
                      {["rajasthan-police", "rajasthan-teaching", "rajasthan-clerical", "rajasthan-technical"].map(
                        (subcategory) => (
                          <Collapsible key={subcategory} open={openSubcategories[subcategory]}>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant={selectedSubcategory === subcategory ? "default" : "ghost"}
                                className="w-full justify-between rounded-lg"
                                onClick={() => {
                                  setSelectedSubcategory(subcategory)
                                  setSelectedChildCategory("")
                                  toggleSubcategory(subcategory)
                                  setCurrentPage(1)
                                }}
                              >
                                <span className="flex items-center">
                                  {getIcon(selectedCategory, subcategory)}
                                  {subcategory.split("-")[1].charAt(0).toUpperCase() +
                                    subcategory.split("-")[1].slice(1)}
                                </span>
                                {openSubcategories[subcategory] ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-4 space-y-1 mt-1">
                              {getChildCategories(subcategory).map((childCategory) => (
                                <Collapsible
                                  key={childCategory.key}
                                  open={openSubcategories[childCategory.key]}
                                >
                                  <CollapsibleTrigger asChild>
                                    <Button
                                      variant={
                                        selectedChildCategory === childCategory.label ? "default" : "ghost"
                                      }
                                      size="sm"
                                      className="w-full justify-between rounded-lg"
                                      onClick={() => {
                                        handleChildCategorySelect(childCategory.label)
                                        toggleSubcategory(childCategory.key)
                                      }}
                                    >
                                      <span className="flex items-center">
                                        {getIcon(selectedCategory, subcategory)}
                                        {childCategory.label}
                                      </span>
                                      {openSubcategories[childCategory.key] ? (
                                        <ChevronDown className="h-3 w-3" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3" />
                                      )}
                                    </Button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="pl-6 space-y-2 mt-1">
                                    {childCategory.tests.length > 0 ? (
                                      childCategory.tests.slice(0, 5).map((test) => (
                                        <CompactTestCard
                                          key={test.id}
                                          test={test}
                                          onAddToCart={handleAddToCart}
                                          isInCart={isInCart(test.id)}
                                          isPurchased={isPurchased(test.id)}
                                          icon={getIcon(test.category, test.subcategory)}
                                        />
                                      ))
                                    ) : (
                                      <p className="text-sm text-gray-500">
                                        No tests available for {childCategory.label}
                                      </p>
                                    )}
                                    {childCategory.tests.length > 5 && (
                                      <Button
                                        variant="link"
                                        className="text-sm"
                                        onClick={() => {
                                          handleChildCategorySelect(childCategory.label)
                                        }}
                                      >
                                        View all {childCategory.tests.length} tests
                                      </Button>
                                    )}
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        )
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* UP */}
                  <Collapsible open={openSubcategories["up"]}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={selectedCategory === "up" ? "default" : "ghost"}
                        className="w-full justify-between rounded-lg"
                        onClick={() => {
                          setSelectedCategory("up")
                          setSelectedSubcategory("")
                          setSelectedChildCategory("")
                          setCurrentPage(1)
                          toggleSubcategory("up")
                        }}
                      >
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          UP Exams
                        </span>
                        {openSubcategories["up"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1 mt-1">
                      {["up-police", "up-teaching", "up-clerical", "up-technical"].map((subcategory) => (
                        <Collapsible key={subcategory} open={openSubcategories[subcategory]}>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant={selectedSubcategory === subcategory ? "default" : "ghost"}
                              className="w-full justify-between rounded-lg"
                              onClick={() => {
                                setSelectedSubcategory(subcategory)
                                setSelectedChildCategory("")
                                toggleSubcategory(subcategory)
                                setCurrentPage(1)
                              }}
                            >
                              <span className="flex items-center">
                                {getIcon(selectedCategory, subcategory)}
                                {subcategory.split("-")[1].charAt(0).toUpperCase() +
                                  subcategory.split("-")[1].slice(1)}
                              </span>
                              {openSubcategories[subcategory] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 space-y-1 mt-1">
                            {getChildCategories(subcategory).map((childCategory) => (
                              <Collapsible
                                key={childCategory.key}
                                open={openSubcategories[childCategory.key]}
                              >
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant={
                                      selectedChildCategory === childCategory.label ? "default" : "ghost"
                                    }
                                    size="sm"
                                    className="w-full justify-between rounded-lg"
                                    onClick={() => {
                                      handleChildCategorySelect(childCategory.label)
                                      toggleSubcategory(childCategory.key)
                                    }}
                                  >
                                    <span className="flex items-center">
                                      {getIcon(selectedCategory, subcategory)}
                                      {childCategory.label}
                                    </span>
                                    {openSubcategories[childCategory.key] ? (
                                      <ChevronDown className="h-3 w-3" />
                                    ) : (
                                      <ChevronRight className="h-3 w-3" />
                                    )}
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-6 space-y-2 mt-1">
                                  {childCategory.tests.length > 0 ? (
                                    childCategory.tests.slice(0, 5).map((test) => (
                                      <CompactTestCard
                                        key={test.id}
                                        test={test}
                                        onAddToCart={handleAddToCart}
                                        isInCart={isInCart(test.id)}
                                        isPurchased={isPurchased(test.id)}
                                        icon={getIcon(test.category, test.subcategory)}
                                      />
                                    ))
                                  ) : (
                                    <p className="text-sm text-gray-500">
                                      No tests available for {childCategory.label}
                                    </p>
                                  )}
                                  {childCategory.tests.length > 5 && (
                                    <Button
                                      variant="link"
                                      className="text-sm"
                                      onClick={() => {
                                        handleChildCategorySelect(childCategory.label)
                                      }}
                                    >
                                      View all {childCategory.tests.length} tests
                                    </Button>
                                  )}
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Central */}
                  <Collapsible open={openSubcategories["central"]}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={selectedCategory === "central" ? "default" : "ghost"}
                        className="w-full justify-between rounded-lg"
                        onClick={() => {
                          setSelectedCategory("central")
                          setSelectedSubcategory("")
                          setSelectedChildCategory("")
                          setCurrentPage(1)
                          toggleSubcategory("central")
                        }}
                      >
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          Central Govt Exams
                        </span>
                        {openSubcategories["central"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1 mt-1">
                      {["ssc", "banking", "railway", "defense"].map((subcategory) => (
                        <Collapsible key={subcategory} open={openSubcategories[subcategory]}>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant={selectedSubcategory === subcategory ? "default" : "ghost"}
                              className="w-full justify-between rounded-lg"
                              onClick={() => {
                                setSelectedSubcategory(subcategory)
                                setSelectedChildCategory("")
                                toggleSubcategory(subcategory)
                                setCurrentPage(1)
                              }}
                            >
                              <span className="flex items-center">
                                {getIcon(selectedCategory, subcategory)}
                                {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                              </span>
                              {openSubcategories[subcategory] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 space-y-1 mt-1">
                            {getChildCategories(subcategory).map((childCategory) => (
                              <Collapsible
                                key={childCategory.key}
                                open={openSubcategories[childCategory.key]}
                              >
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant={
                                      selectedChildCategory === childCategory.label ? "default" : "ghost"
                                    }
                                    size="sm"
                                    className="w-full justify-between rounded-lg"
                                    onClick={() => {
                                      handleChildCategorySelect(childCategory.label)
                                      toggleSubcategory(childCategory.key)
                                    }}
                                  >
                                    <span className="flex items-center">
                                      {getIcon(selectedCategory, subcategory)}
                                      {childCategory.label}
                                    </span>
                                    {openSubcategories[childCategory.key] ? (
                                      <ChevronDown className="h-3 w-3" />
                                    ) : (
                                      <ChevronRight className="h-3 w-3" />
                                    )}
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-6 space-y-2 mt-1">
                                  {childCategory.tests.length > 0 ? (
                                    childCategory.tests.slice(0, 5).map((test) => (
                                      <CompactTestCard
                                        key={test.id}
                                        test={test}
                                        onAddToCart={handleAddToCart}
                                        isInCart={isInCart(test.id)}
                                        isPurchased={isPurchased(test.id)}
                                        icon={getIcon(test.category, test.subcategory)}
                                      />
                                    ))
                                  ) : (
                                    <p className="text-sm text-gray-500">
                                      No tests available for {childCategory.label}
                                    </p>
                                  )}
                                  {childCategory.tests.length > 5 && (
                                    <Button
                                      variant="link"
                                      className="text-sm"
                                      onClick={() => {
                                        handleChildCategorySelect(childCategory.label)
                                      }}
                                    >
                                      View all {childCategory.tests.length} tests
                                    </Button>
                                  )}
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>

                {/* Desktop Filters */}
                <CardHeader className="border-t pt-6 pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Sort By</h3>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full rounded-lg">
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
                      <SelectTrigger className="w-full rounded-lg">
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
                      <SelectTrigger className="w-full rounded-lg">
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
                  <Button variant="outline" className="w-full rounded-lg mt-2" onClick={resetFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Reset Filters
                  </Button>
                </CardContent>
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

                {/* Active filters */}
                {(priceFilter !== "all" || levelFilter !== "all" || searchQuery) && (
                  <div className="px-6 pb-2 flex flex-wrap gap-2">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    {priceFilter !== "all" && (
                      <Badge
                        variant="outline"
                        className="rounded-full flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200"
                      >
                        {priceFilter === "free"
                          ? "Free"
                          : priceFilter === "under-100"
                          ? "Under ₹100"
                          : priceFilter === "100-200"
                          ? "₹100 - ₹200"
                          : "₹200+"}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPriceFilter("all")} />
                      </Badge>
                    )}
                    {levelFilter !== "all" && (
                      <Badge
                        variant="outline"
                        className="rounded-full flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {levelFilter.charAt(0).toUpperCase() + levelFilter.slice(1)}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setLevelFilter("all")} />
                      </Badge>
                    )}
                    {searchQuery && (
                      <Badge
                        variant="outline"
                        className="rounded-full flex items-center gap-1 bg-gray-50 text-gray-700 border-gray-200"
                      >
                        Search: {searchQuery}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchQuery("")} />
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-6 px-2 text-gray-500"
                      onClick={resetFilters}
                    >
                      Clear all
                    </Button>
                  </div>
                )}

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
                              Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
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
                      <p className="text-gray-500 mb-4">
                        {selectedChildCategory
                          ? `No tests found for ${selectedChildCategory}.`
                          : selectedSubcategory
                          ? `No tests found for ${selectedSubcategory
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}.`
                          : `No tests found for ${
                              selectedCategory === "all"
                                ? "all categories"
                                : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                            }.`}
                        Try selecting a different category or resetting filters.
                      </p>
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
            © 2025 TestHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

// Test Card Component
function TestCard({ test, onAddToCart, isInCart, isPurchased, icon }: TestCardProps) {
  const { id, title, description, price, level, duration, rating, reviews } = test
  const questionCount = Array.isArray(test.questions) ? test.questions.length : test.questionCount || 100

  const getLevelBadgeColor = () => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 border-none"
      case "intermediate":
        return "bg-blue-100 text-blue-800 border-none"
      case "advanced":
        return "bg-purple-100 text-purple-800 border-none"
      default:
        return "bg-gray-100 text-gray-800 border-none"
    }
  }

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="group-hover:text-purple-600 transition-colors">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </div>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Badge className={getLevelBadgeColor()}>{level}</Badge>
            {rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
                <span className="ml-1 text-xs text-gray-500">({reviews})</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{questionCount} questions</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{duration} min</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold">₹{price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        {isPurchased ? (
          <Button
            className="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            asChild
          >
            <Link href="/dashboard/purchased-tests">View in My Tests</Link>
          </Button>
        ) : isInCart ? (
          <Button className="w-full rounded-full" variant="outline" asChild>
            <Link href="/cart">View in Cart</Link>
          </Button>
        ) : (
          <>
            <Button className="w-1/2 rounded-full" variant="outline" onClick={() => onAddToCart(test)}>
              Add to Cart
            </Button>
            <Button
              className="w-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              asChild
            >
              <Link href={`/tests/attempt/${id}`}>Attempt Test</Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

// Compact Test Card for Dropdown
function CompactTestCard({ test, onAddToCart, isInCart, isPurchased, icon }: TestCardProps) {
  const { id, title, price, level } = test

  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <p className="text-sm font-medium line-clamp-1">{title}</p>
          <p className="text-xs text-gray-500">₹{price.toFixed(2)} • {level}</p>
        </div>
      </div>
      {isPurchased ? (
        <Button variant="outline" size="sm" className="rounded-full" asChild>
          <Link href="/dashboard/purchased-tests">Owned</Link>
        </Button>
      ) : isInCart ? (
        <Button variant="outline" size="sm" className="rounded-full" asChild>
          <Link href="/cart">In Cart</Link>
        </Button>
      ) : (
        <Button
          size="sm"
          className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
          onClick={() => onAddToCart(test)}
        >
          Add
        </Button>
      )}
    </div>
  )
                      