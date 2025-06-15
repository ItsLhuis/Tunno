import Sv from "../assets/sv.svg"

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
      hoursAgo: "{{count}} timme{{count, plural, one {} other{r}}} sedan",
      today: "Idag",
      yesterday: "Igår"
    },
    update: {
      downloading: "Laddar ner och installerar uppdatering",
      downloadingDescription: "En ny uppdatering är tillgänglig och installeras automatiskt",
      installedSuccess: "Uppdatering installerad",
      failed: "Kunde inte installera uppdatering"
    },
    home: { title: "Home" },
    songs: {
      title: "Låtar",
      createdTitle: "Låt skapad",
      createdDescription: "{{name}} har skapats",
      createdFailedTitle: "Kunde inte skapa låt",
      updatedTitle: "Låt uppdaterad",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Kunde inte uppdatera låt",
      deletedTitle: "Låt borttagen",
      deletedDescription: "{{name}} har tagits bort",
      deletedFailedTitle: "Kunde inte ta bort låt"
    },
    favorites: {
      title: "Favoriter",
      addedTitle: "Tillagd i favoriter",
      addedDescription: "{{name}} har lagts till i favoriter",
      addedFailedTitle: "Kunde inte lägga till i favoriter",
      removedTitle: "Borttagen från favoriter",
      removedDescription: "{{name}} har tagits bort från favoriter",
      removedFailedTitle: "Kunde inte ta bort från favoriter"
    },
    playlists: {
      title: "Spellistor",
      createdTitle: "Spellista skapad",
      createdDescription: "{{name}} har skapats",
      createdFailedTitle: "Kunde inte skapa spellista",
      updatedTitle: "Spellista uppdaterad",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Kunde inte uppdatera spellista",
      deletedTitle: "Spellista borttagen",
      deletedDescription: "{{name}} har tagits bort",
      deletedFailedTitle: "Kunde inte ta bort spellista"
    },
    artists: {
      title: "Artister",
      createdTitle: "Artist skapad",
      createdDescription: "{{name}} har skapats",
      createdFailedTitle: "Kunde inte skapa artist",
      updatedTitle: "Artist uppdaterad",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Kunde inte uppdatera artist",
      deletedTitle: "Artist borttagen",
      deletedDescription: "{{name}} har tagits bort",
      deletedFailedTitle: "Kunde inte ta bort artist"
    },
    settings: {
      title: "Inställningar",
      theme: {
        title: "Tema",
        description: "Välj ditt föredragna utseende",
        light: "Ljust",
        dark: "Mörkt",
        system: "System"
      },
      language: {
        title: "Språk",
        description: "Välj ditt föredragna språk"
      },
      sync: {
        title: "Synkronisering",
        description: "Synkronisera dina data mellan enheter"
      }
    }
  }
}
