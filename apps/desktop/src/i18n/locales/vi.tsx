import Vi from "@assets/images/flags/vi.svg"

import { type Language } from "../types"

export const vietnamese: Language = {
  code: "vi",
  name: "Tiếng Việt",
  flag: Vi,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Không tìm thấy kết quả"
    },
    songs: {
      title: "Bài hát"
    },
    favorites: {
      title: "Yêu thích"
    },
    playlists: {
      title: "Danh sách phát"
    },
    artists: {
      title: "Nghệ sĩ"
    },
    settings: {
      title: "Cài đặt"
    }
  }
}
