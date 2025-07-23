"use client"

import { forwardRef, useState, type ChangeEvent, type InputHTMLAttributes } from "react"

import { cn } from "@lib/utils"

import { IconButton } from "@components/ui/IconButton"
import { TextInput } from "@components/ui/TextInput"

export type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  min?: number
  max?: number
  step?: number
  onChange?: (value: number | undefined) => void
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, min, max, step = 1, onChange, value, defaultValue, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState<number | undefined>(
      defaultValue ? Number(defaultValue) : undefined
    )

    const currentValue = value !== undefined ? Number(value) : internalValue
    const isControlled = value !== undefined

    const handleValueChange = (newValue: number | undefined) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const handleIncrement = () => {
      if (disabled) return

      const current = currentValue || 0
      const newValue = max !== undefined ? Math.min(current + step, max) : current + step
      handleValueChange(newValue)
    }

    const handleDecrement = () => {
      if (disabled) return

      const current = currentValue || 0
      const newValue = min !== undefined ? Math.max(current - step, min) : current - step
      handleValueChange(newValue)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value

      if (inputValue === "") {
        handleValueChange(undefined)
        return
      }

      const numValue = Number(inputValue)
      if (!isNaN(numValue)) {
        let clampedValue = numValue
        if (min !== undefined) clampedValue = Math.max(clampedValue, min)
        if (max !== undefined) clampedValue = Math.min(clampedValue, max)
        handleValueChange(clampedValue)
      }
    }

    const canDecrement = !disabled && (min === undefined || (currentValue || 0) > min)
    const canIncrement = !disabled && (max === undefined || (currentValue || 0) < max)

    return (
      <div
        className={cn(
          "flex h-9 w-full overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background transition-[background-color,border-color,text-decoration-color,fill,stroke,opacity] focus-within:border-primary focus-within:ring-primary focus-within:ring-offset-background focus-visible:outline-none",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <IconButton
          variant="ghost"
          name="Minus"
          onClick={handleDecrement}
          disabled={!canDecrement}
          className="h-full rounded-none border-r"
        />
        <TextInput
          ref={ref}
          type="number"
          value={currentValue ?? ""}
          onChange={handleInputChange}
          className="flex-1 border-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          {...props}
        />
        <IconButton
          variant="ghost"
          name="Plus"
          onClick={handleIncrement}
          disabled={!canIncrement}
          className="h-full rounded-none border-l"
        />
      </div>
    )
  }
)

export { NumberInput }
