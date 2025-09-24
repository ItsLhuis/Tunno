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
      hoursAgo: "{count} 小时前",
      today: "今天",
      yesterday: "昨天",
      goBack: "返回",
      goFoward: "前进",
      favorite: "收藏",
      unfavorite: "取消收藏",
      enableShuffle: "开启随机播放",
      disableShuffle: "关闭随机播放",
      previous: "上一首",
      play: "播放",
      pause: "暂停",
      next: "下一首",
      enableRepeat: "开启重复播放",
      enableRepeatOne: "开启单曲循环",
      disableRepeat: "关闭重复播放",
      mute: "静音",
      unmute: "取消静音",
      queue: "队列",
      title: "标题",
      album: "专辑",
      artist: "艺术家",
      date: "日期",
      duration: "时长",
      search: "搜索",
      selectAll: "全选",
      clear: "清除",
      cancel: "取消",
      more: "更多",
      select: "选择",
      preview: "预览",
      close: "关闭",
      playback: "播放",
      playNext: "播放下一首",
      actions: "操作",
      addTo: "添加到",
      playlist: "播放列表",
      lyrics: "歌词",
      openMiniplayer: "打开迷你播放器",
      enterFullScreen: "进入全屏",
      exitFullScreen: "退出全屏",
      goToAlbum: "转到专辑",
      goToArtist: "转到艺术家",
      shuffleAndPlay: "随机播放",
      unknown: "未知"
    },
    form: {
      titles: {
        createSong: "创建歌曲",
        updateSong: "更新歌曲",
        deleteSong: "删除歌曲",
        createArtist: "创建艺术家",
        updateArtist: "更新艺术家",
        deleteArtist: "删除艺术家",
        createPlaylist: "创建播放列表",
        updatePlaylist: "更新播放列表",
        deletePlaylist: "删除播放列表",
        confirmation: "确认",
        warning: "警告",
        lyricsPreview: "歌词预览"
      },
      labels: {
        name: "名称",
        thumbnail: "缩略图",
        file: "文件",
        releaseYear: "发行年份",
        album: "专辑",
        artists: "艺术家",
        folder: "文件夹",
        lyrics: "歌词"
      },
      buttons: {
        cancel: "取消",
        delete: "删除",
        update: "更新",
        create: "创建"
      },
      descriptions: {
        thumbnail: "背景图片（可选）",
        fileSize: "最大大小：{size}",
        supportedFormats: "支持的格式：{formats}",
        lyricsPreview: "预览歌词如何与时间同步"
      },
      badges: {
        lines: "{count} 行",
        duration: "时长：{time}"
      },
      messages: {
        confirmDelete: "确定要删除吗？",
        unsavedChanges: "有未保存的更改",
        noLyrics: "无歌词"
      }
    },
    validation: {
      name: {
        required: "名称为必填项",
        max: "名称最多 200 个字符"
      },
      file: {
        required: "文件为必填项",
        invalid: "文件无效或已损坏",
        max: "文件超过最大大小 {maxSize}"
      },
      duration: {
        required: "时长为必填项",
        min: "时长必须至少为 0"
      },
      releaseYear: {
        invalid: "发行年份无效",
        min: "发行年份必须至少为 0",
        max: "发行年份不能是未来时间"
      },
      albumId: {
        invalid: "专辑无效"
      },
      artists: {
        invalid: "无效的艺术家"
      }
    },
    update: {
      downloading: "正在下载并安装更新",
      downloadingDescription: "有新更新可用，正在自动安装",
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
      playlists: {
        title: "播放列表"
      },
      albums: {
        title: "专辑"
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
    home: {
      title: "首页"
    },
    songs: {
      title: "歌曲",
      createdTitle: "歌曲创建成功",
      createdDescription: "{name} 已创建",
      createdFailedTitle: "创建歌曲失败",
      updatedTitle: "歌曲更新成功",
      updatedDescription: "{name} 已更新",
      updatedFailedTitle: "更新歌曲失败",
      deletedTitle: "歌曲删除成功",
      deletedDescription: "{name} 已删除",
      deletedFailedTitle: "删除歌曲失败",
      filters: {
        title: "筛选",
        clear: "清除活动筛选器",
        sortBy: "排序方式",
        favorites: "仅收藏",
        favoritesDescription: "仅显示收藏的歌曲",
        lyrics: "有歌词",
        lyricsDescription: "仅显示有歌词的歌曲",
        releaseYear: "发行年份",
        duration: "时长",
        durationMin: "最小",
        durationMax: "最大",
        playCount: "播放次数",
        playCountMin: "最小",
        playCountMax: "最大",
        lastPlayed: "最后播放",
        lastPlayedAfter: "之后",
        lastPlayedBefore: "之前",
        selectDate: "选择日期",
        sortOptions: {
          name: "名称",
          duration: "时长",
          favorites: "收藏",
          year: "年份",
          playCount: "播放次数",
          lastPlayed: "最后播放",
          createdAt: "创建日期",
          updatedAt: "更新日期"
        }
      }
    },
    playlists: {
      title: "播放列表",
      createdTitle: "播放列表创建成功",
      createdDescription: "{name} 已创建",
      createdFailedTitle: "创建播放列表失败",
      updatedTitle: "播放列表更新成功",
      updatedDescription: "{name} 已更新",
      updatedFailedTitle: "更新播放列表失败",
      deletedTitle: "播放列表删除成功",
      deletedDescription: "{name} 已删除",
      deletedFailedTitle: "删除播放列表失败"
    },
    albums: {
      title: "专辑",
      createdTitle: "专辑创建成功",
      createdDescription: "{name} 已创建",
      createdFailedTitle: "创建专辑失败",
      updatedTitle: "专辑更新成功",
      updatedDescription: "{name} 已更新",
      updatedFailedTitle: "更新专辑失败",
      deletedTitle: "专辑删除成功",
      deletedDescription: "{name} 已删除",
      deletedFailedTitle: "删除专辑失败"
    },
    artists: {
      title: "艺术家",
      createdTitle: "艺术家创建成功",
      createdDescription: "{name} 已创建",
      createdFailedTitle: "创建艺术家失败",
      updatedTitle: "艺术家更新成功",
      updatedDescription: "{name} 已更新",
      updatedFailedTitle: "更新艺术家失败",
      deletedTitle: "艺术家删除成功",
      deletedDescription: "{name} 已删除",
      deletedFailedTitle: "删除艺术家失败"
    },
    favorites: {
      createdTitle: "已添加到收藏",
      createdDescription: "{name} 已添加到收藏",
      createdFailedTitle: "添加收藏失败",
      deletedTitle: "已从收藏中删除",
      deletedDescription: "{name} 已从收藏中删除",
      deletedFailedTitle: "删除收藏失败"
    },
    settings: {
      title: "设置",
      appearance: {
        title: "外观",
        description: "选择您偏好的外观模式",
        light: "浅色",
        dark: "深色",
        system: "系统"
      },
      language: {
        title: "语言",
        description: "选择您偏好的语言"
      },
      sync: {
        title: "同步",
        description: "在设备间同步您的数据"
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
