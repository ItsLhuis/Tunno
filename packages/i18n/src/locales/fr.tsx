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
      hoursAgo: "il y a {count} heure{count, plural, one {} other{s}}",
      today: "Aujourd'hui",
      yesterday: "Hier",
      years: "{count} an{count, plural, one {} other{s}}",
      weeks: "{count} semaine{count, plural, one {} other{s}}",
      days: "{count} jour{count, plural, one {} other{s}}",
      hours: "{count} heure{count, plural, one {} other{s}}",
      minutes: "{count} minute{count, plural, one {} other{s}}",
      seconds: "{count} seconde{count, plural, one {} other{s}}",
      goBack: "Retour",
      goFoward: "Avancer",
      favorite: "Ajouter aux favoris",
      unfavorite: "Retirer des favoris",
      enableShuffle: "Activer le mode aléatoire",
      disableShuffle: "Désactiver le mode aléatoire",
      previous: "Précédent",
      play: "Lecture",
      pause: "Pause",
      next: "Suivant",
      enableRepeat: "Activer la répétition",
      enableRepeatOne: "Activer la répétition d'une piste",
      disableRepeat: "Désactiver la répétition",
      mute: "Muet",
      unmute: "Activer le son",
      queue: "File d'attente",
      title: "Titre",
      album: "Album",
      artist: "Artiste",
      date: "Date",
      createdAt: "Date de création",
      duration: "Durée",
      search: "Rechercher",
      selectAll: "Tout sélectionner",
      clear: "Effacer",
      cancel: "Annuler",
      more: "Plus",
      select: "Sélectionner",
      preview: "Aperçu",
      close: "Fermer",
      playback: "Lecture",
      playNext: "Lire suivant",
      actions: "Actions",
      addTo: "Ajouter à",
      playlist: "Liste de lecture",
      song: "Chanson",
      lyrics: "Parole",
      openMiniplayer: "Ouvrir minilecteur",
      enterFullScreen: "Passer en plein écran",
      exitFullScreen: "Quitter le plein écran",
      goToAlbum: "Aller à l'album",
      goToArtist: "Aller à l'artiste",
      shuffleAndPlay: "Mélanger et lire",
      unknown: "Inconnu",
      unknownAlbum: "Album inconnu",
      unknownArtist: "Artiste inconnu"
    },
    form: {
      titles: {
        createSong: "Créer une chanson",
        updateSong: "Mettre à jour la chanson",
        deleteSong: "Supprimer la chanson",
        createArtist: "Créer un artiste",
        updateArtist: "Mettre à jour l'artiste",
        deleteArtist: "Supprimer l'artiste",
        createPlaylist: "Créer une playlist",
        updatePlaylist: "Mettre à jour la playlist",
        deletePlaylist: "Supprimer la playlist",
        confirmation: "Confirmation",
        warning: "Avertissement",
        lyricsPreview: "Aperçu des paroles"
      },
      labels: {
        name: "Nom",
        thumbnail: "Miniature",
        file: "Fichier",
        releaseYear: "Année de sortie",
        album: "Album",
        artists: "Artistes",
        folder: "Dossier",
        lyrics: "Paroles"
      },
      buttons: {
        cancel: "Annuler",
        delete: "Supprimer",
        update: "Mettre à jour",
        create: "Créer"
      },
      descriptions: {
        thumbnail: "Image de fond (optionnelle)",
        fileSize: "Taille maximale : {size}",
        supportedFormats: "Formats supportés : {formats}",
        lyricsPreview: "Visualisez les paroles synchronisées avec le temps"
      },
      badges: {
        lines: "{count} ligne{count, plural, one {} other{s}}",
        duration: "Durée : {time}"
      },
      messages: {
        confirmDelete: "Êtes-vous sûr de vouloir supprimer ?",
        unsavedChanges: "Il y a des modifications non enregistrées",
        noLyrics: "Pas de paroles"
      }
    },
    validation: {
      name: {
        required: "Le nom est requis",
        max: "Le nom doit contenir au maximum 200 caractères"
      },
      file: {
        required: "Le fichier est requis",
        invalid: "Fichier invalide ou corrompu",
        max: "Le fichier dépasse la taille maximale de {maxSize}"
      },
      duration: {
        required: "La durée est requise",
        min: "La durée doit être au moins de 0"
      },
      releaseYear: {
        invalid: "Année de sortie invalide",
        min: "L'année de sortie doit être au moins 0",
        max: "L'année de sortie ne peut pas être dans le futur"
      },
      albumId: {
        invalid: "Album invalide"
      },
      artists: {
        invalid: "Artistes invalides"
      }
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
      playlists: {
        title: "Playlists"
      },
      albums: {
        title: "Albums"
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
      createdDescription: "{name} a été créée",
      createdFailedTitle: "Échec de la création de la chanson",
      updatedTitle: "Chanson mise à jour avec succès",
      updatedDescription: "{name} a été mise à jour",
      updatedFailedTitle: "Échec de la mise à jour de la chanson",
      deletedTitle: "Chanson supprimée avec succès",
      deletedDescription: "{name} a été supprimée",
      deletedFailedTitle: "Échec de la suppression de la chanson",
      filters: {
        title: "Filtres",
        clear: "Effacer les filtres actifs",
        sortBy: "Trier par",
        favorites: "Favoris uniquement",
        favoritesDescription: "Afficher uniquement les chansons favorites",
        lyrics: "Avec paroles",
        lyricsDescription: "Afficher uniquement les chansons avec paroles",
        releaseYear: "Année de sortie",
        duration: "Durée",
        durationMin: "Minimum",
        durationMax: "Maximum",
        playCount: "Nombre de lectures",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        lastPlayed: "Dernière lecture",
        lastPlayedAfter: "Après",
        lastPlayedBefore: "Avant",
        selectDate: "Sélectionner une date",
        sortOptions: {
          name: "Nom",
          duration: "Durée",
          favorites: "Favoris",
          year: "Année",
          playCount: "Lectures",
          lastPlayed: "Dernière lecture",
          createdAt: "Date de création",
          updatedAt: "Date de mise à jour"
        }
      }
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist créée avec succès",
      createdDescription: "{name} a été créée",
      createdFailedTitle: "Échec de la création de la playlist",
      updatedTitle: "Playlist mise à jour avec succès",
      updatedDescription: "{name} a été mise à jour",
      updatedFailedTitle: "Échec de la mise à jour de la playlist",
      deletedTitle: "Playlist supprimée avec succès",
      deletedDescription: "{name} a été supprimée",
      deletedFailedTitle: "Échec de la suppression de la playlist"
    },
    albums: {
      title: "Albums",
      createdTitle: "Album créé avec succès",
      createdDescription: "{name} a été créé",
      createdFailedTitle: "Échec de la création de l'album",
      updatedTitle: "Album mis à jour avec succès",
      updatedDescription: "{name} a été mis à jour",
      updatedFailedTitle: "Échec de la mise à jour de l'album",
      deletedTitle: "Album supprimé avec succès",
      deletedDescription: "{name} a été supprimé",
      deletedFailedTitle: "Échec de la suppression de l'album"
    },
    artists: {
      title: "Artistes",
      createdTitle: "Artiste créé avec succès",
      createdDescription: "{name} a été créé",
      createdFailedTitle: "Échec de la création de l'artiste",
      updatedTitle: "Artiste mis à jour avec succès",
      updatedDescription: "{name} a été mis à jour",
      updatedFailedTitle: "Échec de la mise à jour de l'artiste",
      deletedTitle: "Artiste supprimé avec succès",
      deletedDescription: "{name} a été supprimé",
      deletedFailedTitle: "Échec de la suppression de l'artiste"
    },
    favorites: {
      createdTitle: "Ajouté aux favoris",
      createdDescription: "{name} a été ajouté aux favoris",
      createdFailedTitle: "Échec de l'ajout aux favoris",
      deletedTitle: "Retiré des favoris",
      deletedDescription: "{name} a été retiré des favoris",
      deletedFailedTitle: "Échec du retrait des favoris"
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
