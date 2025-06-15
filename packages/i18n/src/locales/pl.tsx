import Pl from "../assets/pl.svg"

import { type Language } from "../types"

export const polish: Language = {
  code: "pl",
  name: "Polski",
  flag: Pl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nie znaleziono wyników",
      lessThanAnHourAgo: "Mniej niż godzinę temu",
      hoursAgo: "{{count}} godzin{{count, plural, one {ę} few {y} many {} other{y}}} temu",
      today: "Dziś",
      yesterday: "Wczoraj"
    },
    update: {
      downloading: "Pobieranie i instalowanie aktualizacji",
      downloadingDescription: "Dostępna jest nowa aktualizacja i jest automatycznie instalowana",
      installedSuccess: "Aktualizacja zainstalowana pomyślnie",
      failed: "Nie udało się zainstalować aktualizacji"
    },
    home: { title: "Home" },
    songs: {
      title: "Utwory",
      createdTitle: "Utwór utworzony pomyślnie",
      createdDescription: "{{name}} został utworzony",
      createdFailedTitle: "Nie udało się utworzyć utworu",
      updatedTitle: "Utwór zaktualizowany pomyślnie",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować utworu",
      deletedTitle: "Utwór usunięty pomyślnie",
      deletedDescription: "{{name}} został usunięty",
      deletedFailedTitle: "Nie udało się usunąć utworu"
    },
    favorites: {
      title: "Ulubione",
      addedTitle: "Dodano do ulubionych",
      addedDescription: "{{name}} został dodany do ulubionych",
      addedFailedTitle: "Nie udało się dodać do ulubionych",
      removedTitle: "Usunięto z ulubionych",
      removedDescription: "{{name}} został usunięty z ulubionych",
      removedFailedTitle: "Nie udało się usunąć z ulubionych"
    },
    playlists: {
      title: "Playlisty",
      createdTitle: "Playlista utworzona pomyślnie",
      createdDescription: "{{name}} została utworzona",
      createdFailedTitle: "Nie udało się utworzyć playlisty",
      updatedTitle: "Playlista zaktualizowana pomyślnie",
      updatedDescription: "{{name}} została zaktualizowana",
      updatedFailedTitle: "Nie udało się zaktualizować playlisty",
      deletedTitle: "Playlista usunięta pomyślnie",
      deletedDescription: "{{name}} została usunięta",
      deletedFailedTitle: "Nie udało się usunąć playlisty"
    },
    artists: {
      title: "Artyści",
      createdTitle: "Artysta utworzony pomyślnie",
      createdDescription: "{{name}} został utworzony",
      createdFailedTitle: "Nie udało się utworzyć artysty",
      updatedTitle: "Artysta zaktualizowany pomyślnie",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować artysty",
      deletedTitle: "Artysta usunięty pomyślnie",
      deletedDescription: "{{name}} został usunięty",
      deletedFailedTitle: "Nie udało się usunąć artysty"
    },
    settings: {
      title: "Ustawienia",
      theme: {
        title: "Motyw",
        description: "Wybierz preferowany tryb wyświetlania",
        light: "Jasny",
        dark: "Ciemny",
        system: "Systemowy"
      },
      language: {
        title: "Język",
        description: "Wybierz preferowany język"
      },
      sync: {
        title: "Synchronizacja",
        description: "Synchronizuj dane między urządzeniami"
      }
    }
  }
}
