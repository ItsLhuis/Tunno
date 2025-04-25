import No from "@assets/images/flags/no.svg"

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
      yesterday: "I går"
    },
    songs: {
      title: "Sanger",
      createdTitle: "Sang Opprettet Vellykket",
      createdDescription: "{{name}} har blitt opprettet",
      createdFailedTitle: "Kunne Ikke Opprette Sang",
      updatedTitle: "Sang Oppdatert Vellykket",
      updatedDescription: "{{name}} har blitt oppdatert",
      updatedFailedTitle: "Kunne Ikke Oppdatere Sang",
      deletedTitle: "Sang Slettet Vellykket",
      deletedDescription: "{{name}} har blitt slettet",
      deletedFailedTitle: "Kunne Ikke Slette Sang"
    },
    favorites: {
      title: "Favoritter",
      addedTitle: "Lagt til i Favoritter",
      addedDescription: "{{name}} har blitt lagt til i favoritter",
      addedFailedTitle: "Kunne Ikke Legge Til i Favoritter",
      removedTitle: "Fjernet fra Favoritter",
      removedDescription: "{{name}} har blitt fjernet fra favoritter",
      removedFailedTitle: "Kunne Ikke Fjerne fra Favoritter"
    },
    playlists: {
      title: "Spillelister",
      createdTitle: "Sang Opprettet Vellykket",
      createdDescription: "{{name}} har blitt opprettet",
      createdFailedTitle: "Kunne Ikke Opprette Sang",
      updatedTitle: "Sang Oppdatert Vellykket",
      updatedDescription: "{{name}} har blitt oppdatert",
      updatedFailedTitle: "Kunne Ikke Oppdatere Sang",
      deletedTitle: "Sang Slettet Vellykket",
      deletedDescription: "{{name}} har blitt slettet",
      deletedFailedTitle: "Kunne Ikke Slette Sang"
    },
    artists: {
      title: "Artister",
      createdTitle: "Kunstner Opprettet Vellykket",
      createdDescription: "{{name}} har blitt opprettet",
      createdFailedTitle: "Kunne Ikke Opprette Kunstner",
      updatedTitle: "Kunstner Oppdatert Vellykket",
      updatedDescription: "{{name}} har blitt oppdatert",
      updatedFailedTitle: "Kunne Ikke Oppdatere Kunstner",
      deletedTitle: "Kunstner Slettet Vellykket",
      deletedDescription: "{{name}} har blitt slettet",
      deletedFailedTitle: "Kunne Ikke Slette Kunstner"
    },
    settings: {
      title: "Innstillinger"
    }
  }
}
