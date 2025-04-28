import { testCatalog } from "@/lib/test-catalog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Award } from "lucide-react"
import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ChildCategoryPage({
  params,
}: {
  params: { category: string; childCategory: string }
}) {
  const { category, childCategory } = params

  // Get tests for this child category
  const tests = testCatalog.all.filter((test) => test.childCategory.toLowerCase() === childCategory.toLowerCase())

  // Define the category and child category titles
  const categoryMap: Record<string, string> = {
    police: "Police Exams",
    teaching: "Teaching Exams",
    up: "UP Exams",
    central: "Central Government Exams",
  }

  const childCategoryMap: Record<string, string> = {
    "police-constable": "Police Constable",
    "police-si": "Police SI",
    "police-head-constable": "Police Head Constable",
    "police-driver": "Police Driver",
    "police-wireless-operator": "Police Wireless Operator",
    "reet-level-1": "REET Level 1",
    "reet-level-2": "REET Level 2",
    "senior-teacher": "Senior Teacher",
    "grade-ii-teacher": "Grade II Teacher",
    "grade-iii-teacher": "Grade III Teacher",
    uptet: "UPTET",
    "assistant-teacher": "Assistant Teacher",
    lekhpal: "Lekhpal",
    vdo: "VDO",
    cgl: "SSC CGL",
    chsl: "SSC CHSL",
    po: "Banking PO",
    clerk: "Banking Clerk",
    ntpc: "Railway NTPC",
  }

  const categoryTitle = categoryMap[category] || "Category"
  const childCategoryTitle = childCategoryMap[childCategory] || childCategory

  // Pagination
  const testsPerPage = 12
  const totalPages = Math.ceil(tests.length / testsPerPage)
  const currentPage = 1
  const paginatedTests = tests.slice(0, testsPerPage)

  // Function to render test cards
  const renderTestCards = (tests: any[]) => {
    return tests.map((test) => (
      <Card key={test.id} className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{test.title}</CardTitle>
            <Badge
              variant={
                test.level === "Beginner" ? "outline" : test.level === "Intermediate" ? "secondary" : "destructive"
              }
            >
              {test.level}
            </Badge>
          </div>
          <CardDescription>{test.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{test.questionCount} Questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{test.duration} Minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span>₹{test.price}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Add to Cart</Button>
          <Button>Attempt Now</Button>
        </CardFooter>
      </Card>
    ))
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/catalog" className="text-blue-500 hover:underline">
          Catalog
        </Link>
        <span>/</span>
        <Link href={`/catalog/${category}`} className="text-blue-500 hover:underline">
          {categoryTitle}
        </Link>
        <span>/</span>
        <h1 className="text-3xl font-bold">{childCategoryTitle}</h1>
      </div>

      <div className="mb-8">
        <p className="text-muted-foreground">
          Showing {paginatedTests.length} of {tests.length} tests for {childCategoryTitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {renderTestCards(paginatedTests)}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href="#" isActive={i + 1 === currentPage}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationLink href="#">...</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
