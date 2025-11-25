import { type StyleSheetContext, type StyleSheetDefinition, type StyleSheetFactory } from "./types"

/**
 * Creates a style sheet factory function
 *
 * Wraps a factory function to create a type-safe StyleSheetFactory.
 * The factory receives theme and runtime values for responsive styling.
 *
 * @param factory - Function that creates style sheet from context
 * @returns StyleSheetFactory function
 *
 * @example
 * ```ts
 * const styles = createStyleSheet(({ theme, runtime }) => ({
 *   container: {
 *     padding: theme.space.md,
 *     backgroundColor: theme.colors.background
 *   }
 * }))
 * ```
 */
export function createStyleSheet<T extends StyleSheetDefinition>(
  factory: (context: StyleSheetContext) => T
): StyleSheetFactory<T> {
  return factory
}
