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
      lessThanAnHourAgo: "For mindre end en time siden",
      hoursAgo: "{{count}} time{{count, plural, one {} other{r}}} siden",
      today: "I dag",
      yesterday: "I går",
      goBack: "Gå tilbage",
      goFoward: "Gå fremad",
      favorite: "Favorit",
      unfavorite: "Fjern favorit",
      enableShuffle: "Aktiver blanding",
      disableShuffle: "Deaktiver blanding",
      previous: "Forrige",
      play: "Afspil",
      pause: "Pause",
      next: "Næste",
      enableRepeat: "Aktiver gentagelse",
      enableRepeatOne: "Aktiver gentag en",
      disableRepeat: "Deaktiver gentagelse",
      mute: "Slå lyden fra",
      unmute: "Slå lyden til",
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
      more: "Mere"
    },
    form: {
      titles: {
        createSong: "Opret sang",
        updateSong: "Opdater sang",
        deleteSong: "Slet sang",
        createArtist: "Opret kunstner",
        updateArtist: "Opdater kunstner",
        deleteArtist: "Slet kunstner",
        createPlaylist: "Opret afspilningsliste",
        updatePlaylist: "Opdater afspilningsliste",
        deletePlaylist: "Slet afspilningsliste",
        confirmation: "Bekræftelse",
        warning: "Advarsel"
      },
      labels: {
        name: "Navn",
        thumbnail: "Miniaturebillede",
        file: "Fil",
        releaseYear: "Udgivelsesår",
        album: "Album",
        artists: "Kunstnere",
        isSingle: "Er single"
      },
      buttons: {
        cancel: "Annuller",
        delete: "Slet",
        update: "Opdater",
        create: "Opret"
      },
      descriptions: {
        thumbnail: "Baggrundsbillede (valgfrit)",
        fileSize: "Maksimal størrelse: {{size}}",
        supportedFormats: "Understøttede formater: {{formats}}"
      },
      messages: {
        confirmDelete: "Er du sikker på, at du vil slette?",
        unsavedChanges: "Der er ikke-gemte ændringer"
      }
    },
    validation: {
      name: {
        required: "Navn er påkrævet",
        max: "Navn må højst være 200 tegn"
      },
      file: {
        required: "Fil er påkrævet"
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
        invalid: "Ugyldigt album",
        requiredIfNotSingle: "Album er påkrævet, hvis det ikke er en single"
      },
      artists: {
        min: "Mindst én kunstner er påkrævet"
      }
    },
    update: {
      downloading: "Downloader og installerer opdatering",
      downloadingDescription: "En ny opdatering er tilgængelig og bliver installeret automatisk",
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
        title: "Afspilningslister"
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
          title: "Synkroniser"
        }
      }
    },
    home: {
      title: "Hjem"
    },
    songs: {
      title: "Sange",
      createdTitle: "Sang oprettet med succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette sang",
      updatedTitle: "Sang opdateret med succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere sang",
      deletedTitle: "Sang slettet med succes",
      deletedDescription: "{{name}} er blevet slettet",
      deletedFailedTitle: "Kunne ikke slette sang"
    },
    favorites: {
      title: "Favoritter",
      createdTitle: "Tilføjet til favoritter",
      createdDescription: "{{name}} er blevet tilføjet til favoritter",
      createdFailedTitle: "Kunne ikke tilføje til favoritter",
      deletedTitle: "Fjernet fra favoritter",
      deletedDescription: "{{name}} er blevet fjernet fra favoritter",
      deletedFailedTitle: "Kunne ikke fjerne fra favoritter"
    },
    playlists: {
      title: "Afspilningslister",
      createdTitle: "Afspilningsliste oprettet med succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette afspilningsliste",
      updatedTitle: "Afspilningsliste opdateret med succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere afspilningsliste",
      deletedTitle: "Afspilningsliste slettet med succes",
      deletedDescription: "{{name}} er blevet slettet",
      deletedFailedTitle: "Kunne ikke slette afspilningsliste"
    },
    artists: {
      title: "Kunstnere",
      createdTitle: "Kunstner oprettet med succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette kunstner",
      updatedTitle: "Kunstner opdateret med succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere kunstner",
      deletedTitle: "Kunstner slettet med succes",
      deletedDescription: "{{name}} er blevet slettet",
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
        title: "Synkroniser",
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
