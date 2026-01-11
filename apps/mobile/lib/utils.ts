import { type ThemeColorKey } from "@styles"

/**
 * Defines the available visual variants for a button component.
 */
export type ButtonVariantType =
  | "default"
  | "text"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

/**
 * Determines the appropriate foreground color key for a button based on its variant.
 *
 * This function is typically used in conjunction with a theming system to ensure
 * text or icon colors contrast correctly with the button's background.
 *
 * @param variant - The visual variant of the button.
 * @returns A `ThemeColorKey` representing the foreground color.
 */
export function getButtonForegroundColor(variant?: ButtonVariantType): ThemeColorKey {
  switch (variant) {
    case "destructive":
      return "destructiveForeground"
    case "outline":
    case "ghost":
      return "accentForeground"
    case "secondary":
      return "secondaryForeground"
    case "text":
    case "link":
      return "primary"
    default:
      return "primaryForeground"
  }
}
