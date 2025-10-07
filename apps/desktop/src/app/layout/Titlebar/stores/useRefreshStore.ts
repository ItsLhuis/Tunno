import { create } from "zustand"

type RefreshFunction = () => Promise<void> | void

type RefreshState = {
  refreshFunctions: RefreshFunction[]
  isLoading: boolean
  tooltip: string
  canRefresh: boolean
  showSuccess: boolean
  showError: boolean
}

type RefreshActions = {
  registerRefresh: (refreshFn: RefreshFunction, tooltip?: string) => void
  unregisterRefresh: (refreshFn: RefreshFunction) => void
  clearAll: () => void
  executeRefresh: () => Promise<void>
  setSuccess: (show: boolean) => void
  setError: (show: boolean) => void
  resetFeedback: () => void
}

type RefreshStore = RefreshState & RefreshActions

export const useRefreshStore = create<RefreshStore>((set, get) => ({
  refreshFunctions: [],
  isLoading: false,
  tooltip: "",
  canRefresh: false,
  showSuccess: false,
  showError: false,
  registerRefresh: (refreshFn, tooltip) => {
    set((state) => ({
      refreshFunctions: [...state.refreshFunctions, refreshFn],
      tooltip,
      canRefresh: true
    }))
  },
  unregisterRefresh: (refreshFn) => {
    set((state) => {
      const newFunctions = state.refreshFunctions.filter((fn) => fn !== refreshFn)
      return {
        refreshFunctions: newFunctions,
        canRefresh: newFunctions.length > 0,
        tooltip: newFunctions.length === 0 ? "" : state.tooltip
      }
    })
  },
  clearAll: () => {
    set({
      refreshFunctions: [],
      isLoading: false,
      tooltip: "",
      canRefresh: false,
      showSuccess: false,
      showError: false
    })
  },
  executeRefresh: async () => {
    const { refreshFunctions, isLoading, showSuccess, showError } = get()

    if (refreshFunctions.length === 0 || isLoading || showSuccess || showError) return

    set({ isLoading: true, showSuccess: false, showError: false })

    try {
      await Promise.all(refreshFunctions.map((fn) => fn()))

      set({ isLoading: false, showSuccess: true })

      setTimeout(() => {
        set({ showSuccess: false })
      }, 1000)
    } catch (error) {
      console.error("RefreshStore: Error during refresh:", error)

      set({ isLoading: false, showError: true })

      setTimeout(() => {
        set({ showError: false })
      }, 1000)
    }
  },
  setSuccess: (show) => set({ showSuccess: show }),
  setError: (show) => set({ showError: show }),
  resetFeedback: () => set({ showSuccess: false, showError: false })
}))
