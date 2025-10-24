import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { playlists } = schema

export const createInsertPlaylistSchema = (t: TFunction) => {
  return createInsertSchema(playlists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: z
      .string()
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
      ),
    isFavorite: z.boolean().default(false)
  })
}

export type InsertPlaylistType = z.infer<ReturnType<typeof createInsertPlaylistSchema>>

export const createUpdatePlaylistSchema = (t: TFunction) => {
  return createUpdateSchema(playlists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: z
      .string()
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
      ),
    isFavorite: z.boolean()
  })
}

export type UpdatePlaylistType = z.infer<ReturnType<typeof createUpdatePlaylistSchema>>

export const createAddToPlaylistSchema = (t: TFunction) => {
  return z.object({
    playlistIds: z.array(z.number().int().positive(t("validation.playlistIds.invalid")))
  })
}

export type AddToPlaylistType = z.infer<ReturnType<typeof createAddToPlaylistSchema>>
