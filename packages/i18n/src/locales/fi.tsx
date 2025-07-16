import Fi from "../assets/fi.svg"

import { type Language } from "../types"

export const finnish: Language = {
  code: "fi",
  name: "Suomi",
  flag: Fi,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Tuloksia ei löytynyt",
      lessThanAnHourAgo: "Alle tunti sitten",
      hoursAgo: "{{count}} tunti{{count, plural, one {} other{a}}} sitten",
      today: "Tänään",
      yesterday: "Eilen",
      goBack: "Takaisin",
      goFoward: "Eteenpäin",
      favorite: "Suosikki",
      unfavorite: "Poista suosikeista",
      enableShuffle: "Ota satunnaistoisto käyttöön",
      disableShuffle: "Poista satunnaistoisto käytöstä",
      previous: "Edellinen",
      play: "Toista",
      pause: "Tauko",
      next: "Seuraava",
      enableRepeat: "Ota toisto käyttöön",
      enableRepeatOne: "Toista kerran",
      disableRepeat: "Poista toisto käytöstä",
      mute: "Mykistä",
      unmute: "Poista mykistys",
      queue: "Jonossa"
    },
    update: {
      downloading: "Ladataan ja asennetaan päivitys",
      downloadingDescription: "Uusi päivitys on saatavilla ja asennetaan automaattisesti",
      installedSuccess: "Päivitys asennettu onnistuneesti",
      failed: "Päivityksen asennus epäonnistui"
    },
    breadcrumbs: {
      home: {
        title: "Koti"
      },
      songs: {
        title: "Kappaleet"
      },
      favorites: {
        title: "Suosikit"
      },
      playlists: {
        title: "Soittolistat"
      },
      artists: {
        title: "Esittäjät"
      },
      fastUpload: {
        title: "Nopea lataus"
      },
      settings: {
        title: "Asetukset",
        appearance: {
          title: "Ulkoasu"
        },
        language: {
          title: "Kieli"
        },
        sync: {
          title: "Synkronointi"
        }
      }
    },
    home: { title: "Koti" },
    songs: {
      title: "Kappaleet",
      createdTitle: "Kappale luotu onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Kappaleen luonti epäonnistui",
      updatedTitle: "Kappale päivitetty onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Kappaleen päivitys epäonnistui",
      deletedTitle: "Kappale poistettu onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Kappaleen poisto epäonnistui"
    },
    favorites: {
      title: "Suosikit",
      addedTitle: "Lisätty suosikkeihin",
      addedDescription: "{{name}} on lisätty suosikkeihin",
      addedFailedTitle: "Suosikkeihin lisääminen epäonnistui",
      removedTitle: "Poistettu suosikeista",
      removedDescription: "{{name}} on poistettu suosikeista",
      removedFailedTitle: "Suosikeista poisto epäonnistui"
    },
    playlists: {
      title: "Soittolistat",
      createdTitle: "Soittolista luotu onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Soittolistan luonti epäonnistui",
      updatedTitle: "Soittolista päivitetty onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Soittolistan päivitys epäonnistui",
      deletedTitle: "Soittolista poistettu onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Soittolistan poisto epäonnistui"
    },
    artists: {
      title: "Esittäjät",
      createdTitle: "Esittäjä luotu onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Esittäjän luonti epäonnistui",
      updatedTitle: "Esittäjä päivitetty onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Esittäjän päivitys epäonnistui",
      deletedTitle: "Esittäjä poistettu onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Esittäjän poisto epäonnistui"
    },
    settings: {
      title: "Asetukset",
      appearance: {
        title: "Ulkoasu",
        description: "Valitse haluamasi ulkoasutila",
        light: "Vaalea",
        dark: "Tumma",
        system: "Järjestelmä"
      },
      language: {
        title: "Kieli",
        description: "Valitse haluamasi kieli"
      },
      sync: {
        title: "Synkronointi",
        description: "Synkronoi tietosi laitteiden välillä"
      }
    },
    fastUpload: {
      title: "Nopea lataus"
    },
    languages: {
      da: "Tanska",
      de: "Saksa",
      en: "Englanti",
      es: "Espanja",
      fi: "Suomi",
      fr: "Ranska",
      hi: "Hindi",
      it: "Italia",
      ja: "Japani",
      ko: "Korea",
      nl: "Hollanti",
      no: "Norja",
      pl: "Puola",
      pt: "Portugali",
      ru: "Venäjä",
      sv: "Ruotsi",
      tr: "Turkki",
      uk: "Ukraina",
      vi: "Vietnam",
      zh: "Kiina"
    }
  }
}
