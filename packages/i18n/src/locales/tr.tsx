import Tr from "../assets/tr.svg"

import { type Language } from "../types"

/**
 * Turkish language configuration.
 */
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
      thisWeek: "Bu Hafta",
      thisMonth: "Bu Ay",
      yesterday: "Dün",
      years: "{count} yıl{count, plural, one {} other{}}",
      weeks: "{count} hafta{count, plural, one {} other{}}",
      days: "{count} gün{count, plural, one {} other{}}",
      hours: "{count} saat{count, plural, one {} other{}}",
      minutes: "{count} dakika{count, plural, one {} other{}}",
      seconds: "{count} saniye{count, plural, one {} other{}}",
      goBack: "Geri git",
      goForward: "İleri git",
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
      removeFromQueue: "Kuyruktan kaldır",
      removeFromPlaylist: "Çalma Listesinden Kaldır",
      nowPlaying: "Şimdi çalıyor",
      noSongPlaying: "Hiçbir şey çalmıyor",
      upNext: "Sırada",
      actions: "Eylemler",
      addTo: "Ekle",
      playlist: "Playlist",
      song: "Şarkı",
      lyrics: "Şarkı sözü",
      openMiniplayer: "Miniçalıcıyı aç",
      enterFullScreen: "Tam ekrana geç",
      exitFullScreen: "Tam ekrandan çık",
      goToSong: "Şarkıya git",
      goToAlbum: "Albüme git",
      goToPlaylist: "Playlist'e git",
      goToArtist: "Sanatçıya git",
      shuffleAndPlay: "Karıştır ve çal",
      unknown: "Bilinmeyen",
      unknownAlbum: "Bilinmeyen albüm",
      unknownArtist: "Bilinmeyen sanatçı",
      listenTime: "Dinleme süresi",
      averageListenTime: "Ortalama dinleme süresi",
      retentionRate: "Tutma oranı",
      totalPlays: "Toplam çalma",
      lastPlayed: "Son çalınan",
      neverPlayed: "Hiç çalınmadı",
      streak: "Seri",
      refresh: "Yenile",
      showingOfTotal: "{total} üzerinden {showing} gösteriliyor",
      start: "Başlat",
      completed: "Tamamlandı",
      songsPlayed: "{count} şarkı{count, plural, one {} other{}}",
      appearsIn: "Yer aldığı",
      addToSidebar: "Kenar çubuğuna ekle",
      removeFromSidebar: "Kenar çubuğundan kaldır",
      featured: "Öne Çıkanlar",
      stats: "İstatistikler"
    },
    form: {
      titles: {
        createSong: "Şarkı Oluştur",
        updateSong: "Şarkıyı Güncelle",
        deleteSong: "Şarkıyı Sil",
        createArtist: "Sanatçı Oluştur",
        updateArtist: "Sanatçıyı Güncelle",
        deleteArtist: "Sanatçıyı Sil",
        createAlbum: "Albüm Oluştur",
        updateAlbum: "Albümü Güncelle",
        deleteAlbum: "Albümü Sil",
        createPlaylist: "Playlist Oluştur",
        updatePlaylist: "Playlist'i Güncelle",
        deletePlaylist: "Playlist'i Sil",
        addToPlaylist: "Çalma Listelerine Ekle",
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
        albumType: "Albüm Türü",
        artists: "Sanatçılar",
        folder: "Klasör",
        lyrics: "Şarkı Sözleri"
      },
      buttons: {
        cancel: "İptal",
        delete: "Sil",
        update: "Güncelle",
        create: "Oluştur",
        add: "Ekle"
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
      },
      albumType: {
        invalid: "Geçersiz albüm türü"
      },
      playlistIds: {
        invalid: "Geçersiz çalma listeleri"
      },
      album: {
        duplicate: "Bu isimde bir albüm zaten mevcut",
        integrity:
          "Bu albüm ve bu sanatçıya ait şarkılar olduğu için albümden sanatçı kaldırılamıyor"
      },
      artist: {
        duplicate: "Bu isimde bir sanatçı zaten mevcut",
        integrity:
          "Sanatçı silinemiyor çünkü hem bu sanatçıya hem de bu sanatçıyı içeren albümlere ait şarkılar var"
      },
      playlist: {
        duplicate: "Bu isimde bir çalma listesi zaten mevcut"
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
        title: "Playlists"
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
        equalizer: {
          title: "Ekolayzır"
        },
        sync: {
          title: "Senkronizasyon"
        },
        about: {
          title: "Hakkında"
        }
      },
      lyrics: {
        title: "Şarkı sözü"
      }
    },
    home: {
      title: "Ana Sayfa",
      jumpBackIn: {
        title: "Devam Et",
        description: "Kaldığın yerden devam et"
      },
      yourPlaylists: {
        title: "Senin İçin Yapıldı",
        description: "Kişisel çalma listelerin"
      },
      onRepeat: {
        title: "Tekrarda",
        description: "Çalmayı bırakamadığın şarkılar"
      },
      newReleases: {
        title: "Yeni Çıkışlar",
        description: "Takip ettiğin sanatçılardan taze müzik"
      },
      favoriteArtists: {
        title: "Sanatçıların",
        description: "En çok sevdiğin sanatçılar"
      },
      discover: {
        title: "Keşfet",
        description: "Senin için yeni müzik önerileri"
      },
      empty: {
        title: "Kütüphanen boş",
        description:
          "Tunno'ya hoş geldiniz. Başlamak için kişisel kütüphanenize biraz müzik eklemeniz gerekecek.",
        getStarted: "Başla",
        songs: {
          title: "Şarkıları içe aktar",
          description:
            "Kütüphanenizi oluşturmaya başlamak için cihazınızdan müzik dosyaları ekleyin"
        },
        albums: {
          title: "Albüm oluştur",
          description: "Albüm kapakları ve detaylarıyla müziğinizi düzenleyin"
        },
        playlists: {
          title: "Çalma listesi oluştur",
          description: "Herhangi bir ruh hali veya aktivite için kendi karışımlarınızı derleyin"
        },
        artists: {
          title: "Sanatçı ekle",
          description: "Müziklerini düzenlemek ve yönetmek için sanatçı profilleri oluşturun"
        }
      }
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
      title: "Playlists",
      createdTitle: "Playlist başarıyla oluşturuldu",
      createdDescription: "{name} oluşturuldu",
      createdFailedTitle: "Playlist oluşturulamadı",
      updatedTitle: "Playlist başarıyla güncellendi",
      updatedDescription: "{name} güncellendi",
      updatedFailedTitle: "Playlist güncellenemedi",
      deletedTitle: "Playlist başarıyla silindi",
      deletedDescription: "{name} silindi",
      deletedFailedTitle: "Playlist silinemedi",
      filters: {
        title: "Filtreler",
        clear: "Aktif filtreleri temizle",
        sortBy: "Sırala",
        favorites: "Sadece favoriler",
        favoritesDescription: "Sadece favori playlistleri göster",
        playCount: "Çalma sayısı",
        playCountMin: "Minimum çalma sayısı",
        playCountMax: "Maksimum çalma sayısı",
        totalTracks: "Toplam parça",
        totalTracksMin: "Minimum parça",
        totalTracksMax: "Maksimum parça",
        totalDuration: "Toplam süre",
        totalDurationMin: "Minimum süre",
        totalDurationMax: "Maksimum süre",
        lastPlayed: "Son çalma",
        lastPlayedAfter: "Sonra",
        lastPlayedBefore: "Önce",
        selectDate: "Tarih seç",
        sortOptions: {
          name: "İsim",
          favorites: "Favoriler",
          playCount: "Çalma sayısı",
          totalTracks: "Toplam parça",
          totalDuration: "Toplam süre",
          lastPlayed: "Son çalma",
          createdAt: "Oluşturulma tarihi",
          updatedAt: "Güncelleme tarihi"
        }
      }
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
      deletedFailedTitle: "Albüm silinemedi",
      filters: {
        title: "Filtreler",
        clear: "Aktif filtreleri temizle",
        sortBy: "Sırala",
        favorites: "Sadece favoriler",
        favoritesDescription: "Sadece favori albümleri göster",
        albumType: "Albüm Türü",
        all: "Tüm türler",
        single: "Tekli",
        album: "Albüm",
        compilation: "Derleme",
        releaseYear: "Yayın Yılı",
        releaseYearMin: "Minimum yıl",
        releaseYearMax: "Maksimum yıl",
        playCount: "Çalma sayısı",
        playCountMin: "Minimum çalma sayısı",
        playCountMax: "Maksimum çalma sayısı",
        totalTracks: "Toplam parça",
        totalTracksMin: "Minimum parça",
        totalTracksMax: "Maksimum parça",
        totalDuration: "Toplam süre",
        totalDurationMin: "Minimum süre",
        totalDurationMax: "Maksimum süre",
        lastPlayed: "Son çalınan",
        lastPlayedAfter: "Çalındıktan sonra",
        lastPlayedBefore: "Çalınmadan önce",
        selectDate: "Tarih seç",
        sortOptions: {
          name: "İsim",
          releaseYear: "Yayın Yılı",
          favorites: "Favoriler",
          playCount: "Çalma sayısı",
          totalTracks: "Toplam parça",
          totalDuration: "Toplam süre",
          lastPlayed: "Son çalınan",
          createdAt: "Oluşturuldu",
          updatedAt: "Güncellendi"
        }
      }
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
    sidebar: {
      addedTitle: "Kenar çubuğuna eklendi",
      addedDescription: "{name} kenar çubuğuna eklendi",
      addedFailedTitle: "Kenar çubuğuna eklenemedi",
      removedTitle: "Kenar çubuğundan kaldırıldı",
      removedDescription: "{name} kenar çubuğundan kaldırıldı"
    },
    settings: {
      title: "Ayarlar",
      appearance: {
        title: "Görünüm",
        description: "Uygulamanın görünüm tercihlerini belirleyin.",
        theme: {
          title: "Tema",
          description: "Uygulama temasını seçin",
          light: "Açık",
          dark: "Koyu",
          system: "Sistem"
        },
        zoom: {
          title: "Yakınlaştırma",
          description: "Uygulamanın yakınlaştırma seviyesini ayarlayın"
        }
      },
      language: {
        title: "Dil",
        description: "Tercih ettiğiniz dili seçin"
      },
      equalizer: {
        title: "Ekolayzır",
        enable: {
          title: "Ekolayzırı Etkinleştir",
          description: "Ses ekolayzırını etkinleştirin veya devre dışı bırakın",
          enabled: "Etkin",
          disabled: "Devre Dışı"
        },
        presets: {
          title: "Ekolayzır Ön Ayarları",
          description: "Önceden tanımlanmış ekolayzır ayarlarından seçin",
          flat: {
            label: "Düz",
            description: "Ayarlama yok"
          },
          rock: {
            label: "Rock",
            description: "Güçlendirilmiş bas ve tiz"
          },
          pop: {
            label: "Pop",
            description: "Hafif artışla dengelenmiş"
          },
          jazz: {
            label: "Jazz",
            description: "Orta frekanslarda yumuşak vurgu"
          },
          classical: {
            label: "Klasik",
            description: "Doğal ses"
          },
          electronic: {
            label: "Elektronik",
            description: "Ağır bas ve net tiz"
          },
          vocal: {
            label: "Vokal",
            description: "Netlik için orta frekans artışı"
          },
          bass: {
            label: "Bas",
            description: "Düşük frekanslarda ağır vurgu"
          },
          treble: {
            label: "Tiz",
            description: "Yüksek frekanslarda vurgu"
          }
        },
        bands: {
          title: "Frekans Bantları",
          description: "Bireysel frekans bantlarını ayarlayın"
        },
        reset: {
          title: "Ekolayzırı Sıfırla",
          description: "Tüm bantları düze sıfırla (0 dB)",
          button: "Düze Sıfırla"
        }
      },
      sync: {
        title: "Senkronizasyon",
        description: "Verilerinizi cihazlar arasında senkronize edin",
        export: {
          title: "Kütüphaneyi dışa aktar",
          description:
            "Kütüphanenizi yedekleme veya başka bir cihazda kullanmak için paket dosyası olarak dışa aktarın",
          selectDestination: "Hedef seçin",
          exportingSongs: "{count} şarkı dışa aktarılıyor",
          preparingExport: "Dışa aktarma hazırlanıyor",
          exportingMessage: "Bu biraz zaman alabilir",
          exportSuccess: "Kütüphane başarıyla dışa aktarıldı",
          showFolder: "Klasörü göster",
          exportAgain: "Tekrar dışa aktar",
          exportFailed: "Dışa aktarma başarısız",
          tryAgain: "Tekrar dene",
          noSongs: "Dışa aktarılacak şarkı yok",
          libraryEmpty: "Kütüphanen boş",
          noValidSongs: "Dışa aktarılacak geçerli şarkı yok",
          missingAlbumInfo: "Tüm şarkılarda albüm bilgisi eksik",
          songsExported: "{count} şarkı pakete dışa aktarıldı"
        }
      },
      about: {
        title: "Hakkında",
        description: "Uygulama bilgileri ve sürüm ayrıntıları",
        version: "Sürüm",
        whatsNew: {
          title: "Yenilikler",
          description: "En son özellikleri ve iyileştirmeleri kontrol edin",
          newRelease: "Yeni sürüm",
          viewChangelog: "Değişiklik listesini görüntüle"
        },
        storage: {
          title: "Depolama ve Veri",
          description: "Uygulama verilerini ve ayarlarını yönet",
          openDataFolder: "Veri klasörünü aç"
        },
        legal: {
          title: "Yasal ve Telif Hakkı",
          description: "Lisans bilgileri ve yasal belgeler",
          copyright: "Telif Hakkı",
          licensed: "MIT lisansı altında lisanslıdır",
          viewLicense: "Lisansı görüntüle",
          viewOnGitHub: "GitHub'da görüntüle"
        }
      }
    },
    fastUpload: {
      title: "Hızlı Yükleme",
      description: "CLI'dan veya dışa aktarılan paketleri içe aktar",
      cliTooltip: "Tunno CLI belgelerini aç",
      selectBundle: "Paket seç",
      changeBundle: "Paketi değiştir",
      status: {
        pending: "Beklemede",
        processing: "İşleniyor",
        success: "Başarılı",
        error: "Hata",
        skipped: "Atlandı"
      },
      completed: {
        allSuccess: {
          title: "İçe Aktarma Tamamlandı!",
          description: "{count} parça başarıyla içe aktarıldı"
        },
        withErrors: {
          title: "Hatalarla İçe Aktarma Tamamlandı",
          description:
            "{successCount} içe aktarıldı, {errorCount} başarısız, {skippedCount} atlandı"
        },
        withSkipped: {
          title: "İçe Aktarma Tamamlandı",
          description: "{successCount} içe aktarıldı, {skippedCount} atlandı"
        }
      }
    },
    lyrics: {
      title: "Şarkı sözü"
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
