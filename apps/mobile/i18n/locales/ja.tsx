import Ja from "@assets/images/flags/ja.svg"

import { type Language } from "../types"

export const japanese: Language = {
  code: "ja",
  name: "日本語",
  flag: Ja,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "結果が見つかりませんでした",
      lessThanAnHourAgo: "1時間未満前",
      hoursAgo: "{{count}}時間前",
      today: "今日",
      yesterday: "昨日"
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
      title: "お気に入り",
      addedTitle: "お気に入りに追加しました",
      addedDescription: "{{name}}をお気に入りに追加しました",
      addedFailedTitle: "お気に入りに追加できませんでした",
      removedTitle: "お気に入りから削除しました",
      removedDescription: "{{name}}をお気に入りから削除しました",
      removedFailedTitle: "お気に入りから削除できませんでした"
    },
    playlists: {
      title: "プレイリスト",
      createdTitle: "プレイリストを作成しました",
      createdDescription: "{{name}}を作成しました",
      createdFailedTitle: "プレイリストの作成に失敗しました",
      updatedTitle: "プレイリストを更新しました",
      updatedDescription: "{{name}}を更新しました",
      updatedFailedTitle: "プレイリストの更新に失敗しました",
      deletedTitle: "プレイリストを削除しました",
      deletedDescription: "{{name}}を削除しました",
      deletedFailedTitle: "プレイリストの削除に失敗しました"
    },
    artists: {
      title: "アーティスト",
      createdTitle: "アーティストを作成しました",
      createdDescription: "{{name}}を作成しました",
      createdFailedTitle: "アーティストの作成に失敗しました",
      updatedTitle: "アーティストを更新しました",
      updatedDescription: "{{name}}を更新しました",
      updatedFailedTitle: "アーティストの更新に失敗しました",
      deletedTitle: "アーティストを削除しました",
      deletedDescription: "{{name}}を削除しました",
      deletedFailedTitle: "アーティストの削除に失敗しました"
    },
    settings: {
      title: "設定"
    }
  }
}
