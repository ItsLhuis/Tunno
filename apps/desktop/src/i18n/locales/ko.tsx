import Ko from "@assets/images/flags/ko.svg"

import { type Language } from "../types"

export const korean: Language = {
  code: "ko",
  name: "한국어",
  flag: Ko,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "결과가 없습니다",
      lessThanAnHourAgo: "1시간 이내",
      hoursAgo: "{{count}} 시간 전",
      today: "오늘",
      yesterday: "어제"
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
      title: "즐겨찾기",
      addedTitle: "즐겨찾기에 추가되었습니다",
      addedDescription: "{{name}}이(가) 즐겨찾기에 추가되었습니다",
      addedFailedTitle: "즐겨찾기에 추가하지 못했습니다",
      removedTitle: "즐겨찾기에서 제거되었습니다",
      removedDescription: "{{name}}이(가) 즐겨찾기에서 제거되었습니다",
      removedFailedTitle: "즐겨찾기에서 제거하지 못했습니다"
    },
    playlists: {
      title: "재생 목록",
      createdTitle: "재생 목록이 성공적으로 생성되었습니다",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "재생 목록 생성에 실패했습니다",
      updatedTitle: "재생 목록이 성공적으로 업데이트되었습니다",
      updatedDescription: "{{name}}이(가) 업데이트되었습니다",
      updatedFailedTitle: "재생 목록 업데이트에 실패했습니다",
      deletedTitle: "재생 목록이 성공적으로 삭제되었습니다",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "재생 목록 삭제에 실패했습니다"
    },
    artists: {
      title: "아티스트",
      createdTitle: "아티스트가 성공적으로 생성되었습니다",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "아티스트 생성에 실패했습니다",
      updatedTitle: "아티스트가 성공적으로 업데이트되었습니다",
      updatedDescription: "{{name}}이(가) 업데이트되었습니다",
      updatedFailedTitle: "아티스트 업데이트에 실패했습니다",
      deletedTitle: "아티스트가 성공적으로 삭제되었습니다",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "아티스트 삭제에 실패했습니다"
    },
    settings: {
      title: "설정"
    }
  }
}
