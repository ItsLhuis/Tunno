import { StyleSheet } from "react-native"

import { isVariantFunction } from "./variants"

import {
  type NamedStyles,
  type ProcessedStyleSheet,
  type Style,
  type StyleSheetDefinition
} from "./types"

/**
 * Processes a style sheet definition into a processed style sheet
 *
 * Separates static styles (optimized with StyleSheet.create) from dynamic
 * styles (variant functions and style factories). Static styles are processed
 * once for performance, while dynamic styles remain as functions.
 *
 * @param definition - Style sheet definition with static and dynamic styles
 * @returns Processed style sheet ready for use
 */
export function processStyleSheet<T extends StyleSheetDefinition>(
  definition: T
): ProcessedStyleSheet<T> {
  const processed: Record<string, unknown> = {}

  const staticStyles: NamedStyles<Record<string, Style>> = {}
  const dynamicKeys: string[] = []

  for (const key in definition) {
    const value = definition[key]

    if (isVariantFunction(value) || typeof value === "function") {
      dynamicKeys.push(key)
    } else {
      staticStyles[key] = value as Style
    }
  }

  const processedStaticStyles = StyleSheet.create(staticStyles)

  for (const key in processedStaticStyles) {
    const registeredStyle = processedStaticStyles[key as keyof typeof processedStaticStyles]
    processed[key] = registeredStyle as any
  }

  for (const key of dynamicKeys) {
    const value = definition[key]

    if (isVariantFunction(value)) {
      processed[key] = value
    } else if (typeof value === "function") {
      processed[key] = (...args: any[]) => {
        const rawStyle = (value as Function)(...args)
        return StyleSheet.create({ temp: rawStyle }).temp
      }
    }
  }

  return processed as ProcessedStyleSheet<T>
}

/**
 * Recursively flattens nested style arrays
 *
 * @param styles - Array of styles (can include nested arrays)
 * @returns Flattened array of styles
 */
export function flattenStyles(styles: (Style | undefined | false | null | Array<any>)[]): Style[] {
  const result: Style[] = []

  for (const style of styles) {
    if (!style) continue

    if (Array.isArray(style)) {
      result.push(...flattenStyles(style))
    } else {
      result.push(style)
    }
  }

  return result
}

/**
 * Merges multiple styles into a single style object
 *
 * @param styles - Styles to merge (supports nested arrays)
 * @returns Merged style object
 */
export function mergeStyles(...styles: (Style | undefined | false | null | Array<any>)[]): Style {
  const flattened = flattenStyles(styles)
  return Object.assign({}, ...flattened)
}
