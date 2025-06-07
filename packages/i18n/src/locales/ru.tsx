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
      lessThanAnHourAgo: "Менее часа назад",
      hoursAgo: "{{count}} час{{count, plural, one {} other{ов}}} назад",
      today: "Сегодня",
      yesterday: "Вчера"
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
      title: "Избранное",
      addedTitle: "Добавлено в Избранное",
      addedDescription: "{{name}} было добавлено в избранное",
      addedFailedTitle: "Не удалось добавить в избранное",
      removedTitle: "Удалено из Избранного",
      removedDescription: "{{name}} было удалено из избранного",
      removedFailedTitle: "Не удалось удалить из избранного"
    },
    playlists: {
      title: "Песни",
      createdTitle: "Песня успешно создана",
      createdDescription: "{{name}} была создана",
      createdFailedTitle: "Не удалось создать песню",
      updatedTitle: "Песня успешно обновлена",
      updatedDescription: "{{name}} была обновлена",
      updatedFailedTitle: "Не удалось обновить песню",
      deletedTitle: "Песня успешно удалена",
      deletedDescription: "{{name}} была удалена",
      deletedFailedTitle: "Не удалось удалить песню"
    },
    artists: {
      title: "Артисты",
      createdTitle: "Артист успешно создан",
      createdDescription: "{{name}} был создан",
      createdFailedTitle: "Не удалось создать артиста",
      updatedTitle: "Артист успешно обновлен",
      updatedDescription: "{{name}} был обновлен",
      updatedFailedTitle: "Не удалось обновить артиста",
      deletedTitle: "Артист успешно удален",
      deletedDescription: "{{name}} был удален",
      deletedFailedTitle: "Не удалось удалить артиста"
    },
    settings: {
      title: "Настройки",
      theme: {
        title: "Theme",
        description: "Select your preferred appearance mode",
        light: "Light",
        dark: "Dark",
        system: "System"
      },
      language: {
        title: "Language",
        description: "Choose your preferred language"
      },
      sync: {
        title: "Sync",
        description: "Synchronize your data across devices"
      }
    }
  }
}
