import { forwardRef, useState, type ComponentProps, type FocusEvent, type ReactNode } from "react"

import { cn } from "@lib/utils"

import { Button } from "@components/ui/Button"
import { Icon } from "@components/ui/Icon"

import { motion } from "motion/react"

type SearchInputProps = ComponentProps<"input"> & {
  containerClassName?: string
  renderRight?: ReactNode
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ containerClassName, renderRight, type, className, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (onFocus) onFocus(e)
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (onBlur) onBlur(e)
    }

    return (
      <div className={cn("flex w-full items-center overflow-hidden", containerClassName)}>
        <div
          className={cn(
            "flex w-full shrink-0 items-center gap-3 rounded-md border border-input bg-transparent px-1 py-1 text-sm transition-[background-color,border-color,text-decoration-color,fill,stroke] placeholder:text-muted-foreground",
            isFocused &&
              "focus-within:border-primary focus-within:ring-primary focus-within:ring-offset-background",
            className
          )}
        >
          <Icon name="Search" className="ml-2 transition-colors" />
          <input
            type={type}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
            className="h-9 w-full border-none bg-transparent outline-none selection:bg-primary selection:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            autoComplete="off"
          />
          <div className="shrink-0">{renderRight}</div>
        </div>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: isFocused ? 1 : 0, width: isFocused ? "auto" : 0 }}
        >
          <Button tabIndex={-1} variant="text" className="ml-2">
            Cancel
          </Button>
        </motion.div>
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
