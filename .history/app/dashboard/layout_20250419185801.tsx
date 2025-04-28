import type React from "react"
import{ ProtectedRoute } from "@/components/protected-route"
import useSWR from 'swr'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}
