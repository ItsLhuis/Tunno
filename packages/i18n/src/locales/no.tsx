import No from "../assets/no.svg"

import { type Language } from "../types"

export const norwegian: Language = {
  code: "no",
  name: "Norwegian",
  flag: No,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ingen resultater funnet",
      lessThanAnHourAgo: "For mindre enn en time siden",
      hoursAgo: "For {{count}} time{{count, plural, one {} other{r}}} siden",
      today: "I dag",
      yesterday: "I går",
      goBack: "Gå tilbake",
      goFoward: "Gå fremover",
      favorite: "Favoritt",
      unfavorite: "Fjern favoritt",
      enableShuffle: "Aktiver blanding",
      disableShuffle: "Deaktiver blanding",
      previous: "Forrige",
      play: "Spill av",
      pause: "Pause",
      next: "Neste",
      enableRepeat: "Aktiver gjenta",
      enableRepeatOne: "Gjenta én gang",
      disableRepeat: "Deaktiver gjenta",
      mute: "Demp",
      unmute: "Opphev demping",
      queue: "Kø",
      title: "Tittel",
      album: "Album",
      date: "Dato",
      duration: "Varighet",
      search: "Søk",
      selectAll: "Velg alle",
      visibility: "Synlighet",
      columns: "Kolonner",
      clear: "Fjern",
      cancel: "Avbryt",
      more: "Mer",
      select: "Velg"
    },
    form: {
      titles: {
        createSong: "Opprett sang",
        updateSong: "Oppdater sang",
        deleteSong: "Slett sang",
        createArtist: "Opprett artist",
        updateArtist: "Oppdater artist",
        deleteArtist: "Slett artist",
        createPlaylist: "Opprett spilleliste",
        updatePlaylist: "Oppdater spilleliste",
        deletePlaylist: "Slett spilleliste",
        confirmation: "Bekreftelse",
        warning: "Advarsel"
      },
      labels: {
        name: "Navn",
        thumbnail: "Miniatyrbilde",
        file: "Fil",
        releaseYear: "Utgivelsesår",
        album: "Album",
        artists: "Artister",
        isSingle: "Er single",
        folder: "Mappe"
      },
      buttons: {
        cancel: "Avbryt",
        delete: "Slett",
        update: "Oppdater",
        create: "Opprett"
      },
      descriptions: {
        thumbnail: "Bakgrunnsbilde (valgfritt)",
        fileSize: "Maksimal størrelse: {{size}}",
        supportedFormats: "Støttede formater: {{formats}}"
      },
      messages: {
        confirmDelete: "Er du sikker på at du vil slette?",
        unsavedChanges: "Det er ulagrede endringer"
      }
    },
    validation: {
      name: {
        required: "Navn er påkrevd",
        max: "Navnet kan være maksimalt 200 tegn"
      },
      file: {
        required: "Fil er påkrevd",
        invalid: "Ugyldig eller ødelagt fil",
        max: "Filen overskrider maksimal størrelse på {{maxSize}}"
      },
      duration: {
        required: "Varighet er påkrevd",
        min: "Varighet må være minst 0"
      },
      releaseYear: {
        invalid: "Ugyldig utgivelsesår",
        min: "Utgivelsesår må være minst 0",
        max: "Utgivelsesår kan ikke være i fremtiden"
      },
      albumId: {
        invalid: "Ugyldig album",
        requiredIfNotSingle: "Album er påkrevd hvis det ikke er en single"
      },
      artists: {
        min: "Minst én artist er påkrevd"
      }
    },
    update: {
      downloading: "Laster ned og installerer oppdatering",
      downloadingDescription: "En ny oppdatering er tilgjengelig og installeres automatisk",
      installedSuccess: "Oppdatering installert",
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
        title: "Hurtigopplasting"
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
    home: {
      title: "Hjem"
    },
    songs: {
      title: "Sanger",
      createdTitle: "Sang opprettet",
      createdDescription: "{{name}} har blitt opprettet",
      createdFailedTitle: "Kunne ikke opprette sang",
      updatedTitle: "Sang oppdatert",
      updatedDescription: "{{name}} har blitt oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere sang",
      deletedTitle: "Sang slettet",
      deletedDescription: "{{name}} har blitt slettet",
      deletedFailedTitle: "Kunne ikke slette sang"
    },
    favorites: {
      title: "Favoritter",
      createdTitle: "Lagt til i favoritter",
      createdDescription: "{{name}} har blitt lagt til i favoritter",
      createdFailedTitle: "Kunne ikke legge til i favoritter",
      deletedTitle: "Fjernet fra favoritter",
      deletedDescription: "{{name}} har blitt fjernet fra favoritter",
      deletedFailedTitle: "Kunne ikke fjerne fra favoritter"
    },
    playlists: {
      title: "Spillelister",
      createdTitle: "Spilleliste opprettet",
      createdDescription: "{{name}} har blitt opprettet",
      createdFailedTitle: "Kunne ikke opprette spilleliste",
      updatedTitle: "Spilleliste oppdatert",
      updatedDescription: "{{name}} har blitt oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere spilleliste",
      deletedTitle: "Spilleliste slettet",
      deletedDescription: "{{name}} har blitt slettet",
      deletedFailedTitle: "Kunne ikke slette spilleliste"
    },
    artists: {
      title: "Artister",
      createdTitle: "Artist opprettet",
      createdDescription: "{{name}} har blitt opprettet",
      createdFailedTitle: "Kunne ikke opprette artist",
      updatedTitle: "Artist oppdatert",
      updatedDescription: "{{name}} har blitt oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere artist",
      deletedTitle: "Artist slettet",
      deletedDescription: "{{name}} har blitt slettet",
      deletedFailedTitle: "Kunne ikke slette artist"
    },
    settings: {
      title: "Innstillinger",
      appearance: {
        title: "Utseende",
        description: "Velg ønsket visningsmodus",
        light: "Lys",
        dark: "Mørk",
        system: "System"
      },
      language: {
        title: "Språk",
        description: "Velg ønsket språk"
      },
      sync: {
        title: "Synkronisering",
        description: "Synkroniser dataene dine på tvers av enheter"
      }
    },
    fastUpload: {
      title: "Hurtigopplasting"
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
