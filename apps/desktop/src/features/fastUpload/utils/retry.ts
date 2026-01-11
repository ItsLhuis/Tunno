/**
 * Defines options for configuring the retry behavior with exponential backoff.
 */
export type RetryOptions = {
  /**
   * The maximum number of attempts to retry the operation. Defaults to 3.
   */
  maxAttempts?: number
  /**
   * The initial delay in milliseconds before the first retry. Defaults to 1000ms.
   */
  initialDelay?: number
  /**
   * The maximum delay in milliseconds between retries. Defaults to 10000ms.
   */
  maxDelay?: number
  /**
   * The multiplier for increasing the delay between retries. Defaults to 2 (exponential).
   */
  backoffMultiplier?: number
  /**
   * A function that determines whether a given error should trigger a retry.
   * Defaults to always retrying unless `maxAttempts` is reached.
   * @param error - The error that occurred.
   * @returns `true` if the operation should be retried, `false` otherwise.
   */
  shouldRetry?: (error: unknown) => boolean
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  shouldRetry: () => true
}

/**
 * Executes an asynchronous operation with retry logic and exponential backoff.
 * This utility helps in handling transient errors by re-attempting failed operations
 * a specified number of times with increasing delays.
 *
 * @template T - The return type of the asynchronous operation.
 * @param operation - The asynchronous function to execute and potentially retry.
 * @param options - {@link RetryOptions} to configure the retry behavior.
 * @returns A Promise that resolves with the result of the `operation` if successful,
 *          or rejects with the last encountered error after all retries are exhausted.
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
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

/**
 * Checks if a given error is considered a transient error, which typically indicates
 * a temporary issue that might resolve itself upon retry (e.g., database lock, busy, I/O errors).
 *
 * @param error - The error to check.
 * @returns `true` if the error is transient, `false` otherwise.
 */
export function isTransientError(error: unknown): boolean {
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

/**
 * Checks if a given error indicates a unique constraint violation.
 * This is useful for handling scenarios where an entity already exists in the database.
 *
 * @param error - The error to check.
 * @returns `true` if the error is a unique constraint violation, `false` otherwise.
 */
export function isUniqueConstraintError(error: unknown): boolean {
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
