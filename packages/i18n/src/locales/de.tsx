import De from "../assets/de.svg"

import { type Language } from "../types"

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
      removeFromPlaylist: "Aus Playlist Entfernen",
      nowPlaying: "Wird abgespielt",
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
      completed: "Abgeschlossen"
    },
    form: {
      titles: {
        createSong: "Song Erstellen",
        updateSong: "Song Aktualisieren",
        deleteSong: "Song Löschen",
        createArtist: "Künstler Erstellen",
        updateArtist: "Künstler Aktualisieren",
        deleteArtist: "Künstler Löschen",
        createAlbum: "Album Erstellen",
        updateAlbum: "Album Aktualisieren",
        deleteAlbum: "Album Löschen",
        createPlaylist: "Playlist Erstellen",
        updatePlaylist: "Playlist Aktualisieren",
        deletePlaylist: "Playlist Löschen",
        addToPlaylist: "Zu Playlist Hinzufügen",
        confirmation: "Bestätigung",
        warning: "Warnung",
        lyricsPreview: "Songtexte Vorschau"
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
        }
      }
    },
    home: {
      title: "Startseite",
      jumpBackIn: {
        title: "Weitermachen",
        description: "Setzen Sie dort fort, wo Sie aufgehört haben"
      },
      yourPlaylists: {
        title: "Für Sie Erstellt",
        description: "Ihre persönlichen Playlists"
      },
      onRepeat: {
        title: "Im Wiederholungsmodus",
        description: "Songs, die Sie nicht aufhören können zu spielen"
      },
      newReleases: {
        title: "Neue Veröffentlichungen",
        description: "Frische Musik von Künstlern, denen Sie folgen"
      },
      favoriteArtists: {
        title: "Ihre Künstler",
        description: "Künstler, die Sie am meisten lieben"
      },
      topAlbums: {
        title: "Top Alben",
        description: "Ihre meistgespielten Alben"
      },
      recentlyAdded: {
        title: "Kürzlich Hinzugefügt",
        description: "Neueste Ergänzungen zu Ihrer Bibliothek"
      },
      hiddenGems: {
        title: "Versteckte Schätze",
        description: "Entdecken Sie vergessene Favoriten neu"
      },
      discover: {
        title: "Entdecken",
        description: "Neue Musikeempfehlungen für Sie"
      },
      yourStats: {
        title: "Ihre Musik",
        description: "Ihre Hörstatistiken und Einblicke"
      }
    },
    songs: {
      title: "Songs",
      createdTitle: "Song Erfolgreich Erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Song Erstellung Fehlgeschlagen",
      updatedTitle: "Song Erfolgreich Aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Song Aktualisierung Fehlgeschlagen",
      deletedTitle: "Song Erfolgreich Gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Song Löschung Fehlgeschlagen",
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
      createdTitle: "Playlist Erfolgreich Erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Playlist Erstellung Fehlgeschlagen",
      updatedTitle: "Playlist Erfolgreich Aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Playlist Aktualisierung Fehlgeschlagen",
      deletedTitle: "Playlist Erfolgreich Gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Playlist Löschung Fehlgeschlagen",
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
      createdTitle: "Album Erfolgreich Erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Album Erstellung Fehlgeschlagen",
      updatedTitle: "Album Erfolgreich Aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Album Aktualisierung Fehlgeschlagen",
      deletedTitle: "Album Erfolgreich Gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Album Löschung Fehlgeschlagen",
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
      createdTitle: "Künstler Erfolgreich Erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Künstler Erstellung Fehlgeschlagen",
      updatedTitle: "Künstler Erfolgreich Aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Künstler Aktualisierung Fehlgeschlagen",
      deletedTitle: "Künstler Erfolgreich Gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Künstler Löschung Fehlgeschlagen",
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
      createdTitle: "Zu Favoriten Hinzugefügt",
      createdDescription: "{name} wurde zu den Favoriten hinzugefügt",
      createdFailedTitle: "Hinzufügung Zu Favoriten Fehlgeschlagen",
      deletedTitle: "Von Favoriten Entfernt",
      deletedDescription: "{name} wurde von den Favoriten entfernt",
      deletedFailedTitle: "Entfernung Von Favoriten Fehlgeschlagen"
    },
    settings: {
      title: "Einstellungen",
      appearance: {
        title: "Aussehen",
        description: "Wählen Sie Ihren bevorzugten Aussehen-Modus",
        light: "Hell",
        dark: "Dunkel",
        system: "System"
      },
      language: {
        title: "Sprache",
        description: "Wählen Sie Ihre bevorzugte Sprache"
      },
      equalizer: {
        title: "Equalizer",
        enable: {
          title: "Equalizer Aktivieren",
          description: "Audio-Equalizer aktivieren oder deaktivieren",
          enabled: "Aktiviert",
          disabled: "Deaktiviert"
        },
        presets: {
          title: "Equalizer-Voreinstellungen",
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
          title: "Frequenzbänder",
          description: "Einzelne Frequenzbänder anpassen"
        },
        reset: {
          title: "Equalizer Zurücksetzen",
          description: "Alle Bänder auf flach zurücksetzen (0 dB)",
          button: "Auf Flach Zurücksetzen"
        }
      },
      sync: {
        title: "Synchronisation",
        description: "Synchronisieren Sie Ihre Daten zwischen Geräten"
      }
    },
    fastUpload: {
      title: "Schneller Upload",
      description: "Erstellen Sie ein Bundle mit dem Tunno CLI und importieren Sie es hier",
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
          title: "Import Abgeschlossen!",
          description: "{count} Track{count, plural, one {} other{s}} erfolgreich importiert"
        },
        withErrors: {
          title: "Import mit Fehlern Abgeschlossen",
          description:
            "{successCount} importiert, {errorCount} fehlgeschlagen, {skippedCount} übersprungen"
        },
        withSkipped: {
          title: "Import Abgeschlossen",
          description: "{successCount} importiert, {skippedCount} übersprungen"
        }
      }
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
