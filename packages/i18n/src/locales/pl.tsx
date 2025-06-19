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
      hoursAgo: "{{count}} godzin{{count, plural, one {ę} other{y}}} temu",
      today: "Dzisiaj",
      yesterday: "Wczoraj",
      goBack: "Wstecz",
      goFoward: "Dalej",
      favorite: "Ulubione",
      unfavorite: "Usuń z ulubionych",
      enableShuffle: "Włącz losowe odtwarzanie",
      disableShuffle: "Wyłącz losowe odtwarzanie",
      previous: "Poprzedni",
      play: "Odtwórz",
      pause: "Pauza",
      next: "Następny",
      enableRepeat: "Włącz powtarzanie",
      enableRepeatOne: "Powtórz raz",
      disableRepeat: "Wyłącz powtarzanie",
      mute: "Wycisz",
      unmute: "Wyłącz wyciszenie",
      devices: "Urządzenia",
      queue: "Kolejka"
    },
    update: {
      downloading: "Pobieranie i instalowanie aktualizacji",
      downloadingDescription: "Dostępna jest nowa aktualizacja i jest automatycznie instalowana",
      installedSuccess: "Aktualizacja została pomyślnie zainstalowana",
      failed: "Nie udało się zainstalować aktualizacji"
    },
    breadcrumbs: {
      home: {
        title: "Strona główna"
      },
      songs: {
        title: "Piosenki"
      },
      favorites: {
        title: "Ulubione"
      },
      playlists: {
        title: "Listy odtwarzania"
      },
      artists: {
        title: "Artyści"
      },
      fastUpload: {
        title: "Szybkie przesyłanie"
      },
      settings: {
        title: "Ustawienia",
        appearance: {
          title: "Wygląd"
        },
        language: {
          title: "Język"
        },
        sync: {
          title: "Synchronizacja"
        }
      }
    },
    home: { title: "Strona główna" },
    songs: {
      title: "Piosenki",
      createdTitle: "Piosenka została pomyślnie utworzona",
      createdDescription: "{{name}} została utworzona",
      createdFailedTitle: "Nie udało się utworzyć piosenki",
      updatedTitle: "Piosenka została pomyślnie zaktualizowana",
      updatedDescription: "{{name}} została zaktualizowana",
      updatedFailedTitle: "Nie udało się zaktualizować piosenki",
      deletedTitle: "Piosenka została pomyślnie usunięta",
      deletedDescription: "{{name}} została usunięta",
      deletedFailedTitle: "Nie udało się usunąć piosenki"
    },
    favorites: {
      title: "Ulubione",
      addedTitle: "Dodano do ulubionych",
      addedDescription: "{{name}} została dodana do ulubionych",
      addedFailedTitle: "Nie udało się dodać do ulubionych",
      removedTitle: "Usunięto z ulubionych",
      removedDescription: "{{name}} została usunięta z ulubionych",
      removedFailedTitle: "Nie udało się usunąć z ulubionych"
    },
    playlists: {
      title: "Listy odtwarzania",
      createdTitle: "Lista odtwarzania została pomyślnie utworzona",
      createdDescription: "{{name}} została utworzona",
      createdFailedTitle: "Nie udało się utworzyć listy odtwarzania",
      updatedTitle: "Lista odtwarzania została pomyślnie zaktualizowana",
      updatedDescription: "{{name}} została zaktualizowana",
      updatedFailedTitle: "Nie udało się zaktualizować listy odtwarzania",
      deletedTitle: "Lista odtwarzania została pomyślnie usunięta",
      deletedDescription: "{{name}} została usunięta",
      deletedFailedTitle: "Nie udało się usunąć listy odtwarzania"
    },
    artists: {
      title: "Artyści",
      createdTitle: "Artysta został pomyślnie utworzony",
      createdDescription: "{{name}} został utworzony",
      createdFailedTitle: "Nie udało się utworzyć artysty",
      updatedTitle: "Artysta został pomyślnie zaktualizowany",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować artysty",
      deletedTitle: "Artysta został pomyślnie usunięty",
      deletedDescription: "{{name}} został usunięty",
      deletedFailedTitle: "Nie udało się usunąć artysty"
    },
    settings: {
      title: "Ustawienia",
      appearance: {
        title: "Wygląd",
        description: "Wybierz preferowany tryb wyglądu",
        light: "Jasny",
        dark: "Ciemny",
        system: "System"
      },
      language: {
        title: "Język",
        description: "Wybierz preferowany język"
      },
      sync: {
        title: "Synchronizacja",
        description: "Synchronizuj dane między urządzeniami"
      }
    },
    fastUpload: {
      title: "Szybkie przesyłanie"
    },
    languages: {
      da: "Duński",
      de: "Niemiecki",
      en: "Angielski",
      es: "Hiszpański",
      fi: "Fiński",
      fr: "Francuski",
      hi: "Hindi",
      it: "Włoski",
      ja: "Japoński",
      ko: "Koreański",
      nl: "Holenderski",
      no: "Norweski",
      pl: "Polski",
      pt: "Portugalski",
      ru: "Rosyjski",
      sv: "Szwedzki",
      tr: "Turecki",
      uk: "Ukraiński",
      vi: "Wietnamski",
      zh: "Chiński"
    }
  }
}
