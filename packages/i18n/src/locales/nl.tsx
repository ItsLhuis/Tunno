import Nl from "../assets/nl.svg"

import { type Language } from "../types"

export const dutch: Language = {
  code: "nl",
  name: "Nederlands",
  flag: Nl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Geen resultaten gevonden",
      lessThanAnHourAgo: "Minder dan een uur geleden",
      hoursAgo: "{count} uur geleden",
      today: "Vandaag",
      yesterday: "Gisteren",
      years: "{count} jaar",
      weeks: "{count} week{count, plural, one {} other{en}}",
      days: "{count} dag{count, plural, one {} other{en}}",
      hours: "{count} uur",
      minutes: "{count} minuut{count, plural, one {} other{en}}",
      seconds: "{count} seconde{count, plural, one {} other{n}}",
      goBack: "Ga terug",
      goForward: "Ga vooruit",
      favorite: "Toevoegen aan favorieten",
      unfavorite: "Favoriet verwijderen",
      enableShuffle: "Schud afspelen inschakelen",
      disableShuffle: "Schud afspelen uitschakelen",
      previous: "Vorige",
      play: "Afspelen",
      pause: "Pauzeren",
      next: "Volgende",
      enableRepeat: "Herhalen inschakelen",
      enableRepeatOne: "Eén keer herhalen inschakelen",
      disableRepeat: "Herhalen uitschakelen",
      mute: "Dempen",
      unmute: "Geluid aanzetten",
      queue: "Wachtrij",
      title: "Titel",
      album: "Album",
      artist: "Kunstenaar",
      date: "Datum",
      added: "Toegevoegd",
      duration: "Duur",
      search: "Zoeken",
      selectAll: "Alles selecteren",
      clear: "Wissen",
      cancel: "Annuleren",
      more: "Meer",
      select: "Selecteren",
      preview: "Voorbeeld",
      close: "Sluiten",
      playback: "Afspelen",
      playNext: "Volgende afspelen",
      removeFromQueue: "Verwijder uit wachtrij",
      removeFromPlaylist: "Verwijderen uit Afspeellijst",
      nowPlaying: "Nu aan het spelen",
      upNext: "Hierna",
      actions: "Acties",
      addTo: "Toevoegen aan",
      playlist: "Playlist",
      song: "Lied",
      lyrics: "Songtekst",
      openMiniplayer: "Minispeler openen",
      enterFullScreen: "Volledig scherm activeren",
      exitFullScreen: "Volledig scherm verlaten",
      goToSong: "Ga naar nummer",
      goToAlbum: "Ga naar album",
      goToPlaylist: "Ga naar playlist",
      goToArtist: "Ga naar artiest",
      shuffleAndPlay: "Schudden en afspelen",
      unknown: "Onbekend",
      unknownAlbum: "Onbekend album",
      unknownArtist: "Onbekende artiest",
      listenTime: "Luistertijd",
      averageListenTime: "Gemiddelde luistertijd",
      retentionRate: "Retentiepercentage",
      totalPlays: "Totale afspelingen",
      lastPlayed: "Laatst afgespeeld",
      neverPlayed: "Nooit afgespeeld",
      streak: "Reeks",
      refresh: "Vernieuwen",
      showingOfTotal: "{showing} van {total} weergegeven",
      start: "Start",
      completed: "Voltooid"
    },
    form: {
      titles: {
        createSong: "Nummer aanmaken",
        updateSong: "Nummer bijwerken",
        deleteSong: "Nummer verwijderen",
        createArtist: "Artiest aanmaken",
        updateArtist: "Artiest bijwerken",
        deleteArtist: "Artiest verwijderen",
        createAlbum: "Album aanmaken",
        updateAlbum: "Album bijwerken",
        deleteAlbum: "Album verwijderen",
        createPlaylist: "Playlist aanmaken",
        updatePlaylist: "Playlist bijwerken",
        deletePlaylist: "Playlist verwijderen",
        addToPlaylist: "Toevoegen aan Playlist",
        confirmation: "Bevestiging",
        warning: "Waarschuwing",
        lyricsPreview: "Songtekstvoorbeeld"
      },
      labels: {
        name: "Naam",
        thumbnail: "Miniatuur",
        file: "Bestand",
        releaseYear: "Uitgavejaar",
        album: "Album",
        albumType: "Albumtype",
        artists: "Artiesten",
        folder: "Map",
        lyrics: "Songtekst"
      },
      buttons: {
        cancel: "Annuleren",
        delete: "Verwijderen",
        update: "Bijwerken",
        create: "Aanmaken",
        add: "Toevoegen"
      },
      descriptions: {
        thumbnail: "Achtergrondafbeelding (optioneel)",
        fileSize: "Maximale grootte: {size}",
        supportedFormats: "Ondersteunde formaten: {formats}",
        lyricsPreview: "Bekijk hoe de songtekst gesynchroniseerd wordt weergegeven"
      },
      badges: {
        lines: "{count} regel{count, plural, one {} other{s}}",
        duration: "Duur: {time}"
      },
      messages: {
        confirmDelete: "Weet je zeker dat je dit wilt verwijderen?",
        unsavedChanges: "Er zijn niet-opgeslagen wijzigingen",
        noLyrics: "Geen songtekst"
      }
    },
    validation: {
      name: {
        required: "Naam is verplicht",
        max: "Naam mag maximaal 200 tekens bevatten"
      },
      file: {
        required: "Bestand is verplicht",
        invalid: "Ongeldig of beschadigd bestand",
        max: "Bestand overschrijdt de maximale grootte van {maxSize}"
      },
      duration: {
        required: "Duur is verplicht",
        min: "Duur moet minimaal 0 zijn"
      },
      releaseYear: {
        invalid: "Ongeldig uitgavejaar",
        min: "Uitgavejaar moet minimaal 0 zijn",
        max: "Uitgavejaar kan niet in de toekomst liggen"
      },
      albumId: {
        invalid: "Ongeldig album"
      },
      artists: {
        invalid: "Ongeldige artiesten"
      },
      albumType: {
        invalid: "Ongeldig albumtype"
      },
      playlistIds: {
        invalid: "Ongeldige afspeellijsten"
      },
      album: {
        duplicate: "Er bestaat al een album met deze naam",
        integrity:
          "Kan de artiest niet van het album verwijderen omdat er nummers zijn die zowel bij dit album als bij deze artiest horen"
      },
      artist: {
        duplicate: "Er bestaat al een artiest met deze naam",
        integrity:
          "Kan de artiest niet verwijderen omdat er nummers zijn die zowel bij deze artiest als bij albums horen die deze artiest ook bevatten"
      },
      playlist: {
        duplicate: "Er bestaat al een afspeellijst met deze naam"
      }
    },
    update: {
      downloading: "Update wordt gedownload en geïnstalleerd",
      downloadingDescription:
        "Er is een nieuwe update beschikbaar die automatisch wordt geïnstalleerd",
      installedSuccess: "Update succesvol geïnstalleerd",
      failed: "Installatie van update mislukt"
    },
    breadcrumbs: {
      home: {
        title: "Startpagina"
      },
      songs: {
        title: "Nummers"
      },
      playlists: {
        title: "Playlists"
      },
      albums: {
        title: "Albums"
      },
      artists: {
        title: "Artiesten"
      },
      fastUpload: {
        title: "Snelle upload"
      },
      settings: {
        title: "Instellingen",
        appearance: {
          title: "Uiterlijk"
        },
        language: {
          title: "Taal"
        },
        equalizer: {
          title: "Equalizer"
        },
        sync: {
          title: "Synchronisatie"
        },
        about: {
          title: "Over"
        }
      }
    },
    home: {
      title: "Startpagina",
      jumpBackIn: {
        title: "Verder Afspelen",
        description: "Ga verder waar je was gebleven"
      },
      yourPlaylists: {
        title: "Voor Jou Gemaakt",
        description: "Jouw persoonlijke afspeellijsten"
      },
      onRepeat: {
        title: "Op Herhaling",
        description: "Nummers die je niet kunt stoppen met luisteren"
      },
      newReleases: {
        title: "Nieuwe Releases",
        description: "Verse muziek van artiesten die je volgt"
      },
      favoriteArtists: {
        title: "Jouw Artiesten",
        description: "Artiesten waar je het meest van houdt"
      },
      topAlbums: {
        title: "Top Albums",
        description: "Jouw meest afgespeelde albums"
      },
      recentlyAdded: {
        title: "Recent Toegevoegd",
        description: "Laatste toevoegingen aan je bibliotheek"
      },
      hiddenGems: {
        title: "Verborgen Parels",
        description: "Herontdek vergeten favorieten"
      },
      discover: {
        title: "Ontdekken",
        description: "Nieuwe muziekaanbevelingen voor jou"
      },
      yourStats: {
        title: "Jouw Muziek",
        description: "Jouw luisterstatistieken en inzichten"
      }
    },
    songs: {
      title: "Nummers",
      createdTitle: "Nummer succesvol aangemaakt",
      createdDescription: "{name} is aangemaakt",
      createdFailedTitle: "Nummer aanmaken mislukt",
      updatedTitle: "Nummer succesvol bijgewerkt",
      updatedDescription: "{name} is bijgewerkt",
      updatedFailedTitle: "Nummer bijwerken mislukt",
      deletedTitle: "Nummer succesvol verwijderd",
      deletedDescription: "{name} is verwijderd",
      deletedFailedTitle: "Nummer verwijderen mislukt",
      filters: {
        title: "Filters",
        clear: "Actieve filters wissen",
        sortBy: "Sorteren op",
        favorites: "Alleen favorieten",
        favoritesDescription: "Toon alleen favoriete nummers",
        lyrics: "Met tekst",
        lyricsDescription: "Toon alleen nummers met tekst",
        releaseYear: "Uitgavejaar",
        duration: "Duur",
        durationMin: "Minimum",
        durationMax: "Maximum",
        playCount: "Aantal afspelingen",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        lastPlayed: "Laatst afgespeeld",
        lastPlayedAfter: "Na",
        lastPlayedBefore: "Voor",
        selectDate: "Datum selecteren",
        sortOptions: {
          name: "Naam",
          duration: "Duur",
          favorites: "Favorieten",
          year: "Jaar",
          playCount: "Afspelingen",
          lastPlayed: "Laatst afgespeeld",
          createdAt: "Aanmaakdatum",
          updatedAt: "Bijwerkdatum"
        }
      }
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist succesvol aangemaakt",
      createdDescription: "{name} is aangemaakt",
      createdFailedTitle: "Playlist aanmaken mislukt",
      updatedTitle: "Playlist succesvol bijgewerkt",
      updatedDescription: "{name} is bijgewerkt",
      updatedFailedTitle: "Playlist bijwerken mislukt",
      deletedTitle: "Playlist succesvol verwijderd",
      deletedDescription: "{name} is verwijderd",
      deletedFailedTitle: "Playlist verwijderen mislukt",
      filters: {
        title: "Filters",
        clear: "Actieve filters wissen",
        sortBy: "Sorteren op",
        favorites: "Alleen favorieten",
        favoritesDescription: "Toon alleen favoriete playlists",
        playCount: "Afspeelbeurten",
        playCountMin: "Minimum afspeelbeurten",
        playCountMax: "Maximum afspeelbeurten",
        totalTracks: "Totaal tracks",
        totalTracksMin: "Minimum tracks",
        totalTracksMax: "Maximum tracks",
        totalDuration: "Totale duur",
        totalDurationMin: "Minimum duur",
        totalDurationMax: "Maximum duur",
        lastPlayed: "Laatst afgespeeld",
        lastPlayedAfter: "Na",
        lastPlayedBefore: "Voor",
        selectDate: "Selecteer datum",
        sortOptions: {
          name: "Naam",
          favorites: "Favorieten",
          playCount: "Afspeelbeurten",
          totalTracks: "Totaal tracks",
          totalDuration: "Totale duur",
          lastPlayed: "Laatst afgespeeld",
          createdAt: "Aanmaakdatum",
          updatedAt: "Bijwerkdatum"
        }
      }
    },
    albums: {
      title: "Albums",
      createdTitle: "Album succesvol aangemaakt",
      createdDescription: "{name} is aangemaakt",
      createdFailedTitle: "Album aanmaken mislukt",
      updatedTitle: "Album succesvol bijgewerkt",
      updatedDescription: "{name} is bijgewerkt",
      updatedFailedTitle: "Album bijwerken mislukt",
      deletedTitle: "Album succesvol verwijderd",
      deletedDescription: "{name} is verwijderd",
      deletedFailedTitle: "Album verwijderen mislukt",
      filters: {
        title: "Filters",
        clear: "Actieve filters wissen",
        sortBy: "Sorteren op",
        favorites: "Alleen favorieten",
        favoritesDescription: "Toon alleen favoriete albums",
        albumType: "Albumtype",
        all: "Alle typen",
        single: "Single",
        album: "Album",
        compilation: "Compilatie",
        releaseYear: "Uitgavejaar",
        releaseYearMin: "Minimum jaar",
        releaseYearMax: "Maximum jaar",
        playCount: "Afspeelbeurten",
        playCountMin: "Minimum afspeelbeurten",
        playCountMax: "Maximum afspeelbeurten",
        totalTracks: "Totaal tracks",
        totalTracksMin: "Minimum tracks",
        totalTracksMax: "Maximum tracks",
        totalDuration: "Totale duur",
        totalDurationMin: "Minimum duur",
        totalDurationMax: "Maximum duur",
        lastPlayed: "Laatst afgespeeld",
        lastPlayedAfter: "Afgespeeld na",
        lastPlayedBefore: "Afgespeeld voor",
        selectDate: "Selecteer datum",
        sortOptions: {
          name: "Naam",
          releaseYear: "Uitgavejaar",
          favorites: "Favorieten",
          playCount: "Afspeelbeurten",
          totalTracks: "Totaal tracks",
          totalDuration: "Totale duur",
          lastPlayed: "Laatst afgespeeld",
          createdAt: "Aangemaakt",
          updatedAt: "Bijgewerkt"
        }
      }
    },
    artists: {
      title: "Artiesten",
      createdTitle: "Artiest succesvol aangemaakt",
      createdDescription: "{name} is aangemaakt",
      createdFailedTitle: "Artiest aanmaken mislukt",
      updatedTitle: "Artiest succesvol bijgewerkt",
      updatedDescription: "{name} is bijgewerkt",
      updatedFailedTitle: "Artiest bijwerken mislukt",
      deletedTitle: "Artiest succesvol verwijderd",
      deletedDescription: "{name} is verwijderd",
      deletedFailedTitle: "Artiest verwijderen mislukt",
      filters: {
        title: "Filters",
        clear: "Actieve filters wissen",
        sortBy: "Sorteren op",
        favorites: "Alleen favorieten",
        favoritesDescription: "Toon alleen favoriete artiesten",
        playCount: "Aantal afspelingen",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        totalTracks: "Totaal aantal liedjes",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maximum",
        totalDuration: "Totale duur",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maximum",
        lastPlayed: "Laatst afgespeeld",
        lastPlayedAfter: "Na",
        lastPlayedBefore: "Voor",
        selectDate: "Selecteer datum",
        sortOptions: {
          name: "Naam",
          favorites: "Favorieten",
          playCount: "Aantal afspelingen",
          totalTracks: "Totaal aantal liedjes",
          totalDuration: "Totale duur",
          lastPlayed: "Laatst afgespeeld",
          createdAt: "Aanmaakdatum",
          updatedAt: "Bijwerkdatum"
        }
      }
    },
    favorites: {
      createdTitle: "Toegevoegd aan favorieten",
      createdDescription: "{name} is toegevoegd aan favorieten",
      createdFailedTitle: "Toevoegen aan favorieten mislukt",
      deletedTitle: "Verwijderd uit favorieten",
      deletedDescription: "{name} is verwijderd uit favorieten",
      deletedFailedTitle: "Verwijderen uit favorieten mislukt"
    },
    settings: {
      title: "Instellingen",
      appearance: {
        title: "Uiterlijk",
        description: "Selecteer je voorkeursweergavemodus",
        light: "Licht",
        dark: "Donker",
        system: "Systeem"
      },
      language: {
        title: "Taal",
        description: "Kies je voorkeurs taal"
      },
      equalizer: {
        title: "Equalizer",
        enable: {
          title: "Equalizer Inschakelen",
          description: "Audio-equalizer in- of uitschakelen",
          enabled: "Ingeschakeld",
          disabled: "Uitgeschakeld"
        },
        presets: {
          title: "Equalizer Voorinstellingen",
          description: "Kies uit vooraf gedefinieerde equalizer-instellingen",
          flat: {
            label: "Vlak",
            description: "Geen aanpassingen"
          },
          rock: {
            label: "Rock",
            description: "Versterkte bas en hoge tonen"
          },
          pop: {
            label: "Pop",
            description: "Gebalanceerd met lichte boost"
          },
          jazz: {
            label: "Jazz",
            description: "Zachte nadruk op middenfrequenties"
          },
          classical: {
            label: "Klassiek",
            description: "Natuurlijk geluid"
          },
          electronic: {
            label: "Elektronisch",
            description: "Zware bas en heldere hoge tonen"
          },
          vocal: {
            label: "Vocaal",
            description: "Middenfrequentie boost voor helderheid"
          },
          bass: {
            label: "Bas",
            description: "Zware nadruk op lage frequenties"
          },
          treble: {
            label: "Hoge tonen",
            description: "Nadruk op hoge frequenties"
          }
        },
        bands: {
          title: "Frequentiebanden",
          description: "Individuele frequentiebanden aanpassen"
        },
        reset: {
          title: "Equalizer Resetten",
          description: "Alle banden resetten naar vlak (0 dB)",
          button: "Resetten naar Vlak"
        }
      },
      sync: {
        title: "Synchronisatie",
        description: "Synchroniseer je gegevens tussen apparaten"
      },
      about: {
        title: "Over",
        identity: {
          title: "Over",
          description: "Applicatie-informatie en versiedetails"
        },
        whatsNew: {
          title: "Wat is er nieuw",
          newRelease: "Nieuwe release",
          viewChangelog: "Changelog bekijken",
          dialog: {
            title: "Changelog"
          }
        },
        storage: {
          title: "Opslag & Gegevens",
          description: "Beheer applicatiegegevens en instellingen",
          openDataFolder: "Gegevensmap openen"
        },
        legal: {
          title: "Juridisch & Auteursrecht",
          description: "Licentie-informatie en juridische documenten",
          copyright: "Auteursrecht",
          licensed: "Gelicentieerd onder MIT-licentie",
          viewLicense: "Licentie bekijken",
          viewOnGitHub: "Bekijk op GitHub"
        }
      }
    },
    fastUpload: {
      title: "Snelle upload",
      description: "Maak een pakket met Tunno CLI en importeer het hier",
      cliTooltip: "Open Tunno CLI-documentatie",
      selectBundle: "Pakket selecteren",
      changeBundle: "Pakket wijzigen",
      status: {
        pending: "In behandeling",
        processing: "Verwerken",
        success: "Succesvol",
        error: "Fout",
        skipped: "Overgeslagen"
      },
      completed: {
        allSuccess: {
          title: "Importeren voltooid!",
          description: "{count} track{count, plural, one {} other{s}} succesvol geïmporteerd"
        },
        withErrors: {
          title: "Importeren voltooid met fouten",
          description:
            "{successCount} geïmporteerd, {errorCount} mislukt, {skippedCount} overgeslagen"
        },
        withSkipped: {
          title: "Importeren voltooid",
          description: "{successCount} geïmporteerd, {skippedCount} overgeslagen"
        }
      }
    },
    languages: {
      da: "Deens",
      de: "Duits",
      en: "Engels",
      es: "Spaans",
      fi: "Fins",
      fr: "Frans",
      hi: "Hindi",
      it: "Italiaans",
      ja: "Japans",
      ko: "Koreaans",
      nl: "Nederlands",
      no: "Noors",
      pl: "Pools",
      pt: "Portugees",
      ru: "Russisch",
      sv: "Zweeds",
      tr: "Turks",
      uk: "Oekraïens",
      vi: "Vietnamees",
      zh: "Chinees"
    }
  }
}
