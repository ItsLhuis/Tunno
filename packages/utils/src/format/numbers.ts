export function calculateRetentionRate(
  playHistory: Array<{ timeListened: number }>,
  duration: number
): number {
  if (playHistory.length === 0) return 0

  const totalListenTime = playHistory.reduce((sum, play) => sum + play.timeListened, 0)
  const averageListenTime = totalListenTime / playHistory.length

  return (averageListenTime / duration) * 100
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B"
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  }
  return num.toString()
}
