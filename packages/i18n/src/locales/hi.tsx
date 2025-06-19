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
      unfavorite: "पसंदीदा से हटाएं",
      enableShuffle: "शफल सक्षम करें",
      disableShuffle: "शफल अक्षम करें",
      previous: "पिछला",
      play: "चलाएं",
      pause: "रोकें",
      next: "अगला",
      enableRepeat: "दोहराना सक्षम करें",
      enableRepeatOne: "एक बार दोहराएं",
      disableRepeat: "दोहराना अक्षम करें",
      mute: "म्यूट",
      unmute: "म्यूट हटाएं",
      devices: "डिवाइस",
      queue: "कतार"
    },
    update: {
      downloading: "अपडेट डाउनलोड और इंस्टॉल हो रहा है",
      downloadingDescription: "एक नया अपडेट उपलब्ध है और स्वचालित रूप से इंस्टॉल हो रहा है",
      installedSuccess: "अपडेट सफलतापूर्वक इंस्टॉल हो गया",
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
    home: { title: "होम" },
    songs: {
      title: "गाने",
      createdTitle: "गाना सफलतापूर्वक बनाया गया",
      createdDescription: "{{name}} बनाया गया है",
      createdFailedTitle: "गाना बनाने में विफल",
      updatedTitle: "गाना सफलतापूर्वक अपडेट किया गया",
      updatedDescription: "{{name}} अपडेट किया गया है",
      updatedFailedTitle: "गाना अपडेट करने में विफल",
      deletedTitle: "गाना सफलतापूर्वक हटाया गया",
      deletedDescription: "{{name}} हटाया गया है",
      deletedFailedTitle: "गाना हटाने में विफल"
    },
    favorites: {
      title: "पसंदीदा",
      addedTitle: "पसंदीदा में जोड़ा गया",
      addedDescription: "{{name}} पसंदीदा में जोड़ा गया है",
      addedFailedTitle: "पसंदीदा में जोड़ने में विफल",
      removedTitle: "पसंदीदा से हटाया गया",
      removedDescription: "{{name}} पसंदीदा से हटाया गया है",
      removedFailedTitle: "पसंदीदा से हटाने में विफल"
    },
    playlists: {
      title: "प्लेलिस्ट",
      createdTitle: "प्लेलिस्ट सफलतापूर्वक बनाई गई",
      createdDescription: "{{name}} बनाई गई है",
      createdFailedTitle: "प्लेलिस्ट बनाने में विफल",
      updatedTitle: "प्लेलिस्ट सफलतापूर्वक अपडेट की गई",
      updatedDescription: "{{name}} अपडेट की गई है",
      updatedFailedTitle: "प्लेलिस्ट अपडेट करने में विफल",
      deletedTitle: "प्लेलिस्ट सफलतापूर्वक हटाई गई",
      deletedDescription: "{{name}} हटाई गई है",
      deletedFailedTitle: "प्लेलिस्ट हटाने में विफल"
    },
    artists: {
      title: "कलाकार",
      createdTitle: "कलाकार सफलतापूर्वक बनाया गया",
      createdDescription: "{{name}} बनाया गया है",
      createdFailedTitle: "कलाकार बनाने में विफल",
      updatedTitle: "कलाकार सफलतापूर्वक अपडेट किया गया",
      updatedDescription: "{{name}} अपडेट किया गया है",
      updatedFailedTitle: "कलाकार अपडेट करने में विफल",
      deletedTitle: "कलाकार सफलतापूर्वक हटाया गया",
      deletedDescription: "{{name}} हटाया गया है",
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
        description: "अपने डेटा को डिवाइस के बीच सिंक करें"
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
