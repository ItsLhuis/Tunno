import De from "../assets/de.svg"

import { type Language } from "../types"

export const german: Language = {
  code: "de",
  name: "Deutsch",
  flag: De,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Keine Ergebnisse gefunden",
      lessThanAnHourAgo: "Weniger als eine Stunde her",
      hoursAgo: "vor {count} Stunde{count, plural, one {} other{n}}",
      today: "Heute",
      yesterday: "Gestern",
      goBack: "Zurück",
      goFoward: "Vorwärts",
      favorite: "Favorit",
      unfavorite: "Favorit entfernen",
      enableShuffle: "Shuffle aktivieren",
      disableShuffle: "Shuffle deaktivieren",
      previous: "Vorherige",
      play: "Abspielen",
      pause: "Pause",
      next: "Nächste",
      enableRepeat: "Wiederholung aktivieren",
      enableRepeatOne: "Einzelwiederholung aktivieren",
      disableRepeat: "Wiederholung deaktivieren",
      mute: "Stummschalten",
      unmute: "Ton einschalten",
      queue: "Warteschlange",
      title: "Titel",
      album: "Album",
      date: "Datum",
      duration: "Dauer",
      search: "Suche",
      selectAll: "Alle auswählen",
      visibility: "Sichtbarkeit",
      columns: "Spalten",
      clear: "Löschen",
      cancel: "Abbrechen",
      more: "Mehr",
      select: "Auswählen",
      preview: "Vorschau",
      close: "Schließen"
    },
    form: {
      titles: {
        createSong: "Lied erstellen",
        updateSong: "Lied aktualisieren",
        deleteSong: "Lied löschen",
        createArtist: "Künstler erstellen",
        updateArtist: "Künstler aktualisieren",
        deleteArtist: "Künstler löschen",
        createPlaylist: "Playlist erstellen",
        updatePlaylist: "Playlist aktualisieren",
        deletePlaylist: "Playlist löschen",
        confirmation: "Bestätigung",
        warning: "Warnung",
        lyricsPreview: "Liedtext Vorschau"
      },
      labels: {
        name: "Name",
        thumbnail: "Miniaturbild",
        file: "Datei",
        releaseYear: "Erscheinungsjahr",
        album: "Album",
        artists: "Künstler",
        isSingle: "Ist Single",
        folder: "Ordner",
        lyrics: "Text"
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
        lyricsPreview: "Sehen Sie, wie der Liedtext synchronisiert mit der Zeit angezeigt wird"
      },
      badges: {
        lines: "{count} Zeile{count, plural, one {} other{n}}",
        duration: "Dauer: {time}"
      },
      messages: {
        confirmDelete: "Sind Sie sicher, dass Sie löschen möchten?",
        unsavedChanges: "Es gibt ungespeicherte Änderungen",
        noLyrics: "Kein Liedtext"
      }
    },
    validation: {
      name: {
        required: "Name ist erforderlich",
        max: "Name darf höchstens 200 Zeichen lang sein"
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
        max: "Erscheinungsjahr darf nicht in der Zukunft liegen"
      },
      albumId: {
        invalid: "Ungültiges Album",
        requiredIfNotSingle: "Album ist erforderlich, wenn es kein Single ist"
      },
      artists: {
        min: "Mindestens ein Künstler ist erforderlich"
      }
    },
    update: {
      downloading: "Update wird heruntergeladen und installiert",
      downloadingDescription: "Ein neues Update ist verfügbar und wird automatisch installiert",
      installedSuccess: "Update erfolgreich installiert",
      failed: "Update konnte nicht installiert werden"
    },
    breadcrumbs: {
      home: {
        title: "Startseite"
      },
      songs: {
        title: "Lieder"
      },
      favorites: {
        title: "Favoriten"
      },
      playlists: {
        title: "Playlists"
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
          title: "Darstellung"
        },
        language: {
          title: "Sprache"
        },
        sync: {
          title: "Synchronisierung"
        }
      }
    },
    home: {
      title: "Startseite"
    },
    songs: {
      title: "Lieder",
      createdTitle: "Lied erfolgreich erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Erstellung des Liedes fehlgeschlagen",
      updatedTitle: "Lied erfolgreich aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Aktualisierung des Liedes fehlgeschlagen",
      deletedTitle: "Lied erfolgreich gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Löschen des Liedes fehlgeschlagen"
    },
    favorites: {
      title: "Favoriten",
      createdTitle: "Zu Favoriten hinzugefügt",
      createdDescription: "{name} wurde zu Favoriten hinzugefügt",
      createdFailedTitle: "Hinzufügen zu Favoriten fehlgeschlagen",
      deletedTitle: "Aus Favoriten entfernt",
      deletedDescription: "{name} wurde aus Favoriten entfernt",
      deletedFailedTitle: "Entfernen aus Favoriten fehlgeschlagen"
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist erfolgreich erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Erstellung der Playlist fehlgeschlagen",
      updatedTitle: "Playlist erfolgreich aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Aktualisierung der Playlist fehlgeschlagen",
      deletedTitle: "Playlist erfolgreich gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Löschen der Playlist fehlgeschlagen"
    },
    artists: {
      title: "Künstler",
      createdTitle: "Künstler erfolgreich erstellt",
      createdDescription: "{name} wurde erstellt",
      createdFailedTitle: "Erstellung des Künstlers fehlgeschlagen",
      updatedTitle: "Künstler erfolgreich aktualisiert",
      updatedDescription: "{name} wurde aktualisiert",
      updatedFailedTitle: "Aktualisierung des Künstlers fehlgeschlagen",
      deletedTitle: "Künstler erfolgreich gelöscht",
      deletedDescription: "{name} wurde gelöscht",
      deletedFailedTitle: "Löschen des Künstlers fehlgeschlagen"
    },
    settings: {
      title: "Einstellungen",
      appearance: {
        title: "Darstellung",
        description: "Wählen Sie Ihren bevorzugten Darstellungsmodus",
        light: "Hell",
        dark: "Dunkel",
        system: "System"
      },
      language: {
        title: "Sprache",
        description: "Wählen Sie Ihre bevorzugte Sprache"
      },
      sync: {
        title: "Synchronisierung",
        description: "Synchronisieren Sie Ihre Daten auf mehreren Geräten"
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
