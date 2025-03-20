import Hi from "@assets/images/flags/hi.svg"

import { type Language } from "../types"

export const hindi: Language = {
  code: "hi",
  name: "हिन्दी",
  flag: Hi,
  isRtl: false,
  translations: {
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
    settings: {
      title: "सेटिंग्स"
    }
  }
}
