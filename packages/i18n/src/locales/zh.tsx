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
      lessThanAnHourAgo: "不到一小时前",
      hoursAgo: "{{count}}小时前",
      today: "今天",
      yesterday: "昨天"
    },
    update: {
      downloading: "正在下载并安装更新",
      downloadingDescription: "有新的更新可用，正在自动安装",
      installedSuccess: "更新安装成功",
      failed: "更新安装失败"
    },
    breadcrumbs: {
      home: {
        title: "首页"
      },
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
      fastUpload: {
        title: "快速上传"
      },
      settings: {
        title: "设置",
        appearance: {
          title: "外观"
        },
        language: {
          title: "语言"
        },
        sync: {
          title: "同步"
        }
      }
    },
    home: { title: "首页" },
    songs: {
      title: "歌曲",
      createdTitle: "歌曲创建成功",
      createdDescription: "{{name}}已创建",
      createdFailedTitle: "创建歌曲失败",
      updatedTitle: "歌曲更新成功",
      updatedDescription: "{{name}}已更新",
      updatedFailedTitle: "更新歌曲失败",
      deletedTitle: "歌曲删除成功",
      deletedDescription: "{{name}}已删除",
      deletedFailedTitle: "删除歌曲失败"
    },
    favorites: {
      title: "收藏",
      addedTitle: "已添加到收藏",
      addedDescription: "{{name}}已添加到收藏",
      addedFailedTitle: "添加到收藏失败",
      removedTitle: "已从收藏中移除",
      removedDescription: "{{name}}已从收藏中移除",
      removedFailedTitle: "从收藏中移除失败"
    },
    playlists: {
      title: "播放列表",
      createdTitle: "播放列表创建成功",
      createdDescription: "{{name}}已创建",
      createdFailedTitle: "创建播放列表失败",
      updatedTitle: "播放列表更新成功",
      updatedDescription: "{{name}}已更新",
      updatedFailedTitle: "更新播放列表失败",
      deletedTitle: "播放列表删除成功",
      deletedDescription: "{{name}}已删除",
      deletedFailedTitle: "删除播放列表失败"
    },
    artists: {
      title: "艺术家",
      createdTitle: "艺术家创建成功",
      createdDescription: "{{name}}已创建",
      createdFailedTitle: "创建艺术家失败",
      updatedTitle: "艺术家更新成功",
      updatedDescription: "{{name}}已更新",
      updatedFailedTitle: "更新艺术家失败",
      deletedTitle: "艺术家删除成功",
      deletedDescription: "{{name}}已删除",
      deletedFailedTitle: "删除艺术家失败"
    },
    settings: {
      title: "设置",
      appearance: {
        title: "外观",
        description: "选择您喜欢的显示模式",
        light: "浅色",
        dark: "深色",
        system: "系统"
      },
      language: {
        title: "语言",
        description: "选择您喜欢的语言"
      },
      sync: {
        title: "同步",
        description: "在设备之间同步您的数据"
      }
    },
    fastUpload: {
      title: "快速上传"
    },
    languages: {
      da: "丹麦语",
      de: "德语",
      en: "英语",
      es: "西班牙语",
      fi: "芬兰语",
      fr: "法语",
      hi: "印地语",
      it: "意大利语",
      ja: "日语",
      ko: "韩语",
      nl: "荷兰语",
      no: "挪威语",
      pl: "波兰语",
      pt: "葡萄牙语",
      ru: "俄语",
      sv: "瑞典语",
      tr: "土耳其语",
      uk: "乌克兰语",
      vi: "越南语",
      zh: "中文"
    }
  }
}
