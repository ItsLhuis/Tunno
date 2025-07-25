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
