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
      hoursAgo: "{count}時間前",
      today: "今日",
      yesterday: "昨日",
      years: "{count}年",
      weeks: "{count}週間",
      days: "{count}日",
      hours: "{count}時間",
      minutes: "{count}分",
      seconds: "{count}秒",
      goBack: "戻る",
      goFoward: "進む",
      favorite: "お気に入りに追加",
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
      artist: "アーティスト",
      date: "日付",
      added: "追加",
      duration: "再生時間",
      search: "検索",
      selectAll: "すべて選択",
      clear: "クリア",
      cancel: "キャンセル",
      more: "もっと見る",
      select: "選択",
      preview: "プレビュー",
      close: "閉じる",
      playback: "再生",
      playNext: "次を再生",
      actions: "アクション",
      addTo: "追加",
      playlist: "プレイリスト",
      song: "楽曲",
      lyrics: "歌詞",
      openMiniplayer: "ミニプレーヤーを開く",
      enterFullScreen: "フルスクリーンに入る",
      exitFullScreen: "フルスクリーンを終了",
      goToSong: "楽曲に移動",
      goToAlbum: "アルバムに移動",
      goToArtist: "アーティストに移動",
      shuffleAndPlay: "シャッフルして再生",
      unknown: "不明",
      unknownAlbum: "不明なアルバム",
      unknownArtist: "不明なアーティスト",
      listenTime: "リスン時間",
      averageListenTime: "平均リスン時間",
      retentionRate: "リテンション率",
      totalPlays: "総再生回数",
      lastPlayed: "最後に再生",
      neverPlayed: "再生されたことがない"
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
        warning: "警告",
        lyricsPreview: "歌詞プレビュー"
      },
      labels: {
        name: "名前",
        thumbnail: "サムネイル",
        file: "ファイル",
        releaseYear: "リリース年",
        album: "アルバム",
        artists: "アーティスト",
        folder: "フォルダ",
        lyrics: "歌詞"
      },
      buttons: {
        cancel: "キャンセル",
        delete: "削除",
        update: "更新",
        create: "作成"
      },
      descriptions: {
        thumbnail: "背景画像（任意）",
        fileSize: "最大サイズ: {size}",
        supportedFormats: "対応フォーマット: {formats}",
        lyricsPreview: "歌詞が時間に同期して表示される様子を確認"
      },
      badges: {
        lines: "{count} 行",
        duration: "再生時間: {time}"
      },
      messages: {
        confirmDelete: "本当に削除しますか？",
        unsavedChanges: "未保存の変更があります",
        noLyrics: "歌詞がありません"
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
        max: "ファイルは最大サイズ{maxSize}を超えています"
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
        invalid: "無効なアルバムです"
      },
      artists: {
        invalid: "無効なアーティスト"
      }
    },
    update: {
      downloading: "更新をダウンロードおよびインストールしています",
      downloadingDescription: "新しい更新が利用可能で自動的にインストールされています",
      installedSuccess: "更新が正常にインストールされました",
      failed: "更新のインストールに失敗しました"
    },
    breadcrumbs: {
      home: {
        title: "ホーム"
      },
      songs: {
        title: "曲"
      },
      playlists: {
        title: "プレイリスト"
      },
      albums: {
        title: "アルバム"
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
        equalizer: {
          title: "イコライザー"
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
      createdTitle: "曲が正常に作成されました",
      createdDescription: "{name} が作成されました",
      createdFailedTitle: "曲の作成に失敗しました",
      updatedTitle: "曲が正常に更新されました",
      updatedDescription: "{name} が更新されました",
      updatedFailedTitle: "曲の更新に失敗しました",
      deletedTitle: "曲が正常に削除されました",
      deletedDescription: "{name} が削除されました",
      deletedFailedTitle: "曲の削除に失敗しました",
      filters: {
        title: "フィルター",
        clear: "アクティブなフィルターをクリア",
        sortBy: "並び替え",
        favorites: "お気に入りのみ",
        favoritesDescription: "お気に入りの楽曲のみ表示",
        lyrics: "歌詞あり",
        lyricsDescription: "歌詞のある楽曲のみ表示",
        releaseYear: "リリース年",
        duration: "時間",
        durationMin: "最小",
        durationMax: "最大",
        playCount: "再生回数",
        playCountMin: "最小",
        playCountMax: "最大",
        lastPlayed: "最後の再生",
        lastPlayedAfter: "以降",
        lastPlayedBefore: "以前",
        selectDate: "日付を選択",
        sortOptions: {
          name: "名前",
          duration: "時間",
          favorites: "お気に入り",
          year: "年",
          playCount: "再生回数",
          lastPlayed: "最後の再生",
          createdAt: "作成日",
          updatedAt: "更新日"
        }
      }
    },
    playlists: {
      title: "プレイリスト",
      createdTitle: "プレイリストが正常に作成されました",
      createdDescription: "{name} が作成されました",
      createdFailedTitle: "プレイリストの作成に失敗しました",
      updatedTitle: "プレイリストが正常に更新されました",
      updatedDescription: "{name} が更新されました",
      updatedFailedTitle: "プレイリストの更新に失敗しました",
      deletedTitle: "プレイリストが正常に削除されました",
      deletedDescription: "{name} が削除されました",
      deletedFailedTitle: "プレイリストの削除に失敗しました"
    },
    albums: {
      title: "アルバム",
      createdTitle: "アルバムが正常に作成されました",
      createdDescription: "{name} が作成されました",
      createdFailedTitle: "アルバムの作成に失敗しました",
      updatedTitle: "アルバムが正常に更新されました",
      updatedDescription: "{name} が更新されました",
      updatedFailedTitle: "アルバムの更新に失敗しました",
      deletedTitle: "アルバムが正常に削除されました",
      deletedDescription: "{name} が削除されました",
      deletedFailedTitle: "アルバムの削除に失敗しました"
    },
    artists: {
      title: "アーティスト",
      createdTitle: "アーティストが正常に作成されました",
      createdDescription: "{name} が作成されました",
      createdFailedTitle: "アーティストの作成に失敗しました",
      updatedTitle: "アーティストが正常に更新されました",
      updatedDescription: "{name} が更新されました",
      updatedFailedTitle: "アーティストの更新に失敗しました",
      deletedTitle: "アーティストが正常に削除されました",
      deletedDescription: "{name} が削除されました",
      deletedFailedTitle: "アーティストの削除に失敗しました",
      filters: {
        title: "フィルター",
        clear: "アクティブなフィルターをクリア",
        sortBy: "並び替え",
        favorites: "お気に入りのみ",
        favoritesDescription: "お気に入りのアーティストのみ表示",
        playCount: "再生回数",
        playCountMin: "最小",
        playCountMax: "最大",
        totalTracks: "総楽曲数",
        totalTracksMin: "最小",
        totalTracksMax: "最大",
        totalDuration: "総再生時間",
        totalDurationMin: "最小",
        totalDurationMax: "最大",
        lastPlayed: "最終再生",
        lastPlayedAfter: "以降",
        lastPlayedBefore: "以前",
        selectDate: "日付を選択",
        sortOptions: {
          name: "名前",
          favorites: "お気に入り",
          playCount: "再生回数",
          totalTracks: "総楽曲数",
          totalDuration: "総再生時間",
          lastPlayed: "最終再生",
          createdAt: "作成日",
          updatedAt: "更新日"
        }
      }
    },
    favorites: {
      createdTitle: "お気に入りに追加されました",
      createdDescription: "{name} がお気に入りに追加されました",
      createdFailedTitle: "お気に入りへの追加に失敗しました",
      deletedTitle: "お気に入りから削除されました",
      deletedDescription: "{name} がお気に入りから削除されました",
      deletedFailedTitle: "お気に入りからの削除に失敗しました"
    },
    settings: {
      title: "設定",
      appearance: {
        title: "外観",
        description: "好みの外観モードを選択してください",
        light: "ライト",
        dark: "ダーク",
        system: "システム"
      },
      language: {
        title: "言語",
        description: "好みの言語を選択してください"
      },
      equalizer: {
        title: "イコライザー",
        enable: {
          title: "イコライザーを有効にする",
          description: "オーディオイコライザーを有効または無効にします",
          enabled: "有効",
          disabled: "無効"
        },
        presets: {
          title: "イコライザープリセット",
          description: "事前定義されたイコライザー設定から選択",
          flat: {
            label: "フラット",
            description: "調整なし"
          },
          rock: {
            label: "ロック",
            description: "低音と高音を強化"
          },
          pop: {
            label: "ポップ",
            description: "軽いブーストでバランス調整"
          },
          jazz: {
            label: "ジャズ",
            description: "中音域をソフトに強調"
          },
          classical: {
            label: "クラシック",
            description: "自然な音"
          },
          electronic: {
            label: "エレクトロニック",
            description: "重い低音とクリアな高音"
          },
          vocal: {
            label: "ボーカル",
            description: "明瞭性のための中音域ブースト"
          },
          bass: {
            label: "ベース",
            description: "低周波数の重い強調"
          },
          treble: {
            label: "トレブル",
            description: "高周波数の強調"
          }
        },
        bands: {
          title: "周波数帯域",
          description: "個別の周波数帯域を調整"
        },
        reset: {
          title: "イコライザーをリセット",
          description: "すべての帯域をフラット（0 dB）にリセット",
          button: "フラットにリセット"
        }
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
