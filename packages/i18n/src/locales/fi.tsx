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
      enableShuffle: "Ota sekoitus käyttöön",
      disableShuffle: "Poista sekoitus käytöstä",
      previous: "Edellinen",
      play: "Toista",
      pause: "Keskeytä",
      next: "Seuraava",
      enableRepeat: "Ota toisto käyttöön",
      enableRepeatOne: "Ota yhden toisto käyttöön",
      disableRepeat: "Poista toisto käytöstä",
      mute: "Mykistä",
      unmute: "Poista mykistys",
      queue: "Jono",
      title: "Nimi",
      album: "Albumi",
      date: "Päivämäärä",
      duration: "Kesto",
      search: "Haku",
      selectAll: "Valitse kaikki",
      visibility: "Näkyvyys",
      columns: "Sarakkeet",
      clear: "Tyhjennä",
      cancel: "Peruuta",
      more: "Lisää"
    },
    form: {
      titles: {
        createSong: "Luo kappale",
        updateSong: "Päivitä kappale",
        deleteSong: "Poista kappale",
        createArtist: "Luo artisti",
        updateArtist: "Päivitä artisti",
        deleteArtist: "Poista artisti",
        createPlaylist: "Luo soittolista",
        updatePlaylist: "Päivitä soittolista",
        deletePlaylist: "Poista soittolista",
        confirmation: "Vahvistus",
        warning: "Varoitus"
      },
      labels: {
        name: "Nimi",
        thumbnail: "Pienoiskuva",
        file: "Tiedosto",
        releaseYear: "Julkaisuvuosi",
        album: "Albumi",
        artists: "Artistit",
        isSingle: "On single"
      },
      buttons: {
        cancel: "Peruuta",
        delete: "Poista",
        update: "Päivitä",
        create: "Luo"
      },
      descriptions: {
        thumbnail: "Taustakuva (valinnainen)",
        fileSize: "Maksimikoko: {{size}}",
        supportedFormats: "Tuetut muodot: {{formats}}"
      },
      messages: {
        confirmDelete: "Oletko varma, että haluat poistaa?",
        unsavedChanges: "Tallentamattomia muutoksia"
      }
    },
    validation: {
      name: {
        required: "Nimi vaaditaan",
        max: "Nimi saa olla enintään 200 merkkiä"
      },
      file: {
        required: "Tiedosto vaaditaan"
      },
      duration: {
        required: "Kesto vaaditaan",
        min: "Keston tulee olla vähintään 0"
      },
      releaseYear: {
        invalid: "Virheellinen julkaisuvuosi",
        min: "Julkaisuvuoden tulee olla vähintään 0",
        max: "Julkaisuvuosi ei voi olla tulevaisuudessa"
      },
      albumId: {
        invalid: "Virheellinen albumi",
        requiredIfNotSingle: "Albumi vaaditaan, jos ei ole single"
      },
      artists: {
        min: "Vähintään yksi artisti vaaditaan"
      }
    },
    update: {
      downloading: "Ladataan ja asennetaan päivitystä",
      downloadingDescription: "Uusi päivitys on saatavilla ja sitä asennetaan automaattisesti",
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
        title: "Artistit"
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
    home: {
      title: "Koti"
    },
    songs: {
      title: "Kappaleet",
      createdTitle: "Kappale luotu onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Kappaleen luominen epäonnistui",
      updatedTitle: "Kappale päivitetty onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Kappaleen päivittäminen epäonnistui",
      deletedTitle: "Kappale poistettu onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Kappaleen poistaminen epäonnistui"
    },
    favorites: {
      title: "Suosikit",
      createdTitle: "Lisätty suosikkeihin",
      createdDescription: "{{name}} on lisätty suosikkeihin",
      createdFailedTitle: "Suosikkeihin lisääminen epäonnistui",
      deletedTitle: "Poistettu suosikeista",
      deletedDescription: "{{name}} on poistettu suosikeista",
      deletedFailedTitle: "Suosikeista poistaminen epäonnistui"
    },
    playlists: {
      title: "Soittolistat",
      createdTitle: "Soittolista luotu onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Soittolistan luominen epäonnistui",
      updatedTitle: "Soittolista päivitetty onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Soittolistan päivittäminen epäonnistui",
      deletedTitle: "Soittolista poistettu onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Soittolistan poistaminen epäonnistui"
    },
    artists: {
      title: "Artistit",
      createdTitle: "Artisti luotu onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Artistin luominen epäonnistui",
      updatedTitle: "Artisti päivitetty onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Artistin päivittäminen epäonnistui",
      deletedTitle: "Artisti poistettu onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Artistin poistaminen epäonnistui"
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
