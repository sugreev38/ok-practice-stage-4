import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, GraduationCap, Train } from "lucide-react"

export default function TestList() {
  const tests = [
    {
      id: 1,
      title: "Haryana Police Constable",
      progress: 75,
      status: "In Progress",
      lastAccessed: "2 days ago",
      category: "haryana",
    },
    {
      id: 2,
      title: "SSC CGL Tier 1",
      progress: 50,
      status: "In Progress",
      lastAccessed: "1 week ago",
      category: "central",
    },
    {
      id: 3,
      title: "Rajasthan Gram Sevak",
      progress: 30,
      status: "In Progress",
      lastAccessed: "3 days ago",
      category: "rajasthan",
    },
    {
      id: 4,
      title: "Railway Group D",
      progress: 10,
      status: "Just Started",
      lastAccessed: "Today",
      category: "railway",
    },
  ]

  // Get icon based on category
  const getIcon = (category: string) => {
    switch (category) {
      case "haryana":
      case "up":
      case "rajasthan":
        return <Building className="h-8 w-8" />
      case "railway":
        return <Train className="h-8 w-8" />
      case "central":
      default:
        return <GraduationCap className="h-8 w-8" />
    }
  }

  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <div key={test.id} className="flex items-center gap-4">
          <div className="rounded-lg bg-muted p-2">{getIcon(test.category)}</div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium leading-none">{test.title}</p>
              <Badge variant="outline">{test.status}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">Last accessed: {test.lastAccessed}</div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${test.progress}%` }} />
            </div>
          </div>
          <Button asChild size="sm">
            <Link href={`/dashboard/tests/${test.id}`}>Continue</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
