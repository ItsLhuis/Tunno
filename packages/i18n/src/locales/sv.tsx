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
      yesterday: "Igår",
      goBack: "Tillbaka",
      goFoward: "Framåt",
      favorite: "Favorit",
      unfavorite: "Ta bort från favoriter",
      enableShuffle: "Aktivera blandning",
      disableShuffle: "Inaktivera blandning",
      previous: "Föregående",
      play: "Spela",
      pause: "Paus",
      next: "Nästa",
      enableRepeat: "Aktivera upprepning",
      enableRepeatOne: "Upprepa en gång",
      disableRepeat: "Inaktivera upprepning",
      mute: "Tyst",
      unmute: "Ljud på",
      queue: "Kö"
    },
    update: {
      downloading: "Laddar ner och installerar uppdatering",
      downloadingDescription: "En ny uppdatering är tillgänglig och installeras automatiskt",
      installedSuccess: "Uppdatering installerad framgångsrikt",
      failed: "Kunde inte installera uppdatering"
    },
    breadcrumbs: {
      home: {
        title: "Hem"
      },
      songs: {
        title: "Låtar"
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
      fastUpload: {
        title: "Snabb uppladdning"
      },
      settings: {
        title: "Inställningar",
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
    home: { title: "Hem" },
    songs: {
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
      createdTitle: "Spellista skapad framgångsrikt",
      createdDescription: "{{name}} har skapats",
      createdFailedTitle: "Kunde inte skapa spellista",
      updatedTitle: "Spellista uppdaterad framgångsrikt",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Kunde inte uppdatera spellista",
      deletedTitle: "Spellista raderad framgångsrikt",
      deletedDescription: "{{name}} har raderats",
      deletedFailedTitle: "Kunde inte radera spellista"
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
      title: "Inställningar",
      appearance: {
        title: "Utseende",
        description: "Välj ditt föredragna visningsläge",
        light: "Ljus",
        dark: "Mörk",
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
    },
    fastUpload: {
      title: "Snabb uppladdning"
    },
    languages: {
      da: "Danska",
      de: "Tyska",
      en: "Engelska",
      es: "Spanska",
      fi: "Finska",
      fr: "Franska",
      hi: "Hindi",
      it: "Italienska",
      ja: "Japanska",
      ko: "Koreanska",
      nl: "Nederländska",
      no: "Norska",
      pl: "Polska",
      pt: "Portugisiska",
      ru: "Ryska",
      sv: "Svenska",
      tr: "Turkiska",
      uk: "Ukrainska",
      vi: "Vietnamesiska",
      zh: "Kinesiska"
    }
  }
}
