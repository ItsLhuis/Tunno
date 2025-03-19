import Zh from "@assets/images/flags/zh.svg"

import { type Language } from "../types"

export const chinese: Language = {
  code: "zh",
  name: "中文",
  flag: Zh,
  isRtl: false,
  translations: {
    songs: {
      title: "歌曲"
    },
    favorites: {
      title: "收藏"
    },
    playlists: {
      title: "播放列表"
    },
    artists: {
      title: "艺术家"
    },
    settings: {
      title: "设置"
    }
  }
}
