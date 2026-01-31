/**
 * Calculates the retention rate of a track based on its play history and total duration.
 * The retention rate indicates how much of the track is typically listened to.
 *
 * @param playHistory - An array of play events, each with `timeListened` in seconds.
 * @param duration - The total duration of the track in seconds.
 * @returns The retention rate as a percentage (0-100), rounded up to 100 if very close.
 */
export function calculateRetentionRate(
  playHistory: Array<{ timeListened: number }>,
  duration: number
): number {
  if (playHistory.length === 0) return 0

  const totalListenTime = playHistory.reduce((sum, play) => sum + play.timeListened, 0)
  const averageListenTime = totalListenTime / playHistory.length

  const retention = (averageListenTime / duration) * 100

  return retention >= 99.5 ? 100 : retention
}

/**
 * Formats a number into a human-readable string with metric suffixes (K, M, B).
 *
 * @param num - The number to format.
 * @returns A string representation of the formatted number.
 *
 * @example
 * ```ts
 * formatNumber(1200)       // "1.2K"
 * formatNumber(1500000)    // "1.5M"
 * formatNumber(1000000000) // "1B"
 * formatNumber(999)        // "999"
 * ```
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}B`
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`
  }
  return num.toString()
}

/**
 * Calculates the current consecutive daily play streak based on play history.
 * A streak is maintained if a song was played yesterday and today, or only yesterday if today has no plays.
 *
 * @param playHistory - An array of play events, each with a `playedAt` timestamp.
 * @returns The number of consecutive days a song has been played.
 */
export function calculateStreak(playHistory: Array<{ playedAt: Date | string }>): number {
  if (playHistory.length === 0) return 0

  const sortedHistory = [...playHistory]
    .map((play) => ({
      ...play,
      playedAt: typeof play.playedAt === "string" ? new Date(play.playedAt) : play.playedAt
    }))
    .sort((a, b) => b.playedAt.getTime() - a.playedAt.getTime())

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const uniqueDates = new Set(
    sortedHistory.map((play) => {
      const date = new Date(play.playedAt)
      date.setHours(0, 0, 0, 0)
      return date.getTime()
    })
  )

  const sortedDates = Array.from(uniqueDates)
    .map((timestamp) => new Date(timestamp))
    .sort((a, b) => b.getTime() - a.getTime())

  const hasPlayToday = sortedDates.some((date) => date.getTime() === today.getTime())

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const hasPlayYesterday = sortedDates.some((date) => date.getTime() === yesterday.getTime())

  if (!hasPlayToday && !hasPlayYesterday) {
    return 0
  }

  const currentDate = hasPlayToday ? new Date(today) : new Date(yesterday)

  for (const date of sortedDates) {
    if (date.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else if (date.getTime() < currentDate.getTime()) {
      break
    }
  }

  return streak
}
