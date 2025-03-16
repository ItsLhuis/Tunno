import ko from "@assets/images/flags/ko.svg"

import { type Language } from "../types"

export const korean: Language = {
  code: "ko",
  name: "한국어",
  flag: ko,
  isRtl: false,
  translations: {
    songs: {
      title: "노래"
    },
    favorites: {
      title: "즐겨찾기"
    },
    playlists: {
      title: "재생 목록"
    },
    artists: {
      title: "아티스트"
    },
    settings: {
      title: "설정"
    }
  }
}
