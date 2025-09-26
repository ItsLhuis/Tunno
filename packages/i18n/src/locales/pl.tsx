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
      hoursAgo: "{count} godzina{count, plural, one {} other{y}} temu",
      today: "Dziś",
      yesterday: "Wczoraj",
      goBack: "Wróć",
      goFoward: "Dalej",
      favorite: "Dodaj do ulubionych",
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
      unmute: "Włącz dźwięk",
      queue: "Kolejka",
      title: "Tytuł",
      album: "Album",
      artist: "Artysta",
      date: "Data",
      duration: "Czas trwania",
      search: "Szukaj",
      selectAll: "Zaznacz wszystko",
      clear: "Wyczyść",
      cancel: "Anuluj",
      more: "Więcej",
      select: "Wybierz",
      preview: "Podgląd",
      close: "Zamknij",
      playback: "Odtwarzanie",
      playNext: "Odtwórz następny",
      actions: "Akcje",
      addTo: "Dodaj do",
      playlist: "Lista odtwarzania",
      lyrics: "Tekst",
      openMiniplayer: "Otwórz miniodtwarzacz",
      enterFullScreen: "Przejdź na pełny ekran",
      exitFullScreen: "Wyjdź z pełnego ekranu",
      goToAlbum: "Przejdź do albumu",
      goToArtist: "Przejdź do artysty",
      shuffleAndPlay: "Losuj i odtwarzaj",
      unknown: "Nieznane",
      unknownAlbum: "Nieznany album",
      unknownArtist: "Nieznany artysta"
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
        warning: "Ostrzeżenie",
        lyricsPreview: "Podgląd tekstu"
      },
      labels: {
        name: "Nazwa",
        thumbnail: "Miniatura",
        file: "Plik",
        releaseYear: "Rok wydania",
        album: "Album",
        artists: "Artyści",
        folder: "Folder",
        lyrics: "Tekst"
      },
      buttons: {
        cancel: "Anuluj",
        delete: "Usuń",
        update: "Aktualizuj",
        create: "Utwórz"
      },
      descriptions: {
        thumbnail: "Obraz tła (opcjonalnie)",
        fileSize: "Maksymalny rozmiar: {size}",
        supportedFormats: "Obsługiwane formaty: {formats}",
        lyricsPreview: "Zobacz, jak tekst synchronizuje się z czasem"
      },
      badges: {
        lines: "{count} linia{count, plural, one {} other{e}}",
        duration: "Czas trwania: {time}"
      },
      messages: {
        confirmDelete: "Czy na pewno chcesz usunąć?",
        unsavedChanges: "Są niezapisane zmiany",
        noLyrics: "Brak tekstu"
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
        max: "Plik przekracza maksymalny rozmiar {maxSize}"
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
        invalid: "Nieprawidłowy album"
      },
      artists: {
        invalid: "Nieprawidłowi artyści"
      }
    },
    update: {
      downloading: "Pobieranie i instalowanie aktualizacji",
      downloadingDescription: "Dostępna jest nowa aktualizacja instalowana automatycznie",
      installedSuccess: "Aktualizacja została pomyślnie zainstalowana",
      failed: "Nie udało się zainstalować aktualizacji"
    },
    breadcrumbs: {
      home: {
        title: "Strona główna"
      },
      songs: {
        title: "Utwory"
      },
      playlists: {
        title: "Playlisty"
      },
      albums: {
        title: "Albumy"
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
      createdTitle: "Utwór został pomyślnie utworzony",
      createdDescription: "{name} został utworzony",
      createdFailedTitle: "Nie udało się utworzyć utworu",
      updatedTitle: "Utwór został pomyślnie zaktualizowany",
      updatedDescription: "{name} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować utworu",
      deletedTitle: "Utwór został pomyślnie usunięty",
      deletedDescription: "{name} został usunięty",
      deletedFailedTitle: "Nie udało się usunąć utworu",
      filters: {
        title: "Filtry",
        clear: "Wyczyść aktywne filtry",
        sortBy: "Sortuj według",
        favorites: "Tylko ulubione",
        favoritesDescription: "Pokaż tylko ulubione utwory",
        lyrics: "Z tekstem",
        lyricsDescription: "Pokaż tylko utwory z tekstem",
        releaseYear: "Rok wydania",
        duration: "Czas trwania",
        durationMin: "Minimum",
        durationMax: "Maksimum",
        playCount: "Liczba odtworzeń",
        playCountMin: "Minimum",
        playCountMax: "Maksimum",
        lastPlayed: "Ostatnie odtworzenie",
        lastPlayedAfter: "Po",
        lastPlayedBefore: "Przed",
        selectDate: "Wybierz datę",
        sortOptions: {
          name: "Nazwa",
          duration: "Czas trwania",
          favorites: "Ulubione",
          year: "Rok",
          playCount: "Odtworzenia",
          lastPlayed: "Ostatnie odtworzenie",
          createdAt: "Data utworzenia",
          updatedAt: "Data aktualizacji"
        }
      }
    },
    playlists: {
      title: "Playlisty",
      createdTitle: "Playlista została pomyślnie utworzona",
      createdDescription: "{name} została utworzona",
      createdFailedTitle: "Nie udało się utworzyć playlisty",
      updatedTitle: "Playlista została pomyślnie zaktualizowana",
      updatedDescription: "{name} została zaktualizowana",
      updatedFailedTitle: "Nie udało się zaktualizować playlisty",
      deletedTitle: "Playlista została pomyślnie usunięta",
      deletedDescription: "{name} została usunięta",
      deletedFailedTitle: "Nie udało się usunąć playlisty"
    },
    albums: {
      title: "Albumy",
      createdTitle: "Album został pomyślnie utworzony",
      createdDescription: "{name} został utworzony",
      createdFailedTitle: "Nie udało się utworzyć albumu",
      updatedTitle: "Album został pomyślnie zaktualizowany",
      updatedDescription: "{name} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować albumu",
      deletedTitle: "Album został pomyślnie usunięty",
      deletedDescription: "{name} został usunięty",
      deletedFailedTitle: "Nie udało się usunąć albumu"
    },
    artists: {
      title: "Artyści",
      createdTitle: "Artysta został pomyślnie utworzony",
      createdDescription: "{name} został utworzony",
      createdFailedTitle: "Nie udało się utworzyć artysty",
      updatedTitle: "Artysta został pomyślnie zaktualizowany",
      updatedDescription: "{name} został zaktualizowany",
      updatedFailedTitle: "Nie udało się zaktualizować artysty",
      deletedTitle: "Artysta został pomyślnie usunięty",
      deletedDescription: "{name} został usunięty",
      deletedFailedTitle: "Nie udało się usunąć artysty"
    },
    favorites: {
      createdTitle: "Dodano do ulubionych",
      createdDescription: "{name} został dodany do ulubionych",
      createdFailedTitle: "Nie udało się dodać do ulubionych",
      deletedTitle: "Usunięto z ulubionych",
      deletedDescription: "{name} został usunięty z ulubionych",
      deletedFailedTitle: "Nie udało się usunąć z ulubionych"
    },
    settings: {
      title: "Ustawienia",
      appearance: {
        title: "Wygląd",
        description: "Wybierz preferowany tryb wyglądu",
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
