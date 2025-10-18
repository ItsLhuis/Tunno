import { createContext, useContext, type ReactNode } from "react"

import { cn } from "@lib/utils"

type ThemeMode = "light" | "dark"

export type ScopedThemeContextType = {
  theme: ThemeMode
}

export type ScopedThemeProps = {
  children: ReactNode
  theme: ThemeMode
  className?: string
}

const ScopedThemeContext = createContext<ScopedThemeContextType | null>(null)

const ScopedTheme = ({ children, theme, className }: ScopedThemeProps) => {
  return (
    <ScopedThemeContext.Provider value={{ theme }}>
      <div className={cn(theme === "dark" ? "dark" : "", className)}>{children}</div>
    </ScopedThemeContext.Provider>
  )
}

const useScopedTheme = (): ThemeMode | null => {
  const context = useContext(ScopedThemeContext)
  return context?.theme || null
}

const withScopedTheme = <P extends object>(
  Component: React.ComponentType<P>,
  getThemedProps: (props: P, theme: ThemeMode | null) => P
) => {
  const ThemedComponent = (props: P) => {
    const scopedTheme = useScopedTheme()
    const themedProps = getThemedProps(props, scopedTheme)

    return <Component {...themedProps} />
  }

  ThemedComponent.displayName = `withScopedTheme(${Component.displayName || Component.name})`

  return ThemedComponent
}

export { ScopedTheme, useScopedTheme, withScopedTheme }
