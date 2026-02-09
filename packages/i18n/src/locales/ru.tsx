import Ru from "../assets/ru.svg"

import { type Language } from "../types"

/**
 * Russian language configuration.
 */
export const russian: Language = {
  code: "ru",
  name: "Русский",
  flag: Ru,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Результаты не найдены",
      lessThanAnHourAgo: "Меньше часа назад",
      hoursAgo: "{count} час{count, plural, one {} other{ов}} назад",
      today: "Сегодня",
      thisWeek: "На этой неделе",
      thisMonth: "В этом месяце",
      yesterday: "Вчера",
      years: "{count} год{count, plural, one {} other{а}}",
      weeks: "{count} недел{count, plural, one {я} other{ь}}",
      days: "{count} ден{count, plural, one {ь} other{ей}}",
      hours: "{count} час{count, plural, one {} other{ов}}",
      minutes: "{count} минут{count, plural, one {а} other{}}",
      seconds: "{count} секунд{count, plural, one {а} other{}}",
      goBack: "Назад",
      goForward: "Вперёд",
      favorite: "Добавить в избранное",
      unfavorite: "Удалить из избранного",
      enableShuffle: "Включить перемешивание",
      disableShuffle: "Выключить перемешивание",
      previous: "Предыдущий",
      play: "Воспроизвести",
      pause: "Пауза",
      next: "Следующий",
      enableRepeat: "Включить повтор",
      enableRepeatOne: "Включить повтор одного",
      disableRepeat: "Выключить повтор",
      mute: "Выключить звук",
      unmute: "Включить звук",
      queue: "Очередь",
      title: "Название",
      album: "Альбом",
      artist: "Артист",
      date: "Дата",
      added: "Добавлено",
      duration: "Длительность",
      search: "Поиск",
      selectAll: "Выбрать все",
      clear: "Очистить",
      cancel: "Отмена",
      more: "Ещё",
      select: "Выбрать",
      preview: "Предпросмотр",
      close: "Закрыть",
      playback: "Воспроизведение",
      playNext: "Воспроизвести следующий",
      removeFromQueue: "Удалить из очереди",
      removeFromPlaylist: "Удалить из плейлиста",
      nowPlaying: "Сейчас играет",
      noSongPlaying: "Ничего не играет",
      upNext: "Далее",
      actions: "Действия",
      addTo: "Добавить в",
      playlist: "Плейлист",
      song: "Песня",
      lyrics: "Текст",
      openMiniplayer: "Открыть миниплеер",
      enterFullScreen: "Войти в полный экран",
      exitFullScreen: "Выйти из полного экрана",
      goToSong: "Перейти к песне",
      goToAlbum: "Перейти к альбому",
      goToPlaylist: "Перейти к плейлисту",
      goToArtist: "Перейти к исполнителю",
      shuffleAndPlay: "Перемешать и воспроизвести",
      unknown: "Неизвестно",
      unknownAlbum: "Неизвестный альбом",
      unknownArtist: "Неизвестный исполнитель",
      listenTime: "Время прослушивания",
      averageListenTime: "Среднее время прослушивания",
      retentionRate: "Коэффициент удержания",
      totalPlays: "Всего воспроизведений",
      lastPlayed: "Последнее воспроизведение",
      neverPlayed: "Никогда не воспроизводилось",
      streak: "Серия",
      refresh: "Обновить",
      showingOfTotal: "Показано {showing} из {total}",
      start: "Начать",
      completed: "Завершено",
      songsPlayed: "{count} пес{count, plural, one {ня} other{ен}}",
      appearsIn: "Присутствует в",
      addToSidebar: "Добавить на боковую панель",
      removeFromSidebar: "Удалить с боковой панели",
      featured: "Рекомендуемое",
      stats: "Статистика",
      openToStart: "Открыть Tunno для начала"
    },
    form: {
      titles: {
        createSong: "Создать песню",
        updateSong: "Обновить песню",
        deleteSong: "Удалить песню",
        createArtist: "Создать исполнителя",
        updateArtist: "Обновить исполнителя",
        deleteArtist: "Удалить исполнителя",
        createAlbum: "Создать альбом",
        updateAlbum: "Обновить альбом",
        deleteAlbum: "Удалить альбом",
        createPlaylist: "Создать плейлист",
        updatePlaylist: "Обновить плейлист",
        deletePlaylist: "Удалить плейлист",
        addToPlaylist: "Добавить в плейлист",
        confirmation: "Подтверждение",
        warning: "Предупреждение",
        lyricsPreview: "Предпросмотр текста"
      },
      labels: {
        name: "Имя",
        thumbnail: "Миниатюра",
        file: "Файл",
        releaseYear: "Год выпуска",
        album: "Альбом",
        albumType: "Тип альбома",
        artists: "Исполнители",
        folder: "Папка",
        lyrics: "Текст песни"
      },
      buttons: {
        cancel: "Отмена",
        delete: "Удалить",
        update: "Обновить",
        create: "Создать",
        add: "Добавить"
      },
      descriptions: {
        thumbnail: "Фоновое изображение (необязательно)",
        fileSize: "Максимальный размер: {size}",
        supportedFormats: "Поддерживаемые форматы: {formats}",
        lyricsPreview: "Просмотрите, как текст синхронизируется со временем"
      },
      badges: {
        lines: "{count} строка{count, plural, one {} other{и}}",
        duration: "Длительность: {time}"
      },
      messages: {
        confirmDelete: "Вы уверены, что хотите удалить?",
        unsavedChanges: "Есть несохранённые изменения",
        noLyrics: "Нет текста"
      }
    },
    validation: {
      name: {
        required: "Имя обязательно",
        max: "Имя должно содержать не более 200 символов"
      },
      file: {
        required: "Файл обязателен",
        invalid: "Неверный или повреждённый файл",
        max: "Файл превышает максимальный размер {maxSize}"
      },
      duration: {
        required: "Длительность обязательна",
        min: "Длительность должна быть не менее 0"
      },
      releaseYear: {
        invalid: "Неверный год выпуска",
        min: "Год выпуска должен быть не менее 0",
        max: "Год выпуска не может быть из будущего"
      },
      albumId: {
        invalid: "Неверный альбом"
      },
      artists: {
        invalid: "Недопустимые исполнители"
      },
      albumType: {
        invalid: "Недопустимый тип альбома"
      },
      playlistIds: {
        invalid: "Недопустимые плейлисты"
      },
      album: {
        duplicate: "Альбом с таким названием уже существует",
        integrity:
          "Нельзя удалить исполнителя из альбома, так как есть песни, которые принадлежат и этому альбому, и этому исполнителю"
      },
      artist: {
        duplicate: "Исполнитель с таким именем уже существует",
        integrity:
          "Нельзя удалить исполнителя, так как есть песни, которые принадлежат и этому исполнителю, и альбомам, в которые также включен этот исполнитель"
      },
      playlist: {
        duplicate: "Плейлист с таким названием уже существует"
      }
    },
    update: {
      downloading: "Загрузка и установка обновления",
      downloadingDescription: "Доступно новое обновление, которое устанавливается автоматически",
      installedSuccess: "Обновление успешно установлено",
      failed: "Не удалось установить обновление"
    },
    breadcrumbs: {
      home: {
        title: "Главная"
      },
      songs: {
        title: "Песни"
      },
      playlists: {
        title: "Плейлисты"
      },
      albums: {
        title: "Альбомы"
      },
      artists: {
        title: "Исполнители"
      },
      fastUpload: {
        title: "Быстрая загрузка"
      },
      settings: {
        title: "Настройки",
        appearance: {
          title: "Внешний вид"
        },
        language: {
          title: "Язык"
        },
        equalizer: {
          title: "Эквалайзер"
        },
        sync: {
          title: "Синхронизация"
        },
        about: {
          title: "О программе"
        }
      },
      lyrics: {
        title: "Текст"
      }
    },
    home: {
      title: "Главная",
      jumpBackIn: {
        title: "Продолжить",
        description: "Продолжите с того места, где остановились"
      },
      newReleases: {
        title: "Новые релизы",
        description: "Новые добавления в вашу коллекцию"
      },
      onRepeat: {
        title: "На повторе",
        description: "Песни, которые вы не можете перестать слушать"
      },
      discover: {
        title: "Открыть",
        description: "Новые музыкальные рекомендации для вас"
      },
      favoriteArtists: {
        title: "Ваши исполнители",
        description: "Исполнители, которых вы любите больше всего"
      },
      yourPlaylists: {
        title: "Создано для вас",
        description: "Ваши персональные плейлисты"
      },
      topAlbums: {
        title: "Популярные альбомы",
        description: "Ваши самые прослушиваемые альбомы"
      },
      recentlyAdded: {
        title: "Недавно добавленные",
        description: "Новые добавления в вашу библиотеку"
      },
      empty: {
        title: "Ваша библиотека пуста",
        description:
          "Добро пожаловать в Tunno. Для начала вам нужно добавить музыку в вашу личную библиотеку.",
        getStarted: "Начать",
        songs: {
          title: "Импортировать песни",
          description:
            "Добавьте музыкальные файлы с вашего устройства, чтобы начать формировать свою библиотеку"
        },
        albums: {
          title: "Создать альбомы",
          description: "Организуйте свою музыку, создавая альбомы с обложками и деталями"
        },
        playlists: {
          title: "Создать плейлист",
          description: "Создавайте свои собственные миксы для любого настроения или занятия"
        },
        artists: {
          title: "Добавить исполнителей",
          description:
            "Создавайте профили исполнителей, чтобы организовывать и управлять их музыкой"
        }
      }
    },
    songs: {
      title: "Песни",
      createdTitle: "Песня успешно создана",
      createdDescription: "{name} создана",
      createdFailedTitle: "Не удалось создать песню",
      updatedTitle: "Песня успешно обновлена",
      updatedDescription: "{name} обновлена",
      updatedFailedTitle: "Не удалось обновить песню",
      deletedTitle: "Песня успешно удалена",
      deletedDescription: "{name} удалена",
      deletedFailedTitle: "Не удалось удалить песню",
      filters: {
        title: "Фильтры",
        clear: "Очистить активные фильтры",
        sortBy: "Сортировать по",
        favorites: "Только избранные",
        favoritesDescription: "Показать только избранные песни",
        lyrics: "С текстом",
        lyricsDescription: "Показать только песни с текстом",
        releaseYear: "Год выпуска",
        duration: "Длительность",
        durationMin: "Минимум",
        durationMax: "Максимум",
        playCount: "Количество воспроизведений",
        playCountMin: "Минимум",
        playCountMax: "Максимум",
        lastPlayed: "Последнее воспроизведение",
        lastPlayedAfter: "После",
        lastPlayedBefore: "До",
        selectDate: "Выбрать дату",
        sortOptions: {
          name: "Название",
          duration: "Длительность",
          favorites: "Избранные",
          year: "Год",
          playCount: "Воспроизведения",
          lastPlayed: "Последнее воспроизведение",
          createdAt: "Дата создания",
          updatedAt: "Дата обновления"
        }
      }
    },
    playlists: {
      title: "Плейлисты",
      createdTitle: "Плейлист успешно создан",
      createdDescription: "{name} создан",
      createdFailedTitle: "Не удалось создать плейлист",
      updatedTitle: "Плейлист успешно обновлён",
      updatedDescription: "{name} обновлён",
      updatedFailedTitle: "Не удалось обновить плейлист",
      songsAddedTitle: "Песни добавлены успешно",
      songsAddedFailedTitle: "Не удалось добавить песни",
      deletedTitle: "Плейлист успешно удалён",
      deletedDescription: "{name} удалён",
      deletedFailedTitle: "Не удалось удалить плейлист",
      filters: {
        title: "Фильтры",
        clear: "Очистить активные фильтры",
        sortBy: "Сортировать по",
        favorites: "Только избранные",
        favoritesDescription: "Показать только избранные плейлисты",
        playCount: "Количество воспроизведений",
        playCountMin: "Минимальное количество воспроизведений",
        playCountMax: "Максимальное количество воспроизведений",
        totalTracks: "Общее количество треков",
        totalTracksMin: "Минимальное количество треков",
        totalTracksMax: "Максимальное количество треков",
        totalDuration: "Общая продолжительность",
        totalDurationMin: "Минимальная продолжительность",
        totalDurationMax: "Максимальная продолжительность",
        lastPlayed: "Последнее воспроизведение",
        lastPlayedAfter: "После",
        lastPlayedBefore: "До",
        selectDate: "Выбрать дату",
        sortOptions: {
          name: "Название",
          favorites: "Избранные",
          playCount: "Количество воспроизведений",
          totalTracks: "Общее количество треков",
          totalDuration: "Общая продолжительность",
          lastPlayed: "Последнее воспроизведение",
          createdAt: "Дата создания",
          updatedAt: "Дата обновления"
        }
      }
    },
    albums: {
      title: "Альбомы",
      createdTitle: "Альбом успешно создан",
      createdDescription: "{name} создан",
      createdFailedTitle: "Не удалось создать альбом",
      updatedTitle: "Альбом успешно обновлён",
      updatedDescription: "{name} обновлён",
      updatedFailedTitle: "Не удалось обновить альбом",
      deletedTitle: "Альбом успешно удалён",
      deletedDescription: "{name} удалён",
      deletedFailedTitle: "Не удалось удалить альбом",
      filters: {
        title: "Фильтры",
        clear: "Очистить активные фильтры",
        sortBy: "Сортировать по",
        favorites: "Только избранные",
        favoritesDescription: "Показать только избранные альбомы",
        albumType: "Тип альбома",
        all: "Все типы",
        single: "Сингл",
        album: "Альбом",
        compilation: "Сборник",
        releaseYear: "Год выпуска",
        releaseYearMin: "Минимальный год",
        releaseYearMax: "Максимальный год",
        playCount: "Количество воспроизведений",
        playCountMin: "Минимальное количество воспроизведений",
        playCountMax: "Максимальное количество воспроизведений",
        totalTracks: "Общее количество треков",
        totalTracksMin: "Минимальное количество треков",
        totalTracksMax: "Максимальное количество треков",
        totalDuration: "Общая продолжительность",
        totalDurationMin: "Минимальная продолжительность",
        totalDurationMax: "Максимальная продолжительность",
        lastPlayed: "Последнее воспроизведение",
        lastPlayedAfter: "Воспроизведено после",
        lastPlayedBefore: "Воспроизведено до",
        selectDate: "Выбрать дату",
        sortOptions: {
          name: "Имя",
          releaseYear: "Год выпуска",
          favorites: "Избранные",
          playCount: "Количество воспроизведений",
          totalTracks: "Общее количество треков",
          totalDuration: "Общая продолжительность",
          lastPlayed: "Последнее воспроизведение",
          createdAt: "Создано",
          updatedAt: "Обновлено"
        }
      }
    },
    artists: {
      title: "Исполнители",
      createdTitle: "Исполнитель успешно создан",
      createdDescription: "{name} создан",
      createdFailedTitle: "Не удалось создать исполнителя",
      updatedTitle: "Исполнитель успешно обновлён",
      updatedDescription: "{name} обновлён",
      updatedFailedTitle: "Не удалось обновить исполнителя",
      deletedTitle: "Исполнитель успешно удалён",
      deletedDescription: "{name} удалён",
      deletedFailedTitle: "Не удалось удалить исполнителя",
      filters: {
        title: "Фильтры",
        clear: "Очистить активные фильтры",
        sortBy: "Сортировать по",
        favorites: "Только избранные",
        favoritesDescription: "Показать только избранных исполнителей",
        playCount: "Количество воспроизведений",
        playCountMin: "Минимум",
        playCountMax: "Максимум",
        totalTracks: "Общее количество песен",
        totalTracksMin: "Минимум",
        totalTracksMax: "Максимум",
        totalDuration: "Общая продолжительность",
        totalDurationMin: "Минимум",
        totalDurationMax: "Максимум",
        lastPlayed: "Последнее воспроизведение",
        lastPlayedAfter: "После",
        lastPlayedBefore: "До",
        selectDate: "Выбрать дату",
        sortOptions: {
          name: "Название",
          favorites: "Избранные",
          playCount: "Количество воспроизведений",
          totalTracks: "Общее количество песен",
          totalDuration: "Общая продолжительность",
          lastPlayed: "Последнее воспроизведение",
          createdAt: "Дата создания",
          updatedAt: "Дата обновления"
        }
      }
    },
    favorites: {
      createdTitle: "Добавлено в избранное",
      createdDescription: "{name} добавлена в избранное",
      createdFailedTitle: "Не удалось добавить в избранное",
      deletedTitle: "Удалено из избранного",
      deletedDescription: "{name} удалена из избранного",
      deletedFailedTitle: "Не удалось удалить из избранного"
    },
    sidebar: {
      addedTitle: "Добавлено на боковую панель",
      addedDescription: "{name} был добавлен на боковую панель",
      addedFailedTitle: "Не удалось добавить на боковую панель",
      removedTitle: "Удалено с боковой панели",
      removedDescription: "{name} был удален с боковой панели"
    },
    settings: {
      title: "Настройки",
      appearance: {
        title: "Внешний вид",
        description: "Настройте параметры внешнего вида приложения.",
        theme: {
          title: "Тема",
          description: "Выберите тему приложения",
          light: "Светлый",
          dark: "Тёмный",
          system: "Системный"
        },
        zoom: {
          title: "Масштаб",
          description: "Настройте уровень масштабирования приложения"
        }
      },
      language: {
        title: "Язык",
        description: "Выберите предпочитаемый язык"
      },
      equalizer: {
        title: "Эквалайзер",
        enable: {
          title: "Включить эквалайзер",
          description: "Включить или отключить аудио эквалайзер",
          enabled: "Включен",
          disabled: "Отключен"
        },
        presets: {
          title: "Предустановки эквалайзера",
          description: "Выберите из предустановленных настроек эквалайзера",
          flat: {
            label: "Плоский",
            description: "Без изменений"
          },
          rock: {
            label: "Рок",
            description: "Усиленные басы и высокие частоты"
          },
          pop: {
            label: "Поп",
            description: "Сбалансированный с легким усилением"
          },
          jazz: {
            label: "Джаз",
            description: "Мягкий акцент на средних частотах"
          },
          classical: {
            label: "Классика",
            description: "Естественный звук"
          },
          electronic: {
            label: "Электроника",
            description: "Тяжелые басы и четкие высокие частоты"
          },
          vocal: {
            label: "Вокал",
            description: "Усиление средних частот для ясности"
          },
          bass: {
            label: "Басы",
            description: "Сильный акцент на низких частотах"
          },
          treble: {
            label: "Высокие",
            description: "Акцент на высоких частотах"
          }
        },
        bands: {
          title: "Частотные полосы",
          description: "Настройка отдельных частотных полос"
        },
        reset: {
          title: "Сбросить эквалайзер",
          description: "Сбросить все полосы к плоскому (0 дБ)",
          button: "Сбросить к плоскому"
        }
      },
      sync: {
        title: "Синхронизация",
        description: "Синхронизируйте данные между устройствами",
        export: {
          title: "Экспорт библиотеки",
          description:
            "Экспортируйте вашу библиотеку как файл пакета для резервного копирования или использования на другом устройстве",
          selectDestination: "Выбрать место назначения",
          exportingSongs: "Экспорт {count} песн{count, plural, one {и} few {и} other {ей}}",
          preparingExport: "Подготовка экспорта",
          exportingMessage: "Это может занять некоторое время",
          exportSuccess: "Библиотека успешно экспортирована",
          showFolder: "Показать папку",
          exportAgain: "Экспортировать снова",
          exportFailed: "Ошибка экспорта",
          tryAgain: "Попробовать снова",
          noSongs: "Нет песен для экспорта",
          libraryEmpty: "Ваша библиотека пуста",
          noValidSongs: "Нет допустимых песен для экспорта",
          missingAlbumInfo: "У всех песен отсутствует информация об альбоме",
          songsExported:
            "{count} пес{count, plural, one {ня} few{ни} other{ен}} экспортировано в пакет"
        },
        desktop: {
          title: "Синхронизировать с мобилью",
          description: "Перенесите вашу библиотеку в Tunno Mobile через вашу локальную сеть"
        },
        mobile: {
          title: "Синхронизировать с компьютером",
          generateQr: "Сгенерировать QR-код",
          stopServer: "Остановить сервер",
          waitingConnection: "Ожидание подключения мобильного устройства",
          deviceConnected: "Устройство подключено",
          syncInProgress: "Синхронизация в процессе",
          syncCompleted: "Синхронизация завершена",
          serverError: "Не удалось запустить сервер синхронизации",
          scanQr: "Сканировать QR-код",
          scanQrDescription:
            "Отсканируйте QR-код на компьютере, чтобы перенести музыкальную библиотеку через локальную сеть",
          connecting: "Подключение",
          comparing: "Сравнение библиотек",
          syncing: "Синхронизация",
          finalizing: "Завершение",
          completed: "Синхронизация завершена",
          completedDescription: "Ваша музыкальная библиотека успешно синхронизирована",
          alreadySynced: "Уже синхронизировано",
          failed: "Синхронизация не удалась",
          cancel: "Отмена",
          done: "Готово",
          itemsSynced: "{synced} / {total} элементов",
          batchProgress: "Пакет {current} / {total}",
          cameraPermissionTitle: "Требуется доступ к камере",
          cameraPermissionDescription:
            "Предоставьте разрешение на камеру, чтобы отсканировать QR-код на экране компьютера",
          grantPermission: "Предоставить разрешение",
          cameraLoading: "Загрузка камеры",
          scanInstruction: "Направьте камеру на QR-код на экране компьютера",
          connectionFailed: "Не удалось связаться с сервером на компьютере",
          insufficientStorageDescription:
            "Недостаточно свободного места для синхронизации. Требуется {required}, но доступно только {available}",
          syncInterrupted: "Синхронизация была прервана, потому что приложение ушло в фон",
          downloadingItem: 'Загрузка "{name}"',
          fetchingBatch: "Получение метаданных пакета {batch}",
          updatingStats: "Обновление статистики",
          syncComplete: "Синхронизация завершена",
          comparingLibraries: "Сравнение библиотек",
          connectingToDesktop: "Подключение к компьютеру",
          cancelledByMobile: "Синхронизация отменена мобильным устройством",
          syncTimedOut: "Мобильное устройство не ответило",
          connectionLost: "Сервер рабочего стола отключен"
        }
      },
      about: {
        title: "О программе",
        description: "Информация о приложении и сведения о версии",
        version: "Версия",
        whatsNew: {
          title: "Что нового",
          description: "Ознакомьтесь с последними функциями и улучшениями",
          newRelease: "Новый релиз",
          viewChangelog: "Посмотреть changelog"
        },
        storage: {
          title: "Хранилище и данные",
          description: "Управление данными приложения и настройками",
          openDataFolder: "Открыть папку с данными"
        },
        legal: {
          title: "Правовая информация и авторские права",
          description: "Информация о лицензии и правовые документы",
          copyright: "Авторские права",
          licensed: "Лицензировано под лицензией MIT",
          viewLicense: "Посмотреть лицензию",
          viewOnGitHub: "Посмотреть на GitHub"
        }
      }
    },
    fastUpload: {
      title: "Быстрая загрузка",
      description: "Импортируйте пакеты из CLI или экспортированные из",
      cliTooltip: "Открыть документацию Tunno CLI",
      selectBundle: "Выбрать пакет",
      changeBundle: "Изменить пакет",
      status: {
        pending: "Ожидание",
        processing: "Обработка",
        success: "Успех",
        error: "Ошибка",
        skipped: "Пропущено"
      },
      completed: {
        allSuccess: {
          title: "Импорт завершен",
          description:
            "{count} трек{count, plural, one {} other{s}} успешно импортирован{count, plural, one {} other{s}}"
        },
        withErrors: {
          title: "Импорт завершен с ошибками",
          description:
            "{successCount} импортировано, {errorCount} не удалось, {skippedCount} пропущено"
        },
        withSkipped: {
          title: "Импорт завершен",
          description: "{successCount} импортировано, {skippedCount} пропущено"
        }
      }
    },
    lyrics: {
      title: "Текст"
    },
    languages: {
      da: "Датский",
      de: "Немецкий",
      en: "Английский",
      es: "Испанский",
      fi: "Финский",
      fr: "Французский",
      hi: "Хинди",
      it: "Итальянский",
      ja: "Японский",
      ko: "Корейский",
      nl: "Голландский",
      no: "Норвежский",
      pl: "Польский",
      pt: "Португальский",
      ru: "Русский",
      sv: "Шведский",
      tr: "Турецкий",
      uk: "Украинский",
      vi: "Вьетнамский",
      zh: "Китайский"
    }
  }
}
