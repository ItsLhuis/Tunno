import Vi from "../assets/vi.svg"

import { type Language } from "../types"

/**
 * Vietnamese language configuration.
 */
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
      thisWeek: "Tuần này",
      thisMonth: "Tháng này",
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
      removeFromPlaylist: "Xóa khỏi danh sách phát",
      nowPlaying: "Đang phát",
      noSongPlaying: "Không có gì đang phát",
      upNext: "Tiếp theo",
      actions: "Hành động",
      addTo: "Thêm vào",
      playlist: "playlist",
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
      completed: "Hoàn thành",
      songsPlayed: "{count} bài hát",
      appearsIn: "Xuất hiện trong",
      addToSidebar: "Thêm vào thanh bên",
      removeFromSidebar: "Xóa khỏi thanh bên",
      featured: "Nổi bật",
      stats: "Thống kê",
      openToStart: "Mở Tunno để bắt đầu"
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
        addToPlaylist: "Thêm vào Playlist",
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
        create: "Tạo",
        add: "Thêm"
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
      },
      playlistIds: {
        invalid: "Danh sách phát không hợp lệ"
      },
      album: {
        duplicate: "Đã có album với tên này",
        integrity:
          "Không thể xóa nghệ sĩ khỏi album vì có các bài hát thuộc về cả album này và nghệ sĩ này"
      },
      artist: {
        duplicate: "Đã có nghệ sĩ với tên này",
        integrity:
          "Không thể xóa nghệ sĩ vì có các bài hát thuộc về cả nghệ sĩ này và các album cũng bao gồm nghệ sĩ này"
      },
      playlist: {
        duplicate: "Đã có danh sách phát với tên này"
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
        },
        about: {
          title: "Về ứng dụng"
        }
      },
      lyrics: {
        title: "Lời bài hát"
      }
    },
    home: {
      title: "Trang chủ",
      jumpBackIn: {
        title: "Tiếp tục",
        description: "Tiếp tục từ nơi bạn đã dừng lại"
      },
      newReleases: {
        title: "Phát hành mới",
        description: "Các bổ sung mới vào bộ sưu tập của bạn"
      },
      onRepeat: {
        title: "Đang lặp lại",
        description: "Những bài hát bạn không thể ngừng phát"
      },
      discover: {
        title: "Khám Phá",
        description: "Những gợi ý âm nhạc mới dành cho bạn"
      },
      favoriteArtists: {
        title: "Nghệ sĩ của bạn",
        description: "Những nghệ sĩ bạn yêu thích nhất"
      },
      yourPlaylists: {
        title: "Dành cho bạn",
        description: "Danh sách phát cá nhân của bạn"
      },
      topAlbums: {
        title: "Album hàng đầu",
        description: "Các album bạn phát nhiều nhất"
      },
      recentlyAdded: {
        title: "Mới thêm gần đây",
        description: "Các bổ sung mới vào thư viện của bạn"
      },
      empty: {
        title: "Thư viện của bạn trống",
        description:
          "Chào mừng bạn đến với Tunno. Để bắt đầu, bạn sẽ cần thêm một số nhạc vào thư viện cá nhân của mình.",
        getStarted: "Bắt đầu",
        songs: {
          title: "Nhập bài hát",
          description: "Thêm các tệp nhạc từ thiết bị của bạn để bắt đầu xây dựng thư viện của mình"
        },
        albums: {
          title: "Tạo album",
          description: "Sắp xếp nhạc của bạn bằng cách tạo album với ảnh bìa và chi tiết"
        },
        playlists: {
          title: "Tạo danh sách phát",
          description: "Tạo các bản phối của riêng bạn cho bất kỳ tâm trạng hoặc hoạt động nào"
        },
        artists: {
          title: "Thêm nghệ sĩ",
          description: "Tạo hồ sơ nghệ sĩ để sắp xếp và quản lý nhạc của họ"
        }
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
      songsAddedTitle: "Các bài hát đã được thêm thành công",
      songsAddedFailedTitle: "Thêm bài hát thất bại",
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
    sidebar: {
      addedTitle: "Đã thêm vào thanh bên",
      addedDescription: "{name} đã được thêm vào thanh bên",
      addedFailedTitle: "Thêm vào thanh bên thất bại",
      removedTitle: "Đã xóa khỏi thanh bên",
      removedDescription: "{name} đã bị xóa khỏi thanh bên"
    },
    settings: {
      title: "Cài đặt",
      appearance: {
        title: "Giao diện",
        description: "Đặt cấu hình các tùy chọn giao diện của ứng dụng.",
        theme: {
          title: "Chủ đề",
          description: "Chọn chủ đề ứng dụng",
          light: "Sáng",
          dark: "Tối",
          system: "Hệ thống"
        },
        zoom: {
          title: "Thu phóng",
          description: "Điều chỉnh mức thu phóng của ứng dụng"
        }
      },
      language: {
        title: "Ngôn ngữ",
        description: "Chọn ngôn ngữ ưa thích của bạn"
      },
      equalizer: {
        title: "Bộ cân bằng",
        enable: {
          title: "Bật bộ cân bằng",
          description: "Bật hoặc tắt bộ cân bằng âm thanh",
          enabled: "Đã bật",
          disabled: "Đã tắt"
        },
        presets: {
          title: "Cài đặt sẵn bộ cân bằng",
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
          title: "Dải tần số",
          description: "Điều chỉnh các dải tần số riêng lẻ"
        },
        reset: {
          title: "Đặt lại bộ cân bằng",
          description: "Đặt lại tất cả dải về phẳng (0 dB)",
          button: "Đặt lại về phẳng"
        }
      },
      sync: {
        title: "Đồng bộ",
        description: "Đồng bộ dữ liệu của bạn trên các thiết bị",
        export: {
          title: "Xuất thư viện",
          description:
            "Xuất thư viện của bạn dưới dạng tệp gói để sao lưu hoặc sử dụng trên thiết bị khác",
          selectDestination: "Chọn đích",
          exportingSongs: "Đang xuất {count} bài hát",
          preparingExport: "Đang chuẩn bị xuất",
          exportingMessage: "Quá trình này có thể mất một lúc",
          exportSuccess: "Xuất thư viện thành công",
          showFolder: "Hiển thị thư mục",
          exportAgain: "Xuất lại",
          exportFailed: "Xuất thất bại",
          tryAgain: "Thử lại",
          noSongs: "Không có bài hát để xuất",
          libraryEmpty: "Thư viện của bạn trống",
          noValidSongs: "Không có bài hát hợp lệ để xuất",
          missingAlbumInfo: "Tất cả bài hát thiếu thông tin album",
          songsExported: "{count} bài hát đã xuất sang gói"
        },
        mobile: {
          title: "Đồng bộ với mobile",
          description: "Chuyển thư viện của bạn đến Tunno Mobile qua mạng cục bộ",
          generateQr: "Tạo mã QR",
          stopServer: "Dừng máy chủ",
          waitingConnection: "Đang chờ thiết bị di động kết nối...",
          deviceConnected: "Thiết bị được kết nối",
          syncInProgress: "Đang đồng bộ",
          syncCompleted: "Đồng bộ hoàn tất",
          serverError: "Không thể khởi động máy chủ đồng bộ"
        }
      },
      about: {
        title: "Về ứng dụng",
        description: "Thông tin ứng dụng và chi tiết phiên bản",
        version: "Phiên bản",
        whatsNew: {
          title: "Tính năng mới",
          description: "Xem các tính năng và cải tiến mới nhất",
          newRelease: "Phiên bản mới",
          viewChangelog: "Xem changelog"
        },
        storage: {
          title: "Lưu trữ và dữ liệu",
          description: "Quản lý dữ liệu ứng dụng và cài đặt",
          openDataFolder: "Mở thư mục dữ liệu"
        },
        legal: {
          title: "Pháp lý và bản quyền",
          description: "Thông tin giấy phép và tài liệu pháp lý",
          copyright: "Bản quyền",
          licensed: "Cấp phép theo giấy phép MIT",
          viewLicense: "Xem giấy phép",
          viewOnGitHub: "Xem trên GitHub"
        }
      }
    },
    fastUpload: {
      title: "Tải lên nhanh",
      description: "Nhập gói từ CLI hoặc được xuất từ",
      cliTooltip: "Mở tài liệu Tunno CLI",
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
          title: "Nhập khẩu hoàn thành",
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
    lyrics: {
      title: "Lời bài hát"
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
