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
      lessThanAnHourAgo: "1시간 미만 전",
      hoursAgo: "{{count}}시간 전",
      today: "오늘",
      yesterday: "어제",
      goBack: "뒤로",
      goFoward: "앞으로",
      favorite: "즐겨찾기",
      unfavorite: "즐겨찾기에서 제거",
      enableShuffle: "셔플 활성화",
      disableShuffle: "셔플 비활성화",
      previous: "이전",
      play: "재생",
      pause: "일시정지",
      next: "다음",
      enableRepeat: "반복 활성화",
      enableRepeatOne: "한 번 반복",
      disableRepeat: "반복 비활성화",
      mute: "음소거",
      unmute: "음소거 해제",
      queue: "대기열"
    },
    update: {
      downloading: "업데이트 다운로드 및 설치 중",
      downloadingDescription: "새로운 업데이트가 사용 가능하며 자동으로 설치되고 있습니다",
      installedSuccess: "업데이트가 성공적으로 설치되었습니다",
      failed: "업데이트 설치에 실패했습니다"
    },
    breadcrumbs: {
      home: {
        title: "홈"
      },
      songs: {
        title: "노래"
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
      fastUpload: {
        title: "빠른 업로드"
      },
      settings: {
        title: "설정",
        appearance: {
          title: "외관"
        },
        language: {
          title: "언어"
        },
        sync: {
          title: "동기화"
        }
      }
    },
    home: { title: "홈" },
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
      addedFailedTitle: "즐겨찾기 추가에 실패했습니다",
      removedTitle: "즐겨찾기에서 제거되었습니다",
      removedDescription: "{{name}}이(가) 즐겨찾기에서 제거되었습니다",
      removedFailedTitle: "즐겨찾기 제거에 실패했습니다"
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
      title: "설정",
      appearance: {
        title: "외관",
        description: "선호하는 외관 모드를 선택하세요",
        light: "밝음",
        dark: "어둠",
        system: "시스템"
      },
      language: {
        title: "언어",
        description: "선호하는 언어를 선택하세요"
      },
      sync: {
        title: "동기화",
        description: "기기 간에 데이터를 동기화하세요"
      }
    },
    fastUpload: {
      title: "빠른 업로드"
    },
    languages: {
      da: "덴마크어",
      de: "독일어",
      en: "영어",
      es: "스페인어",
      fi: "핀란드어",
      fr: "프랑스어",
      hi: "힌디어",
      it: "이탈리아어",
      ja: "일본어",
      ko: "한국어",
      nl: "네덜란드어",
      no: "노르웨이어",
      pl: "폴란드어",
      pt: "포르투갈어",
      ru: "러시아어",
      sv: "스웨덴어",
      tr: "터키어",
      uk: "우크라이나어",
      vi: "베트남어",
      zh: "중국어"
    }
  }
}
