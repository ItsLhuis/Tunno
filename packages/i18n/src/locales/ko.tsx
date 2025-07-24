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
      goBack: "뒤로 가기",
      goFoward: "앞으로 가기",
      favorite: "즐겨찾기",
      unfavorite: "즐겨찾기 해제",
      enableShuffle: "셔플 사용",
      disableShuffle: "셔플 해제",
      previous: "이전",
      play: "재생",
      pause: "일시정지",
      next: "다음",
      enableRepeat: "반복 사용",
      enableRepeatOne: "한 곡 반복",
      disableRepeat: "반복 해제",
      mute: "음소거",
      unmute: "음소거 해제",
      queue: "대기열",
      title: "제목",
      album: "앨범",
      date: "날짜",
      duration: "재생 시간",
      search: "검색",
      selectAll: "전체 선택",
      visibility: "표시 여부",
      columns: "열",
      clear: "지우기",
      cancel: "취소",
      more: "더보기",
      select: "선택"
    },
    form: {
      titles: {
        createSong: "노래 만들기",
        updateSong: "노래 수정하기",
        deleteSong: "노래 삭제하기",
        createArtist: "아티스트 만들기",
        updateArtist: "아티스트 수정하기",
        deleteArtist: "아티스트 삭제하기",
        createPlaylist: "재생목록 만들기",
        updatePlaylist: "재생목록 수정하기",
        deletePlaylist: "재생목록 삭제하기",
        confirmation: "확인",
        warning: "경고"
      },
      labels: {
        name: "이름",
        thumbnail: "썸네일",
        file: "파일",
        releaseYear: "출시 연도",
        album: "앨범",
        artists: "아티스트",
        isSingle: "싱글 여부",
        folder: "폴더"
      },
      buttons: {
        cancel: "취소",
        delete: "삭제",
        update: "업데이트",
        create: "생성"
      },
      descriptions: {
        thumbnail: "배경 이미지 (선택사항)",
        fileSize: "최대 크기: {{size}}",
        supportedFormats: "지원되는 형식: {{formats}}"
      },
      messages: {
        confirmDelete: "정말 삭제하시겠습니까?",
        unsavedChanges: "저장되지 않은 변경 사항이 있습니다"
      }
    },
    validation: {
      name: {
        required: "이름은 필수입니다",
        max: "이름은 최대 200자까지 가능합니다"
      },
      file: {
        required: "파일은 필수입니다",
        invalid: "잘못되었거나 손상된 파일입니다",
        max: "파일이 최대 크기인 {{maxSize}}를 초과합니다"
      },
      duration: {
        required: "재생 시간은 필수입니다",
        min: "재생 시간은 최소 0이어야 합니다"
      },
      releaseYear: {
        invalid: "잘못된 출시 연도입니다",
        min: "출시 연도는 최소 0이어야 합니다",
        max: "출시 연도는 미래일 수 없습니다"
      },
      albumId: {
        invalid: "잘못된 앨범입니다",
        requiredIfNotSingle: "싱글이 아닌 경우 앨범은 필수입니다"
      },
      artists: {
        min: "최소한 하나의 아티스트가 필요합니다"
      }
    },
    update: {
      downloading: "업데이트 다운로드 및 설치 중",
      downloadingDescription: "새로운 업데이트가 있으며 자동으로 설치 중입니다",
      installedSuccess: "업데이트가 성공적으로 설치되었습니다",
      failed: "업데이트 설치에 실패했습니다"
    },
    breadcrumbs: {
      home: { title: "홈" },
      songs: { title: "노래" },
      favorites: { title: "즐겨찾기" },
      playlists: { title: "재생목록" },
      artists: { title: "아티스트" },
      fastUpload: { title: "빠른 업로드" },
      settings: {
        title: "설정",
        appearance: { title: "화면 모드" },
        language: { title: "언어" },
        sync: { title: "동기화" }
      }
    },
    home: { title: "홈" },
    songs: {
      title: "노래",
      createdTitle: "노래 생성됨",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "노래 생성 실패",
      updatedTitle: "노래 업데이트됨",
      updatedDescription: "{{name}}이(가) 업데이트되었습니다",
      updatedFailedTitle: "노래 업데이트 실패",
      deletedTitle: "노래 삭제됨",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "노래 삭제 실패"
    },
    favorites: {
      title: "즐겨찾기",
      createdTitle: "즐겨찾기에 추가됨",
      createdDescription: "{{name}}이(가) 즐겨찾기에 추가되었습니다",
      createdFailedTitle: "즐겨찾기 추가 실패",
      deletedTitle: "즐겨찾기에서 제거됨",
      deletedDescription: "{{name}}이(가) 즐겨찾기에서 제거되었습니다",
      deletedFailedTitle: "즐겨찾기 제거 실패"
    },
    playlists: {
      title: "재생목록",
      createdTitle: "재생목록 생성됨",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "재생목록 생성 실패",
      updatedTitle: "재생목록 업데이트됨",
      updatedDescription: "{{name}}이(가) 업데이트되었습니다",
      updatedFailedTitle: "재생목록 업데이트 실패",
      deletedTitle: "재생목록 삭제됨",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "재생목록 삭제 실패"
    },
    artists: {
      title: "아티스트",
      createdTitle: "아티스트 생성됨",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "아티스트 생성 실패",
      updatedTitle: "아티스트 업데이트됨",
      updatedDescription: "{{name}}이(가) 업데이트되었습니다",
      updatedFailedTitle: "아티스트 업데이트 실패",
      deletedTitle: "아티스트 삭제됨",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "아티스트 삭제 실패"
    },
    settings: {
      title: "설정",
      appearance: {
        title: "화면 모드",
        description: "선호하는 화면 모드를 선택하세요",
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
        description: "기기 간 데이터 동기화"
      }
    },
    fastUpload: { title: "빠른 업로드" },
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
