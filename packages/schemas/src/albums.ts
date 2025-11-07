import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { albums } = schema

export const createInsertAlbumSchema = (t: TFunction) => {
  return createInsertSchema(albums, {
    name: z.string().min(1, t("validation.name.required")).max(150, t("validation.name.max")),
    thumbnail: z
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
      ),
    isFavorite: z.boolean().default(false),
    albumType: z.enum(["single", "album", "compilation"], {
      message: "Invalid album type"
    })
  }).extend({
    artists: z.array(z.number().int().positive(t("validation.artists.invalid")))
  })
}

export type InsertAlbumType = z.infer<ReturnType<typeof createInsertAlbumSchema>>

export const createUpdateAlbumSchema = (t: TFunction) => {
  return createUpdateSchema(albums, {
    name: z.string().min(1, t("validation.name.required")).max(150, t("validation.name.max")),
    thumbnail: z
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
      ),
    isFavorite: z.boolean(),
    albumType: z.enum(["single", "album", "compilation"], {
      message: "Invalid album type"
    })
  }).extend({
    artists: z.array(z.number().int().positive(t("validation.artists.invalid")))
  })
}

export type UpdateAlbumType = z.infer<ReturnType<typeof createUpdateAlbumSchema>>
