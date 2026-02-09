import Fi from "../assets/fi.svg"

import { type Language } from "../types"

/**
 * Finnish language configuration.
 */
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
      thisWeek: "Tällä viikolla",
      thisMonth: "Tässä kuussa",
      yesterday: "Eilen",
      years: "{count} vuosi{count, plural, one {} other{a}}",
      weeks: "{count} viikko{count, plural, one {} other{a}}",
      days: "{count} päivä{count, plural, one {} other{ä}}",
      hours: "{count} tunti{count, plural, one {} other{a}}",
      minutes: "{count} minuutti{count, plural, one {} other{a}}",
      seconds: "{count} sekunti{count, plural, one {} other{a}}",
      goBack: "Takaisin",
      goForward: "Eteenpäin",
      favorite: "Lisää suosikkeihin",
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
      added: "Lisätty",
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
      removeFromQueue: "Poista jonosta",
      removeFromPlaylist: "Poista soittolistasta",
      nowPlaying: "Nyt soi",
      noSongPlaying: "Ei mitään soi",
      upNext: "Seuraavaksi",
      actions: "Toiminnot",
      addTo: "Lisää",
      playlist: "Playlist",
      song: "Kappale",
      lyrics: "Sanat",
      openMiniplayer: "Avaa minisoitin",
      enterFullScreen: "Siirry koko näyttöön",
      exitFullScreen: "Poistu koko näytöstä",
      goToSong: "Siirry kappaleeseen",
      goToAlbum: "Siirry albumiin",
      goToPlaylist: "Siirry playlistiin",
      goToArtist: "Siirry artistiin",
      shuffleAndPlay: "Sekoita ja toista",
      unknown: "Tuntematon",
      unknownAlbum: "Tuntematon albumi",
      unknownArtist: "Tuntematon artisti",
      listenTime: "Kuunteluaika",
      averageListenTime: "Keskimääräinen kuunteluaika",
      retentionRate: "Retention rate",
      totalPlays: "Kokonaistoistot",
      lastPlayed: "Viimeksi soitettu",
      neverPlayed: "Ei koskaan soitettu",
      streak: "Putki",
      refresh: "Päivitä",
      showingOfTotal: "Näytetään {showing}/{total}",
      start: "Aloita",
      completed: "Valmis",
      songsPlayed: "{count} kappale{count, plural, one {} other{tta}}",
      appearsIn: "Esiintyy",
      addToSidebar: "Lisää sivupalkkiin",
      removeFromSidebar: "Poista sivupalkista",
      featured: "Esittelyssä",
      stats: "Tilastot",
      openToStart: "Avaa Tunno aloittaaksesi"
    },
    form: {
      titles: {
        createSong: "Luo kappale",
        updateSong: "Päivitä kappale",
        deleteSong: "Poista kappale",
        createArtist: "Luo artisti",
        updateArtist: "Päivitä artisti",
        deleteArtist: "Poista artisti",
        createAlbum: "Luo albumi",
        updateAlbum: "Päivitä albumi",
        deleteAlbum: "Poista albumi",
        createPlaylist: "Luo playlist",
        updatePlaylist: "Päivitä playlist",
        deletePlaylist: "Poista playlist",
        addToPlaylist: "Lisää playlistiin",
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
        albumType: "Albumin tyyppi",
        artists: "Artistit",
        folder: "Kansio",
        lyrics: "Sanoitukset"
      },
      buttons: {
        cancel: "Peruuta",
        delete: "Poista",
        update: "Päivitä",
        create: "Luo",
        add: "Lisää"
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
      },
      albumType: {
        invalid: "Virheellinen albumityyppi"
      },
      playlistIds: {
        invalid: "Virheelliset soittolistat"
      },
      album: {
        duplicate: "Saman niminen albumi on jo olemassa",
        integrity:
          "Artistia ei voi poistaa albumista, koska on kappaleita, jotka kuuluvat sekä tähän albumiin että tähän artistiin"
      },
      artist: {
        duplicate: "Saman niminen artisti on jo olemassa",
        integrity:
          "Artistia ei voi poistaa, koska on kappaleita, jotka kuuluvat sekä tälle artistille että albumeille, jotka sisältävät myös tämän artistin"
      },
      playlist: {
        duplicate: "Saman niminen soittolista on jo olemassa"
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
        title: "Playlists"
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
        equalizer: {
          title: "Ekvalisaattori"
        },
        sync: {
          title: "Synkronointi"
        },
        about: {
          title: "Tietoja"
        }
      },
      lyrics: {
        title: "Sanat"
      }
    },
    home: {
      title: "Koti",
      jumpBackIn: {
        title: "Jatka toistoa",
        description: "Jatka siitä mihin jäit"
      },
      newReleases: {
        title: "Uudet julkaisut",
        description: "Uusia lisäyksiä kokoelmaasi"
      },
      onRepeat: {
        title: "toistossa",
        description: "Kappaleet joita et voi lopettaa soittamasta"
      },
      discover: {
        title: "Löydä",
        description: "Uusia musiikkisuosituksia sinulle"
      },
      favoriteArtists: {
        title: "Sinun artistisi",
        description: "Artistit joita rakastat eniten"
      },
      yourPlaylists: {
        title: "Sinulle tehty",
        description: "Henkilökohtaiset soittolistasi"
      },
      topAlbums: {
        title: "Parhaat albumit",
        description: "Eniten soitetut albumisi"
      },
      recentlyAdded: {
        title: "Äskettäin lisätyt",
        description: "Uusia lisäyksiä kirjastoosi"
      },
      empty: {
        title: "Kirjastosi on tyhjä",
        description:
          "Tervetuloa Tunnoon. Aloittaaksesi, sinun täytyy lisätä musiikkia henkilökohtaiseen kirjastoosi.",
        getStarted: "Aloita",
        songs: {
          title: "Tuo kappaleita",
          description: "Lisää musiikkitiedostoja laitteeltasi aloittaaksesi kirjastosi rakentamisen"
        },
        albums: {
          title: "Luo albumeita",
          description: "Järjestä musiikkisi luomalla albumeita kansikuvilla ja tiedoilla"
        },
        playlists: {
          title: "Luo soittolista",
          description: "Kuratoi omia miksauksia mihin tahansa mielialaan tai toimintaan"
        },
        artists: {
          title: "Lisää artisteja",
          description: "Luo artistiprofiileja järjestääksesi ja hallitaksesi heidän musiikkiaan"
        }
      }
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
      title: "Playlists",
      createdTitle: "Playlist luotu onnistuneesti",
      createdDescription: "{name} on luotu",
      createdFailedTitle: "Playlistin luonti epäonnistui",
      updatedTitle: "Playlist päivitetty onnistuneesti",
      updatedDescription: "{name} on päivitetty",
      updatedFailedTitle: "Playlistin päivitys epäonnistui",
      songsAddedTitle: "Kappaleet lisätty onnistuneesti",
      songsAddedFailedTitle: "Kappaleiden lisääminen epäonnistui",
      deletedTitle: "Playlist poistettu onnistuneesti",
      deletedDescription: "{name} on poistettu",
      deletedFailedTitle: "Playlistin poisto epäonnistui",
      filters: {
        title: "Suodattimet",
        clear: "Tyhjennä aktiiviset suodattimet",
        sortBy: "Järjestä",
        favorites: "Vain suosikit",
        favoritesDescription: "Näytä vain suosikkiplaylists",
        playCount: "Soittokerrat",
        playCountMin: "Vähimmäissoittokerrat",
        playCountMax: "Enimmäissoittokerrat",
        totalTracks: "Kappaleiden kokonaismäärä",
        totalTracksMin: "Vähimmäiskappaleet",
        totalTracksMax: "Enimmäiskappaleet",
        totalDuration: "Kokonaiskesto",
        totalDurationMin: "Vähimmäiskesto",
        totalDurationMax: "Enimmäiskesto",
        lastPlayed: "Viimeksi soitettu",
        lastPlayedAfter: "Jälkeen",
        lastPlayedBefore: "Ennen",
        selectDate: "Valitse päivämäärä",
        sortOptions: {
          name: "Nimi",
          favorites: "Suosikit",
          playCount: "Soittokerrat",
          totalTracks: "Kappaleiden kokonaismäärä",
          totalDuration: "Kokonaiskesto",
          lastPlayed: "Viimeksi soitettu",
          createdAt: "Luontipäivämäärä",
          updatedAt: "Päivityspäivämäärä"
        }
      }
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
      deletedFailedTitle: "Albumin poisto epäonnistui",
      filters: {
        title: "Suodattimet",
        clear: "Tyhjennä aktiiviset suodattimet",
        sortBy: "Järjestä",
        favorites: "Vain suosikit",
        favoritesDescription: "Näytä vain suosikkialbumit",
        albumType: "Albumin tyyppi",
        all: "Kaikki tyypit",
        single: "Single",
        album: "Albumi",
        compilation: "Kokoelma",
        releaseYear: "Julkaisuvuosi",
        releaseYearMin: "Vähimmäisvuosi",
        releaseYearMax: "Enimmäisvuosi",
        playCount: "Soittokerrat",
        playCountMin: "Vähimmäissoittokerrat",
        playCountMax: "Enimmäissoittokerrat",
        totalTracks: "Kappaleiden kokonaismäärä",
        totalTracksMin: "Vähimmäiskappaleet",
        totalTracksMax: "Enimmäiskappaleet",
        totalDuration: "Kokonaiskesto",
        totalDurationMin: "Vähimmäiskesto",
        totalDurationMax: "Enimmäiskesto",
        lastPlayed: "Viimeksi soitettu",
        lastPlayedAfter: "Soitettu jälkeen",
        lastPlayedBefore: "Soitettu ennen",
        selectDate: "Valitse päivämäärä",
        sortOptions: {
          name: "Nimi",
          releaseYear: "Julkaisuvuosi",
          favorites: "Suosikit",
          playCount: "Soittokerrat",
          totalTracks: "Kappaleiden kokonaismäärä",
          totalDuration: "Kokonaiskesto",
          lastPlayed: "Viimeksi soitettu",
          createdAt: "Luotu",
          updatedAt: "Päivitetty"
        }
      }
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
      deletedFailedTitle: "Artistin poisto epäonnistui",
      filters: {
        title: "Suodattimet",
        clear: "Tyhjennä aktiiviset suodattimet",
        sortBy: "Järjestä",
        favorites: "Vain suosikit",
        favoritesDescription: "Näytä vain suosikkiartistit",
        playCount: "Toistokertojen määrä",
        playCountMin: "Vähintään",
        playCountMax: "Enintään",
        totalTracks: "Kappaleiden kokonaismäärä",
        totalTracksMin: "Vähintään",
        totalTracksMax: "Enintään",
        totalDuration: "Kokonaiskesto",
        totalDurationMin: "Vähintään",
        totalDurationMax: "Enintään",
        lastPlayed: "Viimeksi soitettu",
        lastPlayedAfter: "Jälkeen",
        lastPlayedBefore: "Ennen",
        selectDate: "Valitse päivämäärä",
        sortOptions: {
          name: "Nimi",
          favorites: "Suosikit",
          playCount: "Toistokertojen määrä",
          totalTracks: "Kappaleiden kokonaismäärä",
          totalDuration: "Kokonaiskesto",
          lastPlayed: "Viimeksi soitettu",
          createdAt: "Luontipäivä",
          updatedAt: "Päivityspäivä"
        }
      }
    },
    favorites: {
      createdTitle: "Lisätty suosikkeihin",
      createdDescription: "{name} lisätty suosikkeihin",
      createdFailedTitle: "Lisäys suosikkeihin epäonnistui",
      deletedTitle: "Poistettu suosikeista",
      deletedDescription: "{name} poistettu suosikeista",
      deletedFailedTitle: "Poisto suosikeista epäonnistui"
    },
    sidebar: {
      addedTitle: "Lisätty sivupalkkiin",
      addedDescription: "{name} on lisätty sivupalkkiin",
      addedFailedTitle: "Lisääminen sivupalkkiin epäonnistui",
      removedTitle: "Poistettu sivupalkista",
      removedDescription: "{name} on poistettu sivupalkista"
    },
    settings: {
      title: "Asetukset",
      appearance: {
        title: "Ulkoasu",
        description: "Määritä sovelluksen ulkoasuasetukset.",
        theme: {
          title: "Teema",
          description: "Valitse sovelluksen teema",
          light: "Vaalea",
          dark: "Tumma",
          system: "Järjestelmä"
        },
        zoom: {
          title: "Zoomaus",
          description: "Säädä sovelluksen zoomaustasoa"
        }
      },
      language: {
        title: "Kieli",
        description: "Valitse haluamasi kieli"
      },
      equalizer: {
        title: "Ekvalisaattori",
        enable: {
          title: "Ota ekvalisaattori käyttöön",
          description: "Ota ääni-ekvalisaattori käyttöön tai pois käytöstä",
          enabled: "Käytössä",
          disabled: "Pois käytöstä"
        },
        presets: {
          title: "Ekvalisaattori esiasetukset",
          description: "Valitse esimääritellyistä ekvalisaattori-asetuksista",
          flat: {
            label: "Tasainen",
            description: "Ei säätöjä"
          },
          rock: {
            label: "Rock",
            description: "Vahvistettu basso ja korkeat"
          },
          pop: {
            label: "Pop",
            description: "Tasapainotettu kevyellä vahvistuksella"
          },
          jazz: {
            label: "Jazz",
            description: "Pehmeä painotus keski-taajuuksissa"
          },
          classical: {
            label: "Klassinen",
            description: "Luonnollinen ääni"
          },
          electronic: {
            label: "Elektroninen",
            description: "Raskas basso ja kirkkaat korkeat"
          },
          vocal: {
            label: "Laulu",
            description: "Keski-taajuuksien vahvistus selkeyttä varten"
          },
          bass: {
            label: "Basso",
            description: "Raskas painotus matalissa taajuuksissa"
          },
          treble: {
            label: "Korkeat",
            description: "Painotus korkeissa taajuuksissa"
          }
        },
        bands: {
          title: "Taajuuskaistat",
          description: "Säädä yksittäisiä taajuuskaistoja"
        },
        reset: {
          title: "Nollaa ekvalisaattori",
          description: "Nollaa kaikki kaistat tasaisiksi (0 dB)",
          button: "Nollaa tasaisiksi"
        }
      },
      sync: {
        title: "Synkronointi",
        description: "Synkronoi tietosi laitteiden välillä",
        export: {
          title: "Vie kirjasto",
          description:
            "Vie kirjastosi pakettitiedostona varmuuskopioksi tai käytettäväksi toisella laitteella",
          selectDestination: "Valitse kohde",
          exportingSongs: "Viedään {count} kappale{count, plural, one {} other{tta}}",
          preparingExport: "Valmistellaan vientiä",
          exportingMessage: "Tämä voi kestää hetken",
          exportSuccess: "Kirjasto viety onnistuneesti",
          showFolder: "Näytä kansio",
          exportAgain: "Vie uudelleen",
          exportFailed: "Vienti epäonnistui",
          tryAgain: "Yritä uudelleen",
          noSongs: "Ei kappaleita vietäväksi",
          libraryEmpty: "Kirjastosi on tyhjä",
          noValidSongs: "Ei kelvollisia kappaleita vietäväksi",
          missingAlbumInfo: "Kaikista kappaleista puuttuu albumitiedot",
          songsExported: "{count} kappale{count, plural, one {} other{tta}} viety pakettiin"
        },
        desktop: {
          title: "Synkronoi mobiilisovelluksen kanssa",
          description: "Siirrä kirjastosi Tunno Mobileen paikallisen verkkosi kautta"
        },
        mobile: {
          title: "Synkronoi tietokoneen kanssa",
          generateQr: "Luo QR-koodi",
          stopServer: "Pysäytä palvelin",
          waitingConnection: "Odotetaan mobiililaitteen yhdistämistä",
          deviceConnected: "Laite yhdistetty",
          syncInProgress: "Synkronointi käynnissä",
          syncCompleted: "Synkronointi valmis",
          serverError: "Synkronointipalvelimen käynnistäminen epäonnistui",
          scanQr: "Skannaa QR-koodi",
          scanQrDescription:
            "Skannaa tietokoneesi QR-koodi siirtääksesi musiikkikirjastosi paikallisen verkon kautta",
          connecting: "Yhdistetään",
          comparing: "Vertaillaan kirjastoja",
          syncing: "Synkronoidaan",
          finalizing: "Viimeistellään",
          completed: "Synkronointi valmis",
          completedDescription: "Musiikkikirjastosi on synkronoitu onnistuneesti",
          alreadySynced: "Jo synkronoitu",
          failed: "Synkronointi epäonnistui",
          cancel: "Peruuta",
          done: "Valmis",
          itemsSynced: "{synced} / {total} kohdetta",
          batchProgress: "Erä {current} / {total}",
          cameraPermissionTitle: "Kameran käyttöoikeus vaaditaan",
          cameraPermissionDescription:
            "Myönnä kameralupa skannataksesi tietokoneellasi näkyvän QR-koodin",
          grantPermission: "Myönnä lupa",
          cameraLoading: "Ladataan kameraa",
          scanInstruction: "Osoita kamerasi tietokoneesi QR-koodiin",
          connectionFailed: "Yhteyttä tietokonepalvelimeen ei saatu",
          insufficientStorageDescription:
            "Synkronointiin ei ole tarpeeksi vapaata tilaa. Tarvitaan {required}, mutta vain {available} käytettävissä",
          syncInterrupted: "Synkronointi keskeytyi, koska sovellus siirtyi taustalle",
          downloadingItem: 'Ladataan "{name}"',
          fetchingBatch: "Haetaan erän {batch} metatietoja",
          updatingStats: "Päivitetään tilastoja",
          syncComplete: "Synkronointi valmis",
          comparingLibraries: "Vertaillaan kirjastoja",
          connectingToDesktop: "Yhdistetään tietokoneeseen",
          cancelledByMobile: "Synkronointi peruttu mobiililaitteella",
          syncTimedOut: "Mobiililaite ei vastannut",
          connectionLost: "Tietokoneen yhteys katkesi"
        }
      },
      about: {
        title: "Tietoja",
        description: "Sovellustiedot ja versiotiedot",
        version: "Versio",
        whatsNew: {
          title: "Mitä uutta",
          description: "Tutustu uusimpiin ominaisuuksiin ja parannuksiin",
          newRelease: "Uusi julkaisu",
          viewChangelog: "Näytä muutosloki"
        },
        storage: {
          title: "Tallennustila ja tiedot",
          description: "Hallitse sovelluksen tietoja ja asetuksia",
          openDataFolder: "Avaa datakansio"
        },
        legal: {
          title: "Juridinen ja tekijänoikeudet",
          description: "Lisenssitiedot ja juridiset dokumentit",
          copyright: "Tekijänoikeudet",
          licensed: "Lisensoitu MIT-lisenssillä",
          viewLicense: "Näytä lisenssi",
          viewOnGitHub: "Näytä GitHubissa"
        }
      }
    },
    fastUpload: {
      title: "Nopea lataus",
      description: "Tuo paketteja CLI:stä tai viety kohteesta",
      cliTooltip: "Avaa Tunno CLI-dokumentaatio",
      selectBundle: "Valitse paketti",
      changeBundle: "Vaihda paketti",
      status: {
        pending: "Odottaa",
        processing: "Käsittelee",
        success: "Onnistui",
        error: "Virhe",
        skipped: "Ohitettu"
      },
      completed: {
        allSuccess: {
          title: "Tuonti valmis",
          description: "{count} kappaletta tuotu onnistuneesti"
        },
        withErrors: {
          title: "Tuonti valmis virheillä",
          description: "{successCount} tuotu, {errorCount} epäonnistui, {skippedCount} ohitettu"
        },
        withSkipped: {
          title: "Tuonti valmis",
          description: "{successCount} tuotu, {skippedCount} ohitettu"
        }
      }
    },
    lyrics: {
      title: "Sanat"
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
