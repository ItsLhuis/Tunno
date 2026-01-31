import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react"

import { flushSync } from "react-dom"

import { useSettingsStore } from "@stores/useSettingsStore"

/**
 * Defines the available theme modes for the application.
 */
type Theme = "dark" | "light" | "system"

/**
 * Represents the state and actions provided by the {@link ThemeProviderContext}.
 */
type ThemeProviderState = {
  theme: Theme
  resolvedTheme: "dark" | "light"
  setTheme: (theme: Theme) => void
}

/**
 * React Context for providing theme-related state and actions across the component tree.
 * Consumers can use `useTheme` hook to access this context.
 */
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

/**
 * Provides theme-related state and functionality to its children components.
 *
 * This provider manages the application's theme preference ("dark", "light", "system")
 * and applies the resolved theme to the document's root element. It uses
 * `window.matchMedia` for "system" theme resolution and, notably, leverages the
 * experimental `document.startViewTransition` API for smooth, animated theme transitions.
 * Theme preference is persisted via `useSettingsStore`.
 *
 * @param children - React children to be rendered within this provider's context.
 */
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useSettingsStore((state) => state.theme)
  const setTheme = useSettingsStore((state) => state.setTheme)

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
      } catch {
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

/**
 * Custom hook to access the theme context provided by {@link ThemeProvider}.
 *
 * @returns The theme state and actions.
 * @throws {Error} If `useTheme` is used outside of a `ThemeProvider`.
 */
function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (!context) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

export { ThemeProvider, useTheme }
