import Ru from "../assets/ru.svg"

import { type Language } from "../types"

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
      removeFromPlaylist: "Удалить из Плейлиста",
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
      songsPlayed: "{count} пес{count, plural, one {ня} other{ен}}"
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
        addToPlaylist: "Добавить в Плейлист",
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
      yourPlaylists: {
        title: "Создано Для Вас",
        description: "Ваши персональные плейлисты"
      },
      onRepeat: {
        title: "На Повторе",
        description: "Песни, которые вы не можете перестать слушать"
      },
      newReleases: {
        title: "Новые Релизы",
        description: "Свежая музыка от исполнителей, на которых вы подписаны"
      },
      favoriteArtists: {
        title: "Ваши Исполнители",
        description: "Исполнители, которых вы любите больше всего"
      },
      topAlbums: {
        title: "Топ Альбомы",
        description: "Ваши самые прослушиваемые альбомы"
      },
      recentlyAdded: {
        title: "Недавно Добавленные",
        description: "Последние добавления в вашу библиотеку"
      },
      hiddenGems: {
        title: "Скрытые Жемчужины",
        description: "Переоткройте забытые фавориты"
      },
      discover: {
        title: "Открыть",
        description: "Новые музыкальные рекомендации для вас"
      },
      yourStats: {
        title: "Ваша Музыка",
        description: "Ваша статистика прослушивания и инсайты",
        topSong: "Топ песня",
        topAlbum: "Топ альбом",
        topArtist: "Топ исполнитель",
        topPlaylist: "Топ плейлист"
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
    settings: {
      title: "Настройки",
      appearance: {
        title: "Внешний вид",
        description: "Выберите предпочитаемый режим отображения",
        light: "Светлый",
        dark: "Тёмный",
        system: "Системный"
      },
      language: {
        title: "Язык",
        description: "Выберите предпочитаемый язык"
      },
      equalizer: {
        title: "Эквалайзер",
        enable: {
          title: "Включить Эквалайзер",
          description: "Включить или отключить аудио эквалайзер",
          enabled: "Включен",
          disabled: "Отключен"
        },
        presets: {
          title: "Предустановки Эквалайзера",
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
          title: "Частотные Полосы",
          description: "Настройка отдельных частотных полос"
        },
        reset: {
          title: "Сбросить Эквалайзер",
          description: "Сбросить все полосы к плоскому (0 дБ)",
          button: "Сбросить к Плоскому"
        }
      },
      sync: {
        title: "Синхронизация",
        description: "Синхронизируйте данные между устройствами"
      },
      about: {
        title: "О программе",
        identity: {
          title: "О программе",
          description: "Информация о приложении и сведения о версии"
        },
        whatsNew: {
          title: "Что нового",
          newRelease: "Новый релиз",
          viewChangelog: "Посмотреть changelog",
          dialog: {
            title: "Changelog"
          }
        },
        storage: {
          title: "Хранилище и Данные",
          description: "Управление данными приложения и настройками",
          openDataFolder: "Открыть папку с данными"
        },
        legal: {
          title: "Правовая информация и Авторские права",
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
      description: "Создайте пакет с помощью Tunno CLI, затем импортируйте его здесь",
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
          title: "Импорт завершен!",
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
