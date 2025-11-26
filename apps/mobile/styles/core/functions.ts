import { Platform, type DimensionValue } from "react-native"

import {
  durationTokens,
  easingTokens,
  type DurationAlias,
  type EasingAlias
} from "../tokens/animations"
import {
  borderRadiusTokens,
  borderWidthTokens,
  RADIUS_BASE,
  type BorderRadiusAlias,
  type BorderWidthAlias
} from "../tokens/borders"
import { opacityTokens, type OpacityAlias } from "../tokens/opacity"
import { shadowTokens, type ShadowAlias } from "../tokens/shadows"
import {
  sizeTokens,
  SIZE_BASE_UNIT,
  SPACING_BASE_UNIT,
  spacingAliases,
  type SizeAlias,
  type SpacingAlias
} from "../tokens/spacing"
import {
  FONT_SIZE_BASE,
  fontSizeTokens,
  fontWeightTokens,
  letterSpacingTokens,
  lineHeightTokens,
  type FontSizeAlias,
  type FontWeightAlias,
  type LetterSpacingAlias,
  type LineHeightAlias
} from "../tokens/typography"
import { alpha, darken, lighten, mix, withOpacity } from "../tokens/utils"

/**
 * Creates a stable space accessor function
 *
 * Accepts named aliases (xs, sm, md, etc.), special values (px, 0),
 * or numeric multipliers of the base unit.
 *
 * @returns Space accessor function
 */
export function createSpaceFunction() {
  return (value?: SpacingAlias | number | "px" | "0"): number => {
    "worklet"

    if (value === undefined) {
      return spacingAliases.md
    }

    if (value === "px") {
      return 1
    }

    if (value === "0" || value === 0) {
      return 0
    }

    if (typeof value === "string") {
      return spacingAliases[value as SpacingAlias]
    }

    return value * SPACING_BASE_UNIT
  }
}

/**
 * Creates a stable size accessor function
 *
 * Accepts named aliases (xs, sm, full, etc.) or numeric multipliers.
 *
 * @returns Size accessor function
 */
export function createSizeFunction() {
  return (value?: SizeAlias | number): DimensionValue => {
    "worklet"

    if (value === undefined) {
      return sizeTokens.full
    }

    if (typeof value === "string") {
      return sizeTokens[value]
    }

    return value * SIZE_BASE_UNIT
  }
}

/**
 * Creates a stable font size accessor function
 *
 * @returns Font size accessor function
 */
export function createFontSizeFunction() {
  return (value?: FontSizeAlias): (typeof fontSizeTokens)[FontSizeAlias] => {
    "worklet"

    if (value === undefined) {
      return FONT_SIZE_BASE
    }

    return fontSizeTokens[value]
  }
}

/**
 * Creates a stable line height accessor function
 *
 * @returns Line height accessor function
 */
export function createLineHeightFunction() {
  return (value?: LineHeightAlias): (typeof lineHeightTokens)[LineHeightAlias] => {
    "worklet"

    if (value === undefined) {
      return lineHeightTokens.normal
    }

    return lineHeightTokens[value]
  }
}

/**
 * Creates a stable font weight accessor function
 *
 * @returns Font weight accessor function
 */
export function createFontWeightFunction() {
  return (value?: FontWeightAlias): (typeof fontWeightTokens)[FontWeightAlias] => {
    "worklet"

    if (value === undefined) {
      return fontWeightTokens.normal
    }

    return fontWeightTokens[value]
  }
}

/**
 * Creates a stable letter spacing accessor function
 *
 * @returns Letter spacing accessor function
 */
export function createLetterSpacingFunction() {
  return (value?: LetterSpacingAlias): (typeof letterSpacingTokens)[LetterSpacingAlias] => {
    "worklet"

    if (value === undefined) {
      return letterSpacingTokens.normal
    }

    return letterSpacingTokens[value]
  }
}

/**
 * Creates a stable border radius accessor function
 *
 * @returns Border radius accessor function
 */
export function createRadiusFunction() {
  return (value?: BorderRadiusAlias): (typeof borderRadiusTokens)[BorderRadiusAlias] => {
    "worklet"

    if (value === undefined) {
      return RADIUS_BASE
    }

    return borderRadiusTokens[value]
  }
}

/**
 * Creates a stable border width accessor function
 *
 * @returns Border width accessor function
 */
export function createBorderWidthFunction() {
  return (value?: BorderWidthAlias): (typeof borderWidthTokens)[BorderWidthAlias] => {
    "worklet"

    if (value === undefined) {
      return borderWidthTokens.default
    }

    return borderWidthTokens[value]
  }
}

/**
 * Creates a stable opacity accessor function
 *
 * @returns Opacity accessor function
 */
export function createOpacityFunction() {
  return (value?: OpacityAlias): (typeof opacityTokens)[OpacityAlias] => {
    "worklet"

    if (value === undefined) {
      return opacityTokens[100]
    }

    return opacityTokens[value]
  }
}

/**
 * Creates a stable shadow accessor function
 *
 * @returns Shadow accessor function
 */
export function createShadowFunction() {
  return (value?: ShadowAlias) => {
    "worklet"

    if (value === undefined) {
      return shadowTokens.none
    }

    return shadowTokens[value]
  }
}

/**
 * Creates a stable duration accessor function
 *
 * @returns Duration accessor function
 */
export function createDurationFunction() {
  return (value?: DurationAlias): (typeof durationTokens)[DurationAlias] => {
    "worklet"

    if (value === undefined) {
      return durationTokens[300]
    }

    return durationTokens[value]
  }
}

/**
 * Creates a stable easing accessor function
 *
 * @returns Easing accessor function
 */
export function createEasingFunction() {
  return (value?: EasingAlias): (typeof easingTokens)[EasingAlias] => {
    "worklet"

    if (value === undefined) {
      return easingTokens.easeInOut
    }

    return easingTokens[value]
  }
}

/**
 * Creates a stable withOpacity function
 *
 * Accepts OpacityAlias or number. If OpacityAlias is provided, converts to numeric value before applying.
 * If number is provided, uses it directly (useful with theme.opacity()).
 *
 * @returns WithOpacity function
 */
export function createWithOpacityFunction() {
  return (color: string, opacity: OpacityAlias | number): string => {
    "worklet"

    const opacityValue = typeof opacity === "number" ? opacity : opacityTokens[opacity]
    return withOpacity(color, opacityValue)
  }
}

/**
 * Creates platform selection helpers
 *
 * @returns Platform utilities
 */
export function createPlatformFunction() {
  return {
    select: <T>(options: { ios?: T; android?: T; web?: T; default: T }): T => {
      "worklet"

      if (Platform.OS in options) {
        return (options as any)[Platform.OS] ?? options.default
      }
      return options.default
    }
  }
}

/**
 * Creates color manipulation utilities
 *
 * All functions work with RGB colors and are marked with 'worklet' for Reanimated.
 *
 * @returns Color manipulation functions
 */
export function createColorUtilities() {
  return {
    lighten: (color: string, amount: number) => {
      "worklet"
      return lighten(color, amount)
    },
    darken: (color: string, amount: number) => {
      "worklet"
      return darken(color, amount)
    },
    alpha: (color: string, opacity: OpacityAlias | number) => {
      "worklet"
      const opacityValue = typeof opacity === "number" ? opacity : opacityTokens[opacity]
      return alpha(color, opacityValue)
    },
    mix: (color1: string, color2: string, weight?: number) => {
      "worklet"
      return mix(color1, color2, weight)
    }
  }
}
