import Zh from "@assets/images/flags/zh.svg"

import { type Language } from "../types"

export const chinese: Language = {
  code: "zh",
  name: "中文",
  flag: Zh,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "未找到结果"
    },
    songs: {
      title: "歌曲",
      createdTitle: "歌曲创建成功",
      createdDescription: "{{name}} 已创建",
      createdFailedTitle: "歌曲创建失败",
      updatedTitle: "歌曲更新成功",
      updatedDescription: "{{name}} 已更新",
      updatedFailedTitle: "歌曲更新失败",
      deletedTitle: "歌曲删除成功",
      deletedDescription: "{{name}} 已删除",
      deletedFailedTitle: "歌曲删除失败"
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
