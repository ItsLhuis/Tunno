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
      favorite: "Вибране",
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
      date: "Дата",
      duration: "Тривалість",
      search: "Пошук",
      selectAll: "Вибрати все",
      visibility: "Видимість",
      columns: "Колонки",
      clear: "Очистити",
      cancel: "Скасувати",
      more: "Більше",
      select: "Вибрати",
      preview: "Попередній перегляд",
      close: "Закрити"
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
        isSingle: "Сингл",
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
      favorites: {
        title: "Вибране"
      },
      playlists: {
        title: "Плейлисти"
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
      deletedFailedTitle: "Не вдалося видалити пісню"
    },
    favorites: {
      title: "Вибране",
      createdTitle: "Додано у вибране",
      createdDescription: "{name} додано у вибране",
      createdFailedTitle: "Не вдалося додати у вибране",
      deletedTitle: "Видалено з вибраного",
      deletedDescription: "{name} видалено з вибраного",
      deletedFailedTitle: "Не вдалося видалити з вибраного"
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
