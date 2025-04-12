import Sv from "@assets/images/flags/sv.svg"

import { type Language } from "../types"

export const swedish: Language = {
  code: "sv",
  name: "Svenska",
  flag: Sv,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Inga resultat funna"
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
      title: "Favoriter"
    },
    playlists: {
      title: "Spellistor"
    },
    artists: {
      title: "Artister"
    },
    settings: {
      title: "Inställningar"
    }
  }
}
