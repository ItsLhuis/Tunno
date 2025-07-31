import Hi from "../assets/hi.svg"

import { type Language } from "../types"

export const hindi: Language = {
  code: "hi",
  name: "हिन्दी",
  flag: Hi,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "कोई परिणाम नहीं मिला",
      lessThanAnHourAgo: "एक घंटे से कम पहले",
      hoursAgo: "{count} घंटे पहले",
      today: "आज",
      yesterday: "कल",
      goBack: "वापस जाएं",
      goFoward: "आगे बढ़ें",
      favorite: "पसंदीदा",
      unfavorite: "पसंदीदा हटाएं",
      enableShuffle: "शफल सक्षम करें",
      disableShuffle: "शफल अक्षम करें",
      previous: "पिछला",
      play: "चलाएं",
      pause: "रोकें",
      next: "अगला",
      enableRepeat: "दोहराएँ सक्षम करें",
      enableRepeatOne: "एक बार दोहराएँ सक्षम करें",
      disableRepeat: "दोहराएँ अक्षम करें",
      mute: "म्यूट करें",
      unmute: "अनम्यूट करें",
      queue: "कतार",
      title: "शीर्षक",
      album: "एल्बम",
      date: "तारीख",
      duration: "अवधि",
      search: "खोजें",
      selectAll: "सभी चुनें",
      visibility: "दृश्यता",
      columns: "स्तंभ",
      clear: "साफ़ करें",
      cancel: "रद्द करें",
      more: "और",
      select: "चुनें",
      preview: "पूर्वावलोकन",
      close: "बंद करें"
    },
    form: {
      titles: {
        createSong: "गाना बनाएं",
        updateSong: "गाना अपडेट करें",
        deleteSong: "गाना हटाएं",
        createArtist: "कलाकार बनाएं",
        updateArtist: "कलाकार अपडेट करें",
        deleteArtist: "कलाकार हटाएं",
        createPlaylist: "प्लेलिस्ट बनाएं",
        updatePlaylist: "प्लेलिस्ट अपडेट करें",
        deletePlaylist: "प्लेलिस्ट हटाएं",
        confirmation: "पुष्टि",
        warning: "चेतावनी",
        lyricsPreview: "गीतों का पूर्वावलोकन"
      },
      labels: {
        name: "नाम",
        thumbnail: "थंबनेल",
        file: "फ़ाइल",
        releaseYear: "रिलीज़ वर्ष",
        album: "एल्बम",
        artists: "कलाकार",
        folder: "फ़ोल्डर",
        lyrics: "गीत"
      },
      buttons: {
        cancel: "रद्द करें",
        delete: "हटाएं",
        update: "अपडेट करें",
        create: "बनाएं"
      },
      descriptions: {
        thumbnail: "पृष्ठभूमि छवि (वैकल्पिक)",
        fileSize: "अधिकतम आकार: {size}",
        supportedFormats: "समर्थित प्रारूप: {formats}",
        lyricsPreview: "गीतों को समय के साथ सिंक्रनाइज़्ड दिखाएं"
      },
      badges: {
        lines: "{count} पंक्ति{count, plural, one {} other{s}}",
        duration: "अवधि: {time}"
      },
      messages: {
        confirmDelete: "क्या आप वाकई हटाना चाहते हैं?",
        unsavedChanges: "असहेजे गए परिवर्तन मौजूद हैं",
        noLyrics: "कोई गीत नहीं"
      }
    },
    validation: {
      name: {
        required: "नाम आवश्यक है",
        max: "नाम अधिकतम 200 वर्ण का होना चाहिए"
      },
      file: {
        required: "फ़ाइल आवश्यक है",
        invalid: "अमान्य या क्षतिग्रस्त फ़ाइल",
        max: "फ़ाइल अधिकतम आकार {maxSize} से बड़ी है"
      },
      duration: {
        required: "अवधि आवश्यक है",
        min: "अवधि कम से कम 0 होनी चाहिए"
      },
      releaseYear: {
        invalid: "अमान्य रिलीज़ वर्ष",
        min: "रिलीज़ वर्ष कम से कम 0 होना चाहिए",
        max: "रिलीज़ वर्ष भविष्य में नहीं हो सकता"
      },
      albumId: {
        invalid: "अमान्य एल्बम"
      },
      artists: {
        invalid: "अमान्य कलाकार"
      }
    },
    update: {
      downloading: "अपडेट डाउनलोड और इंस्टॉल हो रहा है",
      downloadingDescription: "नया अपडेट उपलब्ध है और स्वतः इंस्टॉल हो रहा है",
      installedSuccess: "अपडेट सफलतापूर्वक इंस्टॉल हो गया",
      failed: "अपडेट इंस्टॉल करने में विफल"
    },
    breadcrumbs: {
      home: {
        title: "मुख्य पृष्ठ"
      },
      songs: {
        title: "गाने"
      },
      favorites: {
        title: "पसंदीदा"
      },
      playlists: {
        title: "प्लेलिस्ट"
      },
      artists: {
        title: "कलाकार"
      },
      fastUpload: {
        title: "तेज़ अपलोड"
      },
      settings: {
        title: "सेटिंग्स",
        appearance: {
          title: "दिखावट"
        },
        language: {
          title: "भाषा"
        },
        sync: {
          title: "सिंक"
        }
      }
    },
    home: {
      title: "मुख्य पृष्ठ"
    },
    songs: {
      title: "गाने",
      createdTitle: "गाना सफलतापूर्वक बनाया गया",
      createdDescription: "{name} बनाया गया है",
      createdFailedTitle: "गाना बनाने में विफल",
      updatedTitle: "गाना सफलतापूर्वक अपडेट हुआ",
      updatedDescription: "{name} अपडेट किया गया है",
      updatedFailedTitle: "गाना अपडेट करने में विफल",
      deletedTitle: "गाना सफलतापूर्वक हटाया गया",
      deletedDescription: "{name} हटाया गया है",
      deletedFailedTitle: "गाना हटाने में विफल"
    },
    favorites: {
      title: "पसंदीदा",
      createdTitle: "पसंदीदा में जोड़ा गया",
      createdDescription: "{name} को पसंदीदा में जोड़ा गया है",
      createdFailedTitle: "पसंदीदा में जोड़ने में विफल",
      deletedTitle: "पसंदीदा से हटाया गया",
      deletedDescription: "{name} को पसंदीदा से हटाया गया है",
      deletedFailedTitle: "पसंदीदा से हटाने में विफल"
    },
    playlists: {
      title: "प्लेलिस्ट",
      createdTitle: "प्लेलिस्ट सफलतापूर्वक बनाई गई",
      createdDescription: "{name} बनाई गई है",
      createdFailedTitle: "प्लेलिस्ट बनाने में विफल",
      updatedTitle: "प्लेलिस्ट सफलतापूर्वक अपडेट हुई",
      updatedDescription: "{name} अपडेट की गई है",
      updatedFailedTitle: "प्लेलिस्ट अपडेट करने में विफल",
      deletedTitle: "प्लेलिस्ट सफलतापूर्वक हटाई गई",
      deletedDescription: "{name} हटाई गई है",
      deletedFailedTitle: "प्लेलिस्ट हटाने में विफल"
    },
    artists: {
      title: "कलाकार",
      createdTitle: "कलाकार सफलतापूर्वक बनाया गया",
      createdDescription: "{name} बनाया गया है",
      createdFailedTitle: "कलाकार बनाने में विफल",
      updatedTitle: "कलाकार सफलतापूर्वक अपडेट हुआ",
      updatedDescription: "{name} अपडेट किया गया है",
      updatedFailedTitle: "कलाकार अपडेट करने में विफल",
      deletedTitle: "कलाकार सफलतापूर्वक हटाया गया",
      deletedDescription: "{name} हटाया गया है",
      deletedFailedTitle: "कलाकार हटाने में विफल"
    },
    settings: {
      title: "सेटिंग्स",
      appearance: {
        title: "दिखावट",
        description: "अपनी पसंदीदा दिखावट चुनें",
        light: "हल्का",
        dark: "गहरा",
        system: "सिस्टम"
      },
      language: {
        title: "भाषा",
        description: "अपनी पसंदीदा भाषा चुनें"
      },
      sync: {
        title: "सिंक",
        description: "अपने डेटा को उपकरणों के बीच सिंक्रनाइज़ करें"
      }
    },
    fastUpload: {
      title: "तेज़ अपलोड"
    },
    languages: {
      da: "डेनिश",
      de: "जर्मन",
      en: "अंग्रेज़ी",
      es: "स्पेनिश",
      fi: "फ़िनिश",
      fr: "फ़्रेंच",
      hi: "हिन्दी",
      it: "इतालवी",
      ja: "जापानी",
      ko: "कोरियाई",
      nl: "डच",
      no: "नॉर्वेजियन",
      pl: "पोलिश",
      pt: "पुर्तगाली",
      ru: "रूसी",
      sv: "स्वीडिश",
      tr: "तुर्की",
      uk: "यूक्रेनी",
      vi: "वियतनामी",
      zh: "चीनी"
    }
  }
}
