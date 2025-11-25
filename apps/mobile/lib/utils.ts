import { type ThemeColorKey } from "@styles"

export type ButtonVariantType =
  | "default"
  | "text"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

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
