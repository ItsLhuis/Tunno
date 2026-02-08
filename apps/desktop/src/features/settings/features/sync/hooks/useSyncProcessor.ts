import { useCallback } from "react"

import { useTranslation } from "@repo/i18n"

import { useSyncStore } from "../stores/useSyncStore"

import pkg from "../../../../../../package.json"

import { platform } from "@tauri-apps/plugin-os"

import { getAllSongsForExport, type SongForExport } from "../api/queries"
import { createExportBundle } from "../api/tauri"

import { toast } from "@components/ui"

import {
  type SyncAlbum,
  type SyncArtist,
  type SyncManifest,
  type SyncSongMetadata,
  type SyncTrackMeta,
  type TrackExportData
} from "../types"

const ILLEGAL_CHARS_RE = /[\/\?<>\\:\*\|"]/g
const CONTROL_CHARS_RE = /[\x00-\x1f\x80-\x9f]/g
const RESERVED_NAMES_RE = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i
const TRAILING_RE = /[\. ]+$/

/**
 * Sanitizes a string to be used as a valid filename or directory name.
 * Removes illegal characters, control characters, and reserved Windows names.
 *
 * @param input - The string to sanitize.
 * @param maxLength - The maximum allowed length for the filename.
 * @returns A safe, sanitized string.
 */
function sanitizeFilename(input: string, maxLength: number = 200): string {
  if (typeof input !== "string") return "Unknown"

  let sanitized = input
    .replace(ILLEGAL_CHARS_RE, "")
    .replace(CONTROL_CHARS_RE, "")
    .replace(TRAILING_RE, "")
    .replace(/\s+/g, " ")
    .trim()

  if (RESERVED_NAMES_RE.test(sanitized)) {
    sanitized = `_${sanitized}`
  }

  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength).replace(TRAILING_RE, "")
  }

  return sanitized || "Unknown"
}

/**
 * Generates a sanitized directory name from a song title.
 *
 * @param title - The song title.
 * @returns A sanitized string suitable for a directory name.
 */
function generateDirName(title: string): string {
  return sanitizeFilename(title)
}

/**
 * Constructs a {@link SyncArtist} object from a database artist entity.
 *
 * @param artist - The artist data.
 * @returns A {@link SyncArtist} object formatted for the sync manifest.
 */
function buildSyncArtist(artist: { name: string; thumbnail: string | null }): SyncArtist {
  return {
    name: artist.name,
    thumbnail: artist.thumbnail,
    genres: null
  }
}

/**
 * Constructs a {@link SyncAlbum} object from a full song export object.
 *
 * @param song - The song data containing album information.
 * @returns A {@link SyncAlbum} object formatted for the sync manifest.
 */
function buildSyncAlbum(song: SongForExport): SyncAlbum {
  const album = song.album!

  return {
    name: album.name,
    thumbnail: album.thumbnail || "",
    releaseYear: album.releaseYear || song.releaseYear || 0,
    albumType: album.albumType,
    artists: album.artists.map((artist) => buildSyncArtist(artist.artist))
  }
}

/**
 * Constructs the full {@link SyncSongMetadata} object for a song.
 *
 * @param song - The full song export data.
 * @returns A {@link SyncSongMetadata} object.
 */
function buildSyncMetadata(song: SongForExport): SyncSongMetadata {
  return {
    song: song.file,
    title: song.name,
    thumbnail: song.thumbnail || "",
    duration: song.duration,
    artists: song.artists.map((artist) => buildSyncArtist(artist.artist)),
    album: buildSyncAlbum(song),
    lyrics: song.lyrics
  }
}

/**
 * Collects all unique thumbnail filenames associated with a song and its relations (album, artists).
 *
 * @param song - The full song export data.
 * @returns An array of unique thumbnail filenames.
 */
function collectThumbnails(song: SongForExport): string[] {
  const thumbnails = new Set<string>()

  if (song.thumbnail) {
    thumbnails.add(song.thumbnail)
  }

  for (const artist of song.artists) {
    if (artist.artist.thumbnail) {
      thumbnails.add(artist.artist.thumbnail)
    }
  }

  if (song.album) {
    if (song.album.thumbnail) {
      thumbnails.add(song.album.thumbnail)
    }

    for (const artist of song.album.artists) {
      if (artist.artist.thumbnail) {
        thumbnails.add(artist.artist.thumbnail)
      }
    }
  }

  return Array.from(thumbnails)
}

/**
 * Custom hook that manages the entire library export process.
 *
 * Orchestrates fetching all song data, processing it into a sync-compatible format,
 * creating a manifest file, and invoking a Tauri command to bundle everything into a
 * native zip archive. Uses {@link useSyncStore} to expose status and progress.
 *
 * @returns An object containing the current export state (`status`, `progress`, etc.)
 *          and functions to control the process (`startExport`, `reset`).
 */
export function useSyncProcessor() {
  const { t } = useTranslation()

  const status = useSyncStore((state) => state.status)
  const outputPath = useSyncStore((state) => state.outputPath)
  const totalSongs = useSyncStore((state) => state.totalSongs)
  const currentSongIndex = useSyncStore((state) => state.currentSongIndex)
  const exportedCount = useSyncStore((state) => state.exportedCount)
  const bundlePath = useSyncStore((state) => state.bundlePath)
  const setStatus = useSyncStore((state) => state.setStatus)
  const setOutputPath = useSyncStore((state) => state.setOutputPath)
  const setTotalSongs = useSyncStore((state) => state.setTotalSongs)
  const setError = useSyncStore((state) => state.setError)
  const setBundlePath = useSyncStore((state) => state.setBundlePath)
  const resetStore = useSyncStore((state) => state.resetStore)

  const isExporting = status === "exporting" || status === "preparing"

  const startExport = useCallback(
    async (destinationPath: string) => {
      if (isExporting) return

      resetStore()

      setOutputPath(destinationPath)
      setStatus("preparing")

      try {
        const songs = await getAllSongsForExport()

        if (songs.length === 0) {
          toast.error(t("settings.sync.export.noSongs"), {
            description: t("settings.sync.export.libraryEmpty")
          })
          setStatus("idle")

          return
        }

        const validSongs = songs.filter((song) => song.album !== null)

        if (validSongs.length === 0) {
          toast.error(t("settings.sync.export.noValidSongs"), {
            description: t("settings.sync.export.missingAlbumInfo")
          })
          setStatus("idle")

          return
        }

        setTotalSongs(validSongs.length)
        setStatus("exporting")

        const tracksData: TrackExportData[] = []
        const tracksMeta: SyncTrackMeta[] = []
        const seenDirNames = new Set<string>()

        for (const song of validSongs) {
          let dirName = generateDirName(song.name)

          let counter = 1
          const baseDirName = dirName

          while (seenDirNames.has(dirName)) {
            counter++
            dirName = `${baseDirName} (${counter})`
          }

          seenDirNames.add(dirName)

          const metadata = buildSyncMetadata(song)
          const thumbnails = collectThumbnails(song)

          tracksData.push({
            dirName,
            audioFile: song.file,
            thumbnails,
            metadataJson: JSON.stringify(metadata, null, 2)
          })

          const songArtists =
            song.artists.length > 0
              ? song.artists.map((artist) => artist.artist.name)
              : song.album!.artists.map((artist) => artist.artist.name)

          tracksMeta.push({
            dirName,
            title: song.name,
            artists: songArtists,
            album: song.album!.name,
            thumbnail: song.thumbnail
          })
        }

        const os = platform()

        const manifest: SyncManifest = {
          version: 1,
          createdAt: new Date().toISOString(),
          source: {
            type: "desktop",
            version: pkg.version,
            os
          },
          stats: {
            totalTracks: tracksData.length
          },
          tracks: tracksMeta
        }

        const manifestJson = JSON.stringify(manifest, null, 2)

        const resultPath = await createExportBundle(destinationPath, manifestJson, tracksData)

        setBundlePath(resultPath)
        setStatus("completed")

        toast.success(t("settings.sync.export.exportSuccess"), {
          description: t("settings.sync.export.songsExported", { count: tracksData.length })
        })
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)

        setError(errorMessage)
        setStatus("error")

        toast.error(t("settings.sync.export.exportFailed"), {
          description: t("settings.sync.export.tryAgain")
        })
      }
    },
    [isExporting, resetStore, setOutputPath, setStatus, setTotalSongs, setError, setBundlePath]
  )

  const reset = useCallback(() => {
    resetStore()
  }, [resetStore])

  return {
    status,
    outputPath,
    totalSongs,
    currentSongIndex,
    exportedCount,
    bundlePath,
    isExporting,
    startExport,
    reset
  }
}
