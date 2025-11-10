import { useMemo } from "react"

import { paletteToCssVariables } from "../utils/colors"

import { type Palette } from "@repo/utils"

export function usePaletteCssVariables(palette: Palette | null) {
  return useMemo(() => paletteToCssVariables(palette), [palette])
}
