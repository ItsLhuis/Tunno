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
      goFoward: "Vorwärts gehen",
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
      actions: "Aktionen",
      addTo: "Hinzufügen zu",
      playlist: "Wiedergabeliste",
      song: "Lied",
      lyrics: "Songtexte",
      openMiniplayer: "Miniplayer öffnen",
      enterFullScreen: "Vollbild aktivieren",
      exitFullScreen: "Vollbild verlassen",
      goToSong: "Zum Lied gehen",
      goToAlbum: "Zum Album gehen",
      goToArtist: "Zum Künstler gehen",
      shuffleAndPlay: "Mischen und abspielen",
      unknown: "Unbekannt",
      unknownAlbum: "Unbekanntes Album",
      unknownArtist: "Unbekannter Künstler",
      listenTime: "Hörzeit",
      averageListenTime: "Durchschnittliche Hörzeit",
      retentionRate: "Retention Rate",
      totalPlays: "Gesamte Wiedergaben",
      lastPlayed: "Zuletzt gespielt"
    },
    form: {
      titles: {
        createSong: "Song Erstellen",
        updateSong: "Song Aktualisieren",
        deleteSong: "Song Löschen",
        createArtist: "Künstler Erstellen",
        updateArtist: "Künstler Aktualisieren",
        deleteArtist: "Künstler Löschen",
        createPlaylist: "Wiedergabeliste Erstellen",
        updatePlaylist: "Wiedergabeliste Aktualisieren",
        deletePlaylist: "Wiedergabeliste Löschen",
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
        artists: "Künstler",
        folder: "Ordner",
        lyrics: "Songtexte"
      },
      buttons: {
        cancel: "Abbrechen",
        delete: "Löschen",
        update: "Aktualisieren",
        create: "Erstellen"
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
        title: "Wiedergabelisten"
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
        sync: {
          title: "Synchronisation"
        }
      }
    },
    home: {
      title: "Startseite"
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
      title: "Wiedergabelisten",
      createdTitle: "Wiedergabeliste Erfolgreich Erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Wiedergabeliste Erstellung Fehlgeschlagen",
      updatedTitle: "Wiedergabeliste Erfolgreich Aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Wiedergabeliste Aktualisierung Fehlgeschlagen",
      deletedTitle: "Wiedergabeliste Erfolgreich Gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Wiedergabeliste Löschung Fehlgeschlagen"
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
      deletedFailedTitle: "Album Löschung Fehlgeschlagen"
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
      deletedFailedTitle: "Künstler Löschung Fehlgeschlagen"
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
      sync: {
        title: "Synchronisation",
        description: "Synchronisieren Sie Ihre Daten zwischen Geräten"
      }
    },
    fastUpload: {
      title: "Schneller Upload"
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
