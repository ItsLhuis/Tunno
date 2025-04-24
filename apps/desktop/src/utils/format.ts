import { differenceInHours, isToday, isYesterday, parseISO } from "date-fns"

import i18n from "@i18n/config"

export function formatRelativeDate(data: Date | string): string {
  const t = i18n.t
  const lang = i18n.language

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
