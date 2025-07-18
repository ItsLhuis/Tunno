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
      yesterday: "Вчера",
      goBack: "Назад",
      goFoward: "Вперёд",
      favorite: "Избранное",
      unfavorite: "Удалить из избранного",
      enableShuffle: "Включить случайное воспроизведение",
      disableShuffle: "Отключить случайное воспроизведение",
      previous: "Предыдущий",
      play: "Воспроизвести",
      pause: "Пауза",
      next: "Следующий",
      enableRepeat: "Включить повтор",
      enableRepeatOne: "Повторить один раз",
      disableRepeat: "Отключить повтор",
      mute: "Без звука",
      unmute: "Включить звук",
      queue: "Очередь",
      title: "Название",
      album: "Альбом",
      date: "Дата",
      duration: "Длительность",
      search: "Поиск"
    },
    validation: {
      name: {
        required: "Имя обязательно",
        max: "Имя должно содержать не более 200 символов"
      },
      file: {
        required: "Файл обязателен",
        max: "Файл должен содержать не более 50 символов"
      },
      thumbnail: {
        max: "Миниатюра должна содержать не более 50 символов"
      },
      duration: {
        required: "Длительность обязательна",
        min: "Длительность должна быть не менее 0"
      },
      releaseYear: {
        invalid: "Недопустимый год выпуска",
        min: "Год выпуска должен быть не менее 0",
        max: "Год выпуска не может быть в будущем"
      },
      albumId: {
        invalid: "Недопустимый альбом",
        requiredIfNotSingle: "Альбом обязателен, если это не сингл"
      }
    },
    update: {
      downloading: "Загрузка и установка обновления",
      downloadingDescription: "Доступно новое обновление и оно устанавливается автоматически",
      installedSuccess: "Обновление успешно установлено",
      failed: "Не удалось установить обновление"
    },
    breadcrumbs: {
      home: {
        title: "Главная"
      },
      songs: {
        title: "Песни"
      },
      favorites: {
        title: "Избранное"
      },
      playlists: {
        title: "Плейлисты"
      },
      artists: {
        title: "Исполнители"
      },
      fastUpload: {
        title: "Быстрая загрузка"
      },
      settings: {
        title: "Настройки",
        appearance: {
          title: "Внешний вид"
        },
        language: {
          title: "Язык"
        },
        sync: {
          title: "Синхронизация"
        }
      }
    },
    home: { title: "Главная" },
    songs: {
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
    favorites: {
      title: "Избранное",
      addedTitle: "Добавлено в избранное",
      addedDescription: "{{name}} добавлено в избранное",
      addedFailedTitle: "Не удалось добавить в избранное",
      removedTitle: "Удалено из избранного",
      removedDescription: "{{name}} удалено из избранного",
      removedFailedTitle: "Не удалось удалить из избранного"
    },
    playlists: {
      title: "Плейлисты",
      createdTitle: "Плейлист успешно создан",
      createdDescription: "{{name}} был создан",
      createdFailedTitle: "Не удалось создать плейлист",
      updatedTitle: "Плейлист успешно обновлен",
      updatedDescription: "{{name}} был обновлен",
      updatedFailedTitle: "Не удалось обновить плейлист",
      deletedTitle: "Плейлист успешно удален",
      deletedDescription: "{{name}} был удален",
      deletedFailedTitle: "Не удалось удалить плейлист"
    },
    artists: {
      title: "Исполнители",
      createdTitle: "Исполнитель успешно создан",
      createdDescription: "{{name}} был создан",
      createdFailedTitle: "Не удалось создать исполнителя",
      updatedTitle: "Исполнитель успешно обновлен",
      updatedDescription: "{{name}} был обновлен",
      updatedFailedTitle: "Не удалось обновить исполнителя",
      deletedTitle: "Исполнитель успешно удален",
      deletedDescription: "{{name}} был удален",
      deletedFailedTitle: "Не удалось удалить исполнителя"
    },
    settings: {
      title: "Настройки",
      appearance: {
        title: "Внешний вид",
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
    },
    fastUpload: {
      title: "Быстрая загрузка"
    },
    languages: {
      da: "Датский",
      de: "Немецкий",
      en: "Английский",
      es: "Испанский",
      fi: "Финский",
      fr: "Французский",
      hi: "Хинди",
      it: "Итальянский",
      ja: "Японский",
      ko: "Корейский",
      nl: "Голландский",
      no: "Норвежский",
      pl: "Польский",
      pt: "Португальский",
      ru: "Русский",
      sv: "Шведский",
      tr: "Турецкий",
      uk: "Украинский",
      vi: "Вьетнамский",
      zh: "Китайский"
    }
  }
}
