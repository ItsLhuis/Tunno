import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { playlists } = schema

/**
 * Zod schema for validating playlist thumbnail file paths.
 * Ensures the file extension is one of the supported thumbnail formats.
 * @param t - The i18n translation function.
 */
function playlistThumbnailSchema(t: TFunction) {
  return z
    .string()
    .optional()
    .nullable()
    .refine(
      (value) => {
        if (!value) return true
        const ext = value.split(".").pop()?.toLowerCase()
        return ext !== undefined && VALID_THUMBNAIL_FILE_EXTENSIONS.includes(ext)
      },
      {
        message: t("form.descriptions.supportedFormats", {
          formats: VALID_THUMBNAIL_FILE_EXTENSIONS.join(", ")
        })
      }
    )
}

/**
 * Defines the base fields to pick from the Drizzle schema for playlist operations.
 */
const basePlaylistPick = {
  name: true,
  thumbnail: true,
  isFavorite: true
} as const

/**
 * Creates a Zod schema for inserting new playlist data.
 * Includes validations for name, thumbnail, and favorite status.
 * @param t - The i18n translation function.
 */
export function createInsertPlaylistSchema(t: TFunction) {
  const baseSchema = createInsertSchema(playlists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: playlistThumbnailSchema(t),
    isFavorite: z.boolean().default(false)
  })

  return baseSchema.pick(basePlaylistPick)
}

/**
 * Inferred type for inserting a new playlist, based on `createInsertPlaylistSchema`.
 */
export type InsertPlaylistType = z.infer<ReturnType<typeof createInsertPlaylistSchema>>

/**
 * Creates a Zod schema for updating existing playlist data.
 * Includes validations for name, thumbnail, and favorite status.
 * @param t - The i18n translation function.
 */
export function createUpdatePlaylistSchema(t: TFunction) {
  const baseSchema = createUpdateSchema(playlists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: playlistThumbnailSchema(t),
    isFavorite: z.boolean()
  })

  return baseSchema.pick(basePlaylistPick)
}

/**
 * Inferred type for updating an existing playlist, based on `createUpdatePlaylistSchema`.
 */
export type UpdatePlaylistType = z.infer<ReturnType<typeof createUpdatePlaylistSchema>>

/**
 * Creates a Zod schema for adding songs to a playlist.
 * Validates that `playlistIds` is an array of positive integers.
 * @param t - The i18n translation function.
 */
export function createAddToPlaylistSchema(t: TFunction) {
  return z.object({
    playlistIds: z.array(z.number().int().positive(t("validation.playlistIds.invalid")))
  })
}

/**
 * Inferred type for adding songs to a playlist, based on `createAddToPlaylistSchema`.
 */
export type AddToPlaylistType = z.infer<ReturnType<typeof createAddToPlaylistSchema>>
