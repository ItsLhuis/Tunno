import { StyleSheet } from "react-native"

import {
  type CompatibleStyle,
  type DefaultVariants,
  type MarkedVariantFunction,
  type Style,
  type VariantConfig,
  type VariantProps,
  type VariantsConfig,
  VARIANT_MARKER
} from "./types"

/**
 * Creates a variant function for conditional styling
 *
 * Variants allow you to define multiple style options based on props.
 * Supports base styles, multiple variant dimensions, default values,
 * and compound variants for complex conditional logic.
 *
 * @param config - Variant configuration
 * @returns Marked variant function that accepts props and returns styles
 *
 * @example
 * ```ts
 * const buttonVariant = createVariant({
 *   base: { borderRadius: 8 },
 *   variants: {
 *     size: {
 *       sm: { padding: 8, fontSize: 12 },
 *       md: { padding: 12, fontSize: 14 },
 *       lg: { padding: 16, fontSize: 16 }
 *     },
 *     variant: {
 *       primary: { backgroundColor: 'blue' },
 *       secondary: { backgroundColor: 'gray' }
 *     }
 *   },
 *   defaultVariants: {
 *     size: 'md',
 *     variant: 'primary'
 *   },
 *   compoundVariants: [
 *     {
 *       size: 'sm',
 *       variant: 'primary',
 *       style: { borderWidth: 1 }
 *     }
 *   ]
 * })
 *
 * // Usage
 * buttonVariant({ size: 'lg', variant: 'secondary' })
 * ```
 */
export function createVariant<
  const V extends VariantsConfig,
  D extends DefaultVariants<V> = Record<string, never>
>(config: VariantConfig<V>): MarkedVariantFunction<V, D> {
  const { base, variants = {} as V, defaultVariants = {} as D, compoundVariants = [] } = config

  type Props = Partial<VariantProps<V, D>>
  type DefaultProps = Record<keyof V, string | boolean | undefined>

  const variantFunction = (props: Props = {}) => {
    const stylesToMerge: Style[] = []

    if (base) {
      stylesToMerge.push(base)
    }

    const propsTyped = props as Record<string, string | boolean | undefined>
    const defaultsTyped = defaultVariants as DefaultProps

    for (const variantKey in variants) {
      const variantOptions = variants[variantKey]

      // Use 'in' operator to check if prop was explicitly passed (even if undefined)
      // This allows components to skip defaults by passing undefined
      const hasProp = variantKey in propsTyped
      let selectedOption = hasProp ? propsTyped[variantKey] : defaultsTyped[variantKey as keyof V]

      // Convert boolean props to strings to match variant keys (e.g., true -> "true", false -> "false")
      // This allows boolean variants like { disabled: { true: {...}, false: {...} } }
      if (typeof selectedOption === "boolean") {
        selectedOption = String(selectedOption) as any
      }

      if (!selectedOption && typeof propsTyped[variantKey] === "boolean") {
        selectedOption = String(propsTyped[variantKey]) as any
      }

      const variantStyle =
        selectedOption && variantOptions[selectedOption as string]
          ? variantOptions[selectedOption as string]
          : typeof selectedOption === "boolean"
            ? variantOptions[String(selectedOption)]
            : undefined

      if (variantStyle) {
        stylesToMerge.push(variantStyle)
      }
    }

    for (const compoundVariant of compoundVariants) {
      const { style: compoundStyle, ...conditions } = compoundVariant

      const allConditionsMet = Object.entries(conditions).every(([key, value]) => {
        const hasProp = key in propsTyped
        const propValue = hasProp ? propsTyped[key] : defaultsTyped[key as keyof V]

        if (typeof propValue === "boolean" && typeof value === "string") {
          return String(propValue) === value
        }

        if (typeof propValue === "string" && typeof value === "boolean") {
          return propValue === String(value)
        }

        return propValue === value
      })

      if (allConditionsMet) {
        stylesToMerge.push(compoundStyle)
      }
    }

    // Merge styles in order: base → variants → compoundVariants
    // Later styles have higher precedence and will override earlier ones
    const mergedStyle = Object.assign({}, ...stylesToMerge)

    return StyleSheet.create({ style: mergedStyle }).style as any as CompatibleStyle
  }

  const markedFunction = variantFunction as MarkedVariantFunction<V, D>

  Object.defineProperty(markedFunction, VARIANT_MARKER, { value: true, enumerable: false })
  Object.defineProperty(markedFunction, "config", { value: config, enumerable: false })

  return markedFunction
}

/**
 * Type guard to check if a value is a variant function
 *
 * @param value - Value to check
 * @returns True if value is a marked variant function
 */
export function isVariantFunction(
  value: unknown
): value is MarkedVariantFunction<VariantsConfig, DefaultVariants<VariantsConfig>> {
  if (typeof value !== "function" || value === null) {
    return false
  }

  const descriptor = Object.getOwnPropertyDescriptor(value, VARIANT_MARKER)

  return descriptor !== undefined && descriptor.value === true
}
