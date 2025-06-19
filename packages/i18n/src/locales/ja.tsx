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
      lessThanAnHourAgo: "1時間未満前",
      hoursAgo: "{{count}}時間前",
      today: "今日",
      yesterday: "昨日",
      goBack: "戻る",
      goFoward: "進む",
      favorite: "お気に入り",
      unfavorite: "お気に入りから削除",
      enableShuffle: "シャッフルを有効化",
      disableShuffle: "シャッフルを無効化",
      previous: "前へ",
      play: "再生",
      pause: "一時停止",
      next: "次へ",
      enableRepeat: "リピートを有効化",
      enableRepeatOne: "1回だけリピート",
      disableRepeat: "リピートを無効化",
      mute: "ミュート",
      unmute: "ミュート解除",
      devices: "デバイス",
      queue: "キュー"
    },
    update: {
      downloading: "アップデートをダウンロード・インストール中",
      downloadingDescription: "新しいアップデートが利用可能で、自動的にインストールされています",
      installedSuccess: "アップデートが正常にインストールされました",
      failed: "アップデートのインストールに失敗しました"
    },
    breadcrumbs: {
      home: {
        title: "ホーム"
      },
      songs: {
        title: "楽曲"
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
      fastUpload: {
        title: "高速アップロード"
      },
      settings: {
        title: "設定",
        appearance: {
          title: "外観"
        },
        language: {
          title: "言語"
        },
        sync: {
          title: "同期"
        }
      }
    },
    home: { title: "ホーム" },
    songs: {
      title: "楽曲",
      createdTitle: "楽曲が正常に作成されました",
      createdDescription: "{{name}}が作成されました",
      createdFailedTitle: "楽曲の作成に失敗しました",
      updatedTitle: "楽曲が正常に更新されました",
      updatedDescription: "{{name}}が更新されました",
      updatedFailedTitle: "楽曲の更新に失敗しました",
      deletedTitle: "楽曲が正常に削除されました",
      deletedDescription: "{{name}}が削除されました",
      deletedFailedTitle: "楽曲の削除に失敗しました"
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
      appearance: {
        title: "外観",
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
    },
    fastUpload: {
      title: "高速アップロード"
    },
    languages: {
      da: "デンマーク語",
      de: "ドイツ語",
      en: "英語",
      es: "スペイン語",
      fi: "フィンランド語",
      fr: "フランス語",
      hi: "ヒンディー語",
      it: "イタリア語",
      ja: "日本語",
      ko: "韓国語",
      nl: "オランダ語",
      no: "ノルウェー語",
      pl: "ポーランド語",
      pt: "ポルトガル語",
      ru: "ロシア語",
      sv: "スウェーデン語",
      tr: "トルコ語",
      uk: "ウクライナ語",
      vi: "ベトナム語",
      zh: "中国語"
    }
  }
}
