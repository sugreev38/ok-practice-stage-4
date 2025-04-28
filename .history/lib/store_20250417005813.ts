import { create } from "zustand"
import { persist } from "zustand/middleware"
import { create } from 'zustand'
// Auth store
interface User {
  id: string
  name: string
  email: string
  phone?: string
  isVerified: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  authError: string | null
  setUser: (user: User | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setAuthError: (error: string | null) => void
  clearUser: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      authError: null,
      setUser: (user) => set({ user, isAuthenticated: !!user, authError: null }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setAuthError: (authError) => set({ authError }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      logout: () => {
        // Clear auth token from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token")
        }
        // Reset auth state
        set({ user: null, isAuthenticated: false, authError: null })
      },
    }),
    {
      name: "auth-storage",
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

// Cart store
export interface CartItem {
  id: string | number
  title: string
  description: string
  price: number
  isPackage?: boolean
  testIds?: number[]
}

interface CartState {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string | number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const { cartItems } = get()
        // Check if item already exists
        const exists = cartItems.some((i) => i.id === item.id)
        if (!exists) {
          set({ cartItems: [...cartItems, item] })
        }
      },
      removeFromCart: (id) => {
        const { cartItems } = get()
        set({ cartItems: cartItems.filter((item) => item.id !== id) })
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
)

// Test store
export interface Test {
  id: number
  title: string
  description: string
  price: number
  duration: number
  questions: number
  status: string
  completed: boolean
  purchaseDate: string
}

export interface TestResult {
  testId: number
  score: number
  totalQuestions: number
  percentage: number
  answers: string[]
  timeTaken?: number
  completedAt: string
}

interface TestState {
  purchasedTests: Test[]
  testResults: TestResult[]
  addPurchasedTest: (tests: Test[]) => void
  updateTestStatus: (testId: number, status: string, completed: boolean) => void
  saveTestResult: (result: TestResult) => void
  getTestResult: (testId: number) => TestResult | undefined
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      purchasedTests: [],
      testResults: [],
      addPurchasedTest: (tests) => {
        set((state) => ({
          purchasedTests: [...state.purchasedTests, ...tests],
        }))
      },
      updateTestStatus: (testId, status, completed) => {
        set((state) => ({
          purchasedTests: state.purchasedTests.map((test) =>
            test.id === testId ? { ...test, status, completed } : test,
          ),
        }))
      },
      saveTestResult: (result) => {
        const { testResults } = get()
        const existingIndex = testResults.findIndex((r) => r.testId === result.testId)

        if (existingIndex !== -1) {
          // Update existing result
          const updatedResults = [...testResults]
          updatedResults[existingIndex] = result
          set({ testResults: updatedResults })
        } else {
          // Add new result
          set({ testResults: [...testResults, result] })
        }
      },
      getTestResult: (testId) => {
        const { testResults } = get()
        return testResults.find((result) => result.testId === testId)
      },
    }),
    {
      name: "test-storage",
    },
  ),
)


// For backward compatibility
export const useStore = useAuthStore
