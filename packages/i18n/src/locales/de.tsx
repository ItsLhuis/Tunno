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
      lessThanAnHourAgo: "Vor weniger als einer Stunde",
      hoursAgo: "Vor {{count}} Stunde{{count, plural, one {} other{n}}}",
      today: "Heute",
      yesterday: "Gestern",
      goBack: "Zurück",
      goFoward: "Vorwärts",
      favorite: "Favorit",
      unfavorite: "Favorit entfernen",
      enableShuffle: "Shuffle aktivieren",
      disableShuffle: "Shuffle deaktivieren",
      previous: "Zurück",
      play: "Abspielen",
      pause: "Pause",
      next: "Weiter",
      enableRepeat: "Wiederholung aktivieren",
      enableRepeatOne: "Einzelne Wiederholung aktivieren",
      disableRepeat: "Wiederholung deaktivieren",
      mute: "Stummschalten",
      unmute: "Ton einschalten",
      queue: "Warteschlange",
      title: "Titel",
      album: "Album",
      date: "Datum",
      duration: "Dauer",
      search: "Suchen",
      selectAll: "Alle auswählen",
      visibility: "Sichtbarkeit",
      columns: "Spalten",
      clear: "Löschen",
      cancel: "Abbrechen",
      more: "Mehr",
      select: "Auswählen"
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
        warning: "Warnung"
      },
      labels: {
        name: "Name",
        thumbnail: "Miniaturbild",
        file: "Datei",
        releaseYear: "Erscheinungsjahr",
        album: "Album",
        artists: "Künstler",
        isSingle: "Ist Single",
        folder: "Ordner"
      },
      buttons: {
        cancel: "Abbrechen",
        delete: "Löschen",
        update: "Aktualisieren",
        create: "Erstellen"
      },
      descriptions: {
        thumbnail: "Hintergrundbild (optional)",
        fileSize: "Maximale Größe: {{size}}",
        supportedFormats: "Unterstützte Formate: {{formats}}"
      },
      messages: {
        confirmDelete: "Sind Sie sicher, dass Sie löschen möchten?",
        unsavedChanges: "Es gibt ungespeicherte Änderungen"
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
        max: "Datei überschreitet die maximale Größe von {{maxSize}}"
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
      failed: "Update-Installation fehlgeschlagen"
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
        title: "Schnell-Upload"
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
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Fehler beim Erstellen des Liedes",
      updatedTitle: "Lied erfolgreich aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Fehler beim Aktualisieren des Liedes",
      deletedTitle: "Lied erfolgreich gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Fehler beim Löschen des Liedes"
    },
    favorites: {
      title: "Favoriten",
      createdTitle: "Zu Favoriten hinzugefügt",
      createdDescription: "{{name}} wurde zu Favoriten hinzugefügt",
      createdFailedTitle: "Fehler beim Hinzufügen zu Favoriten",
      deletedTitle: "Aus Favoriten entfernt",
      deletedDescription: "{{name}} wurde aus Favoriten entfernt",
      deletedFailedTitle: "Fehler beim Entfernen aus Favoriten"
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist erfolgreich erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Fehler beim Erstellen der Playlist",
      updatedTitle: "Playlist erfolgreich aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Fehler beim Aktualisieren der Playlist",
      deletedTitle: "Playlist erfolgreich gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Fehler beim Löschen der Playlist"
    },
    artists: {
      title: "Künstler",
      createdTitle: "Künstler erfolgreich erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Fehler beim Erstellen des Künstlers",
      updatedTitle: "Künstler erfolgreich aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Fehler beim Aktualisieren des Künstlers",
      deletedTitle: "Künstler erfolgreich gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Fehler beim Löschen des Künstlers"
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
      title: "Schnell-Upload"
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
