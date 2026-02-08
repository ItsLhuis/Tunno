import Pl from "../assets/pl.svg"

import { type Language } from "../types"

/**
 * Polish language configuration.
 */
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
      thisWeek: "W tym tygodniu",
      thisMonth: "W tym miesiącu",
      yesterday: "Wczoraj",
      years: "{count} rok{count, plural, one {} other{ów}}",
      weeks: "{count} tydzień{count, plural, one {} other{ni}}",
      days: "{count} dzień{count, plural, one {} other{ni}}",
      hours: "{count} godzina{count, plural, one {} other{y}}",
      minutes: "{count} minuta{count, plural, one {} other{y}}",
      seconds: "{count} sekunda{count, plural, one {} other{y}}",
      goBack: "Wróć",
      goForward: "Dalej",
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
      added: "Dodano",
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
      removeFromQueue: "Usuń z kolejki",
      removeFromPlaylist: "Usuń z listy odtwarzania",
      nowPlaying: "Teraz odtwarzane",
      noSongPlaying: "Nic nie odtwarzane",
      upNext: "Następne",
      actions: "Akcje",
      addTo: "Dodaj do",
      playlist: "Playlist",
      song: "Piosenka",
      lyrics: "Tekst",
      openMiniplayer: "Otwórz miniodtwarzacz",
      enterFullScreen: "Przejdź na pełny ekran",
      exitFullScreen: "Wyjdź z pełnego ekranu",
      goToSong: "Przejdź do piosenki",
      goToAlbum: "Przejdź do albumu",
      goToPlaylist: "Przejdź do playlist",
      goToArtist: "Przejdź do artysty",
      shuffleAndPlay: "Losuj i odtwarzaj",
      unknown: "Nieznane",
      unknownAlbum: "Nieznany album",
      unknownArtist: "Nieznany artysta",
      listenTime: "Czas słuchania",
      averageListenTime: "Średni czas słuchania",
      retentionRate: "Wskaźnik retencji",
      totalPlays: "Łączna liczba odtworzeń",
      lastPlayed: "Ostatnio odtwarzane",
      neverPlayed: "Nigdy nie odtwarzane",
      streak: "Seria",
      refresh: "Odśwież",
      showingOfTotal: "Wyświetlanie {showing} z {total}",
      start: "Rozpocznij",
      completed: "Zakończono",
      songsPlayed: "{count} utwór{count, plural, one {} other{ów}}",
      appearsIn: "Występuje w",
      addToSidebar: "Dodaj do paska bocznego",
      removeFromSidebar: "Usuń z paska bocznego",
      featured: "Wyróżnione",
      stats: "Statystyki",
      openToStart: "Otwórz Tunno, aby rozpocząć"
    },
    form: {
      titles: {
        createSong: "Utwórz utwór",
        updateSong: "Aktualizuj utwór",
        deleteSong: "Usuń utwór",
        createArtist: "Utwórz artystę",
        updateArtist: "Aktualizuj artystę",
        deleteArtist: "Usuń artystę",
        createAlbum: "Utwórz album",
        updateAlbum: "Aktualizuj album",
        deleteAlbum: "Usuń album",
        createPlaylist: "Utwórz playlist",
        updatePlaylist: "Aktualizuj playlist",
        deletePlaylist: "Usuń playlist",
        addToPlaylist: "Dodaj do playlist",
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
        albumType: "Typ albumu",
        artists: "Artyści",
        folder: "Folder",
        lyrics: "Tekst"
      },
      buttons: {
        cancel: "Anuluj",
        delete: "Usuń",
        update: "Aktualizuj",
        create: "Utwórz",
        add: "Dodaj"
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
      },
      albumType: {
        invalid: "Nieprawidłowy typ albumu"
      },
      playlistIds: {
        invalid: "Nieprawidłowe listy odtwarzania"
      },
      album: {
        duplicate: "Album o tej nazwie już istnieje",
        integrity:
          "Nie można usunąć artysty z albumu, ponieważ są utwory, które należą zarówno do tego albumu, jak i do tego artysty"
      },
      artist: {
        duplicate: "Artysta o tej nazwie już istnieje",
        integrity:
          "Nie można usunąć artysty, ponieważ są utwory, które należą zarówno do tego artysty, jak i do albumów, które również zawierają tego artystę"
      },
      playlist: {
        duplicate: "Lista odtwarzania o tej nazwie już istnieje"
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
        title: "Playlists"
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
        equalizer: {
          title: "Korektor"
        },
        sync: {
          title: "Synchronizacja"
        },
        about: {
          title: "O aplikacji"
        }
      },
      lyrics: {
        title: "Tekst"
      }
    },
    home: {
      title: "Strona główna",
      jumpBackIn: {
        title: "Kontynuuj",
        description: "Kontynuuj tam gdzie skończyłeś"
      },
      newReleases: {
        title: "Nowe wydania",
        description: "Nowe dodatki do twojej kolekcji"
      },
      onRepeat: {
        title: "Na powtórce",
        description: "Utwory których nie możesz przestać słuchać"
      },
      discover: {
        title: "Odkryj",
        description: "Nowe rekomendacje muzyczne dla ciebie"
      },
      favoriteArtists: {
        title: "Twoi artyści",
        description: "Artyści których kochasz najbardziej"
      },
      yourPlaylists: {
        title: "Stworzone dla ciebie",
        description: "Twoje osobiste playlisty"
      },
      topAlbums: {
        title: "Najlepsze albumy",
        description: "Twoje najczęściej odtwarzane albumy"
      },
      recentlyAdded: {
        title: "Ostatnio dodane",
        description: "Nowe dodatki do twojej biblioteki"
      },
      empty: {
        title: "Twoja biblioteka jest pusta",
        description:
          "Witaj w Tunno. Aby rozpocząć, musisz dodać muzykę do swojej osobistej biblioteki.",
        getStarted: "Rozpocznij",
        songs: {
          title: "Importuj utwory",
          description:
            "Dodaj pliki muzyczne z urządzenia, aby rozpocząć budowanie swojej biblioteki"
        },
        albums: {
          title: "Twórz albumy",
          description: "Organizuj swoją muzykę, tworząc albumy z grafiką i szczegółami"
        },
        playlists: {
          title: "Twórz playlisty",
          description: "Twórz własne miksy na każdy nastrój lub aktywność"
        },
        artists: {
          title: "Dodaj artystów",
          description: "Twórz profile artystów, aby organizować i zarządzać ich muzyką"
        }
      }
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
      title: "Playlists",
      createdTitle: "Playlista została pomyślnie utworzona",
      createdDescription: "{name} została utworzona",
      createdFailedTitle: "Nie udało się utworzyć playlisty",
      updatedTitle: "Playlista została pomyślnie zaktualizowana",
      updatedDescription: "{name} została zaktualizowana",
      updatedFailedTitle: "Nie udało się zaktualizować playlisty",
      songsAddedTitle: "Utwory dodane pomyślnie",
      songsAddedFailedTitle: "Nie udało się dodać utworów",
      deletedTitle: "Playlista została pomyślnie usunięta",
      deletedDescription: "{name} została usunięta",
      deletedFailedTitle: "Nie udało się usunąć playlisty",
      filters: {
        title: "Filtry",
        clear: "Wyczyść aktywne filtry",
        sortBy: "Sortuj według",
        favorites: "Tylko ulubione",
        favoritesDescription: "Pokaż tylko ulubione playlists",
        playCount: "Liczba odtworzeń",
        playCountMin: "Minimalna liczba odtworzeń",
        playCountMax: "Maksymalna liczba odtworzeń",
        totalTracks: "Całkowita liczba utworów",
        totalTracksMin: "Minimalna liczba utworów",
        totalTracksMax: "Maksymalna liczba utworów",
        totalDuration: "Całkowity czas trwania",
        totalDurationMin: "Minimalny czas trwania",
        totalDurationMax: "Maksymalny czas trwania",
        lastPlayed: "Ostatnie odtworzenie",
        lastPlayedAfter: "Po",
        lastPlayedBefore: "Przed",
        selectDate: "Wybierz datę",
        sortOptions: {
          name: "Nazwa",
          favorites: "Ulubione",
          playCount: "Liczba odtworzeń",
          totalTracks: "Całkowita liczba utworów",
          totalDuration: "Całkowity czas trwania",
          lastPlayed: "Ostatnie odtworzenie",
          createdAt: "Data utworzenia",
          updatedAt: "Data aktualizacji"
        }
      }
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
      deletedFailedTitle: "Nie udało się usunąć albumu",
      filters: {
        title: "Filtry",
        clear: "Wyczyść aktywne filtry",
        sortBy: "Sortuj według",
        favorites: "Tylko ulubione",
        favoritesDescription: "Pokaż tylko ulubione albumy",
        albumType: "Typ albumu",
        all: "Wszystkie typy",
        single: "Singiel",
        album: "Album",
        compilation: "Kompilacja",
        releaseYear: "Rok wydania",
        releaseYearMin: "Minimalny rok",
        releaseYearMax: "Maksymalny rok",
        playCount: "Liczba odtworzeń",
        playCountMin: "Minimalna liczba odtworzeń",
        playCountMax: "Maksymalna liczba odtworzeń",
        totalTracks: "Całkowita liczba utworów",
        totalTracksMin: "Minimalna liczba utworów",
        totalTracksMax: "Maksymalna liczba utworów",
        totalDuration: "Całkowity czas trwania",
        totalDurationMin: "Minimalny czas trwania",
        totalDurationMax: "Maksymalny czas trwania",
        lastPlayed: "Ostatnio odtwarzane",
        lastPlayedAfter: "Odtwarzane po",
        lastPlayedBefore: "Odtwarzane przed",
        selectDate: "Wybierz datę",
        sortOptions: {
          name: "Nazwa",
          releaseYear: "Rok wydania",
          favorites: "Ulubione",
          playCount: "Liczba odtworzeń",
          totalTracks: "Całkowita liczba utworów",
          totalDuration: "Całkowity czas trwania",
          lastPlayed: "Ostatnio odtwarzane",
          createdAt: "Utworzono",
          updatedAt: "Zaktualizowano"
        }
      }
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
      deletedFailedTitle: "Nie udało się usunąć artysty",
      filters: {
        title: "Filtry",
        clear: "Wyczyść aktywne filtry",
        sortBy: "Sortuj według",
        favorites: "Tylko ulubione",
        favoritesDescription: "Pokaż tylko ulubionych artystów",
        playCount: "Liczba odtworzeń",
        playCountMin: "Minimum",
        playCountMax: "Maksimum",
        totalTracks: "Całkowita liczba piosenek",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maksimum",
        totalDuration: "Całkowity czas trwania",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maksimum",
        lastPlayed: "Ostatnio odtwarzane",
        lastPlayedAfter: "Po",
        lastPlayedBefore: "Przed",
        selectDate: "Wybierz datę",
        sortOptions: {
          name: "Nazwa",
          favorites: "Ulubione",
          playCount: "Liczba odtworzeń",
          totalTracks: "Całkowita liczba piosenek",
          totalDuration: "Całkowity czas trwania",
          lastPlayed: "Ostatnio odtwarzane",
          createdAt: "Data utworzenia",
          updatedAt: "Data aktualizacji"
        }
      }
    },
    favorites: {
      createdTitle: "Dodano do ulubionych",
      createdDescription: "{name} został dodany do ulubionych",
      createdFailedTitle: "Nie udało się dodać do ulubionych",
      deletedTitle: "Usunięto z ulubionych",
      deletedDescription: "{name} został usunięty z ulubionych",
      deletedFailedTitle: "Nie udało się usunąć z ulubionych"
    },
    sidebar: {
      addedTitle: "Dodano do paska bocznego",
      addedDescription: "{name} został dodany do paska bocznego",
      addedFailedTitle: "Nie udało się dodać do paska bocznego",
      removedTitle: "Usunięto z paska bocznego",
      removedDescription: "{name} został usunięty z paska bocznego"
    },
    settings: {
      title: "Ustawienia",
      appearance: {
        title: "Wygląd",
        description: "Zdefiniuj preferencje wyglądu aplikacji.",
        theme: {
          title: "Motyw",
          description: "Wybierz motyw aplikacji",
          light: "Jasny",
          dark: "Ciemny",
          system: "Systemowy"
        },
        zoom: {
          title: "Powiększenie",
          description: "Dostosuj poziom powiększenia aplikacji"
        }
      },
      language: {
        title: "Język",
        description: "Wybierz preferowany język"
      },
      equalizer: {
        title: "Korektor",
        enable: {
          title: "Włącz korektor",
          description: "Włącz lub wyłącz korektor audio",
          enabled: "Włączony",
          disabled: "Wyłączony"
        },
        presets: {
          title: "Predefiniowane korektory",
          description: "Wybierz z predefiniowanych ustawień korektora",
          flat: {
            label: "Płaski",
            description: "Brak regulacji"
          },
          rock: {
            label: "Rock",
            description: "Wzmocnione basy i wysokie tony"
          },
          pop: {
            label: "Pop",
            description: "Zbalansowany z lekkim wzmocnieniem"
          },
          jazz: {
            label: "Jazz",
            description: "Delikatne podkreślenie średnich częstotliwości"
          },
          classical: {
            label: "Klasyczny",
            description: "Naturalny dźwięk"
          },
          electronic: {
            label: "Elektroniczny",
            description: "Ciężkie basy i ostre wysokie tony"
          },
          vocal: {
            label: "Wokalny",
            description: "Wzmocnienie średnich częstotliwości dla przejrzystości"
          },
          bass: {
            label: "Basy",
            description: "Silne podkreślenie niskich częstotliwości"
          },
          treble: {
            label: "Wysokie tony",
            description: "Podkreślenie wysokich częstotliwości"
          }
        },
        bands: {
          title: "Pasma częstotliwości",
          description: "Reguluj poszczególne pasma częstotliwości"
        },
        reset: {
          title: "Resetuj korektor",
          description: "Resetuj wszystkie pasma do płaskiego (0 dB)",
          button: "Resetuj do płaskiego"
        }
      },
      sync: {
        title: "Synchronizacja",
        description: "Synchronizuj dane między urządzeniami",
        export: {
          title: "Eksportuj bibliotekę",
          description:
            "Wyeksportuj swoją bibliotekę jako plik pakietu do kopii zapasowej lub do użycia na innym urządzeniu",
          selectDestination: "Wybierz miejsce docelowe",
          exportingSongs: "Eksportowanie {count} utwor{count, plural, one {u} few {ów} other {ów}}",
          preparingExport: "Przygotowywanie eksportu",
          exportingMessage: "To może chwilę potrwać",
          exportSuccess: "Biblioteka wyeksportowana pomyślnie",
          showFolder: "Pokaż folder",
          exportAgain: "Eksportuj ponownie",
          exportFailed: "Eksport nie powiódł się",
          tryAgain: "Spróbuj ponownie",
          noSongs: "Brak utworów do eksportu",
          libraryEmpty: "Twoja biblioteka jest pusta",
          noValidSongs: "Brak prawidłowych utworów do eksportu",
          missingAlbumInfo: "Wszystkie utwory nie mają informacji o albumie",
          songsExported:
            "{count} utwór{count, plural, one {} few{y} other{ów}} wyeksportowano do pakietu"
        },
        mobile: {
          title: "Synchronizuj z mobilnym",
          description: "Przenieś swoją bibliotekę do Tunno Mobile za pośrednictwem sieci lokalnej",
          generateQr: "Generuj kod QR",
          stopServer: "Zatrzymaj serwer",
          waitingConnection: "Oczekiwanie na połączenie urządzenia mobilnego",
          deviceConnected: "Urządzenie połączone",
          syncInProgress: "Synchronizacja w toku",
          syncCompleted: "Synchronizacja ukończona",
          serverError: "Nie udało się uruchomić serwera synchronizacji",
          scanQr: "Skanuj kod QR",
          scanQrDescription:
            "Zeskanuj kod QR na pulpicie, aby zsynchronizować bibliotekę muzyczną przez WiFi",
          connecting: "Łączenie",
          comparing: "Porównywanie bibliotek",
          syncing: "Synchronizacja",
          finalizing: "Finalizowanie",
          completed: "Synchronizacja zakończona",
          completedDescription: "Twoja biblioteka muzyczna została pomyślnie zsynchronizowana",
          alreadySynced: "Już zsynchronizowano",
          failed: "Synchronizacja nie powiodła się",
          retry: "Ponów",
          cancel: "Anuluj",
          done: "Gotowe",
          itemsSynced: "{synced} / {total} elementów",
          batchProgress: "Partia {current} / {total}",
          cameraPermissionTitle: "Wymagany dostęp do kamery",
          cameraPermissionDescription:
            "Przyznaj uprawnienia do kamery, aby zeskanować kod QR wyświetlany na pulpicie",
          grantPermission: "Przyznaj uprawnienia",
          cameraLoading: "Ładowanie kamery",
          scanInstruction: "Skieruj kamerę na kod QR na pulpicie",
          connectionFailed: "Nie udało się połączyć z serwerem na pulpicie",
          insufficientStorage: "Niewystarczająca ilość miejsca",
          insufficientStorageDescription:
            "Za mało wolnego miejsca do synchronizacji. Potrzeba {required}, ale dostępne jest tylko {available}",
          syncInterrupted: "Synchronizacja została przerwana, ponieważ aplikacja przeszła w tło",
          downloadingItem: 'Pobieranie "{name}"',
          fetchingBatch: "Pobieranie metadanych partii {batch}",
          updatingStats: "Aktualizowanie statystyk",
          syncComplete: "Synchronizacja zakończona",
          comparingLibraries: "Porównywanie bibliotek",
          connectingToDesktop: "Łączenie z pulpitem"
        }
      },
      about: {
        title: "O aplikacji",
        description: "Informacje o aplikacji i szczegóły wersji",
        version: "Wersja",
        whatsNew: {
          title: "Co Nowego",
          description: "Sprawdź najnowsze funkcje i ulepszenia",
          newRelease: "Nowa wersja",
          viewChangelog: "Zobacz changelog"
        },
        storage: {
          title: "Pamięć i dane",
          description: "Zarządzaj danymi aplikacji i ustawieniami",
          openDataFolder: "Otwórz folder danych"
        },
        legal: {
          title: "Prawne i prawa autorskie",
          description: "Informacje o licencji i dokumenty prawne",
          copyright: "Prawa autorskie",
          licensed: "Na licencji MIT",
          viewLicense: "Zobacz licencję",
          viewOnGitHub: "Zobacz na GitHubie"
        }
      }
    },
    fastUpload: {
      title: "Szybkie przesyłanie",
      description: "Importuj pakiety z CLI lub wyeksportowane z",
      cliTooltip: "Otwórz dokumentację Tunno CLI",
      selectBundle: "Wybierz pakiet",
      changeBundle: "Zmień pakiet",
      status: {
        pending: "Oczekuje",
        processing: "Przetwarzanie",
        success: "Sukces",
        error: "Błąd",
        skipped: "Pominięto"
      },
      completed: {
        allSuccess: {
          title: "Import zakończony",
          description:
            "{count} utwór{count, plural, one {} other{s}} zaimportowany{count, plural, one {} other{s}} pomyślnie"
        },
        withErrors: {
          title: "Import zakończony z błędami",
          description:
            "{successCount} zaimportowano, {errorCount} nie powiodło się, {skippedCount} pominięto"
        },
        withSkipped: {
          title: "Import zakończony",
          description: "{successCount} zaimportowano, {skippedCount} pominięto"
        }
      }
    },
    lyrics: {
      title: "Tekst"
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
