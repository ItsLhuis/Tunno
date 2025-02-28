import { differenceInHours, format, isToday, isYesterday, parseISO } from "date-fns"

export function formatRelativeDate(data: Date | string): string {
  const date = typeof data === "string" ? parseISO(data) : data

  const diffHoras = differenceInHours(new Date(), date)

  if (diffHoras < 24) {
    if (diffHoras < 1) return "Less than an hour ago"
    return `${diffHoras} ${diffHoras === 1 ? "hour" : "hours"} ago`
  }

  if (isToday(date)) return "Today"
  if (isYesterday(date)) return "Yesterday"

  return format(date, "d MMMM, yyyy")
}
