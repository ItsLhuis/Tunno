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
      goBack: "Geri Git",
      goFoward: "İleri Git",
      favorite: "Favori",
      unfavorite: "Favorilerden Kaldır",
      enableShuffle: "Karışık Çalma Aç",
      disableShuffle: "Karışık Çalma Kapat",
      previous: "Önceki",
      play: "Oynat",
      pause: "Duraklat",
      next: "Sonraki",
      enableRepeat: "Tekrarı Aç",
      enableRepeatOne: "Tekrar Bir Şarkıyı Aç",
      disableRepeat: "Tekrarı Kapat",
      mute: "Sessize Al",
      unmute: "Sessizi Kapat",
      queue: "Kuyruk",
      title: "Başlık",
      album: "Albüm",
      date: "Tarih",
      duration: "Süre",
      search: "Ara",
      selectAll: "Tümünü Seç",
      visibility: "Görünürlük",
      columns: "Sütunlar",
      clear: "Temizle",
      cancel: "İptal",
      more: "Daha Fazla",
      select: "Seç",
      preview: "Önizleme",
      close: "Kapat",
      playback: "Oynatma",
      playNext: "Sonrakini çal",
      actions: "Eylemler",
      addTo: "Ekle",
      playlist: "Çalma listesi",
      lyrics: "Şarkı sözü",
      openMiniplayer: "Miniçalıcıyı Aç",
      enterFullScreen: "Tam Ekrana Geç",
      exitFullScreen: "Tam Ekrandan Çık",
      goToAlbum: "Albüme git",
      goToArtist: "Sanatçıya git",
      shuffleAndPlay: "Karıştır ve Çal"
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
      favorites: {
        title: "Favoriler"
      },
      playlists: {
        title: "Çalma Listeleri"
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
      deletedFailedTitle: "Şarkı silinemedi"
    },
    favorites: {
      title: "Favoriler",
      createdTitle: "Favorilere eklendi",
      createdDescription: "{name} favorilere eklendi",
      createdFailedTitle: "Favorilere eklenemedi",
      deletedTitle: "Favorilerden kaldırıldı",
      deletedDescription: "{name} favorilerden kaldırıldı",
      deletedFailedTitle: "Favorilerden kaldırılamadı"
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
      deletedFailedTitle: "Sanatçı silinemedi"
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
