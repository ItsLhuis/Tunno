import Da from "../assets/da.svg"

import { type Language } from "../types"

export const danish: Language = {
  code: "da",
  name: "Danish",
  flag: Da,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ingen resultater fundet",
      lessThanAnHourAgo: "Mindre end en time siden",
      hoursAgo: "{count} time{count, plural, one {} other{r}} siden",
      today: "I dag",
      yesterday: "I går",
      years: "{count} år",
      weeks: "{count} uge{count, plural, one {} other{r}}",
      days: "{count} dag{count, plural, one {} other{e}}",
      hours: "{count} time{count, plural, one {} other{r}}",
      minutes: "{count} minut{count, plural, one {} other{ter}}",
      seconds: "{count} sekund{count, plural, one {} other{er}}",
      goBack: "Gå tilbage",
      goForward: "Gå fremad",
      favorite: "Tilføj til favoritter",
      unfavorite: "Fjern favorit",
      enableShuffle: "Aktivér bland",
      disableShuffle: "Deaktivér bland",
      previous: "Forrige",
      play: "Afspil",
      pause: "Pause",
      next: "Næste",
      enableRepeat: "Aktivér gentag",
      enableRepeatOne: "Aktivér gentag én",
      disableRepeat: "Deaktivér gentag",
      mute: "Lydløs",
      unmute: "Fjern lydløs",
      queue: "Kø",
      title: "Titel",
      album: "Album",
      artist: "Kunstner",
      date: "Dato",
      added: "Tilføjet",
      duration: "Varighed",
      search: "Søg",
      selectAll: "Vælg alle",
      clear: "Ryd",
      cancel: "Annullér",
      more: "Mere",
      select: "Vælg",
      preview: "Forhåndsvisning",
      close: "Luk",
      playback: "Afspilning",
      playNext: "Afspil næste",
      actions: "Handlinger",
      addTo: "Tilføj til",
      playlist: "Playlist",
      song: "Sang",
      lyrics: "Sangtekster",
      openMiniplayer: "Åbn miniafspiller",
      enterFullScreen: "Gå til fuldskærm",
      exitFullScreen: "Forlad fuldskærm",
      goToSong: "Gå til sang",
      goToAlbum: "Gå til album",
      goToPlaylist: "Gå til playlist",
      goToArtist: "Gå til kunstner",
      shuffleAndPlay: "Bland og afspil",
      unknown: "Ukendt",
      unknownAlbum: "Ukendt album",
      unknownArtist: "Ukendt kunstner",
      listenTime: "Lytte tid",
      averageListenTime: "Gennemsnitlig lytte tid",
      retentionRate: "Retention rate",
      totalPlays: "Totale afspilninger",
      lastPlayed: "Sidst afspillet",
      neverPlayed: "Aldrig afspillet",
      streak: "Serie",
      refresh: "Opdater"
    },
    form: {
      titles: {
        createSong: "Opret Sang",
        updateSong: "Opdatér Sang",
        deleteSong: "Slet Sang",
        createArtist: "Opret Kunstner",
        updateArtist: "Opdatér Kunstner",
        deleteArtist: "Slet Kunstner",
        createAlbum: "Opret Album",
        updateAlbum: "Opdatér Album",
        deleteAlbum: "Slet Album",
        createPlaylist: "Opret Playlist",
        updatePlaylist: "Opdatér Playlist",
        deletePlaylist: "Slet Playlist",
        confirmation: "Bekræftelse",
        warning: "Advarsel",
        lyricsPreview: "Forhåndsvisning Af Sangtekster"
      },
      labels: {
        name: "Navn",
        thumbnail: "Miniaturebillede",
        file: "Fil",
        releaseYear: "Udgivelsesår",
        album: "Album",
        albumType: "Albumtype",
        artists: "Kunstnere",
        folder: "Mappe",
        lyrics: "Sangtekster"
      },
      buttons: {
        cancel: "Annullér",
        delete: "Slet",
        update: "Opdatér",
        create: "Opret"
      },
      descriptions: {
        thumbnail: "Baggrundsbillede (valgfrit)",
        fileSize: "Maksimal størrelse: {size}",
        supportedFormats: "Understøttede formater: {formats}",
        lyricsPreview: "Visualiser hvordan sangteksterne vises synkroniseret med tiden"
      },
      badges: {
        lines: "{count} linje{count, plural, one {} other{r}}",
        duration: "Varighed: {time}"
      },
      messages: {
        confirmDelete: "Er du sikker på, at du vil slette?",
        unsavedChanges: "Der er ikke-gemte ændringer",
        noLyrics: "Ingen sangtekster"
      }
    },
    validation: {
      name: {
        required: "Navn er påkrævet",
        max: "Navn må højst være 200 tegn"
      },
      file: {
        required: "Fil er påkrævet",
        invalid: "Ugyldig eller beskadiget fil",
        max: "Fil overstiger den maksimale størrelse på {maxSize}"
      },
      duration: {
        required: "Varighed er påkrævet",
        min: "Varighed skal være mindst 0"
      },
      releaseYear: {
        invalid: "Ugyldigt udgivelsesår",
        min: "Udgivelsesår skal være mindst 0",
        max: "Udgivelsesår kan ikke være i fremtiden"
      },
      albumId: {
        invalid: "Ugyldigt album"
      },
      artists: {
        invalid: "Ugyldige kunstnere"
      },
      albumType: {
        invalid: "Ugyldig albumtype"
      }
    },
    update: {
      downloading: "Downloader og installerer opdatering",
      downloadingDescription: "En ny opdatering er tilgængelig og bliver installeret automatisk",
      installedSuccess: "Opdatering installeret succesfuldt",
      failed: "Kunne ikke installere opdatering"
    },
    breadcrumbs: {
      home: {
        title: "Hjem"
      },
      songs: {
        title: "Sange"
      },
      playlists: {
        title: "Playlists"
      },
      albums: {
        title: "Albums"
      },
      artists: {
        title: "Kunstnere"
      },
      fastUpload: {
        title: "Hurtig Upload"
      },
      settings: {
        title: "Indstillinger",
        appearance: {
          title: "Udseende"
        },
        language: {
          title: "Sprog"
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
      title: "Hjem"
    },
    songs: {
      title: "Sange",
      createdTitle: "Sang Oprettet Succesfuldt",
      createdDescription: "{name} er blevet oprettet",
      createdFailedTitle: "Kunne Ikke Oprette Sang",
      updatedTitle: "Sang Opdateret Succesfuldt",
      updatedDescription: "{name} er blevet opdateret",
      updatedFailedTitle: "Kunne Ikke Opdatere Sang",
      deletedTitle: "Sang Slettet Succesfuldt",
      deletedDescription: "{name} er blevet slettet",
      deletedFailedTitle: "Kunne Ikke Slette Sang",
      filters: {
        title: "Filtre",
        clear: "Ryd aktive filtre",
        sortBy: "Sortér efter",
        favorites: "Kun favoritter",
        favoritesDescription: "Vis kun favorit sange",
        lyrics: "Med tekst",
        lyricsDescription: "Vis kun sange med tekst",
        releaseYear: "Udgivelsesår",
        duration: "Varighed",
        durationMin: "Minimum",
        durationMax: "Maksimum",
        playCount: "Antal afspilninger",
        playCountMin: "Minimum",
        playCountMax: "Maksimum",
        lastPlayed: "Sidst afspillet",
        lastPlayedAfter: "Efter",
        lastPlayedBefore: "Før",
        selectDate: "Vælg dato",
        sortOptions: {
          name: "Navn",
          duration: "Varighed",
          favorites: "Favoritter",
          year: "År",
          playCount: "Afspilninger",
          lastPlayed: "Sidst afspillet",
          createdAt: "Oprettelsesdato",
          updatedAt: "Opdateringsdato"
        }
      }
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist Oprettet Succesfuldt",
      createdDescription: "{name} er blevet oprettet",
      createdFailedTitle: "Kunne Ikke Oprette Playlist",
      updatedTitle: "Playlist Opdateret Succesfuldt",
      updatedDescription: "{name} er blevet opdateret",
      updatedFailedTitle: "Kunne Ikke Opdatere Playlist",
      deletedTitle: "Playlist Slettet Succesfuldt",
      deletedDescription: "{name} er blevet slettet",
      deletedFailedTitle: "Kunne Ikke Slette Playlist",
      filters: {
        title: "Filtre",
        clear: "Ryd aktive filtre",
        sortBy: "Sortér efter",
        favorites: "Kun favoritter",
        favoritesDescription: "Vis kun favorit playlists",
        playCount: "Afspilninger",
        playCountMin: "Minimum afspilninger",
        playCountMax: "Maksimum afspilninger",
        totalTracks: "Samlet spor",
        totalTracksMin: "Minimum spor",
        totalTracksMax: "Maksimum spor",
        totalDuration: "Samlet varighed",
        totalDurationMin: "Minimum varighed",
        totalDurationMax: "Maksimum varighed",
        lastPlayed: "Sidst afspillet",
        lastPlayedAfter: "Efter",
        lastPlayedBefore: "Før",
        selectDate: "Vælg dato",
        sortOptions: {
          name: "Navn",
          favorites: "Favoritter",
          playCount: "Afspilninger",
          totalTracks: "Samlet spor",
          totalDuration: "Samlet varighed",
          lastPlayed: "Sidst afspillet",
          createdAt: "Oprettelsesdato",
          updatedAt: "Opdateringsdato"
        }
      }
    },
    albums: {
      title: "Albums",
      createdTitle: "Album Oprettet Succesfuldt",
      createdDescription: "{name} er blevet oprettet",
      createdFailedTitle: "Kunne Ikke Oprette Album",
      updatedTitle: "Album Opdateret Succesfuldt",
      updatedDescription: "{name} er blevet opdateret",
      updatedFailedTitle: "Kunne Ikke Opdatere Album",
      deletedTitle: "Album Slettet Succesfuldt",
      deletedDescription: "{name} er blevet slettet",
      deletedFailedTitle: "Kunne Ikke Slette Album",
      filters: {
        title: "Filtre",
        clear: "Ryd aktive filtre",
        sortBy: "Sortér efter",
        favorites: "Kun favoritter",
        favoritesDescription: "Vis kun favorit albums",
        albumType: "Albumtype",
        all: "Alle Typer",
        single: "Single",
        album: "Album",
        compilation: "Samling",
        releaseYear: "Udgivelsesår",
        releaseYearMin: "Minimum år",
        releaseYearMax: "Maksimum år",
        playCount: "Afspilninger",
        playCountMin: "Minimum afspilninger",
        playCountMax: "Maksimum afspilninger",
        totalTracks: "Samlet spor",
        totalTracksMin: "Minimum spor",
        totalTracksMax: "Maksimum spor",
        totalDuration: "Samlet varighed",
        totalDurationMin: "Minimum varighed",
        totalDurationMax: "Maksimum varighed",
        lastPlayed: "Sidst afspillet",
        lastPlayedAfter: "Afspillet efter",
        lastPlayedBefore: "Afspillet før",
        selectDate: "Vælg dato",
        sortOptions: {
          name: "Navn",
          releaseYear: "Udgivelsesår",
          favorites: "Favoritter",
          playCount: "Afspilninger",
          totalTracks: "Samlet spor",
          totalDuration: "Samlet varighed",
          lastPlayed: "Sidst afspillet",
          createdAt: "Oprettet",
          updatedAt: "Opdateret"
        }
      }
    },
    artists: {
      title: "Kunstnere",
      createdTitle: "Kunstner Oprettet Succesfuldt",
      createdDescription: "{name} er blevet oprettet",
      createdFailedTitle: "Kunne Ikke Oprette Kunstner",
      updatedTitle: "Kunstner Opdateret Succesfuldt",
      updatedDescription: "{name} er blevet opdateret",
      updatedFailedTitle: "Kunne Ikke Opdatere Kunstner",
      deletedTitle: "Kunstner Slettet Succesfuldt",
      deletedDescription: "{name} er blevet slettet",
      deletedFailedTitle: "Kunne Ikke Slette Kunstner",
      filters: {
        title: "Filtre",
        clear: "Ryd aktive filtre",
        sortBy: "Sortér efter",
        favorites: "Kun favoritter",
        favoritesDescription: "Vis kun favoritkunstnere",
        playCount: "Antal afspilninger",
        playCountMin: "Minimum",
        playCountMax: "Maksimum",
        totalTracks: "Samlet antal sange",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maksimum",
        totalDuration: "Samlet varighed",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maksimum",
        lastPlayed: "Sidst afspillet",
        lastPlayedAfter: "Efter",
        lastPlayedBefore: "Før",
        selectDate: "Vælg dato",
        sortOptions: {
          name: "Navn",
          favorites: "Favoritter",
          playCount: "Antal afspilninger",
          totalTracks: "Samlet antal sange",
          totalDuration: "Samlet varighed",
          lastPlayed: "Sidst afspillet",
          createdAt: "Oprettelsesdato",
          updatedAt: "Opdateringsdato"
        }
      }
    },
    favorites: {
      createdTitle: "Tilføjet Til Favoritter",
      createdDescription: "{name} er blevet tilføjet til favoritter",
      createdFailedTitle: "Kunne Ikke Tilføje Til Favoritter",
      deletedTitle: "Fjernet Fra Favoritter",
      deletedDescription: "{name} er blevet fjernet fra favoritter",
      deletedFailedTitle: "Kunne Ikke Fjerne Fra Favoritter"
    },
    settings: {
      title: "Indstillinger",
      appearance: {
        title: "Udseende",
        description: "Vælg din foretrukne udseendetilstand",
        light: "Lys",
        dark: "Mørk",
        system: "System"
      },
      language: {
        title: "Sprog",
        description: "Vælg dit foretrukne sprog"
      },
      equalizer: {
        title: "Equalizer",
        enable: {
          title: "Aktivér Equalizer",
          description: "Aktivér eller deaktivér audio-equalizer",
          enabled: "Aktiveret",
          disabled: "Deaktiveret"
        },
        presets: {
          title: "Equalizer Forudindstillinger",
          description: "Vælg fra foruddefinerede equalizer-indstillinger",
          flat: {
            label: "Flad",
            description: "Ingen justeringer"
          },
          rock: {
            label: "Rock",
            description: "Forstærket bas og høje toner"
          },
          pop: {
            label: "Pop",
            description: "Balanceret med let boost"
          },
          jazz: {
            label: "Jazz",
            description: "Blød betoning af mellemfrekvenser"
          },
          classical: {
            label: "Klassisk",
            description: "Naturlig lyd"
          },
          electronic: {
            label: "Elektronisk",
            description: "Tung bas og klare høje toner"
          },
          vocal: {
            label: "Vokal",
            description: "Mellemfrekvens boost for klarhed"
          },
          bass: {
            label: "Bas",
            description: "Tung betoning af lave frekvenser"
          },
          treble: {
            label: "Høje toner",
            description: "Betoning af høje frekvenser"
          }
        },
        bands: {
          title: "Frekvensbånd",
          description: "Juster individuelle frekvensbånd"
        },
        reset: {
          title: "Nulstil Equalizer",
          description: "Nulstil alle bånd til flad (0 dB)",
          button: "Nulstil til Flad"
        }
      },
      sync: {
        title: "Synkronisering",
        description: "Synkroniser dine data på tværs af enheder"
      }
    },
    fastUpload: {
      title: "Hurtig Upload"
    },
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
      nl: "Hollandsk",
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
