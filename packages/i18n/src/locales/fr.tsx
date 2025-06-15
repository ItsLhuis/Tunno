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
      hoursAgo: "{{count}} heure{{count, plural, one {} other{s}}} avant",
      today: "Aujourd'hui",
      yesterday: "Hier"
    },
    update: {
      downloading: "Téléchargement et installation de la mise à jour",
      downloadingDescription:
        "Une nouvelle mise à jour est disponible et s'installe automatiquement",
      installedSuccess: "Mise à jour installée avec succès",
      failed: "Échec de l'installation de la mise à jour"
    },
    home: { title: "Home" },
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
      theme: {
        title: "Thème",
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
        description: "Synchronisez vos données entre les appareils"
      }
    }
  }
}
