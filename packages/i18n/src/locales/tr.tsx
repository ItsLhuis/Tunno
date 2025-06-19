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
      yesterday: "Dün",
      goBack: "Geri",
      goFoward: "İleri",
      favorite: "Favori",
      unfavorite: "Favorilerden çıkar",
      enableShuffle: "Karıştırmayı etkinleştir",
      disableShuffle: "Karıştırmayı devre dışı bırak",
      previous: "Önceki",
      play: "Oynat",
      pause: "Duraklat",
      next: "Sonraki",
      enableRepeat: "Tekrarı etkinleştir",
      enableRepeatOne: "Bir kez tekrarla",
      disableRepeat: "Tekrarı devre dışı bırak",
      mute: "Sessize al",
      unmute: "Sesi aç",
      devices: "Cihazlar",
      queue: "Kuyruk"
    },
    update: {
      downloading: "Güncelleme indiriliyor ve kuruluyor",
      downloadingDescription: "Yeni bir güncelleme mevcut ve otomatik olarak kuruluyor",
      installedSuccess: "Güncelleme başarıyla kuruldu",
      failed: "Güncelleme kurulumu başarısız oldu"
    },
    breadcrumbs: {
      home: {
        title: "Ana Sayfa"
      },
      songs: {
        title: "Şarkılar"
      },
      favorites: {
        title: "Favoriler"
      },
      playlists: {
        title: "Çalma Listeleri"
      },
      artists: {
        title: "Sanatçılar"
      },
      fastUpload: {
        title: "Hızlı Yükleme"
      },
      settings: {
        title: "Ayarlar",
        appearance: {
          title: "Görünüm"
        },
        language: {
          title: "Dil"
        },
        sync: {
          title: "Senkronizasyon"
        }
      }
    },
    home: { title: "Ana Sayfa" },
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
      addedFailedTitle: "Favorilere Eklenemedi",
      removedTitle: "Favorilerden Kaldırıldı",
      removedDescription: "{{name}} favorilerden kaldırıldı",
      removedFailedTitle: "Favorilerden Kaldırılamadı"
    },
    playlists: {
      title: "Çalma Listeleri",
      createdTitle: "Çalma Listesi Başarıyla Oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Çalma Listesi Oluşturulamadı",
      updatedTitle: "Çalma Listesi Başarıyla Güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Çalma Listesi Güncellenemedi",
      deletedTitle: "Çalma Listesi Başarıyla Silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Çalma Listesi Silinemedi"
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
      appearance: {
        title: "Görünüm",
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
    },
    fastUpload: {
      title: "Hızlı Yükleme"
    },
    languages: {
      da: "Danca",
      de: "Almanca",
      en: "İngilizce",
      es: "İspanyolca",
      fi: "Fince",
      fr: "Fransızca",
      hi: "Hintçe",
      it: "İtalyanca",
      ja: "Japonca",
      ko: "Korece",
      nl: "Hollandaca",
      no: "Norveççe",
      pl: "Lehçe",
      pt: "Portekizce",
      ru: "Rusça",
      sv: "İsveççe",
      tr: "Türkçe",
      uk: "Ukraynaca",
      vi: "Vietnamca",
      zh: "Çince"
    }
  }
}
