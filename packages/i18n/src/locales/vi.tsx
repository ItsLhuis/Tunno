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
      yesterday: "Hôm qua"
    },
    songs: {
      title: "Bài hát",
      createdTitle: "Đã Tạo Bài Hát Thành Công",
      createdDescription: "{{name}} đã được tạo",
      createdFailedTitle: "Không Thể Tạo Bài Hát",
      updatedTitle: "Đã Cập Nhật Bài Hát Thành Công",
      updatedDescription: "{{name}} đã được cập nhật",
      updatedFailedTitle: "Không Thể Cập Nhật Bài Hát",
      deletedTitle: "Đã Xóa Bài Hát Thành Công",
      deletedDescription: "{{name}} đã được xóa",
      deletedFailedTitle: "Không Thể Xóa Bài Hát"
    },
    favorites: {
      title: "Yêu thích",
      addedTitle: "Đã Thêm vào Yêu Thích",
      addedDescription: "{{name}} đã được thêm vào yêu thích",
      addedFailedTitle: "Không Thể Thêm vào Yêu Thích",
      removedTitle: "Đã Xóa khỏi Yêu Thích",
      removedDescription: "{{name}} đã được xóa khỏi yêu thích",
      removedFailedTitle: "Không Thể Xóa khỏi Yêu Thích"
    },
    playlists: {
      title: "Danh sách phát",
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
      theme: {
        title: "Theme",
        description: "Select your preferred appearance mode",
        light: "Light",
        dark: "Dark",
        system: "System"
      },
      language: {
        title: "Language",
        description: "Choose your preferred language"
      },
      sync: {
        title: "Sync",
        description: "Synchronize your data across devices"
      }
    }
  }
}
