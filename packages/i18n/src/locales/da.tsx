import Da from "../assets/da.svg"

import { type Language } from "../types"

export const danish: Language = {
  code: "da",
  name: "Dansk",
  flag: Da,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ingen resultater fundet",
      lessThanAnHourAgo: "Mindre end en time siden",
      hoursAgo: "{count} time{count, plural, one {} other{r}} siden",
      today: "I dag",
      yesterday: "I går",
      goBack: "Gå tilbage",
      goFoward: "Gå frem",
      favorite: "Favorit",
      unfavorite: "Fjern favorit",
      enableShuffle: "Aktiver blanding",
      disableShuffle: "Deaktiver blanding",
      previous: "Forrige",
      play: "Afspil",
      pause: "Pause",
      next: "Næste",
      enableRepeat: "Aktiver gentagelse",
      enableRepeatOne: "Aktiver gentag én",
      disableRepeat: "Deaktiver gentagelse",
      mute: "Lydløs",
      unmute: "Slå lyd til",
      queue: "Kø",
      title: "Titel",
      album: "Album",
      date: "Dato",
      duration: "Varighed",
      search: "Søg",
      selectAll: "Vælg alle",
      visibility: "Synlighed",
      columns: "Kolonner",
      clear: "Ryd",
      cancel: "Annuller",
      more: "Mere",
      select: "Vælg",
      preview: "Forhåndsvisning",
      close: "Luk"
    },
    form: {
      titles: {
        createSong: "Opret sang",
        updateSong: "Opdater sang",
        deleteSong: "Slet sang",
        createArtist: "Opret kunstner",
        updateArtist: "Opdater kunstner",
        deleteArtist: "Slet kunstner",
        createPlaylist: "Opret playliste",
        updatePlaylist: "Opdater playliste",
        deletePlaylist: "Slet playliste",
        confirmation: "Bekræftelse",
        warning: "Advarsel",
        lyricsPreview: "Tekstforhåndsvisning"
      },
      labels: {
        name: "Navn",
        thumbnail: "Miniature",
        file: "Fil",
        releaseYear: "Udgivelsesår",
        album: "Album",
        artists: "Kunstnere",
        folder: "Mappe",
        lyrics: "Tekst"
      },
      buttons: {
        cancel: "Annuller",
        delete: "Slet",
        update: "Opdater",
        create: "Opret"
      },
      descriptions: {
        thumbnail: "Baggrundsbillede (valgfrit)",
        fileSize: "Maksimal størrelse: {size}",
        supportedFormats: "Understøttede formater: {formats}",
        lyricsPreview: "Se hvordan teksten vises synkroniseret med tiden"
      },
      badges: {
        lines: "{count} linje{count, plural, one {} other{r}}",
        duration: "Varighed: {time}"
      },
      messages: {
        confirmDelete: "Er du sikker på, at du vil slette?",
        unsavedChanges: "Der er usagte ændringer",
        noLyrics: "Ingen tekst"
      }
    },
    validation: {
      name: {
        required: "Navn er påkrævet",
        max: "Navnet må højst være 200 tegn"
      },
      file: {
        required: "Fil er påkrævet",
        invalid: "Ugyldig eller beskadiget fil",
        max: "Filen overskrider den maksimale størrelse på {maxSize}"
      },
      duration: {
        required: "Varighed er påkrævet",
        min: "Varighed skal være mindst 0"
      },
      releaseYear: {
        invalid: "Ugyldigt udgivelsesår",
        min: "Udgivelsesår skal være mindst 0",
        max: "Udgivelsesår kan ikke være i fremtiden"
      },
      albumId: {
        invalid: "Ugyldigt album"
      },
      artists: {
        invalid: "Ugyldige kunstnere"
      }
    },
    update: {
      downloading: "Downloader og installerer opdatering",
      downloadingDescription: "En ny opdatering er tilgængelig og installeres automatisk",
      installedSuccess: "Opdatering installeret med succes",
      failed: "Kunne ikke installere opdatering"
    },
    breadcrumbs: {
      home: {
        title: "Hjem"
      },
      songs: {
        title: "Sange"
      },
      favorites: {
        title: "Favoritter"
      },
      playlists: {
        title: "Playlister"
      },
      artists: {
        title: "Kunstnere"
      },
      fastUpload: {
        title: "Hurtig upload"
      },
      settings: {
        title: "Indstillinger",
        appearance: {
          title: "Udseende"
        },
        language: {
          title: "Sprog"
        },
        sync: {
          title: "Synkronisering"
        }
      }
    },
    home: {
      title: "Hjem"
    },
    songs: {
      title: "Sange",
      createdTitle: "Sang oprettet succesfuldt",
      createdDescription: "{name} er oprettet",
      createdFailedTitle: "Kunne ikke oprette sang",
      updatedTitle: "Sang opdateret succesfuldt",
      updatedDescription: "{name} er opdateret",
      updatedFailedTitle: "Kunne ikke opdatere sang",
      deletedTitle: "Sang slettet succesfuldt",
      deletedDescription: "{name} er slettet",
      deletedFailedTitle: "Kunne ikke slette sang"
    },
    favorites: {
      title: "Favoritter",
      createdTitle: "Tilføjet til favoritter",
      createdDescription: "{name} er tilføjet til favoritter",
      createdFailedTitle: "Kunne ikke tilføje til favoritter",
      deletedTitle: "Fjernet fra favoritter",
      deletedDescription: "{name} er fjernet fra favoritter",
      deletedFailedTitle: "Kunne ikke fjerne fra favoritter"
    },
    playlists: {
      title: "Playlister",
      createdTitle: "Playlist oprettet succesfuldt",
      createdDescription: "{name} er oprettet",
      createdFailedTitle: "Kunne ikke oprette playlist",
      updatedTitle: "Playlist opdateret succesfuldt",
      updatedDescription: "{name} er opdateret",
      updatedFailedTitle: "Kunne ikke opdatere playlist",
      deletedTitle: "Playlist slettet succesfuldt",
      deletedDescription: "{name} er slettet",
      deletedFailedTitle: "Kunne ikke slette playlist"
    },
    artists: {
      title: "Kunstnere",
      createdTitle: "Kunstner oprettet succesfuldt",
      createdDescription: "{name} er oprettet",
      createdFailedTitle: "Kunne ikke oprette kunstner",
      updatedTitle: "Kunstner opdateret succesfuldt",
      updatedDescription: "{name} er opdateret",
      updatedFailedTitle: "Kunne ikke opdatere kunstner",
      deletedTitle: "Kunstner slettet succesfuldt",
      deletedDescription: "{name} er slettet",
      deletedFailedTitle: "Kunne ikke slette kunstner"
    },
    settings: {
      title: "Indstillinger",
      appearance: {
        title: "Udseende",
        description: "Vælg din foretrukne udseendetilstand",
        light: "Lys",
        dark: "Mørk",
        system: "System"
      },
      language: {
        title: "Sprog",
        description: "Vælg dit foretrukne sprog"
      },
      sync: {
        title: "Synkronisering",
        description: "Synkroniser dine data på tværs af enheder"
      }
    },
    fastUpload: {
      title: "Hurtig upload"
    },
    languages: {
      da: "Dansk",
      de: "Tysk",
      en: "Engelsk",
      es: "Spansk",
      fi: "Finsk",
      fr: "Fransk",
      hi: "Hindi",
      it: "Italiensk",
      ja: "Japansk",
      ko: "Koreansk",
      nl: "Hollandsk",
      no: "Norsk",
      pl: "Polsk",
      pt: "Portugisisk",
      ru: "Russisk",
      sv: "Svensk",
      tr: "Tyrkisk",
      uk: "Ukrainsk",
      vi: "Vietnamesisk",
      zh: "Kinesisk"
    }
  }
}
