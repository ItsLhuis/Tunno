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
    yesterday: string
    years: string
    weeks: string
    days: string
    hours: string
    minutes: string
    seconds: string
    goBack: string
    goFoward: string
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
    createdAt: string
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
    actions: string
    addTo: string
    playlist: string
    song: string
    lyrics: string
    openMiniplayer: string
    enterFullScreen: string
    exitFullScreen: string
    goToAlbum: string
    goToArtist: string
    shuffleAndPlay: string
    unknown: string
    unknownAlbum: string
    unknownArtist: string
  }
  form: {
    titles: {
      createSong: string
      updateSong: string
      deleteSong: string
      createArtist: string
      updateArtist: string
      deleteArtist: string
      createPlaylist: string
      updatePlaylist: string
      deletePlaylist: string
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
      artists: string
      folder: string
      lyrics: string
    }
    buttons: {
      cancel: string
      delete: string
      update: string
      create: string
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
      sync: {
        title: string
      }
    }
  }
  home: {
    title: string
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
    sync: {
      title: string
      description: string
    }
  }
  fastUpload: {
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
