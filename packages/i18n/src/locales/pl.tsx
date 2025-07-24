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
      hoursAgo: "{{count}} godzinę{{count, plural, one {} few {i} other {}}} temu",
      today: "Dzisiaj",
      yesterday: "Wczoraj",
      goBack: "Wróć",
      goFoward: "Idź dalej",
      favorite: "Ulubione",
      unfavorite: "Usuń z ulubionych",
      enableShuffle: "Włącz losowe odtwarzanie",
      disableShuffle: "Wyłącz losowe odtwarzanie",
      previous: "Poprzedni",
      play: "Odtwórz",
      pause: "Pauza",
      next: "Następny",
      enableRepeat: "Włącz powtarzanie",
      enableRepeatOne: "Włącz powtarzanie jednego",
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
      more: "Więcej"
    },
    form: {
      titles: {
        createSong: "Utwórz utwór",
        updateSong: "Aktualizuj utwór",
        deleteSong: "Usuń utwór",
        createArtist: "Utwórz artystę",
        updateArtist: "Aktualizuj artystę",
        deleteArtist: "Usuń artystę",
        createPlaylist: "Utwórz playlistę",
        updatePlaylist: "Aktualizuj playlistę",
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
        isSingle: "Czy singiel"
      },
      buttons: {
        cancel: "Anuluj",
        delete: "Usuń",
        update: "Aktualizuj",
        create: "Utwórz"
      },
      descriptions: {
        thumbnail: "Obraz tła (opcjonalnie)",
        fileSize: "Maksymalny rozmiar: {{size}}",
        supportedFormats: "Obsługiwane formaty: {{formats}}"
      },
      messages: {
        confirmDelete: "Czy na pewno chcesz usunąć?",
        unsavedChanges: "Istnieją niezapisane zmiany"
      }
    },
    validation: {
      name: {
        required: "Nazwa jest wymagana",
        max: "Nazwa może mieć maksymalnie 200 znaków"
      },
      file: {
        required: "Plik jest wymagany"
      },
      duration: {
        required: "Czas trwania jest wymagany",
        min: "Czas trwania musi być co najmniej 0"
      },
      releaseYear: {
        invalid: "Nieprawidłowy rok wydania",
        min: "Rok wydania musi być co najmniej 0",
        max: "Rok wydania nie może być w przyszłości"
      },
      albumId: {
        invalid: "Nieprawidłowy album",
        requiredIfNotSingle: "Album jest wymagany, jeśli nie jest singlem"
      },
      artists: {
        min: "Wymagana jest co najmniej jedna osoba"
      }
    },
    update: {
      downloading: "Pobieranie i instalacja aktualizacji",
      downloadingDescription: "Dostępna jest nowa aktualizacja i jest instalowana automatycznie",
      installedSuccess: "Aktualizacja została pomyślnie zainstalowana",
      failed: "Nie udało się zainstalować aktualizacji"
    },
    breadcrumbs: {
      home: { title: "Strona główna" },
      songs: { title: "Utwory" },
      favorites: { title: "Ulubione" },
      playlists: { title: "Playlisty" },
      artists: { title: "Artyści" },
      fastUpload: { title: "Szybkie przesyłanie" },
      settings: {
        title: "Ustawienia",
        appearance: { title: "Wygląd" },
        language: { title: "Język" },
        sync: { title: "Synchronizacja" }
      }
    },
    home: { title: "Strona główna" },
    songs: {
      title: "Utwory",
      createdTitle: "Utwór został pomyślnie utworzony",
      createdDescription: "{{name}} został utworzony",
      createdFailedTitle: "Nie udało się utworzyć utworu",
      updatedTitle: "Utwór został pomyślnie zaktualizowany",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować utworu",
      deletedTitle: "Utwór został pomyślnie usunięty",
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
      createdTitle: "Playlista została pomyślnie utworzona",
      createdDescription: "{{name}} została utworzona",
      createdFailedTitle: "Nie udało się utworzyć playlisty",
      updatedTitle: "Playlista została pomyślnie zaktualizowana",
      updatedDescription: "{{name}} została zaktualizowana",
      updatedFailedTitle: "Nie udało się zaktualizować playlisty",
      deletedTitle: "Playlista została pomyślnie usunięta",
      deletedDescription: "{{name}} została usunięta",
      deletedFailedTitle: "Nie udało się usunąć playlisty"
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
        description: "Synchronizuj dane na wszystkich urządzeniach"
      }
    },
    fastUpload: { title: "Szybkie przesyłanie" },
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
      nl: "Niderlandzki",
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
