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
      hoursAgo: "{{count}} Stunde{{count, plural, one {} other{n}}} her",
      today: "Heute",
      yesterday: "Gestern"
    },
    update: {
      downloading: "Update wird heruntergeladen und installiert",
      downloadingDescription: "Ein neues Update ist verfügbar und wird automatisch installiert",
      installedSuccess: "Update erfolgreich installiert",
      failed: "Update-Installation fehlgeschlagen"
    },
    songs: {
      title: "Lieder",
      createdTitle: "Lied erfolgreich erstellt",
      createdDescription: "{{name}} wurde erstellt",
      createdFailedTitle: "Lied konnte nicht erstellt werden",
      updatedTitle: "Lied erfolgreich aktualisiert",
      updatedDescription: "{{name}} wurde aktualisiert",
      updatedFailedTitle: "Lied konnte nicht aktualisiert werden",
      deletedTitle: "Lied erfolgreich gelöscht",
      deletedDescription: "{{name}} wurde gelöscht",
      deletedFailedTitle: "Lied konnte nicht gelöscht werden"
    },
    favorites: {
      title: "Favoriten",
      addedTitle: "Zu Favoriten hinzugefügt",
      addedDescription: "{{name}} wurde zu Favoriten hinzugefügt",
      addedFailedTitle: "Konnte nicht zu Favoriten hinzufügen",
      removedTitle: "Aus Favoriten entfernt",
      removedDescription: "{{name}} wurde aus Favoriten entfernt",
      removedFailedTitle: "Konnte nicht aus Favoriten entfernen"
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
      theme: {
        title: "Design",
        description: "Wählen Sie Ihr bevorzugtes Erscheinungsbild",
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
        description: "Synchronisieren Sie Ihre Daten zwischen Geräten"
      }
    }
  }
}
