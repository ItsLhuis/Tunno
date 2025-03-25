import Tr from "@assets/images/flags/tr.svg"

import { type Language } from "../types"

export const turkish: Language = {
  code: "tr",
  name: "Türkçe",
  flag: Tr,
  isRtl: false,
  translations: {
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
    settings: {
      title: "Ayarlar"
    }
  }
}
