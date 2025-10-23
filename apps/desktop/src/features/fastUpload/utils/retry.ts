export type RetryOptions = {
  maxAttempts?: number
  initialDelay?: number
  maxDelay?: number
  backoffMultiplier?: number
  shouldRetry?: (error: unknown) => boolean
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  shouldRetry: () => true
}

export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options }
  let lastError: unknown

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      if (!config.shouldRetry(error)) {
        throw error
      }

      if (attempt === config.maxAttempts) {
        throw error
      }

      const delay = Math.min(
        config.initialDelay * Math.pow(config.backoffMultiplier, attempt - 1),
        config.maxDelay
      )

      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

export const isTransientError = (error: unknown): boolean => {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase()
    return (
      msg.includes("database is locked") ||
      msg.includes("database locked") ||
      msg.includes("database busy") ||
      msg.includes("sqlite_busy") ||
      msg.includes("sqlite_locked") ||
      msg.includes("sqlite_ioerr") ||
      msg.includes("sqlite_protocol") ||
      msg.includes("disk i/o error") ||
      msg.includes("ebusy") ||
      msg.includes("eagain") ||
      msg.includes("ewouldblock") ||
      msg.includes("resource temporarily unavailable") ||
      msg.includes("too many open files") ||
      msg.includes("emfile") ||
      msg.includes("enfile") ||
      msg.includes("temporary failure") ||
      msg.includes("try again")
    )
  }
  return false
}

export const isUniqueConstraintError = (error: unknown): boolean => {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase()
    return (
      msg.includes("unique constraint failed") ||
      msg.includes("sqlite_constraint_unique") ||
      msg.includes("unique constraint") ||
      msg.includes("duplicate entry") ||
      msg.includes("already exists")
    )
  }
  return false
}
