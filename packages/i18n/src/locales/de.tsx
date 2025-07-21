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
      goBack: "Zurück gehen",
      goFoward: "Vorwärts gehen",
      favorite: "Favorit",
      unfavorite: "Favorit entfernen",
      enableShuffle: "Zufallswiedergabe aktivieren",
      disableShuffle: "Zufallswiedergabe deaktivieren",
      previous: "Vorheriges",
      play: "Abspielen",
      pause: "Pause",
      next: "Nächstes",
      enableRepeat: "Wiederholung aktivieren",
      enableRepeatOne: "Eins wiederholen aktivieren",
      disableRepeat: "Wiederholung deaktivieren",
      mute: "Stumm schalten",
      unmute: "Stummschaltung aufheben",
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
      more: "Mehr"
    },
    form: {
      titles: {
        createSong: "Song erstellen",
        updateSong: "Song aktualisieren",
        deleteSong: "Song löschen",
        createArtist: "Künstler erstellen",
        updateArtist: "Künstler aktualisieren",
        deleteArtist: "Künstler löschen",
        createPlaylist: "Wiedergabeliste erstellen",
        updatePlaylist: "Wiedergabeliste aktualisieren",
        deletePlaylist: "Wiedergabeliste löschen",
        confirmation: "Bestätigung",
        warning: "Warnung"
      },
      labels: {
        name: "Name",
        thumbnail: "Vorschaubild",
        file: "Datei",
        releaseYear: "Erscheinungsjahr",
        album: "Album",
        artists: "Künstler",
        isSingle: "Ist Single"
      },
      buttons: {
        cancel: "Abbrechen",
        delete: "Löschen",
        update: "Aktualisieren",
        create: "Erstellen"
      },
      descriptions: {
        thumbnail: "Hintergrundbild (optional)",
        dragAndDrop: "Datei hier hineinziehen",
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
        max: "Datei darf höchstens 50 Zeichen lang sein"
      },
      thumbnail: {
        max: "Vorschaubild darf höchstens 50 Zeichen lang sein"
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
        invalid: "Ungültiges Album",
        requiredIfNotSingle: "Album ist erforderlich, wenn es keine Single ist"
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
        title: "Songs"
      },
      favorites: {
        title: "Favoriten"
      },
      playlists: {
        title: "Wiedergabelisten"
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
          title: "Erscheinungsbild"
        },
        language: {
          title: "Sprache"
        },
        sync: {
          title: "Synchronisieren"
        }
      }
    },
    home: {
      title: "Startseite"
    },
    songs: {
      title: "Songs",
      createdTitle: "Song erfolgreich erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Song konnte nicht erstellt werden",
      updatedTitle: "Song erfolgreich aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Song konnte nicht aktualisiert werden",
      deletedTitle: "Song erfolgreich gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Song konnte nicht gelöscht werden"
    },
    favorites: {
      title: "Favoriten",
      createdTitle: "Zu Favoriten hinzugefügt",
      createdDescription: "{{name}} wurde zu den Favoriten hinzugefügt",
      createdFailedTitle: "Konnte nicht zu Favoriten hinzufügen",
      deletedTitle: "Aus Favoriten entfernt",
      deletedDescription: "{{name}} wurde aus den Favoriten entfernt",
      deletedFailedTitle: "Konnte nicht aus Favoriten entfernen"
    },
    playlists: {
      title: "Wiedergabelisten",
      createdTitle: "Wiedergabeliste erfolgreich erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Wiedergabeliste konnte nicht erstellt werden",
      updatedTitle: "Wiedergabeliste erfolgreich aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Wiedergabeliste konnte nicht aktualisiert werden",
      deletedTitle: "Wiedergabeliste erfolgreich gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Wiedergabeliste konnte nicht gelöscht werden"
    },
    artists: {
      title: "Künstler",
      createdTitle: "Künstler erfolgreich erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Künstler konnte nicht erstellt werden",
      updatedTitle: "Künstler erfolgreich aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Künstler konnte nicht aktualisiert werden",
      deletedTitle: "Künstler erfolgreich gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Künstler konnte nicht gelöscht werden"
    },
    settings: {
      title: "Einstellungen",
      appearance: {
        title: "Erscheinungsbild",
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
        title: "Synchronisieren",
        description: "Synchronisieren Sie Ihre Daten geräteübergreifend"
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
