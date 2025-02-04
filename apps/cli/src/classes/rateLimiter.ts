export type RateLimiterOptions = {
  limit: number
  interval: number
  message?: string
}

export class RateLimiter {
  private requestCount: number
  private lastRequestTime: number
  private limit: number
  private interval: number
  private message: string

  constructor(options: RateLimiterOptions) {
    this.requestCount = 0
    this.lastRequestTime = Date.now()
    this.limit = options.limit
    this.interval = options.interval
    this.message = options.message || "Limit of requests reached. Waiting..."
  }

  async rateLimitRequest(): Promise<void> {
    const currentTime = Date.now()

    if (currentTime - this.lastRequestTime > this.interval) {
      this.requestCount = 0
      this.lastRequestTime = currentTime
    }

    if (this.requestCount >= this.limit) {
      const waitTime = this.interval - (currentTime - this.lastRequestTime)

      console.log(this.message)
      await new Promise((resolve) => setTimeout(resolve, waitTime))

      this.requestCount = 0
      this.lastRequestTime = Date.now()
    }

    this.requestCount++
  }
}
