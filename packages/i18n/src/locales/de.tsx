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
      hoursAgo: "Vor {{count}} Stunde{{count, plural, one {n} other{n}}}",
      today: "Heute",
      yesterday: "Gestern",
      goBack: "Zurück",
      goFoward: "Vorwärts",
      favorite: "Favorit",
      unfavorite: "Aus Favoriten entfernen",
      enableShuffle: "Zufallswiedergabe aktivieren",
      disableShuffle: "Zufallswiedergabe deaktivieren",
      previous: "Vorherige",
      play: "Abspielen",
      pause: "Pause",
      next: "Nächste",
      enableRepeat: "Wiederholen aktivieren",
      enableRepeatOne: "Einmal wiederholen",
      disableRepeat: "Wiederholen deaktivieren",
      mute: "Stummschalten",
      unmute: "Ton einschalten",
      queue: "Warteschlange",
      title: "Titel",
      album: "Album",
      date: "Datum",
      duration: "Dauer",
      search: "Suchen"
    },
    validation: {
      name: {
        required: "Name ist erforderlich",
        max: "Der Name darf höchstens 200 Zeichen lang sein"
      },
      file: {
        required: "Datei ist erforderlich",
        max: "Die Datei darf höchstens 50 Zeichen lang sein"
      },
      thumbnail: {
        max: "Das Vorschaubild darf höchstens 50 Zeichen lang sein"
      },
      duration: {
        required: "Dauer ist erforderlich",
        min: "Die Dauer muss mindestens 0 sein"
      },
      releaseYear: {
        invalid: "Ungültiges Erscheinungsjahr",
        min: "Das Erscheinungsjahr muss mindestens 0 sein",
        max: "Das Erscheinungsjahr darf nicht in der Zukunft liegen"
      },
      albumId: {
        invalid: "Ungültiges Album",
        requiredIfNotSingle: "Das Album ist erforderlich, wenn es sich nicht um eine Single handelt"
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
          title: "Synchronisation"
        }
      }
    },
    home: { title: "Startseite" },
    songs: {
      title: "Lieder",
      createdTitle: "Lied Erfolgreich Erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Lied Erstellen Fehlgeschlagen",
      updatedTitle: "Lied Erfolgreich Aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Lied Aktualisieren Fehlgeschlagen",
      deletedTitle: "Lied Erfolgreich Gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Lied Löschen Fehlgeschlagen"
    },
    favorites: {
      title: "Favoriten",
      addedTitle: "Zu Favoriten Hinzugefügt",
      addedDescription: "{{name}} wurde zu Favoriten hinzugefügt",
      addedFailedTitle: "Zu Favoriten Hinzufügen Fehlgeschlagen",
      removedTitle: "Aus Favoriten Entfernt",
      removedDescription: "{{name}} wurde aus Favoriten entfernt",
      removedFailedTitle: "Aus Favoriten Entfernen Fehlgeschlagen"
    },
    playlists: {
      title: "Wiedergabelisten",
      createdTitle: "Wiedergabeliste Erfolgreich Erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Wiedergabeliste Erstellen Fehlgeschlagen",
      updatedTitle: "Wiedergabeliste Erfolgreich Aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Wiedergabeliste Aktualisieren Fehlgeschlagen",
      deletedTitle: "Wiedergabeliste Erfolgreich Gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Wiedergabeliste Löschen Fehlgeschlagen"
    },
    artists: {
      title: "Künstler",
      createdTitle: "Künstler Erfolgreich Erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Künstler Erstellen Fehlgeschlagen",
      updatedTitle: "Künstler Erfolgreich Aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Künstler Aktualisieren Fehlgeschlagen",
      deletedTitle: "Künstler Erfolgreich Gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Künstler Löschen Fehlgeschlagen"
    },
    settings: {
      title: "Einstellungen",
      appearance: {
        title: "Erscheinungsbild",
        description: "Wählen Sie Ihren bevorzugten Erscheinungsmodus",
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
