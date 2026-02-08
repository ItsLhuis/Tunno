import Uk from "../assets/uk.svg"

import { type Language } from "../types"

/**
 * Ukrainian language configuration.
 */
export const ukrainian: Language = {
  code: "uk",
  name: "Українська",
  flag: Uk,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Результатів не знайдено",
      lessThanAnHourAgo: "Менше години тому",
      hoursAgo: "{count} година{count, plural, one {} other{и}} тому",
      today: "Сьогодні",
      thisWeek: "Цього тижня",
      thisMonth: "Цього місяця",
      yesterday: "Вчора",
      years: "{count} рік{count, plural, one {} other{и}}",
      weeks: "{count} тиждень{count, plural, one {} other{і}}",
      days: "{count} день{count, plural, one {} other{і}}",
      hours: "{count} година{count, plural, one {} other{и}}",
      minutes: "{count} хвилина{count, plural, one {} other{и}}",
      seconds: "{count} секунда{count, plural, one {} other{и}}",
      goBack: "Повернутися назад",
      goForward: "Пройти вперед",
      favorite: "Додати до улюблених",
      unfavorite: "Видалити з вибраного",
      enableShuffle: "Увімкнути випадковий порядок",
      disableShuffle: "Вимкнути випадковий порядок",
      previous: "Попередній",
      play: "Відтворити",
      pause: "Пауза",
      next: "Наступний",
      enableRepeat: "Увімкнути повтор",
      enableRepeatOne: "Увімкнути повтор однієї",
      disableRepeat: "Вимкнути повтор",
      mute: "Вимкнути звук",
      unmute: "Увімкнути звук",
      queue: "Черга",
      title: "Назва",
      album: "Альбом",
      artist: "Артист",
      date: "Дата",
      added: "Додано",
      duration: "Тривалість",
      search: "Пошук",
      selectAll: "Вибрати все",
      clear: "Очистити",
      cancel: "Скасувати",
      more: "Більше",
      select: "Вибрати",
      preview: "Попередній перегляд",
      close: "Закрити",
      playback: "Відтворення",
      playNext: "Відтворити наступний",
      removeFromQueue: "Видалити з черги",
      removeFromPlaylist: "Видалити з плейлисту",
      nowPlaying: "Зараз відтворюється",
      noSongPlaying: "Нічого не відтворюється",
      upNext: "Далі",
      actions: "Дії",
      addTo: "Додати до",
      playlist: "Плейлист",
      song: "Пісня",
      lyrics: "Текст",
      openMiniplayer: "Відкрити міні-плеєр",
      enterFullScreen: "Увійти в повний екран",
      exitFullScreen: "Вийти з повного екрану",
      goToSong: "Перейти до пісні",
      goToAlbum: "Перейти до альбому",
      goToPlaylist: "Перейти до плейлисту",
      goToArtist: "Перейти до виконавця",
      shuffleAndPlay: "Перемішати та відтворити",
      unknown: "Невідомо",
      unknownAlbum: "Невідомий альбом",
      unknownArtist: "Невідомий виконавець",
      listenTime: "Час прослуховування",
      averageListenTime: "Середній час прослуховування",
      retentionRate: "Коефіцієнт утримання",
      totalPlays: "Загальна кількість відтворень",
      lastPlayed: "Останнє відтворення",
      neverPlayed: "Ніколи не відтворювалося",
      streak: "Серія",
      refresh: "Оновити",
      showingOfTotal: "Показано {showing} з {total}",
      start: "Почати",
      completed: "Завершено",
      songsPlayed: "{count} пісень{count, plural, one {} other{}}",
      appearsIn: "Присутня в",
      addToSidebar: "Додати до бічної панелі",
      removeFromSidebar: "Видалити з бічної панелі",
      featured: "Рекомендовані",
      stats: "Статистика",
      openToStart: "Відкрити Tunno для початку"
    },
    form: {
      titles: {
        createSong: "Створити пісню",
        updateSong: "Оновити пісню",
        deleteSong: "Видалити пісню",
        createArtist: "Створити виконавця",
        updateArtist: "Оновити виконавця",
        deleteArtist: "Видалити виконавця",
        createAlbum: "Створити альбом",
        updateAlbum: "Оновити альбом",
        deleteAlbum: "Видалити альбом",
        createPlaylist: "Створити плейлист",
        updatePlaylist: "Оновити плейлист",
        deletePlaylist: "Видалити плейлист",
        addToPlaylist: "Додати до плейлисту",
        confirmation: "Підтвердження",
        warning: "Попередження",
        lyricsPreview: "Попередній перегляд тексту"
      },
      labels: {
        name: "Ім'я",
        thumbnail: "Мініатюра",
        file: "Файл",
        releaseYear: "Рік випуску",
        album: "Альбом",
        albumType: "Тип альбому",
        artists: "Виконавці",
        folder: "Папка",
        lyrics: "Текст пісні"
      },
      buttons: {
        cancel: "Скасувати",
        delete: "Видалити",
        update: "Оновити",
        create: "Створити",
        add: "Додати"
      },
      descriptions: {
        thumbnail: "Фонове зображення (необов’язково)",
        fileSize: "Максимальний розмір: {size}",
        supportedFormats: "Підтримувані формати: {formats}",
        lyricsPreview: "Перегляньте, як текст синхронізовано з часом"
      },
      badges: {
        lines: "{count} рядок{count, plural, one {} other{ів}}",
        duration: "Тривалість: {time}"
      },
      messages: {
        confirmDelete: "Ви впевнені, що хочете видалити?",
        unsavedChanges: "Є незбережені зміни",
        noLyrics: "Немає тексту пісні"
      }
    },
    validation: {
      name: {
        required: "Ім'я є обов’язковим",
        max: "Ім'я має містити не більше 200 символів"
      },
      file: {
        required: "Файл є обов’язковим",
        invalid: "Невірний або пошкоджений файл",
        max: "Файл перевищує максимальний розмір {maxSize}"
      },
      duration: {
        required: "Тривалість є обов’язковою",
        min: "Тривалість має бути не меншою за 0"
      },
      releaseYear: {
        invalid: "Невірний рік випуску",
        min: "Рік випуску має бути не меншим за 0",
        max: "Рік випуску не може бути в майбутньому"
      },
      albumId: {
        invalid: "Невірний альбом"
      },
      artists: {
        invalid: "Недійсні виконавці"
      },
      albumType: {
        invalid: "Недійсний тип альбому"
      },
      playlistIds: {
        invalid: "Недійсні плейлисти"
      },
      album: {
        duplicate: "Альбом з такою назвою вже існує",
        integrity:
          "Неможливо видалити виконавця з альбому, оскільки є пісні, які належать і цьому альбому, і цьому виконавцю"
      },
      artist: {
        duplicate: "Виконавець з таким ім'ям вже існує",
        integrity:
          "Неможливо видалити виконавця, оскільки є пісні, які належать і цьому виконавцю, і альбомам, які також включають цього виконавця"
      },
      playlist: {
        duplicate: "Плейлист з такою назвою вже існує"
      }
    },
    update: {
      downloading: "Завантаження та встановлення оновлення",
      downloadingDescription: "Доступне нове оновлення, яке встановлюється автоматично",
      installedSuccess: "Оновлення успішно встановлено",
      failed: "Не вдалося встановити оновлення"
    },
    breadcrumbs: {
      home: {
        title: "Головна"
      },
      songs: {
        title: "Пісні"
      },
      playlists: {
        title: "Плейлисти"
      },
      albums: {
        title: "Альбоми"
      },
      artists: {
        title: "Виконавці"
      },
      fastUpload: {
        title: "Швидке завантаження"
      },
      settings: {
        title: "Налаштування",
        appearance: {
          title: "Вигляд"
        },
        language: {
          title: "Мова"
        },
        equalizer: {
          title: "Еквалайзер"
        },
        sync: {
          title: "Синхронізація"
        },
        about: {
          title: "Про програму"
        }
      },
      lyrics: {
        title: "Текст"
      }
    },
    home: {
      title: "Головна",
      jumpBackIn: {
        title: "Продовжити",
        description: "Продовжіть з того місця, де зупинилися"
      },
      newReleases: {
        title: "Нові релізи",
        description: "Нові додавання до вашої колекції"
      },
      onRepeat: {
        title: "На повторі",
        description: "Пісні, які ви не можете перестати слухати"
      },
      discover: {
        title: "Відкрити",
        description: "Нові музичні рекомендації для вас"
      },
      favoriteArtists: {
        title: "Ваші виконавці",
        description: "Виконавці, яких ви любите найбільше"
      },
      yourPlaylists: {
        title: "Створено для вас",
        description: "Ваші персональні плейлисти"
      },
      topAlbums: {
        title: "Популярні альбоми",
        description: "Ваші найбільш відтворювані альбоми"
      },
      recentlyAdded: {
        title: "Нещодавно додані",
        description: "Нові додавання до вашої бібліотеки"
      },
      empty: {
        title: "Ваша бібліотека порожня",
        description:
          "Ласкаво просимо до Tunno. Щоб розпочати, вам потрібно додати музику до своєї особистої бібліотеки.",
        getStarted: "Почати",
        songs: {
          title: "Імпортувати пісні",
          description:
            "Додайте музичні файли зі свого пристрою, щоб почати створювати свою бібліотеку"
        },
        albums: {
          title: "Створити альбоми",
          description: "Упорядкуйте свою музику, створюючи альбоми з обкладинками та деталями"
        },
        playlists: {
          title: "Створити список відтворення",
          description: "Створюйте власні мікси для будь-якого настрою чи діяльності"
        },
        artists: {
          title: "Додати виконавців",
          description: "Створюйте профілі виконавців для організації та керування їхньою музикою"
        }
      }
    },
    songs: {
      title: "Пісні",
      createdTitle: "Пісня успішно створена",
      createdDescription: "{name} створено",
      createdFailedTitle: "Не вдалося створити пісню",
      updatedTitle: "Пісня успішно оновлена",
      updatedDescription: "{name} оновлено",
      updatedFailedTitle: "Не вдалося оновити пісню",
      deletedTitle: "Пісня успішно видалена",
      deletedDescription: "{name} видалено",
      deletedFailedTitle: "Не вдалося видалити пісню",
      filters: {
        title: "Фільтри",
        clear: "Очистити активні фільтри",
        sortBy: "Сортувати за",
        favorites: "Тільки улюблені",
        favoritesDescription: "Показати тільки улюблені пісні",
        lyrics: "З текстом",
        lyricsDescription: "Показати тільки пісні з текстом",
        releaseYear: "Рік випуску",
        duration: "Тривалість",
        durationMin: "Мінімум",
        durationMax: "Максимум",
        playCount: "Кількість відтворень",
        playCountMin: "Мінімум",
        playCountMax: "Максимум",
        lastPlayed: "Останнє відтворення",
        lastPlayedAfter: "Після",
        lastPlayedBefore: "До",
        selectDate: "Вибрати дату",
        sortOptions: {
          name: "Назва",
          duration: "Тривалість",
          favorites: "Улюблені",
          year: "Рік",
          playCount: "Відтворення",
          lastPlayed: "Останнє відтворення",
          createdAt: "Дата створення",
          updatedAt: "Дата оновлення"
        }
      }
    },
    playlists: {
      title: "Плейлисти",
      createdTitle: "Плейлист успішно створено",
      createdDescription: "{name} створено",
      createdFailedTitle: "Не вдалося створити плейлист",
      updatedTitle: "Плейлист успішно оновлено",
      updatedDescription: "{name} оновлено",
      updatedFailedTitle: "Не вдалося оновити плейлист",
      songsAddedTitle: "Пісні успішно додано",
      songsAddedFailedTitle: "Не вдалося додати пісні",
      deletedTitle: "Плейлист успішно видалено",
      deletedDescription: "{name} видалено",
      deletedFailedTitle: "Не вдалося видалити плейлист",
      filters: {
        title: "Фільтри",
        clear: "Очистити активні фільтри",
        sortBy: "Сортувати за",
        favorites: "Тільки улюблені",
        favoritesDescription: "Показати тільки улюблені плейлисти",
        playCount: "Кількість відтворень",
        playCountMin: "Мінімальна кількість відтворень",
        playCountMax: "Максимальна кількість відтворень",
        totalTracks: "Загальна кількість треків",
        totalTracksMin: "Мінімальна кількість треків",
        totalTracksMax: "Максимальна кількість треків",
        totalDuration: "Загальна тривалість",
        totalDurationMin: "Мінімальна тривалість",
        totalDurationMax: "Максимальна тривалість",
        lastPlayed: "Останнє відтворення",
        lastPlayedAfter: "Після",
        lastPlayedBefore: "До",
        selectDate: "Вибрати дату",
        sortOptions: {
          name: "Назва",
          favorites: "Улюблені",
          playCount: "Кількість відтворень",
          totalTracks: "Загальна кількість треків",
          totalDuration: "Загальна тривалість",
          lastPlayed: "Останнє відтворення",
          createdAt: "Дата створення",
          updatedAt: "Дата оновлення"
        }
      }
    },
    albums: {
      title: "Альбоми",
      createdTitle: "Альбом успішно створено",
      createdDescription: "{name} створено",
      createdFailedTitle: "Не вдалося створити альбом",
      updatedTitle: "Альбом успішно оновлено",
      updatedDescription: "{name} оновлено",
      updatedFailedTitle: "Не вдалося оновити альбом",
      deletedTitle: "Альбом успішно видалено",
      deletedDescription: "{name} видалено",
      deletedFailedTitle: "Не вдалося видалити альбом",
      filters: {
        title: "Фільтри",
        clear: "Очистити активні фільтри",
        sortBy: "Сортувати за",
        favorites: "Тільки улюблені",
        favoritesDescription: "Показати тільки улюблені альбоми",
        albumType: "Тип альбому",
        all: "Всі типи",
        single: "Сингл",
        album: "Альбом",
        compilation: "Збірка",
        releaseYear: "Рік випуску",
        releaseYearMin: "Мінімальний рік",
        releaseYearMax: "Максимальний рік",
        playCount: "Кількість відтворень",
        playCountMin: "Мінімальна кількість відтворень",
        playCountMax: "Максимальна кількість відтворень",
        totalTracks: "Загальна кількість треків",
        totalTracksMin: "Мінімальна кількість треків",
        totalTracksMax: "Максимальна кількість треків",
        totalDuration: "Загальна тривалість",
        totalDurationMin: "Мінімальна тривалість",
        totalDurationMax: "Максимальна тривалість",
        lastPlayed: "Останнє відтворення",
        lastPlayedAfter: "Відтворено після",
        lastPlayedBefore: "Відтворено до",
        selectDate: "Вибрати дату",
        sortOptions: {
          name: "Ім'я",
          releaseYear: "Рік випуску",
          favorites: "Улюблені",
          playCount: "Кількість відтворень",
          totalTracks: "Загальна кількість треків",
          totalDuration: "Загальна тривалість",
          lastPlayed: "Останнє відтворення",
          createdAt: "Створено",
          updatedAt: "Оновлено"
        }
      }
    },
    artists: {
      title: "Виконавці",
      createdTitle: "Виконавця успішно створено",
      createdDescription: "{name} створено",
      createdFailedTitle: "Не вдалося створити виконавця",
      updatedTitle: "Виконавця успішно оновлено",
      updatedDescription: "{name} оновлено",
      updatedFailedTitle: "Не вдалося оновити виконавця",
      deletedTitle: "Виконавця успішно видалено",
      deletedDescription: "{name} видалено",
      deletedFailedTitle: "Не вдалося видалити виконавця",
      filters: {
        title: "Фільтри",
        clear: "Очистити активні фільтри",
        sortBy: "Сортувати за",
        favorites: "Тільки улюблені",
        favoritesDescription: "Показати тільки улюблених виконавців",
        playCount: "Кількість відтворень",
        playCountMin: "Мінімум",
        playCountMax: "Максимум",
        totalTracks: "Загальна кількість пісень",
        totalTracksMin: "Мінімум",
        totalTracksMax: "Максимум",
        totalDuration: "Загальна тривалість",
        totalDurationMin: "Мінімум",
        totalDurationMax: "Максимум",
        lastPlayed: "Останнє відтворення",
        lastPlayedAfter: "Після",
        lastPlayedBefore: "До",
        selectDate: "Вибрати дату",
        sortOptions: {
          name: "Назва",
          favorites: "Улюблені",
          playCount: "Кількість відтворень",
          totalTracks: "Загальна кількість пісень",
          totalDuration: "Загальна тривалість",
          lastPlayed: "Останнє відтворення",
          createdAt: "Дата створення",
          updatedAt: "Дата оновлення"
        }
      }
    },
    favorites: {
      createdTitle: "Додано у вибране",
      createdDescription: "{name} додано у вибране",
      createdFailedTitle: "Не вдалося додати у вибране",
      deletedTitle: "Видалено з вибраного",
      deletedDescription: "{name} видалено з вибраного",
      deletedFailedTitle: "Не вдалося видалити з вибраного"
    },
    sidebar: {
      addedTitle: "Додано до бічної панелі",
      addedDescription: "{name} було додано до бічної панелі",
      addedFailedTitle: "Не вдалося додати до бічної панелі",
      removedTitle: "Видалено з бічної панелі",
      removedDescription: "{name} було видалено з бічної панелі"
    },
    settings: {
      title: "Налаштування",
      appearance: {
        title: "Вигляд",
        description: "Налаштуйте параметри зовнішнього вигляду програми.",
        theme: {
          title: "Тема",
          description: "Виберіть тему програми",
          light: "Світлий",
          dark: "Темний",
          system: "Система"
        },
        zoom: {
          title: "Масштаб",
          description: "Налаштуйте рівень масштабування програми"
        }
      },
      language: {
        title: "Мова",
        description: "Оберіть бажану мову"
      },
      equalizer: {
        title: "Еквалайзер",
        enable: {
          title: "Увімкнути еквалайзер",
          description: "Увімкнути або вимкнути аудіо еквалайзер",
          enabled: "Увімкнено",
          disabled: "Вимкнено"
        },
        presets: {
          title: "Пресети еквалайзера",
          description: "Оберіть з попередньо визначених налаштувань еквалайзера",
          flat: {
            label: "Плоский",
            description: "Без налаштувань"
          },
          rock: {
            label: "Рок",
            description: "Підсилені баси та високі частоти"
          },
          pop: {
            label: "Поп",
            description: "Збалансований з легким підсиленням"
          },
          jazz: {
            label: "Джаз",
            description: "М'який акцент на середніх частотах"
          },
          classical: {
            label: "Класичний",
            description: "Природний звук"
          },
          electronic: {
            label: "Електронний",
            description: "Важкі баси та чіткі високі частоти"
          },
          vocal: {
            label: "Вокал",
            description: "Підсилення середніх частот для чіткості"
          },
          bass: {
            label: "Баси",
            description: "Сильний акцент на низьких частотах"
          },
          treble: {
            label: "Високі",
            description: "Акцент на високих частотах"
          }
        },
        bands: {
          title: "Частотні смуги",
          description: "Налаштування окремих частотних смуг"
        },
        reset: {
          title: "Скинути еквалайзер",
          description: "Скинути всі смуги до плоского (0 дБ)",
          button: "Скинути до плоского"
        }
      },
      sync: {
        title: "Синхронізація",
        description: "Синхронізуйте дані між пристроями",
        export: {
          title: "Експорт бібліотеки",
          description:
            "Експортуйте вашу бібліотеку як файл пакету для резервного копіювання або використання на іншому пристрої",
          selectDestination: "Вибрати місце призначення",
          exportingSongs: "Експорт {count} пісн{count, plural, one {і} few {і} other {ь}}",
          preparingExport: "Підготовка експорту",
          exportingMessage: "Це може зайняти деякий час",
          exportSuccess: "Бібліотеку успішно експортовано",
          showFolder: "Показати папку",
          exportAgain: "Експортувати знову",
          exportFailed: "Помилка експорту",
          tryAgain: "Спробувати знову",
          noSongs: "Немає пісень для експорту",
          libraryEmpty: "Ваша бібліотека порожня",
          noValidSongs: "Немає дійсних пісень для експорту",
          missingAlbumInfo: "Усі пісні не мають інформації про альбом",
          songsExported:
            "{count} пісн{count, plural, one {я} few{і} other{ень}} експортовано до пакету"
        },
        mobile: {
          title: "Синхронізація з мобіллю",
          description: "Перенесіть вашу бібліотеку в Tunno Mobile через вашу локальну мережу",
          generateQr: "Генерувати QR-код",
          stopServer: "Зупинити сервер",
          waitingConnection: "Очікування підключення мобільного пристрою",
          deviceConnected: "Пристрій підключено",
          syncInProgress: "Синхронізація в процесі",
          syncCompleted: "Синхронізація завершена",
          serverError: "Не вдалося запустити сервер синхронізації",
          scanQr: "Сканувати QR-код",
          scanQrDescription:
            "Скануйте QR-код на вашому комп'ютері, щоб синхронізувати бібліотеку через WiFi",
          connecting: "Підключення",
          comparing: "Порівняння бібліотек",
          syncing: "Синхронізація",
          finalizing: "Завершення",
          completed: "Синхронізація завершена",
          completedDescription: "Вашу музичну бібліотеку успішно синхронізовано",
          alreadySynced: "Вже синхронізовано",
          failed: "Синхронізація не вдалася",
          retry: "Повторити",
          cancel: "Скасувати",
          done: "Готово",
          itemsSynced: "{synced} / {total} елементів",
          batchProgress: "Пакет {current} / {total}",
          cameraPermissionTitle: "Потрібен доступ до камери",
          cameraPermissionDescription:
            "Надайте дозвіл на камеру, щоб сканувати QR-код на вашому комп'ютері",
          grantPermission: "Надати дозвіл",
          cameraLoading: "Завантаження камери",
          scanInstruction: "Наведіть камеру на QR-код на вашому комп'ютері",
          connectionFailed: "Не вдалося зв'язатися з сервером на комп'ютері",
          insufficientStorage: "Недостатньо місця",
          insufficientStorageDescription:
            "Недостатньо вільного місця для синхронізації. Потрібно {required}, але доступно лише {available}",
          syncInterrupted: "Синхронізацію перервано через перехід застосунку у фоновий режим",
          downloadingItem: 'Завантаження "{name}"',
          fetchingBatch: "Отримання метаданих пакету {batch}",
          updatingStats: "Оновлення статистики",
          syncComplete: "Синхронізація завершена",
          comparingLibraries: "Порівняння бібліотек",
          connectingToDesktop: "Підключення до комп'ютера"
        }
      },
      about: {
        title: "Про програму",
        description: "Інформація про програму та деталі версії",
        version: "Версія",
        whatsNew: {
          title: "Що нового",
          description: "Ознайомтесь з останніми функціями та покращеннями",
          newRelease: "Новий реліз",
          viewChangelog: "Переглянути changelog"
        },
        storage: {
          title: "Сховище та дані",
          description: "Керування даними програми та налаштуваннями",
          openDataFolder: "Відкрити папку з даними"
        },
        legal: {
          title: "Юридична інформація та авторські права",
          description: "Інформація про ліцензію та юридичні документи",
          copyright: "Авторські права",
          licensed: "Ліцензовано під ліцензією MIT",
          viewLicense: "Переглянути ліцензію",
          viewOnGitHub: "Переглянути на GitHub"
        }
      }
    },
    fastUpload: {
      title: "Швидке завантаження",
      description: "Імпортуйте пакети з CLI або експортовані з",
      cliTooltip: "Відкрити документацію Tunno CLI",
      selectBundle: "Вибрати пакет",
      changeBundle: "Змінити пакет",
      status: {
        pending: "Очікування",
        processing: "Обробка",
        success: "Успіх",
        error: "Помилка",
        skipped: "Пропущено"
      },
      completed: {
        allSuccess: {
          title: "Імпорт завершено",
          description: "{count} трек{count, plural, one {} other{s}} успішно імпортовано"
        },
        withErrors: {
          title: "Імпорт завершено з помилками",
          description:
            "{successCount} імпортовано, {errorCount} не вдалося, {skippedCount} пропущено"
        },
        withSkipped: {
          title: "Імпорт завершено",
          description: "{successCount} імпортовано, {skippedCount} пропущено"
        }
      }
    },
    lyrics: {
      title: "Текст"
    },
    languages: {
      da: "Данська",
      de: "Німецька",
      en: "Англійська",
      es: "Іспанська",
      fi: "Фінська",
      fr: "Французька",
      hi: "Хінді",
      it: "Італійська",
      ja: "Японська",
      ko: "Корейська",
      nl: "Голландська",
      no: "Норвезька",
      pl: "Польська",
      pt: "Португальська",
      ru: "Російська",
      sv: "Шведська",
      tr: "Турецька",
      uk: "Українська",
      vi: "В’єтнамська",
      zh: "Китайська"
    }
  }
}
