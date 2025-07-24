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
      unfavorite: "お気に入り解除",
      enableShuffle: "シャッフルを有効にする",
      disableShuffle: "シャッフルを無効にする",
      previous: "前へ",
      play: "再生",
      pause: "一時停止",
      next: "次へ",
      enableRepeat: "リピートを有効にする",
      enableRepeatOne: "1曲リピートを有効にする",
      disableRepeat: "リピートを無効にする",
      mute: "ミュート",
      unmute: "ミュート解除",
      queue: "キュー",
      title: "タイトル",
      album: "アルバム",
      date: "日付",
      duration: "再生時間",
      search: "検索",
      selectAll: "すべて選択",
      visibility: "表示",
      columns: "列",
      clear: "クリア",
      cancel: "キャンセル",
      more: "もっと",
      select: "選択"
    },
    form: {
      titles: {
        createSong: "曲を作成",
        updateSong: "曲を更新",
        deleteSong: "曲を削除",
        createArtist: "アーティストを作成",
        updateArtist: "アーティストを更新",
        deleteArtist: "アーティストを削除",
        createPlaylist: "プレイリストを作成",
        updatePlaylist: "プレイリストを更新",
        deletePlaylist: "プレイリストを削除",
        confirmation: "確認",
        warning: "警告"
      },
      labels: {
        name: "名前",
        thumbnail: "サムネイル",
        file: "ファイル",
        releaseYear: "リリース年",
        album: "アルバム",
        artists: "アーティスト",
        isSingle: "シングルです",
        folder: "フォルダ"
      },
      buttons: {
        cancel: "キャンセル",
        delete: "削除",
        update: "更新",
        create: "作成"
      },
      descriptions: {
        thumbnail: "背景画像（オプション）",
        fileSize: "最大サイズ: {{size}}",
        supportedFormats: "対応フォーマット: {{formats}}"
      },
      messages: {
        confirmDelete: "本当に削除しますか？",
        unsavedChanges: "未保存の変更があります"
      }
    },
    validation: {
      name: {
        required: "名前は必須です",
        max: "名前は最大200文字までです"
      },
      file: {
        required: "ファイルは必須です",
        invalid: "無効または破損したファイルです",
        max: "ファイルは最大サイズ{{maxSize}}を超えています"
      },
      duration: {
        required: "再生時間は必須です",
        min: "再生時間は0以上でなければなりません"
      },
      releaseYear: {
        invalid: "無効なリリース年です",
        min: "リリース年は0以上でなければなりません",
        max: "リリース年は未来の日付にできません"
      },
      albumId: {
        invalid: "無効なアルバムです",
        requiredIfNotSingle: "シングルでない場合、アルバムは必須です"
      },
      artists: {
        min: "最低1人のアーティストが必要です"
      }
    },
    update: {
      downloading: "アップデートをダウンロードおよびインストール中",
      downloadingDescription: "新しいアップデートが利用可能で、自動的にインストールされています",
      installedSuccess: "アップデートが正常にインストールされました",
      failed: "アップデートのインストールに失敗しました"
    },
    breadcrumbs: {
      home: {
        title: "ホーム"
      },
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
    home: {
      title: "ホーム"
    },
    songs: {
      title: "曲",
      createdTitle: "曲の作成に成功しました",
      createdDescription: "{{name}} が作成されました",
      createdFailedTitle: "曲の作成に失敗しました",
      updatedTitle: "曲の更新に成功しました",
      updatedDescription: "{{name}} が更新されました",
      updatedFailedTitle: "曲の更新に失敗しました",
      deletedTitle: "曲の削除に成功しました",
      deletedDescription: "{{name}} が削除されました",
      deletedFailedTitle: "曲の削除に失敗しました"
    },
    favorites: {
      title: "お気に入り",
      createdTitle: "お気に入りに追加されました",
      createdDescription: "{{name}} がお気に入りに追加されました",
      createdFailedTitle: "お気に入りへの追加に失敗しました",
      deletedTitle: "お気に入りから削除されました",
      deletedDescription: "{{name}} がお気に入りから削除されました",
      deletedFailedTitle: "お気に入りからの削除に失敗しました"
    },
    playlists: {
      title: "プレイリスト",
      createdTitle: "プレイリストの作成に成功しました",
      createdDescription: "{{name}} が作成されました",
      createdFailedTitle: "プレイリストの作成に失敗しました",
      updatedTitle: "プレイリストの更新に成功しました",
      updatedDescription: "{{name}} が更新されました",
      updatedFailedTitle: "プレイリストの更新に失敗しました",
      deletedTitle: "プレイリストの削除に成功しました",
      deletedDescription: "{{name}} が削除されました",
      deletedFailedTitle: "プレイリストの削除に失敗しました"
    },
    artists: {
      title: "アーティスト",
      createdTitle: "アーティストの作成に成功しました",
      createdDescription: "{{name}} が作成されました",
      createdFailedTitle: "アーティストの作成に失敗しました",
      updatedTitle: "アーティストの更新に成功しました",
      updatedDescription: "{{name}} が更新されました",
      updatedFailedTitle: "アーティストの更新に失敗しました",
      deletedTitle: "アーティストの削除に成功しました",
      deletedDescription: "{{name}} が削除されました",
      deletedFailedTitle: "アーティストの削除に失敗しました"
    },
    settings: {
      title: "設定",
      appearance: {
        title: "外観",
        description: "希望の外観モードを選択してください",
        light: "ライト",
        dark: "ダーク",
        system: "システム"
      },
      language: {
        title: "言語",
        description: "希望の言語を選択してください"
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
