"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, BookOpen, Award } from "lucide-react"
import { testCatalog } from "@/lib/test-catalog"

interface Test {
  id: number
  title: string
  description: string
  price: number
  level: string
  questionCount: number
  duration: number
  category: string
  subcategory: string
  childCategory: string
}

interface CategoryTestCatalogProps {
  initialCategory?: string
}

export default function CategoryTestCatalog({ initialCategory = "police" }: CategoryTestCatalogProps) {
  const [activeTab, setActiveTab] = useState(initialCategory)

  // Helper function to get tests by child category
  const getTestsByChildCategory = (childCategory: string) => {
    return testCatalog.all
      .filter((test) => test.childCategory.toLowerCase() === childCategory.toLowerCase())
      .slice(0, 5) // Show only first 5 tests for brevity
  }

  // Get tests for police subcategory child categories
  const policeConstableTests = getTestsByChildCategory("police-constable")
  const policeSITests = getTestsByChildCategory("police-si")
  const policeHeadConstableTests = getTestsByChildCategory("police-head-constable")
  const policeDriverTests = getTestsByChildCategory("police-driver")
  const policeWirelessOperatorTests = getTestsByChildCategory("police-wireless-operator")

  // Get tests for Rajasthan teaching subcategory child categories
  const reetLevel1Tests = getTestsByChildCategory("reet-level-1")
  const reetLevel2Tests = getTestsByChildCategory("reet-level-2")

  // Get tests for UP exams
  const uptetTests = getTestsByChildCategory("uptet")
  const lekhpalTests = getTestsByChildCategory("lekhpal")

  // Get tests for Central Government exams
  const sscCglTests = getTestsByChildCategory("cgl")
  const bankingPoTests = getTestsByChildCategory("po")

  // Function to render test cards
  const renderTestCards = (tests: Test[]) => {
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
      <h1 className="text-3xl font-bold mb-8">Test Catalog by Category</h1>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="police">Police Exams</TabsTrigger>
          <TabsTrigger value="teaching">Teaching Exams</TabsTrigger>
          <TabsTrigger value="up">UP Exams</TabsTrigger>
          <TabsTrigger value="central">Central Govt Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="police" className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Police Constable</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderTestCards(policeConstableTests)}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Police SI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{renderTestCards(policeSITests)}</div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Police Head Constable</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderTestCards(policeHeadConstableTests)}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Police Driver</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderTestCards(policeDriverTests)}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Police Wireless Operator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderTestCards(policeWirelessOperatorTests)}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="teaching" className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">REET Level 1</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderTestCards(reetLevel1Tests)}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">REET Level 2</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderTestCards(reetLevel2Tests)}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="up" className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">UPTET</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{renderTestCards(uptetTests)}</div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Lekhpal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{renderTestCards(lekhpalTests)}</div>
          </section>
        </TabsContent>

        <TabsContent value="central" className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">SSC CGL</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{renderTestCards(sscCglTests)}</div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Banking PO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderTestCards(bankingPoTests)}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
