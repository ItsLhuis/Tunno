import { type TFunction } from "@repo/i18n"

export const formatTime = (seconds: number | undefined) => {
  const s = seconds ?? 0
  const hrs = Math.floor(s / 3600)
  const mins = Math.floor((s % 3600) / 60)
  const secs = s % 60

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export const parseTime = (str: string): number | undefined => {
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

export const formatDuration = (seconds: number | undefined, t: TFunction): string => {
  const s = seconds ?? 0

  if (s === 0) return "0s"

  const years = Math.floor(s / (365 * 24 * 3600))
  const weeks = Math.floor((s % (365 * 24 * 3600)) / (7 * 24 * 3600))
  const days = Math.floor((s % (7 * 24 * 3600)) / (24 * 3600))
  const hours = Math.floor((s % (24 * 3600)) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const secs = s % 60

  const parts: string[] = []

  if (years > 0) {
    parts.push(t("common.years", { count: years }))
  }
  if (weeks > 0) {
    parts.push(t("common.weeks", { count: weeks }))
  }
  if (days > 0) {
    parts.push(t("common.days", { count: days }))
  }
  if (hours > 0) {
    parts.push(t("common.hours", { count: hours }))
  }
  if (minutes > 0) {
    parts.push(t("common.minutes", { count: minutes }))
  }
  if (secs > 0 && parts.length === 0) {
    parts.push(t("common.seconds", { count: secs }))
  }

  if (parts.length > 2) {
    return parts.slice(0, 2).join(" ")
  }

  return parts.join(" ")
}
