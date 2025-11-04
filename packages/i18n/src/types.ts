import { type LocaleKeys } from "./locales"

export { type LocaleKeys }

export type Language = {
  code: LocaleKeys
  name: string
  flag: string
  isRtl: boolean
  translations: Translations
}

export type Translations = {
  common: {
    noResultsFound: string
    lessThanAnHourAgo: string
    hoursAgo: string
    today: string
    thisWeek: string
    thisMonth: string
    yesterday: string
    years: string
    weeks: string
    days: string
    hours: string
    minutes: string
    seconds: string
    goBack: string
    goForward: string
    favorite: string
    unfavorite: string
    enableShuffle: string
    disableShuffle: string
    previous: string
    play: string
    pause: string
    next: string
    enableRepeat: string
    enableRepeatOne: string
    disableRepeat: string
    mute: string
    unmute: string
    queue: string
    title: string
    album: string
    artist: string
    date: string
    added: string
    duration: string
    search: string
    selectAll: string
    clear: string
    cancel: string
    more: string
    select: string
    preview: string
    close: string
    playback: string
    playNext: string
    removeFromQueue: string
    removeFromPlaylist: string
    nowPlaying: string
    noSongPlaying: string
    upNext: string
    actions: string
    addTo: string
    playlist: string
    song: string
    lyrics: string
    openMiniplayer: string
    enterFullScreen: string
    exitFullScreen: string
    goToSong: string
    goToAlbum: string
    goToPlaylist: string
    goToArtist: string
    shuffleAndPlay: string
    unknown: string
    unknownAlbum: string
    unknownArtist: string
    listenTime: string
    averageListenTime: string
    retentionRate: string
    totalPlays: string
    lastPlayed: string
    neverPlayed: string
    streak: string
    refresh: string
    showingOfTotal: string
    start: string
    completed: string
    songsPlayed: string
  }
  form: {
    titles: {
      createSong: string
      updateSong: string
      deleteSong: string
      createArtist: string
      updateArtist: string
      deleteArtist: string
      createAlbum: string
      updateAlbum: string
      deleteAlbum: string
      createPlaylist: string
      updatePlaylist: string
      deletePlaylist: string
      addToPlaylist: string
      confirmation: string
      warning: string
      lyricsPreview: string
    }
    labels: {
      name: string
      thumbnail: string
      file: string
      releaseYear: string
      album: string
      albumType: string
      artists: string
      folder: string
      lyrics: string
    }
    buttons: {
      cancel: string
      delete: string
      update: string
      create: string
      add: string
    }
    descriptions: {
      thumbnail: string
      fileSize: string
      supportedFormats: string
      lyricsPreview: string
    }
    badges: {
      lines: string
      duration: string
    }
    messages: {
      confirmDelete: string
      unsavedChanges: string
      noLyrics: string
    }
  }
  validation: {
    name: {
      required: string
      max: string
    }
    file: {
      required: string
      invalid: string
      max: string
    }
    duration: {
      required: string
      min: string
    }
    releaseYear: {
      invalid: string
      min: string
      max: string
    }
    albumId: {
      invalid: string
    }
    artists: {
      invalid: string
    }
    albumType: {
      invalid: string
    }
    playlistIds: {
      invalid: string
    }
    album: {
      duplicate: string
      integrity: string
    }
    artist: {
      duplicate: string
      integrity: string
    }
    playlist: {
      duplicate: string
    }
  }
  update: {
    downloading: string
    downloadingDescription: string
    installedSuccess: string
    failed: string
  }
  breadcrumbs: {
    home: {
      title: string
    }
    songs: {
      title: string
    }
    playlists: {
      title: string
    }
    albums: {
      title: string
    }
    artists: {
      title: string
    }
    fastUpload: {
      title: string
    }
    settings: {
      title: string
      appearance: {
        title: string
      }
      language: {
        title: string
      }
      equalizer: {
        title: string
      }
      sync: {
        title: string
      }
      about: {
        title: string
      }
    }
    lyrics: {
      title: string
    }
  }
  home: {
    title: string
    jumpBackIn: {
      title: string
      description: string
    }
    yourPlaylists: {
      title: string
      description: string
    }
    onRepeat: {
      title: string
      description: string
    }
    newReleases: {
      title: string
      description: string
    }
    favoriteArtists: {
      title: string
      description: string
    }
    topAlbums: {
      title: string
      description: string
    }
    recentlyAdded: {
      title: string
      description: string
    }
    hiddenGems: {
      title: string
      description: string
    }
    discover: {
      title: string
      description: string
    }
    yourStats: {
      title: string
      description: string
      topSong: string
      topAlbum: string
      topArtist: string
      topPlaylist: string
    }
  }
  songs: {
    title: string
    createdTitle: string
    createdDescription: string
    createdFailedTitle: string
    updatedTitle: string
    updatedDescription: string
    updatedFailedTitle: string
    deletedTitle: string
    deletedDescription: string
    deletedFailedTitle: string
    filters: {
      title: string
      clear: string
      sortBy: string
      favorites: string
      favoritesDescription: string
      lyrics: string
      lyricsDescription: string
      releaseYear: string
      duration: string
      durationMin: string
      durationMax: string
      playCount: string
      playCountMin: string
      playCountMax: string
      lastPlayed: string
      lastPlayedAfter: string
      lastPlayedBefore: string
      selectDate: string
      sortOptions: {
        name: string
        duration: string
        favorites: string
        year: string
        playCount: string
        lastPlayed: string
        createdAt: string
        updatedAt: string
      }
    }
  }
  playlists: {
    title: string
    createdTitle: string
    createdDescription: string
    createdFailedTitle: string
    updatedTitle: string
    updatedDescription: string
    updatedFailedTitle: string
    deletedTitle: string
    deletedDescription: string
    deletedFailedTitle: string
    filters: {
      title: string
      clear: string
      sortBy: string
      favorites: string
      favoritesDescription: string
      playCount: string
      playCountMin: string
      playCountMax: string
      totalTracks: string
      totalTracksMin: string
      totalTracksMax: string
      totalDuration: string
      totalDurationMin: string
      totalDurationMax: string
      lastPlayed: string
      lastPlayedAfter: string
      lastPlayedBefore: string
      selectDate: string
      sortOptions: {
        name: string
        favorites: string
        playCount: string
        totalTracks: string
        totalDuration: string
        lastPlayed: string
        createdAt: string
        updatedAt: string
      }
    }
  }
  albums: {
    title: string
    createdTitle: string
    createdDescription: string
    createdFailedTitle: string
    updatedTitle: string
    updatedDescription: string
    updatedFailedTitle: string
    deletedTitle: string
    deletedDescription: string
    deletedFailedTitle: string
    filters: {
      title: string
      clear: string
      sortBy: string
      favorites: string
      favoritesDescription: string
      albumType: string
      all: string
      single: string
      album: string
      compilation: string
      releaseYear: string
      releaseYearMin: string
      releaseYearMax: string
      playCount: string
      playCountMin: string
      playCountMax: string
      totalTracks: string
      totalTracksMin: string
      totalTracksMax: string
      totalDuration: string
      totalDurationMin: string
      totalDurationMax: string
      lastPlayed: string
      lastPlayedAfter: string
      lastPlayedBefore: string
      selectDate: string
      sortOptions: {
        name: string
        releaseYear: string
        favorites: string
        playCount: string
        totalTracks: string
        totalDuration: string
        lastPlayed: string
        createdAt: string
        updatedAt: string
      }
    }
  }
  artists: {
    title: string
    createdTitle: string
    createdDescription: string
    createdFailedTitle: string
    updatedTitle: string
    updatedDescription: string
    updatedFailedTitle: string
    deletedTitle: string
    deletedDescription: string
    deletedFailedTitle: string
    filters: {
      title: string
      clear: string
      sortBy: string
      favorites: string
      favoritesDescription: string
      playCount: string
      playCountMin: string
      playCountMax: string
      totalTracks: string
      totalTracksMin: string
      totalTracksMax: string
      totalDuration: string
      totalDurationMin: string
      totalDurationMax: string
      lastPlayed: string
      lastPlayedAfter: string
      lastPlayedBefore: string
      selectDate: string
      sortOptions: {
        name: string
        favorites: string
        playCount: string
        totalTracks: string
        totalDuration: string
        lastPlayed: string
        createdAt: string
        updatedAt: string
      }
    }
  }
  favorites: {
    createdTitle: string
    createdDescription: string
    createdFailedTitle: string
    deletedTitle: string
    deletedDescription: string
    deletedFailedTitle: string
  }
  settings: {
    title: string
    appearance: {
      title: string
      description: string
      light: string
      dark: string
      system: string
    }
    language: {
      title: string
      description: string
    }
    equalizer: {
      title: string
      enable: {
        title: string
        description: string
        enabled: string
        disabled: string
      }
      presets: {
        title: string
        description: string
        flat: {
          label: string
          description: string
        }
        rock: {
          label: string
          description: string
        }
        pop: {
          label: string
          description: string
        }
        jazz: {
          label: string
          description: string
        }
        classical: {
          label: string
          description: string
        }
        electronic: {
          label: string
          description: string
        }
        vocal: {
          label: string
          description: string
        }
        bass: {
          label: string
          description: string
        }
        treble: {
          label: string
          description: string
        }
      }
      bands: {
        title: string
        description: string
      }
      reset: {
        title: string
        description: string
        button: string
      }
    }
    sync: {
      title: string
      description: string
    }
    about: {
      title: string
      identity: {
        title: string
        description: string
      }
      whatsNew: {
        title: string
        newRelease: string
        viewChangelog: string
        dialog: {
          title: string
        }
      }
      storage: {
        title: string
        description: string
        openDataFolder: string
      }
      legal: {
        title: string
        description: string
        copyright: string
        licensed: string
        viewLicense: string
        viewOnGitHub: string
      }
    }
  }
  fastUpload: {
    title: string
    description: string
    cliTooltip: string
    selectBundle: string
    changeBundle: string
    status: {
      pending: string
      processing: string
      success: string
      error: string
      skipped: string
    }
    completed: {
      allSuccess: {
        title: string
        description: string
      }
      withErrors: {
        title: string
        description: string
      }
      withSkipped: {
        title: string
        description: string
      }
    }
  }
  lyrics: {
    title: string
  }
  languages: {
    da: string
    de: string
    en: string
    es: string
    fi: string
    fr: string
    hi: string
    it: string
    ja: string
    ko: string
    nl: string
    no: string
    pl: string
    pt: string
    ru: string
    sv: string
    tr: string
    uk: string
    vi: string
    zh: string
  }
}
