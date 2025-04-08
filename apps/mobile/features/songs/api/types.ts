import { type InferQueryModel } from "@database/client"

export type Song = InferQueryModel<"songs">

export type SongWithRelations = InferQueryModel<
  "songs",
  {
    album: true
    artists: { with: { artist: true }; columns: { songId: false; artistId: false } }
    playlists: { with: { playlist: true }; columns: { songId: false; playlistId: false } }
  }
>
