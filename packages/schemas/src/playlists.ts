import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { playlists } = schema

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

const basePlaylistPick = {
  name: true,
  thumbnail: true,
  isFavorite: true
} as const

export function createInsertPlaylistSchema(t: TFunction) {
  const baseSchema = createInsertSchema(playlists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: playlistThumbnailSchema(t),
    isFavorite: z.boolean().default(false)
  })

  return baseSchema.pick(basePlaylistPick)
}

export type InsertPlaylistType = z.infer<ReturnType<typeof createInsertPlaylistSchema>>

export function createUpdatePlaylistSchema(t: TFunction) {
  const baseSchema = createUpdateSchema(playlists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: playlistThumbnailSchema(t),
    isFavorite: z.boolean()
  })

  return baseSchema.pick(basePlaylistPick)
}

export type UpdatePlaylistType = z.infer<ReturnType<typeof createUpdatePlaylistSchema>>

export function createAddToPlaylistSchema(t: TFunction) {
  return z.object({
    playlistIds: z.array(z.number().int().positive(t("validation.playlistIds.invalid")))
  })
}

export type AddToPlaylistType = z.infer<ReturnType<typeof createAddToPlaylistSchema>>
