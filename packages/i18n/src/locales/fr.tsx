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
      goBack: "Retour",
      goFoward: "Suivant",
      favorite: "Favori",
      unfavorite: "Retirer des favoris",
      enableShuffle: "Activer la lecture aléatoire",
      disableShuffle: "Désactiver la lecture aléatoire",
      previous: "Précédent",
      play: "Lecture",
      pause: "Pause",
      next: "Suivant",
      enableRepeat: "Activer la répétition",
      enableRepeatOne: "Répéter un seul",
      disableRepeat: "Désactiver la répétition",
      mute: "Couper le son",
      unmute: "Activer le son",
      queue: "File d'attente",
      title: "Titre",
      album: "Album",
      date: "Date",
      duration: "Durée",
      search: "Rechercher",
      selectAll: "Tout sélectionner",
      visibility: "Visibilité",
      columns: "Colonnes",
      clear: "Effacer",
      cancel: "Annuler",
      more: "Plus"
    },
    form: {
      titles: {
        createSong: "Créer une chanson",
        updateSong: "Modifier la chanson",
        deleteSong: "Supprimer la chanson",
        createArtist: "Créer un artiste",
        updateArtist: "Modifier l'artiste",
        deleteArtist: "Supprimer l'artiste",
        createPlaylist: "Créer une playlist",
        updatePlaylist: "Modifier la playlist",
        deletePlaylist: "Supprimer la playlist",
        confirmation: "Confirmation",
        warning: "Avertissement"
      },
      labels: {
        name: "Nom",
        thumbnail: "Miniature",
        file: "Fichier",
        releaseYear: "Année de sortie",
        album: "Album",
        artists: "Artistes",
        isSingle: "Est un single"
      },
      buttons: {
        cancel: "Annuler",
        delete: "Supprimer",
        update: "Modifier",
        create: "Créer"
      },
      descriptions: {
        thumbnail: "Image d'arrière-plan (optionnel)",
        dragAndDrop: "Glissez et déposez le fichier ici",
        fileSize: "Taille maximale : {{size}}",
        supportedFormats: "Formats supportés : {{formats}}"
      },
      messages: {
        confirmDelete: "Êtes-vous sûr de vouloir supprimer ?",
        unsavedChanges: "Il y a des modifications non sauvegardées"
      }
    },
    validation: {
      name: {
        required: "Le nom est requis",
        max: "Le nom doit contenir au maximum 200 caractères"
      },
      file: {
        required: "Le fichier est requis"
      },
      duration: {
        required: "La durée est requise",
        min: "La durée doit être d'au moins 0"
      },
      releaseYear: {
        invalid: "Année de sortie invalide",
        min: "L'année de sortie doit être d'au moins 0",
        max: "L'année de sortie ne peut pas être dans le futur"
      },
      albumId: {
        invalid: "Album invalide",
        requiredIfNotSingle: "L'album est requis si ce n'est pas un single"
      },
      artists: {
        min: "Au moins un artiste est requis"
      }
    },
    update: {
      downloading: "Téléchargement et installation de la mise à jour",
      downloadingDescription:
        "Une nouvelle mise à jour est disponible et est installée automatiquement",
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
        title: "Playlists"
      },
      artists: {
        title: "Artistes"
      },
      fastUpload: {
        title: "Téléversement rapide"
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
    home: {
      title: "Accueil"
    },
    songs: {
      title: "Chansons",
      createdTitle: "Chanson créée avec succès",
      createdDescription: "{{name}} a été créée",
      createdFailedTitle: "Échec de la création de la chanson",
      updatedTitle: "Chanson modifiée avec succès",
      updatedDescription: "{{name}} a été modifiée",
      updatedFailedTitle: "Échec de la modification de la chanson",
      deletedTitle: "Chanson supprimée avec succès",
      deletedDescription: "{{name}} a été supprimée",
      deletedFailedTitle: "Échec de la suppression de la chanson"
    },
    favorites: {
      title: "Favoris",
      createdTitle: "Ajouté aux favoris",
      createdDescription: "{{name}} a été ajouté aux favoris",
      createdFailedTitle: "Échec de l'ajout aux favoris",
      deletedTitle: "Retiré des favoris",
      deletedDescription: "{{name}} a été retiré des favoris",
      deletedFailedTitle: "Échec du retrait des favoris"
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist créée avec succès",
      createdDescription: "{{name}} a été créée",
      createdFailedTitle: "Échec de la création de la playlist",
      updatedTitle: "Playlist modifiée avec succès",
      updatedDescription: "{{name}} a été modifiée",
      updatedFailedTitle: "Échec de la modification de la playlist",
      deletedTitle: "Playlist supprimée avec succès",
      deletedDescription: "{{name}} a été supprimée",
      deletedFailedTitle: "Échec de la suppression de la playlist"
    },
    artists: {
      title: "Artistes",
      createdTitle: "Artiste créé avec succès",
      createdDescription: "{{name}} a été créé",
      createdFailedTitle: "Échec de la création de l'artiste",
      updatedTitle: "Artiste modifié avec succès",
      updatedDescription: "{{name}} a été modifié",
      updatedFailedTitle: "Échec de la modification de l'artiste",
      deletedTitle: "Artiste supprimé avec succès",
      deletedDescription: "{{name}} a été supprimé",
      deletedFailedTitle: "Échec de la suppression de l'artiste"
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
        description: "Synchronisez vos données sur tous vos appareils"
      }
    },
    fastUpload: {
      title: "Téléversement rapide"
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
