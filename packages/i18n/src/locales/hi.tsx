import Hi from "../assets/hi.svg"

import { type Language } from "../types"

/**
 * Hindi language configuration.
 */
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
      thisWeek: "इस सप्ताह",
      thisMonth: "इस महीने",
      yesterday: "कल",
      years: "{count} वर्ष{count, plural, one {} other{ों}}",
      weeks: "{count} सप्ताह{count, plural, one {} other{ों}}",
      days: "{count} दिन{count, plural, one {} other{ों}}",
      hours: "{count} घंटा{count, plural, one {} other{ों}}",
      minutes: "{count} मिनट{count, plural, one {} other{ों}}",
      seconds: "{count} सेकंड{count, plural, one {} other{ों}}",
      goBack: "वापस जाएं",
      goForward: "आगे बढ़ें",
      favorite: "पसंदीदा में जोड़ें",
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
      unmute: "आवाज़ चालू करें",
      queue: "कतार",
      title: "शीर्षक",
      album: "एल्बम",
      artist: "कलाकार",
      date: "तारीख",
      added: "जोड़ा गया",
      duration: "अवधि",
      search: "खोजें",
      selectAll: "सभी चुनें",
      clear: "साफ़ करें",
      cancel: "रद्द करें",
      more: "और",
      select: "चुनें",
      preview: "पूर्वावलोकन",
      close: "बंद करें",
      playback: "प्लेबैक",
      playNext: "अगला चलाएं",
      removeFromQueue: "कतार से हटाएं",
      removeFromPlaylist: "प्लेलिस्ट से हटाएं",
      nowPlaying: "अभी चल रहा है",
      noSongPlaying: "कुछ नहीं चल रहा",
      upNext: "आगे क्या है",
      actions: "क्रियाएं",
      addTo: "जोड़ें",
      playlist: "गानों की सूची",
      song: "गाना",
      lyrics: "गीत का बोल",
      openMiniplayer: "मिनिप्लेयर खोलें",
      enterFullScreen: "पूर्ण स्क्रीन में प्रवेश करें",
      exitFullScreen: "पूर्ण स्क्रीन से बाहर निकलें",
      goToSong: "गाने पर जाएं",
      goToAlbum: "एल्बम पर जाएं",
      goToPlaylist: "गानों की सूची पर जाएं",
      goToArtist: "कलाकार के पास जाएं",
      shuffleAndPlay: "शफल करें और चलाएं",
      unknown: "अज्ञात",
      unknownAlbum: "अज्ञात एल्बम",
      unknownArtist: "अज्ञात कलाकार",
      listenTime: "सुनने का समय",
      averageListenTime: "औसत सुनने का समय",
      retentionRate: "रिटेंशन दर",
      totalPlays: "कुल प्ले",
      lastPlayed: "अंतिम बार चलाया गया",
      neverPlayed: "कभी नहीं बजाया",
      streak: "स्ट्रीक",
      refresh: "रिफ्रेश करें",
      showingOfTotal: "{total} में से {showing} दिखाया जा रहा है",
      start: "शुरू करें",
      completed: "पूरा हुआ",
      songsPlayed: "{count} गाना{count, plural, one {} other{ों}}",
      appearsIn: "में दिखाई देता है",
      addToSidebar: "साइडबार में जोड़ें",
      removeFromSidebar: "साइडबार से हटाएँ",
      featured: "विशेष रुप से प्रदर्शित",
      stats: "आंकड़े"
    },
    form: {
      titles: {
        createSong: "गाना बनाएं",
        updateSong: "गाना अपडेट करें",
        deleteSong: "गाना हटाएं",
        createArtist: "कलाकार बनाएं",
        updateArtist: "कलाकार अपडेट करें",
        deleteArtist: "कलाकार हटाएं",
        createAlbum: "एल्बम बनाएं",
        updateAlbum: "एल्बम अपडेट करें",
        deleteAlbum: "एल्बम हटाएं",
        createPlaylist: "गानों की सूची बनाएं",
        updatePlaylist: "गानों की सूची अपडेट करें",
        deletePlaylist: "गानों की सूची हटाएं",
        addToPlaylist: "प्लेलिस्ट में जोड़ें",
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
        albumType: "एल्बम प्रकार",
        artists: "कलाकार",
        folder: "फ़ोल्डर",
        lyrics: "गीत"
      },
      buttons: {
        cancel: "रद्द करें",
        delete: "हटाएं",
        update: "अपडेट करें",
        create: "बनाएं",
        add: "जोड़ें"
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
      },
      albumType: {
        invalid: "अमान्य एल्बम प्रकार"
      },
      playlistIds: {
        invalid: "अमान्य प्लेलिस्ट"
      },
      album: {
        duplicate: "इस नाम का एल्बम पहले से मौजूद है",
        integrity:
          "एल्बम से कलाकार को हटाया नहीं जा सकता क्योंकि ऐसे गाने हैं जो इस एल्बम और इस कलाकार दोनों से संबंधित हैं"
      },
      artist: {
        duplicate: "इस नाम का कलाकार पहले से मौजूद है",
        integrity:
          "कलाकार को हटाया नहीं जा सकता क्योंकि ऐसे गाने हैं जो इस कलाकार और उन एल्बमों दोनों से संबंधित हैं जिनमें यह कलाकार भी शामिल है"
      },
      playlist: {
        duplicate: "इस नाम की प्लेलिस्ट पहले से मौजूद है"
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
      playlists: {
        title: "गानों की सूची"
      },
      albums: {
        title: "एल्बम"
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
        equalizer: {
          title: "इक्वलाइज़र"
        },
        sync: {
          title: "सिंक"
        },
        about: {
          title: "के बारे में"
        }
      },
      lyrics: {
        title: "गीत"
      }
    },
    home: {
      title: "मुख्य पृष्ठ",
      jumpBackIn: {
        title: "जारी रखें",
        description: "जहाँ आपने छोड़ा था वहाँ से जारी रखें"
      },
      yourPlaylists: {
        title: "आपके लिए बनाया गया",
        description: "आपकी व्यक्तिगत प्लेलिस्ट"
      },
      onRepeat: {
        title: "दोहराव पर",
        description: "गाने जिन्हें आप बजाना बंद नहीं कर सकते"
      },
      newReleases: {
        title: "नए रिलीज़",
        description: "आपके फॉलो किए गए कलाकारों से ताजा संगीत"
      },
      favoriteArtists: {
        title: "आपके कलाकार",
        description: "कलाकार जिन्हें आप सबसे अधिक प्यार करते हैं"
      },
      discover: {
        title: "खोजें",
        description: "आपके लिए नए संगीत सुझाव"
      },
      empty: {
        title: "आपकी लाइब्रेरी खाली है",
        description:
          "टुन्नो में आपका स्वागत है। शुरू करने के लिए, आपको अपनी व्यक्तिगत लाइब्रेरी में कुछ संगीत जोड़ना होगा।",
        getStarted: "शुरू करें",
        songs: {
          title: "गाने आयात करें",
          description: "अपनी लाइब्रेरी बनाना शुरू करने के लिए अपने डिवाइस से संगीत फ़ाइलें जोड़ें"
        },
        albums: {
          title: "एल्बम बनाएं",
          description: "कलाकृति और विवरण के साथ एल्बम बनाकर अपने संगीत को व्यवस्थित करें"
        },
        playlists: {
          title: "प्लेलिस्ट बनाएं",
          description: "किसी भी मूड या गतिविधि के लिए अपने स्वयं के मिक्स क्यूरेट करें"
        },
        artists: {
          title: "कलाकार जोड़ें",
          description:
            "कलाकारों के संगीत को व्यवस्थित और प्रबंधित करने के लिए कलाकार प्रोफाइल बनाएं"
        }
      }
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
      deletedFailedTitle: "गाना हटाने में विफल",
      filters: {
        title: "फिल्टर",
        clear: "सक्रिय फिल्टर साफ़ करें",
        sortBy: "इसके अनुसार क्रमबद्ध करें",
        favorites: "केवल पसंदीदा",
        favoritesDescription: "केवल पसंदीदा गाने दिखाएं",
        lyrics: "बोल के साथ",
        lyricsDescription: "केवल बोल वाले गाने दिखाएं",
        releaseYear: "रिलीज़ वर्ष",
        duration: "अवधि",
        durationMin: "न्यूनतम",
        durationMax: "अधिकतम",
        playCount: "प्ले काउंट",
        playCountMin: "न्यूनतम",
        playCountMax: "अधिकतम",
        lastPlayed: "अंतिम प्ले",
        lastPlayedAfter: "के बाद",
        lastPlayedBefore: "के पहले",
        selectDate: "तारीख चुनें",
        sortOptions: {
          name: "नाम",
          duration: "अवधि",
          favorites: "पसंदीदा",
          year: "वर्ष",
          playCount: "प्ले काउंट",
          lastPlayed: "अंतिम प्ले",
          createdAt: "निर्माण तिथि",
          updatedAt: "अपडेट तिथि"
        }
      }
    },
    playlists: {
      title: "गानों की सूची",
      createdTitle: "गानों की सूची सफलतापूर्वक बनाई गई",
      createdDescription: "{name} बनाई गई है",
      createdFailedTitle: "गानों की सूची बनाने में विफल",
      updatedTitle: "गानों की सूची सफलतापूर्वक अपडेट हुई",
      updatedDescription: "{name} अपडेट की गई है",
      updatedFailedTitle: "गानों की सूची अपडेट करने में विफल",
      deletedTitle: "गानों की सूची सफलतापूर्वक हटाई गई",
      deletedDescription: "{name} हटाई गई है",
      deletedFailedTitle: "गानों की सूची हटाने में विफल",
      filters: {
        title: "फ़िल्टर",
        clear: "सक्रिय फ़िल्टर साफ़ करें",
        sortBy: "इसके अनुसार क्रमबद्ध करें",
        favorites: "केवल पसंदीदा",
        favoritesDescription: "केवल पसंदीदा गानों की सूची दिखाएं",
        playCount: "बजाने की संख्या",
        playCountMin: "न्यूनतम बजाने की संख्या",
        playCountMax: "अधिकतम बजाने की संख्या",
        totalTracks: "कुल ट्रैक",
        totalTracksMin: "न्यूनतम ट्रैक",
        totalTracksMax: "अधिकतम ट्रैक",
        totalDuration: "कुल अवधि",
        totalDurationMin: "न्यूनतम अवधि",
        totalDurationMax: "अधिकतम अवधि",
        lastPlayed: "अंतिम बजाना",
        lastPlayedAfter: "बाद में",
        lastPlayedBefore: "पहले",
        selectDate: "तिथि चुनें",
        sortOptions: {
          name: "नाम",
          favorites: "पसंदीदा",
          playCount: "बजाने की संख्या",
          totalTracks: "कुल ट्रैक",
          totalDuration: "कुल अवधि",
          lastPlayed: "अंतिम बजाना",
          createdAt: "निर्माण तिथि",
          updatedAt: "अपडेट तिथि"
        }
      }
    },
    albums: {
      title: "एल्बम",
      createdTitle: "एल्बम सफलतापूर्वक बनाया गया",
      createdDescription: "{name} बनाया गया है",
      createdFailedTitle: "एल्बम बनाने में विफल",
      updatedTitle: "एल्बम सफलतापूर्वक अपडेट हुआ",
      updatedDescription: "{name} अपडेट हुआ है",
      updatedFailedTitle: "एल्बम अपडेट करने में विफल",
      deletedTitle: "एल्बम सफलतापूर्वक हटाया गया",
      deletedDescription: "{name} हटाया गया है",
      deletedFailedTitle: "एल्बम हटाने में विफल",
      filters: {
        title: "फ़िल्टर",
        clear: "सक्रिय फ़िल्टर साफ़ करें",
        sortBy: "इसके अनुसार क्रमबद्ध करें",
        favorites: "केवल पसंदीदा",
        favoritesDescription: "केवल पसंदीदा एल्बम दिखाएं",
        albumType: "एल्बम प्रकार",
        all: "सभी प्रकार",
        single: "सिंगल",
        album: "एल्बम",
        compilation: "संकलन",
        releaseYear: "रिलीज़ वर्ष",
        releaseYearMin: "न्यूनतम वर्ष",
        releaseYearMax: "अधिकतम वर्ष",
        playCount: "बजाने की संख्या",
        playCountMin: "न्यूनतम बजाने की संख्या",
        playCountMax: "अधिकतम बजाने की संख्या",
        totalTracks: "कुल ट्रैक",
        totalTracksMin: "न्यूनतम ट्रैक",
        totalTracksMax: "अधिकतम ट्रैक",
        totalDuration: "कुल अवधि",
        totalDurationMin: "न्यूनतम अवधि",
        totalDurationMax: "अधिकतम अवधि",
        lastPlayed: "अंतिम बजाया गया",
        lastPlayedAfter: "बजाया गया के बाद",
        lastPlayedBefore: "बजाया गया से पहले",
        selectDate: "तारीख चुनें",
        sortOptions: {
          name: "नाम",
          releaseYear: "रिलीज़ वर्ष",
          favorites: "पसंदीदा",
          playCount: "बजाने की संख्या",
          totalTracks: "कुल ट्रैक",
          totalDuration: "कुल अवधि",
          lastPlayed: "अंतिम बजाया गया",
          createdAt: "बनाया गया",
          updatedAt: "अपडेट किया गया"
        }
      }
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
      deletedFailedTitle: "कलाकार हटाने में विफल",
      filters: {
        title: "फिल्टर",
        clear: "सक्रिय फिल्टर साफ़ करें",
        sortBy: "क्रमबद्ध करें",
        favorites: "केवल पसंदीदा",
        favoritesDescription: "केवल पसंदीदा कलाकार दिखाएं",
        playCount: "प्ले काउंट",
        playCountMin: "न्यूनतम",
        playCountMax: "अधिकतम",
        totalTracks: "कुल गाने",
        totalTracksMin: "न्यूनतम",
        totalTracksMax: "अधिकतम",
        totalDuration: "कुल अवधि",
        totalDurationMin: "न्यूनतम",
        totalDurationMax: "अधिकतम",
        lastPlayed: "अंतिम बजाया गया",
        lastPlayedAfter: "बाद में",
        lastPlayedBefore: "पहले",
        selectDate: "तारीख चुनें",
        sortOptions: {
          name: "नाम",
          favorites: "पसंदीदा",
          playCount: "प्ले काउंट",
          totalTracks: "कुल गाने",
          totalDuration: "कुल अवधि",
          lastPlayed: "अंतिम बजाया गया",
          createdAt: "बनाया गया",
          updatedAt: "अपडेट किया गया"
        }
      }
    },
    favorites: {
      createdTitle: "पसंदीदा में जोड़ा गया",
      createdDescription: "{name} को पसंदीदा में जोड़ा गया है",
      createdFailedTitle: "पसंदीदा में जोड़ने में विफल",
      deletedTitle: "पसंदीदा से हटाया गया",
      deletedDescription: "{name} को पसंदीदा से हटाया गया है",
      deletedFailedTitle: "पसंदीदा से हटाने में विफल"
    },
    sidebar: {
      addedTitle: "साइडबार में जोड़ा गया",
      addedDescription: "{name} को साइडबार में जोड़ दिया गया है",
      addedFailedTitle: "साइडबार में जोड़ने में विफल",
      removedTitle: "साइडबार से हटाया गया",
      removedDescription: "{name} को साइडबार से हटा दिया गया है"
    },
    settings: {
      title: "सेटिंग्स",
      appearance: {
        title: "दिखावट",
        description: "एप्लिकेशन की दिखावट सेटिंग्स परिभाषित करें।",
        theme: {
          title: "थीम",
          description: "एप्लिकेशन थीम चुनें",
          light: "हल्का",
          dark: "गहरा",
          system: "सिस्टम"
        },
        zoom: {
          title: "ज़ूम",
          description: "एप्लिकेशन का ज़ूम स्तर समायोजित करें"
        }
      },
      language: {
        title: "भाषा",
        description: "अपनी पसंदीदा भाषा चुनें"
      },
      equalizer: {
        title: "इक्वलाइज़र",
        enable: {
          title: "इक्वलाइज़र सक्षम करें",
          description: "ऑडियो इक्वलाइज़र को सक्षम या अक्षम करें",
          enabled: "सक्षम",
          disabled: "अक्षम"
        },
        presets: {
          title: "इक्वलाइज़र प्रीसेट",
          description: "पूर्व-परिभाषित इक्वलाइज़र सेटिंग्स से चुनें",
          flat: {
            label: "फ्लैट",
            description: "कोई समायोजन नहीं"
          },
          rock: {
            label: "रॉक",
            description: "बढ़ाया गया बास और ट्रेबल"
          },
          pop: {
            label: "पॉप",
            description: "हल्के बूस्ट के साथ संतुलित"
          },
          jazz: {
            label: "जैज़",
            description: "मध्य आवृत्तियों पर नरम जोर"
          },
          classical: {
            label: "क्लासिकल",
            description: "प्राकृतिक ध्वनि"
          },
          electronic: {
            label: "इलेक्ट्रॉनिक",
            description: "भारी बास और स्पष्ट उच्च आवृत्तियां"
          },
          vocal: {
            label: "वोकल",
            description: "स्पष्टता के लिए मध्य आवृत्ति बूस्ट"
          },
          bass: {
            label: "बास",
            description: "निम्न आवृत्तियों पर भारी जोर"
          },
          treble: {
            label: "ट्रेबल",
            description: "उच्च आवृत्तियों पर जोर"
          }
        },
        bands: {
          title: "आवृत्ति बैंड",
          description: "व्यक्तिगत आवृत्ति बैंड को समायोजित करें"
        },
        reset: {
          title: "इक्वलाइज़र रीसेट करें",
          description: "सभी बैंड को फ्लैट (0 dB) पर रीसेट करें",
          button: "फ्लैट पर रीसेट करें"
        }
      },
      sync: {
        title: "सिंक",
        description: "अपने डेटा को उपकरणों के बीच सिंक्रनाइज़ करें",
        export: {
          title: "लाइब्रेरी निर्यात करें",
          description:
            "अपनी लाइब्रेरी को बैकअप के लिए या किसी अन्य डिवाइस पर उपयोग के लिए बंडल फ़ाइल के रूप में निर्यात करें",
          selectDestination: "गंतव्य चुनें",
          exportingSongs: "{count} गाना निर्यात हो रहा है",
          preparingExport: "निर्यात की तैयारी",
          exportingMessage: "इसमें कुछ समय लग सकता है",
          exportSuccess: "लाइब्रेरी सफलतापूर्वक निर्यात हुई",
          showFolder: "फ़ोल्डर दिखाएं",
          exportAgain: "फिर से निर्यात करें",
          exportFailed: "निर्यात विफल",
          tryAgain: "पुनः प्रयास करें",
          noSongs: "निर्यात के लिए कोई गाने नहीं",
          libraryEmpty: "आपकी लाइब्रेरी खाली है",
          noValidSongs: "निर्यात के लिए कोई मान्य गाने नहीं",
          missingAlbumInfo: "सभी गानों में एल्बम जानकारी नहीं है",
          songsExported:
            "{count} गाना{count, plural, one {} other {ने}} बंडल में निर्यात किया{count, plural, one {} other {ए}} गया{count, plural, one {} other {ए}}"
        }
      },
      about: {
        title: "के बारे में",
        description: "एप्लिकेशन जानकारी और संस्करण विवरण",
        version: "संस्करण",
        whatsNew: {
          title: "क्या नया है",
          description: "नवीनतम सुविधाओं और सुधारों की जांच करें",
          newRelease: "नया रिलीज़",
          viewChangelog: "चेंजलॉग देखें"
        },
        storage: {
          title: "भंडारण और डेटा",
          description: "एप्लिकेशन डेटा और सेटिंग्स प्रबंधित करें",
          openDataFolder: "डेटा फ़ोल्डर खोलें"
        },
        legal: {
          title: "कानूनी और कॉपीराइट",
          description: "लाइसेंस जानकारी और कानूनी दस्तावेज",
          copyright: "कॉपीराइट",
          licensed: "MIT लाइसेंस के तहत लाइसेंस प्राप्त",
          viewLicense: "लाइसेंस देखें",
          viewOnGitHub: "GitHub पर देखें"
        }
      }
    },
    fastUpload: {
      title: "तेज़ अपलोड",
      description: "CLI से या यहाँ से निर्यातित बंडल आयात करें",
      cliTooltip: "Tunno CLI दस्तावेज़ खोलें",
      selectBundle: "बंडल चुनें",
      changeBundle: "बंडल बदलें",
      status: {
        pending: "लंबित",
        processing: "प्रसंस्करण",
        success: "सफल",
        error: "त्रुटि",
        skipped: "छोड़ा गया"
      },
      completed: {
        allSuccess: {
          title: "आयात पूरा!",
          description: "{count} ट्रैक सफलतापूर्वक आयात किया गया"
        },
        withErrors: {
          title: "त्रुटियों के साथ आयात पूरा",
          description: "{successCount} आयात किया, {errorCount} असफल, {skippedCount} छोड़ा गया"
        },
        withSkipped: {
          title: "आयात पूरा",
          description: "{successCount} आयात किया, {skippedCount} छोड़ा गया"
        }
      }
    },
    lyrics: {
      title: "गीत"
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
