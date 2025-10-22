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
      years: "{count}年",
      weeks: "{count}周",
      days: "{count}天",
      hours: "{count}小时",
      minutes: "{count}分钟",
      seconds: "{count}秒",
      goBack: "返回",
      goForward: "前进",
      favorite: "添加到收藏",
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
      added: "已添加",
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
      removeFromQueue: "从队列中移除",
      nowPlaying: "正在播放",
      upNext: "接下来",
      actions: "操作",
      addTo: "添加到",
      playlist: "歌单",
      song: "歌曲",
      lyrics: "歌词",
      openMiniplayer: "打开迷你播放器",
      enterFullScreen: "进入全屏",
      exitFullScreen: "退出全屏",
      goToSong: "转到歌曲",
      goToAlbum: "转到专辑",
      goToPlaylist: "转到歌单",
      goToArtist: "转到艺术家",
      shuffleAndPlay: "随机播放",
      unknown: "未知",
      unknownAlbum: "未知专辑",
      unknownArtist: "未知艺术家",
      listenTime: "收听时间",
      averageListenTime: "平均收听时间",
      retentionRate: "留存率",
      totalPlays: "总播放次数",
      lastPlayed: "最后播放",
      neverPlayed: "从未播放",
      streak: "连续",
      refresh: "刷新",
      showingOfTotal: "显示 {showing}/{total}"
    },
    form: {
      titles: {
        createSong: "创建歌曲",
        updateSong: "更新歌曲",
        deleteSong: "删除歌曲",
        createArtist: "创建艺术家",
        updateArtist: "更新艺术家",
        deleteArtist: "删除艺术家",
        createAlbum: "创建专辑",
        updateAlbum: "更新专辑",
        deleteAlbum: "删除专辑",
        createPlaylist: "创建歌单",
        updatePlaylist: "更新歌单",
        deletePlaylist: "删除歌单",
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
        albumType: "专辑类型",
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
      },
      albumType: {
        invalid: "无效的专辑类型"
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
        title: "歌单"
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
        equalizer: {
          title: "均衡器"
        },
        sync: {
          title: "同步"
        }
      }
    },
    home: {
      title: "首页",
      jumpBackIn: {
        title: "继续播放",
        description: "从上次停止的地方继续"
      },
      yourPlaylists: {
        title: "为你推荐",
        description: "你的个人播放列表"
      },
      onRepeat: {
        title: "循环播放",
        description: "你停不下来的歌曲"
      },
      newReleases: {
        title: "新歌发布",
        description: "你关注的艺术家发布的新歌"
      },
      favoriteArtists: {
        title: "你的艺术家",
        description: "你最喜爱的艺术家"
      },
      topAlbums: {
        title: "热门专辑",
        description: "你播放最多的专辑"
      },
      recentlyAdded: {
        title: "最近添加",
        description: "最近添加到你的音乐库"
      },
      hiddenGems: {
        title: "隐藏的宝石",
        description: "重新发现被遗忘的收藏"
      },
      discover: {
        title: "发现",
        description: "为你推荐的新音乐"
      },
      yourStats: {
        title: "你的音乐",
        description: "你的收听统计和洞察"
      }
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
      title: "歌单",
      createdTitle: "歌单创建成功",
      createdDescription: "{name} 已创建",
      createdFailedTitle: "创建歌单失败",
      updatedTitle: "歌单更新成功",
      updatedDescription: "{name} 已更新",
      updatedFailedTitle: "更新歌单失败",
      deletedTitle: "歌单删除成功",
      deletedDescription: "{name} 已删除",
      deletedFailedTitle: "删除歌单失败",
      filters: {
        title: "筛选器",
        clear: "清除活动筛选器",
        sortBy: "排序方式",
        favorites: "仅收藏",
        favoritesDescription: "仅显示收藏歌单",
        playCount: "播放次数",
        playCountMin: "最小播放次数",
        playCountMax: "最大播放次数",
        totalTracks: "总曲目数",
        totalTracksMin: "最小曲目数",
        totalTracksMax: "最大曲目数",
        totalDuration: "总时长",
        totalDurationMin: "最小时长",
        totalDurationMax: "最大时长",
        lastPlayed: "最后播放",
        lastPlayedAfter: "之后",
        lastPlayedBefore: "之前",
        selectDate: "选择日期",
        sortOptions: {
          name: "名称",
          favorites: "收藏",
          playCount: "播放次数",
          totalTracks: "总曲目数",
          totalDuration: "总时长",
          lastPlayed: "最后播放",
          createdAt: "创建日期",
          updatedAt: "更新日期"
        }
      }
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
      deletedFailedTitle: "删除专辑失败",
      filters: {
        title: "筛选器",
        clear: "清除活动筛选器",
        sortBy: "排序方式",
        favorites: "仅收藏",
        favoritesDescription: "仅显示收藏专辑",
        albumType: "专辑类型",
        all: "所有类型",
        single: "单曲",
        album: "专辑",
        compilation: "合辑",
        releaseYear: "发行年份",
        releaseYearMin: "最小年份",
        releaseYearMax: "最大年份",
        playCount: "播放次数",
        playCountMin: "最小播放次数",
        playCountMax: "最大播放次数",
        totalTracks: "总曲目数",
        totalTracksMin: "最小曲目数",
        totalTracksMax: "最大曲目数",
        totalDuration: "总时长",
        totalDurationMin: "最小时长",
        totalDurationMax: "最大时长",
        lastPlayed: "最后播放",
        lastPlayedAfter: "播放于之后",
        lastPlayedBefore: "播放于之前",
        selectDate: "选择日期",
        sortOptions: {
          name: "名称",
          releaseYear: "发行年份",
          favorites: "收藏",
          playCount: "播放次数",
          totalTracks: "总曲目数",
          totalDuration: "总时长",
          lastPlayed: "最后播放",
          createdAt: "创建时间",
          updatedAt: "更新时间"
        }
      }
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
      deletedFailedTitle: "删除艺术家失败",
      filters: {
        title: "过滤器",
        clear: "清除活动过滤器",
        sortBy: "排序方式",
        favorites: "仅收藏",
        favoritesDescription: "仅显示收藏的艺术家",
        playCount: "播放次数",
        playCountMin: "最小值",
        playCountMax: "最大值",
        totalTracks: "总歌曲数",
        totalTracksMin: "最小值",
        totalTracksMax: "最大值",
        totalDuration: "总时长",
        totalDurationMin: "最小值",
        totalDurationMax: "最大值",
        lastPlayed: "最后播放",
        lastPlayedAfter: "之后",
        lastPlayedBefore: "之前",
        selectDate: "选择日期",
        sortOptions: {
          name: "名称",
          favorites: "收藏",
          playCount: "播放次数",
          totalTracks: "总歌曲数",
          totalDuration: "总时长",
          lastPlayed: "最后播放",
          createdAt: "创建日期",
          updatedAt: "更新日期"
        }
      }
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
      equalizer: {
        title: "均衡器",
        enable: {
          title: "启用均衡器",
          description: "启用或禁用音频均衡器",
          enabled: "已启用",
          disabled: "已禁用"
        },
        presets: {
          title: "均衡器预设",
          description: "从预定义的均衡器设置中选择",
          flat: {
            label: "平坦",
            description: "无调整"
          },
          rock: {
            label: "摇滚",
            description: "增强的低音和高音"
          },
          pop: {
            label: "流行",
            description: "平衡并带有轻微提升"
          },
          jazz: {
            label: "爵士",
            description: "中频的柔和强调"
          },
          classical: {
            label: "古典",
            description: "自然声音"
          },
          electronic: {
            label: "电子",
            description: "重低音和清晰高音"
          },
          vocal: {
            label: "人声",
            description: "中频提升以获得清晰度"
          },
          bass: {
            label: "低音",
            description: "低频的强烈强调"
          },
          treble: {
            label: "高音",
            description: "高频强调"
          }
        },
        bands: {
          title: "频段",
          description: "调整各个频段"
        },
        reset: {
          title: "重置均衡器",
          description: "将所有频段重置为平坦（0 dB）",
          button: "重置为平坦"
        }
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
