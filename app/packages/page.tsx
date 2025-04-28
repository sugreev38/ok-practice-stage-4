"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  Search,
  ShoppingCart,
  BookOpen,
  Building,
  Shield,
  FileText,
  PenToolIcon as Tool,
  Award,
  Landmark,
  Train,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCartStore, useTestStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"
import { packageData } from "@/lib/package-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { addToCart, cartItems } = useCartStore()
  const { purchasedTests } = useTestStore()

  const handleAddToCart = (pkg: any) => {
    // Check if any test in the package is already purchased
    const alreadyPurchasedTests = pkg.testIds.filter((id: number) => purchasedTests.some((test) => test.id === id))

    if (alreadyPurchasedTests.length > 0) {
      toast({
        title: "Some tests already purchased",
        description: `You already own ${alreadyPurchasedTests.length} tests in this package.`,
        variant: "destructive",
      })
      return
    }

    addToCart({
      id: pkg.id,
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      isPackage: true,
      testIds: pkg.testIds,
    })

    toast({
      title: "Added to cart",
      description: `${pkg.title} has been added to your cart.`,
    })
  }

  const isInCart = (id: string) => cartItems.some((item) => item.id === id)

  // Filter packages based on search query
  const filterPackages = (packages: any[]) => {
    if (!searchQuery) return packages
    return packages.filter(
      (pkg) =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Get icon based on category and subcategory
  const getIcon = (category?: string, subcategory?: string) => {
    if (subcategory) {
      switch (subcategory) {
        case "police":
          return <Shield className="h-12 w-12 text-primary" />
        case "teaching":
          return <BookOpen className="h-12 w-12 text-primary" />
        case "clerical":
          return <FileText className="h-12 w-12 text-primary" />
        case "technical":
          return <Tool className="h-12 w-12 text-primary" />
        case "ssc":
          return <Award className="h-12 w-12 text-primary" />
        case "banking":
          return <Landmark className="h-12 w-12 text-primary" />
        case "railway":
          return <Train className="h-12 w-12 text-primary" />
        case "defense":
          return <Shield className="h-12 w-12 text-primary" />
      }
    }

    return <Building className="h-12 w-12 text-primary" />
  }

  // Group packages by category
  const haryanaPackages = packageData.filter((pkg) => pkg.category === "haryana")
  const rajasthanPackages = packageData.filter((pkg) => pkg.category === "rajasthan")
  const upPackages = packageData.filter((pkg) => pkg.category === "up")
  const centralPackages = packageData.filter((pkg) => pkg.category === "central")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>TestHub</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart ({cartItems.length})
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Test Packages</h1>
              <p className="text-muted-foreground">Save money with our comprehensive test packages</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search packages..."
                  className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 flex flex-wrap">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                All Packages
              </TabsTrigger>
              <TabsTrigger value="haryana" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                Haryana
              </TabsTrigger>
              <TabsTrigger value="rajasthan" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                Rajasthan
              </TabsTrigger>
              <TabsTrigger value="up" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                UP
              </TabsTrigger>
              <TabsTrigger value="central" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                Central Govt
              </TabsTrigger>
            </TabsList>

            {/* All Packages */}
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {filterPackages(packageData).map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onAddToCart={handleAddToCart}
                    isInCart={isInCart(pkg.id)}
                    icon={getIcon(pkg.category, pkg.subcategory)}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Haryana Packages */}
            <TabsContent value="haryana" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {filterPackages(haryanaPackages).map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onAddToCart={handleAddToCart}
                    isInCart={isInCart(pkg.id)}
                    icon={getIcon(pkg.category, pkg.subcategory)}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Rajasthan Packages */}
            <TabsContent value="rajasthan" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {filterPackages(rajasthanPackages).map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onAddToCart={handleAddToCart}
                    isInCart={isInCart(pkg.id)}
                    icon={getIcon(pkg.category, pkg.subcategory)}
                  />
                ))}
              </div>
            </TabsContent>

            {/* UP Packages */}
            <TabsContent value="up" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {filterPackages(upPackages).map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onAddToCart={handleAddToCart}
                    isInCart={isInCart(pkg.id)}
                    icon={getIcon(pkg.category, pkg.subcategory)}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Central Packages */}
            <TabsContent value="central" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {filterPackages(centralPackages).map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onAddToCart={handleAddToCart}
                    isInCart={isInCart(pkg.id)}
                    icon={getIcon(pkg.category, pkg.subcategory)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// Package Card Component
function PackageCard({
  pkg,
  onAddToCart,
  isInCart,
  icon,
}: {
  pkg: any
  onAddToCart: (pkg: any) => void
  isInCart: boolean
  icon: React.ReactNode
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="flex items-center justify-center bg-muted p-6 md:w-1/3">{icon}</div>
        <div className="flex-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{pkg.title}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </div>
              <Badge className="bg-green-500">{pkg.discount}% OFF</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Price:</span>
                <div>
                  <span className="text-sm font-bold">₹{pkg.price.toFixed(2)}</span>
                  <span className="ml-2 text-xs line-through text-muted-foreground">
                    ₹{pkg.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tests Included:</span>
                <span className="text-sm">{pkg.tests}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Level:</span>
                <span className="text-sm">{pkg.level}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Access Period:</span>
                <span className="text-sm">{pkg.duration}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {isInCart ? (
              <Button className="w-full" variant="outline" asChild>
                <Link href="/cart">View in Cart</Link>
              </Button>
            ) : (
              <Button className="w-full" onClick={() => onAddToCart(pkg)}>
                Add to Cart
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
