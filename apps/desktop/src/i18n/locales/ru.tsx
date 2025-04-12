import Ru from "@assets/images/flags/ru.svg"

import { type Language } from "../types"

export const russian: Language = {
  code: "ru",
  name: "Русский",
  flag: Ru,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Результаты не найдены"
    },
    songs: {
      title: "Песни",
      createdTitle: "Песня Успешно Создана",
      createdDescription: "{{name}} была создана",
      createdFailedTitle: "Не Удалось Создать Песню",
      updatedTitle: "Песня Успешно Обновлена",
      updatedDescription: "{{name}} была обновлена",
      updatedFailedTitle: "Не Удалось Обновить Песню",
      deletedTitle: "Песня Успешно Удалена",
      deletedDescription: "{{name}} была удалена",
      deletedFailedTitle: "Не Удалось Удалить Песню"
    },
    favorites: {
      title: "Избранное"
    },
    playlists: {
      title: "Плейлисты"
    },
    artists: {
      title: "Артисты"
    },
    settings: {
      title: "Настройки"
    }
  }
}
