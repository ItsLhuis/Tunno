import { forwardRef, useState, type ComponentProps, type FocusEvent } from "react"

import { cn } from "@lib/utils"

import { Button } from "@components/ui/Button"
import { Icon } from "@components/ui/Icon"

import { motion } from "motion/react"

type SearchInputProps = ComponentProps<"input"> & {
  renderRight?: React.ReactNode
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ type, className, renderRight, onFocus, onBlur, ...props }, ref) => {
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
      <div className="flex items-center w-full overflow-hidden">
        <div
          className={cn(
            "flex items-center gap-3 shrink-0 w-full rounded-md border border-input bg-transparent px-1 py-1 text-sm transition-[background-color,border-color,text-decoration-color,fill,stroke] placeholder:text-muted-foreground",
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
            className="w-full h-9 bg-transparent border-none outline-none selection:bg-primary selection:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            autoComplete="off"
          />
          <div className="shrink-0">{renderRight}</div>
        </div>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: isFocused ? 1 : 0, width: isFocused ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
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
