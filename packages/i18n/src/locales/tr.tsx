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
    update: {
      downloading: "Güncelleme indiriliyor ve kuruluyor",
      downloadingDescription: "Yeni bir güncelleme mevcut ve otomatik olarak kuruluyor",
      installedSuccess: "Güncelleme başarıyla kuruldu",
      failed: "Güncelleme kurulumu başarısız oldu"
    },
    home: { title: "Home" },
    songs: {
      title: "Şarkılar",
      createdTitle: "Şarkı başarıyla oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Şarkı oluşturulamadı",
      updatedTitle: "Şarkı başarıyla güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Şarkı güncellenemedi",
      deletedTitle: "Şarkı başarıyla silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Şarkı silinemedi"
    },
    favorites: {
      title: "Favoriler",
      addedTitle: "Favorilere eklendi",
      addedDescription: "{{name}} favorilere eklendi",
      addedFailedTitle: "Favorilere eklenemedi",
      removedTitle: "Favorilerden kaldırıldı",
      removedDescription: "{{name}} favorilerden kaldırıldı",
      removedFailedTitle: "Favorilerden kaldırılamadı"
    },
    playlists: {
      title: "Çalma Listeleri",
      createdTitle: "Çalma listesi başarıyla oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Çalma listesi oluşturulamadı",
      updatedTitle: "Çalma listesi başarıyla güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Çalma listesi güncellenemedi",
      deletedTitle: "Çalma listesi başarıyla silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Çalma listesi silinemedi"
    },
    artists: {
      title: "Sanatçılar",
      createdTitle: "Sanatçı başarıyla oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Sanatçı oluşturulamadı",
      updatedTitle: "Sanatçı başarıyla güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Sanatçı güncellenemedi",
      deletedTitle: "Sanatçı başarıyla silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Sanatçı silinemedi"
    },
    settings: {
      title: "Ayarlar",
      theme: {
        title: "Tema",
        description: "Tercih ettiğiniz görünüm modunu seçin",
        light: "Açık",
        dark: "Koyu",
        system: "Sistem"
      },
      language: {
        title: "Dil",
        description: "Tercih ettiğiniz dili seçin"
      },
      sync: {
        title: "Senkronizasyon",
        description: "Verilerinizi cihazlar arasında senkronize edin"
      }
    }
  }
}
