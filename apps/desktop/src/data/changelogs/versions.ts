import pkg from "../../../package.json"

import { type ChangelogVersion } from "./types"

export const CHANGELOG_VERSIONS = [
  {
    version: pkg.version,
    releaseDate: new Date("2025-11-03"),
    type: "major" as const
  }
] as const satisfies readonly ChangelogVersion[]

export type ChangelogVersions = typeof CHANGELOG_VERSIONS

export type ChangelogVersionKeys = ChangelogVersions[number]["version"]

export const getLatestVersion = (): ChangelogVersion => {
  return CHANGELOG_VERSIONS[0] as ChangelogVersion
}

export const getLatestVersionString = (): ChangelogVersionKeys => {
  return CHANGELOG_VERSIONS[0].version
}

export const isNewVersion = (version: string, dayThreshold: number = 7): boolean => {
  const versionData = CHANGELOG_VERSIONS.find((v) => v.version === version)
  if (!versionData) return false

  const daysSinceRelease = Math.floor(
    (Date.now() - versionData.releaseDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  return daysSinceRelease < dayThreshold
}
