"use client"

import { useEffect, useState } from "react"

import { useControllableState } from "@radix-ui/react-use-controllable-state"

import { cn } from "@lib/utils"

import { motion } from "motion/react"

import { Icon } from "./Icon"

const themes = [
  {
    key: "system",
    icon: "Monitor",
    label: "System theme"
  },
  {
    key: "light",
    icon: "Sun",
    label: "Light theme"
  },
  {
    key: "dark",
    icon: "Moon",
    label: "Dark theme"
  }
] as const

export type ThemeSwitcherProps = {
  value?: "light" | "dark" | "system"
  onChange?: (theme: "light" | "dark" | "system") => void
  defaultValue: "light" | "dark" | "system"
  className?: string
}

const ThemeSwitcher = ({ value, onChange, defaultValue, className }: ThemeSwitcherProps) => {
  const [theme, setTheme] = useControllableState({
    defaultProp: defaultValue,
    prop: value,
    onChange
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        "bg-background ring-border relative flex h-8 rounded-full p-1 ring-1",
        className
      )}
    >
      {themes.map(({ key, icon, label }) => {
        const isActive = theme === key

        return (
          <button
            type="button"
            key={key}
            className="relative h-6 w-6 cursor-pointer rounded-full"
            onClick={() => setTheme(key)}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="bg-muted absolute inset-0 rounded-full"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              name={icon}
              className={cn(
                "relative m-auto h-4 w-4",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
export { ThemeSwitcher }
