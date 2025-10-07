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
      years: "{count} år",
      weeks: "{count} vecka{count, plural, one {} other{or}}",
      days: "{count} dag{count, plural, one {} other{ar}}",
      hours: "{count} timme{count, plural, one {} other{r}}",
      minutes: "{count} minut{count, plural, one {} other{er}}",
      seconds: "{count} sekund{count, plural, one {} other{er}}",
      goBack: "Gå tillbaka",
      goFoward: "Gå framåt",
      favorite: "Lägg till i favoriter",
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
      artist: "Konstnär",
      date: "Datum",
      added: "Tillagd",
      duration: "Längd",
      search: "Sök",
      selectAll: "Markera alla",
      clear: "Rensa",
      cancel: "Avbryt",
      more: "Mer",
      select: "Välj",
      preview: "Förhandsgranska",
      close: "Stäng",
      playback: "Uppspelning",
      playNext: "Spela nästa",
      actions: "Åtgärder",
      addTo: "Lägg till",
      playlist: "Spellista",
      song: "Låt",
      lyrics: "Låttext",
      openMiniplayer: "Öppna minispelare",
      enterFullScreen: "Gå till fullskärm",
      exitFullScreen: "Lämna fullskärm",
      goToSong: "Gå till låt",
      goToAlbum: "Gå till album",
      goToArtist: "Gå till artist",
      shuffleAndPlay: "Blanda och spela",
      unknown: "Okänd",
      unknownAlbum: "Okänt album",
      unknownArtist: "Okänd artist",
      listenTime: "Lyssnad tid",
      averageListenTime: "Genomsnittlig lyssnad tid",
      retentionRate: "Retention rate",
      totalPlays: "Totalt antal uppspelningar",
      lastPlayed: "Senast spelad",
      neverPlayed: "Aldrig spelad",
      streak: "Serie",
      refresh: "Uppdatera"
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
        invalid: "Ogiltigt album"
      },
      artists: {
        invalid: "Ogiltiga artister"
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
      playlists: {
        title: "Spellistor"
      },
      albums: {
        title: "Album"
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
        equalizer: {
          title: "Equalizer"
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
      deletedFailedTitle: "Misslyckades att ta bort låt",
      filters: {
        title: "Filter",
        clear: "Rensa aktiva filter",
        sortBy: "Sortera efter",
        favorites: "Endast favoriter",
        favoritesDescription: "Visa endast favoritlåtar",
        lyrics: "Med text",
        lyricsDescription: "Visa endast låtar med text",
        releaseYear: "Utgivningsår",
        duration: "Varaktighet",
        durationMin: "Minimum",
        durationMax: "Maximum",
        playCount: "Antal uppspelningar",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        lastPlayed: "Senast uppspelad",
        lastPlayedAfter: "Efter",
        lastPlayedBefore: "Före",
        selectDate: "Välj datum",
        sortOptions: {
          name: "Namn",
          duration: "Varaktighet",
          favorites: "Favoriter",
          year: "År",
          playCount: "Uppspelningar",
          lastPlayed: "Senast uppspelad",
          createdAt: "Skapelsedatum",
          updatedAt: "Uppdateringsdatum"
        }
      }
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
    albums: {
      title: "Album",
      createdTitle: "Album skapat",
      createdDescription: "{name} har skapats",
      createdFailedTitle: "Misslyckades att skapa album",
      updatedTitle: "Album uppdaterat",
      updatedDescription: "{name} har uppdaterats",
      updatedFailedTitle: "Misslyckades att uppdatera album",
      deletedTitle: "Album borttaget",
      deletedDescription: "{name} har tagits bort",
      deletedFailedTitle: "Misslyckades att ta bort album"
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
      deletedFailedTitle: "Misslyckades att ta bort artist",
      filters: {
        title: "Filter",
        clear: "Rensa aktiva filter",
        sortBy: "Sortera efter",
        favorites: "Endast favoriter",
        favoritesDescription: "Visa endast favoritartister",
        playCount: "Antal uppspelningar",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        totalTracks: "Totalt antal låtar",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maximum",
        totalDuration: "Total varaktighet",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maximum",
        lastPlayed: "Senast spelad",
        lastPlayedAfter: "Efter",
        lastPlayedBefore: "Före",
        selectDate: "Välj datum",
        sortOptions: {
          name: "Namn",
          favorites: "Favoriter",
          playCount: "Antal uppspelningar",
          totalTracks: "Totalt antal låtar",
          totalDuration: "Total varaktighet",
          lastPlayed: "Senast spelad",
          createdAt: "Skapad",
          updatedAt: "Uppdaterad"
        }
      }
    },
    favorites: {
      createdTitle: "Tillagd i favoriter",
      createdDescription: "{name} har lagts till i favoriter",
      createdFailedTitle: "Misslyckades att lägga till i favoriter",
      deletedTitle: "Borttagen från favoriter",
      deletedDescription: "{name} har tagits bort från favoriter",
      deletedFailedTitle: "Misslyckades att ta bort från favoriter"
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
      equalizer: {
        title: "Equalizer",
        enable: {
          title: "Aktivera Equalizer",
          description: "Aktivera eller inaktivera audio-equalizer",
          enabled: "Aktiverad",
          disabled: "Inaktiverad"
        },
        presets: {
          title: "Equalizer Förinställningar",
          description: "Välj från fördefinierade equalizer-inställningar",
          flat: {
            label: "Platt",
            description: "Inga justeringar"
          },
          rock: {
            label: "Rock",
            description: "Förstärkt bas och höga toner"
          },
          pop: {
            label: "Pop",
            description: "Balanserad med lätt boost"
          },
          jazz: {
            label: "Jazz",
            description: "Mjuk betoning av mellanfrekvenser"
          },
          classical: {
            label: "Klassisk",
            description: "Naturligt ljud"
          },
          electronic: {
            label: "Elektronisk",
            description: "Tung bas och klara höga toner"
          },
          vocal: {
            label: "Vokal",
            description: "Mellanfrekvens boost för klarhet"
          },
          bass: {
            label: "Bas",
            description: "Tung betoning av låga frekvenser"
          },
          treble: {
            label: "Höga toner",
            description: "Betoning av höga frekvenser"
          }
        },
        bands: {
          title: "Frekvensband",
          description: "Justera individuella frekvensband"
        },
        reset: {
          title: "Återställ Equalizer",
          description: "Återställ alla band till platt (0 dB)",
          button: "Återställ till Platt"
        }
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
