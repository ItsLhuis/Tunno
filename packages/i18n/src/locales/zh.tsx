import Zh from "../assets/zh.svg"

import { type Language } from "../types"

export const chinese: Language = {
  code: "zh",
  name: "中文",
  flag: Zh,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "未找到结果",
      lessThanAnHourAgo: "不到一个小时前",
      hoursAgo: "{{count}} 小时前",
      today: "今天",
      yesterday: "昨天"
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
      title: "收藏",
      addedTitle: "已添加到收藏",
      addedDescription: "{{name}} 已添加到收藏",
      addedFailedTitle: "无法添加到收藏",
      removedTitle: "已从收藏中删除",
      removedDescription: "{{name}} 已从收藏中删除",
      removedFailedTitle: "无法从收藏中删除"
    },
    playlists: {
      title: "播放列表",
      createdTitle: "歌曲创建成功",
      createdDescription: "{{name}} 已创建",
      createdFailedTitle: "无法创建歌曲",
      updatedTitle: "歌曲更新成功",
      updatedDescription: "{{name}} 已更新",
      updatedFailedTitle: "无法更新歌曲",
      deletedTitle: "歌曲删除成功",
      deletedDescription: "{{name}} 已删除",
      deletedFailedTitle: "无法删除歌曲"
    },
    artists: {
      title: "艺术家",
      createdTitle: "艺术家创建成功",
      createdDescription: "{{name}} 已创建",
      createdFailedTitle: "无法创建艺术家",
      updatedTitle: "艺术家更新成功",
      updatedDescription: "{{name}} 已更新",
      updatedFailedTitle: "无法更新艺术家",
      deletedTitle: "艺术家删除成功",
      deletedDescription: "{{name}} 已删除",
      deletedFailedTitle: "无法删除艺术家"
    },
    settings: {
      title: "设置"
    }
  }
}
