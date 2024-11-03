import { useState, useEffect } from "react"

import { Appearance } from "react-native"

import { colors } from "@constants/colors"

export function useThemeColor() {
  const [isThemeChanging, setIsThemeChanging] = useState(false)

  const [theme, setTheme] = useState(Appearance.getColorScheme() || "light")

  useEffect(() => {
    const handleThemeChange = (preferences: {
      colorScheme: "light" | "dark" | null | undefined
    }) => {
      const { colorScheme } = preferences

      if (colorScheme && colorScheme !== theme) {
        setIsThemeChanging(true)

        setTheme(colorScheme)

        const timeoutId = setTimeout(() => {
          setIsThemeChanging(false)
        }, 100)

        return () => clearTimeout(timeoutId)
      }
    }

    const listener = Appearance.addChangeListener(handleThemeChange)
    return () => listener.remove()
  }, [theme])

  return { colors: colors[theme], isThemeChanging }
}
