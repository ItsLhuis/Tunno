import Vi from "@assets/images/flags/vi.svg"

import { type Language } from "../types"

export const vietnamese: Language = {
  code: "vi",
  name: "Tiếng Việt",
  flag: Vi,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Không tìm thấy kết quả"
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
      title: "Yêu thích"
    },
    playlists: {
      title: "Danh sách phát"
    },
    artists: {
      title: "Nghệ sĩ"
    },
    settings: {
      title: "Cài đặt"
    }
  }
}
