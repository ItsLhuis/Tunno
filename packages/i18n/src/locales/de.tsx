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
      hoursAgo: "{{count}} Stunde{{count, plural, one {} other{n}}} vor",
      today: "Heute",
      yesterday: "Gestern"
    },
    songs: {
      title: "Lieder",
      createdTitle: "Lied Erfolgreich Erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Fehler beim Erstellen des Liedes",
      updatedTitle: "Lied Erfolgreich Aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Fehler beim Aktualisieren des Liedes",
      deletedTitle: "Lied Erfolgreich Gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Fehler beim Löschen des Liedes"
    },
    favorites: {
      title: "Favoriten",
      addedTitle: "Zu Favoriten Hinzugefügt",
      addedDescription: "{{name}} wurde zu Favoriten hinzugefügt",
      addedFailedTitle: "Konnte Nicht Zu Favoriten Hinzufügen",
      removedTitle: "Von Favoriten Entfernt",
      removedDescription: "{{name}} wurde von Favoriten entfernt",
      removedFailedTitle: "Konnte Nicht Von Favoriten Entfernen"
    },
    playlists: {
      title: "Wiedergabelisten",
      createdTitle: "Wiedergabeliste Erfolgreich Erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Konnte Wiedergabeliste Nicht Erstellen",
      updatedTitle: "Wiedergabeliste Erfolgreich Aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Konnte Wiedergabeliste Nicht Aktualisieren",
      deletedTitle: "Wiedergabeliste Erfolgreich Gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Konnte Wiedergabeliste Nicht Löschen"
    },
    artists: {
      title: "Künstler",
      createdTitle: "Künstler Erfolgreich Erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Konnte Künstler Nicht Erstellen",
      updatedTitle: "Künstler Erfolgreich Aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Konnte Künstler Nicht Aktualisieren",
      deletedTitle: "Künstler Erfolgreich Gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Konnte Künstler Nicht Löschen"
    },
    settings: {
      title: "Einstellungen",
      theme: {
        title: "Theme",
        description: "Select your preferred appearance mode",
        light: "Light",
        dark: "Dark",
        system: "System"
      },
      language: {
        title: "Language",
        description: "Choose your preferred language"
      },
      sync: {
        title: "Sync",
        description: "Synchronize your data across devices"
      }
    }
  }
}
