"use client"

import { useState, type ComponentProps, type FocusEvent, type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { Button } from "@components/ui/Button"
import { Icon } from "@components/ui/Icon"

import { motion } from "motion/react"

type SearchInputProps = ComponentProps<"input"> & {
  containerClassName?: string
  renderRight?: ReactNode
}

const SearchInput = ({
  placeholder,
  containerClassName,
  renderRight,
  type,
  className,
  onFocus,
  onBlur,
  ...props
}: SearchInputProps) => {
  const { t } = useTranslation()

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (onFocus) onFocus(event)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (onBlur) onBlur(event)
  }

  return (
    <div className={cn("flex w-full items-center overflow-hidden", containerClassName)}>
      <div
        className={cn(
          "border-input placeholder:text-muted-foreground bg-sidebar/75 flex w-full shrink-0 items-center gap-3 rounded-md border px-1 py-1 text-sm transition-colors",
          isFocused && "focus-within:border-primary",
          className
        )}
      >
        <Icon name="Search" className="ml-2 transition-colors" />
        <input
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder ?? t("common.search")}
          {...props}
          className="selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 border-none bg-transparent text-base transition-opacity outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          autoComplete="off"
        />
        <div className="shrink-0">{renderRight}</div>
      </div>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: isFocused ? 1 : 0, width: isFocused ? "auto" : 0 }}
      >
        <Button tabIndex={-1} variant="text" className="ml-2">
          {t("common.cancel")}
        </Button>
      </motion.div>
    </div>
  )
}

export { SearchInput }
