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
      lessThanAnHourAgo: "एक घंटे से भी कम समय पहले",
      hoursAgo: "{{count}} घंटा{{count, plural, one {} other{े}}} पहले",
      today: "आज",
      yesterday: "कल"
    },
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
      addedDescription: "{{name}} को पसंदीदा में जोड़ा गया है",
      addedFailedTitle: "पसंदीदा में जोड़ने में विफल",
      removedTitle: "पसंदीदा से हटाया गया",
      removedDescription: "{{name}} को पसंदीदा से हटाया गया है",
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
      title: "सेटिंग्स"
    }
  }
}
