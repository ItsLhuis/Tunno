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
      hoursAgo: "{count} tunti{count, plural, one {} other{a}} sitten",
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
      enableRepeatOne: "Ota yhden toisto käyttöön",
      disableRepeat: "Poista toisto käytöstä",
      mute: "Mykistä",
      unmute: "Poista mykistys",
      queue: "Jono",
      title: "Otsikko",
      album: "Albumi",
      artist: "Artisti",
      date: "Päivämäärä",
      duration: "Kesto",
      search: "Haku",
      selectAll: "Valitse kaikki",
      clear: "Tyhjennä",
      cancel: "Peruuta",
      more: "Lisää",
      select: "Valitse",
      preview: "Esikatselu",
      close: "Sulje",
      playback: "Toisto",
      playNext: "Toista seuraava",
      actions: "Toiminnot",
      addTo: "Lisää",
      playlist: "Soittolista",
      lyrics: "Sanat",
      openMiniplayer: "Avaa minisoitin",
      enterFullScreen: "Siirry koko näyttöön",
      exitFullScreen: "Poistu koko näytöstä",
      goToAlbum: "Siirry albumiin",
      goToArtist: "Siirry artistiin",
      shuffleAndPlay: "Sekoita ja toista",
      unknown: "Tuntematon"
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
        warning: "Varoitus",
        lyricsPreview: "Sanoitusten esikatselu"
      },
      labels: {
        name: "Nimi",
        thumbnail: "Esikatselukuva",
        file: "Tiedosto",
        releaseYear: "Julkaisuvuosi",
        album: "Albumi",
        artists: "Artistit",
        folder: "Kansio",
        lyrics: "Sanoitukset"
      },
      buttons: {
        cancel: "Peruuta",
        delete: "Poista",
        update: "Päivitä",
        create: "Luo"
      },
      descriptions: {
        thumbnail: "Taustakuva (valinnainen)",
        fileSize: "Maksimikoko: {size}",
        supportedFormats: "Tuetut formaatit: {formats}",
        lyricsPreview: "Näytä, miten sanoitukset näkyvät aikaleimojen kanssa"
      },
      badges: {
        lines: "{count} rivi{count, plural, one {} other{ä}}",
        duration: "Kesto: {time}"
      },
      messages: {
        confirmDelete: "Haluatko varmasti poistaa?",
        unsavedChanges: "Tallentamattomia muutoksia",
        noLyrics: "Ei sanoituksia"
      }
    },
    validation: {
      name: {
        required: "Nimi on pakollinen",
        max: "Nimen on oltava enintään 200 merkkiä pitkä"
      },
      file: {
        required: "Tiedosto on pakollinen",
        invalid: "Virheellinen tai vioittunut tiedosto",
        max: "Tiedosto ylittää sallitun enimmäiskoon {maxSize}"
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
        invalid: "Virheellinen albumi"
      },
      artists: {
        invalid: "Virheelliset artistit"
      }
    },
    update: {
      downloading: "Päivityksen lataaminen ja asentaminen",
      downloadingDescription: "Uusi päivitys on saatavilla ja asennetaan automaattisesti",
      installedSuccess: "Päivitys asennettu onnistuneesti",
      failed: "Päivityksen asentaminen epäonnistui"
    },
    breadcrumbs: {
      home: {
        title: "Koti"
      },
      songs: {
        title: "Kappaleet"
      },
      playlists: {
        title: "Soittolistat"
      },
      albums: {
        title: "Albumit"
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
      createdDescription: "{name} on luotu",
      createdFailedTitle: "Kappaleen luonti epäonnistui",
      updatedTitle: "Kappale päivitetty onnistuneesti",
      updatedDescription: "{name} on päivitetty",
      updatedFailedTitle: "Kappaleen päivitys epäonnistui",
      deletedTitle: "Kappale poistettu onnistuneesti",
      deletedDescription: "{name} on poistettu",
      deletedFailedTitle: "Kappaleen poisto epäonnistui",
      filters: {
        title: "Suodattimet",
        clear: "Tyhjennä aktiiviset suodattimet",
        sortBy: "Järjestä",
        favorites: "Vain suosikit",
        favoritesDescription: "Näytä vain suosikkikappaleet",
        lyrics: "Tekstillä",
        lyricsDescription: "Näytä vain kappaleet tekstillä",
        releaseYear: "Julkaisuvuosi",
        duration: "Kesto",
        durationMin: "Vähintään",
        durationMax: "Enintään",
        playCount: "Toistokertojen määrä",
        playCountMin: "Vähintään",
        playCountMax: "Enintään",
        lastPlayed: "Viimeksi soitettu",
        lastPlayedAfter: "Jälkeen",
        lastPlayedBefore: "Ennen",
        selectDate: "Valitse päivämäärä",
        sortOptions: {
          name: "Nimi",
          duration: "Kesto",
          favorites: "Suosikit",
          year: "Vuosi",
          playCount: "Toistokertojen määrä",
          lastPlayed: "Viimeksi soitettu",
          createdAt: "Luontipäivämäärä",
          updatedAt: "Päivityspäivämäärä"
        }
      }
    },
    playlists: {
      title: "Soittolistat",
      createdTitle: "Soittolista luotu onnistuneesti",
      createdDescription: "{name} on luotu",
      createdFailedTitle: "Soittolistan luonti epäonnistui",
      updatedTitle: "Soittolista päivitetty onnistuneesti",
      updatedDescription: "{name} on päivitetty",
      updatedFailedTitle: "Soittolistan päivitys epäonnistui",
      deletedTitle: "Soittolista poistettu onnistuneesti",
      deletedDescription: "{name} on poistettu",
      deletedFailedTitle: "Soittolistan poisto epäonnistui"
    },
    albums: {
      title: "Albumit",
      createdTitle: "Albumi luotu onnistuneesti",
      createdDescription: "{name} on luotu",
      createdFailedTitle: "Albumin luonti epäonnistui",
      updatedTitle: "Albumi päivitetty onnistuneesti",
      updatedDescription: "{name} on päivitetty",
      updatedFailedTitle: "Albumin päivitys epäonnistui",
      deletedTitle: "Albumi poistettu onnistuneesti",
      deletedDescription: "{name} on poistettu",
      deletedFailedTitle: "Albumin poisto epäonnistui"
    },
    artists: {
      title: "Artistit",
      createdTitle: "Artisti luotu onnistuneesti",
      createdDescription: "{name} on luotu",
      createdFailedTitle: "Artistin luonti epäonnistui",
      updatedTitle: "Artisti päivitetty onnistuneesti",
      updatedDescription: "{name} on päivitetty",
      updatedFailedTitle: "Artistin päivitys epäonnistui",
      deletedTitle: "Artisti poistettu onnistuneesti",
      deletedDescription: "{name} on poistettu",
      deletedFailedTitle: "Artistin poisto epäonnistui"
    },
    favorites: {
      createdTitle: "Lisätty suosikkeihin",
      createdDescription: "{name} lisätty suosikkeihin",
      createdFailedTitle: "Lisäys suosikkeihin epäonnistui",
      deletedTitle: "Poistettu suosikeista",
      deletedDescription: "{name} poistettu suosikeista",
      deletedFailedTitle: "Poisto suosikeista epäonnistui"
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
