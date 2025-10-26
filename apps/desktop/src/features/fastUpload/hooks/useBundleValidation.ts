import { copyBundleToCache, extractManifest } from "../api/tauri"

import type { FastUploadManifest } from "../types"

type ValidationResult = {
  isValid: boolean
  manifest?: FastUploadManifest
  cachePath?: string
  error?: string
  errorType?:
    | "corrupted_zip"
    | "missing_manifest"
    | "incompatible_version"
    | "invalid_structure"
    | "empty_bundle"
    | "permission_denied"
    | "disk_space"
    | "unknown"
}

export const useBundleValidation = () => {
  const validateBundle = async (bundlePath: string): Promise<ValidationResult> => {
    try {
      const cachePath = await copyBundleToCache(bundlePath)

      const manifestJson = await extractManifest(cachePath)
      const manifest = JSON.parse(manifestJson) as FastUploadManifest

      if (!manifest.version || manifest.version !== 1) {
        return {
          isValid: false,
          error: `Bundle version ${manifest.version || "unknown"} is not supported. This app requires version 1. Please update your CLI to the latest version.`,
          errorType: "incompatible_version"
        }
      }

      if (!manifest.tracks || !Array.isArray(manifest.tracks)) {
        return {
          isValid: false,
          error: "Invalid bundle structure - missing or invalid tracks array",
          errorType: "invalid_structure"
        }
      }

      if (manifest.tracks.length === 0) {
        return {
          isValid: false,
          error:
            "Bundle is empty - no tracks found. Please create a bundle with at least one track.",
          errorType: "empty_bundle"
        }
      }

      for (const [index, track] of manifest.tracks.entries()) {
        if (!track.dirName || !track.title || !track.artists || !track.album) {
          return {
            isValid: false,
            error: `Track at position ${index + 1} is missing required fields (dirName, title, artists, or album)`,
            errorType: "invalid_structure"
          }
        }

        if (!Array.isArray(track.artists) || track.artists.length === 0) {
          return {
            isValid: false,
            error: `Track "${track.title}" must have at least one artist`,
            errorType: "invalid_structure"
          }
        }
      }

      return {
        isValid: true,
        manifest,
        cachePath
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      const errorLower = errorMessage.toLowerCase()

      if (
        errorLower.includes("permission denied") ||
        errorLower.includes("eacces") ||
        errorLower.includes("eperm")
      ) {
        return {
          isValid: false,
          error: "Permission denied. Please check file permissions and try again.",
          errorType: "permission_denied"
        }
      }

      if (
        errorLower.includes("no space left") ||
        errorLower.includes("disk full") ||
        errorLower.includes("enospc")
      ) {
        return {
          isValid: false,
          error:
            "Not enough disk space to process this bundle. Please free up some space and try again.",
          errorType: "disk_space"
        }
      }

      if (
        errorLower.includes("manifest.json") ||
        errorLower.includes("not found") ||
        errorLower.includes("enoent")
      ) {
        return {
          isValid: false,
          error:
            "Invalid bundle - missing manifest.json file. This may not be a valid Fast Upload bundle.",
          errorType: "missing_manifest"
        }
      }

      if (
        errorLower.includes("corrupted") ||
        errorLower.includes("invalid zip") ||
        errorLower.includes("bad zip") ||
        errorLower.includes("zip error") ||
        errorLower.includes("invalid archive")
      ) {
        return {
          isValid: false,
          error:
            "Bundle file is corrupted or not a valid ZIP archive. Please try re-creating the bundle.",
          errorType: "corrupted_zip"
        }
      }

      if (errorLower.includes("json") || errorLower.includes("parse")) {
        return {
          isValid: false,
          error: "Invalid manifest.json - the file is corrupted or contains invalid JSON.",
          errorType: "invalid_structure"
        }
      }

      return {
        isValid: false,
        error: `Bundle validation failed: ${errorMessage}`,
        errorType: "unknown"
      }
    }
  }

  return {
    validateBundle
  }
}
