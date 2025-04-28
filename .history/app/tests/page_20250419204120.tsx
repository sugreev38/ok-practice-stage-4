// "use client"

// import type React from "react"

// import { useState, useEffect, useMemo } from "react"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { useStore } from "@/lib/store"
// import { toast } from "@/components/ui/use-toast"
// import { testCatalog } from "@/lib/test-catalog"
// import {
//   Package,
//   Search,
//   ShoppingCart,
//   Building,
//   Shield,
//   BookOpen,
//   FileText,
//   PenToolIcon as Tool,
//   Landmark,
//   Train,
//   Award,
//   ChevronDown,
//   ChevronRight,
//   Clock,
//   Star,
//   Filter,
//   SlidersHorizontal,
//   X,
//   Users,
//   GraduationCap,
// } from "lucide-react"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetClose,
// } from "@/components/ui/sheet"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// interface TestCardProps {
//   test: Test
//   onAddToCart: (test: Test) => void
//   isInCart: boolean
//   isPurchased: boolean
//   icon: React.ReactNode
// }

// // Define the test type to ensure proper typing
// // interface TestCardProps {
// //   test: {
// //     [x: string]: number
// //     id: number
// //     title: string
// //     description: string
// //     price: number
// //     level: string
// //     duration: number
// //     questions: any[]
// //     subcategory?: string
// //     category?: string
// //     childCategory?: string
// //     rating?: number
// //     reviews?: number
// //     popularity?: number
// //     lastUpdated?: string
// //   }
// //   onAddToCart: (test: any) => void
// //   isInCart: boolean
// //   isPurchased: boolean
// //   icon: React.ReactNode
// // }
// interface Test {
//   id: number
//   title: string
//   description: string
//   price: number
//   level: string
//   duration: number
//   questions: any[]
//   subcategory?: string
//   category?: string
//   childCategory?: string
//   rating?: number
//   reviews?: number
//   popularity?: number
//   lastUpdated?: string
// }

// export default function TestsPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const categoryParam = searchParams.get("category")
//   const subcategoryParam = searchParams.get("subcategory")
//   const childCategoryParam = searchParams.get("childCategory")
//   const pageParam = searchParams.get("page")
//   const sortParam = searchParams.get("sort") || "popular"
//   const priceParam = searchParams.get("price") || "all"
//   const levelParam = searchParams.get("level") || "all"

//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
//   const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryParam || "")
//   const [selectedChildCategory, setSelectedChildCategory] = useState(childCategoryParam || "")
//   const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({})
//   const [currentPage, setCurrentPage] = useState(pageParam ? Number.parseInt(pageParam) : 1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [sortBy, setSortBy] = useState(sortParam)
//   const [priceFilter, setPriceFilter] = useState(priceParam)
//   const [levelFilter, setLevelFilter] = useState(levelParam)
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState("all")

//   const testsPerPage = 12
//   const { addToCart, cartItems, purchasedTests } = useStore()

//   // Initialize open subcategories based on URL params
//   useEffect(() => {
//     if (categoryParam) {
//       // Open the category
//       setOpenSubcategories((prev) => ({
//         ...prev,
//         [categoryParam]: true,
//       }))

//       if (subcategoryParam) {
//         // Open the subcategory
//         setOpenSubcategories((prev) => ({
//           ...prev,
//           [subcategoryParam]: true,
//         }))
//       }
//     }
//   }, [categoryParam, subcategoryParam])

//   // Update URL when selections change
//   useEffect(() => {
//     let url = "/tests"
//     const params = new URLSearchParams()

//     if (selectedCategory !== "all") {
//       params.set("category", selectedCategory)

//       if (selectedSubcategory) {
//         params.set("subcategory", selectedSubcategory)

//         if (selectedChildCategory) {
//           params.set("childCategory", selectedChildCategory.toLowerCase().replace(/\s+/g, "-"))
//         }
//       }
//     }

//     if (currentPage > 1) {
//       params.set("page", currentPage.toString())
//     }

//     if (sortBy !== "popular") {
//       params.set("sort", sortBy)
//     }

//     if (priceFilter !== "all") {
//       params.set("price", priceFilter)
//     }

//     if (levelFilter !== "all") {
//       params.set("level", levelFilter)
//     }

//     if (params.toString()) {
//       url += `?${params.toString()}`
//     }

//     router.push(url, { scroll: false })
//   }, [
//     selectedCategory,
//     selectedSubcategory,
//     selectedChildCategory,
//     currentPage,
//     sortBy,
//     priceFilter,
//     levelFilter,
//     router,
//   ])

//   // Update active tab based on selected category
//   useEffect(() => {
//     if (selectedCategory === "all") {
//       setActiveTab("all")
//     } else if (selectedCategory === "haryana") {
//       setActiveTab("haryana")
//     } else if (selectedCategory === "rajasthan") {
//       setActiveTab("rajasthan")
//     } else if (selectedCategory === "up") {
//       setActiveTab("up")
//     } else if (selectedCategory === "central") {
//       setActiveTab("central")
//     }
//   }, [selectedCategory])

//   const handleAddToCart = (test: any) => {
//     // Check if test is already purchased
//     if (purchasedTests.some((pt: { id: any }) => pt.id === test.id)) {
//       toast({
//         title: "Already purchased",
//         description: "You already own this test. Check your purchased tests.",
//         variant: "destructive",
//       })
//       return
//     }

//     // Create a simplified version of the test for the cart
//     const cartItem = {
//       id: test.id,
//       title: test.title,
//       description: test.description,
//       price: test.price,
//       duration: test.duration,
//       questions: test.questions.length, // Pass the length instead of the array
//     }

//     addToCart(cartItem)
//     toast({
//       title: "Added to cart",
//       description: `${test.title} has been added to your cart.`,
//     })
//   }

//   const isInCart = (id: number) => cartItems.some((item: { id: number }) => item.id === id)
//   const isPurchased = (id: number) => purchasedTests.some((test: { id: number }) => test.id === id)

//   // Update the getUnfilteredTests function to properly handle child categories
//   const getUnfilteredTests = useMemo(() => {
//     if (selectedChildCategory) {
//       // Show tests for selected child category
//       const childCategoryKey = selectedChildCategory.toLowerCase().replace(/\s+/g, "-")
//       return testCatalog.all.filter((test) => {
//         return (
//           test.category === selectedCategory &&
//           test.subcategory === selectedSubcategory &&
//           test.childCategory === childCategoryKey
//         )
//       })
//     } else if (selectedSubcategory) {
//       // Show tests for selected subcategory
//       return testCatalog.all.filter(
//         (test) => test.category === selectedCategory && test.subcategory === selectedSubcategory,
//       )
//     } else if (selectedCategory !== "all") {
//       // Show tests for selected category
//       return testCatalog.all.filter((test) => test.category === selectedCategory)
//     } else {
//       // Show all tests
//       return testCatalog.all
//     }
//   }, [selectedCategory, selectedSubcategory, selectedChildCategory])

//   // Apply filters
//   const filteredTests = useMemo(() => {
//     let tests = getUnfilteredTests

//     // Filter by search query
//     if (searchQuery) {
//       tests = tests.filter(
//         (test) =>
//           test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           test.description.toLowerCase().includes(searchQuery.toLowerCase()),
//       )
//     }

//     // Filter by price
//     if (priceFilter !== "all") {
//       if (priceFilter === "free") {
//         tests = tests.filter((test) => test.price === 0)
//       } else if (priceFilter === "under-100") {
//         tests = tests.filter((test) => test.price > 0 && test.price < 100)
//       } else if (priceFilter === "100-200") {
//         tests = tests.filter((test) => test.price >= 100 && test.price <= 200)
//       } else if (priceFilter === "200-plus") {
//         tests = tests.filter((test) => test.price > 200)
//       }
//     }

//     // Filter by level
//     if (levelFilter !== "all") {
//       tests = tests.filter((test) => test.level.toLowerCase() === levelFilter.toLowerCase())
//     }

//     // Sort tests
//     if (sortBy === "price-low") {
//       tests = [...tests].sort((a, b) => a.price - b.price)
//     } else if (sortBy === "price-high") {
//       tests = [...tests].sort((a, b) => b.price - a.price)
//     } else if (sortBy === "newest") {
//       tests = [...tests].sort((a, b) => b.id - a.id)
//     } else if (sortBy === "rating") {
//       tests = [...tests].sort((a, b) => (b.rating || 0) - (a.rating || 0))
//     } else if (sortBy === "popular") {
//       tests = [...tests].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
//     }

//     return tests
//   }, [getUnfilteredTests, searchQuery, sortBy, priceFilter, levelFilter])

//   // Update total pages when filtered tests change
//   useEffect(() => {
//     setTotalPages(Math.ceil(filteredTests.length / testsPerPage))
//   }, [filteredTests, testsPerPage])

//   // Get paginated tests
//   const paginatedTests = useMemo(() => {
//     return filteredTests.slice((currentPage - 1) * testsPerPage, currentPage * testsPerPage)
//   }, [filteredTests, currentPage, testsPerPage])

//   // Get icon based on subcategory
//   const getIcon = (category?: string, subcategory?: string) => {
//     if (subcategory) {
//       switch (subcategory.toLowerCase()) {
//         case "police":
//           return <Shield className="h-6 w-6 text-blue-600" />
//         case "teaching":
//           return <BookOpen className="h-6 w-6 text-purple-600" />
//         case "clerical":
//           return <FileText className="h-6 w-6 text-green-600" />
//         case "technical":
//           return <Tool className="h-6 w-6 text-orange-600" />
//         case "ssc":
//           return <Award className="h-6 w-6 text-red-600" />
//         case "banking":
//           return <Landmark className="h-6 w-6 text-emerald-600" />
//         case "railway":
//           return <Train className="h-6 w-6 text-cyan-600" />
//         case "defense":
//           return <Shield className="h-6 w-6 text-indigo-600" />
//       }
//     }

//     return <Building className="h-6 w-6 text-gray-600" />
//   }

//   // Toggle subcategory collapse
//   const toggleSubcategory = (subcategory: string) => {
//     setOpenSubcategories((prev) => ({
//       ...prev,
//       [subcategory]: !prev[subcategory],
//     }))
//   }

//   // Get child categories for a subcategory
//   const getChildCategories = (subcategory: string) => {
//     const subKey = subcategory.toLowerCase().replace(/\s+/g, "-")

//     switch (subKey) {
//       case "haryana-police":
//         return ["Police Constable", "Police SI", "Police Head Constable", "Police Commando", "Police Driver"]
//       case "haryana-teaching":
//         return ["JBT Teacher", "HTET", "PGT", "TGT", "CTET"]
//       case "haryana-clerical":
//         return ["Clerk", "Gram Sachiv", "Patwari", "Kanungo", "Accountant"]
//       case "haryana-technical":
//         return ["JE Civil", "JE Electrical", "JE Mechanical", "Computer Operator", "Draftsman"]
//       case "rajasthan-police":
//         return ["Police Constable", "Police SI", "Police Head Constable", "Police Driver", "Police Wireless Operator"]
//       case "rajasthan-teaching":
//         return ["REET Level 1", "REET Level 2", "Senior Teacher", "Grade II Teacher", "Grade III Teacher"]
//       case "rajasthan-clerical":
//         return ["LDC", "UDC", "Gram Sevak", "Patwari", "Stenographer"]
//       case "rajasthan-technical":
//         return ["JE Civil", "JE Electrical", "JE Mechanical", "Technical Helper", "Lab Assistant"]
//       case "up-police":
//         return ["Police Constable", "Police SI", "Head Constable", "Fireman", "Jail Warder"]
//       case "up-teaching":
//         return ["UPTET", "Assistant Teacher", "TGT", "PGT", "Shiksha Mitra"]
//       case "up-clerical":
//         return ["Lekhpal", "VDO", "Revenue Inspector", "Clerk", "Stenographer"]
//       case "up-technical":
//         return ["JE Civil", "JE Electrical", "JE Mechanical", "Technical Assistant", "Lab Technician"]
//       case "ssc":
//         return ["CGL", "CHSL", "MTS", "CPO", "GD Constable"]
//       case "banking":
//         return ["PO", "Clerk", "SO", "RRB", "NABARD"]
//       case "railway":
//         return ["Group D", "NTPC", "ALP", "JE", "Station Master"]
//       case "defense":
//         return ["NDA", "CDS", "AFCAT", "Airmen", "Navy Sailor"]
//       default:
//         return []
//     }
//   }

//   // Handle page change
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//     window.scrollTo(0, 0)
//   }

//   // Generate pagination items
//   const renderPaginationItems = () => {
//     const items = []
//     const maxVisiblePages = 5

//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
//     const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1)
//     }

//     if (startPage > 1) {
//       items.push(
//         <PaginationItem key="first">
//           <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
//         </PaginationItem>,
//       )

//       if (startPage > 2) {
//         items.push(
//           <PaginationItem key="ellipsis-start">
//             <span className="px-4">...</span>
//           </PaginationItem>,
//         )
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       items.push(
//         <PaginationItem key={i}>
//           <PaginationLink isActive={currentPage === i} onClick={() => handlePageChange(i)}>
//             {i}
//           </PaginationLink>
//         </PaginationItem>,
//       )
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         items.push(
//           <PaginationItem key="ellipsis-end">
//             <span className="px-4">...</span>
//           </PaginationItem>,
//         )
//       }

//       items.push(
//         <PaginationItem key="last">
//           <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
//         </PaginationItem>,
//       )
//     }

//     return items
//   }

//   // Add a function to handle attempting a test directly
//   const handleAttemptTest = (test: any) => {
//     // In a real app, you would check if the user has purchased the test
//     // For demo purposes, we'll add it to purchased tests
//     const purchasedTest = {
//       id: test.id,
//       title: test.title,
//       description: test.description,
//       price: test.price,
//       duration: test.duration,
//       questions: test.questions.length,
//       status: "Not Started",
//       completed: false,
//       purchaseDate: new Date().toISOString(),
//     }

//     // Add to purchased tests
//     const { addPurchasedTest } = useStore.getState()
//     addPurchasedTest([purchasedTest])

//     // Navigate to attempt page
//     router.push(`/tests/attempt/${test.id}`)
//   }

//   // Update the child category selection to properly format the category key
//   const handleChildCategorySelect = (childCategory: string) => {
//     setSelectedChildCategory(childCategory)
//     setCurrentPage(1)
//   }

//   // Reset all filters
//   const resetFilters = () => {
//     setPriceFilter("all")
//     setLevelFilter("all")
//     setSortBy("popular")
//   }

//   // Get the breadcrumb title for the current selection
//   const getBreadcrumbTitle = () => {
//     if (selectedChildCategory) {
//       return selectedChildCategory
//     } else if (selectedSubcategory) {
//       return selectedSubcategory
//         .split("-")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ")
//     } else if (selectedCategory !== "all") {
//       return selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
//     } else {
//       return "All Tests"
//     }
//   }

//   // Handle tab change
//   const handleTabChange = (value: string) => {
//     setActiveTab(value)
//     if (value === "all") {
//       setSelectedCategory("all")
//     } else {
//       setSelectedCategory(value)
//     }
//     setSelectedSubcategory("")
//     setSelectedChildCategory("")
//     setCurrentPage(1)
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-6">
//         <Link href="/" className="flex items-center gap-2 font-semibold">
//           <Package className="h-6 w-6 text-purple-600" />
//           <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">TestHub</span>
//         </Link>
//         <div className="ml-auto flex items-center gap-4">
//           <Link href="/packages">
//             <Button variant="outline" size="sm" className="rounded-full">
//               Test Packages
//             </Button>
//           </Link>
//           <Link href="/dashboard">
//             <Button variant="outline" size="sm" className="rounded-full">
//               Dashboard
//             </Button>
//           </Link>
//           <Link href="/cart">
//             <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2">
//               <ShoppingCart className="h-4 w-4" />
//               Cart ({cartItems.length})
//             </Button>
//           </Link>
//         </div>
//       </header>
//       <main className="flex-1 p-4 md:p-6 bg-gray-50">
//         <div className="mx-auto max-w-7xl space-y-8">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <Link href="/" className="text-sm text-gray-500 hover:text-purple-600">
//                   Home
//                 </Link>
//                 <span className="text-gray-400">/</span>
//                 <span className="text-sm font-medium">Tests</span>
//                 {selectedCategory !== "all" && (
//                   <>
//                     <span className="text-gray-400">/</span>
//                     <span className="text-sm font-medium">{getBreadcrumbTitle()}</span>
//                   </>
//                 )}
//               </div>
//               <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
//                 Test Catalog
//               </h1>
//               <p className="text-gray-500">Browse and purchase tests for your needs</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="relative flex-1 md:w-[300px]">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//                 <Input
//                   type="search"
//                   placeholder="Search tests..."
//                   className="w-full rounded-full pl-8 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>

//               {/* Mobile filter button */}
//               <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" size="sm" className="md:hidden rounded-full">
//                     <Filter className="h-4 w-4 mr-2" />
//                     Filters
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//                   <SheetHeader>
//                     <SheetTitle>Filter Tests</SheetTitle>
//                     <SheetDescription>Narrow down tests based on your preferences</SheetDescription>
//                   </SheetHeader>
//                   <div className="py-4 space-y-6">
//                     <div className="space-y-2">
//                       <h3 className="text-sm font-medium">Sort By</h3>
//                       <Select value={sortBy} onValueChange={setSortBy}>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Sort by" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="popular">Most Popular</SelectItem>
//                           <SelectItem value="rating">Highest Rated</SelectItem>
//                           <SelectItem value="newest">Newest</SelectItem>
//                           <SelectItem value="price-low">Price: Low to High</SelectItem>
//                           <SelectItem value="price-high">Price: High to Low</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <h3 className="text-sm font-medium">Price Range</h3>
//                       <Select value={priceFilter} onValueChange={setPriceFilter}>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Price range" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="all">All Prices</SelectItem>
//                           <SelectItem value="free">Free</SelectItem>
//                           <SelectItem value="under-100">Under ₹100</SelectItem>
//                           <SelectItem value="100-200">₹100 - ₹200</SelectItem>
//                           <SelectItem value="200-plus">₹200+</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <h3 className="text-sm font-medium">Difficulty Level</h3>
//                       <Select value={levelFilter} onValueChange={setLevelFilter}>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Difficulty level" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="all">All Levels</SelectItem>
//                           <SelectItem value="beginner">Beginner</SelectItem>
//                           <SelectItem value="intermediate">Intermediate</SelectItem>
//                           <SelectItem value="advanced">Advanced</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="flex gap-2 pt-4">
//                       <Button variant="outline" className="flex-1 rounded-full" onClick={resetFilters}>
//                         Reset
//                       </Button>
//                       <SheetClose asChild>
//                         <Button className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
//                           Apply Filters
//                         </Button>
//                       </SheetClose>
//                     </div>
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>

//           {/* Category Tabs - Visible on mobile and desktop */}
//           <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
//             <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap bg-transparent p-0 h-auto">
//               <TabsTrigger
//                 value="all"
//                 className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
//               >
//                 All Tests
//               </TabsTrigger>
//               <TabsTrigger
//                 value="haryana"
//                 className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
//               >
//                 Haryana
//               </TabsTrigger>
//               <TabsTrigger
//                 value="rajasthan"
//                 className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
//               >
//                 Rajasthan
//               </TabsTrigger>
//               <TabsTrigger
//                 value="up"
//                 className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
//               >
//                 UP
//               </TabsTrigger>
//               <TabsTrigger
//                 value="central"
//                 className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white px-4 py-2 mr-2"
//               >
//                 Central Govt
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {/* Sidebar with categories - Hidden on mobile */}
//             <div className="hidden md:block md:col-span-1">
//               <Card className="border-gray-200 shadow-sm">
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-lg">Categories</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   <Button
//                     variant={selectedCategory === "all" ? "default" : "ghost"}
//                     className="w-full justify-start rounded-lg"
//                     onClick={() => {
//                       setSelectedCategory("all")
//                       setSelectedSubcategory("")
//                       setSelectedChildCategory("")
//                       setCurrentPage(1)
//                     }}
//                   >
//                     <Building className="h-4 w-4 mr-2" />
//                     All Tests
//                   </Button>

//                   {/* Haryana */}
//                   <Collapsible open={openSubcategories["haryana"]}>
//                     <CollapsibleTrigger asChild>
//                       <Button
//                         variant={selectedCategory === "haryana" ? "default" : "ghost"}
//                         className="w-full justify-between rounded-lg"
//                         onClick={() => {
//                           setSelectedCategory("haryana")
//                           setSelectedSubcategory("")
//                           setSelectedChildCategory("")
//                           setCurrentPage(1)
//                           setOpenSubcategories((prev) => ({
//                             ...prev,
//                             haryana: !prev.haryana,
//                           }))
//                         }}
//                       >
//                         <span className="flex items-center">
//                           <Building className="h-4 w-4 mr-2" />
//                           Haryana Exams
//                         </span>
//                         {openSubcategories["haryana"] ? (
//                           <ChevronDown className="h-4 w-4" />
//                         ) : (
//                           <ChevronRight className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </CollapsibleTrigger>
//                     <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                       {/* Haryana Police */}
//                       <Collapsible open={openSubcategories["haryana-police"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "haryana-police" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("haryana-police")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("haryana-police")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Shield className="h-4 w-4 mr-2 text-blue-600" />
//                               Police
//                             </span>
//                             {openSubcategories["haryana-police"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("haryana-police").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Shield className="h-3 w-3 mr-2 text-blue-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* Haryana Teaching */}
//                       <Collapsible open={openSubcategories["haryana-teaching"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "haryana-teaching" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("haryana-teaching")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("haryana-teaching")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
//                               Teaching
//                             </span>
//                             {openSubcategories["haryana-teaching"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("haryana-teaching").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <BookOpen className="h-3 w-3 mr-2 text-purple-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* Haryana Clerical */}
//                       <Collapsible open={openSubcategories["haryana-clerical"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "haryana-clerical" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("haryana-clerical")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("haryana-clerical")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <FileText className="h-4 w-4 mr-2 text-green-600" />
//                               Clerical
//                             </span>
//                             {openSubcategories["haryana-clerical"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("haryana-clerical").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <FileText className="h-3 w-3 mr-2 text-green-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* Haryana Technical */}
//                       <Collapsible open={openSubcategories["haryana-technical"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "haryana-technical" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("haryana-technical")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("haryana-technical")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Tool className="h-4 w-4 mr-2 text-orange-600" />
//                               Technical
//                             </span>
//                             {openSubcategories["haryana-technical"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("haryana-technical").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Tool className="h-3 w-3 mr-2 text-orange-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>
//                     </CollapsibleContent>
//                   </Collapsible>

//                   {/* Rajasthan */}
//                   <Collapsible open={openSubcategories["rajasthan"]}>
//                     <CollapsibleTrigger asChild>
//                       <Button
//                         variant={selectedCategory === "rajasthan" ? "default" : "ghost"}
//                         className="w-full justify-between rounded-lg"
//                         onClick={() => {
//                           setSelectedCategory("rajasthan")
//                           setSelectedSubcategory("")
//                           setSelectedChildCategory("")
//                           setCurrentPage(1)
//                           setOpenSubcategories((prev) => ({
//                             ...prev,
//                             rajasthan: !prev.rajasthan,
//                           }))
//                         }}
//                       >
//                         <span className="flex items-center">
//                           <Building className="h-4 w-4 mr-2" />
//                           Rajasthan Exams
//                         </span>
//                         {openSubcategories["rajasthan"] ? (
//                           <ChevronDown className="h-4 w-4" />
//                         ) : (
//                           <ChevronRight className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </CollapsibleTrigger>
//                     <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                       {/* Rajasthan Police */}
//                       <Collapsible open={openSubcategories["rajasthan-police"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "rajasthan-police" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("rajasthan-police")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("rajasthan-police")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Shield className="h-4 w-4 mr-2 text-blue-600" />
//                               Police
//                             </span>
//                             {openSubcategories["rajasthan-police"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("rajasthan-police").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Shield className="h-3 w-3 mr-2 text-blue-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* Rajasthan Teaching */}
//                       <Collapsible open={openSubcategories["rajasthan-teaching"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "rajasthan-teaching" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("rajasthan-teaching")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("rajasthan-teaching")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
//                               Teaching
//                             </span>
//                             {openSubcategories["rajasthan-teaching"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("rajasthan-teaching").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <BookOpen className="h-3 w-3 mr-2 text-purple-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* Rajasthan Clerical */}
//                       <Collapsible open={openSubcategories["rajasthan-clerical"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "rajasthan-clerical" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("rajasthan-clerical")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("rajasthan-clerical")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <FileText className="h-4 w-4 mr-2 text-green-600" />
//                               Clerical
//                             </span>
//                             {openSubcategories["rajasthan-clerical"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("rajasthan-clerical").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <FileText className="h-3 w-3 mr-2 text-green-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* Rajasthan Technical */}
//                       <Collapsible open={openSubcategories["rajasthan-technical"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "rajasthan-technical" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("rajasthan-technical")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("rajasthan-technical")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Tool className="h-4 w-4 mr-2 text-orange-600" />
//                               Technical
//                             </span>
//                             {openSubcategories["rajasthan-technical"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("rajasthan-technical").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Tool className="h-3 w-3 mr-2 text-orange-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>
//                     </CollapsibleContent>
//                   </Collapsible>

//                   {/* UP */}
//                   <Collapsible open={openSubcategories["up"]}>
//                     <CollapsibleTrigger asChild>
//                       <Button
//                         variant={selectedCategory === "up" ? "default" : "ghost"}
//                         className="w-full justify-between rounded-lg"
//                         onClick={() => {
//                           setSelectedCategory("up")
//                           setSelectedSubcategory("")
//                           setSelectedChildCategory("")
//                           setCurrentPage(1)
//                           setOpenSubcategories((prev) => ({
//                             ...prev,
//                             up: !prev.up,
//                           }))
//                         }}
//                       >
//                         <span className="flex items-center">
//                           <Building className="h-4 w-4 mr-2" />
//                           UP Exams
//                         </span>
//                         {openSubcategories["up"] ? (
//                           <ChevronDown className="h-4 w-4" />
//                         ) : (
//                           <ChevronRight className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </CollapsibleTrigger>
//                     <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                       {/* UP Police */}
//                       <Collapsible open={openSubcategories["up-police"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "up-police" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("up-police")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("up-police")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Shield className="h-4 w-4 mr-2 text-blue-600" />
//                               Police
//                             </span>
//                             {openSubcategories["up-police"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("up-police").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Shield className="h-3 w-3 mr-2 text-blue-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* UP Teaching */}
//                       <Collapsible open={openSubcategories["up-teaching"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "up-teaching" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("up-teaching")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("up-teaching")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
//                               Teaching
//                             </span>
//                             {openSubcategories["up-teaching"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("up-teaching").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <BookOpen className="h-3 w-3 mr-2 text-purple-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* UP Clerical */}
//                       <Collapsible open={openSubcategories["up-clerical"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "up-clerical" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("up-clerical")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("up-clerical")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <FileText className="h-4 w-4 mr-2 text-green-600" />
//                               Clerical
//                             </span>
//                             {openSubcategories["up-clerical"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("up-clerical").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <FileText className="h-3 w-3 mr-2 text-green-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* UP Technical */}
//                       <Collapsible open={openSubcategories["up-technical"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "up-technical" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("up-technical")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("up-technical")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Tool className="h-4 w-4 mr-2 text-orange-600" />
//                               Technical
//                             </span>
//                             {openSubcategories["up-technical"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("up-technical").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Tool className="h-3 w-3 mr-2 text-orange-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>
//                     </CollapsibleContent>
//                   </Collapsible>

//                   {/* Central Government */}
//                   <Collapsible open={openSubcategories["central"]}>
//                     <CollapsibleTrigger asChild>
//                       <Button
//                         variant={selectedCategory === "central" ? "default" : "ghost"}
//                         className="w-full justify-between rounded-lg"
//                         onClick={() => {
//                           setSelectedCategory("central")
//                           setSelectedSubcategory("")
//                           setSelectedChildCategory("")
//                           setCurrentPage(1)
//                           setOpenSubcategories((prev) => ({
//                             ...prev,
//                             central: !prev.central,
//                           }))
//                         }}
//                       >
//                         <span className="flex items-center">
//                           <Building className="h-4 w-4 mr-2" />
//                           Central Govt Exams
//                         </span>
//                         {openSubcategories["central"] ? (
//                           <ChevronDown className="h-4 w-4" />
//                         ) : (
//                           <ChevronRight className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </CollapsibleTrigger>
//                     <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                       {/* SSC */}
//                       <Collapsible open={openSubcategories["ssc"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "ssc" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("ssc")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("ssc")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Award className="h-4 w-4 mr-2 text-red-600" />
//                               SSC
//                             </span>
//                             {openSubcategories["ssc"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("ssc").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Award className="h-3 w-3 mr-2 text-red-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* Banking */}
//                       <Collapsible open={openSubcategories["banking"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "banking" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("banking")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("banking")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Landmark className="h-4 w-4 mr-2 text-emerald-600" />
//                               Banking
//                             </span>
//                             {openSubcategories["banking"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("banking").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Landmark className="h-3 w-3 mr-2 text-emerald-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* Railway */}
//                       <Collapsible open={openSubcategories["railway"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "railway" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("railway")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("railway")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Train className="h-4 w-4 mr-2 text-cyan-600" />
//                               Railway
//                             </span>
//                             {openSubcategories["railway"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("railway").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Train className="h-3 w-3 mr-2 text-cyan-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>

//                       {/* Defense */}
//                       <Collapsible open={openSubcategories["defense"]}>
//                         <CollapsibleTrigger asChild>
//                           <Button
//                             variant={selectedSubcategory === "defense" ? "default" : "ghost"}
//                             className="w-full justify-between rounded-lg"
//                             onClick={() => {
//                               setSelectedSubcategory("defense")
//                               setSelectedChildCategory("")
//                               toggleSubcategory("defense")
//                               setCurrentPage(1)
//                             }}
//                           >
//                             <span className="flex items-center">
//                               <Shield className="h-4 w-4 mr-2 text-indigo-600" />
//                               Defense
//                             </span>
//                             {openSubcategories["defense"] ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CollapsibleTrigger>
//                         <CollapsibleContent className="pl-4 space-y-1 mt-1">
//                           {getChildCategories("defense").map((childCategory) => (
//                             <Button
//                               key={childCategory}
//                               variant={selectedChildCategory === childCategory ? "default" : "ghost"}
//                               size="sm"
//                               className="w-full justify-start rounded-lg"
//                               onClick={() => handleChildCategorySelect(childCategory)}
//                             >
//                               <Shield className="h-3 w-3 mr-2 text-indigo-600" />
//                               {childCategory}
//                             </Button>
//                           ))}
//                         </CollapsibleContent>
//                       </Collapsible>
//                     </CollapsibleContent>
//                   </Collapsible>
//                 </CardContent>

//                 {/* Desktop Filters */}
//                 <CardHeader className="border-t pt-6 pb-3">
//                   <CardTitle className="text-lg flex items-center">
//                     <SlidersHorizontal className="h-4 w-4 mr-2" />
//                     Filters
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium">Sort By</h3>
//                     <Select value={sortBy} onValueChange={setSortBy}>
//                       <SelectTrigger className="w-full rounded-lg">
//                         <SelectValue placeholder="Sort by" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="popular">Most Popular</SelectItem>
//                         <SelectItem value="rating">Highest Rated</SelectItem>
//                         <SelectItem value="newest">Newest</SelectItem>
//                         <SelectItem value="price-low">Price: Low to High</SelectItem>
//                         <SelectItem value="price-high">Price: High to Low</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium">Price Range</h3>
//                     <Select value={priceFilter} onValueChange={setPriceFilter}>
//                       <SelectTrigger className="w-full rounded-lg">
//                         <SelectValue placeholder="Price range" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Prices</SelectItem>
//                         <SelectItem value="free">Free</SelectItem>
//                         <SelectItem value="under-100">Under ₹100</SelectItem>
//                         <SelectItem value="100-200">₹100 - ₹200</SelectItem>
//                         <SelectItem value="200-plus">₹200+</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium">Difficulty Level</h3>
//                     <Select value={levelFilter} onValueChange={setLevelFilter}>
//                       <SelectTrigger className="w-full rounded-lg">
//                         <SelectValue placeholder="Difficulty level" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Levels</SelectItem>
//                         <SelectItem value="beginner">Beginner</SelectItem>
//                         <SelectItem value="intermediate">Intermediate</SelectItem>
//                         <SelectItem value="advanced">Advanced</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <Button variant="outline" className="w-full rounded-lg mt-2" onClick={resetFilters}>
//                     <X className="h-4 w-4 mr-2" />
//                     Reset Filters
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Test listing */}
//             <div className="md:col-span-3">
//               <Card className="border-gray-200 shadow-sm">
//                 <CardHeader className="pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                   <div>
//                     <CardTitle className="text-xl">
//                       {selectedChildCategory
//                         ? `${selectedChildCategory} Tests`
//                         : selectedSubcategory
//                           ? `${selectedSubcategory
//                               .split("-")
//                               .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                               .join(" ")} Tests`
//                           : selectedCategory !== "all"
//                             ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tests`
//                             : "All Tests"}
//                     </CardTitle>
//                     <CardDescription>{filteredTests.length} tests available</CardDescription>
//                   </div>

//                   {/* Desktop sort dropdown */}
//                   <div className="hidden md:flex items-center gap-2">
//                     <span className="text-sm text-gray-500">Sort by:</span>
//                     <Select value={sortBy} onValueChange={setSortBy}>
//                       <SelectTrigger className="w-[180px] rounded-lg">
//                         <SelectValue placeholder="Sort by" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="popular">Most Popular</SelectItem>
//                         <SelectItem value="rating">Highest Rated</SelectItem>
//                         <SelectItem value="newest">Newest</SelectItem>
//                         <SelectItem value="price-low">Price: Low to High</SelectItem>
//                         <SelectItem value="price-high">Price: High to Low</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </CardHeader>

//                 {/* Active filters */}
//                 {(priceFilter !== "all" || levelFilter !== "all") && (
//                   <div className="px-6 pb-2 flex flex-wrap gap-2">
//                     <span className="text-sm text-gray-500">Active filters:</span>
//                     {priceFilter !== "all" && (
//                       <Badge
//                         variant="outline"
//                         className="rounded-full flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200"
//                       >
//                         {priceFilter === "free"
//                           ? "Free"
//                           : priceFilter === "under-100"
//                             ? "Under ₹100"
//                             : priceFilter === "100-200"
//                               ? "₹100 - ₹200"
//                               : "₹200+"}
//                         <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPriceFilter("all")} />
//                       </Badge>
//                     )}
//                     {levelFilter !== "all" && (
//                       <Badge
//                         variant="outline"
//                         className="rounded-full flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
//                       >
//                         {levelFilter.charAt(0).toUpperCase() + levelFilter.slice(1)}
//                         <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setLevelFilter("all")} />
//                       </Badge>
//                     )}
//                     <Button variant="ghost" size="sm" className="text-xs h-6 px-2 text-gray-500" onClick={resetFilters}>
//                       Clear all
//                     </Button>
//                   </div>
//                 )}

//                 <CardContent>
//                   {paginatedTests.length > 0 ? (
//                     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                       {paginatedTests.map((test) => (
//                         <TestCard
//                           key={test.id}
//                           test={{
//                             ...test,
//                             rating: 4.5 + Math.random() * 0.5, // Add random rating between 4.5-5.0
//                             reviews: Math.floor(Math.random() * 300) + 50, // Add random number of reviews
//                             popularity: Math.floor(Math.random() * 1000) + 100, // Add random popularity score
//                             lastUpdated: new Date(
//                               Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
//                             ).toISOString(), // Random date within last 30 days
//                           }}
//                           onAddToCart={handleAddToCart}
//                           isInCart={isInCart(test.id)}
//                           isPurchased={isPurchased(test.id)}
//                           icon={getIcon(test.category, test.subcategory)}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
//                         <Search className="h-8 w-8 text-gray-400" />
//                       </div>
//                       <h3 className="text-lg font-medium mb-2">No tests found</h3>
//                       <p className="text-gray-500 mb-4">We couldn't find any tests matching your criteria.</p>
//                       <Button variant="outline" className="rounded-full" onClick={resetFilters}>
//                         Reset Filters
//                       </Button>
//                     </div>
//                   )}

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="mt-8">
//                       <Pagination>
//                         <PaginationContent>
//                           {currentPage > 1 && (
//                             <PaginationItem>
//                               <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
//                             </PaginationItem>
//                           )}

//                           {renderPaginationItems()}

//                           {currentPage < totalPages && (
//                             <PaginationItem>
//                               <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
//                             </PaginationItem>
//                           )}
//                         </PaginationContent>
//                       </Pagination>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>

//               {/* Featured Categories Section */}
//               {selectedCategory === "all" && (
//                 <div className="mt-8 space-y-6">
//                   <h2 className="text-2xl font-bold">Featured Categories</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {/* UP Exams Card */}
//                     <Card
//                       className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                       onClick={() => handleTabChange("up")}
//                     >
//                       <CardContent className="p-6">
//                         <div className="flex flex-col items-center text-center">
//                           <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
//                             <Building className="h-8 w-8 text-blue-600" />
//                           </div>
//                           <h3 className="text-lg font-medium mb-1">UP Exams</h3>
//                           <p className="text-sm text-gray-500 mb-3">Prepare for all Uttar Pradesh government exams</p>
//                           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-none">
//                             400+ Tests
//                           </Badge>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     {/* Central Govt Card */}
//                     <Card
//                       className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                       onClick={() => handleTabChange("central")}
//                     >
//                       <CardContent className="p-6">
//                         <div className="flex flex-col items-center text-center">
//                           <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
//                             <Landmark className="h-8 w-8 text-purple-600" />
//                           </div>
//                           <h3 className="text-lg font-medium mb-1">Central Govt</h3>
//                           <p className="text-sm text-gray-500 mb-3">SSC, Banking, Railway & Defense exams</p>
//                           <Badge variant="outline" className="bg-purple-50 text-purple-700 border-none">
//                             500+ Tests
//                           </Badge>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     {/* Haryana Exams Card */}
//                     <Card
//                       className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                       onClick={() => handleTabChange("haryana")}
//                     >
//                       <CardContent className="p-6">
//                         <div className="flex flex-col items-center text-center">
//                           <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
//                             <Users className="h-8 w-8 text-green-600" />
//                           </div>
//                           <h3 className="text-lg font-medium mb-1">Haryana Exams</h3>
//                           <p className="text-sm text-gray-500 mb-3">All Haryana state government exams</p>
//                           <Badge variant="outline" className="bg-green-50 text-green-700 border-none">
//                             350+ Tests
//                           </Badge>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     {/* Rajasthan Exams Card */}
//                     <Card
//                       className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                       onClick={() => handleTabChange("rajasthan")}
//                     >
//                       <CardContent className="p-6">
//                         <div className="flex flex-col items-center text-center">
//                           <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
//                             <GraduationCap className="h-8 w-8 text-orange-600" />
//                           </div>
//                           <h3 className="text-lg font-medium mb-1">Rajasthan Exams</h3>
//                           <p className="text-sm text-gray-500 mb-3">Complete Rajasthan state exam preparation</p>
//                           <Badge variant="outline" className="bg-orange-50 text-orange-700 border-none">
//                             300+ Tests
//                           </Badge>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//               )}

//               {/* Popular Subcategories */}
//               {selectedCategory !== "all" && !selectedSubcategory && (
//                 <div className="mt-8 space-y-6">
//                   <h2 className="text-2xl font-bold">Popular Subcategories</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {selectedCategory === "up" && (
//                       <>
//                         <Card
//                           className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                           onClick={() => {
//                             setSelectedSubcategory("up-police")
//                             toggleSubcategory("up-police")
//                           }}
//                         >
//                           <CardContent className="p-6">
//                             <div className="flex flex-col items-center text-center">
//                               <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
//                                 <Shield className="h-6 w-6 text-blue-600" />
//                               </div>
//                               <h3 className="text-lg font-medium mb-1">UP Police</h3>
//                               <p className="text-sm text-gray-500">Constable, SI & more</p>
//                             </div>
//                           </CardContent>
//                         </Card>

//                         <Card
//                           className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                           onClick={() => {
//                             setSelectedSubcategory("up-teaching")
//                             toggleSubcategory("up-teaching")
//                           }}
//                         >
//                           <CardContent className="p-6">
//                             <div className="flex flex-col items-center text-center">
//                               <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
//                                 <BookOpen className="h-6 w-6 text-purple-600" />
//                               </div>
//                               <h3 className="text-lg font-medium mb-1">UP Teaching</h3>
//                               <p className="text-sm text-gray-500">UPTET, TGT, PGT & more</p>
//                             </div>
//                           </CardContent>
//                         </Card>

//                         <Card
//                           className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                           onClick={() => {
//                             setSelectedSubcategory("up-clerical")
//                             toggleSubcategory("up-clerical")
//                           }}
//                         >
//                           <CardContent className="p-6">
//                             <div className="flex flex-col items-center text-center">
//                               <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
//                                 <FileText className="h-6 w-6 text-green-600" />
//                               </div>
//                               <h3 className="text-lg font-medium mb-1">UP Clerical</h3>
//                               <p className="text-sm text-gray-500">Lekhpal, VDO & more</p>
//                             </div>
//                           </CardContent>
//                         </Card>

//                         <Card
//                           className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                           onClick={() => {
//                             setSelectedSubcategory("up-technical")
//                             toggleSubcategory("up-technical")
//                           }}
//                         >
//                           <CardContent className="p-6">
//                             <div className="flex flex-col items-center text-center">
//                               <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
//                                 <Tool className="h-6 w-6 text-orange-600" />
//                               </div>
//                               <h3 className="text-lg font-medium mb-1">UP Technical</h3>
//                               <p className="text-sm text-gray-500">JE, Technical Assistant & more</p>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </>
//                     )}

//                     {selectedCategory === "central" && (
//                       <>
//                         <Card
//                           className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                           onClick={() => {
//                             setSelectedSubcategory("ssc")
//                             toggleSubcategory("ssc")
//                           }}
//                         >
//                           <CardContent className="p-6">
//                             <div className="flex flex-col items-center text-center">
//                               <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3 group-hover:bg-red-200 transition-colors">
//                                 <Award className="h-6 w-6 text-red-600" />
//                               </div>
//                               <h3 className="text-lg font-medium mb-1">SSC Exams</h3>
//                               <p className="text-sm text-gray-500">CGL, CHSL, MTS & more</p>
//                             </div>
//                           </CardContent>
//                         </Card>

//                         <Card
//                           className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                           onClick={() => {
//                             setSelectedSubcategory("banking")
//                             toggleSubcategory("banking")
//                           }}
//                         >
//                           <CardContent className="p-6">
//                             <div className="flex flex-col items-center text-center">
//                               <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3 group-hover:bg-emerald-200 transition-colors">
//                                 <Landmark className="h-6 w-6 text-emerald-600" />
//                               </div>
//                               <h3 className="text-lg font-medium mb-1">Banking</h3>
//                               <p className="text-sm text-gray-500">PO, Clerk, SO & more</p>
//                             </div>
//                           </CardContent>
//                         </Card>

//                         <Card
//                           className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                           onClick={() => {
//                             setSelectedSubcategory("railway")
//                             toggleSubcategory("railway")
//                           }}
//                         >
//                           <CardContent className="p-6">
//                             <div className="flex flex-col items-center text-center">
//                               <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-3 group-hover:bg-cyan-200 transition-colors">
//                                 <Train className="h-6 w-6 text-cyan-600" />
//                               </div>
//                               <h3 className="text-lg font-medium mb-1">Railway</h3>
//                               <p className="text-sm text-gray-500">Group D, NTPC, ALP & more</p>
//                             </div>
//                           </CardContent>
//                         </Card>

//                         <Card
//                           className="group hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200"
//                           onClick={() => {
//                             setSelectedSubcategory("defense")
//                             toggleSubcategory("defense")
//                           }}
//                         >
//                           <CardContent className="p-6">
//                             <div className="flex flex-col items-center text-center">
//                               <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition-colors">
//                                 <Shield className="h-6 w-6 text-indigo-600" />
//                               </div>
//                               <h3 className="text-lg font-medium mb-1">Defense</h3>
//                               <p className="text-sm text-gray-500">NDA, CDS, AFCAT & more</p>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <footer className="bg-gray-900 text-gray-300 mt-auto">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center mb-4 md:mb-0">
//               <Package className="h-6 w-6 text-purple-400 mr-2" />
//               <span className="font-bold text-white">TestHub</span>
//             </div>
//             <div className="flex flex-wrap justify-center gap-4 md:gap-8">
//               <a href="#" className="text-sm hover:text-white transition-colors">
//                 About
//               </a>
//               <a href="#" className="text-sm hover:text-white transition-colors">
//                 Contact
//               </a>
//               <a href="#" className="text-sm hover:text-white transition-colors">
//                 Terms
//               </a>
//               <a href="#" className="text-sm hover:text-white transition-colors">
//                 Privacy
//               </a>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm">
//             © 2024 TestHub. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// // Test Card Component
// function TestCard({ test, onAddToCart, isInCart, isPurchased, icon }: TestCardProps) {
//   // Extract the necessary properties from the test object
//   const { id, title, description, price, level, duration, rating, reviews } = test

//   // Get the question count safely - ensure it's always 100
//   const questionCount = Array.isArray(test.questions) ? test.questions.length : test.questionCount || 100

//   // Get badge color based on level
//   const getLevelBadgeColor = () => {
//     switch (level.toLowerCase()) {
//       case "beginner":
//         return "bg-green-100 text-green-800 border-none"
//       case "intermediate":
//         return "bg-blue-100 text-blue-800 border-none"
//       case "advanced":
//         return "bg-purple-100 text-purple-800 border-none"
//       default:
//         return "bg-gray-100 text-gray-800 border-none"
//     }
//   }

//   return (
//     <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden group">
//       <CardHeader className="pb-3">
//         <div className="flex items-start justify-between">
//           <div>
//             <CardTitle className="group-hover:text-purple-600 transition-colors">{title}</CardTitle>
//             <CardDescription className="line-clamp-2">{description}</CardDescription>
//           </div>
//           {icon}
//         </div>
//       </CardHeader>
//       <CardContent className="pb-3">
//         <div className="grid gap-2">
//           <div className="flex items-center justify-between">
//             <Badge className={getLevelBadgeColor()}>{level}</Badge>
//             {rating && (
//               <div className="flex items-center">
//                 <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                 <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
//                 <span className="ml-1 text-xs text-gray-500">({reviews})</span>
//               </div>
//             )}
//           </div>
//           <div className="flex items-center justify-between text-sm text-gray-500">
//             <div className="flex items-center">
//               <BookOpen className="h-4 w-4 mr-1" />
//               <span>{questionCount} questions</span>
//             </div>
//             <div className="flex items-center">
//               <Clock className="h-4 w-4 mr-1" />
//               <span>{duration} min</span>
//             </div>
//           </div>
//           <div className="flex items-center justify-between mt-1">
//             <span className="text-lg font-bold">₹{price.toFixed(2)}</span>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="flex gap-2 pt-0">
//         {isPurchased ? (
//           <Button
//             className="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
//             asChild
//           >
//             <Link href="/dashboard/purchased-tests">View in My Tests</Link>
//           </Button>
//         ) : isInCart ? (
//           <Button className="w-full rounded-full" variant="outline" asChild>
//             <Link href="/cart">View in Cart</Link>
//           </Button>
//         ) : (
//           <>
//             <Button className="w-1/2 rounded-full" variant="outline" onClick={() => onAddToCart(test)}>
//               Add to Cart
//             </Button>
//             <Button
//               className="w-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
//               asChild
//             >
//               <Link href={`/tests/attempt/${id}`}>Attempt Test</Link>
//             </Button>
//           </>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }

















// app/tests/page.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"
import { testCatalog } from "@/lib/test-catalog"
import { ChevronDown, ChevronRight, Clock, Star, Filter, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Type Definitions
interface Test {
  id: number
  title: string
  description: string
  price: number
  level: string
  duration: number
  questions: any[]
  category?: string
  subcategory?: string
  childCategory?: string
  rating?: number
  reviews?: number
  popularity?: number
  lastUpdated?: string
}

interface TestCardProps {
  test: Test
  onAddToCart: (test: Test) => void
  isInCart: boolean
  isPurchased: boolean
  icon: React.ReactNode
}

// Main Component
export default function TestsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToCart, cartItems, purchasedTests } = useStore()

  // State Management
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({})
  
  // URL Parameters
  const categoryParam = searchParams.get("category") || "all"
  const subcategoryParam = searchParams.get("subcategory") || ""
  const childCategoryParam = searchParams.get("childCategory") || ""
  const sortParam = searchParams.get("sort") || "popular"
  const priceParam = searchParams.get("price") || "all"
  const levelParam = searchParams.get("level") || "all"

  // Filtered Tests Logic
  const filteredTests = useMemo(() => {
    let tests = testCatalog.all
    
    // Category Filtering
    if (categoryParam !== "all") {
      tests = tests.filter(test => test.category === categoryParam)
      if (subcategoryParam) {
        tests = tests.filter(test => test.subcategory === subcategoryParam)
        if (childCategoryParam) {
          tests = tests.filter(test => test.childCategory === childCategoryParam)
        }
      }
    }

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      tests = tests.filter(test => 
        test.title.toLowerCase().includes(query) || 
        test.description.toLowerCase().includes(query)
      )
    }

    // Price Filter
    if (priceParam !== "all") {
      tests = tests.filter(test => {
        switch (priceParam) {
          case "free": return test.price === 0
          case "under-100": return test.price > 0 && test.price < 100
          case "100-200": return test.price >= 100 && test.price <= 200
          case "200-plus": return test.price > 200
          default: return true
        }
      })
    }

    // Level Filter
    if (levelParam !== "all") {
      tests = tests.filter(test => test.level.toLowerCase() === levelParam)
    }

    // Sorting
    switch (sortParam) {
      case "price-low": return [...tests].sort((a, b) => a.price - b.price)
      case "price-high": return [...tests].sort((a, b) => b.price - a.price)
      case "newest": return [...tests].sort((a, b) => b.id - a.id)
      case "rating": return [...tests].sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default: return [...tests].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    }
  }, [categoryParam, subcategoryParam, childCategoryParam, searchQuery, sortParam, priceParam, levelParam])

  // Pagination Logic
  const testsPerPage = 12
  const paginatedTests = useMemo(() => {
    return filteredTests.slice((currentPage - 1) * testsPerPage, currentPage * testsPerPage)
  }, [filteredTests, currentPage])

  useEffect(() => {
    setTotalPages(Math.ceil(filteredTests.length / testsPerPage))
  }, [filteredTests])

  // Event Handlers
  const handleAddToCart = (test: Test) => {
    if (purchasedTests.some(pt => pt.id === test.id)) {
      toast({ title: "Already purchased", variant: "destructive" })
      return
    }
    
    addToCart({
      id: test.id,
      title: test.title,
      price: test.price,
      duration: test.duration,
      questions: test.questions.length
    })
    
    toast({ title: "Added to cart" })
  }

  const isInCart = (id: number) => cartItems.some(item => item.id === id)
  const isPurchased = (id: number) => purchasedTests.some(test => test.id === id)

  // UI Components
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">TestHub</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/cart">
            <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2">
              Cart ({cartItems.length})
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Test Catalog
              </h1>
            </div>
            <div className="relative flex-1 md:w-[300px]">
              <Input
                type="search"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Test Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paginatedTests.map(test => (
              <TestCard
                key={test.id}
                test={test}
                onAddToCart={handleAddToCart}
                isInCart={isInCart(test.id)}
                isPurchased={isPurchased(test.id)}
                icon={<TestIcon category={test.category} />}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage(p => p - 1)} />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => setCurrentPage(p => p + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
    </div>
  )
}

// Test Card Component
function TestCard({ test, onAddToCart, isInCart, isPurchased, icon }: TestCardProps) {
  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{test.title}</CardTitle>
            <CardDescription className="line-clamp-2">{test.description}</CardDescription>
          </div>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{test.level}</Badge>
          <span className="text-lg font-bold">₹{test.price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        {isPurchased ? (
          <Button className="w-full" variant="outline" asChild>
            <Link href="/dashboard">View Purchased</Link>
          </Button>
        ) : isInCart ? (
          <Button className="w-full" variant="outline" asChild>
            <Link href="/cart">View in Cart</Link>
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onAddToCart(test)}>
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Helper Component
function TestIcon({ category }: { category?: string }) {
  const iconProps = { className: "h-6 w-6" }
  switch (category?.toLowerCase()) {
    case "haryana": return <Building {...iconProps} />
    case "police": return <Shield {...iconProps} />
    case "teaching": return <BookOpen {...iconProps} />
    default: return <Building {...iconProps} />
  }
}