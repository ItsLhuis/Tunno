import Fr from "../assets/fr.svg"

import { type Language } from "../types"

/**
 * French language configuration.
 */
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
      thisWeek: "Cette semaine",
      thisMonth: "Ce mois",
      yesterday: "Hier",
      years: "{count} an{count, plural, one {} other{s}}",
      weeks: "{count} semaine{count, plural, one {} other{s}}",
      days: "{count} jour{count, plural, one {} other{s}}",
      hours: "{count} heure{count, plural, one {} other{s}}",
      minutes: "{count} minute{count, plural, one {} other{s}}",
      seconds: "{count} seconde{count, plural, one {} other{s}}",
      goBack: "Retour",
      goForward: "Avancer",
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
      added: "Ajouté",
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
      removeFromQueue: "Retirer de la file",
      removeFromPlaylist: "Retirer de la playlist",
      nowPlaying: "En cours de lecture",
      noSongPlaying: "Rien en lecture",
      upNext: "À suivre",
      actions: "Actions",
      addTo: "Ajouter à",
      playlist: "Playlist",
      song: "Chanson",
      lyrics: "Parole",
      openMiniplayer: "Ouvrir minilecteur",
      enterFullScreen: "Passer en plein écran",
      exitFullScreen: "Quitter le plein écran",
      goToSong: "Aller à la chanson",
      goToAlbum: "Aller à l'album",
      goToPlaylist: "Aller à la playlist",
      goToArtist: "Aller à l'artiste",
      shuffleAndPlay: "Mélanger et lire",
      unknown: "Inconnu",
      unknownAlbum: "Album inconnu",
      unknownArtist: "Artiste inconnu",
      listenTime: "Temps d'écoute",
      averageListenTime: "Temps d'écoute moyen",
      retentionRate: "Taux de rétention",
      totalPlays: "Total des lectures",
      lastPlayed: "Dernière lecture",
      neverPlayed: "Jamais joué",
      streak: "Série",
      refresh: "Actualiser",
      showingOfTotal: "Affichage de {showing} sur {total}",
      start: "Démarrer",
      completed: "Terminé",
      songsPlayed: "{count} chanson{count, plural, one {} other{s}}",
      appearsIn: "Apparaît dans",
      addToSidebar: "Ajouter à la barre latérale",
      removeFromSidebar: "Retirer de la barre latérale",
      featured: "En vedette",
      stats: "Statistiques",
      openToStart: "Ouvrir Tunno pour commencer"
    },
    form: {
      titles: {
        createSong: "Créer une chanson",
        updateSong: "Mettre à jour la chanson",
        deleteSong: "Supprimer la chanson",
        createArtist: "Créer un artiste",
        updateArtist: "Mettre à jour l'artiste",
        deleteArtist: "Supprimer l'artiste",
        createAlbum: "Créer un album",
        updateAlbum: "Mettre à jour l'album",
        deleteAlbum: "Supprimer l'album",
        createPlaylist: "Créer une playlist",
        updatePlaylist: "Mettre à jour la playlist",
        deletePlaylist: "Supprimer la playlist",
        addToPlaylist: "Ajouter à la playlist",
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
        albumType: "Type d'album",
        artists: "Artistes",
        folder: "Dossier",
        lyrics: "Paroles"
      },
      buttons: {
        cancel: "Annuler",
        delete: "Supprimer",
        update: "Mettre à jour",
        create: "Créer",
        add: "Ajouter"
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
      },
      albumType: {
        invalid: "Type d'album invalide"
      },
      playlistIds: {
        invalid: "Listes de lecture invalides"
      },
      album: {
        duplicate: "Un album avec ce nom existe déjà",
        integrity:
          "Impossible de retirer l'artiste de l'album car il y a des chansons qui appartiennent à la fois à cet album et à cet artiste"
      },
      artist: {
        duplicate: "Un artiste avec ce nom existe déjà",
        integrity:
          "Impossible de supprimer l'artiste car il y a des chansons qui appartiennent à la fois à cet artiste et à des albums incluant également cet artiste"
      },
      playlist: {
        duplicate: "Une liste de lecture avec ce nom existe déjà"
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
        equalizer: {
          title: "Égaliseur"
        },
        sync: {
          title: "Synchronisation"
        },
        about: {
          title: "À propos"
        }
      },
      lyrics: {
        title: "Parole"
      }
    },
    home: {
      title: "Accueil",
      jumpBackIn: {
        title: "Reprendre",
        description: "Reprenez où vous vous êtes arrêté"
      },
      newReleases: {
        title: "Nouveautés",
        description: "Nouveaux ajouts à votre collection"
      },
      onRepeat: {
        title: "En répétition",
        description: "Chansons que vous ne pouvez pas arrêter de jouer"
      },
      discover: {
        title: "Découvrir",
        description: "Nouvelles recommandations musicales pour vous"
      },
      favoriteArtists: {
        title: "Vos artistes",
        description: "Artistes que vous aimez le plus"
      },
      yourPlaylists: {
        title: "Fait pour vous",
        description: "Vos playlists personnelles"
      },
      topAlbums: {
        title: "Top albums",
        description: "Vos albums les plus écoutés"
      },
      recentlyAdded: {
        title: "Récemment ajouté",
        description: "Nouveaux ajouts à votre bibliothèque"
      },
      empty: {
        title: "Votre bibliothèque est vide",
        description:
          "Bienvenue sur Tunno. Pour commencer, vous devrez ajouter de la musique à votre bibliothèque personnelle.",
        getStarted: "Commencer",
        songs: {
          title: "Importer des chansons",
          description:
            "Ajoutez des fichiers musicaux depuis votre appareil pour commencer à construire votre bibliothèque"
        },
        albums: {
          title: "Créer des albums",
          description:
            "Organisez votre musique en créant des albums avec des illustrations et des détails"
        },
        playlists: {
          title: "Créer une playlist",
          description: "Organisez vos propres mix pour chaque humeur ou activité"
        },
        artists: {
          title: "Ajouter des artistes",
          description: "Créez des profils d'artistes pour organiser et gérer leur musique"
        }
      }
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
      songsAddedTitle: "Chansons ajoutées avec succès",
      songsAddedFailedTitle: "Échec de l'ajout des chansons",
      deletedTitle: "Playlist supprimée avec succès",
      deletedDescription: "{name} a été supprimée",
      deletedFailedTitle: "Échec de la suppression de la playlist",
      filters: {
        title: "Filtres",
        clear: "Effacer les filtres actifs",
        sortBy: "Trier par",
        favorites: "Favoris uniquement",
        favoritesDescription: "Afficher uniquement les playlists favorites",
        playCount: "Lectures",
        playCountMin: "Lectures minimum",
        playCountMax: "Lectures maximum",
        totalTracks: "Total des pistes",
        totalTracksMin: "Pistes minimum",
        totalTracksMax: "Pistes maximum",
        totalDuration: "Durée totale",
        totalDurationMin: "Durée minimum",
        totalDurationMax: "Durée maximum",
        lastPlayed: "Dernière lecture",
        lastPlayedAfter: "Après",
        lastPlayedBefore: "Avant",
        selectDate: "Sélectionner une date",
        sortOptions: {
          name: "Nom",
          favorites: "Favoris",
          playCount: "Lectures",
          totalTracks: "Total des pistes",
          totalDuration: "Durée totale",
          lastPlayed: "Dernière lecture",
          createdAt: "Date de création",
          updatedAt: "Date de mise à jour"
        }
      }
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
      deletedFailedTitle: "Échec de la suppression de l'album",
      filters: {
        title: "Filtres",
        clear: "Effacer les filtres actifs",
        sortBy: "Trier par",
        favorites: "Favoris uniquement",
        favoritesDescription: "Afficher uniquement les albums favoris",
        albumType: "Type d'album",
        all: "Tous les types",
        single: "Single",
        album: "Album",
        compilation: "Compilation",
        releaseYear: "Année de sortie",
        releaseYearMin: "Année minimum",
        releaseYearMax: "Année maximum",
        playCount: "Lectures",
        playCountMin: "Lectures minimum",
        playCountMax: "Lectures maximum",
        totalTracks: "Total des pistes",
        totalTracksMin: "Pistes minimum",
        totalTracksMax: "Pistes maximum",
        totalDuration: "Durée totale",
        totalDurationMin: "Durée minimum",
        totalDurationMax: "Durée maximum",
        lastPlayed: "Dernière lecture",
        lastPlayedAfter: "Lu après",
        lastPlayedBefore: "Lu avant",
        selectDate: "Sélectionner une date",
        sortOptions: {
          name: "Nom",
          releaseYear: "Année de sortie",
          favorites: "Favoris",
          playCount: "Lectures",
          totalTracks: "Total des pistes",
          totalDuration: "Durée totale",
          lastPlayed: "Dernière lecture",
          createdAt: "Créé",
          updatedAt: "Mis à jour"
        }
      }
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
      deletedFailedTitle: "Échec de la suppression de l'artiste",
      filters: {
        title: "Filtres",
        clear: "Effacer les filtres actifs",
        sortBy: "Trier par",
        favorites: "Favoris uniquement",
        favoritesDescription: "Afficher uniquement les artistes favoris",
        playCount: "Nombre de lectures",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        totalTracks: "Total des chansons",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maximum",
        totalDuration: "Durée totale",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maximum",
        lastPlayed: "Dernière lecture",
        lastPlayedAfter: "Après",
        lastPlayedBefore: "Avant",
        selectDate: "Sélectionner la date",
        sortOptions: {
          name: "Nom",
          favorites: "Favoris",
          playCount: "Nombre de lectures",
          totalTracks: "Total des chansons",
          totalDuration: "Durée totale",
          lastPlayed: "Dernière lecture",
          createdAt: "Date de création",
          updatedAt: "Date de mise à jour"
        }
      }
    },
    favorites: {
      createdTitle: "Ajouté aux favoris",
      createdDescription: "{name} a été ajouté aux favoris",
      createdFailedTitle: "Échec de l'ajout aux favoris",
      deletedTitle: "Retiré des favoris",
      deletedDescription: "{name} a été retiré des favoris",
      deletedFailedTitle: "Échec du retrait des favoris"
    },
    sidebar: {
      addedTitle: "Ajouté à la barre latérale",
      addedDescription: "{name} a été ajouté à la barre latérale",
      addedFailedTitle: "Échec de l'ajout à la barre latérale",
      removedTitle: "Retiré de la barre latérale",
      removedDescription: "{name} a été retiré de la barre latérale"
    },
    settings: {
      title: "Paramètres",
      appearance: {
        title: "Apparence",
        description: "Définir les préférences d'apparence de l'application.",
        theme: {
          title: "Thème",
          description: "Sélectionnez le thème de l'application",
          light: "Clair",
          dark: "Sombre",
          system: "Système"
        },
        zoom: {
          title: "Zoom",
          description: "Ajustez le niveau de zoom de l'application"
        }
      },
      language: {
        title: "Langue",
        description: "Choisissez votre langue préférée"
      },
      equalizer: {
        title: "Égaliseur",
        enable: {
          title: "Activer l'égaliseur",
          description: "Activer ou désactiver l'égaliseur audio",
          enabled: "Activé",
          disabled: "Désactivé"
        },
        presets: {
          title: "Préréglages de l'égaliseur",
          description: "Choisissez parmi les paramètres prédéfinis de l'égaliseur",
          flat: {
            label: "Plat",
            description: "Aucun ajustement"
          },
          rock: {
            label: "Rock",
            description: "Graves et aigus améliorés"
          },
          pop: {
            label: "Pop",
            description: "Équilibré avec un léger renforcement"
          },
          jazz: {
            label: "Jazz",
            description: "Accent doux sur les fréquences moyennes"
          },
          classical: {
            label: "Classique",
            description: "Son naturel"
          },
          electronic: {
            label: "Électronique",
            description: "Graves lourds et aigus nets"
          },
          vocal: {
            label: "Vocal",
            description: "Renforcement des fréquences moyennes pour la clarté"
          },
          bass: {
            label: "Graves",
            description: "Accent lourd sur les basses fréquences"
          },
          treble: {
            label: "Aigus",
            description: "Accent sur les hautes fréquences"
          }
        },
        bands: {
          title: "Bandes de fréquence",
          description: "Ajuster les bandes de fréquence individuelles"
        },
        reset: {
          title: "Réinitialiser l'égaliseur",
          description: "Réinitialiser toutes les bandes à plat (0 dB)",
          button: "Réinitialiser à plat"
        }
      },
      sync: {
        title: "Synchronisation",
        description: "Synchronisez vos données sur tous vos appareils",
        export: {
          title: "Exporter la bibliothèque",
          description:
            "Exportez votre bibliothèque sous forme de fichier bundle pour la sauvegarde ou pour l'utiliser sur un autre appareil",
          selectDestination: "Sélectionner la destination",
          exportingSongs: "Exportation de {count} chanson{count, plural, one {} other{s}}",
          preparingExport: "Préparation de l'exportation",
          exportingMessage: "Cela peut prendre un moment",
          exportSuccess: "Bibliothèque exportée avec succès",
          showFolder: "Afficher le dossier",
          exportAgain: "Exporter à nouveau",
          exportFailed: "Échec de l'exportation",
          tryAgain: "Réessayer",
          noSongs: "Aucune chanson à exporter",
          libraryEmpty: "Votre bibliothèque est vide",
          noValidSongs: "Aucune chanson valide à exporter",
          missingAlbumInfo: "Toutes les chansons n'ont pas d'informations d'album",
          songsExported:
            "{count} chanson{count, plural, one {} other{s}} exportée{count, plural, one {} other{s}} vers le bundle"
        },
        mobile: {
          title: "Synchroniser avec mobile",
          description: "Transférez votre bibliothèque vers Tunno Mobile sur votre réseau local",
          generateQr: "Générer le code QR",
          stopServer: "Arrêter le serveur",
          waitingConnection: "En attente de la connexion du périphérique mobile",
          deviceConnected: "Périphérique connecté",
          syncInProgress: "Synchronisation en cours",
          syncCompleted: "Synchronisation terminée avec succès",
          serverError: "Impossible de démarrer le serveur de synchronisation",
          scanQr: "Scanner le code QR",
          scanQrDescription:
            "Scannez le code QR sur votre ordinateur pour synchroniser votre bibliothèque musicale via WiFi",
          connecting: "Connexion",
          comparing: "Comparaison des bibliothèques",
          syncing: "Synchronisation",
          finalizing: "Finalisation",
          completed: "Synchronisation terminée",
          completedDescription: "Votre bibliothèque musicale a été synchronisée avec succès",
          alreadySynced: "Déjà synchronisé",
          failed: "Échec de la synchronisation",
          retry: "Réessayer",
          cancel: "Annuler",
          done: "Terminé",
          itemsSynced: "{synced} / {total} éléments",
          batchProgress: "Lot {current} / {total}",
          cameraPermissionTitle: "Accès à la caméra requis",
          cameraPermissionDescription:
            "Autorisez l'accès à la caméra pour scanner le code QR affiché sur votre ordinateur",
          grantPermission: "Autoriser l'accès",
          cameraLoading: "Chargement de la caméra",
          scanInstruction: "Dirigez votre caméra vers le code QR sur votre ordinateur",
          connectionFailed: "Impossible de joindre le serveur de bureau",
          insufficientStorage: "Espace de stockage insuffisant",
          insufficientStorageDescription:
            "Pas assez d'espace libre pour synchroniser. {required} nécessaire, mais seulement {available} disponible",
          syncInterrupted:
            "La synchronisation a été interrompue car l'application est passée en arrière-plan",
          downloadingItem: 'Téléchargement de "{name}"',
          fetchingBatch: "Récupération des métadonnées du lot {batch}",
          updatingStats: "Mise à jour des statistiques",
          syncComplete: "Synchronisation terminée",
          comparingLibraries: "Comparaison des bibliothèques",
          connectingToDesktop: "Connexion au bureau"
        }
      },
      about: {
        title: "À propos",
        description: "Informations sur l'application et détails de la version",
        version: "Version",
        whatsNew: {
          title: "Nouveautés",
          description: "Découvrez les dernières fonctionnalités et améliorations",
          newRelease: "Nouvelle version",
          viewChangelog: "Voir le changelog"
        },
        storage: {
          title: "Stockage et données",
          description: "Gérer les données de l'application et les paramètres",
          openDataFolder: "Ouvrir le dossier de données"
        },
        legal: {
          title: "Légal et copyright",
          description: "Informations de licence et documents juridiques",
          copyright: "Copyright",
          licensed: "Sous licence MIT",
          viewLicense: "Voir la licence",
          viewOnGitHub: "Voir sur GitHub"
        }
      }
    },
    fastUpload: {
      title: "Téléversement rapide",
      description: "Importer des paquets du CLI ou exportés depuis",
      cliTooltip: "Ouvrir la documentation de Tunno CLI",
      selectBundle: "Sélectionner le paquet",
      changeBundle: "Changer le paquet",
      status: {
        pending: "En attente",
        processing: "Traitement",
        success: "Succès",
        error: "Erreur",
        skipped: "Ignoré"
      },
      completed: {
        allSuccess: {
          title: "Importation terminée",
          description:
            "{count} piste{count, plural, one {} other{s}} importée{count, plural, one {} other{s}} avec succès"
        },
        withErrors: {
          title: "Importation terminée avec des erreurs",
          description: "{successCount} importées, {errorCount} échouées, {skippedCount} ignorées"
        },
        withSkipped: {
          title: "Importation terminée",
          description: "{successCount} importées, {skippedCount} ignorées"
        }
      }
    },
    lyrics: {
      title: "Parole"
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
