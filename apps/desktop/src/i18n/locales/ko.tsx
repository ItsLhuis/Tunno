import Ko from "@assets/images/flags/ko.svg"

import { type Language } from "../types"

export const korean: Language = {
  code: "ko",
  name: "한국어",
  flag: Ko,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "결과를 찾을 수 없습니다"
    },
    songs: {
      title: "노래",
      createdTitle: "노래가 성공적으로 생성되었습니다",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "노래 생성에 실패했습니다",
      updatedTitle: "노래가 성공적으로 업데이트되었습니다",
      updatedDescription: "{{name}}이(가) 업데이트되었습니다",
      updatedFailedTitle: "노래 업데이트에 실패했습니다",
      deletedTitle: "노래가 성공적으로 삭제되었습니다",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "노래 삭제에 실패했습니다"
    },
    favorites: {
      title: "즐겨찾기"
    },
    playlists: {
      title: "재생 목록"
    },
    artists: {
      title: "아티스트"
    },
    settings: {
      title: "설정"
    }
  }
}
