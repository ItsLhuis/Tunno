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
      hoursAgo: "{{count}} час{{count, plural, one {} few{а} many{ов} other{ов}}} назад",
      today: "Сегодня",
      yesterday: "Вчера",
      goBack: "Назад",
      goFoward: "Вперёд",
      favorite: "В избранное",
      unfavorite: "Удалить из избранного",
      enableShuffle: "Включить перемешивание",
      disableShuffle: "Выключить перемешивание",
      previous: "Предыдущий",
      play: "Воспроизвести",
      pause: "Пауза",
      next: "Следующий",
      enableRepeat: "Включить повтор",
      enableRepeatOne: "Включить повтор одного",
      disableRepeat: "Выключить повтор",
      mute: "Отключить звук",
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
      more: "Ещё"
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
        isSingle: "Это сингл"
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
        unsavedChanges: "Есть несохранённые изменения"
      }
    },
    validation: {
      name: {
        required: "Имя обязательно",
        max: "Имя должно быть не длиннее 200 символов"
      },
      file: {
        required: "Файл обязателен"
      },
      duration: {
        required: "Длительность обязательна",
        min: "Длительность должна быть не меньше 0"
      },
      releaseYear: {
        invalid: "Неверный год выпуска",
        min: "Год выпуска должен быть не меньше 0",
        max: "Год выпуска не может быть из будущего"
      },
      albumId: {
        invalid: "Неверный альбом",
        requiredIfNotSingle: "Альбом обязателен, если это не сингл"
      },
      artists: {
        min: "Требуется хотя бы один исполнитель"
      }
    },
    update: {
      downloading: "Загрузка и установка обновления",
      downloadingDescription: "Доступно новое обновление, оно устанавливается автоматически",
      installedSuccess: "Обновление успешно установлено",
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
      createdTitle: "Добавлено в избранное",
      createdDescription: "{{name}} была добавлена в избранное",
      createdFailedTitle: "Не удалось добавить в избранное",
      deletedTitle: "Удалено из избранного",
      deletedDescription: "{{name}} была удалена из избранного",
      deletedFailedTitle: "Не удалось удалить из избранного"
    },
    playlists: {
      title: "Плейлисты",
      createdTitle: "Плейлист успешно создан",
      createdDescription: "{{name}} был создан",
      createdFailedTitle: "Не удалось создать плейлист",
      updatedTitle: "Плейлист успешно обновлен",
      updatedDescription: "{{name}} был обновлен",
      updatedFailedTitle: "Не удалось обновить плейлист",
      deletedTitle: "Плейлист успешно удалён",
      deletedDescription: "{{name}} был удалён",
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
      deletedTitle: "Исполнитель успешно удалён",
      deletedDescription: "{{name}} был удалён",
      deletedFailedTitle: "Не удалось удалить исполнителя"
    },
    settings: {
      title: "Настройки",
      appearance: {
        title: "Внешний вид",
        description: "Выберите предпочитаемый режим отображения",
        light: "Светлый",
        dark: "Тёмный",
        system: "Системный"
      },
      language: {
        title: "Язык",
        description: "Выберите предпочитаемый язык"
      },
      sync: {
        title: "Синхронизация",
        description: "Синхронизируйте данные на всех устройствах"
      }
    },
    fastUpload: { title: "Быстрая загрузка" },
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
