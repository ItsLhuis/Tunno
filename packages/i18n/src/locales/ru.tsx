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
      hoursAgo: "{{count}} час{{count, plural, one {} other{а}}} назад",
      today: "Сегодня",
      yesterday: "Вчера"
    },
    update: {
      downloading: "Загрузка и установка обновления",
      downloadingDescription: "Доступно новое обновление и оно устанавливается автоматически",
      installedSuccess: "Обновление успешно установлено",
      failed: "Не удалось установить обновление"
    },
    home: { title: "Home" },
    songs: {
      title: "Песни",
      createdTitle: "Песня успешно создана",
      createdDescription: "{{name}} создана",
      createdFailedTitle: "Не удалось создать песню",
      updatedTitle: "Песня успешно обновлена",
      updatedDescription: "{{name}} обновлена",
      updatedFailedTitle: "Не удалось обновить песню",
      deletedTitle: "Песня успешно удалена",
      deletedDescription: "{{name}} удалена",
      deletedFailedTitle: "Не удалось удалить песню"
    },
    favorites: {
      title: "Избранное",
      addedTitle: "Добавлено в избранное",
      addedDescription: "{{name}} добавлен в избранное",
      addedFailedTitle: "Не удалось добавить в избранное",
      removedTitle: "Удалено из избранного",
      removedDescription: "{{name}} удален из избранного",
      removedFailedTitle: "Не удалось удалить из избранного"
    },
    playlists: {
      title: "Плейлисты",
      createdTitle: "Плейлист успешно создан",
      createdDescription: "{{name}} создан",
      createdFailedTitle: "Не удалось создать плейлист",
      updatedTitle: "Плейлист успешно обновлен",
      updatedDescription: "{{name}} обновлен",
      updatedFailedTitle: "Не удалось обновить плейлист",
      deletedTitle: "Плейлист успешно удален",
      deletedDescription: "{{name}} удален",
      deletedFailedTitle: "Не удалось удалить плейлист"
    },
    artists: {
      title: "Исполнители",
      createdTitle: "Исполнитель успешно создан",
      createdDescription: "{{name}} создан",
      createdFailedTitle: "Не удалось создать исполнителя",
      updatedTitle: "Исполнитель успешно обновлен",
      updatedDescription: "{{name}} обновлен",
      updatedFailedTitle: "Не удалось обновить исполнителя",
      deletedTitle: "Исполнитель успешно удален",
      deletedDescription: "{{name}} удален",
      deletedFailedTitle: "Не удалось удалить исполнителя"
    },
    settings: {
      title: "Настройки",
      theme: {
        title: "Тема",
        description: "Выберите предпочитаемый режим отображения",
        light: "Светлая",
        dark: "Темная",
        system: "Системная"
      },
      language: {
        title: "Язык",
        description: "Выберите предпочитаемый язык"
      },
      sync: {
        title: "Синхронизация",
        description: "Синхронизируйте данные между устройствами"
      }
    }
  }
}
