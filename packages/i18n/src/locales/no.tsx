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
      lessThanAnHourAgo: "Mindre enn en time siden",
      hoursAgo: "{{count}} time{{count, plural, one {} other{r}}} siden",
      today: "I dag",
      yesterday: "I går",
      goBack: "Gå tilbake",
      goFoward: "Gå fremover",
      favorite: "Favoritt",
      unfavorite: "Fjern fra favoritter",
      enableShuffle: "Aktiver tilfeldig rekkefølge",
      disableShuffle: "Deaktiver tilfeldig rekkefølge",
      previous: "Forrige",
      play: "Spill av",
      pause: "Pause",
      next: "Neste",
      enableRepeat: "Aktiver gjentakelse",
      enableRepeatOne: "Aktiver gjentakelse av ett",
      disableRepeat: "Deaktiver gjentakelse",
      mute: "Dempe",
      unmute: "Slå på lyd",
      queue: "Kø",
      title: "Tittel",
      album: "Album",
      date: "Dato",
      duration: "Varighet",
      search: "Søk",
      selectAll: "Velg alle",
      visibility: "Synlighet",
      columns: "Kolonner",
      clear: "Tøm",
      cancel: "Avbryt",
      more: "Mer"
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
        isSingle: "Er singel"
      },
      buttons: {
        cancel: "Avbryt",
        delete: "Slett",
        update: "Oppdater",
        create: "Opprett"
      },
      descriptions: {
        thumbnail: "Bakgrunnsbilde (valgfritt)",
        dragAndDrop: "Dra og slipp filen her",
        fileSize: "Maks størrelse: {{size}}",
        supportedFormats: "Støttede formater: {{formats}}"
      },
      messages: {
        confirmDelete: "Er du sikker på at du vil slette?",
        unsavedChanges: "Det finnes ikke lagrede endringer"
      }
    },
    validation: {
      name: {
        required: "Navn er påkrevd",
        max: "Navn kan være maks 200 tegn"
      },
      file: {
        required: "Fil er påkrevd"
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
        requiredIfNotSingle: "Album er påkrevd hvis det ikke er en singel"
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
      home: { title: "Hjem" },
      songs: { title: "Sanger" },
      favorites: { title: "Favoritter" },
      playlists: { title: "Spillelister" },
      artists: { title: "Artister" },
      fastUpload: { title: "Rask opplasting" },
      settings: {
        title: "Innstillinger",
        appearance: { title: "Utseende" },
        language: { title: "Språk" },
        sync: { title: "Synkronisering" }
      }
    },
    home: { title: "Hjem" },
    songs: {
      title: "Sanger",
      createdTitle: "Sang opprettet",
      createdDescription: "{{name}} ble opprettet",
      createdFailedTitle: "Kunne ikke opprette sang",
      updatedTitle: "Sang oppdatert",
      updatedDescription: "{{name}} ble oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere sang",
      deletedTitle: "Sang slettet",
      deletedDescription: "{{name}} ble slettet",
      deletedFailedTitle: "Kunne ikke slette sang"
    },
    favorites: {
      title: "Favoritter",
      createdTitle: "Lagt til i favoritter",
      createdDescription: "{{name}} ble lagt til i favoritter",
      createdFailedTitle: "Kunne ikke legge til i favoritter",
      deletedTitle: "Fjernet fra favoritter",
      deletedDescription: "{{name}} ble fjernet fra favoritter",
      deletedFailedTitle: "Kunne ikke fjerne fra favoritter"
    },
    playlists: {
      title: "Spillelister",
      createdTitle: "Spilleliste opprettet",
      createdDescription: "{{name}} ble opprettet",
      createdFailedTitle: "Kunne ikke opprette spilleliste",
      updatedTitle: "Spilleliste oppdatert",
      updatedDescription: "{{name}} ble oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere spilleliste",
      deletedTitle: "Spilleliste slettet",
      deletedDescription: "{{name}} ble slettet",
      deletedFailedTitle: "Kunne ikke slette spilleliste"
    },
    artists: {
      title: "Artister",
      createdTitle: "Artist opprettet",
      createdDescription: "{{name}} ble opprettet",
      createdFailedTitle: "Kunne ikke opprette artist",
      updatedTitle: "Artist oppdatert",
      updatedDescription: "{{name}} ble oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere artist",
      deletedTitle: "Artist slettet",
      deletedDescription: "{{name}} ble slettet",
      deletedFailedTitle: "Kunne ikke slette artist"
    },
    settings: {
      title: "Innstillinger",
      appearance: {
        title: "Utseende",
        description: "Velg ønsket utseendemodus",
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
        description: "Synkroniser data på tvers av enheter"
      }
    },
    fastUpload: { title: "Rask opplasting" },
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
