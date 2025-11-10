import { createContext, useContext, useEffect, useRef, useState } from "react"

import { flushSync } from "react-dom"

import { useShallow } from "zustand/shallow"

import { useSettingsStore } from "@stores/useSettingsStore"

type Theme = "dark" | "light" | "system"

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: "dark" | "light"
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useSettingsStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme
    }))
  )

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return theme
  })

  const isFirstRender = useRef<boolean>(true)

  useEffect(() => {
    const root = window.document.documentElement
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)")

    const applyThemeWithAnimation = async (newTheme: "dark" | "light", shouldAnimate = true) => {
      const currentTheme = root.classList.contains("dark") ? "dark" : "light"
      if (currentTheme === newTheme) return

      setResolvedTheme(newTheme)

      if (!shouldAnimate || !document.startViewTransition) {
        root.classList.remove("light", "dark")
        root.classList.add(newTheme)
        return
      }

      try {
        await document.startViewTransition(() => {
          flushSync(() => {
            root.classList.remove("light", "dark")
            root.classList.add(newTheme)
          })
        }).ready

        const x = window.innerWidth / 2
        const y = 0
        const maxRad = Math.hypot(window.innerWidth, window.innerHeight)

        root.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRad}px at ${x}px ${y}px)`]
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)"
          }
        )
      } catch (error) {
        root.classList.remove("light", "dark")
        root.classList.add(newTheme)
      }
    }

    const applySystemTheme = () => {
      const systemTheme = matchMedia.matches ? "dark" : "light"
      applyThemeWithAnimation(systemTheme, !isFirstRender.current)
    }

    if (theme === "system") {
      applySystemTheme()
      matchMedia.addEventListener("change", applySystemTheme)

      isFirstRender.current = false

      return () => {
        matchMedia.removeEventListener("change", applySystemTheme)
      }
    }

    applyThemeWithAnimation(theme, !isFirstRender.current)

    isFirstRender.current = false
  }, [theme])

  const value = {
    theme,
    resolvedTheme,
    setTheme
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

export { ThemeProvider, useTheme }
