import Da from "../assets/da.svg"

import { type Language } from "../types"

/**
 * Danish language configuration.
 */
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
      thisWeek: "Denne uge",
      thisMonth: "Denne måned",
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
      removeFromQueue: "Fjern fra kø",
      removeFromPlaylist: "Fjern fra spilleliste",
      nowPlaying: "Afspiller nu",
      noSongPlaying: "Intet afspiller",
      upNext: "Næste",
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
      refresh: "Opdater",
      showingOfTotal: "Viser {showing} af {total}",
      start: "Start",
      completed: "Fuldført",
      songsPlayed: "{count} sang{count, plural, one {} other{e}}",
      appearsIn: "Forekommer i",
      addToSidebar: "Føj til sidepanel",
      removeFromSidebar: "Fjern fra sidepanel",
      featured: "Fremhævet",
      stats: "Statistik",
      openToStart: "Åbn Tunno for at starte"
    },
    form: {
      titles: {
        createSong: "Opret sang",
        updateSong: "Opdatér sang",
        deleteSong: "Slet sang",
        createArtist: "Opret kunstner",
        updateArtist: "Opdatér kunstner",
        deleteArtist: "Slet kunstner",
        createAlbum: "Opret album",
        updateAlbum: "Opdatér album",
        deleteAlbum: "Slet album",
        createPlaylist: "Opret playlist",
        updatePlaylist: "Opdatér playlist",
        deletePlaylist: "Slet playlist",
        addToPlaylist: "Tilføj til playlist",
        confirmation: "Bekræftelse",
        warning: "Advarsel",
        lyricsPreview: "Forhåndsvisning af sangtekster"
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
        create: "Opret",
        add: "Tilføj"
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
      },
      playlistIds: {
        invalid: "Ugyldige spillelister"
      },
      album: {
        duplicate: "Der findes allerede et album med dette navn",
        integrity:
          "Kan ikke fjerne kunstneren fra albummet, fordi der er sange, der tilhører både dette album og denne kunstner"
      },
      artist: {
        duplicate: "Der findes allerede en kunstner med dette navn",
        integrity:
          "Kan ikke slette kunstneren, fordi der er sange, der tilhører både denne kunstner og album, der også inkluderer denne kunstner"
      },
      playlist: {
        duplicate: "Der findes allerede en spilleliste med dette navn"
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
        title: "Hurtig upload"
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
        },
        about: {
          title: "Om"
        }
      },
      lyrics: {
        title: "Sangtekster"
      }
    },
    home: {
      title: "Hjem",
      jumpBackIn: {
        title: "Fortsæt afspilning",
        description: "Fortsæt hvor du slap"
      },
      newReleases: {
        title: "Nye udgivelser",
        description: "Friske tilføjelser til din samling"
      },
      onRepeat: {
        title: "På gentagelse",
        description: "Sange du ikke kan stoppe med at spille"
      },
      discover: {
        title: "Opdag",
        description: "Nye musikkanbefalinger til dig"
      },
      favoriteArtists: {
        title: "Dine kunstnere",
        description: "Kunstnere du elsker mest"
      },
      yourPlaylists: {
        title: "Lavet til dig",
        description: "Dine personlige afspilningslister"
      },
      topAlbums: {
        title: "Topalbum",
        description: "Dine mest afspillede album"
      },
      recentlyAdded: {
        title: "Nyligt tilføjet",
        description: "Nye tilføjelser til dit bibliotek"
      },
      empty: {
        title: "Dit bibliotek er tomt",
        description:
          "Velkommen til Tunno. For at komme i gang skal du tilføje noget musik til dit personlige bibliotek.",
        getStarted: "Kom i gang",
        songs: {
          title: "Importer sange",
          description: "Tilføj musikfiler fra din enhed for at begynde at opbygge dit bibliotek"
        },
        albums: {
          title: "Opret album",
          description: "Organiser din musik ved at oprette album med illustrationer og detaljer"
        },
        playlists: {
          title: "Opret afspilningsliste",
          description: "Sammenstil dine egne mix til enhver stemning eller aktivitet"
        },
        artists: {
          title: "Tilføj kunstnere",
          description: "Opret kunstnerprofiler for at organisere og administrere deres musik"
        }
      }
    },
    songs: {
      title: "Sange",
      createdTitle: "Sang oprettet succesfuldt",
      createdDescription: "{name} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette sang",
      updatedTitle: "Sang opdateret succesfuldt",
      updatedDescription: "{name} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere sang",
      deletedTitle: "Sang slettet succesfuldt",
      deletedDescription: "{name} er blevet slettet",
      deletedFailedTitle: "Kunne ikke slette sang",
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
      createdTitle: "Playlist oprettet succesfuldt",
      createdDescription: "{name} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette playlist",
      updatedTitle: "Playlist opdateret succesfuldt",
      updatedDescription: "{name} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere playlist",
      songsAddedTitle: "Sange tilføjet succesfuldt",
      songsAddedFailedTitle: "Kunne ikke tilføje sange",
      deletedTitle: "Playlist slettet succesfuldt",
      deletedDescription: "{name} er blevet slettet",
      deletedFailedTitle: "Kunne ikke slette playlist",
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
      createdTitle: "Album oprettet succesfuldt",
      createdDescription: "{name} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette album",
      updatedTitle: "Album opdateret succesfuldt",
      updatedDescription: "{name} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere album",
      deletedTitle: "Album slettet succesfuldt",
      deletedDescription: "{name} er blevet slettet",
      deletedFailedTitle: "Kunne ikke slette album",
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
      createdTitle: "Kunstner oprettet succesfuldt",
      createdDescription: "{name} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette kunstner",
      updatedTitle: "Kunstner opdateret succesfuldt",
      updatedDescription: "{name} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere kunstner",
      deletedTitle: "Kunstner slettet succesfuldt",
      deletedDescription: "{name} er blevet slettet",
      deletedFailedTitle: "Kunne ikke slette kunstner",
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
      createdTitle: "Tilføjet til favoritter",
      createdDescription: "{name} er blevet tilføjet til favoritter",
      createdFailedTitle: "Kunne ikke tilføje til favoritter",
      deletedTitle: "Fjernet fra favoritter",
      deletedDescription: "{name} er blevet fjernet fra favoritter",
      deletedFailedTitle: "Kunne ikke fjerne fra favoritter"
    },
    sidebar: {
      addedTitle: "Føjet til sidepanel",
      addedDescription: "{name} er blevet føjet til sidepanelet",
      addedFailedTitle: "Kunne ikke føje til sidepanel",
      removedTitle: "Fjernet fra sidepanel",
      removedDescription: "{name} er blevet fjernet fra sidepanelet"
    },
    settings: {
      title: "Indstillinger",
      appearance: {
        title: "Udseende",
        description: "Definer applikationens udseendepræferencer",
        theme: {
          title: "Tema",
          description: "Vælg applikationstemaet",
          light: "Lys",
          dark: "Mørk",
          system: "System"
        },
        zoom: {
          title: "Zoom",
          description: "Juster applikationens zoomniveau"
        }
      },
      language: {
        title: "Sprog",
        description: "Vælg dit foretrukne sprog"
      },
      equalizer: {
        title: "Equalizer",
        enable: {
          title: "Aktivér equalizer",
          description: "Aktivér eller deaktivér audio-equalizer",
          enabled: "Aktiveret",
          disabled: "Deaktiveret"
        },
        presets: {
          title: "Equalizer forudindstillinger",
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
          title: "Nulstil equalizer",
          description: "Nulstil alle bånd til flad (0 dB)",
          button: "Nulstil til flad"
        }
      },
      sync: {
        title: "Synkronisering",
        description: "Synkroniser dine data på tværs af enheder",
        export: {
          title: "Eksporter bibliotek",
          description:
            "Eksporter dit bibliotek som en bundle-fil til backup eller til brug på en anden enhed",
          selectDestination: "Vælg destination",
          exportingSongs: "Eksporterer {count} sang{count, plural, one {} other{e}}",
          preparingExport: "Forbereder eksport",
          exportingMessage: "Dette kan tage et øjeblik",
          exportSuccess: "Bibliotek eksporteret",
          showFolder: "Vis mappe",
          exportAgain: "Eksporter igen",
          exportFailed: "Eksport mislykkedes",
          tryAgain: "Prøv igen",
          noSongs: "Ingen sange at eksportere",
          libraryEmpty: "Dit bibliotek er tomt",
          noValidSongs: "Ingen gyldige sange at eksportere",
          missingAlbumInfo: "Alle sange mangler albuminformation",
          songsExported: "{count} sang{count, plural, one {} other{e}} eksporteret til pakke"
        },
        mobile: {
          title: "Synkroniser med mobile",
          description: "Overfør dit bibliotek til Tunno Mobile over dit lokale netværk",
          generateQr: "Generer QR-kode",
          stopServer: "Stop server",
          waitingConnection: "Venter på mobilenhedens forbindelse",
          deviceConnected: "Enhed forbundet",
          syncInProgress: "Synkronisering i gang",
          syncCompleted: "Synkronisering fuldført",
          serverError: "Kunne ikke starte synkroniseringsserver",
          scanQr: "Scan QR-kode",
          scanQrDescription:
            "Scan QR-koden på din computer for at synkronisere dit musikbibliotek over WiFi",
          connecting: "Forbinder",
          comparing: "Sammenligner biblioteker",
          syncing: "Synkroniserer",
          finalizing: "Færdiggør",
          completed: "Synkronisering fuldført",
          completedDescription: "Dit musikbibliotek er blevet synkroniseret",
          alreadySynced: "Allerede synkroniseret",
          failed: "Synkronisering mislykkedes",
          retry: "Prøv igen",
          cancel: "Annullér",
          done: "Færdig",
          itemsSynced: "{synced} / {total} elementer",
          batchProgress: "Batch {current} / {total}",
          cameraPermissionTitle: "Kameraadgang påkrævet",
          cameraPermissionDescription:
            "Giv kameratilladelse for at scanne QR-koden vist på din computer",
          grantPermission: "Giv tilladelse",
          cameraLoading: "Indlæser kamera",
          scanInstruction: "Ret dit kamera mod QR-koden på din computer",
          connectionFailed: "Kunne ikke nå desktopserveren",
          insufficientStorage: "Utilstrækkelig lagerplads",
          insufficientStorageDescription:
            "Ikke nok ledig plads til synkronisering. Kræver {required}, men kun {available} tilgængelig",
          syncInterrupted: "Synkroniseringen blev afbrudt, fordi appen gik i baggrunden",
          downloadingItem: 'Downloader "{name}"',
          fetchingBatch: "Henter batch {batch} metadata",
          updatingStats: "Opdaterer statistik",
          syncComplete: "Synkronisering fuldført",
          comparingLibraries: "Sammenligner biblioteker",
          connectingToDesktop: "Forbinder til computer"
        }
      },
      about: {
        title: "Om",
        description: "Applikationsinformation og versionsdetaljer",
        version: "Version",
        whatsNew: {
          title: "Hvad er nyt",
          description: "Tjek de seneste funktioner og forbedringer ud",
          newRelease: "Ny udgivelse",
          viewChangelog: "Se changelog"
        },
        storage: {
          title: "Lager & data",
          description: "Administrer applikationsdata og indstillinger",
          openDataFolder: "Åbn datamappe"
        },
        legal: {
          title: "Juridisk & ophavsret",
          description: "Licensinformation og juridiske dokumenter",
          copyright: "Ophavsret",
          licensed: "Licenseret under MIT licens",
          viewLicense: "Se licens",
          viewOnGitHub: "Se på GitHub"
        }
      }
    },
    fastUpload: {
      title: "Hurtig upload",
      description: "Importer pakker fra CLI eller eksporteret fra",
      cliTooltip: "Åbn Tunno CLI-dokumentation",
      selectBundle: "Vælg pakke",
      changeBundle: "Skift pakke",
      status: {
        pending: "Afventer",
        processing: "Behandler",
        success: "Succes",
        error: "Fejl",
        skipped: "Sprunget over"
      },
      completed: {
        allSuccess: {
          title: "Import fuldført",
          description: "{count} spor importeret succesfuldt"
        },
        withErrors: {
          title: "Import fuldført med fejl",
          description:
            "{successCount} importeret, {errorCount} mislykkedes, {skippedCount} sprunget over"
        },
        withSkipped: {
          title: "Import fuldført",
          description: "{successCount} importeret, {skippedCount} sprunget over"
        }
      }
    },
    lyrics: {
      title: "Sangtekster"
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
