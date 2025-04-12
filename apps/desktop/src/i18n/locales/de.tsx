import De from "@assets/images/flags/de.svg"

import { type Language } from "../types"

export const german: Language = {
  code: "de",
  name: "Deutsch",
  flag: De,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Keine Ergebnisse gefunden"
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
      title: "Favoriten"
    },
    playlists: {
      title: "Wiedergabelisten"
    },
    artists: {
      title: "Künstler"
    },
    settings: {
      title: "Einstellungen"
    }
  }
}
