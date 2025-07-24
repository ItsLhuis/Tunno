import Ru from "../assets/ru.svg"

import { type Language } from "../types"

export const russian: Language = {
  code: "ru",
  name: "Русский",
  flag: Ru,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ничего не найдено",
      lessThanAnHourAgo: "Меньше часа назад",
      hoursAgo: "{{count}} час назад",
      today: "Сегодня",
      yesterday: "Вчера",
      goBack: "Назад",
      goFoward: "Вперёд",
      favorite: "Избранное",
      unfavorite: "Убрать из избранного",
      enableShuffle: "Включить случайное воспроизведение",
      disableShuffle: "Отключить случайное воспроизведение",
      previous: "Предыдущий",
      play: "Воспроизвести",
      pause: "Пауза",
      next: "Следующий",
      enableRepeat: "Включить повтор",
      enableRepeatOne: "Повтор одного",
      disableRepeat: "Отключить повтор",
      mute: "Выключить звук",
      unmute: "Включить звук",
      queue: "Очередь",
      title: "Название",
      album: "Альбом",
      date: "Дата",
      duration: "Длительность",
      search: "Поиск",
      selectAll: "Выбрать всё",
      visibility: "Видимость",
      columns: "Колонки",
      clear: "Очистить",
      cancel: "Отмена",
      more: "Больше",
      select: "Выбрать"
    },
    form: {
      titles: {
        createSong: "Создать песню",
        updateSong: "Обновить песню",
        deleteSong: "Удалить песню",
        createArtist: "Создать исполнителя",
        updateArtist: "Обновить исполнителя",
        deleteArtist: "Удалить исполнителя",
        createPlaylist: "Создать плейлист",
        updatePlaylist: "Обновить плейлист",
        deletePlaylist: "Удалить плейлист",
        confirmation: "Подтверждение",
        warning: "Предупреждение"
      },
      labels: {
        name: "Имя",
        thumbnail: "Миниатюра",
        file: "Файл",
        releaseYear: "Год выпуска",
        album: "Альбом",
        artists: "Исполнители",
        isSingle: "Это сингл",
        folder: "Папка"
      },
      buttons: {
        cancel: "Отмена",
        delete: "Удалить",
        update: "Обновить",
        create: "Создать"
      },
      descriptions: {
        thumbnail: "Фоновое изображение (необязательно)",
        fileSize: "Максимальный размер: {{size}}",
        supportedFormats: "Поддерживаемые форматы: {{formats}}"
      },
      messages: {
        confirmDelete: "Вы уверены, что хотите удалить?",
        unsavedChanges: "У вас есть несохранённые изменения"
      }
    },
    validation: {
      name: {
        required: "Имя обязательно",
        max: "Имя не должно превышать 200 символов"
      },
      file: {
        required: "Файл обязателен",
        invalid: "Файл недействителен или повреждён",
        max: "Файл превышает максимальный размер {{maxSize}}"
      },
      duration: {
        required: "Длительность обязательна",
        min: "Длительность должна быть больше 0"
      },
      releaseYear: {
        invalid: "Недопустимый год",
        min: "Год должен быть больше 0",
        max: "Год не может быть в будущем"
      },
      albumId: {
        invalid: "Недопустимый альбом",
        requiredIfNotSingle: "Альбом обязателен, если это не сингл"
      },
      artists: {
        min: "Необходимо указать хотя бы одного исполнителя"
      }
    },
    update: {
      downloading: "Загрузка и установка обновления",
      downloadingDescription: "Доступно новое обновление, установка началась автоматически",
      installedSuccess: "Обновление установлено",
      failed: "Не удалось установить обновление"
    },
    breadcrumbs: {
      home: { title: "Главная" },
      songs: { title: "Песни" },
      favorites: { title: "Избранное" },
      playlists: { title: "Плейлисты" },
      artists: { title: "Исполнители" },
      fastUpload: { title: "Быстрая загрузка" },
      settings: {
        title: "Настройки",
        appearance: { title: "Внешний вид" },
        language: { title: "Язык" },
        sync: { title: "Синхронизация" }
      }
    },
    home: { title: "Главная" },
    songs: {
      title: "Песни",
      createdTitle: "Песня добавлена",
      createdDescription: "{{name}} добавлена",
      createdFailedTitle: "Не удалось добавить песню",
      updatedTitle: "Песня обновлена",
      updatedDescription: "{{name}} обновлена",
      updatedFailedTitle: "Не удалось обновить песню",
      deletedTitle: "Песня удалена",
      deletedDescription: "{{name}} удалена",
      deletedFailedTitle: "Не удалось удалить песню"
    },
    favorites: {
      title: "Избранное",
      createdTitle: "Добавлено в избранное",
      createdDescription: "{{name}} добавлено в избранное",
      createdFailedTitle: "Не удалось добавить в избранное",
      deletedTitle: "Удалено из избранного",
      deletedDescription: "{{name}} удалено из избранного",
      deletedFailedTitle: "Не удалось удалить из избранного"
    },
    playlists: {
      title: "Плейлисты",
      createdTitle: "Плейлист создан",
      createdDescription: "{{name}} создан",
      createdFailedTitle: "Не удалось создать плейлист",
      updatedTitle: "Плейлист обновлён",
      updatedDescription: "{{name}} обновлён",
      updatedFailedTitle: "Не удалось обновить плейлист",
      deletedTitle: "Плейлист удалён",
      deletedDescription: "{{name}} удалён",
      deletedFailedTitle: "Не удалось удалить плейлист"
    },
    artists: {
      title: "Исполнители",
      createdTitle: "Исполнитель добавлен",
      createdDescription: "{{name}} добавлен",
      createdFailedTitle: "Не удалось добавить исполнителя",
      updatedTitle: "Исполнитель обновлён",
      updatedDescription: "{{name}} обновлён",
      updatedFailedTitle: "Не удалось обновить исполнителя",
      deletedTitle: "Исполнитель удалён",
      deletedDescription: "{{name}} удалён",
      deletedFailedTitle: "Не удалось удалить исполнителя"
    },
    settings: {
      title: "Настройки",
      appearance: {
        title: "Внешний вид",
        description: "Выберите предпочтительную тему",
        light: "Светлая",
        dark: "Тёмная",
        system: "Системная"
      },
      language: {
        title: "Язык",
        description: "Выберите предпочитаемый язык"
      },
      sync: {
        title: "Синхронизация",
        description: "Синхронизация данных между устройствами"
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
      nl: "Нидерландский",
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
