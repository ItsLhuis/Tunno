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
      hoursAgo: "{{count}} timer siden",
      today: "I dag",
      yesterday: "I går"
    },
    update: {
      downloading: "Laster ned og installerer oppdatering",
      downloadingDescription: "En ny oppdatering er tilgjengelig og installeres automatisk",
      installedSuccess: "Oppdatering installert",
      failed: "Kunne ikke installere oppdatering"
    },
    songs: {
      title: "Sanger",
      createdTitle: "Sang opprettet",
      createdDescription: "{{name}} er opprettet",
      createdFailedTitle: "Kunne ikke opprette sang",
      updatedTitle: "Sang oppdatert",
      updatedDescription: "{{name}} er oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere sang",
      deletedTitle: "Sang slettet",
      deletedDescription: "{{name}} er slettet",
      deletedFailedTitle: "Kunne ikke slette sang"
    },
    favorites: {
      title: "Favoritter",
      addedTitle: "Lagt til i favoritter",
      addedDescription: "{{name}} er lagt til i favoritter",
      addedFailedTitle: "Kunne ikke legge til i favoritter",
      removedTitle: "Fjernet fra favoritter",
      removedDescription: "{{name}} er fjernet fra favoritter",
      removedFailedTitle: "Kunne ikke fjerne fra favoritter"
    },
    playlists: {
      title: "Spillelister",
      createdTitle: "Spilleliste opprettet",
      createdDescription: "{{name}} er opprettet",
      createdFailedTitle: "Kunne ikke opprette spilleliste",
      updatedTitle: "Spilleliste oppdatert",
      updatedDescription: "{{name}} er oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere spilleliste",
      deletedTitle: "Spilleliste slettet",
      deletedDescription: "{{name}} er slettet",
      deletedFailedTitle: "Kunne ikke slette spilleliste"
    },
    artists: {
      title: "Artister",
      createdTitle: "Artist opprettet",
      createdDescription: "{{name}} er opprettet",
      createdFailedTitle: "Kunne ikke opprette artist",
      updatedTitle: "Artist oppdatert",
      updatedDescription: "{{name}} er oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere artist",
      deletedTitle: "Artist slettet",
      deletedDescription: "{{name}} er slettet",
      deletedFailedTitle: "Kunne ikke slette artist"
    },
    settings: {
      title: "Innstillinger",
      theme: {
        title: "Tema",
        description: "Velg ditt foretrukne utseende",
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
        description: "Synkroniser dataene dine på tvers av enheter"
      }
    }
  }
}
