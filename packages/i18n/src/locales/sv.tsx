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
      hoursAgo: "{count} timme{count, plural, one {} other{ar}} sedan",
      today: "Idag",
      yesterday: "Igår",
      goBack: "Gå tillbaka",
      goFoward: "Gå framåt",
      favorite: "Favorit",
      unfavorite: "Ta bort favorit",
      enableShuffle: "Aktivera slumpmässig uppspelning",
      disableShuffle: "Inaktivera slumpmässig uppspelning",
      previous: "Föregående",
      play: "Spela",
      pause: "Pausa",
      next: "Nästa",
      enableRepeat: "Aktivera upprepning",
      enableRepeatOne: "Aktivera upprepning av en",
      disableRepeat: "Inaktivera upprepning",
      mute: "Stäng av ljud",
      unmute: "Slå på ljud",
      queue: "Kö",
      title: "Titel",
      album: "Album",
      date: "Datum",
      duration: "Längd",
      search: "Sök",
      selectAll: "Markera alla",
      visibility: "Synlighet",
      columns: "Kolumner",
      clear: "Rensa",
      cancel: "Avbryt",
      more: "Mer",
      select: "Välj",
      preview: "Förhandsgranska",
      close: "Stäng"
    },
    form: {
      titles: {
        createSong: "Skapa låt",
        updateSong: "Uppdatera låt",
        deleteSong: "Ta bort låt",
        createArtist: "Skapa artist",
        updateArtist: "Uppdatera artist",
        deleteArtist: "Ta bort artist",
        createPlaylist: "Skapa spellista",
        updatePlaylist: "Uppdatera spellista",
        deletePlaylist: "Ta bort spellista",
        confirmation: "Bekräftelse",
        warning: "Varning",
        lyricsPreview: "Textförhandsvisning"
      },
      labels: {
        name: "Namn",
        thumbnail: "Miniatyrbild",
        file: "Fil",
        releaseYear: "Utgivningsår",
        album: "Album",
        artists: "Artister",
        isSingle: "Är singel",
        folder: "Mapp",
        lyrics: "Text"
      },
      buttons: {
        cancel: "Avbryt",
        delete: "Ta bort",
        update: "Uppdatera",
        create: "Skapa"
      },
      descriptions: {
        thumbnail: "Bakgrundsbild (valfri)",
        fileSize: "Maxstorlek: {size}",
        supportedFormats: "Stödda format: {formats}",
        lyricsPreview: "Se hur texten synkroniseras med tiden"
      },
      badges: {
        lines: "{count} rad{count, plural, one {} other{er}}",
        duration: "Längd: {time}"
      },
      messages: {
        confirmDelete: "Är du säker på att du vill ta bort?",
        unsavedChanges: "Det finns osparade ändringar",
        noLyrics: "Ingen text"
      }
    },
    validation: {
      name: {
        required: "Namn krävs",
        max: "Namn får vara högst 200 tecken"
      },
      file: {
        required: "Fil krävs",
        invalid: "Ogiltig eller korrupt fil",
        max: "Filen överskrider maxstorleken på {maxSize}"
      },
      duration: {
        required: "Längd krävs",
        min: "Längden måste vara minst 0"
      },
      releaseYear: {
        invalid: "Ogiltigt utgivningsår",
        min: "Utgivningsåret måste vara minst 0",
        max: "Utgivningsåret kan inte vara i framtiden"
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
      downloadingDescription: "En ny uppdatering finns tillgänglig och installeras automatiskt",
      installedSuccess: "Uppdateringen installerades framgångsrikt",
      failed: "Misslyckades med att installera uppdatering"
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
    home: {
      title: "Hem"
    },
    songs: {
      title: "Låtar",
      createdTitle: "Låt skapad",
      createdDescription: "{name} har skapats",
      createdFailedTitle: "Misslyckades att skapa låt",
      updatedTitle: "Låt uppdaterad",
      updatedDescription: "{name} har uppdaterats",
      updatedFailedTitle: "Misslyckades att uppdatera låt",
      deletedTitle: "Låt borttagen",
      deletedDescription: "{name} har tagits bort",
      deletedFailedTitle: "Misslyckades att ta bort låt"
    },
    favorites: {
      title: "Favoriter",
      createdTitle: "Tillagd i favoriter",
      createdDescription: "{name} har lagts till i favoriter",
      createdFailedTitle: "Misslyckades att lägga till i favoriter",
      deletedTitle: "Borttagen från favoriter",
      deletedDescription: "{name} har tagits bort från favoriter",
      deletedFailedTitle: "Misslyckades att ta bort från favoriter"
    },
    playlists: {
      title: "Spellistor",
      createdTitle: "Spellista skapad",
      createdDescription: "{name} har skapats",
      createdFailedTitle: "Misslyckades att skapa spellista",
      updatedTitle: "Spellista uppdaterad",
      updatedDescription: "{name} har uppdaterats",
      updatedFailedTitle: "Misslyckades att uppdatera spellista",
      deletedTitle: "Spellista borttagen",
      deletedDescription: "{name} har tagits bort",
      deletedFailedTitle: "Misslyckades att ta bort spellista"
    },
    artists: {
      title: "Artister",
      createdTitle: "Artist skapad",
      createdDescription: "{name} har skapats",
      createdFailedTitle: "Misslyckades att skapa artist",
      updatedTitle: "Artist uppdaterad",
      updatedDescription: "{name} har uppdaterats",
      updatedFailedTitle: "Misslyckades att uppdatera artist",
      deletedTitle: "Artist borttagen",
      deletedDescription: "{name} har tagits bort",
      deletedFailedTitle: "Misslyckades att ta bort artist"
    },
    settings: {
      title: "Inställningar",
      appearance: {
        title: "Utseende",
        description: "Välj ditt föredragna utseendeläge",
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
      nl: "Holländska",
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
