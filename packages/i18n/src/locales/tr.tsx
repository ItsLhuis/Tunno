import Tr from "../assets/tr.svg"

import { type Language } from "../types"

export const turkish: Language = {
  code: "tr",
  name: "Türkçe",
  flag: Tr,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Sonuç bulunamadı",
      lessThanAnHourAgo: "Bir saatten az önce",
      hoursAgo: "{{count}} saat önce",
      today: "Bugün",
      yesterday: "Dün"
    },
    songs: {
      title: "Şarkılar",
      createdTitle: "Şarkı Başarıyla Oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Şarkı Oluşturulamadı",
      updatedTitle: "Şarkı Başarıyla Güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Şarkı Güncellenemedi",
      deletedTitle: "Şarkı Başarıyla Silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Şarkı Silinemedi"
    },
    favorites: {
      title: "Favoriler",
      addedTitle: "Favorilere Eklendi",
      addedDescription: "{{name}} favorilere eklendi",
      addedFailedTitle: "Favorilere Ekleme Başarısız",
      removedTitle: "Favorilerden Çıkarıldı",
      removedDescription: "{{name}} favorilerden çıkarıldı",
      removedFailedTitle: "Favorilerden Çıkarma Başarısız"
    },
    playlists: {
      title: "Şarkılar",
      createdTitle: "Şarkı Başarıyla Oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Şarkı Oluşturulamadı",
      updatedTitle: "Şarkı Başarıyla Güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Şarkı Güncellenemedi",
      deletedTitle: "Şarkı Başarıyla Silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Şarkı Silinemedi"
    },
    artists: {
      title: "Sanatçılar",
      createdTitle: "Sanatçı Başarıyla Oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Sanatçı Oluşturulamadı",
      updatedTitle: "Sanatçı Başarıyla Güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Sanatçı Güncellenemedi",
      deletedTitle: "Sanatçı Başarıyla Silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Sanatçı Silinemedi"
    },
    settings: {
      title: "Ayarlar",
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
