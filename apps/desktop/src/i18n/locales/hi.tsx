import Hi from "@assets/images/flags/hi.svg"

import { type Language } from "../types"

export const hindi: Language = {
  code: "hi",
  name: "हिन्दी",
  flag: Hi,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "कोई परिणाम नहीं मिला"
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
      title: "पसंदीदा"
    },
    playlists: {
      title: "प्लेलिस्ट"
    },
    artists: {
      title: "कलाकार"
    },
    settings: {
      title: "सेटिंग्स"
    }
  }
}
