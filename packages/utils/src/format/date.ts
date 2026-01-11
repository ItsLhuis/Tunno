import { differenceInHours, isToday, isYesterday, parseISO } from "date-fns"

import { type TFunction } from "@repo/i18n"

/**
 * Formats a date as a human-readable relative date string
 *
 * Returns localized strings for recent dates (e.g., "2 hours ago", "today",
 * "yesterday") and falls back to a formatted date string for older dates.
 * Uses Intl.DateTimeFormat for locale-aware date formatting.
 *
 * @param data - Date object or ISO string to format
 * @param lang - Locale code for date formatting (e.g., 'en-US', 'es-ES')
 * @param t - i18n translation function for localized strings
 * @returns Localized relative date string
 *
 * @example
 * ```ts
 * formatRelativeDate(new Date(), 'en-US', t) // "today"
 * formatRelativeDate('2024-01-10T10:00:00', 'en-US', t) // "2 hours ago" (if recent)
 * ```
 */
export function formatRelativeDate(data: Date | string, lang: string, t: TFunction): string {
  const date = typeof data === "string" ? parseISO(data) : data
  const diffHoras = differenceInHours(new Date(), date)

  if (diffHoras < 24) {
    if (diffHoras < 1) return t("common.lessThanAnHourAgo")
    return t("common.hoursAgo", { count: diffHoras })
  }

  if (isToday(date)) return t("common.today")
  if (isYesterday(date)) return t("common.yesterday")

  return new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date)
}

/**
 * Formats a date for use in filter inputs
 *
 * Returns a consistently formatted date string with two-digit day and month,
 * suitable for display in filter forms and date pickers.
 *
 * @param data - Date object or ISO string to format
 * @param lang - Locale code for date formatting
 * @returns Formatted date string (e.g., "01/10/2024")
 */
export function formatFilterDate(data: Date | string, lang: string): string {
  const date = typeof data === "string" ? parseISO(data) : data

  return new Intl.DateTimeFormat(lang, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date)
}
