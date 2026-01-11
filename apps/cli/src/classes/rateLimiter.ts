/**
 * Defines the options for configuring a `RateLimiter` instance.
 */
export type RateLimiterOptions = {
  limit: number
  interval: number
  message?: string
}

/**
 * A utility class for enforcing a rate limit on a series of operations.
 * It prevents an action from being performed more than a specified number of times
 * within a given time interval.
 */
export class RateLimiter {
  private requestCount: number
  private lastRequestTime: number
  private limit: number
  private interval: number
  private message: string

  /**
   * Creates an instance of `RateLimiter`.
   *
   * @param options - Configuration options for the rate limiter.
   */
  constructor(options: RateLimiterOptions) {
    this.requestCount = 0
    this.lastRequestTime = Date.now()
    this.limit = options.limit
    this.interval = options.interval
    this.message = options.message || "Limit of requests reached. Waiting..."
  }

  /**
   * Asynchronously waits if the rate limit has been reached.
   * If the number of requests exceeds the limit within the interval,
   * it will pause execution until the next interval starts.
   *
   * @returns A Promise that resolves when the request can proceed.
   */
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
