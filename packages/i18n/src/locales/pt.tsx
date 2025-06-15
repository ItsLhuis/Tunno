import Pt from "../assets/pt.svg"

import { type Language } from "../types"

export const portuguese: Language = {
  code: "pt",
  name: "Português",
  flag: Pt,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nenhum resultado encontrado",
      lessThanAnHourAgo: "Há menos de uma hora",
      hoursAgo: "Há {{count}} hora{{count, plural, one {} other{s}}}",
      today: "Hoje",
      yesterday: "Ontem"
    },
    update: {
      downloading: "A transferir e instalar atualização",
      downloadingDescription:
        "Uma nova atualização está disponível e está a ser instalada automaticamente",
      installedSuccess: "Atualização instalada com sucesso",
      failed: "Falha ao instalar atualização"
    },
    home: { title: "Home" },
    songs: {
      title: "Músicas",
      createdTitle: "Música Criada com Sucesso",
      createdDescription: "{{name}} foi criada",
      createdFailedTitle: "Falha ao Criar Música",
      updatedTitle: "Música Atualizada com Sucesso",
      updatedDescription: "{{name}} foi atualizada",
      updatedFailedTitle: "Falha ao Atualizar Música",
      deletedTitle: "Música Eliminada com Sucesso",
      deletedDescription: "{{name}} foi eliminada",
      deletedFailedTitle: "Falha ao Eliminar Música"
    },
    favorites: {
      title: "Favoritos",
      addedTitle: "Adicionado aos Favoritos",
      addedDescription: "{{name}} foi adicionado aos favoritos",
      addedFailedTitle: "Erro ao Adicionar aos Favoritos",
      removedTitle: "Removido dos Favoritos",
      removedDescription: "{{name}} foi removido dos favoritos",
      removedFailedTitle: "Erro ao Remover dos Favoritos"
    },
    playlists: {
      title: "Listas de Reprodução",
      createdTitle: "Lista de Reprodução Criada com Sucesso",
      createdDescription: "{{name}} foi criada",
      createdFailedTitle: "Erro ao Criar Lista de Reprodução",
      updatedTitle: "Lista de Reprodução Atualizada com Sucesso",
      updatedDescription: "{{name}} foi atualizada",
      updatedFailedTitle: "Erro ao Atualizar Lista de Reprodução",
      deletedTitle: "Lista de Reprodução Eliminada com Sucesso",
      deletedDescription: "{{name}} foi eliminada",
      deletedFailedTitle: "Erro ao Eliminar Lista de Reprodução"
    },
    artists: {
      title: "Artistas",
      createdTitle: "Artista Criado com Sucesso",
      createdDescription: "{{name}} foi criado",
      createdFailedTitle: "Erro ao Criar Artista",
      updatedTitle: "Artista Atualizado com Sucesso",
      updatedDescription: "{{name}} foi atualizado",
      updatedFailedTitle: "Erro ao Atualizar Artista",
      deletedTitle: "Artista Eliminado com Sucesso",
      deletedDescription: "{{name}} foi eliminado",
      deletedFailedTitle: "Erro ao Eliminar Artista"
    },
    settings: {
      title: "Definições",
      theme: {
        title: "Tema",
        description: "Seleccione o seu modo de aparência preferido",
        light: "Claro",
        dark: "Escuro",
        system: "Sistema"
      },
      language: {
        title: "Idioma",
        description: "Escolha o seu idioma preferido"
      },
      sync: {
        title: "Sincronização",
        description: "Sincronize os seus dados entre dispositivos"
      }
    }
  }
}
