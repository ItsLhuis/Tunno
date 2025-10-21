import { type CursorValue } from "@repo/database"

export function encodeCursor(values: CursorValue[]): string {
  const serialized = values.map((value) => {
    if (value instanceof Date) {
      return Math.floor(value.getTime() / 1000)
    }
    return value
  })
  return btoa(JSON.stringify(serialized))
}

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
