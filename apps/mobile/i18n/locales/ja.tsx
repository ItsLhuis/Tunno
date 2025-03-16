import ja from "@assets/images/flags/ja.svg"

import { type Language } from "../types"

export const japanese: Language = {
  code: "ja",
  name: "日本語",
  flag: ja,
  isRtl: false,
  translations: {
    songs: {
      title: "曲"
    },
    favorites: {
      title: "お気に入り"
    },
    playlists: {
      title: "プレイリスト"
    },
    artists: {
      title: "アーティスト"
    },
    settings: {
      title: "設定"
    }
  }
}
