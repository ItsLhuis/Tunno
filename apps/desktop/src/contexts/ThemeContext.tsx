import { createContext, useContext, useEffect, useState } from "react"

import { getSettingsStore } from "@tauri/stores/settings"

type Theme = "dark" | "light" | "system"

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")

  useEffect(() => {
    async function loadTheme() {
      const store = await getSettingsStore()
      const storedTheme = await store.get<string>("theme")

      if (storedTheme && ["dark", "light", "system"].includes(storedTheme)) {
        setTheme(storedTheme as Theme)
      } else {
        setTheme("system")
        await store.set("theme", "system")
      }
    }

    loadTheme()
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)")

    const applySystemTheme = () => {
      const systemTheme = matchMedia.matches ? "dark" : "light"
      root.classList.remove("light", "dark")
      root.classList.add(systemTheme)
    }

    if (theme === "system") {
      applySystemTheme()
      matchMedia.addEventListener("change", applySystemTheme)
      return () => {
        matchMedia.removeEventListener("change", applySystemTheme)
      }
    }

    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: async (theme: Theme) => {
      const store = await getSettingsStore()
      await store.set("theme", theme)
      setTheme(theme)
    }
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
