import Tr from "../assets/tr.svg"

import { type Language } from "../types"

export const turkish: Language = {
  code: "tr",
  name: "Türkçe",
  flag: Tr,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Sonuç bulunamadı",
      lessThanAnHourAgo: "Bir saatten az önce",
      hoursAgo: "{count} saat önce",
      today: "Bugün",
      yesterday: "Dün",
      years: "{count} yıl{count, plural, one {} other{}}",
      weeks: "{count} hafta{count, plural, one {} other{}}",
      days: "{count} gün{count, plural, one {} other{}}",
      hours: "{count} saat{count, plural, one {} other{}}",
      minutes: "{count} dakika{count, plural, one {} other{}}",
      seconds: "{count} saniye{count, plural, one {} other{}}",
      goBack: "Geri git",
      goFoward: "İleri git",
      favorite: "Favorilere ekle",
      unfavorite: "Favorilerden kaldır",
      enableShuffle: "Karışık çalma aç",
      disableShuffle: "Karışık çalma kapat",
      previous: "Önceki",
      play: "Oynat",
      pause: "Duraklat",
      next: "Sonraki",
      enableRepeat: "Tekrarı aç",
      enableRepeatOne: "Tekrar bir şarkıyı aç",
      disableRepeat: "Tekrarı kapat",
      mute: "Sessize al",
      unmute: "Sessizi kapat",
      queue: "Kuyruk",
      title: "Başlık",
      album: "Albüm",
      artist: "Sanatçı",
      date: "Tarih",
      added: "Eklendi",
      duration: "Süre",
      search: "Ara",
      selectAll: "Tümünü seç",
      clear: "Temizle",
      cancel: "İptal",
      more: "Daha fazla",
      select: "Seç",
      preview: "Önizleme",
      close: "Kapat",
      playback: "Oynatma",
      playNext: "Sonrakini çal",
      actions: "Eylemler",
      addTo: "Ekle",
      playlist: "Çalma listesi",
      song: "Şarkı",
      lyrics: "Şarkı sözü",
      openMiniplayer: "Miniçalıcıyı aç",
      enterFullScreen: "Tam ekrana geç",
      exitFullScreen: "Tam ekrandan çık",
      goToSong: "Şarkıya git",
      goToAlbum: "Albüme git",
      goToArtist: "Sanatçıya git",
      shuffleAndPlay: "Karıştır ve çal",
      unknown: "Bilinmeyen",
      unknownAlbum: "Bilinmeyen albüm",
      unknownArtist: "Bilinmeyen sanatçı",
      listenTime: "Dinleme süresi",
      averageListenTime: "Ortalama dinleme süresi",
      retentionRate: "Tutma oranı",
      totalPlays: "Toplam çalma",
      lastPlayed: "Son çalınan"
    },
    form: {
      titles: {
        createSong: "Şarkı Oluştur",
        updateSong: "Şarkıyı Güncelle",
        deleteSong: "Şarkıyı Sil",
        createArtist: "Sanatçı Oluştur",
        updateArtist: "Sanatçıyı Güncelle",
        deleteArtist: "Sanatçıyı Sil",
        createPlaylist: "Çalma Listesi Oluştur",
        updatePlaylist: "Çalma Listesini Güncelle",
        deletePlaylist: "Çalma Listesini Sil",
        confirmation: "Onay",
        warning: "Uyarı",
        lyricsPreview: "Şarkı Sözleri Önizlemesi"
      },
      labels: {
        name: "İsim",
        thumbnail: "Küçük Resim",
        file: "Dosya",
        releaseYear: "Yayın Yılı",
        album: "Albüm",
        artists: "Sanatçılar",
        folder: "Klasör",
        lyrics: "Şarkı Sözleri"
      },
      buttons: {
        cancel: "İptal",
        delete: "Sil",
        update: "Güncelle",
        create: "Oluştur"
      },
      descriptions: {
        thumbnail: "Arka plan resmi (isteğe bağlı)",
        fileSize: "Maksimum boyut: {size}",
        supportedFormats: "Desteklenen formatlar: {formats}",
        lyricsPreview: "Şarkı sözlerinin zamanla senkronize halini görüntüleyin"
      },
      badges: {
        lines: "{count} satır",
        duration: "Süre: {time}"
      },
      messages: {
        confirmDelete: "Silmek istediğinize emin misiniz?",
        unsavedChanges: "Kaydedilmemiş değişiklikler var",
        noLyrics: "Şarkı sözü yok"
      }
    },
    validation: {
      name: {
        required: "İsim gerekli",
        max: "İsim en fazla 200 karakter olabilir"
      },
      file: {
        required: "Dosya gerekli",
        invalid: "Geçersiz veya bozuk dosya",
        max: "Dosya maksimum boyutu aşıyor: {maxSize}"
      },
      duration: {
        required: "Süre gerekli",
        min: "Süre en az 0 olmalıdır"
      },
      releaseYear: {
        invalid: "Geçersiz yayın yılı",
        min: "Yayın yılı en az 0 olmalıdır",
        max: "Yayın yılı gelecek bir tarih olamaz"
      },
      albumId: {
        invalid: "Geçersiz albüm"
      },
      artists: {
        invalid: "Geçersiz sanatçılar"
      }
    },
    update: {
      downloading: "Güncelleme indiriliyor ve kuruluyor",
      downloadingDescription: "Yeni bir güncelleme mevcut ve otomatik olarak kuruluyor",
      installedSuccess: "Güncelleme başarıyla kuruldu",
      failed: "Güncelleme kurulamadı"
    },
    breadcrumbs: {
      home: {
        title: "Ana Sayfa"
      },
      songs: {
        title: "Şarkılar"
      },
      playlists: {
        title: "Çalma Listeleri"
      },
      albums: {
        title: "Albümler"
      },
      artists: {
        title: "Sanatçılar"
      },
      fastUpload: {
        title: "Hızlı Yükleme"
      },
      settings: {
        title: "Ayarlar",
        appearance: {
          title: "Görünüm"
        },
        language: {
          title: "Dil"
        },
        sync: {
          title: "Senkronizasyon"
        }
      }
    },
    home: {
      title: "Ana Sayfa"
    },
    songs: {
      title: "Şarkılar",
      createdTitle: "Şarkı başarıyla oluşturuldu",
      createdDescription: "{name} oluşturuldu",
      createdFailedTitle: "Şarkı oluşturulamadı",
      updatedTitle: "Şarkı başarıyla güncellendi",
      updatedDescription: "{name} güncellendi",
      updatedFailedTitle: "Şarkı güncellenemedi",
      deletedTitle: "Şarkı başarıyla silindi",
      deletedDescription: "{name} silindi",
      deletedFailedTitle: "Şarkı silinemedi",
      filters: {
        title: "Filtreler",
        clear: "Aktif filtreleri temizle",
        sortBy: "Sırala",
        favorites: "Sadece favoriler",
        favoritesDescription: "Sadece favori şarkıları göster",
        lyrics: "Sözleri olan",
        lyricsDescription: "Sadece sözleri olan şarkıları göster",
        releaseYear: "Çıkış yılı",
        duration: "Süre",
        durationMin: "Minimum",
        durationMax: "Maksimum",
        playCount: "Çalma sayısı",
        playCountMin: "Minimum",
        playCountMax: "Maksimum",
        lastPlayed: "Son çalınan",
        lastPlayedAfter: "Sonra",
        lastPlayedBefore: "Önce",
        selectDate: "Tarih seç",
        sortOptions: {
          name: "İsim",
          duration: "Süre",
          favorites: "Favoriler",
          year: "Yıl",
          playCount: "Çalma sayısı",
          lastPlayed: "Son çalınan",
          createdAt: "Oluşturulma tarihi",
          updatedAt: "Güncelleme tarihi"
        }
      }
    },
    playlists: {
      title: "Çalma Listeleri",
      createdTitle: "Çalma listesi başarıyla oluşturuldu",
      createdDescription: "{name} oluşturuldu",
      createdFailedTitle: "Çalma listesi oluşturulamadı",
      updatedTitle: "Çalma listesi başarıyla güncellendi",
      updatedDescription: "{name} güncellendi",
      updatedFailedTitle: "Çalma listesi güncellenemedi",
      deletedTitle: "Çalma listesi başarıyla silindi",
      deletedDescription: "{name} silindi",
      deletedFailedTitle: "Çalma listesi silinemedi"
    },
    albums: {
      title: "Albümler",
      createdTitle: "Albüm başarıyla oluşturuldu",
      createdDescription: "{name} oluşturuldu",
      createdFailedTitle: "Albüm oluşturulamadı",
      updatedTitle: "Albüm başarıyla güncellendi",
      updatedDescription: "{name} güncellendi",
      updatedFailedTitle: "Albüm güncellenemedi",
      deletedTitle: "Albüm başarıyla silindi",
      deletedDescription: "{name} silindi",
      deletedFailedTitle: "Albüm silinemedi"
    },
    artists: {
      title: "Sanatçılar",
      createdTitle: "Sanatçı başarıyla oluşturuldu",
      createdDescription: "{name} oluşturuldu",
      createdFailedTitle: "Sanatçı oluşturulamadı",
      updatedTitle: "Sanatçı başarıyla güncellendi",
      updatedDescription: "{name} güncellendi",
      updatedFailedTitle: "Sanatçı güncellenemedi",
      deletedTitle: "Sanatçı başarıyla silindi",
      deletedDescription: "{name} silindi",
      deletedFailedTitle: "Sanatçı silinemedi",
      filters: {
        title: "Filtreler",
        clear: "Aktif filtreleri temizle",
        sortBy: "Sırala",
        favorites: "Sadece favoriler",
        favoritesDescription: "Sadece favori sanatçıları göster",
        playCount: "Çalma sayısı",
        playCountMin: "Minimum",
        playCountMax: "Maksimum",
        totalTracks: "Toplam şarkı sayısı",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maksimum",
        totalDuration: "Toplam süre",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maksimum",
        lastPlayed: "Son çalınan",
        lastPlayedAfter: "Sonra",
        lastPlayedBefore: "Önce",
        selectDate: "Tarih seç",
        sortOptions: {
          name: "İsim",
          favorites: "Favoriler",
          playCount: "Çalma sayısı",
          totalTracks: "Toplam şarkı sayısı",
          totalDuration: "Toplam süre",
          lastPlayed: "Son çalınan",
          createdAt: "Oluşturulma tarihi",
          updatedAt: "Güncellenme tarihi"
        }
      }
    },
    favorites: {
      createdTitle: "Favorilere eklendi",
      createdDescription: "{name} favorilere eklendi",
      createdFailedTitle: "Favorilere eklenemedi",
      deletedTitle: "Favorilerden kaldırıldı",
      deletedDescription: "{name} favorilerden kaldırıldı",
      deletedFailedTitle: "Favorilerden kaldırılamadı"
    },
    settings: {
      title: "Ayarlar",
      appearance: {
        title: "Görünüm",
        description: "Tercih ettiğiniz görünüm modunu seçin",
        light: "Açık",
        dark: "Koyu",
        system: "Sistem"
      },
      language: {
        title: "Dil",
        description: "Tercih ettiğiniz dili seçin"
      },
      sync: {
        title: "Senkronizasyon",
        description: "Verilerinizi cihazlar arasında senkronize edin"
      }
    },
    fastUpload: {
      title: "Hızlı Yükleme"
    },
    languages: {
      da: "Danca",
      de: "Almanca",
      en: "İngilizce",
      es: "İspanyolca",
      fi: "Fince",
      fr: "Fransızca",
      hi: "Hintçe",
      it: "İtalyanca",
      ja: "Japonca",
      ko: "Korece",
      nl: "Flemenkçe",
      no: "Norveççe",
      pl: "Lehçe",
      pt: "Portekizce",
      ru: "Rusça",
      sv: "İsveççe",
      tr: "Türkçe",
      uk: "Ukraynaca",
      vi: "Vietnamca",
      zh: "Çince"
    }
  }
}
