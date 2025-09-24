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
      yesterday: "Вчера",
      goBack: "Назад",
      goFoward: "Вперёд",
      favorite: "В избранное",
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
      actions: "Действия",
      addTo: "Добавить в",
      playlist: "Плейлист",
      lyrics: "Текст",
      openMiniplayer: "Открыть миниплеер",
      enterFullScreen: "Войти в полный экран",
      exitFullScreen: "Выйти из полного экрана",
      goToAlbum: "Перейти к альбому",
      goToArtist: "Перейти к исполнителю",
      shuffleAndPlay: "Перемешать и воспроизвести",
      unknown: "Неизвестно"
    },
    form: {
      titles: {
        createSong: "Создать песню",
        updateSong: "Обновить песню",
        deleteSong: "Удалить песню",
        createArtist: "Создать исполнителя",
        updateArtist: "Обновить исполнителя",
        deleteArtist: "Удалить исполнителя",
        createPlaylist: "Создать плейлист",
        updatePlaylist: "Обновить плейлист",
        deletePlaylist: "Удалить плейлист",
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
        artists: "Исполнители",
        folder: "Папка",
        lyrics: "Текст песни"
      },
      buttons: {
        cancel: "Отмена",
        delete: "Удалить",
        update: "Обновить",
        create: "Создать"
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
        sync: {
          title: "Синхронизация"
        }
      }
    },
    home: {
      title: "Главная"
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
      deletedFailedTitle: "Не удалось удалить плейлист"
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
      deletedFailedTitle: "Не удалось удалить альбом"
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
      deletedFailedTitle: "Не удалось удалить исполнителя"
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
      sync: {
        title: "Синхронизация",
        description: "Синхронизируйте данные между устройствами"
      }
    },
    fastUpload: {
      title: "Быстрая загрузка"
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
