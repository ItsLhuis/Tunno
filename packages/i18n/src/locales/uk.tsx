import Uk from "../assets/uk.svg"

import { type Language } from "../types"

export const ukrainian: Language = {
  code: "uk",
  name: "Українська",
  flag: Uk,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Результати не знайдено",
      lessThanAnHourAgo: "Менше години тому",
      hoursAgo: "{{count}} годин{{count, plural, one {у} other{}} тому",
      today: "Сьогодні",
      yesterday: "Вчора",
      goBack: "Назад",
      goFoward: "Вперед",
      favorite: "Улюблене",
      unfavorite: "Видалити з улюблених",
      enableShuffle: "Увімкнути випадкове відтворення",
      disableShuffle: "Вимкнути випадкове відтворення",
      previous: "Попередній",
      play: "Відтворити",
      pause: "Пауза",
      next: "Наступний",
      enableRepeat: "Увімкнути повторення",
      enableRepeatOne: "Повторити один раз",
      disableRepeat: "Вимкнути повторення",
      mute: "Вимкнути звук",
      unmute: "Увімкнути звук",
      devices: "Пристрої",
      queue: "Черга"
    },
    update: {
      downloading: "Завантаження та встановлення оновлення",
      downloadingDescription: "Доступне нове оновлення і воно встановлюється автоматично",
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
        title: "Обране"
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
          title: "Зовнішній вигляд"
        },
        language: {
          title: "Мова"
        },
        sync: {
          title: "Синхронізація"
        }
      }
    },
    home: { title: "Головна" },
    songs: {
      title: "Пісні",
      createdTitle: "Пісню успішно створено",
      createdDescription: "{{name}} було створено",
      createdFailedTitle: "Не вдалося створити пісню",
      updatedTitle: "Пісню успішно оновлено",
      updatedDescription: "{{name}} було оновлено",
      updatedFailedTitle: "Не вдалося оновити пісню",
      deletedTitle: "Пісню успішно видалено",
      deletedDescription: "{{name}} було видалено",
      deletedFailedTitle: "Не вдалося видалити пісню"
    },
    favorites: {
      title: "Обране",
      addedTitle: "Додано до обраного",
      addedDescription: "{{name}} додано до обраного",
      addedFailedTitle: "Не вдалося додати до обраного",
      removedTitle: "Видалено з обраного",
      removedDescription: "{{name}} видалено з обраного",
      removedFailedTitle: "Не вдалося видалити з обраного"
    },
    playlists: {
      title: "Плейлисти",
      createdTitle: "Плейлист успішно створено",
      createdDescription: "{{name}} було створено",
      createdFailedTitle: "Не вдалося створити плейлист",
      updatedTitle: "Плейлист успішно оновлено",
      updatedDescription: "{{name}} було оновлено",
      updatedFailedTitle: "Не вдалося оновити плейлист",
      deletedTitle: "Плейлист успішно видалено",
      deletedDescription: "{{name}} було видалено",
      deletedFailedTitle: "Не вдалося видалити плейлист"
    },
    artists: {
      title: "Виконавці",
      createdTitle: "Виконавця успішно створено",
      createdDescription: "{{name}} було створено",
      createdFailedTitle: "Не вдалося створити виконавця",
      updatedTitle: "Виконавця успішно оновлено",
      updatedDescription: "{{name}} було оновлено",
      updatedFailedTitle: "Не вдалося оновити виконавця",
      deletedTitle: "Виконавця успішно видалено",
      deletedDescription: "{{name}} було видалено",
      deletedFailedTitle: "Не вдалося видалити виконавця"
    },
    settings: {
      title: "Налаштування",
      appearance: {
        title: "Зовнішній вигляд",
        description: "Виберіть бажаний режим відображення",
        light: "Світла",
        dark: "Темна",
        system: "Системна"
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
