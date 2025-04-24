import Uk from "@assets/images/flags/uk.svg"

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
      hoursAgo: "{{count}} година{{count, plural, one {} other{и}}} тому",
      today: "Сьогодні",
      yesterday: "Вчора"
    },
    songs: {
      title: "Пісні",
      createdTitle: "Пісню Успішно Створено",
      createdDescription: "{{name}} було створено",
      createdFailedTitle: "Не Вдалося Створити Пісню",
      updatedTitle: "Пісню Успішно Оновлено",
      updatedDescription: "{{name}} було оновлено",
      updatedFailedTitle: "Не Вдалося Оновити Пісню",
      deletedTitle: "Пісню Успішно Видалено",
      deletedDescription: "{{name}} було видалено",
      deletedFailedTitle: "Не Вдалося Видалити Пісню"
    },
    favorites: {
      title: "Улюблені",
      addedTitle: "Додано до Улюблених",
      addedDescription: "{{name}} було додано до улюблених",
      addedFailedTitle: "Не вдалося додати до улюблених",
      removedTitle: "Видалено з Улюблених",
      removedDescription: "{{name}} було видалено з улюблених",
      removedFailedTitle: "Не вдалося видалити з улюблених"
    },
    playlists: {
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
    artists: {
      title: "Артисти",
      createdTitle: "Артиста успішно створено",
      createdDescription: "{{name}} було створено",
      createdFailedTitle: "Не вдалося створити артиста",
      updatedTitle: "Артиста успішно оновлено",
      updatedDescription: "{{name}} було оновлено",
      updatedFailedTitle: "Не вдалося оновити артиста",
      deletedTitle: "Артиста успішно видалено",
      deletedDescription: "{{name}} було видалено",
      deletedFailedTitle: "Не вдалося видалити артиста"
    },
    settings: {
      title: "Налаштування"
    }
  }
}
