import Pl from "../assets/pl.svg"

import { type Language } from "../types"

export const polish: Language = {
  code: "pl",
  name: "Polish",
  flag: Pl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nie znaleziono wyników",
      lessThanAnHourAgo: "Mniej niż godzinę temu",
      hoursAgo: "{{count}} godzin{{count, plural, one {ę} few {y} many {} other {}}} temu",
      today: "Dzisiaj",
      yesterday: "Wczoraj",
      goBack: "Wróć",
      goFoward: "Dalej",
      favorite: "Ulubione",
      unfavorite: "Usuń z ulubionych",
      enableShuffle: "Włącz losowe",
      disableShuffle: "Wyłącz losowe",
      previous: "Poprzedni",
      play: "Odtwórz",
      pause: "Pauza",
      next: "Następny",
      enableRepeat: "Włącz powtarzanie",
      enableRepeatOne: "Powtórz jeden",
      disableRepeat: "Wyłącz powtarzanie",
      mute: "Wycisz",
      unmute: "Wyłącz wyciszenie",
      queue: "Kolejka",
      title: "Tytuł",
      album: "Album",
      date: "Data",
      duration: "Czas trwania",
      search: "Szukaj",
      selectAll: "Zaznacz wszystko",
      visibility: "Widoczność",
      columns: "Kolumny",
      clear: "Wyczyść",
      cancel: "Anuluj",
      more: "Więcej",
      select: "Wybierz"
    },
    form: {
      titles: {
        createSong: "Utwórz utwór",
        updateSong: "Zaktualizuj utwór",
        deleteSong: "Usuń utwór",
        createArtist: "Utwórz artystę",
        updateArtist: "Zaktualizuj artystę",
        deleteArtist: "Usuń artystę",
        createPlaylist: "Utwórz playlistę",
        updatePlaylist: "Zaktualizuj playlistę",
        deletePlaylist: "Usuń playlistę",
        confirmation: "Potwierdzenie",
        warning: "Ostrzeżenie"
      },
      labels: {
        name: "Nazwa",
        thumbnail: "Miniatura",
        file: "Plik",
        releaseYear: "Rok wydania",
        album: "Album",
        artists: "Artyści",
        isSingle: "To singiel",
        folder: "Folder"
      },
      buttons: {
        cancel: "Anuluj",
        delete: "Usuń",
        update: "Zaktualizuj",
        create: "Utwórz"
      },
      descriptions: {
        thumbnail: "Obraz tła (opcjonalnie)",
        fileSize: "Maksymalny rozmiar: {{size}}",
        supportedFormats: "Obsługiwane formaty: {{formats}}"
      },
      messages: {
        confirmDelete: "Czy na pewno chcesz usunąć?",
        unsavedChanges: "Są niezapisane zmiany"
      }
    },
    validation: {
      name: {
        required: "Nazwa jest wymagana",
        max: "Nazwa może mieć maksymalnie 200 znaków"
      },
      file: {
        required: "Plik jest wymagany",
        invalid: "Nieprawidłowy lub uszkodzony plik",
        max: "Plik przekracza maksymalny rozmiar {{maxSize}}"
      },
      duration: {
        required: "Czas trwania jest wymagany",
        min: "Czas trwania musi być większy niż 0"
      },
      releaseYear: {
        invalid: "Nieprawidłowy rok wydania",
        min: "Rok wydania musi być większy niż 0",
        max: "Rok wydania nie może być w przyszłości"
      },
      albumId: {
        invalid: "Nieprawidłowy album",
        requiredIfNotSingle: "Album jest wymagany, jeśli to nie singiel"
      },
      artists: {
        min: "Wymagany jest co najmniej jeden artysta"
      }
    },
    update: {
      downloading: "Pobieranie i instalacja aktualizacji",
      downloadingDescription: "Dostępna jest nowa aktualizacja, instalacja trwa automatycznie",
      installedSuccess: "Aktualizacja zainstalowana",
      failed: "Nie udało się zainstalować aktualizacji"
    },
    breadcrumbs: {
      home: {
        title: "Strona główna"
      },
      songs: {
        title: "Utwory"
      },
      favorites: {
        title: "Ulubione"
      },
      playlists: {
        title: "Playlisty"
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
    home: {
      title: "Strona główna"
    },
    songs: {
      title: "Utwory",
      createdTitle: "Utwór dodany",
      createdDescription: "{{name}} został dodany",
      createdFailedTitle: "Nie udało się dodać utworu",
      updatedTitle: "Utwór zaktualizowany",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować utworu",
      deletedTitle: "Utwór usunięty",
      deletedDescription: "{{name}} został usunięty",
      deletedFailedTitle: "Nie udało się usunąć utworu"
    },
    favorites: {
      title: "Ulubione",
      createdTitle: "Dodano do ulubionych",
      createdDescription: "{{name}} został dodany do ulubionych",
      createdFailedTitle: "Nie udało się dodać do ulubionych",
      deletedTitle: "Usunięto z ulubionych",
      deletedDescription: "{{name}} został usunięty z ulubionych",
      deletedFailedTitle: "Nie udało się usunąć z ulubionych"
    },
    playlists: {
      title: "Playlisty",
      createdTitle: "Playlist utworzony",
      createdDescription: "{{name}} został utworzony",
      createdFailedTitle: "Nie udało się utworzyć playlisty",
      updatedTitle: "Playlist zaktualizowany",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować playlisty",
      deletedTitle: "Playlist usunięty",
      deletedDescription: "{{name}} został usunięty",
      deletedFailedTitle: "Nie udało się usunąć playlisty"
    },
    artists: {
      title: "Artyści",
      createdTitle: "Artysta dodany",
      createdDescription: "{{name}} został dodany",
      createdFailedTitle: "Nie udało się dodać artysty",
      updatedTitle: "Artysta zaktualizowany",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować artysty",
      deletedTitle: "Artysta usunięty",
      deletedDescription: "{{name}} został usunięty",
      deletedFailedTitle: "Nie udało się usunąć artysty"
    },
    settings: {
      title: "Ustawienia",
      appearance: {
        title: "Wygląd",
        description: "Wybierz preferowany motyw",
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
