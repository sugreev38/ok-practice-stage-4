import { create } from "zustand"

// Define the types for our store
export interface CartItem {
  id: number
  title: string
  description: string
  price: number
  duration: number
  questions: number
}

export interface PurchasedTest {
  id: number
  title: string
  description: string
  price: number
  duration: number
  questions: number
  status: string
  completed: boolean
  purchaseDate: string
  score?: number
  percentage?: number
}

export interface StoreState {
  cartItems: CartItem[]
  purchasedTests: PurchasedTest[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  addPurchasedTest: (tests: PurchasedTest[]) => void
  updateTestStatus: (id: number, status: string, completed: boolean) => void
}

// Create the store
export const useStore = create<StoreState>((set) => ({
  cartItems: [],
  purchasedTests: [],

  addToCart: (item) =>
    set((state) => {
      // Check if item already exists in cart
      if (state.cartItems.some((cartItem) => cartItem.id === item.id)) {
        return state // Don't add duplicates
      }
      return { cartItems: [...state.cartItems, item] }
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  addPurchasedTest: (tests) =>
    set((state) => {
      // Filter out any tests that are already in the purchased tests array
      const newTests = tests.filter((test) => !state.purchasedTests.some((pt) => pt.id === test.id))

      return {
        purchasedTests: [...state.purchasedTests, ...newTests],
      }
    }),

  updateTestStatus: (id, status, completed) =>
    set((state) => ({
      purchasedTests: state.purchasedTests.map((test) => (test.id === id ? { ...test, status, completed } : test)),
    })),
}))
