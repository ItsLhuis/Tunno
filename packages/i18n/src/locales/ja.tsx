import Ja from "../assets/ja.svg"

import { type Language } from "../types"

/**
 * Japanese language configuration.
 */
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
      thisWeek: "今週",
      thisMonth: "今月",
      yesterday: "昨日",
      years: "{count}年",
      weeks: "{count}週間",
      days: "{count}日",
      hours: "{count}時間",
      minutes: "{count}分",
      seconds: "{count}秒",
      goBack: "戻る",
      goForward: "進む",
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
      removeFromQueue: "キューから削除",
      removeFromPlaylist: "プレイリストから削除",
      nowPlaying: "再生中",
      noSongPlaying: "再生されていません",
      upNext: "次の曲",
      actions: "アクション",
      addTo: "追加",
      playlist: "再生リスト",
      song: "楽曲",
      lyrics: "歌詞",
      openMiniplayer: "ミニプレーヤーを開く",
      enterFullScreen: "フルスクリーンに入る",
      exitFullScreen: "フルスクリーンを終了",
      goToSong: "楽曲に移動",
      goToAlbum: "アルバムに移動",
      goToPlaylist: "再生リストに移動",
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
      neverPlayed: "再生されたことがない",
      streak: "ストリーク",
      refresh: "更新",
      showingOfTotal: "{total}件中{showing}件を表示",
      start: "開始",
      completed: "完了",
      songsPlayed: "{count}曲",
      appearsIn: "に含まれる",
      addToSidebar: "サイドバーに追加",
      removeFromSidebar: "サイドバーから削除",
      featured: "注目",
      stats: "統計",
      openToStart: "開始するにはTunnoを開く"
    },
    form: {
      titles: {
        createSong: "曲を作成",
        updateSong: "曲を更新",
        deleteSong: "曲を削除",
        createArtist: "アーティストを作成",
        updateArtist: "アーティストを更新",
        deleteArtist: "アーティストを削除",
        createAlbum: "アルバムを作成",
        updateAlbum: "アルバムを更新",
        deleteAlbum: "アルバムを削除",
        createPlaylist: "再生リストを作成",
        updatePlaylist: "再生リストを更新",
        deletePlaylist: "再生リストを削除",
        addToPlaylist: "プレイリストに追加",
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
        albumType: "アルバムタイプ",
        artists: "アーティスト",
        folder: "フォルダ",
        lyrics: "歌詞"
      },
      buttons: {
        cancel: "キャンセル",
        delete: "削除",
        update: "更新",
        create: "作成",
        add: "追加"
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
      },
      albumType: {
        invalid: "無効なアルバムタイプ"
      },
      playlistIds: {
        invalid: "無効なプレイリスト"
      },
      album: {
        duplicate: "この名前のアルバムは既に存在します",
        integrity:
          "このアルバムとアーティストの両方に属する曲があるため、アルバムからアーティストを削除できません"
      },
      artist: {
        duplicate: "この名前のアーティストは既に存在します",
        integrity:
          "このアーティストに属する曲があり、それらの曲がこのアーティストも含むアルバムにも属しているため、アーティストを削除できません"
      },
      playlist: {
        duplicate: "この名前のプレイリストは既に存在します"
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
        title: "再生リスト"
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
        },
        about: {
          title: "について"
        }
      },
      lyrics: {
        title: "歌詞"
      }
    },
    home: {
      title: "ホーム",
      jumpBackIn: {
        title: "続きを再生",
        description: "中断したところから再開"
      },
      newReleases: {
        title: "新着リリース",
        description: "コレクションへの新しい追加"
      },
      onRepeat: {
        title: "リピート中",
        description: "止められない楽曲"
      },
      discover: {
        title: "発見",
        description: "あなたのための新しい音楽レコメンデーション"
      },
      favoriteArtists: {
        title: "あなたのアーティスト",
        description: "最も愛するアーティスト"
      },
      yourPlaylists: {
        title: "あなたのために作成",
        description: "あなたの個人プレイリスト"
      },
      topAlbums: {
        title: "トップアルバム",
        description: "最も再生されたアルバム"
      },
      recentlyAdded: {
        title: "最近追加されたもの",
        description: "ライブラリへの新しい追加"
      },
      empty: {
        title: "あなたのライブラリは空です",
        description:
          "Tunnoへようこそ。始めるには、あなたの個人ライブラリに音楽を追加する必要があります。",
        getStarted: "始める",
        songs: {
          title: "曲をインポート",
          description: "デバイスから音楽ファイルを追加して、ライブラリの構築を開始します"
        },
        albums: {
          title: "アルバムを作成",
          description: "アートワークと詳細を含むアルバムを作成して音楽を整理します"
        },
        playlists: {
          title: "プレイリストを作成",
          description: "あらゆる気分やアクティビティに合わせて独自のミックスをキュレーションします"
        },
        artists: {
          title: "アーティストを追加",
          description: "アーティストプロファイルを作成して、彼らの音楽を整理および管理します"
        }
      }
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
      title: "再生リスト",
      createdTitle: "再生リストが正常に作成されました",
      createdDescription: "{name} が作成されました",
      createdFailedTitle: "再生リストの作成に失敗しました",
      updatedTitle: "再生リストが正常に更新されました",
      updatedDescription: "{name} が更新されました",
      updatedFailedTitle: "再生リストの更新に失敗しました",
      songsAddedTitle: "曲が正常に追加されました",
      songsAddedFailedTitle: "曲の追加に失敗しました",
      deletedTitle: "再生リストが正常に削除されました",
      deletedDescription: "{name} が削除されました",
      deletedFailedTitle: "再生リストの削除に失敗しました",
      filters: {
        title: "フィルター",
        clear: "アクティブなフィルターをクリア",
        sortBy: "並び替え",
        favorites: "お気に入りのみ",
        favoritesDescription: "お気に入りの再生リストのみ表示",
        playCount: "再生回数",
        playCountMin: "最小再生回数",
        playCountMax: "最大再生回数",
        totalTracks: "総トラック数",
        totalTracksMin: "最小トラック数",
        totalTracksMax: "最大トラック数",
        totalDuration: "総再生時間",
        totalDurationMin: "最小再生時間",
        totalDurationMax: "最大再生時間",
        lastPlayed: "最終再生",
        lastPlayedAfter: "以降",
        lastPlayedBefore: "以前",
        selectDate: "日付を選択",
        sortOptions: {
          name: "名前",
          favorites: "お気に入り",
          playCount: "再生回数",
          totalTracks: "総トラック数",
          totalDuration: "総再生時間",
          lastPlayed: "最終再生",
          createdAt: "作成日",
          updatedAt: "更新日"
        }
      }
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
      deletedFailedTitle: "アルバムの削除に失敗しました",
      filters: {
        title: "フィルター",
        clear: "アクティブなフィルターをクリア",
        sortBy: "並び替え",
        favorites: "お気に入りのみ",
        favoritesDescription: "お気に入りのアルバムのみ表示",
        albumType: "アルバムタイプ",
        all: "すべてのタイプ",
        single: "シングル",
        album: "アルバム",
        compilation: "コンピレーション",
        releaseYear: "リリース年",
        releaseYearMin: "最小年",
        releaseYearMax: "最大年",
        playCount: "再生回数",
        playCountMin: "最小再生回数",
        playCountMax: "最大再生回数",
        totalTracks: "総トラック数",
        totalTracksMin: "最小トラック数",
        totalTracksMax: "最大トラック数",
        totalDuration: "総再生時間",
        totalDurationMin: "最小再生時間",
        totalDurationMax: "最大再生時間",
        lastPlayed: "最後に再生",
        lastPlayedAfter: "再生後",
        lastPlayedBefore: "再生前",
        selectDate: "日付を選択",
        sortOptions: {
          name: "名前",
          releaseYear: "リリース年",
          favorites: "お気に入り",
          playCount: "再生回数",
          totalTracks: "総トラック数",
          totalDuration: "総再生時間",
          lastPlayed: "最後に再生",
          createdAt: "作成日",
          updatedAt: "更新日"
        }
      }
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
    sidebar: {
      addedTitle: "サイドバーに追加しました",
      addedDescription: "{name}をサイドバーに追加しました",
      addedFailedTitle: "サイドバーへの追加に失敗しました",
      removedTitle: "サイドバーから削除しました",
      removedDescription: "{name}をサイドバーから削除しました"
    },
    settings: {
      title: "設定",
      appearance: {
        title: "外観",
        description: "アプリケーションの外観設定を定義します。",
        theme: {
          title: "テーマ",
          description: "アプリケーションのテーマを選択してください",
          light: "ライト",
          dark: "ダーク",
          system: "システム"
        },
        zoom: {
          title: "ズーム",
          description: "アプリケーションのズームレベルを調整"
        }
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
        description: "デバイス間でデータを同期します",
        export: {
          title: "ライブラリをエクスポート",
          description:
            "バックアップや他のデバイスで使用するために、ライブラリをバンドルファイルとしてエクスポートします",
          selectDestination: "保存先を選択",
          exportingSongs: "{count}曲をエクスポート中",
          preparingExport: "エクスポートを準備中",
          exportingMessage: "しばらくお待ちください",
          exportSuccess: "ライブラリのエクスポートが完了しました",
          showFolder: "フォルダを表示",
          exportAgain: "再度エクスポート",
          exportFailed: "エクスポートに失敗しました",
          tryAgain: "再試行",
          noSongs: "エクスポートする曲がありません",
          libraryEmpty: "ライブラリが空です",
          noValidSongs: "エクスポートできる有効な曲がありません",
          missingAlbumInfo: "すべての曲にアルバム情報がありません",
          songsExported: "{count}曲をバンドルにエクスポートしました"
        },
        desktop: {
          title: "モバイルと同期",
          description: "ローカルネットワークを介してライブラリをTunnoモバイルに転送します"
        },
        mobile: {
          title: "コンピューターと同期",
          generateQr: "QRコード生成",
          stopServer: "サーバーを停止",
          waitingConnection: "モバイルデバイスの接続を待機中",
          deviceConnected: "デバイスが接続されました",
          syncInProgress: "同期中",
          syncCompleted: "同期が完了しました",
          serverError: "同期サーバーを起動できませんでした",
          scanQr: "QRコードをスキャン",
          scanQrDescription:
            "デスクトップのQRコードをスキャンして、ローカルネットワークを介して音楽ライブラリを転送します",
          connecting: "接続中",
          comparing: "ライブラリを比較中",
          syncing: "同期中",
          finalizing: "最終処理中",
          completed: "同期完了",
          completedDescription: "音楽ライブラリが正常に同期されました",
          alreadySynced: "同期済み",
          failed: "同期に失敗しました",
          cancel: "キャンセル",
          done: "完了",
          songsSynced: "{synced} / {total} 曲",
          batchProgress: "バッチ {current} / {total}",
          cameraPermissionTitle: "カメラへのアクセスが必要です",
          cameraPermissionDescription:
            "デスクトップに表示されたQRコードをスキャンするためにカメラの権限を許可してください",
          grantPermission: "権限を許可",
          cameraLoading: "カメラを読み込み中",
          scanInstruction: "デスクトップのQRコードにカメラを向けてください",
          connectionFailed: "デスクトップサーバーに接続できませんでした",
          insufficientStorageDescription:
            "同期に十分な空き容量がありません。{required}必要ですが、{available}しか利用できません",
          syncInterrupted: "アプリがバックグラウンドに移動したため同期が中断されました",
          downloadingItem: '"{name}" をダウンロード中',
          fetchingBatch: "バッチ {batch} のメタデータを取得中",
          updatingStats: "統計を更新中",
          syncComplete: "同期完了",
          comparingLibraries: "ライブラリを比較中",
          connectingToDesktop: "デスクトップに接続中",
          cancelledByMobile: "モバイルデバイスによって同期がキャンセルされました",
          syncTimedOut: "モバイルデバイスが応答しません",
          connectionLost: "デスクトップサーバーが切断されました"
        }
      },
      about: {
        title: "について",
        description: "アプリケーション情報とバージョン詳細",
        version: "バージョン",
        whatsNew: {
          title: "新着情報",
          description: "最新の機能と改善を確認してください",
          newRelease: "新リリース",
          viewChangelog: "変更履歴を見る"
        },
        storage: {
          title: "ストレージとデータ",
          description: "アプリケーションデータと設定を管理",
          openDataFolder: "データフォルダを開く"
        },
        legal: {
          title: "法律と著作権",
          description: "ライセンス情報と法的文書",
          copyright: "著作権",
          licensed: "MITライセンスの下でライセンスされています",
          viewLicense: "ライセンスを表示",
          viewOnGitHub: "GitHubで表示"
        }
      }
    },
    fastUpload: {
      title: "高速アップロード",
      description: "CLIからのバンドルまたはエクスポート元からインポート",
      cliTooltip: "Tunno CLIドキュメントを開く",
      selectBundle: "バンドルを選択",
      changeBundle: "バンドルを変更",
      status: {
        pending: "保留中",
        processing: "処理中",
        success: "成功",
        error: "エラー",
        skipped: "スキップ"
      },
      completed: {
        allSuccess: {
          title: "インポート完了",
          description: "{count}曲が正常にインポートされました"
        },
        withErrors: {
          title: "エラーありでインポート完了",
          description: "{successCount}件インポート、{errorCount}件失敗、{skippedCount}件スキップ"
        },
        withSkipped: {
          title: "インポート完了",
          description: "{successCount}件インポート、{skippedCount}件スキップ"
        }
      }
    },
    lyrics: {
      title: "歌詞"
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
