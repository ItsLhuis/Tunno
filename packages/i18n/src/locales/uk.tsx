import Uk from "../assets/uk.svg"

import { type Language } from "../types"

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
      yesterday: "Вчора",
      goBack: "Повернутися назад",
      goFoward: "Пройти вперед",
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
      createdAt: "Дата створення",
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
      actions: "Дії",
      addTo: "Додати до",
      playlist: "Плейлист",
      song: "Пісня",
      lyrics: "Текст",
      openMiniplayer: "Відкрити міні-плеєр",
      enterFullScreen: "Увійти в повний екран",
      exitFullScreen: "Вийти з повного екрану",
      goToAlbum: "Перейти до альбому",
      goToArtist: "Перейти до виконавця",
      shuffleAndPlay: "Перемішати та відтворити",
      unknown: "Невідомо",
      unknownAlbum: "Невідомий альбом",
      unknownArtist: "Невідомий виконавець"
    },
    form: {
      titles: {
        createSong: "Створити пісню",
        updateSong: "Оновити пісню",
        deleteSong: "Видалити пісню",
        createArtist: "Створити виконавця",
        updateArtist: "Оновити виконавця",
        deleteArtist: "Видалити виконавця",
        createPlaylist: "Створити плейлист",
        updatePlaylist: "Оновити плейлист",
        deletePlaylist: "Видалити плейлист",
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
        artists: "Виконавці",
        folder: "Папка",
        lyrics: "Текст пісні"
      },
      buttons: {
        cancel: "Скасувати",
        delete: "Видалити",
        update: "Оновити",
        create: "Створити"
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
        sync: {
          title: "Синхронізація"
        }
      }
    },
    home: {
      title: "Головна"
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
      deletedTitle: "Плейлист успішно видалено",
      deletedDescription: "{name} видалено",
      deletedFailedTitle: "Не вдалося видалити плейлист"
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
      deletedFailedTitle: "Не вдалося видалити альбом"
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
      deletedFailedTitle: "Не вдалося видалити виконавця"
    },
    favorites: {
      createdTitle: "Додано у вибране",
      createdDescription: "{name} додано у вибране",
      createdFailedTitle: "Не вдалося додати у вибране",
      deletedTitle: "Видалено з вибраного",
      deletedDescription: "{name} видалено з вибраного",
      deletedFailedTitle: "Не вдалося видалити з вибраного"
    },
    settings: {
      title: "Налаштування",
      appearance: {
        title: "Вигляд",
        description: "Виберіть бажаний режим вигляду",
        light: "Світлий",
        dark: "Темний",
        system: "Система"
      },
      language: {
        title: "Мова",
        description: "Оберіть бажану мову"
      },
      sync: {
        title: "Синхронізація",
        description: "Синхронізуйте дані між пристроями"
      }
    },
    fastUpload: {
      title: "Швидке завантаження"
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
