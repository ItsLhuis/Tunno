import Sv from "@assets/images/flags/sv.svg"

import { type Language } from "../types"

export const swedish: Language = {
  code: "sv",
  name: "Svenska",
  flag: Sv,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Inga resultat hittades",
      lessThanAnHourAgo: "Mindre än en timme sedan",
      hoursAgo: "{{count}} timme{{count, plural, one {} other{ar}}} sedan",
      today: "Idag",
      yesterday: "Igår"
    },
    songs: {
      title: "Låtar",
      createdTitle: "Låt Skapad Framgångsrikt",
      createdDescription: "{{name}} har skapats",
      createdFailedTitle: "Det Gick Inte Att Skapa Låten",
      updatedTitle: "Låt Uppdaterad Framgångsrikt",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Det Gick Inte Att Uppdatera Låten",
      deletedTitle: "Låt Raderad Framgångsrikt",
      deletedDescription: "{{name}} har raderats",
      deletedFailedTitle: "Det Gick Inte Att Radera Låten"
    },
    favorites: {
      title: "Favoriter",
      addedTitle: "Lagt till i Favoriter",
      addedDescription: "{{name}} har lagts till i favoriter",
      addedFailedTitle: "Kunde inte lägga till i favoriter",
      removedTitle: "Borttagen från Favoriter",
      removedDescription: "{{name}} har tagits bort från favoriter",
      removedFailedTitle: "Kunde inte ta bort från favoriter"
    },
    playlists: {
      title: "Låtar",
      createdTitle: "Låt skapad framgångsrikt",
      createdDescription: "{{name}} har skapats",
      createdFailedTitle: "Kunde inte skapa låt",
      updatedTitle: "Låt uppdaterad framgångsrikt",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Kunde inte uppdatera låt",
      deletedTitle: "Låt raderad framgångsrikt",
      deletedDescription: "{{name}} har raderats",
      deletedFailedTitle: "Kunde inte radera låt"
    },
    artists: {
      title: "Artister",
      createdTitle: "Artist skapad framgångsrikt",
      createdDescription: "{{name}} har skapats",
      createdFailedTitle: "Kunde inte skapa artist",
      updatedTitle: "Artist uppdaterad framgångsrikt",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Kunde inte uppdatera artist",
      deletedTitle: "Artist raderad framgångsrikt",
      deletedDescription: "{{name}} har raderats",
      deletedFailedTitle: "Kunde inte radera artist"
    },
    settings: {
      title: "Inställningar"
    }
  }
}
