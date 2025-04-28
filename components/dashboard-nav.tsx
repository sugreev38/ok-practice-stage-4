"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  CreditCard,
  Package,
  Settings,
  User,
  Building,
  Shield,
  BookOpen,
  FileText,
  PenToolIcon as Tool,
  Award,
  Landmark,
  Train,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function DashboardNav({ className, ...props }: DashboardNavProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({})

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const toggleSubcategory = (subcategory: string) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [subcategory]: !prev[subcategory],
    }))
  }

  return (
    <div className={cn("flex flex-col gap-2 p-4", className)} {...props}>
      <div className="px-2 py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
        <nav className="grid gap-1 px-2 pt-2">
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard">
              <Package className="h-4 w-4" />
              Overview
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/tests">
              <Package className="h-4 w-4" />
              My Tests
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/results">
              <CalendarDays className="h-4 w-4" />
              Results
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/billing">
              <CreditCard className="h-4 w-4" />
              Billing
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/profile">
              <User className="h-4 w-4" />
              Profile
            </Link>
          </Button>
        </nav>
      </div>
      <div className="px-2 py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">Exam Categories</h2>
        <nav className="grid gap-1 px-2 pt-2">
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/packages">
              <Package className="h-4 w-4" />
              Test Packages
            </Link>
          </Button>

          {/* Haryana Exams */}
          <Collapsible open={openCategories["haryana"]}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="justify-between w-full" onClick={() => toggleCategory("haryana")}>
                <span className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Haryana Exams
                </span>
                {openCategories["haryana"] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1">
              {/* Haryana Police */}
              <Collapsible open={openSubcategories["haryana-police"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("haryana-police")}
                  >
                    <span className="flex items-center">
                      <Shield className="h-3 w-3 mr-2" />
                      Police
                    </span>
                    {openSubcategories["haryana-police"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=police&childCategory=police-constable">
                      <Shield className="h-2.5 w-2.5" />
                      Police Constable
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=police&childCategory=police-si">
                      <Shield className="h-2.5 w-2.5" />
                      Police SI
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=police&childCategory=police-head-constable">
                      <Shield className="h-2.5 w-2.5" />
                      Police Head Constable
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=police&childCategory=police-commando">
                      <Shield className="h-2.5 w-2.5" />
                      Police Commando
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=police&childCategory=police-driver">
                      <Shield className="h-2.5 w-2.5" />
                      Police Driver
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Haryana Teaching */}
              <Collapsible open={openSubcategories["haryana-teaching"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("haryana-teaching")}
                  >
                    <span className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-2" />
                      Teaching
                    </span>
                    {openSubcategories["haryana-teaching"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=teaching&childCategory=jbt-teacher">
                      <BookOpen className="h-2.5 w-2.5" />
                      JBT Teacher
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=teaching&childCategory=htet">
                      <BookOpen className="h-2.5 w-2.5" />
                      HTET
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=teaching&childCategory=pgt">
                      <BookOpen className="h-2.5 w-2.5" />
                      PGT
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=teaching&childCategory=tgt">
                      <BookOpen className="h-2.5 w-2.5" />
                      TGT
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=teaching&childCategory=ctet">
                      <BookOpen className="h-2.5 w-2.5" />
                      CTET
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Haryana Clerical */}
              <Collapsible open={openSubcategories["haryana-clerical"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("haryana-clerical")}
                  >
                    <span className="flex items-center">
                      <FileText className="h-3 w-3 mr-2" />
                      Clerical
                    </span>
                    {openSubcategories["haryana-clerical"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=clerical&childCategory=clerk">
                      <FileText className="h-2.5 w-2.5" />
                      Clerk
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=clerical&childCategory=gram-sachiv">
                      <FileText className="h-2.5 w-2.5" />
                      Gram Sachiv
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=clerical&childCategory=patwari">
                      <FileText className="h-2.5 w-2.5" />
                      Patwari
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=clerical&childCategory=kanungo">
                      <FileText className="h-2.5 w-2.5" />
                      Kanungo
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=clerical&childCategory=accountant">
                      <FileText className="h-2.5 w-2.5" />
                      Accountant
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Haryana Technical */}
              <Collapsible open={openSubcategories["haryana-technical"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("haryana-technical")}
                  >
                    <span className="flex items-center">
                      <Tool className="h-3 w-3 mr-2" />
                      Technical
                    </span>
                    {openSubcategories["haryana-technical"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=technical&childCategory=je-civil">
                      <Tool className="h-2.5 w-2.5" />
                      JE Civil
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=technical&childCategory=je-electrical">
                      <Tool className="h-2.5 w-2.5" />
                      JE Electrical
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=technical&childCategory=je-mechanical">
                      <Tool className="h-2.5 w-2.5" />
                      JE Mechanical
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=technical&childCategory=computer-operator">
                      <Tool className="h-2.5 w-2.5" />
                      Computer Operator
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=haryana&subcategory=technical&childCategory=draftsman">
                      <Tool className="h-2.5 w-2.5" />
                      Draftsman
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>

          {/* Rajasthan Exams */}
          <Collapsible open={openCategories["rajasthan"]}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="justify-between w-full" onClick={() => toggleCategory("rajasthan")}>
                <span className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Rajasthan Exams
                </span>
                {openCategories["rajasthan"] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1">
              {/* Rajasthan Police */}
              <Collapsible open={openSubcategories["rajasthan-police"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("rajasthan-police")}
                  >
                    <span className="flex items-center">
                      <Shield className="h-3 w-3 mr-2" />
                      Police
                    </span>
                    {openSubcategories["rajasthan-police"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=police&childCategory=police-constable">
                      <Shield className="h-2.5 w-2.5" />
                      Police Constable
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=police&childCategory=police-si">
                      <Shield className="h-2.5 w-2.5" />
                      Police SI
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=police&childCategory=police-head-constable">
                      <Shield className="h-2.5 w-2.5" />
                      Police Head Constable
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=police&childCategory=police-driver">
                      <Shield className="h-2.5 w-2.5" />
                      Police Driver
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=police&childCategory=police-wireless-operator">
                      <Shield className="h-2.5 w-2.5" />
                      Police Wireless Operator
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Rajasthan Teaching */}
              <Collapsible open={openSubcategories["rajasthan-teaching"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("rajasthan-teaching")}
                  >
                    <span className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-2" />
                      Teaching
                    </span>
                    {openSubcategories["rajasthan-teaching"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=teaching&childCategory=reet-level-1">
                      <BookOpen className="h-2.5 w-2.5" />
                      REET Level 1
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=teaching&childCategory=reet-level-2">
                      <BookOpen className="h-2.5 w-2.5" />
                      REET Level 2
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=teaching&childCategory=senior-teacher">
                      <BookOpen className="h-2.5 w-2.5" />
                      Senior Teacher
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=teaching&childCategory=grade-ii-teacher">
                      <BookOpen className="h-2.5 w-2.5" />
                      Grade II Teacher
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=teaching&childCategory=grade-iii-teacher">
                      <BookOpen className="h-2.5 w-2.5" />
                      Grade III Teacher
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Rajasthan Clerical */}
              <Collapsible open={openSubcategories["rajasthan-clerical"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("rajasthan-clerical")}
                  >
                    <span className="flex items-center">
                      <FileText className="h-3 w-3 mr-2" />
                      Clerical
                    </span>
                    {openSubcategories["rajasthan-clerical"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=clerical&childCategory=ldc">
                      <FileText className="h-2.5 w-2.5" />
                      LDC
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=clerical&childCategory=udc">
                      <FileText className="h-2.5 w-2.5" />
                      UDC
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=clerical&childCategory=gram-sevak">
                      <FileText className="h-2.5 w-2.5" />
                      Gram Sevak
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=clerical&childCategory=patwari">
                      <FileText className="h-2.5 w-2.5" />
                      Patwari
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=clerical&childCategory=stenographer">
                      <FileText className="h-2.5 w-2.5" />
                      Stenographer
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Rajasthan Technical */}
              <Collapsible open={openSubcategories["rajasthan-technical"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("rajasthan-technical")}
                  >
                    <span className="flex items-center">
                      <Tool className="h-3 w-3 mr-2" />
                      Technical
                    </span>
                    {openSubcategories["rajasthan-technical"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=technical&childCategory=je-civil">
                      <Tool className="h-2.5 w-2.5" />
                      JE Civil
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=technical&childCategory=je-electrical">
                      <Tool className="h-2.5 w-2.5" />
                      JE Electrical
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=technical&childCategory=je-mechanical">
                      <Tool className="h-2.5 w-2.5" />
                      JE Mechanical
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=technical&childCategory=technical-helper">
                      <Tool className="h-2.5 w-2.5" />
                      Technical Helper
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=rajasthan&subcategory=technical&childCategory=lab-assistant">
                      <Tool className="h-2.5 w-2.5" />
                      Lab Assistant
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>

          {/* UP Exams */}
          <Collapsible open={openCategories["up"]}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="justify-between w-full" onClick={() => toggleCategory("up")}>
                <span className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  UP Exams
                </span>
                {openCategories["up"] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1">
              {/* UP Police */}
              <Collapsible open={openSubcategories["up-police"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("up-police")}
                  >
                    <span className="flex items-center">
                      <Shield className="h-3 w-3 mr-2" />
                      Police
                    </span>
                    {openSubcategories["up-police"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=police&childCategory=police-constable">
                      <Shield className="h-2.5 w-2.5" />
                      Police Constable
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=police&childCategory=police-si">
                      <Shield className="h-2.5 w-2.5" />
                      Police SI
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=police&childCategory=head-constable">
                      <Shield className="h-2.5 w-2.5" />
                      Head Constable
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=police&childCategory=fireman">
                      <Shield className="h-2.5 w-2.5" />
                      Fireman
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=police&childCategory=jail-warder">
                      <Shield className="h-2.5 w-2.5" />
                      Jail Warder
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* UP Teaching */}
              <Collapsible open={openSubcategories["up-teaching"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("up-teaching")}
                  >
                    <span className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-2" />
                      Teaching
                    </span>
                    {openSubcategories["up-teaching"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=teaching&childCategory=uptet">
                      <BookOpen className="h-2.5 w-2.5" />
                      UPTET
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=teaching&childCategory=assistant-teacher">
                      <BookOpen className="h-2.5 w-2.5" />
                      Assistant Teacher
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=teaching&childCategory=tgt">
                      <BookOpen className="h-2.5 w-2.5" />
                      TGT
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=teaching&childCategory=pgt">
                      <BookOpen className="h-2.5 w-2.5" />
                      PGT
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=teaching&childCategory=shiksha-mitra">
                      <BookOpen className="h-2.5 w-2.5" />
                      Shiksha Mitra
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* UP Clerical */}
              <Collapsible open={openSubcategories["up-clerical"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("up-clerical")}
                  >
                    <span className="flex items-center">
                      <FileText className="h-3 w-3 mr-2" />
                      Clerical
                    </span>
                    {openSubcategories["up-clerical"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=clerical&childCategory=lekhpal">
                      <FileText className="h-2.5 w-2.5" />
                      Lekhpal
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=clerical&childCategory=vdo">
                      <FileText className="h-2.5 w-2.5" />
                      VDO
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=clerical&childCategory=revenue-inspector">
                      <FileText className="h-2.5 w-2.5" />
                      Revenue Inspector
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=clerical&childCategory=clerk">
                      <FileText className="h-2.5 w-2.5" />
                      Clerk
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=clerical&childCategory=stenographer">
                      <FileText className="h-2.5 w-2.5" />
                      Stenographer
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* UP Technical */}
              <Collapsible open={openSubcategories["up-technical"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("up-technical")}
                  >
                    <span className="flex items-center">
                      <Tool className="h-3 w-3 mr-2" />
                      Technical
                    </span>
                    {openSubcategories["up-technical"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=technical&childCategory=je-civil">
                      <Tool className="h-2.5 w-2.5" />
                      JE Civil
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=technical&childCategory=je-electrical">
                      <Tool className="h-2.5 w-2.5" />
                      JE Electrical
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=technical&childCategory=je-mechanical">
                      <Tool className="h-2.5 w-2.5" />
                      JE Mechanical
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=technical&childCategory=technical-assistant">
                      <Tool className="h-2.5 w-2.5" />
                      Technical Assistant
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=up&subcategory=technical&childCategory=lab-technician">
                      <Tool className="h-2.5 w-2.5" />
                      Lab Technician
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>

          {/* Central Government Exams */}
          <Collapsible open={openCategories["central"]}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="justify-between w-full" onClick={() => toggleCategory("central")}>
                <span className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Central Govt Exams
                </span>
                {openCategories["central"] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1">
              {/* SSC */}
              <Collapsible open={openSubcategories["ssc"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("ssc")}
                  >
                    <span className="flex items-center">
                      <Award className="h-3 w-3 mr-2" />
                      SSC
                    </span>
                    {openSubcategories["ssc"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=ssc&childCategory=cgl">
                      <Award className="h-2.5 w-2.5" />
                      CGL
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=ssc&childCategory=chsl">
                      <Award className="h-2.5 w-2.5" />
                      CHSL
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=ssc&childCategory=mts">
                      <Award className="h-2.5 w-2.5" />
                      MTS
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=ssc&childCategory=cpo">
                      <Award className="h-2.5 w-2.5" />
                      CPO
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=ssc&childCategory=gd-constable">
                      <Award className="h-2.5 w-2.5" />
                      GD Constable
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Banking */}
              <Collapsible open={openSubcategories["banking"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("banking")}
                  >
                    <span className="flex items-center">
                      <Landmark className="h-3 w-3 mr-2" />
                      Banking
                    </span>
                    {openSubcategories["banking"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=banking&childCategory=po">
                      <Landmark className="h-2.5 w-2.5" />
                      PO
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=banking&childCategory=clerk">
                      <Landmark className="h-2.5 w-2.5" />
                      Clerk
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=banking&childCategory=so">
                      <Landmark className="h-2.5 w-2.5" />
                      SO
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=banking&childCategory=rrb">
                      <Landmark className="h-2.5 w-2.5" />
                      RRB
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=banking&childCategory=nabard">
                      <Landmark className="h-2.5 w-2.5" />
                      NABARD
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Railway */}
              <Collapsible open={openSubcategories["railway"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("railway")}
                  >
                    <span className="flex items-center">
                      <Train className="h-3 w-3 mr-2" />
                      Railway
                    </span>
                    {openSubcategories["railway"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=railway&childCategory=group-d">
                      <Train className="h-2.5 w-2.5" />
                      Group D
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=railway&childCategory=ntpc">
                      <Train className="h-2.5 w-2.5" />
                      NTPC
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=railway&childCategory=alp">
                      <Train className="h-2.5 w-2.5" />
                      ALP
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=railway&childCategory=je">
                      <Train className="h-2.5 w-2.5" />
                      JE
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=railway&childCategory=station-master">
                      <Train className="h-2.5 w-2.5" />
                      Station Master
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Defense */}
              <Collapsible open={openSubcategories["defense"]}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between w-full h-8 text-sm"
                    onClick={() => toggleSubcategory("defense")}
                  >
                    <span className="flex items-center">
                      <Shield className="h-3 w-3 mr-2" />
                      Defense
                    </span>
                    {openSubcategories["defense"] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=defense&childCategory=nda">
                      <Shield className="h-2.5 w-2.5" />
                      NDA
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=defense&childCategory=cds">
                      <Shield className="h-2.5 w-2.5" />
                      CDS
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=defense&childCategory=afcat">
                      <Shield className="h-2.5 w-2.5" />
                      AFCAT
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=defense&childCategory=airmen">
                      <Shield className="h-2.5 w-2.5" />
                      Airmen
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start gap-2 h-7 text-xs">
                    <Link href="/tests?category=central&subcategory=defense&childCategory=navy-sailor">
                      <Shield className="h-2.5 w-2.5" />
                      Navy Sailor
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </div>
    </div>
  )
}
