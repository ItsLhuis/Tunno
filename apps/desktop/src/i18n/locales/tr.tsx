import Tr from "@assets/images/flags/tr.svg"

import { type Language } from "../types"

export const turkish: Language = {
  code: "tr",
  name: "Türkçe",
  flag: Tr,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Sonuç bulunamadı"
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
      title: "Favoriler"
    },
    playlists: {
      title: "Çalma Listeleri"
    },
    artists: {
      title: "Sanatçılar"
    },
    settings: {
      title: "Ayarlar"
    }
  }
}
