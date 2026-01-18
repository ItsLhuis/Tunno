import De from "../assets/de.svg"

import { type Language } from "../types"

/**
 * German language configuration.
 */
export const german: Language = {
  code: "de",
  name: "German",
  flag: De,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Keine Ergebnisse gefunden",
      lessThanAnHourAgo: "Vor weniger als einer Stunde",
      hoursAgo: "Vor {count} Stunde{count, plural, one {} other{n}}",
      today: "Heute",
      thisWeek: "Diese Woche",
      thisMonth: "Diesen Monat",
      yesterday: "Gestern",
      years: "{count} Jahr{count, plural, one {} other{e}}",
      weeks: "{count} Woche{count, plural, one {} other{n}}",
      days: "{count} Tag{count, plural, one {} other{e}}",
      hours: "{count} Stunde{count, plural, one {} other{n}}",
      minutes: "{count} Minute{count, plural, one {} other{n}}",
      seconds: "{count} Sekunde{count, plural, one {} other{n}}",
      goBack: "Zurück gehen",
      goForward: "Vorwärts gehen",
      favorite: "Zu Favoriten hinzufügen",
      unfavorite: "Favorit entfernen",
      enableShuffle: "Zufallswiedergabe aktivieren",
      disableShuffle: "Zufallswiedergabe deaktivieren",
      previous: "Vorherige",
      play: "Abspielen",
      pause: "Pause",
      next: "Nächste",
      enableRepeat: "Wiederholung aktivieren",
      enableRepeatOne: "Einzelwiederholung aktivieren",
      disableRepeat: "Wiederholung deaktivieren",
      mute: "Stumm",
      unmute: "Stumm aufheben",
      queue: "Warteschlange",
      title: "Titel",
      album: "Album",
      artist: "Künstler",
      date: "Datum",
      added: "Hinzugefügt",
      duration: "Dauer",
      search: "Suchen",
      selectAll: "Alle auswählen",
      clear: "Löschen",
      cancel: "Abbrechen",
      more: "Mehr",
      select: "Auswählen",
      preview: "Vorschau",
      close: "Schließen",
      playback: "Wiedergabe",
      playNext: "Als nächstes abspielen",
      removeFromQueue: "Aus Warteschlange entfernen",
      removeFromPlaylist: "Aus playlist entfernen",
      nowPlaying: "Wird abgespielt",
      noSongPlaying: "Nichts wird abgespielt",
      upNext: "Als nächstes",
      actions: "Aktionen",
      addTo: "Hinzufügen zu",
      playlist: "Playlist",
      song: "Lied",
      lyrics: "Songtexte",
      openMiniplayer: "Miniplayer öffnen",
      enterFullScreen: "Vollbild aktivieren",
      exitFullScreen: "Vollbild verlassen",
      goToSong: "Zum Lied gehen",
      goToAlbum: "Zum Album gehen",
      goToPlaylist: "Zur Playlist gehen",
      goToArtist: "Zum Künstler gehen",
      shuffleAndPlay: "Mischen und abspielen",
      unknown: "Unbekannt",
      unknownAlbum: "Unbekanntes Album",
      unknownArtist: "Unbekannter Künstler",
      listenTime: "Hörzeit",
      averageListenTime: "Durchschnittliche Hörzeit",
      retentionRate: "Retention Rate",
      totalPlays: "Gesamte Wiedergaben",
      lastPlayed: "Zuletzt gespielt",
      neverPlayed: "Nie gespielt",
      streak: "Serie",
      refresh: "Aktualisieren",
      showingOfTotal: "{showing} von {total} angezeigt",
      start: "Starten",
      completed: "Abgeschlossen",
      songsPlayed: "{count} Lied{count, plural, one {} other{er}}",
      appearsIn: "Erscheint in",
      addToSidebar: "Zur Seitenleiste hinzufügen",
      removeFromSidebar: "Aus der Seitenleiste entfernen",
      featured: "Vorgestellt",
      stats: "Statistiken",
      openToStart: "Öffne Tunno, um zu starten"
    },
    form: {
      titles: {
        createSong: "Song erstellen",
        updateSong: "Song aktualisieren",
        deleteSong: "Song löschen",
        createArtist: "Künstler erstellen",
        updateArtist: "Künstler aktualisieren",
        deleteArtist: "Künstler löschen",
        createAlbum: "Album erstellen",
        updateAlbum: "Album aktualisieren",
        deleteAlbum: "Album löschen",
        createPlaylist: "Playlist erstellen",
        updatePlaylist: "Playlist aktualisieren",
        deletePlaylist: "Playlist löschen",
        addToPlaylist: "Zu playlist hinzufügen",
        confirmation: "Bestätigung",
        warning: "Warnung",
        lyricsPreview: "Songtexte vorschau"
      },
      labels: {
        name: "Name",
        thumbnail: "Miniaturansicht",
        file: "Datei",
        releaseYear: "Erscheinungsjahr",
        album: "Album",
        albumType: "Albumtyp",
        artists: "Künstler",
        folder: "Ordner",
        lyrics: "Songtexte"
      },
      buttons: {
        cancel: "Abbrechen",
        delete: "Löschen",
        update: "Aktualisieren",
        create: "Erstellen",
        add: "Hinzufügen"
      },
      descriptions: {
        thumbnail: "Hintergrundbild (optional)",
        fileSize: "Maximale Größe: {size}",
        supportedFormats: "Unterstützte Formate: {formats}",
        lyricsPreview: "Visualisieren Sie, wie die Songtexte synchron mit der Zeit angezeigt werden"
      },
      badges: {
        lines: "{count} Zeile{count, plural, one {} other{n}}",
        duration: "Dauer: {time}"
      },
      messages: {
        confirmDelete: "Sind Sie sicher, dass Sie löschen möchten?",
        unsavedChanges: "Es gibt ungespeicherte Änderungen",
        noLyrics: "Keine Songtexte"
      }
    },
    validation: {
      name: {
        required: "Name ist erforderlich",
        max: "Name darf maximal 200 Zeichen lang sein"
      },
      file: {
        required: "Datei ist erforderlich",
        invalid: "Ungültige oder beschädigte Datei",
        max: "Datei überschreitet die maximale Größe von {maxSize}"
      },
      duration: {
        required: "Dauer ist erforderlich",
        min: "Dauer muss mindestens 0 sein"
      },
      releaseYear: {
        invalid: "Ungültiges Erscheinungsjahr",
        min: "Erscheinungsjahr muss mindestens 0 sein",
        max: "Erscheinungsjahr kann nicht in der Zukunft liegen"
      },
      albumId: {
        invalid: "Ungültiges Album"
      },
      artists: {
        invalid: "Ungültige Künstler"
      },
      albumType: {
        invalid: "Ungültiger Albumtyp"
      },
      playlistIds: {
        invalid: "Ungültige Playlists"
      },
      album: {
        duplicate: "Ein Album mit diesem Namen existiert bereits",
        integrity:
          "Künstler kann nicht vom Album entfernt werden, da es Songs gibt, die sowohl diesem Album als auch diesem Künstler angehören"
      },
      artist: {
        duplicate: "Ein Künstler mit diesem Namen existiert bereits",
        integrity:
          "Künstler kann nicht gelöscht werden, da es Songs gibt, die sowohl diesem Künstler als auch Alben angehören, die diesen Künstler ebenfalls enthalten"
      },
      playlist: {
        duplicate: "Eine Playlist mit diesem Namen existiert bereits"
      }
    },
    update: {
      downloading: "Update wird heruntergeladen und installiert",
      downloadingDescription: "Ein neues Update ist verfügbar und wird automatisch installiert",
      installedSuccess: "Update erfolgreich installiert",
      failed: "Installation des Updates fehlgeschlagen"
    },
    breadcrumbs: {
      home: {
        title: "Startseite"
      },
      songs: {
        title: "Songs"
      },
      playlists: {
        title: "Playlists"
      },
      albums: {
        title: "Alben"
      },
      artists: {
        title: "Künstler"
      },
      fastUpload: {
        title: "Schneller Upload"
      },
      settings: {
        title: "Einstellungen",
        appearance: {
          title: "Aussehen"
        },
        language: {
          title: "Sprache"
        },
        equalizer: {
          title: "Equalizer"
        },
        sync: {
          title: "Synchronisation"
        },
        about: {
          title: "Über"
        }
      },
      lyrics: {
        title: "Songtexte"
      }
    },
    home: {
      title: "Startseite",
      jumpBackIn: {
        title: "Weitermachen",
        description: "Setzen Sie dort fort, wo Sie aufgehört haben"
      },
      yourPlaylists: {
        title: "Für sie erstellt",
        description: "Ihre persönlichen Playlists"
      },
      onRepeat: {
        title: "Im wiederholungsmodus",
        description: "Songs, die Sie nicht aufhören können zu spielen"
      },
      newReleases: {
        title: "Neue veröffentlichungen",
        description: "Frische Musik von Künstlern, denen Sie folgen"
      },
      favoriteArtists: {
        title: "Ihre künstler",
        description: "Künstler, die Sie am meisten lieben"
      },
      discover: {
        title: "Entdecken",
        description: "Neue Musikeempfehlungen für Sie"
      },
      empty: {
        title: "Deine Bibliothek ist leer",
        description:
          "Willkommen bei Tunno. Um loszulegen, musst du deiner persönlichen Bibliothek Musik hinzufügen.",
        getStarted: "Loslegen",
        songs: {
          title: "Songs importieren",
          description: "Füge Musikdateien von deinem Gerät hinzu, um deine Bibliothek aufzubauen"
        },
        albums: {
          title: "Alben erstellen",
          description: "Organisiere deine Musik, indem du Alben mit Covern und Details erstellst"
        },
        playlists: {
          title: "Playlist erstellen",
          description: "Stelle deine eigenen Mixe für jede Stimmung oder Aktivität zusammen"
        },
        artists: {
          title: "Künstler hinzufügen",
          description: "Erstelle Künstlerprofile, um deren Musik zu organisieren und zu verwalten"
        }
      }
    },
    songs: {
      title: "Songs",
      createdTitle: "Song erfolgreich erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Song erstellung fehlgeschlagen",
      updatedTitle: "Song erfolgreich aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Song aktualisierung fehlgeschlagen",
      deletedTitle: "Song erfolgreich gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Song löschung fehlgeschlagen",
      filters: {
        title: "Filter",
        clear: "Aktive Filter löschen",
        sortBy: "Sortieren nach",
        favorites: "Nur Favoriten",
        favoritesDescription: "Nur Lieblingslieder anzeigen",
        lyrics: "Mit Texten",
        lyricsDescription: "Nur Lieder mit Texten anzeigen",
        releaseYear: "Erscheinungsjahr",
        duration: "Dauer",
        durationMin: "Minimum",
        durationMax: "Maximum",
        playCount: "Wiedergaben",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        lastPlayed: "Zuletzt abgespielt",
        lastPlayedAfter: "Nach",
        lastPlayedBefore: "Vor",
        selectDate: "Datum auswählen",
        sortOptions: {
          name: "Name",
          duration: "Dauer",
          favorites: "Favoriten",
          year: "Jahr",
          playCount: "Wiedergaben",
          lastPlayed: "Zuletzt abgespielt",
          createdAt: "Erstellungsdatum",
          updatedAt: "Aktualisierungsdatum"
        }
      }
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist erfolgreich erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Playlist erstellung fehlgeschlagen",
      updatedTitle: "Playlist erfolgreich aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Playlist aktualisierung fehlgeschlagen",
      songsAddedTitle: "Lieder erfolgreich hinzugefügt",
      songsAddedFailedTitle: "Fehler beim hinzufügen von liedern",
      deletedTitle: "Playlist erfolgreich gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Playlist löschung fehlgeschlagen",
      filters: {
        title: "Filter",
        clear: "Aktive Filter löschen",
        sortBy: "Sortieren nach",
        favorites: "Nur Favoriten",
        favoritesDescription: "Nur Lieblingsplaylists anzeigen",
        playCount: "Wiedergaben",
        playCountMin: "Mindestwiedergaben",
        playCountMax: "Höchstwiedergaben",
        totalTracks: "Gesamte Titel",
        totalTracksMin: "Mindesttitel",
        totalTracksMax: "Höchsttitel",
        totalDuration: "Gesamtdauer",
        totalDurationMin: "Mindestdauer",
        totalDurationMax: "Höchstdauer",
        lastPlayed: "Letzte Wiedergabe",
        lastPlayedAfter: "Nach",
        lastPlayedBefore: "Vor",
        selectDate: "Datum auswählen",
        sortOptions: {
          name: "Name",
          favorites: "Favoriten",
          playCount: "Wiedergaben",
          totalTracks: "Gesamte Titel",
          totalDuration: "Gesamtdauer",
          lastPlayed: "Letzte Wiedergabe",
          createdAt: "Erstellungsdatum",
          updatedAt: "Aktualisierungsdatum"
        }
      }
    },
    albums: {
      title: "Alben",
      createdTitle: "Album erfolgreich erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Album erstellung fehlgeschlagen",
      updatedTitle: "Album erfolgreich aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Album aktualisierung fehlgeschlagen",
      deletedTitle: "Album erfolgreich gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Album löschung fehlgeschlagen",
      filters: {
        title: "Filter",
        clear: "Aktive Filter löschen",
        sortBy: "Sortieren nach",
        favorites: "Nur Favoriten",
        favoritesDescription: "Nur Lieblingsalben anzeigen",
        albumType: "Albumtyp",
        all: "Alle Typen",
        single: "Single",
        album: "Album",
        compilation: "Kompilation",
        releaseYear: "Erscheinungsjahr",
        releaseYearMin: "Mindestjahr",
        releaseYearMax: "Höchstjahr",
        playCount: "Wiedergaben",
        playCountMin: "Mindestwiedergaben",
        playCountMax: "Höchstwiedergaben",
        totalTracks: "Gesamte Titel",
        totalTracksMin: "Mindesttitel",
        totalTracksMax: "Höchsttitel",
        totalDuration: "Gesamtdauer",
        totalDurationMin: "Mindestdauer",
        totalDurationMax: "Höchstdauer",
        lastPlayed: "Zuletzt gespielt",
        lastPlayedAfter: "Gespielt nach",
        lastPlayedBefore: "Gespielt vor",
        selectDate: "Datum auswählen",
        sortOptions: {
          name: "Name",
          releaseYear: "Erscheinungsjahr",
          favorites: "Favoriten",
          playCount: "Wiedergaben",
          totalTracks: "Gesamte Titel",
          totalDuration: "Gesamtdauer",
          lastPlayed: "Zuletzt gespielt",
          createdAt: "Erstellt",
          updatedAt: "Aktualisiert"
        }
      }
    },
    artists: {
      title: "Künstler",
      createdTitle: "Künstler erfolgreich erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Künstler erstellung fehlgeschlagen",
      updatedTitle: "Künstler erfolgreich aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Künstler aktualisierung fehlgeschlagen",
      deletedTitle: "Künstler erfolgreich gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Künstler löschung fehlgeschlagen",
      filters: {
        title: "Filter",
        clear: "Aktive Filter löschen",
        sortBy: "Sortieren nach",
        favorites: "Nur Favoriten",
        favoritesDescription: "Nur favorisierte Künstler anzeigen",
        playCount: "Wiedergabeanzahl",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        totalTracks: "Gesamtanzahl Lieder",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maximum",
        totalDuration: "Gesamtdauer",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maximum",
        lastPlayed: "Zuletzt gespielt",
        lastPlayedAfter: "Nach",
        lastPlayedBefore: "Vor",
        selectDate: "Datum auswählen",
        sortOptions: {
          name: "Name",
          favorites: "Favoriten",
          playCount: "Wiedergabeanzahl",
          totalTracks: "Gesamtanzahl Lieder",
          totalDuration: "Gesamtdauer",
          lastPlayed: "Zuletzt gespielt",
          createdAt: "Erstellungsdatum",
          updatedAt: "Aktualisierungsdatum"
        }
      }
    },
    favorites: {
      createdTitle: "Zu favoriten hinzugefügt",
      createdDescription: "{name} wurde zu den Favoriten hinzugefügt",
      createdFailedTitle: "Hinzufügung zu favoriten fehlgeschlagen",
      deletedTitle: "Von favoriten entfernt",
      deletedDescription: "{name} wurde von den Favoriten entfernt",
      deletedFailedTitle: "Entfernung von favoriten fehlgeschlagen"
    },
    sidebar: {
      addedTitle: "Zur Seitenleiste hinzugefügt",
      addedDescription: "{name} wurde zur Seitenleiste hinzugefügt",
      addedFailedTitle: "Hinzufügen zur Seitenleiste fehlgeschlagen",
      removedTitle: "Aus der Seitenleiste entfernt",
      removedDescription: "{name} wurde aus der Seitenleiste entfernt"
    },
    settings: {
      title: "Einstellungen",
      appearance: {
        title: "Aussehen",
        description: "Legen Sie die Darstellungseinstellungen der Anwendung fest.",
        theme: {
          title: "Thema",
          description: "Wählen Sie das Anwendungsthema",
          light: "Hell",
          dark: "Dunkel",
          system: "System"
        },
        zoom: {
          title: "Zoom",
          description: "Passen Sie die Zoomstufe der Anwendung an"
        }
      },
      language: {
        title: "Sprache",
        description: "Wählen Sie Ihre bevorzugte Sprache"
      },
      equalizer: {
        title: "Equalizer",
        enable: {
          title: "Equalizer aktivieren",
          description: "Audio-Equalizer aktivieren oder deaktivieren",
          enabled: "Aktiviert",
          disabled: "Deaktiviert"
        },
        presets: {
          title: "Equalizer-voreinstellungen",
          description: "Wählen Sie aus vordefinierten Equalizer-Einstellungen",
          flat: {
            label: "Flach",
            description: "Keine Anpassungen"
          },
          rock: {
            label: "Rock",
            description: "Verstärkte Bässe und Höhen"
          },
          pop: {
            label: "Pop",
            description: "Ausgewogen mit leichtem Boost"
          },
          jazz: {
            label: "Jazz",
            description: "Sanfte Betonung der Mittelfrequenzen"
          },
          classical: {
            label: "Klassisch",
            description: "Natürlicher Klang"
          },
          electronic: {
            label: "Elektronisch",
            description: "Schwere Bässe und klare Höhen"
          },
          vocal: {
            label: "Vokal",
            description: "Mittelfrequenz-Boost für Klarheit"
          },
          bass: {
            label: "Bass",
            description: "Schwere Betonung der tiefen Frequenzen"
          },
          treble: {
            label: "Höhen",
            description: "Betonung der hohen Frequenzen"
          }
        },
        bands: {
          title: "frequenzbänder",
          description: "Einzelne Frequenzbänder anpassen"
        },
        reset: {
          title: "Equalizer zurücksetzen",
          description: "Alle Bänder auf flach zurücksetzen (0 dB)",
          button: "Auf flach zurücksetzen"
        }
      },
      sync: {
        title: "Synchronisation",
        description: "Synchronisieren Sie Ihre Daten zwischen Geräten",
        export: {
          title: "Bibliothek exportieren",
          description:
            "Exportieren Sie Ihre Bibliothek als Bundle-Datei zur Sicherung oder zur Verwendung auf einem anderen Gerät",
          selectDestination: "Ziel auswählen",
          exportingSongs: "Exportiere {count} Song{count, plural, one {} other{s}}",
          preparingExport: "Export wird vorbereitet",
          exportingMessage: "Dies kann einen Moment dauern",
          exportSuccess: "Bibliothek erfolgreich exportiert",
          showFolder: "Ordner anzeigen",
          exportAgain: "Erneut exportieren",
          exportFailed: "Export fehlgeschlagen",
          tryAgain: "Erneut versuchen",
          noSongs: "Keine Songs zum Exportieren",
          libraryEmpty: "Deine Bibliothek ist leer",
          noValidSongs: "Keine gültigen Songs zum Exportieren",
          missingAlbumInfo: "Allen Songs fehlen Albuminformationen",
          songsExported: "{count} Song{count, plural, one {} other{s}} in Bundle exportiert"
        }
      },
      about: {
        title: "Über",
        description: "Anwendungsinformationen und Versionsdetails",
        version: "Version",
        whatsNew: {
          title: "Neues",
          description: "Erkunden Sie die neuesten Funktionen und Verbesserungen",
          newRelease: "Neue Version",
          viewChangelog: "Changelog ansehen"
        },
        storage: {
          title: "Speicher & daten",
          description: "Verwaltung von Anwendungsdaten und Einstellungen",
          openDataFolder: "Datenordner öffnen"
        },
        legal: {
          title: "Rechtliches & copyright",
          description: "Lizenzinformationen und rechtliche Dokumente",
          copyright: "Copyright",
          licensed: "Lizenziert unter MIT-Lizenz",
          viewLicense: "Lizenz ansehen",
          viewOnGitHub: "Auf GitHub ansehen"
        }
      }
    },
    fastUpload: {
      title: "Schneller Upload",
      description: "Importiere Pakete vom CLI oder exportiert von",
      cliTooltip: "Tunno CLI-Dokumentation öffnen",
      selectBundle: "Paket auswählen",
      changeBundle: "Paket ändern",
      status: {
        pending: "Ausstehend",
        processing: "Verarbeitung",
        success: "Erfolg",
        error: "Fehler",
        skipped: "Übersprungen"
      },
      completed: {
        allSuccess: {
          title: "Import abgeschlossen",
          description: "{count} Track{count, plural, one {} other{s}} erfolgreich importiert"
        },
        withErrors: {
          title: "Import mit fehlern abgeschlossen",
          description:
            "{successCount} importiert, {errorCount} fehlgeschlagen, {skippedCount} übersprungen"
        },
        withSkipped: {
          title: "Import abgeschlossen",
          description: "{successCount} importiert, {skippedCount} übersprungen"
        }
      }
    },
    lyrics: {
      title: "Songtexte"
    },
    languages: {
      da: "Dänisch",
      de: "Deutsch",
      en: "Englisch",
      es: "Spanisch",
      fi: "Finnisch",
      fr: "Französisch",
      hi: "Hindi",
      it: "Italienisch",
      ja: "Japanisch",
      ko: "Koreanisch",
      nl: "Niederländisch",
      no: "Norwegisch",
      pl: "Polnisch",
      pt: "Portugiesisch",
      ru: "Russisch",
      sv: "Schwedisch",
      tr: "Türkisch",
      uk: "Ukrainisch",
      vi: "Vietnamesisch",
      zh: "Chinesisch"
    }
  }
}
