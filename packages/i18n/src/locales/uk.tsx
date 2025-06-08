import Uk from "../assets/uk.svg"

import { type Language } from "../types"

export const ukrainian: Language = {
  code: "uk",
  name: "Українська",
  flag: Uk,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Нічого не знайдено",
      lessThanAnHourAgo: "Менше години тому",
      hoursAgo: "{{count}} годин тому",
      today: "Сьогодні",
      yesterday: "Вчора"
    },
    update: {
      downloading: "Завантаження та встановлення оновлення",
      downloadingDescription: "Доступне нове оновлення, яке встановлюється автоматично",
      installedSuccess: "Оновлення успішно встановлено",
      failed: "Не вдалося встановити оновлення"
    },
    songs: {
      title: "Пісні",
      createdTitle: "Пісню успішно створено",
      createdDescription: "{{name}} створено",
      createdFailedTitle: "Не вдалося створити пісню",
      updatedTitle: "Пісню успішно оновлено",
      updatedDescription: "{{name}} оновлено",
      updatedFailedTitle: "Не вдалося оновити пісню",
      deletedTitle: "Пісню успішно видалено",
      deletedDescription: "{{name}} видалено",
      deletedFailedTitle: "Не вдалося видалити пісню"
    },
    favorites: {
      title: "Улюблене",
      addedTitle: "Додано до улюбленого",
      addedDescription: "{{name}} додано до улюбленого",
      addedFailedTitle: "Не вдалося додати до улюбленого",
      removedTitle: "Видалено з улюбленого",
      removedDescription: "{{name}} видалено з улюбленого",
      removedFailedTitle: "Не вдалося видалити з улюбленого"
    },
    playlists: {
      title: "Плейлисти",
      createdTitle: "Плейлист успішно створено",
      createdDescription: "{{name}} створено",
      createdFailedTitle: "Не вдалося створити плейлист",
      updatedTitle: "Плейлист успішно оновлено",
      updatedDescription: "{{name}} оновлено",
      updatedFailedTitle: "Не вдалося оновити плейлист",
      deletedTitle: "Плейлист успішно видалено",
      deletedDescription: "{{name}} видалено",
      deletedFailedTitle: "Не вдалося видалити плейлист"
    },
    artists: {
      title: "Виконавці",
      createdTitle: "Виконавця успішно створено",
      createdDescription: "{{name}} створено",
      createdFailedTitle: "Не вдалося створити виконавця",
      updatedTitle: "Виконавця успішно оновлено",
      updatedDescription: "{{name}} оновлено",
      updatedFailedTitle: "Не вдалося оновити виконавця",
      deletedTitle: "Виконавця успішно видалено",
      deletedDescription: "{{name}} видалено",
      deletedFailedTitle: "Не вдалося видалити виконавця"
    },
    settings: {
      title: "Налаштування",
      theme: {
        title: "Тема",
        description: "Виберіть бажану тему оформлення",
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
    }
  }
}
