import Fr from "../assets/fr.svg"

import { type Language } from "../types"

export const french: Language = {
  code: "fr",
  name: "Français",
  flag: Fr,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Aucun résultat trouvé",
      lessThanAnHourAgo: "Il y a moins d'une heure",
      hoursAgo: "Il y a {{count}} heure{{count, plural, one {} other{s}}}",
      today: "Aujourd'hui",
      yesterday: "Hier",
      goBack: "Retourner",
      goFoward: "Avancer",
      favorite: "Favori",
      unfavorite: "Retirer des favoris",
      enableShuffle: "Activer le mode aléatoire",
      disableShuffle: "Désactiver le mode aléatoire",
      previous: "Précédent",
      play: "Lire",
      pause: "Pause",
      next: "Suivant",
      enableRepeat: "Activer la répétition",
      enableRepeatOne: "Répéter une fois",
      disableRepeat: "Désactiver la répétition",
      mute: "Muet",
      unmute: "Activer le son",
      queue: "File d'attente"
    },
    update: {
      downloading: "Téléchargement et installation de la mise à jour",
      downloadingDescription:
        "Une nouvelle mise à jour est disponible et s'installe automatiquement",
      installedSuccess: "Mise à jour installée avec succès",
      failed: "Échec de l'installation de la mise à jour"
    },
    breadcrumbs: {
      home: {
        title: "Accueil"
      },
      songs: {
        title: "Chansons"
      },
      favorites: {
        title: "Favoris"
      },
      playlists: {
        title: "Listes de Lecture"
      },
      artists: {
        title: "Artistes"
      },
      fastUpload: {
        title: "Téléchargement Rapide"
      },
      settings: {
        title: "Paramètres",
        appearance: {
          title: "Apparence"
        },
        language: {
          title: "Langue"
        },
        sync: {
          title: "Synchronisation"
        }
      }
    },
    home: { title: "Accueil" },
    songs: {
      title: "Chansons",
      createdTitle: "Chanson Créée avec Succès",
      createdDescription: "{{name}} a été créée",
      createdFailedTitle: "Échec de la Création de la Chanson",
      updatedTitle: "Chanson Mise à Jour avec Succès",
      updatedDescription: "{{name}} a été mise à jour",
      updatedFailedTitle: "Échec de la Mise à Jour de la Chanson",
      deletedTitle: "Chanson Supprimée avec Succès",
      deletedDescription: "{{name}} a été supprimée",
      deletedFailedTitle: "Échec de la Suppression de la Chanson"
    },
    favorites: {
      title: "Favoris",
      addedTitle: "Ajouté aux Favoris",
      addedDescription: "{{name}} a été ajouté aux favoris",
      addedFailedTitle: "Échec de l'Ajout aux Favoris",
      removedTitle: "Retiré des Favoris",
      removedDescription: "{{name}} a été retiré des favoris",
      removedFailedTitle: "Échec du Retrait des Favoris"
    },
    playlists: {
      title: "Listes de Lecture",
      createdTitle: "Liste Créée avec Succès",
      createdDescription: "{{name}} a été créée",
      createdFailedTitle: "Échec de la Création de la Liste",
      updatedTitle: "Liste Mise à Jour avec Succès",
      updatedDescription: "{{name}} a été mise à jour",
      updatedFailedTitle: "Échec de la Mise à Jour de la Liste",
      deletedTitle: "Liste Supprimée avec Succès",
      deletedDescription: "{{name}} a été supprimée",
      deletedFailedTitle: "Échec de la Suppression de la Liste"
    },
    artists: {
      title: "Artistes",
      createdTitle: "Artiste Créé avec Succès",
      createdDescription: "{{name}} a été créé",
      createdFailedTitle: "Échec de la Création de l'Artiste",
      updatedTitle: "Artiste Mis à Jour avec Succès",
      updatedDescription: "{{name}} a été mis à jour",
      updatedFailedTitle: "Échec de la Mise à Jour de l'Artiste",
      deletedTitle: "Artiste Supprimé avec Succès",
      deletedDescription: "{{name}} a été supprimé",
      deletedFailedTitle: "Échec de la Suppression de l'Artiste"
    },
    settings: {
      title: "Paramètres",
      appearance: {
        title: "Apparence",
        description: "Sélectionnez votre mode d'apparence préféré",
        light: "Clair",
        dark: "Sombre",
        system: "Système"
      },
      language: {
        title: "Langue",
        description: "Choisissez votre langue préférée"
      },
      sync: {
        title: "Synchronisation",
        description: "Synchronisez vos données entre appareils"
      }
    },
    fastUpload: {
      title: "Téléchargement Rapide"
    },
    languages: {
      da: "Danois",
      de: "Allemand",
      en: "Anglais",
      es: "Espagnol",
      fi: "Finnois",
      fr: "Français",
      hi: "Hindi",
      it: "Italien",
      ja: "Japonais",
      ko: "Coréen",
      nl: "Néerlandais",
      no: "Norvégien",
      pl: "Polonais",
      pt: "Portugais",
      ru: "Russe",
      sv: "Suédois",
      tr: "Turc",
      uk: "Ukrainien",
      vi: "Vietnamien",
      zh: "Chinois"
    }
  }
}
