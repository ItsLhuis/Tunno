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
    favorites: {
      title: string
    }
    playlists: {
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
  }
  favorites: {
    title: string
    addedTitle: string
    addedDescription: string
    addedFailedTitle: string
    removedTitle: string
    removedDescription: string
    removedFailedTitle: string
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
