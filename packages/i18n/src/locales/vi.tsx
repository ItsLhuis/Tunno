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
      lessThanAnHourAgo: "Chưa đầy một giờ trước",
      hoursAgo: "{{count}} giờ trước",
      today: "Hôm nay",
      yesterday: "Hôm qua",
      goBack: "Quay lại",
      goFoward: "Tiến lên",
      favorite: "Yêu thích",
      unfavorite: "Bỏ khỏi yêu thích",
      enableShuffle: "Bật phát ngẫu nhiên",
      disableShuffle: "Tắt phát ngẫu nhiên",
      previous: "Trước",
      play: "Phát",
      pause: "Tạm dừng",
      next: "Tiếp",
      enableRepeat: "Bật lặp lại",
      enableRepeatOne: "Lặp lại một lần",
      disableRepeat: "Tắt lặp lại",
      mute: "Tắt tiếng",
      unmute: "Bật tiếng",
      queue: "Hàng đợi",
      title: "Tiêu đề",
      album: "Album",
      date: "Ngày",
      duration: "Thời lượng",
      search: "Tìm kiếm"
    },
    validation: {
      name: {
        required: "Tên là bắt buộc",
        max: "Tên tối đa 200 ký tự"
      },
      file: {
        required: "Tệp là bắt buộc",
        max: "Tệp tối đa 50 ký tự"
      },
      thumbnail: {
        max: "Ảnh thu nhỏ tối đa 50 ký tự"
      },
      duration: {
        required: "Thời lượng là bắt buộc",
        min: "Thời lượng phải ít nhất là 0"
      },
      releaseYear: {
        invalid: "Năm phát hành không hợp lệ",
        min: "Năm phát hành phải ít nhất là 0",
        max: "Năm phát hành không thể ở tương lai"
      },
      albumId: {
        invalid: "Album không hợp lệ",
        requiredIfNotSingle: "Album là bắt buộc nếu không phải single"
      }
    },
    update: {
      downloading: "Đang tải xuống và cài đặt cập nhật",
      downloadingDescription: "Có bản cập nhật mới và đang được cài đặt tự động",
      installedSuccess: "Cập nhật đã được cài đặt thành công",
      failed: "Không thể cài đặt cập nhật"
    },
    breadcrumbs: {
      home: {
        title: "Trang chủ"
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
        sync: {
          title: "Đồng bộ"
        }
      }
    },
    home: { title: "Trang chủ" },
    songs: {
      title: "Bài hát",
      createdTitle: "Bài hát đã được tạo thành công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Không thể tạo bài hát",
      updatedTitle: "Bài hát đã được cập nhật thành công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Không thể cập nhật bài hát",
      deletedTitle: "Bài hát đã được xóa thành công",
      deletedDescription: "{{name}} đã được xóa",
      deletedFailedTitle: "Không thể xóa bài hát"
    },
    favorites: {
      title: "Yêu thích",
      addedTitle: "Đã thêm vào yêu thích",
      addedDescription: "{{name}} đã được thêm vào yêu thích",
      addedFailedTitle: "Không thể thêm vào yêu thích",
      removedTitle: "Đã xóa khỏi yêu thích",
      removedDescription: "{{name}} đã được xóa khỏi yêu thích",
      removedFailedTitle: "Không thể xóa khỏi yêu thích"
    },
    playlists: {
      title: "Danh sách phát",
      createdTitle: "Danh sách phát đã được tạo thành công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Không thể tạo danh sách phát",
      updatedTitle: "Danh sách phát đã được cập nhật thành công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Không thể cập nhật danh sách phát",
      deletedTitle: "Danh sách phát đã được xóa thành công",
      deletedDescription: "{{name}} đã được xóa",
      deletedFailedTitle: "Không thể xóa danh sách phát"
    },
    artists: {
      title: "Nghệ sĩ",
      createdTitle: "Nghệ sĩ đã được tạo thành công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Không thể tạo nghệ sĩ",
      updatedTitle: "Nghệ sĩ đã được cập nhật thành công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Không thể cập nhật nghệ sĩ",
      deletedTitle: "Nghệ sĩ đã được xóa thành công",
      deletedDescription: "{{name}} đã được xóa",
      deletedFailedTitle: "Không thể xóa nghệ sĩ"
    },
    settings: {
      title: "Cài đặt",
      appearance: {
        title: "Giao diện",
        description: "Chọn chế độ giao diện ưa thích của bạn",
        light: "Sáng",
        dark: "Tối",
        system: "Hệ thống"
      },
      language: {
        title: "Ngôn ngữ",
        description: "Chọn ngôn ngữ ưa thích của bạn"
      },
      sync: {
        title: "Đồng bộ",
        description: "Đồng bộ dữ liệu của bạn giữa các thiết bị"
      }
    },
    fastUpload: {
      title: "Tải lên nhanh"
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
      uk: "Tiếng Ukraine",
      vi: "Tiếng Việt",
      zh: "Tiếng Trung"
    }
  }
}
