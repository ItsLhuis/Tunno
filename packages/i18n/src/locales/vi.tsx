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
      yesterday: "Hôm qua"
    },
    update: {
      downloading: "Đang tải xuống và cài đặt cập nhật",
      downloadingDescription: "Có bản cập nhật mới và đang được cài đặt tự động",
      installedSuccess: "Cập nhật đã được cài đặt",
      failed: "Không thể cài đặt cập nhật"
    },
    songs: {
      title: "Bài hát",
      createdTitle: "Đã tạo bài hát thành công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Không thể tạo bài hát",
      updatedTitle: "Đã cập nhật bài hát thành công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Không thể cập nhật bài hát",
      deletedTitle: "Đã xóa bài hát thành công",
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
      createdTitle: "Đã tạo danh sách phát thành công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Không thể tạo danh sách phát",
      updatedTitle: "Đã cập nhật danh sách phát thành công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Không thể cập nhật danh sách phát",
      deletedTitle: "Đã xóa danh sách phát thành công",
      deletedDescription: "{{name}} đã được xóa",
      deletedFailedTitle: "Không thể xóa danh sách phát"
    },
    artists: {
      title: "Nghệ sĩ",
      createdTitle: "Đã tạo nghệ sĩ thành công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Không thể tạo nghệ sĩ",
      updatedTitle: "Đã cập nhật nghệ sĩ thành công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Không thể cập nhật nghệ sĩ",
      deletedTitle: "Đã xóa nghệ sĩ thành công",
      deletedDescription: "{{name}} đã được xóa",
      deletedFailedTitle: "Không thể xóa nghệ sĩ"
    },
    settings: {
      title: "Cài đặt",
      theme: {
        title: "Giao diện",
        description: "Chọn chế độ hiển thị ưa thích của bạn",
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
    }
  }
}
