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
      lessThanAnHourAgo: "För mindre än en timme sedan",
      hoursAgo: "{{count}} timmar sedan",
      today: "Idag",
      yesterday: "Igår",
      goBack: "Gå tillbaka",
      goFoward: "Gå framåt",
      favorite: "Favorit",
      unfavorite: "Ta bort favorit",
      enableShuffle: "Aktivera blandning",
      disableShuffle: "Inaktivera blandning",
      previous: "Föregående",
      play: "Spela",
      pause: "Pausa",
      next: "Nästa",
      enableRepeat: "Aktivera upprepning",
      enableRepeatOne: "Upprepa en",
      disableRepeat: "Inaktivera upprepning",
      mute: "Stäng av ljud",
      unmute: "Slå på ljud",
      queue: "Kö",
      title: "Titel",
      album: "Album",
      date: "Datum",
      duration: "Varaktighet",
      search: "Sök",
      selectAll: "Välj alla",
      visibility: "Synlighet",
      columns: "Kolumner",
      clear: "Rensa",
      cancel: "Avbryt",
      more: "Mer",
      select: "Välj"
    },
    form: {
      titles: {
        createSong: "Skapa låt",
        updateSong: "Uppdatera låt",
        deleteSong: "Radera låt",
        createArtist: "Skapa artist",
        updateArtist: "Uppdatera artist",
        deleteArtist: "Radera artist",
        createPlaylist: "Skapa spellista",
        updatePlaylist: "Uppdatera spellista",
        deletePlaylist: "Radera spellista",
        confirmation: "Bekräftelse",
        warning: "Varning"
      },
      labels: {
        name: "Namn",
        thumbnail: "Miniatyr",
        file: "Fil",
        releaseYear: "Utgivningsår",
        album: "Album",
        artists: "Artister",
        isSingle: "Är en singel",
        folder: "Mapp"
      },
      buttons: {
        cancel: "Avbryt",
        delete: "Radera",
        update: "Uppdatera",
        create: "Skapa"
      },
      descriptions: {
        thumbnail: "Bakgrundsbild (valfritt)",
        fileSize: "Maximal storlek: {{size}}",
        supportedFormats: "Stödda format: {{formats}}"
      },
      messages: {
        confirmDelete: "Är du säker på att du vill radera?",
        unsavedChanges: "Du har osparade ändringar"
      }
    },
    validation: {
      name: {
        required: "Namn är obligatoriskt",
        max: "Namnet får inte överstiga 200 tecken"
      },
      file: {
        required: "Fil är obligatorisk",
        invalid: "Ogiltig eller skadad fil",
        max: "Filen överskrider maxstorleken {{maxSize}}"
      },
      duration: {
        required: "Varaktighet är obligatorisk",
        min: "Varaktighet måste vara större än 0"
      },
      releaseYear: {
        invalid: "Ogiltigt år",
        min: "Året måste vara större än 0",
        max: "Året får inte vara i framtiden"
      },
      albumId: {
        invalid: "Ogiltigt album",
        requiredIfNotSingle: "Album krävs om det inte är en singel"
      },
      artists: {
        min: "Minst en artist krävs"
      }
    },
    update: {
      downloading: "Laddar ner och installerar uppdatering",
      downloadingDescription: "En ny uppdatering är tillgänglig, installation påbörjas automatiskt",
      installedSuccess: "Uppdatering installerad",
      failed: "Kunde inte installera uppdatering"
    },
    breadcrumbs: {
      home: { title: "Hem" },
      songs: { title: "Låtar" },
      favorites: { title: "Favoriter" },
      playlists: { title: "Spellistor" },
      artists: { title: "Artister" },
      fastUpload: { title: "Snabbuppladdning" },
      settings: {
        title: "Inställningar",
        appearance: { title: "Utseende" },
        language: { title: "Språk" },
        sync: { title: "Synkronisering" }
      }
    },
    home: { title: "Hem" },
    songs: {
      title: "Låtar",
      createdTitle: "Låt tillagd",
      createdDescription: "{{name}} har lagts till",
      createdFailedTitle: "Kunde inte lägga till låten",
      updatedTitle: "Låt uppdaterad",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Kunde inte uppdatera låten",
      deletedTitle: "Låt raderad",
      deletedDescription: "{{name}} har raderats",
      deletedFailedTitle: "Kunde inte radera låten"
    },
    favorites: {
      title: "Favoriter",
      createdTitle: "Lagd till i favoriter",
      createdDescription: "{{name}} har lagts till i favoriter",
      createdFailedTitle: "Kunde inte lägga till i favoriter",
      deletedTitle: "Borttagen från favoriter",
      deletedDescription: "{{name}} har tagits bort från favoriter",
      deletedFailedTitle: "Kunde inte ta bort från favoriter"
    },
    playlists: {
      title: "Spellistor",
      createdTitle: "Spellista skapad",
      createdDescription: "{{name}} har skapats",
      createdFailedTitle: "Kunde inte skapa spellista",
      updatedTitle: "Spellista uppdaterad",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Kunde inte uppdatera spellista",
      deletedTitle: "Spellista raderad",
      deletedDescription: "{{name}} har raderats",
      deletedFailedTitle: "Kunde inte radera spellista"
    },
    artists: {
      title: "Artister",
      createdTitle: "Artist tillagd",
      createdDescription: "{{name}} har lagts till",
      createdFailedTitle: "Kunde inte lägga till artist",
      updatedTitle: "Artist uppdaterad",
      updatedDescription: "{{name}} har uppdaterats",
      updatedFailedTitle: "Kunde inte uppdatera artist",
      deletedTitle: "Artist raderad",
      deletedDescription: "{{name}} har raderats",
      deletedFailedTitle: "Kunde inte radera artist"
    },
    settings: {
      title: "Inställningar",
      appearance: {
        title: "Utseende",
        description: "Välj ditt föredragna tema",
        light: "Ljust",
        dark: "Mörkt",
        system: "System"
      },
      language: {
        title: "Språk",
        description: "Välj föredraget språk"
      },
      sync: {
        title: "Synkronisering",
        description: "Synkronisera data mellan enheter"
      }
    },
    fastUpload: {
      title: "Snabbuppladdning"
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
