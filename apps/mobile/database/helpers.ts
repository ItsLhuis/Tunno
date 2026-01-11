import { type CursorValue } from "@repo/database"

/**
 * Encodes an array of cursor values into a base64-encoded JSON string.
 * Date objects are converted to Unix timestamps (seconds) before encoding.
 * This is used for creating stable and URL-safe pagination cursors.
 *
 * @param values - An array of `CursorValue` (string, number, boolean, Date, or null).
 * @returns A base64-encoded string representing the cursor.
 */
export function encodeCursor(values: CursorValue[]): string {
  const serialized = values.map((value) => {
    if (value instanceof Date) {
      return Math.floor(value.getTime() / 1000)
    }
    return value
  })
  return btoa(JSON.stringify(serialized))
}

/**
 * Decodes a base64-encoded JSON string back into an array of cursor values.
 * This is the inverse of `encodeCursor` and is used to retrieve cursor values
 * for pagination. Handles potential decoding errors gracefully.
 *
 * @param cursor - The base64-encoded string representing the cursor.
 * @returns An array of `CursorValue` (string, number, boolean, or null). Returns an empty array if decoding fails.
 */
export function decodeCursor(cursor: string): CursorValue[] {
  try {
    const decoded = JSON.parse(atob(cursor))
    if (!Array.isArray(decoded)) return []
    return decoded.map((value: unknown): CursorValue => {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null
      ) {
        return value
      }
      return null
    })
  } catch {
    return []
  }
}
