import No from "../assets/no.svg"

import { type Language } from "../types"

/**
 * Norwegian language configuration.
 */
export const norwegian: Language = {
  code: "no",
  name: "Norsk",
  flag: No,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ingen resultater funnet",
      lessThanAnHourAgo: "Mindre enn en time siden",
      hoursAgo: "{count} time{count, plural, one {} other{r}} siden",
      today: "I dag",
      thisWeek: "Denne uken",
      thisMonth: "Denne måneden",
      yesterday: "I går",
      years: "{count} år",
      weeks: "{count} uke{count, plural, one {} other{r}}",
      days: "{count} dag{count, plural, one {} other{er}}",
      hours: "{count} time{count, plural, one {} other{r}}",
      minutes: "{count} minutt{count, plural, one {} other{er}}",
      seconds: "{count} sekund{count, plural, one {} other{er}}",
      goBack: "Gå tilbake",
      goForward: "Gå fremover",
      favorite: "Legg til i favoritter",
      unfavorite: "Fjern favoritt",
      enableShuffle: "Slå på tilfeldig rekkefølge",
      disableShuffle: "Slå av tilfeldig rekkefølge",
      previous: "Forrige",
      play: "Spill",
      pause: "Pause",
      next: "Neste",
      enableRepeat: "Slå på gjentakelse",
      enableRepeatOne: "Slå på gjenta én",
      disableRepeat: "Slå av gjentakelse",
      mute: "Demp",
      unmute: "Slå på lyd",
      queue: "Kø",
      title: "Tittel",
      album: "Album",
      artist: "Kunstner",
      date: "Dato",
      added: "Lagt til",
      duration: "Varighet",
      search: "Søk",
      selectAll: "Velg alle",
      clear: "Tøm",
      cancel: "Avbryt",
      more: "Mer",
      select: "Velg",
      preview: "Forhåndsvisning",
      close: "Lukk",
      playback: "Avspilling",
      playNext: "Spill neste",
      removeFromQueue: "Fjern fra kø",
      removeFromPlaylist: "Fjern fra spilleliste",
      nowPlaying: "Spiller nå",
      noSongPlaying: "Ingen spiller",
      upNext: "Neste",
      actions: "Handlinger",
      addTo: "Legg til",
      playlist: "Playlist",
      song: "Sang",
      lyrics: "Sangtekst",
      openMiniplayer: "Åpne minispiller",
      enterFullScreen: "Gå til full skjerm",
      exitFullScreen: "Forlat full skjerm",
      goToSong: "Gå til sang",
      goToAlbum: "Gå til album",
      goToPlaylist: "Gå til playlist",
      goToArtist: "Gå til artist",
      shuffleAndPlay: "Stokk og spill",
      unknown: "Ukjent",
      unknownAlbum: "Ukjent album",
      unknownArtist: "Ukjent artist",
      listenTime: "Lyttetid",
      averageListenTime: "Gjennomsnittlig lyttetid",
      retentionRate: "Retention rate",
      totalPlays: "Totale avspillinger",
      lastPlayed: "Sist spilt",
      neverPlayed: "Aldri spilt",
      streak: "Serie",
      refresh: "Oppdater",
      showingOfTotal: "Viser {showing} av {total}",
      start: "Start",
      completed: "Fullført",
      songsPlayed: "{count} sang{count, plural, one {} other{er}}",
      appearsIn: "Forekommer i",
      addToSidebar: "Legg til i sidefelt",
      removeFromSidebar: "Fjern fra sidefelt",
      featured: "Fremhevet",
      stats: "Statistikk",
      openToStart: "Åpne Tunno for å starte"
    },
    form: {
      titles: {
        createSong: "Opprett sang",
        updateSong: "Oppdater sang",
        deleteSong: "Slett sang",
        createArtist: "Opprett artist",
        updateArtist: "Oppdater artist",
        deleteArtist: "Slett artist",
        createAlbum: "Opprett album",
        updateAlbum: "Oppdater album",
        deleteAlbum: "Slett album",
        createPlaylist: "Opprett playlist",
        updatePlaylist: "Oppdater playlist",
        deletePlaylist: "Slett playlist",
        addToPlaylist: "Legg til i playlist",
        confirmation: "Bekreftelse",
        warning: "Advarsel",
        lyricsPreview: "Tekstforhåndsvisning"
      },
      labels: {
        name: "Navn",
        thumbnail: "Miniatyrbilde",
        file: "Fil",
        releaseYear: "Utgivelsesår",
        album: "Album",
        albumType: "Albumtype",
        artists: "Artister",
        folder: "Mappe",
        lyrics: "Tekst"
      },
      buttons: {
        cancel: "Avbryt",
        delete: "Slett",
        update: "Oppdater",
        create: "Opprett",
        add: "Legg til"
      },
      descriptions: {
        thumbnail: "Bakgrunnsbilde (valgfritt)",
        fileSize: "Maks størrelse: {size}",
        supportedFormats: "Støttede formater: {formats}",
        lyricsPreview: "Se hvordan teksten synkroniseres med tid"
      },
      badges: {
        lines: "{count} linje{count, plural, one {} other{r}}",
        duration: "Varighet: {time}"
      },
      messages: {
        confirmDelete: "Er du sikker på at du vil slette?",
        unsavedChanges: "Det finnes usparte endringer",
        noLyrics: "Ingen tekst"
      }
    },
    validation: {
      name: {
        required: "Navn er påkrevd",
        max: "Navn kan være maks 200 tegn"
      },
      file: {
        required: "Fil er påkrevd",
        invalid: "Ugyldig eller korrupt fil",
        max: "Filen overskrider maksimal størrelse på {maxSize}"
      },
      duration: {
        required: "Varighet er påkrevd",
        min: "Varighet må være minst 0"
      },
      releaseYear: {
        invalid: "Ugyldig utgivelsesår",
        min: "Utgivelsesår må være minst 0",
        max: "Utgivelsesår kan ikke være i fremtiden"
      },
      albumId: {
        invalid: "Ugyldig album"
      },
      artists: {
        invalid: "Ugyldige artister"
      },
      albumType: {
        invalid: "Ugyldig albumtype"
      },
      playlistIds: {
        invalid: "Ugyldige spillelister"
      },
      album: {
        duplicate: "Det finnes allerede et album med dette navnet",
        integrity:
          "Kan ikke fjerne artisten fra albumet fordi det er sanger som tilhører både dette albumet og denne artisten"
      },
      artist: {
        duplicate: "Det finnes allerede en artist med dette navnet",
        integrity:
          "Kan ikke slette artisten fordi det er sanger som tilhører både denne artisten og album som også inneholder denne artisten"
      },
      playlist: {
        duplicate: "Det finnes allerede en spilleliste med dette navnet"
      }
    },
    update: {
      downloading: "Laster ned og installerer oppdatering",
      downloadingDescription: "En ny oppdatering er tilgjengelig og installeres automatisk",
      installedSuccess: "Oppdatering installert med suksess",
      failed: "Kunne ikke installere oppdatering"
    },
    breadcrumbs: {
      home: {
        title: "Hjem"
      },
      songs: {
        title: "Sanger"
      },
      playlists: {
        title: "Playlists"
      },
      albums: {
        title: "Album"
      },
      artists: {
        title: "Artister"
      },
      fastUpload: {
        title: "Rask opplasting"
      },
      settings: {
        title: "Innstillinger",
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
        },
        about: {
          title: "Om"
        }
      },
      lyrics: {
        title: "Sangtekst"
      }
    },
    home: {
      title: "Hjem",
      jumpBackIn: {
        title: "Fortsett spilling",
        description: "Fortsett der du slapp"
      },
      newReleases: {
        title: "Nye utgivelser",
        description: "Nye tillegg til samlingen din"
      },
      onRepeat: {
        title: "På gjentakelse",
        description: "Låter du ikke kan slutte å spille"
      },
      discover: {
        title: "Oppdag",
        description: "Nye musikanbefalinger for deg"
      },
      favoriteArtists: {
        title: "Dine artister",
        description: "Artister du elsker mest"
      },
      yourPlaylists: {
        title: "Laget for deg",
        description: "Dine personlige spillelister"
      },
      topAlbums: {
        title: "Toppalbum",
        description: "Dine mest spilte album"
      },
      recentlyAdded: {
        title: "Nylig lagt til",
        description: "Nye tillegg til biblioteket ditt"
      },
      empty: {
        title: "Biblioteket ditt er tomt",
        description:
          "Velkommen til Tunno. For å komme i gang må du legge til musikk i ditt personlige bibliotek.",
        getStarted: "Kom i gang",
        songs: {
          title: "Importer sanger",
          description: "Legg til musikkfiler fra enheten din for å begynne å bygge biblioteket ditt"
        },
        albums: {
          title: "Opprett album",
          description: "Organiser musikken din ved å opprette album med omslag og detaljer"
        },
        playlists: {
          title: "Opprett spilleliste",
          description: "Lag dine egne mikser for enhver stemning eller aktivitet"
        },
        artists: {
          title: "Legg til artister",
          description: "Opprett artistprofiler for å organisere og administrere musikken deres"
        }
      }
    },
    songs: {
      title: "Sanger",
      createdTitle: "Sang opprettet",
      createdDescription: "{name} er opprettet",
      createdFailedTitle: "Kunne ikke opprette sang",
      updatedTitle: "Sang oppdatert",
      updatedDescription: "{name} er oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere sang",
      deletedTitle: "Sang slettet",
      deletedDescription: "{name} er slettet",
      deletedFailedTitle: "Kunne ikke slette sang",
      filters: {
        title: "Filtre",
        clear: "Tøm aktive filtre",
        sortBy: "Sorter etter",
        favorites: "Kun favoritter",
        favoritesDescription: "Vis kun favoritt sanger",
        lyrics: "Med tekst",
        lyricsDescription: "Vis kun sanger med tekst",
        releaseYear: "Utgivelsesår",
        duration: "Varighet",
        durationMin: "Minimum",
        durationMax: "Maksimum",
        playCount: "Antall avspillinger",
        playCountMin: "Minimum",
        playCountMax: "Maksimum",
        lastPlayed: "Sist spilt",
        lastPlayedAfter: "Etter",
        lastPlayedBefore: "Før",
        selectDate: "Velg dato",
        sortOptions: {
          name: "Navn",
          duration: "Varighet",
          favorites: "Favoritter",
          year: "År",
          playCount: "Avspillinger",
          lastPlayed: "Sist spilt",
          createdAt: "Opprettelsesdato",
          updatedAt: "Oppdateringsdato"
        }
      }
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist opprettet",
      createdDescription: "{name} er opprettet",
      createdFailedTitle: "Kunne ikke opprette playlist",
      updatedTitle: "Playlist oppdatert",
      updatedDescription: "{name} er oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere playlist",
      songsAddedTitle: "Sanger lagt til vellykket",
      songsAddedFailedTitle: "Mislyktes med å legge til sanger",
      deletedTitle: "Playlist slettet",
      deletedDescription: "{name} er slettet",
      deletedFailedTitle: "Kunne ikke slette playlist",
      filters: {
        title: "Filtre",
        clear: "Tøm aktive filtre",
        sortBy: "Sorter etter",
        favorites: "Kun favoritter",
        favoritesDescription: "Vis kun favorittplaylists",
        playCount: "Avspillinger",
        playCountMin: "Minimum avspillinger",
        playCountMax: "Maksimum avspillinger",
        totalTracks: "Totalt antall spor",
        totalTracksMin: "Minimum spor",
        totalTracksMax: "Maksimum spor",
        totalDuration: "Total varighet",
        totalDurationMin: "Minimum varighet",
        totalDurationMax: "Maksimum varighet",
        lastPlayed: "Sist avspilt",
        lastPlayedAfter: "Etter",
        lastPlayedBefore: "Før",
        selectDate: "Velg dato",
        sortOptions: {
          name: "Navn",
          favorites: "Favoritter",
          playCount: "Avspillinger",
          totalTracks: "Totalt antall spor",
          totalDuration: "Total varighet",
          lastPlayed: "Sist avspilt",
          createdAt: "Opprettelsesdato",
          updatedAt: "Oppdateringsdato"
        }
      }
    },
    albums: {
      title: "Album",
      createdTitle: "Album opprettet",
      createdDescription: "{name} er opprettet",
      createdFailedTitle: "Kunne ikke opprette album",
      updatedTitle: "Album oppdatert",
      updatedDescription: "{name} er oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere album",
      deletedTitle: "Album slettet",
      deletedDescription: "{name} er slettet",
      deletedFailedTitle: "Kunne ikke slette album",
      filters: {
        title: "Filtre",
        clear: "Tøm aktive filtre",
        sortBy: "Sorter etter",
        favorites: "Kun favoritter",
        favoritesDescription: "Vis kun favorittalbum",
        albumType: "Albumtype",
        all: "Alle typer",
        single: "Single",
        album: "Album",
        compilation: "Samling",
        releaseYear: "Utgivelsesår",
        releaseYearMin: "Minimum år",
        releaseYearMax: "Maksimum år",
        playCount: "Avspillinger",
        playCountMin: "Minimum avspillinger",
        playCountMax: "Maksimum avspillinger",
        totalTracks: "Totalt antall spor",
        totalTracksMin: "Minimum spor",
        totalTracksMax: "Maksimum spor",
        totalDuration: "Total varighet",
        totalDurationMin: "Minimum varighet",
        totalDurationMax: "Maksimum varighet",
        lastPlayed: "Sist spilt",
        lastPlayedAfter: "Spilt etter",
        lastPlayedBefore: "Spilt før",
        selectDate: "Velg dato",
        sortOptions: {
          name: "Navn",
          releaseYear: "Utgivelsesår",
          favorites: "Favoritter",
          playCount: "Avspillinger",
          totalTracks: "Totalt antall spor",
          totalDuration: "Total varighet",
          lastPlayed: "Sist spilt",
          createdAt: "Opprettet",
          updatedAt: "Oppdatert"
        }
      }
    },
    artists: {
      title: "Artister",
      createdTitle: "Artist opprettet",
      createdDescription: "{name} er opprettet",
      createdFailedTitle: "Kunne ikke opprette artist",
      updatedTitle: "Artist oppdatert",
      updatedDescription: "{name} er oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere artist",
      deletedTitle: "Artist slettet",
      deletedDescription: "{name} er slettet",
      deletedFailedTitle: "Kunne ikke slette artist",
      filters: {
        title: "Filtre",
        clear: "Fjern aktive filtre",
        sortBy: "Sorter etter",
        favorites: "Kun favoritter",
        favoritesDescription: "Vis kun favorittartister",
        playCount: "Antall avspillinger",
        playCountMin: "Minimum",
        playCountMax: "Maksimum",
        totalTracks: "Totalt antall sanger",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maksimum",
        totalDuration: "Total varighet",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maksimum",
        lastPlayed: "Sist spilt",
        lastPlayedAfter: "Etter",
        lastPlayedBefore: "Før",
        selectDate: "Velg dato",
        sortOptions: {
          name: "Navn",
          favorites: "Favoritter",
          playCount: "Antall avspillinger",
          totalTracks: "Totalt antall sanger",
          totalDuration: "Total varighet",
          lastPlayed: "Sist spilt",
          createdAt: "Opprettet",
          updatedAt: "Oppdatert"
        }
      }
    },
    favorites: {
      createdTitle: "Lagt til i favoritter",
      createdDescription: "{name} er lagt til i favoritter",
      createdFailedTitle: "Kunne ikke legge til i favoritter",
      deletedTitle: "Fjernet fra favoritter",
      deletedDescription: "{name} er fjernet fra favoritter",
      deletedFailedTitle: "Kunne ikke fjerne fra favoritter"
    },
    sidebar: {
      addedTitle: "Lagt til i sidefeltet",
      addedDescription: "{name} er lagt til i sidefeltet",
      addedFailedTitle: "Kunne ikke legge til i sidefeltet",
      removedTitle: "Fjernet fra sidefeltet",
      removedDescription: "{name} er fjernet fra sidefeltet"
    },
    settings: {
      title: "Innstillinger",
      appearance: {
        title: "Utseende",
        description: "Definer applikasjonens utseendepreferanser.",
        theme: {
          title: "Tema",
          description: "Velg applikasjonstemaet",
          light: "Lyst",
          dark: "Mørkt",
          system: "System"
        },
        zoom: {
          title: "Zoom",
          description: "Juster applikasjonens zoomnivå"
        }
      },
      language: {
        title: "Språk",
        description: "Velg foretrukket språk"
      },
      equalizer: {
        title: "Equalizer",
        enable: {
          title: "Aktiver equalizer",
          description: "Aktiver eller deaktiver lyd-equalizer",
          enabled: "Aktivert",
          disabled: "Deaktivert"
        },
        presets: {
          title: "Equalizer forhåndsinnstillinger",
          description: "Velg fra forhåndsdefinerte equalizer-innstillinger",
          flat: {
            label: "Flat",
            description: "Ingen justeringer"
          },
          rock: {
            label: "Rock",
            description: "Forsterket bass og høye toner"
          },
          pop: {
            label: "Pop",
            description: "Balansert med lett boost"
          },
          jazz: {
            label: "Jazz",
            description: "Myk betoning av mellomfrekvenser"
          },
          classical: {
            label: "Klassisk",
            description: "Naturlig lyd"
          },
          electronic: {
            label: "Elektronisk",
            description: "Tung bass og klare høye toner"
          },
          vocal: {
            label: "Vokal",
            description: "Mellomfrekvens boost for klarhet"
          },
          bass: {
            label: "Bass",
            description: "Tung betoning av lave frekvenser"
          },
          treble: {
            label: "Høye toner",
            description: "Betoning av høye frekvenser"
          }
        },
        bands: {
          title: "Frekvensbånd",
          description: "Juster individuelle frekvensbånd"
        },
        reset: {
          title: "Tilbakestill equalizer",
          description: "Tilbakestill alle bånd til flat (0 dB)",
          button: "Tilbakestill til flat"
        }
      },
      sync: {
        title: "Synkronisering",
        description: "Synkroniser data på tvers av enheter",
        export: {
          title: "Eksporter bibliotek",
          description:
            "Eksporter biblioteket ditt som en pakkefil for sikkerhetskopiering eller for bruk på en annen enhet",
          selectDestination: "Velg destinasjon",
          exportingSongs: "Eksporterer {count} sang{count, plural, one {} other{er}}",
          preparingExport: "Forbereder eksport",
          exportingMessage: "Dette kan ta et øyeblikk",
          exportSuccess: "Bibliotek eksportert",
          showFolder: "Vis mappe",
          exportAgain: "Eksporter på nytt",
          exportFailed: "Eksport mislyktes",
          tryAgain: "Prøv igjen",
          noSongs: "Ingen sanger å eksportere",
          libraryEmpty: "Biblioteket ditt er tomt",
          noValidSongs: "Ingen gyldige sanger å eksportere",
          missingAlbumInfo: "Alle sanger mangler albuminformasjon",
          songsExported: "{count} sang{count, plural, one {} other{er}} eksportert til pakke"
        },
        desktop: {
          title: "Synkroniser med mobil",
          description: "Overfør biblioteket ditt til Tunno Mobile over ditt lokale nettverk"
        },
        mobile: {
          title: "Synkroniser med datamaskin",
          generateQr: "Generer QR-kode",
          stopServer: "Stopp server",
          waitingConnection: "Venter på tilkobling fra mobilenhet",
          deviceConnected: "Enhet tilkoblet",
          syncInProgress: "Synkronisering pågår",
          syncCompleted: "Synkronisering fullført",
          serverError: "Kunne ikke starte synkroniseringsserver",
          scanQr: "Skann QR-kode",
          scanQrDescription:
            "Skann QR-koden på skrivebordet ditt for å overføre musikkbiblioteket over ditt lokale nettverk",
          connecting: "Kobler til",
          comparing: "Sammenligner biblioteker",
          syncing: "Synkroniserer",
          finalizing: "Fullfører",
          completed: "Synkronisering fullført",
          completedDescription: "Musikkbiblioteket ditt er synkronisert",
          alreadySynced: "Allerede synkronisert",
          failed: "Synkronisering mislyktes",
          cancel: "Avbryt",
          done: "Ferdig",
          songsSynced: "{synced} / {total} sanger",
          batchProgress: "Batch {current} / {total}",
          cameraPermissionTitle: "Kameratilgang kreves",
          cameraPermissionDescription:
            "Gi kameratilgang for å skanne QR-koden som vises på skrivebordet",
          grantPermission: "Gi tillatelse",
          cameraLoading: "Laster kamera",
          scanInstruction: "Rett kameraet mot QR-koden på skrivebordet ditt",
          connectionFailed: "Kunne ikke nå skrivebordsserveren",
          insufficientStorageDescription:
            "Ikke nok ledig plass til å synkronisere. Trenger {required}, men bare {available} tilgjengelig",
          syncInterrupted: "Synkronisering ble avbrutt fordi appen gikk til bakgrunnen",
          downloadingItem: 'Laster ned "{name}"',
          fetchingBatch: "Henter batch {batch} metadata",
          updatingStats: "Oppdaterer statistikk",
          syncComplete: "Synkronisering fullført",
          comparingLibraries: "Sammenligner biblioteker",
          connectingToDesktop: "Kobler til skrivebord",
          cancelledByMobile: "Synkronisering avbrutt av mobilenhet",
          syncTimedOut: "Mobilenheten responderte ikke",
          connectionLost: "Skrivebordserveren frakoblet"
        }
      },
      about: {
        title: "Om",
        description: "Applikasjonsinformasjon og versjonsdetaljer",
        version: "Versjon",
        whatsNew: {
          title: "Hva er nytt",
          description: "Sjekk ut de nyeste funksjonene og forbedringene",
          newRelease: "Ny versjon",
          viewChangelog: "Se changelog"
        },
        storage: {
          title: "Lagring & data",
          description: "Administrer applikasjonsdata og innstillinger",
          openDataFolder: "Åpne datamappe"
        },
        legal: {
          title: "Juridisk & opphavsrett",
          description: "Lisensinformasjon og juridiske dokumenter",
          copyright: "Opphavsrett",
          licensed: "Lisensiert under MIT-lisens",
          viewLicense: "Se lisens",
          viewOnGitHub: "Se på GitHub"
        }
      }
    },
    fastUpload: {
      title: "Rask opplasting",
      description: "Importer pakker fra CLI eller eksportert fra",
      cliTooltip: "Åpne Tunno CLI-dokumentasjon",
      selectBundle: "Velg pakke",
      changeBundle: "Endre pakke",
      status: {
        pending: "Venter",
        processing: "Behandler",
        success: "Vellykket",
        error: "Feil",
        skipped: "Hoppet over"
      },
      completed: {
        allSuccess: {
          title: "Import fullført",
          description: "{count} spor importert vellykket"
        },
        withErrors: {
          title: "Import fullført med feil",
          description:
            "{successCount} importert, {errorCount} mislyktes, {skippedCount} hoppet over"
        },
        withSkipped: {
          title: "Import fullført",
          description: "{successCount} importert, {skippedCount} hoppet over"
        }
      }
    },
    lyrics: {
      title: "Sangtekst"
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
      nl: "Nederlandsk",
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
