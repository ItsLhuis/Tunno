import Da from "../assets/da.svg"

import { type Language } from "../types"

export const danish: Language = {
  code: "da",
  name: "Dansk",
  flag: Da,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ingen resultater fundet",
      lessThanAnHourAgo: "Mindre end en time siden",
      hoursAgo: "{{count}} time{{count, plural, one {} other{r}}} siden",
      today: "I dag",
      yesterday: "I går",
      goBack: "Tilbage",
      goFoward: "Fremad",
      favorite: "Favorit",
      unfavorite: "Fjern fra favoritter",
      enableShuffle: "Aktivér tilfældig afspilning",
      disableShuffle: "Deaktivér tilfældig afspilning",
      previous: "Forrige",
      play: "Afspil",
      pause: "Pause",
      next: "Næste",
      enableRepeat: "Aktivér gentagelse",
      enableRepeatOne: "Gentag én gang",
      disableRepeat: "Deaktivér gentagelse",
      mute: "Slå lyd fra",
      unmute: "Slå lyd til",
      devices: "Enheder",
      queue: "Kø"
    },
    update: {
      downloading: "Downloader og installerer opdatering",
      downloadingDescription: "En ny opdatering er tilgængelig og installeres automatisk",
      installedSuccess: "Opdatering installeret med succes",
      failed: "Kunne ikke installere opdatering"
    },
    breadcrumbs: {
      home: {
        title: "Hjem"
      },
      songs: {
        title: "Sange"
      },
      favorites: {
        title: "Favoritter"
      },
      playlists: {
        title: "Afspilningslister"
      },
      artists: {
        title: "Kunstnere"
      },
      fastUpload: {
        title: "Hurtig upload"
      },
      settings: {
        title: "Indstillinger",
        appearance: {
          title: "Udseende"
        },
        language: {
          title: "Sprog"
        },
        sync: {
          title: "Synkronisering"
        }
      }
    },
    home: { title: "Hjem" },
    songs: {
      title: "Sange",
      createdTitle: "Sang oprettet med succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette sang",
      updatedTitle: "Sang opdateret med succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere sang",
      deletedTitle: "Sang slettet med succes",
      deletedDescription: "{{name}} er blevet slettet",
      deletedFailedTitle: "Kunne ikke slette sang"
    },
    favorites: {
      title: "Favoritter",
      addedTitle: "Tilføjet til favoritter",
      addedDescription: "{{name}} er blevet tilføjet til favoritter",
      addedFailedTitle: "Kunne ikke tilføje til favoritter",
      removedTitle: "Fjernet fra favoritter",
      removedDescription: "{{name}} er blevet fjernet fra favoritter",
      removedFailedTitle: "Kunne ikke fjerne fra favoritter"
    },
    playlists: {
      title: "Afspilningslister",
      createdTitle: "Afspilningsliste oprettet med succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette afspilningsliste",
      updatedTitle: "Afspilningsliste opdateret med succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere afspilningsliste",
      deletedTitle: "Afspilningsliste slettet med succes",
      deletedDescription: "{{name}} er blevet slettet",
      deletedFailedTitle: "Kunne ikke slette afspilningsliste"
    },
    artists: {
      title: "Kunstnere",
      createdTitle: "Kunstner oprettet med succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne ikke oprette kunstner",
      updatedTitle: "Kunstner opdateret med succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne ikke opdatere kunstner",
      deletedTitle: "Kunstner slettet med succes",
      deletedDescription: "{{name}} er blevet slettet",
      deletedFailedTitle: "Kunne ikke slette kunstner"
    },
    settings: {
      title: "Indstillinger",
      appearance: {
        title: "Udseende",
        description: "Vælg din foretrukne visningstilstand",
        light: "Lys",
        dark: "Mørk",
        system: "System"
      },
      language: {
        title: "Sprog",
        description: "Vælg dit foretrukne sprog"
      },
      sync: {
        title: "Synkronisering",
        description: "Synkroniser dine data mellem enheder"
      }
    },
    fastUpload: {
      title: "Hurtig upload"
    },
    languages: {
      da: "Dansk",
      de: "Tysk",
      en: "Engelsk",
      es: "Spansk",
      fi: "Finsk",
      fr: "Fransk",
      hi: "Hindi",
      it: "Italiensk",
      ja: "Japansk",
      ko: "Koreansk",
      nl: "Hollandsk",
      no: "Norsk",
      pl: "Polsk",
      pt: "Portugisisk",
      ru: "Russisk",
      sv: "Svensk",
      tr: "Tyrkisk",
      uk: "Ukrainsk",
      vi: "Vietnamesisk",
      zh: "Kinesisk"
    }
  }
}
