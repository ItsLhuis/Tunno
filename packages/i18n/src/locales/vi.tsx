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
      lessThanAnHourAgo: "Ít hơn một giờ trước",
      hoursAgo: "{{count}} giờ trước",
      today: "Hôm nay",
      yesterday: "Hôm qua",
      goBack: "Quay lại",
      goFoward: "Tiến tới",
      favorite: "Yêu thích",
      unfavorite: "Bỏ yêu thích",
      enableShuffle: "Bật phát ngẫu nhiên",
      disableShuffle: "Tắt phát ngẫu nhiên",
      previous: "Trước",
      play: "Phát",
      pause: "Tạm dừng",
      next: "Tiếp",
      enableRepeat: "Bật lặp lại",
      enableRepeatOne: "Lặp lại một bài",
      disableRepeat: "Tắt lặp lại",
      mute: "Tắt tiếng",
      unmute: "Bật tiếng",
      queue: "Hàng đợi",
      title: "Tiêu đề",
      album: "Album",
      date: "Ngày",
      duration: "Thời lượng",
      search: "Tìm kiếm",
      selectAll: "Chọn tất cả",
      visibility: "Hiển thị",
      columns: "Cột",
      clear: "Xóa",
      cancel: "Hủy",
      more: "Thêm",
      select: "Chọn"
    },
    form: {
      titles: {
        createSong: "Tạo bài hát",
        updateSong: "Cập nhật bài hát",
        deleteSong: "Xóa bài hát",
        createArtist: "Tạo nghệ sĩ",
        updateArtist: "Cập nhật nghệ sĩ",
        deleteArtist: "Xóa nghệ sĩ",
        createPlaylist: "Tạo danh sách phát",
        updatePlaylist: "Cập nhật danh sách phát",
        deletePlaylist: "Xóa danh sách phát",
        confirmation: "Xác nhận",
        warning: "Cảnh báo"
      },
      labels: {
        name: "Tên",
        thumbnail: "Ảnh thu nhỏ",
        file: "Tệp",
        releaseYear: "Năm phát hành",
        album: "Album",
        artists: "Nghệ sĩ",
        isSingle: "Là đơn ca",
        folder: "Thư mục"
      },
      buttons: {
        cancel: "Hủy",
        delete: "Xóa",
        update: "Cập nhật",
        create: "Tạo"
      },
      descriptions: {
        thumbnail: "Ảnh nền (tùy chọn)",
        fileSize: "Kích thước tối đa: {{size}}",
        supportedFormats: "Định dạng hỗ trợ: {{formats}}"
      },
      messages: {
        confirmDelete: "Bạn có chắc muốn xóa không?",
        unsavedChanges: "Có thay đổi chưa lưu"
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
        max: "Tệp vượt quá kích thước tối đa {{maxSize}}"
      },
      duration: {
        required: "Thời lượng là bắt buộc",
        min: "Thời lượng phải lớn hơn 0"
      },
      releaseYear: {
        invalid: "Năm phát hành không hợp lệ",
        min: "Năm phát hành phải lớn hơn 0",
        max: "Năm phát hành không thể ở tương lai"
      },
      albumId: {
        invalid: "Album không hợp lệ",
        requiredIfNotSingle: "Album bắt buộc nếu không phải đơn ca"
      },
      artists: {
        min: "Cần ít nhất một nghệ sĩ"
      }
    },
    update: {
      downloading: "Đang tải xuống và cài đặt cập nhật",
      downloadingDescription: "Có bản cập nhật mới và đang được cài đặt tự động",
      installedSuccess: "Cập nhật đã được cài đặt thành công",
      failed: "Cài đặt cập nhật thất bại"
    },
    breadcrumbs: {
      home: { title: "Trang chủ" },
      songs: { title: "Bài hát" },
      favorites: { title: "Yêu thích" },
      playlists: { title: "Danh sách phát" },
      artists: { title: "Nghệ sĩ" },
      fastUpload: { title: "Tải lên nhanh" },
      settings: {
        title: "Cài đặt",
        appearance: { title: "Giao diện" },
        language: { title: "Ngôn ngữ" },
        sync: { title: "Đồng bộ" }
      }
    },
    home: { title: "Trang chủ" },
    songs: {
      title: "Bài hát",
      createdTitle: "Tạo bài hát thành công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Tạo bài hát thất bại",
      updatedTitle: "Cập nhật bài hát thành công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Cập nhật bài hát thất bại",
      deletedTitle: "Xóa bài hát thành công",
      deletedDescription: "{{name}} đã bị xóa",
      deletedFailedTitle: "Xóa bài hát thất bại"
    },
    favorites: {
      title: "Yêu thích",
      createdTitle: "Đã thêm vào yêu thích",
      createdDescription: "{{name}} đã được thêm vào yêu thích",
      createdFailedTitle: "Thêm vào yêu thích thất bại",
      deletedTitle: "Đã xóa khỏi yêu thích",
      deletedDescription: "{{name}} đã bị xóa khỏi yêu thích",
      deletedFailedTitle: "Xóa khỏi yêu thích thất bại"
    },
    playlists: {
      title: "Danh sách phát",
      createdTitle: "Tạo danh sách phát thành công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Tạo danh sách phát thất bại",
      updatedTitle: "Cập nhật danh sách phát thành công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Cập nhật danh sách phát thất bại",
      deletedTitle: "Xóa danh sách phát thành công",
      deletedDescription: "{{name}} đã bị xóa",
      deletedFailedTitle: "Xóa danh sách phát thất bại"
    },
    artists: {
      title: "Nghệ sĩ",
      createdTitle: "Tạo nghệ sĩ thành công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Tạo nghệ sĩ thất bại",
      updatedTitle: "Cập nhật nghệ sĩ thành công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Cập nhật nghệ sĩ thất bại",
      deletedTitle: "Xóa nghệ sĩ thành công",
      deletedDescription: "{{name}} đã bị xóa",
      deletedFailedTitle: "Xóa nghệ sĩ thất bại"
    },
    settings: {
      title: "Cài đặt",
      appearance: {
        title: "Giao diện",
        description: "Chọn chế độ giao diện bạn thích",
        light: "Sáng",
        dark: "Tối",
        system: "Hệ thống"
      },
      language: {
        title: "Ngôn ngữ",
        description: "Chọn ngôn ngữ bạn muốn sử dụng"
      },
      sync: {
        title: "Đồng bộ",
        description: "Đồng bộ dữ liệu giữa các thiết bị"
      }
    },
    fastUpload: {
      title: "Tải lên nhanh"
    },
    languages: {
      da: "Đan Mạch",
      de: "Đức",
      en: "Tiếng Anh",
      es: "Tây Ban Nha",
      fi: "Phần Lan",
      fr: "Pháp",
      hi: "Hindi",
      it: "Ý",
      ja: "Nhật Bản",
      ko: "Hàn Quốc",
      nl: "Hà Lan",
      no: "Na Uy",
      pl: "Ba Lan",
      pt: "Bồ Đào Nha",
      ru: "Nga",
      sv: "Thụy Điển",
      tr: "Thổ Nhĩ Kỳ",
      uk: "Ukraina",
      vi: "Việt Nam",
      zh: "Trung Quốc"
    }
  }
}
