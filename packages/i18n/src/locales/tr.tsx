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
      goBack: "Geri dön",
      goFoward: "İleri git",
      favorite: "Favori",
      unfavorite: "Favoriden çıkar",
      enableShuffle: "Karıştırmayı etkinleştir",
      disableShuffle: "Karıştırmayı devre dışı bırak",
      previous: "Önceki",
      play: "Oynat",
      pause: "Duraklat",
      next: "Sonraki",
      enableRepeat: "Tekrarı etkinleştir",
      enableRepeatOne: "Birini tekrarla",
      disableRepeat: "Tekrarı devre dışı bırak",
      mute: "Sessize al",
      unmute: "Sesi aç",
      queue: "Kuyruk",
      title: "Başlık",
      album: "Albüm",
      date: "Tarih",
      duration: "Süre",
      search: "Ara",
      selectAll: "Tümünü seç",
      visibility: "Görünürlük",
      columns: "Sütunlar",
      clear: "Temizle",
      cancel: "İptal",
      more: "Daha fazla",
      select: "Seç"
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
        warning: "Uyarı"
      },
      labels: {
        name: "Ad",
        thumbnail: "Küçük Resim",
        file: "Dosya",
        releaseYear: "Yayın Yılı",
        album: "Albüm",
        artists: "Sanatçılar",
        isSingle: "Tekli mi",
        folder: "Klasör"
      },
      buttons: {
        cancel: "İptal",
        delete: "Sil",
        update: "Güncelle",
        create: "Oluştur"
      },
      descriptions: {
        thumbnail: "Arka plan resmi (isteğe bağlı)",
        fileSize: "Maksimum boyut: {{size}}",
        supportedFormats: "Desteklenen formatlar: {{formats}}"
      },
      messages: {
        confirmDelete: "Silmek istediğinizden emin misiniz?",
        unsavedChanges: "Kaydedilmemiş değişiklikleriniz var"
      }
    },
    validation: {
      name: {
        required: "Ad gerekli",
        max: "Ad en fazla 200 karakter olabilir"
      },
      file: {
        required: "Dosya gerekli",
        invalid: "Geçersiz veya bozuk dosya",
        max: "Dosya maksimum boyutu {{maxSize}} aşıyor"
      },
      duration: {
        required: "Süre gerekli",
        min: "Süre 0'dan büyük olmalı"
      },
      releaseYear: {
        invalid: "Geçersiz yıl",
        min: "Yıl 0'dan büyük olmalı",
        max: "Yıl gelecek olamaz"
      },
      albumId: {
        invalid: "Geçersiz albüm",
        requiredIfNotSingle: "Tekli değilse albüm gerekli"
      },
      artists: {
        min: "En az bir sanatçı gerekli"
      }
    },
    update: {
      downloading: "Güncelleme indiriliyor ve kuruluyor",
      downloadingDescription: "Yeni bir güncelleme mevcut, otomatik olarak kurulacak",
      installedSuccess: "Güncelleme başarıyla kuruldu",
      failed: "Güncelleme yüklenemedi"
    },
    breadcrumbs: {
      home: { title: "Ana Sayfa" },
      songs: { title: "Şarkılar" },
      favorites: { title: "Favoriler" },
      playlists: { title: "Çalma Listeleri" },
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
      createdTitle: "Şarkı eklendi",
      createdDescription: "{{name}} eklendi",
      createdFailedTitle: "Şarkı eklenemedi",
      updatedTitle: "Şarkı güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Şarkı güncellenemedi",
      deletedTitle: "Şarkı silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Şarkı silinemedi"
    },
    favorites: {
      title: "Favoriler",
      createdTitle: "Favorilere eklendi",
      createdDescription: "{{name}} favorilere eklendi",
      createdFailedTitle: "Favorilere eklenemedi",
      deletedTitle: "Favorilerden çıkarıldı",
      deletedDescription: "{{name}} favorilerden çıkarıldı",
      deletedFailedTitle: "Favoriden çıkarılamadı"
    },
    playlists: {
      title: "Çalma Listeleri",
      createdTitle: "Çalma listesi oluşturuldu",
      createdDescription: "{{name}} oluşturuldu",
      createdFailedTitle: "Çalma listesi oluşturulamadı",
      updatedTitle: "Çalma listesi güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Çalma listesi güncellenemedi",
      deletedTitle: "Çalma listesi silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Çalma listesi silinemedi"
    },
    artists: {
      title: "Sanatçılar",
      createdTitle: "Sanatçı eklendi",
      createdDescription: "{{name}} eklendi",
      createdFailedTitle: "Sanatçı eklenemedi",
      updatedTitle: "Sanatçı güncellendi",
      updatedDescription: "{{name}} güncellendi",
      updatedFailedTitle: "Sanatçı güncellenemedi",
      deletedTitle: "Sanatçı silindi",
      deletedDescription: "{{name}} silindi",
      deletedFailedTitle: "Sanatçı silinemedi"
    },
    settings: {
      title: "Ayarlar",
      appearance: {
        title: "Görünüm",
        description: "Tercih edilen temayı seçin",
        light: "Açık",
        dark: "Koyu",
        system: "Sistem"
      },
      language: {
        title: "Dil",
        description: "Tercih edilen dili seçin"
      },
      sync: {
        title: "Senkronizasyon",
        description: "Verileri cihazlar arasında senkronize et"
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
      nl: "Felemenkçe",
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
