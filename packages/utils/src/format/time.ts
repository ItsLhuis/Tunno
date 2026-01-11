import { type TFunction } from "@repo/i18n"

/**
 * Formats seconds as a time string in MM:SS or H:MM:SS format
 *
 * Always displays two digits for minutes and seconds. Hours are shown
 * if the duration exceeds one hour.
 *
 * @param seconds - Duration in seconds (undefined treated as 0)
 * @returns Formatted time string
 *
 * @example
 * ```ts
 * formatTime(90) // "1:30"
 * formatTime(3661) // "1:01:01"
 * formatTime(undefined) // "0:00"
 * ```
 */
export function formatTime(seconds: number | undefined) {
  const s = seconds ?? 0
  const hrs = Math.floor(s / 3600)
  const mins = Math.floor((s % 3600) / 60)
  const secs = Math.round(s % 60)

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return `${mins}:${secs.toString().padStart(2, "0")}`
}

/**
 * Parses a time string into seconds
 *
 * Supports "H:MM:SS" and "MM:SS" formats, and also accepts plain
 * integer values. Returns undefined for invalid inputs.
 *
 * @param str - Time string to parse
 * @returns Duration in seconds, or undefined if parsing fails
 *
 * @example
 * ```ts
 * parseTime("1:30") // 90
 * parseTime("1:01:01") // 3661
 * parseTime("123") // 123
 * parseTime("invalid") // undefined
 * ```
 */
export function parseTime(str: string): number | undefined {
  const parts = str.split(":").map((p) => p.trim())

  if (parts.length === 3) {
    const hrs = parseInt(parts[0]) || 0
    const mins = parseInt(parts[1]) || 0
    const secs = parseInt(parts[2]) || 0
    return hrs * 3600 + mins * 60 + secs
  }

  if (parts.length === 2) {
    const mins = parseInt(parts[0]) || 0
    const secs = parseInt(parts[1]) || 0
    return mins * 60 + secs
  }

  const fallback = parseInt(str)
  return isNaN(fallback) ? undefined : fallback
}

/**
 * Formats seconds as a human-readable duration string
 *
 * Localized duration formatter that breaks down seconds into years, weeks,
 * days, hours, minutes, and seconds based on the user's locale. Supports
 * controlling precision and the number of time units displayed.
 *
 * @param seconds - Duration in seconds (undefined treated as 0)
 * @param t - i18n translation function
 * @param options.maxParts - Maximum number of time units to display (default: 2)
 * @param options.showSeconds - Include seconds in output (default: true)
 * @param options.precision - Rounding behavior: 'exact' or 'rounded' (default: 'exact')
 * @returns Localized duration string
 *
 * @example
 * ```ts
 * formatDuration(3665, t) // "1 hour 1 minute 5 seconds"
 * formatDuration(3665, t, { maxParts: 1 }) // "1 hour"
 * formatDuration(3665, t, { precision: 'rounded' }) // "1 hour 2 minutes"
 * ```
 */
export function formatDuration(
  seconds: number | undefined,
  t: TFunction,
  options?: {
    maxParts?: number
    showSeconds?: boolean
    precision?: "exact" | "rounded"
  }
): string {
  const s = seconds ?? 0

  const { maxParts = 2, showSeconds = true, precision = "exact" } = options ?? {}

  if (s === 0) return t("common.seconds", { count: 0 })

  const years = Math.floor(s / (365 * 24 * 3600))
  const weeks = Math.floor((s % (365 * 24 * 3600)) / (7 * 24 * 3600))
  const days = Math.floor((s % (7 * 24 * 3600)) / (24 * 3600))
  const hours = Math.floor((s % (24 * 3600)) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const secs = s % 60

  const parts: string[] = []

  if (years > 0) parts.push(t("common.years", { count: years }))
  if (weeks > 0) parts.push(t("common.weeks", { count: weeks }))
  if (days > 0) parts.push(t("common.days", { count: days }))
  if (hours > 0) parts.push(t("common.hours", { count: hours }))
  if (minutes > 0) parts.push(t("common.minutes", { count: minutes }))
  if (secs > 0 && (showSeconds || parts.length === 0))
    parts.push(t("common.seconds", { count: secs }))

  if (precision === "rounded" && parts.length > 1) {
    const lastPart = parts[parts.length - 1]
    const secondLastPart = parts[parts.length - 2]

    if (parts.length >= 2) {
      const lastValue = parseInt(lastPart.match(/\d+/)?.[0] || "0")
      const secondLastValue = parseInt(secondLastPart.match(/\d+/)?.[0] || "0")

      if (lastValue >= 30) {
        const roundedValue = secondLastValue + 1
        parts[parts.length - 2] = secondLastPart.replace(/\d+/, roundedValue.toString())
        parts.pop()
      }
    }
  }

  if (parts.length > maxParts) return parts.slice(0, maxParts).join(" ")

  return parts.join(" ")
}
