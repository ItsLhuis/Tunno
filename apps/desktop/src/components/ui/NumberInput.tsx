"use client"

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type KeyboardEvent
} from "react"

import { cn } from "@lib/utils"

import { debounce } from "lodash"

import { IconButton } from "@components/ui/IconButton"
import { Separator } from "@components/ui/Separator"
import { TextInput } from "@components/ui/TextInput"

export type NumberInputProps = Omit<ComponentProps<"input">, "type" | "onChange" | "value"> & {
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number | undefined) => void
  format?: (value: number | undefined) => string
  parse?: (raw: string) => number | undefined
  allowUndefined?: boolean
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
  allowUndefined = true,
  ...props
}: NumberInputProps) => {
  const [internalValue, setInternalValue] = useState<number | undefined>(
    defaultValue !== undefined ? Number(defaultValue) : undefined
  )

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  // Estado separado para o que é exibido no input
  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (currentValue !== undefined) {
      return format ? format(currentValue) : String(currentValue)
    }
    return ""
  })

  const [isFocused, setIsFocused] = useState(false)

  const debouncedOnChange = useMemo(
    () => (onChange ? debounce(onChange, 300) : undefined),
    [onChange]
  )

  useEffect(() => {
    return () => {
      debouncedOnChange?.cancel()
    }
  }, [debouncedOnChange])

  useEffect(() => {
    if (!isFocused && currentValue !== undefined) {
      const formatted = format ? format(currentValue) : String(currentValue)
      setDisplayValue(formatted)
    } else if (!isFocused && currentValue === undefined) {
      setDisplayValue("")
    }
  }, [currentValue, format, isFocused])

  const handleValueChange = (newValue: number | undefined) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleValueChangeDebounced = (newValue: number | undefined) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }

    debouncedOnChange?.(newValue)
  }

  const clampValue = (val: number): number => {
    let clamped = val
    if (min !== undefined) clamped = Math.max(clamped, min)
    if (max !== undefined) clamped = Math.min(clamped, max)
    return clamped
  }

  const handleIncrement = () => {
    if (disabled) return
    const current = currentValue ?? min ?? 0
    const newValue = clampValue(current + step)
    handleValueChange(newValue)
  }

  const handleDecrement = () => {
    if (disabled) return
    const current = currentValue ?? min ?? 0
    const newValue = clampValue(current - step)
    handleValueChange(newValue)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value

    setDisplayValue(rawValue)

    if (rawValue === "") {
      handleValueChange(undefined)
      return
    }

    const parsed = parse ? parse(rawValue) : Number(rawValue)

    if (typeof parsed === "number" && !isNaN(parsed)) {
      handleValueChange(parsed)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)

    if (currentValue !== undefined) {
      setDisplayValue(String(currentValue))
    }
  }

  const handleBlur = () => {
    setIsFocused(false)

    if (displayValue === "") {
      handleValueChange(undefined)
      setDisplayValue("")
      return
    }

    const parsed = parse ? parse(displayValue) : Number(displayValue)

    if (typeof parsed === "number" && !isNaN(parsed)) {
      const clamped = clampValue(parsed)
      handleValueChange(clamped)

      const formatted = format ? format(clamped) : String(clamped)
      setDisplayValue(formatted)
    } else {
      if (currentValue !== undefined) {
        const formatted = format ? format(currentValue) : String(currentValue)
        setDisplayValue(formatted)
      } else if (!allowUndefined) {
        const fallback = min ?? 0
        handleValueChange(fallback)

        const formatted = format ? format(fallback) : String(fallback)
        setDisplayValue(formatted)
      } else {
        setDisplayValue("")
        handleValueChange(undefined)
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault()

      const parsed = parse ? parse(displayValue) : Number(displayValue)
      const base =
        typeof parsed === "number" && !isNaN(parsed) ? parsed : (currentValue ?? min ?? 0)
      const clamped = clampValue(base)
      const newValue = clampValue(clamped + step)

      handleValueChangeDebounced(newValue)
      const formatted = format ? format(newValue) : String(newValue)
      setDisplayValue(formatted)
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()

      const parsed = parse ? parse(displayValue) : Number(displayValue)
      const base =
        typeof parsed === "number" && !isNaN(parsed) ? parsed : (currentValue ?? min ?? 0)
      const clamped = clampValue(base)
      const newValue = clampValue(clamped - step)

      handleValueChangeDebounced(newValue)
      const formatted = format ? format(newValue) : String(newValue)
      setDisplayValue(formatted)
      return
    }

    if (event.key === "Enter") {
      event.currentTarget.blur()
      return
    }
  }

  const canDecrement = !disabled && (min === undefined || (currentValue ?? 0) > min)
  const canIncrement = !disabled && (max === undefined || (currentValue ?? 0) < max)

  return (
    <div
      className={cn(
        "border-input bg-background ring-offset-background focus-within:border-primary focus-within:ring-primary focus-within:ring-offset-background flex h-9 w-full overflow-hidden rounded border text-sm transition",
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
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-none border-none text-center"
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
