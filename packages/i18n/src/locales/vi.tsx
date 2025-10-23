import Vi from "../assets/vi.svg"

import { type Language } from "../types"

export const vietnamese: Language = {
  code: "vi",
  name: "Tiếng Việt",
  flag: Vi,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Không tìm thấy kết quả",
      lessThanAnHourAgo: "Dưới một giờ trước",
      hoursAgo: "{count} giờ trước",
      today: "Hôm nay",
      yesterday: "Hôm qua",
      years: "{count} năm",
      weeks: "{count} tuần",
      days: "{count} ngày",
      hours: "{count} giờ",
      minutes: "{count} phút",
      seconds: "{count} giây",
      goBack: "Quay lại",
      goForward: "Tiến tới",
      favorite: "Thêm vào yêu thích",
      unfavorite: "Bỏ yêu thích",
      enableShuffle: "Bật phát ngẫu nhiên",
      disableShuffle: "Tắt phát ngẫu nhiên",
      previous: "Trước",
      play: "Phát",
      pause: "Tạm dừng",
      next: "Tiếp theo",
      enableRepeat: "Bật lặp lại",
      enableRepeatOne: "Bật lặp lại một",
      disableRepeat: "Tắt lặp lại",
      mute: "Tắt tiếng",
      unmute: "Bật tiếng",
      queue: "Hàng đợi",
      title: "Tiêu đề",
      album: "Album",
      artist: "Nghệ sĩ",
      date: "Ngày",
      added: "Đã thêm",
      duration: "Thời lượng",
      search: "Tìm kiếm",
      selectAll: "Chọn tất cả",
      clear: "Xóa",
      cancel: "Hủy",
      more: "Thêm",
      select: "Chọn",
      preview: "Xem trước",
      close: "Đóng",
      playback: "Phát lại",
      playNext: "Phát tiếp theo",
      removeFromQueue: "Xóa khỏi hàng đợi",
      nowPlaying: "Đang phát",
      upNext: "Tiếp theo",
      actions: "Hành động",
      addTo: "Thêm vào",
      playlist: "Playlist",
      song: "Bài hát",
      lyrics: "Lời bài hát",
      openMiniplayer: "Mở trình phát nhỏ",
      enterFullScreen: "Vào toàn màn hình",
      exitFullScreen: "Thoát toàn màn hình",
      goToSong: "Đến bài hát",
      goToAlbum: "Đến album",
      goToPlaylist: "Đến playlist",
      goToArtist: "Đến nghệ sĩ",
      shuffleAndPlay: "Trộn và phát",
      unknown: "Không xác định",
      unknownAlbum: "Album không xác định",
      unknownArtist: "Nghệ sĩ không xác định",
      listenTime: "Thời gian nghe",
      averageListenTime: "Thời gian nghe trung bình",
      retentionRate: "Tỷ lệ giữ chân",
      totalPlays: "Tổng số lần phát",
      lastPlayed: "Lần phát cuối",
      neverPlayed: "Chưa bao giờ phát",
      streak: "Chuỗi",
      refresh: "Làm mới",
      showingOfTotal: "Hiển thị {showing}/{total}",
      start: "Bắt đầu",
      completed: "Hoàn thành"
    },
    form: {
      titles: {
        createSong: "Tạo bài hát",
        updateSong: "Cập nhật bài hát",
        deleteSong: "Xóa bài hát",
        createArtist: "Tạo nghệ sĩ",
        updateArtist: "Cập nhật nghệ sĩ",
        deleteArtist: "Xóa nghệ sĩ",
        createAlbum: "Tạo album",
        updateAlbum: "Cập nhật album",
        deleteAlbum: "Xóa album",
        createPlaylist: "Tạo playlist",
        updatePlaylist: "Cập nhật playlist",
        deletePlaylist: "Xóa playlist",
        confirmation: "Xác nhận",
        warning: "Cảnh báo",
        lyricsPreview: "Xem trước lời bài hát"
      },
      labels: {
        name: "Tên",
        thumbnail: "Hình thu nhỏ",
        file: "Tệp",
        releaseYear: "Năm phát hành",
        album: "Album",
        albumType: "Loại album",
        artists: "Nghệ sĩ",
        folder: "Thư mục",
        lyrics: "Lời bài hát"
      },
      buttons: {
        cancel: "Hủy",
        delete: "Xóa",
        update: "Cập nhật",
        create: "Tạo"
      },
      descriptions: {
        thumbnail: "Hình nền (tùy chọn)",
        fileSize: "Kích thước tối đa: {size}",
        supportedFormats: "Định dạng được hỗ trợ: {formats}",
        lyricsPreview: "Xem cách lời bài hát được đồng bộ với thời gian"
      },
      badges: {
        lines: "{count} dòng",
        duration: "Thời lượng: {time}"
      },
      messages: {
        confirmDelete: "Bạn có chắc chắn muốn xóa không?",
        unsavedChanges: "Có thay đổi chưa được lưu",
        noLyrics: "Không có lời bài hát"
      }
    },
    validation: {
      name: {
        required: "Tên là bắt buộc",
        max: "Tên không được vượt quá 200 ký tự"
      },
      file: {
        required: "Tệp là bắt buộc",
        invalid: "Tệp không hợp lệ hoặc bị hỏng",
        max: "Tệp vượt quá kích thước tối đa {maxSize}"
      },
      duration: {
        required: "Thời lượng là bắt buộc",
        min: "Thời lượng phải lớn hơn hoặc bằng 0"
      },
      releaseYear: {
        invalid: "Năm phát hành không hợp lệ",
        min: "Năm phát hành phải lớn hơn hoặc bằng 0",
        max: "Năm phát hành không thể ở tương lai"
      },
      albumId: {
        invalid: "Album không hợp lệ"
      },
      artists: {
        invalid: "Nghệ sĩ không hợp lệ"
      },
      albumType: {
        invalid: "Loại album không hợp lệ"
      }
    },
    update: {
      downloading: "Đang tải xuống và cài đặt bản cập nhật",
      downloadingDescription: "Có bản cập nhật mới và đang được cài đặt tự động",
      installedSuccess: "Cập nhật đã được cài đặt thành công",
      failed: "Cài đặt cập nhật thất bại"
    },
    breadcrumbs: {
      home: {
        title: "Trang chủ"
      },
      songs: {
        title: "Bài hát"
      },
      playlists: {
        title: "Playlists"
      },
      albums: {
        title: "Album"
      },
      artists: {
        title: "Nghệ sĩ"
      },
      fastUpload: {
        title: "Tải lên nhanh"
      },
      settings: {
        title: "Cài đặt",
        appearance: {
          title: "Giao diện"
        },
        language: {
          title: "Ngôn ngữ"
        },
        equalizer: {
          title: "Bộ cân bằng"
        },
        sync: {
          title: "Đồng bộ"
        }
      }
    },
    home: {
      title: "Trang chủ",
      jumpBackIn: {
        title: "Tiếp tục",
        description: "Tiếp tục từ nơi bạn đã dừng lại"
      },
      yourPlaylists: {
        title: "Dành Cho Bạn",
        description: "Danh sách phát cá nhân của bạn"
      },
      onRepeat: {
        title: "Đang Lặp Lại",
        description: "Những bài hát bạn không thể ngừng phát"
      },
      newReleases: {
        title: "Phát Hành Mới",
        description: "Âm nhạc mới từ các nghệ sĩ bạn theo dõi"
      },
      favoriteArtists: {
        title: "Nghệ Sĩ Của Bạn",
        description: "Những nghệ sĩ bạn yêu thích nhất"
      },
      topAlbums: {
        title: "Album Hàng Đầu",
        description: "Những album bạn phát nhiều nhất"
      },
      recentlyAdded: {
        title: "Mới Thêm Gần Đây",
        description: "Những bản nhạc mới nhất được thêm vào thư viện"
      },
      hiddenGems: {
        title: "Viên Ngọc Ẩn",
        description: "Khám phá lại những yêu thích đã quên"
      },
      discover: {
        title: "Khám Phá",
        description: "Những gợi ý âm nhạc mới dành cho bạn"
      },
      yourStats: {
        title: "Âm Nhạc Của Bạn",
        description: "Thống kê nghe nhạc và hiểu biết của bạn"
      }
    },
    songs: {
      title: "Bài hát",
      createdTitle: "Tạo bài hát thành công",
      createdDescription: "{name} đã được tạo",
      createdFailedTitle: "Tạo bài hát thất bại",
      updatedTitle: "Cập nhật bài hát thành công",
      updatedDescription: "{name} đã được cập nhật",
      updatedFailedTitle: "Cập nhật bài hát thất bại",
      deletedTitle: "Xóa bài hát thành công",
      deletedDescription: "{name} đã bị xóa",
      deletedFailedTitle: "Xóa bài hát thất bại",
      filters: {
        title: "Bộ lọc",
        clear: "Xóa bộ lọc đang hoạt động",
        sortBy: "Sắp xếp theo",
        favorites: "Chỉ yêu thích",
        favoritesDescription: "Chỉ hiển thị bài hát yêu thích",
        lyrics: "Có lời bài hát",
        lyricsDescription: "Chỉ hiển thị bài hát có lời",
        releaseYear: "Năm phát hành",
        duration: "Thời lượng",
        durationMin: "Tối thiểu",
        durationMax: "Tối đa",
        playCount: "Số lần phát",
        playCountMin: "Tối thiểu",
        playCountMax: "Tối đa",
        lastPlayed: "Lần phát cuối",
        lastPlayedAfter: "Sau",
        lastPlayedBefore: "Trước",
        selectDate: "Chọn ngày",
        sortOptions: {
          name: "Tên",
          duration: "Thời lượng",
          favorites: "Yêu thích",
          year: "Năm",
          playCount: "Số lần phát",
          lastPlayed: "Lần phát cuối",
          createdAt: "Ngày tạo",
          updatedAt: "Ngày cập nhật"
        }
      }
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Tạo playlist thành công",
      createdDescription: "{name} đã được tạo",
      createdFailedTitle: "Tạo playlist thất bại",
      updatedTitle: "Cập nhật playlist thành công",
      updatedDescription: "{name} đã được cập nhật",
      updatedFailedTitle: "Cập nhật playlist thất bại",
      deletedTitle: "Xóa playlist thành công",
      deletedDescription: "{name} đã bị xóa",
      deletedFailedTitle: "Xóa playlist thất bại",
      filters: {
        title: "Bộ lọc",
        clear: "Xóa bộ lọc đang hoạt động",
        sortBy: "Sắp xếp theo",
        favorites: "Chỉ yêu thích",
        favoritesDescription: "Chỉ hiển thị playlist yêu thích",
        playCount: "Số lần phát",
        playCountMin: "Số lần phát tối thiểu",
        playCountMax: "Số lần phát tối đa",
        totalTracks: "Tổng số bài hát",
        totalTracksMin: "Số bài hát tối thiểu",
        totalTracksMax: "Số bài hát tối đa",
        totalDuration: "Tổng thời lượng",
        totalDurationMin: "Thời lượng tối thiểu",
        totalDurationMax: "Thời lượng tối đa",
        lastPlayed: "Lần phát cuối",
        lastPlayedAfter: "Sau",
        lastPlayedBefore: "Trước",
        selectDate: "Chọn ngày",
        sortOptions: {
          name: "Tên",
          favorites: "Yêu thích",
          playCount: "Số lần phát",
          totalTracks: "Tổng số bài hát",
          totalDuration: "Tổng thời lượng",
          lastPlayed: "Lần phát cuối",
          createdAt: "Ngày tạo",
          updatedAt: "Ngày cập nhật"
        }
      }
    },
    albums: {
      title: "Album",
      createdTitle: "Tạo album thành công",
      createdDescription: "{name} đã được tạo",
      createdFailedTitle: "Tạo album thất bại",
      updatedTitle: "Cập nhật album thành công",
      updatedDescription: "{name} đã được cập nhật",
      updatedFailedTitle: "Cập nhật album thất bại",
      deletedTitle: "Xóa album thành công",
      deletedDescription: "{name} đã bị xóa",
      deletedFailedTitle: "Xóa album thất bại",
      filters: {
        title: "Bộ lọc",
        clear: "Xóa bộ lọc đang hoạt động",
        sortBy: "Sắp xếp theo",
        favorites: "Chỉ yêu thích",
        favoritesDescription: "Chỉ hiển thị album yêu thích",
        albumType: "Loại album",
        all: "Tất cả loại",
        single: "Đĩa đơn",
        album: "Album",
        compilation: "Tuyển tập",
        releaseYear: "Năm phát hành",
        releaseYearMin: "Năm tối thiểu",
        releaseYearMax: "Năm tối đa",
        playCount: "Số lần phát",
        playCountMin: "Số lần phát tối thiểu",
        playCountMax: "Số lần phát tối đa",
        totalTracks: "Tổng số bài hát",
        totalTracksMin: "Số bài hát tối thiểu",
        totalTracksMax: "Số bài hát tối đa",
        totalDuration: "Tổng thời lượng",
        totalDurationMin: "Thời lượng tối thiểu",
        totalDurationMax: "Thời lượng tối đa",
        lastPlayed: "Lần phát cuối",
        lastPlayedAfter: "Phát sau",
        lastPlayedBefore: "Phát trước",
        selectDate: "Chọn ngày",
        sortOptions: {
          name: "Tên",
          releaseYear: "Năm phát hành",
          favorites: "Yêu thích",
          playCount: "Số lần phát",
          totalTracks: "Tổng số bài hát",
          totalDuration: "Tổng thời lượng",
          lastPlayed: "Lần phát cuối",
          createdAt: "Đã tạo",
          updatedAt: "Đã cập nhật"
        }
      }
    },
    artists: {
      title: "Nghệ sĩ",
      createdTitle: "Tạo nghệ sĩ thành công",
      createdDescription: "{name} đã được tạo",
      createdFailedTitle: "Tạo nghệ sĩ thất bại",
      updatedTitle: "Cập nhật nghệ sĩ thành công",
      updatedDescription: "{name} đã được cập nhật",
      updatedFailedTitle: "Cập nhật nghệ sĩ thất bại",
      deletedTitle: "Xóa nghệ sĩ thành công",
      deletedDescription: "{name} đã bị xóa",
      deletedFailedTitle: "Xóa nghệ sĩ thất bại",
      filters: {
        title: "Bộ lọc",
        clear: "Xóa bộ lọc đang hoạt động",
        sortBy: "Sắp xếp theo",
        favorites: "Chỉ yêu thích",
        favoritesDescription: "Chỉ hiển thị nghệ sĩ yêu thích",
        playCount: "Số lần phát",
        playCountMin: "Tối thiểu",
        playCountMax: "Tối đa",
        totalTracks: "Tổng số ca khúc",
        totalTracksMin: "Tối thiểu",
        totalTracksMax: "Tối đa",
        totalDuration: "Tổng thời lượng",
        totalDurationMin: "Tối thiểu",
        totalDurationMax: "Tối đa",
        lastPlayed: "Lần phát cuối",
        lastPlayedAfter: "Sau",
        lastPlayedBefore: "Trước",
        selectDate: "Chọn ngày",
        sortOptions: {
          name: "Tên",
          favorites: "Yêu thích",
          playCount: "Số lần phát",
          totalTracks: "Tổng số ca khúc",
          totalDuration: "Tổng thời lượng",
          lastPlayed: "Lần phát cuối",
          createdAt: "Ngày tạo",
          updatedAt: "Ngày cập nhật"
        }
      }
    },
    favorites: {
      createdTitle: "Đã thêm vào yêu thích",
      createdDescription: "{name} đã được thêm vào yêu thích",
      createdFailedTitle: "Thêm vào yêu thích thất bại",
      deletedTitle: "Đã xóa khỏi yêu thích",
      deletedDescription: "{name} đã bị xóa khỏi yêu thích",
      deletedFailedTitle: "Xóa khỏi yêu thích thất bại"
    },
    settings: {
      title: "Cài đặt",
      appearance: {
        title: "Giao diện",
        description: "Chọn chế độ giao diện ưu tiên của bạn",
        light: "Sáng",
        dark: "Tối",
        system: "Hệ thống"
      },
      language: {
        title: "Ngôn ngữ",
        description: "Chọn ngôn ngữ ưa thích của bạn"
      },
      equalizer: {
        title: "Bộ cân bằng",
        enable: {
          title: "Bật Bộ cân bằng",
          description: "Bật hoặc tắt bộ cân bằng âm thanh",
          enabled: "Đã bật",
          disabled: "Đã tắt"
        },
        presets: {
          title: "Cài đặt sẵn Bộ cân bằng",
          description: "Chọn từ các cài đặt bộ cân bằng được định sẵn",
          flat: {
            label: "Phẳng",
            description: "Không điều chỉnh"
          },
          rock: {
            label: "Rock",
            description: "Tăng cường bass và treble"
          },
          pop: {
            label: "Pop",
            description: "Cân bằng với tăng cường nhẹ"
          },
          jazz: {
            label: "Jazz",
            description: "Nhấn mạnh nhẹ nhàng ở tần số trung bình"
          },
          classical: {
            label: "Cổ điển",
            description: "Âm thanh tự nhiên"
          },
          electronic: {
            label: "Điện tử",
            description: "Bass nặng và treble sắc nét"
          },
          vocal: {
            label: "Giọng hát",
            description: "Tăng cường tần số trung bình để rõ ràng"
          },
          bass: {
            label: "Bass",
            description: "Nhấn mạnh nặng ở tần số thấp"
          },
          treble: {
            label: "Treble",
            description: "Nhấn mạnh ở tần số cao"
          }
        },
        bands: {
          title: "Dải Tần số",
          description: "Điều chỉnh các dải tần số riêng lẻ"
        },
        reset: {
          title: "Đặt lại Bộ cân bằng",
          description: "Đặt lại tất cả dải về phẳng (0 dB)",
          button: "Đặt lại về Phẳng"
        }
      },
      sync: {
        title: "Đồng bộ",
        description: "Đồng bộ dữ liệu của bạn trên các thiết bị"
      }
    },
    fastUpload: {
      title: "Tải lên nhanh",
      selectBundle: "Chọn gói",
      changeBundle: "Thay đổi gói",
      status: {
        pending: "Đang chờ",
        processing: "Đang xử lý",
        success: "Thành công",
        error: "Lỗi",
        skipped: "Bỏ qua"
      },
      completed: {
        allSuccess: {
          title: "Nhập khẩu hoàn thành!",
          description: "{count} bài hát đã được nhập khẩu thành công"
        },
        withErrors: {
          title: "Nhập khẩu hoàn thành với lỗi",
          description: "{successCount} đã nhập khẩu, {errorCount} thất bại, {skippedCount} bỏ qua"
        },
        withSkipped: {
          title: "Nhập khẩu hoàn thành",
          description: "{successCount} đã nhập khẩu, {skippedCount} bỏ qua"
        }
      }
    },
    languages: {
      da: "Tiếng Đan Mạch",
      de: "Tiếng Đức",
      en: "Tiếng Anh",
      es: "Tiếng Tây Ban Nha",
      fi: "Tiếng Phần Lan",
      fr: "Tiếng Pháp",
      hi: "Tiếng Hindi",
      it: "Tiếng Ý",
      ja: "Tiếng Nhật",
      ko: "Tiếng Hàn",
      nl: "Tiếng Hà Lan",
      no: "Tiếng Na Uy",
      pl: "Tiếng Ba Lan",
      pt: "Tiếng Bồ Đào Nha",
      ru: "Tiếng Nga",
      sv: "Tiếng Thụy Điển",
      tr: "Tiếng Thổ Nhĩ Kỳ",
      uk: "Tiếng Ukraina",
      vi: "Tiếng Việt",
      zh: "Tiếng Trung"
    }
  }
}
