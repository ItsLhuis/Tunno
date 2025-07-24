import Fi from "../assets/fi.svg"

import { type Language } from "../types"

export const finnish: Language = {
  code: "fi",
  name: "Suomi",
  flag: Fi,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ei tuloksia",
      lessThanAnHourAgo: "Alle tunti sitten",
      hoursAgo: "{{count}} tunti{{count, plural, one {} other{a}}} sitten",
      today: "Tänään",
      yesterday: "Eilen",
      goBack: "Palaa takaisin",
      goFoward: "Siirry eteenpäin",
      favorite: "Suosikki",
      unfavorite: "Poista suosikeista",
      enableShuffle: "Ota satunnaistoisto käyttöön",
      disableShuffle: "Poista satunnaistoisto käytöstä",
      previous: "Edellinen",
      play: "Toista",
      pause: "Tauko",
      next: "Seuraava",
      enableRepeat: "Ota toisto käyttöön",
      enableRepeatOne: "Toista yksi",
      disableRepeat: "Poista toisto käytöstä",
      mute: "Mykistä",
      unmute: "Poista mykistys",
      queue: "Jono",
      title: "Otsikko",
      album: "Albumi",
      date: "Päivämäärä",
      duration: "Kesto",
      search: "Haku",
      selectAll: "Valitse kaikki",
      visibility: "Näkyvyys",
      columns: "Sarakkeet",
      clear: "Tyhjennä",
      cancel: "Peruuta",
      more: "Lisää",
      select: "Valitse"
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
        thumbnail: "Esikatselukuva",
        file: "Tiedosto",
        releaseYear: "Julkaisuvuosi",
        album: "Albumi",
        artists: "Artistit",
        isSingle: "On single",
        folder: "Kansio"
      },
      buttons: {
        cancel: "Peruuta",
        delete: "Poista",
        update: "Päivitä",
        create: "Luo"
      },
      descriptions: {
        thumbnail: "Taustakuva (valinnainen)",
        fileSize: "Suurin koko: {{size}}",
        supportedFormats: "Tuetut muodot: {{formats}}"
      },
      messages: {
        confirmDelete: "Haluatko varmasti poistaa?",
        unsavedChanges: "Tallentamattomia muutoksia"
      }
    },
    validation: {
      name: {
        required: "Nimi on pakollinen",
        max: "Nimen on oltava enintään 200 merkkiä pitkä"
      },
      file: {
        required: "Tiedosto on pakollinen",
        invalid: "Virheellinen tai vahingoittunut tiedosto",
        max: "Tiedosto ylittää suurimman sallitun koon {{maxSize}}"
      },
      duration: {
        required: "Kesto on pakollinen",
        min: "Keston on oltava vähintään 0"
      },
      releaseYear: {
        invalid: "Virheellinen julkaisuvuosi",
        min: "Julkaisuvuoden on oltava vähintään 0",
        max: "Julkaisuvuosi ei voi olla tulevaisuudessa"
      },
      albumId: {
        invalid: "Virheellinen albumi",
        requiredIfNotSingle: "Albumi on pakollinen, jos kyseessä ei ole single"
      },
      artists: {
        min: "Vähintään yksi artisti vaaditaan"
      }
    },
    update: {
      downloading: "Päivitys ladataan ja asennetaan",
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
      createdTitle: "Lisätty suosikkeihin",
      createdDescription: "{{name}} on lisätty suosikkeihin",
      createdFailedTitle: "Lisäys suosikkeihin epäonnistui",
      deletedTitle: "Poistettu suosikeista",
      deletedDescription: "{{name}} on poistettu suosikeista",
      deletedFailedTitle: "Poisto suosikeista epäonnistui"
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
      title: "Artistit",
      createdTitle: "Artisti luotu onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Artistin luonti epäonnistui",
      updatedTitle: "Artisti päivitetty onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Artistin päivitys epäonnistui",
      deletedTitle: "Artisti poistettu onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Artistin poisto epäonnistui"
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
