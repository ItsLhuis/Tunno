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
      hoursAgo: "{{count}} घंटे पहले",
      today: "आज",
      yesterday: "कल",
      goBack: "वापस जाएं",
      goFoward: "आगे जाएं",
      favorite: "पसंदीदा",
      unfavorite: "पसंदीदा हटाएं",
      enableShuffle: "शफल चालू करें",
      disableShuffle: "शफल बंद करें",
      previous: "पिछला",
      play: "चलाएं",
      pause: "रोकें",
      next: "अगला",
      enableRepeat: "दोहराएं चालू करें",
      enableRepeatOne: "एक दोहराएं",
      disableRepeat: "दोहराएं बंद करें",
      mute: "आवाज़ बंद करें",
      unmute: "आवाज़ चालू करें",
      queue: "क्यू",
      title: "शीर्षक",
      album: "एल्बम",
      date: "दिनांक",
      duration: "अवधि",
      search: "खोजें",
      selectAll: "सभी चुनें",
      visibility: "दृश्यता",
      columns: "कॉलम",
      clear: "साफ करें",
      cancel: "रद्द करें",
      more: "और"
    },
    form: {
      titles: {
        createSong: "गाना बनाएं",
        updateSong: "गाना संपादित करें",
        deleteSong: "गाना हटाएं",
        createArtist: "कलाकार बनाएं",
        updateArtist: "कलाकार संपादित करें",
        deleteArtist: "कलाकार हटाएं",
        createPlaylist: "प्लेलिस्ट बनाएं",
        updatePlaylist: "प्लेलिस्ट संपादित करें",
        deletePlaylist: "प्लेलिस्ट हटाएं",
        confirmation: "पुष्टि",
        warning: "चेतावनी"
      },
      labels: {
        name: "नाम",
        thumbnail: "थंबनेल",
        file: "फ़ाइल",
        releaseYear: "रिलीज़ वर्ष",
        album: "एल्बम",
        artists: "कलाकार",
        isSingle: "सिंगल है"
      },
      buttons: {
        cancel: "रद्द करें",
        delete: "हटाएं",
        update: "अपडेट करें",
        create: "बनाएं"
      },
      descriptions: {
        thumbnail: "पृष्ठभूमि चित्र (वैकल्पिक)",
        fileSize: "अधिकतम आकार: {{size}}",
        supportedFormats: "समर्थित प्रारूप: {{formats}}"
      },
      messages: {
        confirmDelete: "क्या आप वाकई हटाना चाहते हैं?",
        unsavedChanges: "असहेजे गए परिवर्तन हैं"
      }
    },
    validation: {
      name: {
        required: "नाम आवश्यक है",
        max: "नाम अधिकतम 200 अक्षरों का होना चाहिए"
      },
      file: {
        required: "फ़ाइल आवश्यक है"
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
        invalid: "अमान्य एल्बम",
        requiredIfNotSingle: "यदि सिंगल नहीं है तो एल्बम आवश्यक है"
      },
      artists: {
        min: "कम से कम एक कलाकार आवश्यक है"
      }
    },
    update: {
      downloading: "अपडेट डाउनलोड और इंस्टॉल हो रहा है",
      downloadingDescription: "एक नया अपडेट उपलब्ध है और स्वचालित रूप से इंस्टॉल हो रहा है",
      installedSuccess: "अपडेट सफलतापूर्वक इंस्टॉल हुआ",
      failed: "अपडेट इंस्टॉल करने में विफल"
    },
    breadcrumbs: {
      home: {
        title: "होम"
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
      title: "होम"
    },
    songs: {
      title: "गाने",
      createdTitle: "गाना सफलतापूर्वक बना",
      createdDescription: "{{name}} बना दिया गया है",
      createdFailedTitle: "गाना बनाने में विफल",
      updatedTitle: "गाना सफलतापूर्वक अपडेट हुआ",
      updatedDescription: "{{name}} अपडेट हो गया है",
      updatedFailedTitle: "गाना अपडेट करने में विफल",
      deletedTitle: "गाना सफलतापूर्वक हटा",
      deletedDescription: "{{name}} हटा दिया गया है",
      deletedFailedTitle: "गाना हटाने में विफल"
    },
    favorites: {
      title: "पसंदीदा",
      createdTitle: "पसंदीदा में जोड़ा गया",
      createdDescription: "{{name}} को पसंदीदा में जोड़ दिया गया है",
      createdFailedTitle: "पसंदीदा में जोड़ने में विफल",
      deletedTitle: "पसंदीदा से हटाया गया",
      deletedDescription: "{{name}} को पसंदीदा से हटा दिया गया है",
      deletedFailedTitle: "पसंदीदा से हटाने में विफल"
    },
    playlists: {
      title: "प्लेलिस्ट",
      createdTitle: "प्लेलिस्ट सफलतापूर्वक बना",
      createdDescription: "{{name}} बना दिया गया है",
      createdFailedTitle: "प्लेलिस्ट बनाने में विफल",
      updatedTitle: "प्लेलिस्ट सफलतापूर्वक अपडेट हुआ",
      updatedDescription: "{{name}} अपडेट हो गया है",
      updatedFailedTitle: "प्लेलिस्ट अपडेट करने में विफल",
      deletedTitle: "प्लेलिस्ट सफलतापूर्वक हटा",
      deletedDescription: "{{name}} हटा दिया गया है",
      deletedFailedTitle: "प्लेलिस्ट हटाने में विफल"
    },
    artists: {
      title: "कलाकार",
      createdTitle: "कलाकार सफलतापूर्वक बना",
      createdDescription: "{{name}} बना दिया गया है",
      createdFailedTitle: "कलाकार बनाने में विफल",
      updatedTitle: "कलाकार सफलतापूर्वक अपडेट हुआ",
      updatedDescription: "{{name}} अपडेट हो गया है",
      updatedFailedTitle: "कलाकार अपडेट करने में विफल",
      deletedTitle: "कलाकार सफलतापूर्वक हटा",
      deletedDescription: "{{name}} हटा दिया गया है",
      deletedFailedTitle: "कलाकार हटाने में विफल"
    },
    settings: {
      title: "सेटिंग्स",
      appearance: {
        title: "दिखावट",
        description: "अपना पसंदीदा दिखावट मोड चुनें",
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
        description: "अपने डेटा को सभी डिवाइसों में सिंक करें"
      }
    },
    fastUpload: {
      title: "तेज़ अपलोड"
    },
    languages: {
      da: "डेनिश",
      de: "जर्मन",
      en: "अंग्रेजी",
      es: "स्पेनिश",
      fi: "फिनिश",
      fr: "फ्रेंच",
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
