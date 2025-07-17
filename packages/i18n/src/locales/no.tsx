import No from "../assets/no.svg"

import { type Language } from "../types"

export const norwegian: Language = {
  code: "no",
  name: "Norsk",
  flag: No,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ingen resultater funnet",
      lessThanAnHourAgo: "Mindre enn en time siden",
      hoursAgo: "{{count}} time{{count, plural, one {} other{r}}} siden",
      today: "I dag",
      yesterday: "I går",
      goBack: "Tilbake",
      goFoward: "Fremover",
      favorite: "Favoritt",
      unfavorite: "Fjern fra favoritter",
      enableShuffle: "Aktiver tilfeldig rekkefølge",
      disableShuffle: "Deaktiver tilfeldig rekkefølge",
      previous: "Forrige",
      play: "Spill av",
      pause: "Pause",
      next: "Neste",
      enableRepeat: "Aktiver gjenta",
      enableRepeatOne: "Gjenta én gang",
      disableRepeat: "Deaktiver gjenta",
      mute: "Demp",
      unmute: "Slå på lyd",
      queue: "Kø",
      title: "Tittel",
      album: "Album",
      date: "Dato",
      duration: "Varighet",
      search: "Søk"
    },
    validation: {
      name: {
        required: "Navn er påkrevd",
        max: "Navnet kan være maksimalt 200 tegn"
      },
      file: {
        required: "Fil er påkrevd",
        max: "Filen kan være maksimalt 50 tegn"
      },
      thumbnail: {
        max: "Miniatyrbildet kan være maksimalt 50 tegn"
      },
      duration: {
        required: "Varighet er påkrevd",
        min: "Varigheten må være minst 0"
      },
      releaseYear: {
        invalid: "Ugyldig utgivelsesår",
        min: "Utgivelsesåret må være minst 0",
        max: "Utgivelsesåret kan ikke være i fremtiden"
      },
      albumId: {
        invalid: "Ugyldig album",
        requiredIfNotSingle: "Album er påkrevd hvis det ikke er en single"
      }
    },
    update: {
      downloading: "Laster ned og installerer oppdatering",
      downloadingDescription: "En ny oppdatering er tilgjengelig og installeres automatisk",
      installedSuccess: "Oppdatering installert vellykket",
      failed: "Kunne ikke installere oppdatering"
    },
    breadcrumbs: {
      home: {
        title: "Hjem"
      },
      songs: {
        title: "Sanger"
      },
      favorites: {
        title: "Favoritter"
      },
      playlists: {
        title: "Spillelister"
      },
      artists: {
        title: "Artister"
      },
      fastUpload: {
        title: "Rask opplasting"
      },
      settings: {
        title: "Innstillinger",
        appearance: {
          title: "Utseende"
        },
        language: {
          title: "Språk"
        },
        sync: {
          title: "Synkronisering"
        }
      }
    },
    home: { title: "Hjem" },
    songs: {
      title: "Sanger",
      createdTitle: "Sang opprettet vellykket",
      createdDescription: "{{name}} er blitt opprettet",
      createdFailedTitle: "Kunne ikke opprette sang",
      updatedTitle: "Sang oppdatert vellykket",
      updatedDescription: "{{name}} er blitt oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere sang",
      deletedTitle: "Sang slettet vellykket",
      deletedDescription: "{{name}} er blitt slettet",
      deletedFailedTitle: "Kunne ikke slette sang"
    },
    favorites: {
      title: "Favoritter",
      addedTitle: "Lagt til i favoritter",
      addedDescription: "{{name}} er blitt lagt til i favoritter",
      addedFailedTitle: "Kunne ikke legge til i favoritter",
      removedTitle: "Fjernet fra favoritter",
      removedDescription: "{{name}} er blitt fjernet fra favoritter",
      removedFailedTitle: "Kunne ikke fjerne fra favoritter"
    },
    playlists: {
      title: "Spillelister",
      createdTitle: "Spilleliste opprettet vellykket",
      createdDescription: "{{name}} er blitt opprettet",
      createdFailedTitle: "Kunne ikke opprette spilleliste",
      updatedTitle: "Spilleliste oppdatert vellykket",
      updatedDescription: "{{name}} er blitt oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere spilleliste",
      deletedTitle: "Spilleliste slettet vellykket",
      deletedDescription: "{{name}} er blitt slettet",
      deletedFailedTitle: "Kunne ikke slette spilleliste"
    },
    artists: {
      title: "Artister",
      createdTitle: "Artist opprettet vellykket",
      createdDescription: "{{name}} er blitt opprettet",
      createdFailedTitle: "Kunne ikke opprette artist",
      updatedTitle: "Artist oppdatert vellykket",
      updatedDescription: "{{name}} er blitt oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere artist",
      deletedTitle: "Artist slettet vellykket",
      deletedDescription: "{{name}} er blitt slettet",
      deletedFailedTitle: "Kunne ikke slette artist"
    },
    settings: {
      title: "Innstillinger",
      appearance: {
        title: "Utseende",
        description: "Velg din foretrukne visningstilstand",
        light: "Lys",
        dark: "Mørk",
        system: "System"
      },
      language: {
        title: "Språk",
        description: "Velg ditt foretrukne språk"
      },
      sync: {
        title: "Synkronisering",
        description: "Synkroniser dine data mellom enheter"
      }
    },
    fastUpload: {
      title: "Rask opplasting"
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
      nl: "Nederlandsk",
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
