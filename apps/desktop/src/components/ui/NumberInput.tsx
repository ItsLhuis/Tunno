"use client"

import { useState, type ChangeEvent, type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { IconButton } from "@components/ui/IconButton"
import { Separator } from "@components/ui/Separator"
import { TextInput } from "@components/ui/TextInput"

export type NumberInputProps = Omit<ComponentProps<"input">, "type" | "onChange"> & {
  min?: number
  max?: number
  step?: number
  onChange?: (value: number | undefined) => void
  format?: (value: number | undefined) => string
  parse?: (raw: string) => number | undefined
}

const NumberInput = ({
  className,
  min,
  max,
  step = 1,
  onChange,
  value,
  defaultValue,
  disabled,
  format,
  parse,
  ref,
  ...props
}: NumberInputProps) => {
  const [internalValue, setInternalValue] = useState<number | undefined>(
    defaultValue !== undefined ? Number(defaultValue) : undefined
  )

  const isControlled = value !== undefined
  const currentValue = isControlled ? Number(value) : internalValue

  const displayValue =
    format && currentValue !== undefined ? format(currentValue) : (currentValue?.toString() ?? "")

  const handleValueChange = (newValue: number | undefined) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleIncrement = () => {
    if (disabled) return
    const current = currentValue ?? 0
    const newValue = max !== undefined ? Math.min(current + step, max) : current + step
    handleValueChange(newValue)
  }

  const handleDecrement = () => {
    if (disabled) return
    const current = currentValue ?? 0
    const newValue = min !== undefined ? Math.max(current - step, min) : current - step
    handleValueChange(newValue)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    if (rawValue === "") {
      handleValueChange(undefined)
      return
    }

    const parsed = parse ? parse(rawValue) : Number(rawValue)
    if (typeof parsed === "number" && !isNaN(parsed)) {
      let clamped = parsed
      if (min !== undefined) clamped = Math.max(clamped, min)
      if (max !== undefined) clamped = Math.min(clamped, max)
      handleValueChange(clamped)
    }
  }

  const canDecrement = !disabled && (min === undefined || (currentValue ?? 0) > min)
  const canIncrement = !disabled && (max === undefined || (currentValue ?? 0) < max)

  return (
    <div
      className={cn(
        "border-input bg-background ring-offset-background focus-within:border-primary focus-within:ring-primary focus-within:ring-offset-background flex h-9 w-full overflow-hidden rounded-md border text-sm transition",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <IconButton
        variant="outline"
        name="Minus"
        onClick={handleDecrement}
        disabled={!canDecrement}
        className="h-full rounded-none border-none"
      />
      <Separator orientation="vertical" />
      <TextInput
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        className="flex-1 [appearance:textfield] rounded-none border-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        disabled={disabled}
        {...props}
      />
      <Separator orientation="vertical" />
      <IconButton
        variant="outline"
        name="Plus"
        onClick={handleIncrement}
        disabled={!canIncrement}
        className="h-full rounded-none border-none"
      />
    </div>
  )
}

export { NumberInput }
