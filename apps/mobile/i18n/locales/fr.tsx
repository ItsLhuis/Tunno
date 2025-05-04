import Fr from "@assets/images/flags/fr.svg"

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
      title: "Listes",
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
      title: "Paramètres"
    }
  }
}
