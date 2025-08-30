import { schema, type InferQueryModel } from "@repo/database"

import { type QueryParams } from "../types"

const { songs } = schema

export type SongColumns = keyof typeof songs.$inferSelect

export type Song = typeof songs.$inferSelect

export type SongWithAlbum = InferQueryModel<
  "songs",
  {
    album: true
  }
>

export type SongWithArtists = InferQueryModel<
  "songs",
  {
    artists: {
      with: {
        artist: true
      }
    }
  }
>

export type SongWithPlaylists = InferQueryModel<
  "songs",
  {
    playlists: {
      with: {
        playlist: true
      }
    }
  }
>

export type SongWithStats = InferQueryModel<
  "songs",
  {
    stats: true
  }
>

export type SongWithPlayHistory = InferQueryModel<
  "songs",
  {
    playHistory: true
  }
>

export type SongWithAlbumAndArtists = InferQueryModel<
  "songs",
  {
    album: true
    artists: {
      with: {
        artist: true
      }
    }
  }
>

export type SongWithAlbumAndPlaylists = InferQueryModel<
  "songs",
  {
    album: true
    playlists: {
      with: {
        playlist: true
      }
    }
  }
>

export type SongWithArtistsAndPlaylists = InferQueryModel<
  "songs",
  {
    artists: {
      with: {
        artist: true
      }
    }
    playlists: {
      with: {
        playlist: true
      }
    }
  }
>

export type SongWithAlbumAndArtistsAndPlaylists = InferQueryModel<
  "songs",
  {
    album: true
    artists: {
      with: {
        artist: true
      }
    }
    playlists: {
      with: {
        playlist: true
      }
    }
  }
>

export type SongWithMainRelations = SongWithAlbumAndArtistsAndPlaylists

export type SongWithAllRelations = InferQueryModel<
  "songs",
  {
    album: true
    artists: {
      with: {
        artist: true
      }
    }
    playlists: {
      with: {
        playlist: true
      }
    }
    stats: true
    playHistory: true
  }
>

export type SongWithCustomRelations<T extends Record<string, any>> = InferQueryModel<"songs", T>

export type InsertSong = typeof songs.$inferInsert
export type UpdateSong = Partial<InsertSong>

export type QuerySongsParams = QueryParams<SongColumns>
