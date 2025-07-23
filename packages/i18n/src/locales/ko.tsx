import Ko from "../assets/ko.svg"

import { type Language } from "../types"

export const korean: Language = {
  code: "ko",
  name: "Korean",
  flag: Ko,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "결과를 찾을 수 없습니다",
      lessThanAnHourAgo: "1시간 이내",
      hoursAgo: "{{count}}시간 전",
      today: "오늘",
      yesterday: "어제",
      goBack: "뒤로 가기",
      goFoward: "앞으로 가기",
      favorite: "즐겨찾기",
      unfavorite: "즐겨찾기 해제",
      enableShuffle: "셔플 켜기",
      disableShuffle: "셔플 끄기",
      previous: "이전",
      play: "재생",
      pause: "일시 정지",
      next: "다음",
      enableRepeat: "반복 켜기",
      enableRepeatOne: "한 곡 반복 켜기",
      disableRepeat: "반복 끄기",
      mute: "음소거",
      unmute: "음소거 해제",
      queue: "재생 목록",
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
      more: "더 보기"
    },
    form: {
      titles: {
        createSong: "노래 생성",
        updateSong: "노래 수정",
        deleteSong: "노래 삭제",
        createArtist: "아티스트 생성",
        updateArtist: "아티스트 수정",
        deleteArtist: "아티스트 삭제",
        createPlaylist: "플레이리스트 생성",
        updatePlaylist: "플레이리스트 수정",
        deletePlaylist: "플레이리스트 삭제",
        confirmation: "확인",
        warning: "경고"
      },
      labels: {
        name: "이름",
        thumbnail: "썸네일",
        file: "파일",
        releaseYear: "발매 연도",
        album: "앨범",
        artists: "아티스트",
        isSingle: "싱글 여부"
      },
      buttons: {
        cancel: "취소",
        delete: "삭제",
        update: "수정",
        create: "생성"
      },
      descriptions: {
        thumbnail: "배경 이미지 (선택 사항)",
        dragAndDrop: "파일을 여기로 드래그 앤 드롭",
        fileSize: "최대 크기: {{size}}",
        supportedFormats: "지원 형식: {{formats}}"
      },
      messages: {
        confirmDelete: "정말 삭제하시겠습니까?",
        unsavedChanges: "저장되지 않은 변경 사항이 있습니다"
      }
    },
    validation: {
      name: {
        required: "이름은 필수입니다",
        max: "이름은 최대 200자까지 입력 가능합니다"
      },
      file: {
        required: "파일은 필수입니다"
      },
      duration: {
        required: "재생 시간은 필수입니다",
        min: "재생 시간은 0 이상이어야 합니다"
      },
      releaseYear: {
        invalid: "유효하지 않은 연도입니다",
        min: "연도는 0 이상이어야 합니다",
        max: "미래의 연도는 입력할 수 없습니다"
      },
      albumId: {
        invalid: "잘못된 앨범입니다",
        requiredIfNotSingle: "싱글이 아니면 앨범은 필수입니다"
      },
      artists: {
        min: "최소한 하나 이상의 아티스트가 필요합니다"
      }
    },
    update: {
      downloading: "업데이트를 다운로드 및 설치 중입니다",
      downloadingDescription: "새로운 업데이트가 자동으로 설치되고 있습니다",
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
        title: "플레이리스트"
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
          title: "화면 설정"
        },
        language: {
          title: "언어"
        },
        sync: {
          title: "동기화"
        }
      }
    },
    home: {
      title: "홈"
    },
    songs: {
      title: "노래",
      createdTitle: "노래가 성공적으로 생성되었습니다",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "노래 생성 실패",
      updatedTitle: "노래가 성공적으로 수정되었습니다",
      updatedDescription: "{{name}}이(가) 수정되었습니다",
      updatedFailedTitle: "노래 수정 실패",
      deletedTitle: "노래가 성공적으로 삭제되었습니다",
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
      title: "플레이리스트",
      createdTitle: "플레이리스트가 성공적으로 생성되었습니다",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "플레이리스트 생성 실패",
      updatedTitle: "플레이리스트가 성공적으로 수정되었습니다",
      updatedDescription: "{{name}}이(가) 수정되었습니다",
      updatedFailedTitle: "플레이리스트 수정 실패",
      deletedTitle: "플레이리스트가 성공적으로 삭제되었습니다",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "플레이리스트 삭제 실패"
    },
    artists: {
      title: "아티스트",
      createdTitle: "아티스트가 성공적으로 생성되었습니다",
      createdDescription: "{{name}}이(가) 생성되었습니다",
      createdFailedTitle: "아티스트 생성 실패",
      updatedTitle: "아티스트가 성공적으로 수정되었습니다",
      updatedDescription: "{{name}}이(가) 수정되었습니다",
      updatedFailedTitle: "아티스트 수정 실패",
      deletedTitle: "아티스트가 성공적으로 삭제되었습니다",
      deletedDescription: "{{name}}이(가) 삭제되었습니다",
      deletedFailedTitle: "아티스트 삭제 실패"
    },
    settings: {
      title: "설정",
      appearance: {
        title: "화면 설정",
        description: "선호하는 테마 모드를 선택하세요",
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
        description: "장치 간 데이터를 동기화합니다"
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
