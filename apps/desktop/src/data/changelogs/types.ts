import { type LocaleKeys } from "@repo/i18n"

export type ChangelogVersion = {
  version: string
  releaseDate: Date
  type: "major" | "minor" | "patch"
}

export type ChangelogData = {
  summary: string
  highlights: string
  fullChangelog: string
}

export type ChangelogMap<T extends string = string> = {
  [K in T]: ChangelogData
}

export type LocaleCode = LocaleKeys
