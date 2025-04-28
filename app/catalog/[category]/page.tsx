import { testCatalog } from "@/lib/test-catalog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Award } from "lucide-react"
import Link from "next/link"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  // Helper function to get tests by child category
  const getTestsByChildCategory = (childCategory: string) => {
    return testCatalog.all
      .filter((test) => test.childCategory.toLowerCase() === childCategory.toLowerCase())
      .slice(0, 10) // Show only first 10 tests for each category
  }

  // Define the categories and their child categories based on the URL parameter
  const categoryMap: Record<string, { title: string; childCategories: { name: string; key: string }[] }> = {
    police: {
      title: "Police Exams",
      childCategories: [
        { name: "Police Constable", key: "police-constable" },
        { name: "Police SI", key: "police-si" },
        { name: "Police Head Constable", key: "police-head-constable" },
        { name: "Police Driver", key: "police-driver" },
        { name: "Police Wireless Operator", key: "police-wireless-operator" },
      ],
    },
    teaching: {
      title: "Teaching Exams",
      childCategories: [
        { name: "REET Level 1", key: "reet-level-1" },
        { name: "REET Level 2", key: "reet-level-2" },
        { name: "Senior Teacher", key: "senior-teacher" },
        { name: "Grade II Teacher", key: "grade-ii-teacher" },
        { name: "Grade III Teacher", key: "grade-iii-teacher" },
      ],
    },
    up: {
      title: "UP Exams",
      childCategories: [
        { name: "UPTET", key: "uptet" },
        { name: "Assistant Teacher", key: "assistant-teacher" },
        { name: "Lekhpal", key: "lekhpal" },
        { name: "VDO", key: "vdo" },
        { name: "UP Police Constable", key: "police-constable" },
      ],
    },
    central: {
      title: "Central Government Exams",
      childCategories: [
        { name: "SSC CGL", key: "cgl" },
        { name: "SSC CHSL", key: "chsl" },
        { name: "Banking PO", key: "po" },
        { name: "Banking Clerk", key: "clerk" },
        { name: "Railway NTPC", key: "ntpc" },
      ],
    },
  }

  const categoryInfo = categoryMap[category] || {
    title: "Category Not Found",
    childCategories: [],
  }

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
        <h1 className="text-3xl font-bold">{categoryInfo.title}</h1>
      </div>

      <div className="space-y-12">
        {categoryInfo.childCategories.map((childCategory) => {
          const tests = getTestsByChildCategory(childCategory.key)
          return (
            <section key={childCategory.key}>
              <h2 className="text-2xl font-semibold mb-4">{childCategory.name}</h2>
              <p className="text-muted-foreground mb-4">
                Showing {tests.length} of 100 available tests for {childCategory.name}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{renderTestCards(tests)}</div>
              <div className="mt-4 text-center">
                <Link href={`/catalog/${category}/${childCategory.key}`}>
                  <Button variant="outline">View All {childCategory.name} Tests</Button>
                </Link>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
