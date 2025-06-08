import Ja from "../assets/ja.svg"

import { type Language } from "../types"

export const japanese: Language = {
  code: "ja",
  name: "日本語",
  flag: Ja,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "結果が見つかりません",
      lessThanAnHourAgo: "1時間以内",
      hoursAgo: "{{count}}時間前",
      today: "今日",
      yesterday: "昨日"
    },
    update: {
      downloading: "アップデートをダウンロードしてインストール中",
      downloadingDescription: "新しいアップデートが利用可能で、自動的にインストールされています",
      installedSuccess: "アップデートが正常にインストールされました",
      failed: "アップデートのインストールに失敗しました"
    },
    songs: {
      title: "曲",
      createdTitle: "曲が正常に作成されました",
      createdDescription: "{{name}}が作成されました",
      createdFailedTitle: "曲の作成に失敗しました",
      updatedTitle: "曲が正常に更新されました",
      updatedDescription: "{{name}}が更新されました",
      updatedFailedTitle: "曲の更新に失敗しました",
      deletedTitle: "曲が正常に削除されました",
      deletedDescription: "{{name}}が削除されました",
      deletedFailedTitle: "曲の削除に失敗しました"
    },
    favorites: {
      title: "お気に入り",
      addedTitle: "お気に入りに追加されました",
      addedDescription: "{{name}}がお気に入りに追加されました",
      addedFailedTitle: "お気に入りへの追加に失敗しました",
      removedTitle: "お気に入りから削除されました",
      removedDescription: "{{name}}がお気に入りから削除されました",
      removedFailedTitle: "お気に入りからの削除に失敗しました"
    },
    playlists: {
      title: "プレイリスト",
      createdTitle: "プレイリストが正常に作成されました",
      createdDescription: "{{name}}が作成されました",
      createdFailedTitle: "プレイリストの作成に失敗しました",
      updatedTitle: "プレイリストが正常に更新されました",
      updatedDescription: "{{name}}が更新されました",
      updatedFailedTitle: "プレイリストの更新に失敗しました",
      deletedTitle: "プレイリストが正常に削除されました",
      deletedDescription: "{{name}}が削除されました",
      deletedFailedTitle: "プレイリストの削除に失敗しました"
    },
    artists: {
      title: "アーティスト",
      createdTitle: "アーティストが正常に作成されました",
      createdDescription: "{{name}}が作成されました",
      createdFailedTitle: "アーティストの作成に失敗しました",
      updatedTitle: "アーティストが正常に更新されました",
      updatedDescription: "{{name}}が更新されました",
      updatedFailedTitle: "アーティストの更新に失敗しました",
      deletedTitle: "アーティストが正常に削除されました",
      deletedDescription: "{{name}}が削除されました",
      deletedFailedTitle: "アーティストの削除に失敗しました"
    },
    settings: {
      title: "設定",
      theme: {
        title: "テーマ",
        description: "お好みの外観モードを選択してください",
        light: "ライト",
        dark: "ダーク",
        system: "システム"
      },
      language: {
        title: "言語",
        description: "お好みの言語を選択してください"
      },
      sync: {
        title: "同期",
        description: "デバイス間でデータを同期します"
      }
    }
  }
}
