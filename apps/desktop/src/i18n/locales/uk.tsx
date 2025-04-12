import Uk from "@assets/images/flags/uk.svg"

import { type Language } from "../types"

export const ukrainian: Language = {
  code: "uk",
  name: "Українська",
  flag: Uk,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Результатів не знайдено"
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
      title: "Улюблені"
    },
    playlists: {
      title: "Плейлисти"
    },
    artists: {
      title: "Артисти"
    },
    settings: {
      title: "Налаштування"
    }
  }
}
