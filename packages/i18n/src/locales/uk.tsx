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
      hoursAgo: "{{count}} година тому",
      today: "Сьогодні",
      yesterday: "Вчора",
      goBack: "Назад",
      goFoward: "Вперед",
      favorite: "Улюблене",
      unfavorite: "Видалити з улюбленого",
      enableShuffle: "Увімкнути випадковий порядок",
      disableShuffle: "Вимкнути випадковий порядок",
      previous: "Попередній",
      play: "Відтворити",
      pause: "Пауза",
      next: "Наступний",
      enableRepeat: "Увімкнути повтор",
      enableRepeatOne: "Повторити один",
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
      columns: "Стовпці",
      clear: "Очистити",
      cancel: "Скасувати",
      more: "Більше",
      select: "Вибрати"
    },
    form: {
      titles: {
        createSong: "Створити пісню",
        updateSong: "Оновити пісню",
        deleteSong: "Видалити пісню",
        createArtist: "Створити артиста",
        updateArtist: "Оновити артиста",
        deleteArtist: "Видалити артиста",
        createPlaylist: "Створити плейлист",
        updatePlaylist: "Оновити плейлист",
        deletePlaylist: "Видалити плейлист",
        confirmation: "Підтвердження",
        warning: "Попередження"
      },
      labels: {
        name: "Ім'я",
        thumbnail: "Мініатюра",
        file: "Файл",
        releaseYear: "Рік випуску",
        album: "Альбом",
        artists: "Артисти",
        isSingle: "Є сингл",
        folder: "Папка"
      },
      buttons: {
        cancel: "Скасувати",
        delete: "Видалити",
        update: "Оновити",
        create: "Створити"
      },
      descriptions: {
        thumbnail: "Фонове зображення (необов'язково)",
        fileSize: "Максимальний розмір: {{size}}",
        supportedFormats: "Підтримувані формати: {{formats}}"
      },
      messages: {
        confirmDelete: "Ви впевнені, що хочете видалити?",
        unsavedChanges: "Є незбережені зміни"
      }
    },
    validation: {
      name: {
        required: "Ім'я є обов'язковим",
        max: "Ім'я має бути не більше 200 символів"
      },
      file: {
        required: "Файл є обов'язковим",
        invalid: "Недійсний або пошкоджений файл",
        max: "Файл перевищує максимальний розмір {{maxSize}}"
      },
      duration: {
        required: "Тривалість є обов'язковою",
        min: "Тривалість має бути не меншою за 0"
      },
      releaseYear: {
        invalid: "Недійсний рік випуску",
        min: "Рік випуску має бути не меншим за 0",
        max: "Рік випуску не може бути в майбутньому"
      },
      albumId: {
        invalid: "Недійсний альбом",
        requiredIfNotSingle: "Альбом є обов'язковим, якщо це не сингл"
      },
      artists: {
        min: "Потрібен принаймні один артист"
      }
    },
    update: {
      downloading: "Завантаження та встановлення оновлення",
      downloadingDescription: "Доступне нове оновлення, воно встановлюється автоматично",
      installedSuccess: "Оновлення успішно встановлено",
      failed: "Не вдалося встановити оновлення"
    },
    breadcrumbs: {
      home: { title: "Головна" },
      songs: { title: "Пісні" },
      favorites: { title: "Улюблене" },
      playlists: { title: "Плейлисти" },
      artists: { title: "Артисти" },
      fastUpload: { title: "Швидке завантаження" },
      settings: {
        title: "Налаштування",
        appearance: { title: "Зовнішній вигляд" },
        language: { title: "Мова" },
        sync: { title: "Синхронізація" }
      }
    },
    home: { title: "Головна" },
    songs: {
      title: "Пісні",
      createdTitle: "Пісня створена",
      createdDescription: "{{name}} створена",
      createdFailedTitle: "Не вдалося створити пісню",
      updatedTitle: "Пісня оновлена",
      updatedDescription: "{{name}} оновлена",
      updatedFailedTitle: "Не вдалося оновити пісню",
      deletedTitle: "Пісня видалена",
      deletedDescription: "{{name}} видалена",
      deletedFailedTitle: "Не вдалося видалити пісню"
    },
    favorites: {
      title: "Улюблене",
      createdTitle: "Додано в улюблене",
      createdDescription: "{{name}} додано в улюблене",
      createdFailedTitle: "Не вдалося додати в улюблене",
      deletedTitle: "Видалено з улюбленого",
      deletedDescription: "{{name}} видалено з улюбленого",
      deletedFailedTitle: "Не вдалося видалити з улюбленого"
    },
    playlists: {
      title: "Плейлисти",
      createdTitle: "Плейлист створено",
      createdDescription: "{{name}} створено",
      createdFailedTitle: "Не вдалося створити плейлист",
      updatedTitle: "Плейлист оновлено",
      updatedDescription: "{{name}} оновлено",
      updatedFailedTitle: "Не вдалося оновити плейлист",
      deletedTitle: "Плейлист видалено",
      deletedDescription: "{{name}} видалено",
      deletedFailedTitle: "Не вдалося видалити плейлист"
    },
    artists: {
      title: "Артисти",
      createdTitle: "Артист створений",
      createdDescription: "{{name}} створено",
      createdFailedTitle: "Не вдалося створити артиста",
      updatedTitle: "Артист оновлений",
      updatedDescription: "{{name}} оновлено",
      updatedFailedTitle: "Не вдалося оновити артиста",
      deletedTitle: "Артист видалений",
      deletedDescription: "{{name}} видалено",
      deletedFailedTitle: "Не вдалося видалити артиста"
    },
    settings: {
      title: "Налаштування",
      appearance: {
        title: "Зовнішній вигляд",
        description: "Виберіть бажаний режим відображення",
        light: "Світлий",
        dark: "Темний",
        system: "Системний"
      },
      language: {
        title: "Мова",
        description: "Виберіть бажану мову"
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
      hi: "Гінді",
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
      vi: "В'єтнамська",
      zh: "Китайська"
    }
  }
}
