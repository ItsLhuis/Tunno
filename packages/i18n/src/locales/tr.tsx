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
      hoursAgo: "{{count}} saat önce",
      today: "Bugün",
      yesterday: "Dün",
      goBack: "Geri Git",
      goFoward: "İleri Git",
      favorite: "Favori",
      unfavorite: "Favorilerden Kaldır",
      enableShuffle: "Karıştırmayı Etkinleştir",
      disableShuffle: "Karıştırmayı Devre Dışı Bırak",
      previous: "Önceki",
      play: "Oynat",
      pause: "Duraklat",
      next: "Sonraki",
      enableRepeat: "Tekrarı Etkinleştir",
      enableRepeatOne: "Tekrar Birini Etkinleştir",
      disableRepeat: "Tekrarı Devre Dışı Bırak",
      mute: "Sessize Al",
      unmute: "Sessizliği Kapat",
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
      more: "Daha Fazla"
    },
    form: {
      titles: {
        createSong: "Şarkı Oluştur",
        updateSong: "Şarkıyı Güncelle",
        deleteSong: "Şarkıyı Sil",
        createArtist: "Sanatçı Oluştur",
        updateArtist: "Sanatçıyı Güncelle",
        deleteArtist: "Sanatçıyı Sil",
        createPlaylist: "Oynatma Listesi Oluştur",
        updatePlaylist: "Oynatma Listesini Güncelle",
        deletePlaylist: "Oynatma Listesini Sil",
        confirmation: "Onay",
        warning: "Uyarı"
      },
      labels: {
        name: "İsim",
        thumbnail: "Küçük Resim",
        file: "Dosya",
        releaseYear: "Çıkış Yılı",
        album: "Albüm",
        artists: "Sanatçılar",
        isSingle: "Tekli mi"
      },
      buttons: {
        cancel: "İptal",
        delete: "Sil",
        update: "Güncelle",
        create: "Oluştur"
      },
      descriptions: {
        thumbnail: "Arka plan resmi (isteğe bağlı)",
        dragAndDrop: "Dosyayı buraya sürükleyip bırakın",
        fileSize: "Maksimum boyut: {{size}}",
        supportedFormats: "Desteklenen formatlar: {{formats}}"
      },
      messages: {
        confirmDelete: "Silmek istediğinizden emin misiniz?",
        unsavedChanges: "Kaydedilmemiş değişiklikler var"
      }
    },
    validation: {
      name: {
        required: "İsim zorunludur",
        max: "İsim en fazla 200 karakter olabilir"
      },
      file: {
        required: "Dosya zorunludur"
      },
      duration: {
        required: "Süre zorunludur",
        min: "Süre en az 0 olmalıdır"
      },
      releaseYear: {
        invalid: "Geçersiz çıkış yılı",
        min: "Çıkış yılı en az 0 olmalıdır",
        max: "Çıkış yılı gelecekte olamaz"
      },
      albumId: {
        invalid: "Geçersiz albüm",
        requiredIfNotSingle: "Tekli değilse albüm zorunludur"
      },
      artists: {
        min: "En az bir sanatçı gereklidir"
      }
    },
    update: {
      downloading: "Güncelleme indiriliyor ve kuruluyor",
      downloadingDescription: "Yeni bir güncelleme mevcut ve otomatik olarak kuruluyor",
      installedSuccess: "Güncelleme başarıyla yüklendi",
      failed: "Güncelleme yüklenemedi"
    },
    breadcrumbs: {
      home: { title: "Ana Sayfa" },
      songs: { title: "Şarkılar" },
      favorites: { title: "Favoriler" },
      playlists: { title: "Oynatma Listeleri" },
      artists: { title: "Sanatçılar" },
      fastUpload: { title: "Hızlı Yükleme" },
      settings: {
        title: "Ayarlar",
        appearance: { title: "Görünüm" },
        language: { title: "Dil" },
        sync: { title: "Senkronizasyon" }
      }
    },
    home: { title: "Ana Sayfa" },
    songs: {
      title: "Şarkılar",
      createdTitle: "Şarkı Başarıyla Oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Şarkı Oluşturma Başarısız",
      updatedTitle: "Şarkı Başarıyla Güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Şarkı Güncelleme Başarısız",
      deletedTitle: "Şarkı Başarıyla Silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Şarkı Silme Başarısız"
    },
    favorites: {
      title: "Favoriler",
      createdTitle: "Favorilere Eklendi",
      createdDescription: "{{name}} favorilere eklendi",
      createdFailedTitle: "Favorilere Ekleme Başarısız",
      deletedTitle: "Favorilerden Kaldırıldı",
      deletedDescription: "{{name}} favorilerden kaldırıldı",
      deletedFailedTitle: "Favorilerden Kaldırma Başarısız"
    },
    playlists: {
      title: "Oynatma Listeleri",
      createdTitle: "Oynatma Listesi Başarıyla Oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Oynatma Listesi Oluşturma Başarısız",
      updatedTitle: "Oynatma Listesi Başarıyla Güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Oynatma Listesi Güncelleme Başarısız",
      deletedTitle: "Oynatma Listesi Başarıyla Silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Oynatma Listesi Silme Başarısız"
    },
    artists: {
      title: "Sanatçılar",
      createdTitle: "Sanatçı Başarıyla Oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Sanatçı Oluşturma Başarısız",
      updatedTitle: "Sanatçı Başarıyla Güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Sanatçı Güncelleme Başarısız",
      deletedTitle: "Sanatçı Başarıyla Silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Sanatçı Silme Başarısız"
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
    fastUpload: { title: "Hızlı Yükleme" },
    languages: {
      da: "Danimarkaca",
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
