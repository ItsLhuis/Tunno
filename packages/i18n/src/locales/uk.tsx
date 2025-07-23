import Uk from "../assets/uk.svg"

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
      hoursAgo: "{{count}} годину{{count, plural, one {} few{и} many{} other{}}} тому",
      today: "Сьогодні",
      yesterday: "Вчора",
      goBack: "Назад",
      goFoward: "Вперед",
      favorite: "Улюблене",
      unfavorite: "Видалити з улюблених",
      enableShuffle: "Увімкнути випадковий порядок",
      disableShuffle: "Вимкнути випадковий порядок",
      previous: "Попередній",
      play: "Відтворити",
      pause: "Пауза",
      next: "Наступний",
      enableRepeat: "Увімкнути повтор",
      enableRepeatOne: "Увімкнути повтор одного",
      disableRepeat: "Вимкнути повтор",
      mute: "Вимкнути звук",
      unmute: "Увімкнути звук",
      queue: "Черга",
      title: "Назва",
      album: "Альбом",
      date: "Дата",
      duration: "Тривалість",
      search: "Пошук",
      selectAll: "Вибрати всі",
      visibility: "Видимість",
      columns: "Стовпці",
      clear: "Очистити",
      cancel: "Скасувати",
      more: "Більше"
    },
    form: {
      titles: {
        createSong: "Створити пісню",
        updateSong: "Оновити пісню",
        deleteSong: "Видалити пісню",
        createArtist: "Створити виконавця",
        updateArtist: "Оновити виконавця",
        deleteArtist: "Видалити виконавця",
        createPlaylist: "Створити плейлист",
        updatePlaylist: "Оновити плейлист",
        deletePlaylist: "Видалити плейлист",
        confirmation: "Підтвердження",
        warning: "Попередження"
      },
      labels: {
        name: "Ім'я",
        thumbnail: "Мініатюра",
        file: "Файл",
        releaseYear: "Рік випуску",
        album: "Альбом",
        artists: "Виконавці",
        isSingle: "Є синглом"
      },
      buttons: {
        cancel: "Скасувати",
        delete: "Видалити",
        update: "Оновити",
        create: "Створити"
      },
      descriptions: {
        thumbnail: "Фонове зображення (необов’язково)",
        dragAndDrop: "Перетягніть файл сюди",
        fileSize: "Максимальний розмір: {{size}}",
        supportedFormats: "Підтримувані формати: {{formats}}"
      },
      messages: {
        confirmDelete: "Ви впевнені, що хочете видалити?",
        unsavedChanges: "Є незбережені зміни"
      }
    },
    validation: {
      name: {
        required: "Ім'я є обов’язковим",
        max: "Ім'я має бути не більше 200 символів"
      },
      file: {
        required: "Файл є обов’язковим"
      },
      duration: {
        required: "Тривалість є обов’язковою",
        min: "Тривалість має бути не менше 0"
      },
      releaseYear: {
        invalid: "Неправильний рік випуску",
        min: "Рік випуску має бути не менше 0",
        max: "Рік випуску не може бути у майбутньому"
      },
      albumId: {
        invalid: "Неправильний альбом",
        requiredIfNotSingle: "Альбом є обов’язковим, якщо це не сингл"
      },
      artists: {
        min: "Потрібен щонайменше один виконавець"
      }
    },
    update: {
      downloading: "Завантаження та встановлення оновлення",
      downloadingDescription: "Доступне нове оновлення, яке встановлюється автоматично",
      installedSuccess: "Оновлення успішно встановлено",
      failed: "Не вдалося встановити оновлення"
    },
    breadcrumbs: {
      home: { title: "Головна" },
      songs: { title: "Пісні" },
      favorites: { title: "Улюблене" },
      playlists: { title: "Плейлисти" },
      artists: { title: "Виконавці" },
      fastUpload: { title: "Швидке завантаження" },
      settings: {
        title: "Налаштування",
        appearance: { title: "Зовнішній вигляд" },
        language: { title: "Мова" },
        sync: { title: "Синхронізація" }
      }
    },
    home: { title: "Головна" },
    songs: {
      title: "Пісні",
      createdTitle: "Пісня успішно створена",
      createdDescription: "{{name}} було створено",
      createdFailedTitle: "Не вдалося створити пісню",
      updatedTitle: "Пісня успішно оновлена",
      updatedDescription: "{{name}} було оновлено",
      updatedFailedTitle: "Не вдалося оновити пісню",
      deletedTitle: "Пісня успішно видалена",
      deletedDescription: "{{name}} було видалено",
      deletedFailedTitle: "Не вдалося видалити пісню"
    },
    favorites: {
      title: "Улюблене",
      createdTitle: "Додано до улюбленого",
      createdDescription: "{{name}} було додано до улюбленого",
      createdFailedTitle: "Не вдалося додати до улюбленого",
      deletedTitle: "Видалено з улюбленого",
      deletedDescription: "{{name}} було видалено з улюбленого",
      deletedFailedTitle: "Не вдалося видалити з улюбленого"
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
      createdTitle: "Виконавець успішно створений",
      createdDescription: "{{name}} було створено",
      createdFailedTitle: "Не вдалося створити виконавця",
      updatedTitle: "Виконавець успішно оновлений",
      updatedDescription: "{{name}} було оновлено",
      updatedFailedTitle: "Не вдалося оновити виконавця",
      deletedTitle: "Виконавець успішно видалений",
      deletedDescription: "{{name}} було видалено",
      deletedFailedTitle: "Не вдалося видалити виконавця"
    },
    settings: {
      title: "Налаштування",
      appearance: {
        title: "Зовнішній вигляд",
        description: "Оберіть бажаний режим зовнішнього вигляду",
        light: "Світлий",
        dark: "Темний",
        system: "Система"
      },
      language: {
        title: "Мова",
        description: "Оберіть бажану мову"
      },
      sync: {
        title: "Синхронізація",
        description: "Синхронізуйте свої дані між пристроями"
      }
    },
    fastUpload: { title: "Швидке завантаження" },
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
      vi: "В’єтнамська",
      zh: "Китайська"
    }
  }
}
