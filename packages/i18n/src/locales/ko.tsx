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
      lessThanAnHourAgo: "한 시간 이내",
      hoursAgo: "{count}시간 전",
      today: "오늘",
      yesterday: "어제",
      goBack: "뒤로 가기",
      goFoward: "앞으로 가기",
      favorite: "즐겨찾기",
      unfavorite: "즐겨찾기 해제",
      enableShuffle: "셔플 활성화",
      disableShuffle: "셔플 비활성화",
      previous: "이전",
      play: "재생",
      pause: "일시정지",
      next: "다음",
      enableRepeat: "반복 활성화",
      enableRepeatOne: "한 곡 반복 활성화",
      disableRepeat: "반복 비활성화",
      mute: "음소거",
      unmute: "음소거 해제",
      queue: "대기열",
      title: "제목",
      album: "앨범",
      date: "날짜",
      duration: "재생 시간",
      search: "검색",
      selectAll: "전체 선택",
      visibility: "가시성",
      columns: "열",
      clear: "지우기",
      cancel: "취소",
      more: "더 보기",
      select: "선택",
      preview: "미리보기",
      close: "닫기"
    },
    form: {
      titles: {
        createSong: "노래 만들기",
        updateSong: "노래 업데이트",
        deleteSong: "노래 삭제",
        createArtist: "아티스트 만들기",
        updateArtist: "아티스트 업데이트",
        deleteArtist: "아티스트 삭제",
        createPlaylist: "재생목록 만들기",
        updatePlaylist: "재생목록 업데이트",
        deletePlaylist: "재생목록 삭제",
        confirmation: "확인",
        warning: "경고",
        lyricsPreview: "가사 미리보기"
      },
      labels: {
        name: "이름",
        thumbnail: "썸네일",
        file: "파일",
        releaseYear: "출시 연도",
        album: "앨범",
        artists: "아티스트",
        folder: "폴더",
        lyrics: "가사"
      },
      buttons: {
        cancel: "취소",
        delete: "삭제",
        update: "업데이트",
        create: "만들기"
      },
      descriptions: {
        thumbnail: "배경 이미지 (선택 사항)",
        fileSize: "최대 크기: {size}",
        supportedFormats: "지원되는 형식: {formats}",
        lyricsPreview: "가사가 시간에 맞춰 동기화된 모습 보기"
      },
      badges: {
        lines: "{count} 줄",
        duration: "재생 시간: {time}"
      },
      messages: {
        confirmDelete: "정말 삭제하시겠습니까?",
        unsavedChanges: "저장되지 않은 변경 사항이 있습니다",
        noLyrics: "가사가 없습니다"
      }
    },
    validation: {
      name: {
        required: "이름은 필수입니다",
        max: "이름은 최대 200자여야 합니다"
      },
      file: {
        required: "파일은 필수입니다",
        invalid: "유효하지 않거나 손상된 파일입니다",
        max: "파일이 최대 크기 {maxSize}를 초과합니다"
      },
      duration: {
        required: "재생 시간은 필수입니다",
        min: "재생 시간은 최소 0이어야 합니다"
      },
      releaseYear: {
        invalid: "유효하지 않은 출시 연도입니다",
        min: "출시 연도는 최소 0이어야 합니다",
        max: "출시 연도는 미래일 수 없습니다"
      },
      albumId: {
        invalid: "유효하지 않은 앨범입니다"
      },
      artists: {
        invalid: "잘못된 아티스트"
      }
    },
    update: {
      downloading: "업데이트 다운로드 및 설치 중",
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
        title: "재생목록"
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
          title: "모양"
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
      createdDescription: "{name} 가 생성되었습니다",
      createdFailedTitle: "노래 생성 실패",
      updatedTitle: "노래가 성공적으로 업데이트되었습니다",
      updatedDescription: "{name} 가 업데이트되었습니다",
      updatedFailedTitle: "노래 업데이트 실패",
      deletedTitle: "노래가 성공적으로 삭제되었습니다",
      deletedDescription: "{name} 가 삭제되었습니다",
      deletedFailedTitle: "노래 삭제 실패"
    },
    favorites: {
      title: "즐겨찾기",
      createdTitle: "즐겨찾기에 추가됨",
      createdDescription: "{name} 이(가) 즐겨찾기에 추가되었습니다",
      createdFailedTitle: "즐겨찾기 추가 실패",
      deletedTitle: "즐겨찾기에서 제거됨",
      deletedDescription: "{name} 이(가) 즐겨찾기에서 제거되었습니다",
      deletedFailedTitle: "즐겨찾기 제거 실패"
    },
    playlists: {
      title: "재생목록",
      createdTitle: "재생목록이 성공적으로 생성되었습니다",
      createdDescription: "{name} 이(가) 생성되었습니다",
      createdFailedTitle: "재생목록 생성 실패",
      updatedTitle: "재생목록이 성공적으로 업데이트되었습니다",
      updatedDescription: "{name} 이(가) 업데이트되었습니다",
      updatedFailedTitle: "재생목록 업데이트 실패",
      deletedTitle: "재생목록이 성공적으로 삭제되었습니다",
      deletedDescription: "{name} 이(가) 삭제되었습니다",
      deletedFailedTitle: "재생목록 삭제 실패"
    },
    artists: {
      title: "아티스트",
      createdTitle: "아티스트가 성공적으로 생성되었습니다",
      createdDescription: "{name} 이(가) 생성되었습니다",
      createdFailedTitle: "아티스트 생성 실패",
      updatedTitle: "아티스트가 성공적으로 업데이트되었습니다",
      updatedDescription: "{name} 이(가) 업데이트되었습니다",
      updatedFailedTitle: "아티스트 업데이트 실패",
      deletedTitle: "아티스트가 성공적으로 삭제되었습니다",
      deletedDescription: "{name} 이(가) 삭제되었습니다",
      deletedFailedTitle: "아티스트 삭제 실패"
    },
    settings: {
      title: "설정",
      appearance: {
        title: "모양",
        description: "선호하는 모드 선택",
        light: "라이트",
        dark: "다크",
        system: "시스템"
      },
      language: {
        title: "언어",
        description: "선호하는 언어 선택"
      },
      sync: {
        title: "동기화",
        description: "기기 간 데이터 동기화"
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
