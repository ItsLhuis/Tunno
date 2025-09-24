import { differenceInHours, isToday, isYesterday, parseISO } from "date-fns"

import { type TFunction } from "@repo/i18n"

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

export function formatFilterDate(data: Date | string, lang: string): string {
  const date = typeof data === "string" ? parseISO(data) : data

  return new Intl.DateTimeFormat(lang, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date)
}
