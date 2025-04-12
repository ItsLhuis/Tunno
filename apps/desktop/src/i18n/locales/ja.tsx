import Ja from "@assets/images/flags/ja.svg"

import { type Language } from "../types"

export const japanese: Language = {
  code: "ja",
  name: "日本語",
  flag: Ja,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "結果が見つかりません"
    },
    songs: {
      title: "曲",
      createdTitle: "曲を作成しました",
      createdDescription: "{{name}}を作成しました",
      createdFailedTitle: "曲の作成に失敗しました",
      updatedTitle: "曲を更新しました",
      updatedDescription: "{{name}}を更新しました",
      updatedFailedTitle: "曲の更新に失敗しました",
      deletedTitle: "曲を削除しました",
      deletedDescription: "{{name}}を削除しました",
      deletedFailedTitle: "曲の削除に失敗しました"
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
