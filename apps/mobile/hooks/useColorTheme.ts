import { useEffect, useState } from "react"

import { Appearance } from "react-native"

import { colors } from "@constants/colors"

export function useColorTheme() {
  const [isThemeChanging, setIsThemeChanging] = useState<boolean>(false)

  const [theme, setTheme] = useState<"light" | "dark">(Appearance.getColorScheme() || "light")

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

  return { appTheme: theme, colors: colors[theme], isAppThemeChanging: isThemeChanging }
}
