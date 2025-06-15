import Ko from "../assets/ko.svg"

import { type Language } from "../types"

export const korean: Language = {
  code: "ko",
  name: "한국어",
  flag: Ko,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "결과를 찾을 수 없습니다",
      lessThanAnHourAgo: "1시간 이내",
      hoursAgo: "{{count}}시간 전",
      today: "오늘",
      yesterday: "어제"
    },
    update: {
      downloading: "업데이트 다운로드 및 설치 중",
      downloadingDescription: "새로운 업데이트가 사용 가능하며 자동으로 설치되고 있습니다",
      installedSuccess: "업데이트가 성공적으로 설치되었습니다",
      failed: "업데이트 설치 실패"
    },
    home: { title: "Home" },
    songs: {
      title: "노래",
      createdTitle: "노래가 성공적으로 생성되었습니다",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "노래 생성 실패",
      updatedTitle: "노래가 성공적으로 업데이트되었습니다",
      updatedDescription: "{{name}}이(가) 업데이트되었습니다",
      updatedFailedTitle: "노래 업데이트 실패",
      deletedTitle: "노래가 성공적으로 삭제되었습니다",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "노래 삭제 실패"
    },
    favorites: {
      title: "즐겨찾기",
      addedTitle: "즐겨찾기에 추가되었습니다",
      addedDescription: "{{name}}이(가) 즐겨찾기에 추가되었습니다",
      addedFailedTitle: "즐겨찾기 추가 실패",
      removedTitle: "즐겨찾기에서 제거되었습니다",
      removedDescription: "{{name}}이(가) 즐겨찾기에서 제거되었습니다",
      removedFailedTitle: "즐겨찾기 제거 실패"
    },
    playlists: {
      title: "재생 목록",
      createdTitle: "재생 목록이 성공적으로 생성되었습니다",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "재생 목록 생성 실패",
      updatedTitle: "재생 목록이 성공적으로 업데이트되었습니다",
      updatedDescription: "{{name}}이(가) 업데이트되었습니다",
      updatedFailedTitle: "재생 목록 업데이트 실패",
      deletedTitle: "재생 목록이 성공적으로 삭제되었습니다",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "재생 목록 삭제 실패"
    },
    artists: {
      title: "아티스트",
      createdTitle: "아티스트가 성공적으로 생성되었습니다",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "아티스트 생성 실패",
      updatedTitle: "아티스트가 성공적으로 업데이트되었습니다",
      updatedDescription: "{{name}}이(가) 업데이트되었습니다",
      updatedFailedTitle: "아티스트 업데이트 실패",
      deletedTitle: "아티스트가 성공적으로 삭제되었습니다",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "아티스트 삭제 실패"
    },
    settings: {
      title: "설정",
      theme: {
        title: "테마",
        description: "선호하는 외관 모드를 선택하세요",
        light: "라이트",
        dark: "다크",
        system: "시스템"
      },
      language: {
        title: "언어",
        description: "선호하는 언어를 선택하세요"
      },
      sync: {
        title: "동기화",
        description: "기기 간에 데이터를 동기화합니다"
      }
    }
  }
}
