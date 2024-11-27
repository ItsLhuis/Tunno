import { createContext, useContext, useEffect, useState } from "react"

import { mainWindow } from "@/utils/window/main"
import { overlayWindow } from "@/utils/window/overlay"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    mainWindow.setTheme(theme !== "system" ? theme : undefined)
    overlayWindow?.setTheme(theme !== "system" ? theme : undefined)
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
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
      mainWindow.setTheme(theme !== "system" ? theme : undefined)
      overlayWindow?.setTheme(theme !== "system" ? theme : undefined)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
