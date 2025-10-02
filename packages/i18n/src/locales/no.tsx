import No from "../assets/no.svg"

import { type Language } from "../types"

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
      yesterday: "I går",
      years: "{count} år",
      weeks: "{count} uke{count, plural, one {} other{r}}",
      days: "{count} dag{count, plural, one {} other{er}}",
      hours: "{count} time{count, plural, one {} other{r}}",
      minutes: "{count} minutt{count, plural, one {} other{er}}",
      seconds: "{count} sekund{count, plural, one {} other{er}}",
      goBack: "Gå tilbake",
      goFoward: "Gå fremover",
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
      actions: "Handlinger",
      addTo: "Legg til",
      playlist: "Spilleliste",
      song: "Sang",
      lyrics: "Sangtekst",
      openMiniplayer: "Åpne minispiller",
      enterFullScreen: "Gå til full skjerm",
      exitFullScreen: "Forlat full skjerm",
      goToSong: "Gå til sang",
      goToAlbum: "Gå til album",
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
      neverPlayed: "Aldri spilt"
    },
    form: {
      titles: {
        createSong: "Opprett sang",
        updateSong: "Oppdater sang",
        deleteSong: "Slett sang",
        createArtist: "Opprett artist",
        updateArtist: "Oppdater artist",
        deleteArtist: "Slett artist",
        createPlaylist: "Opprett spilleliste",
        updatePlaylist: "Oppdater spilleliste",
        deletePlaylist: "Slett spilleliste",
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
        artists: "Artister",
        folder: "Mappe",
        lyrics: "Tekst"
      },
      buttons: {
        cancel: "Avbryt",
        delete: "Slett",
        update: "Oppdater",
        create: "Opprett"
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
        title: "Spillelister"
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
        sync: {
          title: "Synkronisering"
        }
      }
    },
    home: {
      title: "Hjem"
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
      title: "Spillelister",
      createdTitle: "Spilleliste opprettet",
      createdDescription: "{name} er opprettet",
      createdFailedTitle: "Kunne ikke opprette spilleliste",
      updatedTitle: "Spilleliste oppdatert",
      updatedDescription: "{name} er oppdatert",
      updatedFailedTitle: "Kunne ikke oppdatere spilleliste",
      deletedTitle: "Spilleliste slettet",
      deletedDescription: "{name} er slettet",
      deletedFailedTitle: "Kunne ikke slette spilleliste"
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
      deletedFailedTitle: "Kunne ikke slette album"
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
    settings: {
      title: "Innstillinger",
      appearance: {
        title: "Utseende",
        description: "Velg ønsket utseendemodus",
        light: "Lyst",
        dark: "Mørkt",
        system: "System"
      },
      language: {
        title: "Språk",
        description: "Velg foretrukket språk"
      },
      sync: {
        title: "Synkronisering",
        description: "Synkroniser data på tvers av enheter"
      }
    },
    fastUpload: {
      title: "Rask opplasting"
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
