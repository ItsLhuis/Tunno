import Ja from "../assets/ja.svg"

import { type Language } from "../types"

export const japanese: Language = {
  code: "ja",
  name: "Japanese",
  flag: Ja,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "結果が見つかりませんでした",
      lessThanAnHourAgo: "1時間以内",
      hoursAgo: "{{count}} 時間前",
      today: "今日",
      yesterday: "昨日",
      goBack: "戻る",
      goFoward: "進む",
      favorite: "お気に入りに追加",
      unfavorite: "お気に入りから削除",
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
      more: "もっと見る"
    },
    form: {
      titles: {
        createSong: "楽曲を作成",
        updateSong: "楽曲を更新",
        deleteSong: "楽曲を削除",
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
        isSingle: "シングルかどうか"
      },
      buttons: {
        cancel: "キャンセル",
        delete: "削除",
        update: "更新",
        create: "作成"
      },
      descriptions: {
        thumbnail: "背景画像（任意）",
        dragAndDrop: "ここにファイルをドラッグ＆ドロップ",
        fileSize: "最大サイズ: {{size}}",
        supportedFormats: "対応フォーマット: {{formats}}"
      },
      messages: {
        confirmDelete: "本当に削除しますか？",
        unsavedChanges: "保存されていない変更があります"
      }
    },
    validation: {
      name: {
        required: "名前は必須です",
        max: "名前は200文字以内で入力してください"
      },
      file: {
        required: "ファイルは必須です",
        max: "ファイル名は50文字以内で入力してください"
      },
      thumbnail: {
        max: "サムネイルは50文字以内で入力してください"
      },
      duration: {
        required: "再生時間は必須です",
        min: "再生時間は0以上でなければなりません"
      },
      releaseYear: {
        invalid: "無効なリリース年です",
        min: "リリース年は0以上でなければなりません",
        max: "リリース年は未来にできません"
      },
      albumId: {
        invalid: "無効なアルバムです",
        requiredIfNotSingle: "シングルでない場合、アルバムは必須です"
      },
      artists: {
        min: "少なくとも1人のアーティストが必要です"
      }
    },
    update: {
      downloading: "アップデートをダウンロードしてインストール中",
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
    home: {
      title: "ホーム"
    },
    songs: {
      title: "楽曲",
      createdTitle: "楽曲が正常に作成されました",
      createdDescription: "{{name}} が作成されました",
      createdFailedTitle: "楽曲の作成に失敗しました",
      updatedTitle: "楽曲が正常に更新されました",
      updatedDescription: "{{name}} が更新されました",
      updatedFailedTitle: "楽曲の更新に失敗しました",
      deletedTitle: "楽曲が正常に削除されました",
      deletedDescription: "{{name}} が削除されました",
      deletedFailedTitle: "楽曲の削除に失敗しました"
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
      createdTitle: "プレイリストが正常に作成されました",
      createdDescription: "{{name}} が作成されました",
      createdFailedTitle: "プレイリストの作成に失敗しました",
      updatedTitle: "プレイリストが正常に更新されました",
      updatedDescription: "{{name}} が更新されました",
      updatedFailedTitle: "プレイリストの更新に失敗しました",
      deletedTitle: "プレイリストが正常に削除されました",
      deletedDescription: "{{name}} が削除されました",
      deletedFailedTitle: "プレイリストの削除に失敗しました"
    },
    artists: {
      title: "アーティスト",
      createdTitle: "アーティストが正常に作成されました",
      createdDescription: "{{name}} が作成されました",
      createdFailedTitle: "アーティストの作成に失敗しました",
      updatedTitle: "アーティストが正常に更新されました",
      updatedDescription: "{{name}} が更新されました",
      updatedFailedTitle: "アーティストの更新に失敗しました",
      deletedTitle: "アーティストが正常に削除されました",
      deletedDescription: "{{name}} が削除されました",
      deletedFailedTitle: "アーティストの削除に失敗しました"
    },
    settings: {
      title: "設定",
      appearance: {
        title: "外観",
        description: "希望の表示モードを選択してください",
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
        description: "複数のデバイス間でデータを同期します"
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
