"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

type User = {
  id: string
  name: string | null
  email: string
  isVerified: boolean
}

type AuthContextType = {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for token in localStorage on initial load
    const token = localStorage.getItem("auth_token")
    if (token) {
      try {
        const decoded = jwtDecode<User>(token)

        // Only set user if they are verified
        if (decoded.isVerified) {
          setUser(decoded)
        } else {
          // If not verified, clear token
          localStorage.removeItem("auth_token")
        }
      } catch (error) {
        console.error("Failed to decode token:", error)
        localStorage.removeItem("auth_token")
      }
    }
    setLoading(false)
  }, [])

  const login = (token: string) => {
    localStorage.setItem("auth_token", token)
    try {
      const decoded = jwtDecode<User>(token)
      setUser(decoded)
    } catch (error) {
      console.error("Failed to decode token:", error)
    }
  }

  const logout = async () => {
    localStorage.removeItem("auth_token")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
