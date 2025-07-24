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
      hoursAgo: "Há {{count}} hora{{count, plural, one {} other {s}}}",
      today: "Hoje",
      yesterday: "Ontem",
      goBack: "Voltar",
      goFoward: "Avançar",
      favorite: "Favorito",
      unfavorite: "Remover dos favoritos",
      enableShuffle: "Ativar aleatório",
      disableShuffle: "Desativar aleatório",
      previous: "Anterior",
      play: "Reproduzir",
      pause: "Pausa",
      next: "Seguinte",
      enableRepeat: "Ativar repetição",
      enableRepeatOne: "Repetir uma vez",
      disableRepeat: "Desativar repetição",
      mute: "Silenciar",
      unmute: "Ativar som",
      queue: "Fila",
      title: "Título",
      album: "Álbum",
      date: "Data",
      duration: "Duração",
      search: "Pesquisar",
      selectAll: "Selecionar tudo",
      visibility: "Visibilidade",
      columns: "Colunas",
      clear: "Limpar",
      cancel: "Cancelar",
      more: "Mais",
      select: "Selecionar"
    },
    form: {
      titles: {
        createSong: "Criar música",
        updateSong: "Atualizar música",
        deleteSong: "Eliminar música",
        createArtist: "Criar artista",
        updateArtist: "Atualizar artista",
        deleteArtist: "Eliminar artista",
        createPlaylist: "Criar playlist",
        updatePlaylist: "Atualizar playlist",
        deletePlaylist: "Eliminar playlist",
        confirmation: "Confirmação",
        warning: "Aviso"
      },
      labels: {
        name: "Nome",
        thumbnail: "Miniatura",
        file: "Ficheiro",
        releaseYear: "Ano de lançamento",
        album: "Álbum",
        artists: "Artistas",
        isSingle: "É single",
        folder: "Pasta"
      },
      buttons: {
        cancel: "Cancelar",
        delete: "Eliminar",
        update: "Atualizar",
        create: "Criar"
      },
      descriptions: {
        thumbnail: "Imagem de fundo (opcional)",
        fileSize: "Tamanho máximo: {{size}}",
        supportedFormats: "Formatos suportados: {{formats}}"
      },
      messages: {
        confirmDelete: "Tens a certeza que queres eliminar?",
        unsavedChanges: "Tens alterações por guardar"
      }
    },
    validation: {
      name: {
        required: "O nome é obrigatório",
        max: "O nome pode ter no máximo 200 caracteres"
      },
      file: {
        required: "O ficheiro é obrigatório",
        invalid: "Ficheiro inválido ou corrompido",
        max: "O ficheiro excede o tamanho máximo de {{maxSize}}"
      },
      duration: {
        required: "A duração é obrigatória",
        min: "A duração deve ser maior que 0"
      },
      releaseYear: {
        invalid: "Ano de lançamento inválido",
        min: "O ano deve ser maior que 0",
        max: "O ano não pode ser no futuro"
      },
      albumId: {
        invalid: "Álbum inválido",
        requiredIfNotSingle: "O álbum é obrigatório se não for single"
      },
      artists: {
        min: "É necessário pelo menos um artista"
      }
    },
    update: {
      downloading: "A transferir e a instalar atualização",
      downloadingDescription:
        "Uma nova atualização está disponível, a instalação está a decorrer automaticamente",
      installedSuccess: "Atualização instalada",
      failed: "Falha ao instalar atualização"
    },
    breadcrumbs: {
      home: {
        title: "Início"
      },
      songs: {
        title: "Músicas"
      },
      favorites: {
        title: "Favoritos"
      },
      playlists: {
        title: "Playlists"
      },
      artists: {
        title: "Artistas"
      },
      fastUpload: {
        title: "Envio rápido"
      },
      settings: {
        title: "Definições",
        appearance: {
          title: "Aparência"
        },
        language: {
          title: "Idioma"
        },
        sync: {
          title: "Sincronização"
        }
      }
    },
    home: {
      title: "Início"
    },
    songs: {
      title: "Músicas",
      createdTitle: "Música adicionada",
      createdDescription: "{{name}} foi adicionada",
      createdFailedTitle: "Falha ao adicionar música",
      updatedTitle: "Música atualizada",
      updatedDescription: "{{name}} foi atualizada",
      updatedFailedTitle: "Falha ao atualizar música",
      deletedTitle: "Música eliminada",
      deletedDescription: "{{name}} foi eliminada",
      deletedFailedTitle: "Falha ao eliminar música"
    },
    favorites: {
      title: "Favoritos",
      createdTitle: "Adicionado aos favoritos",
      createdDescription: "{{name}} foi adicionado aos favoritos",
      createdFailedTitle: "Falha ao adicionar aos favoritos",
      deletedTitle: "Removido dos favoritos",
      deletedDescription: "{{name}} foi removido dos favoritos",
      deletedFailedTitle: "Falha ao remover dos favoritos"
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist criada",
      createdDescription: "{{name}} foi criada",
      createdFailedTitle: "Falha ao criar playlist",
      updatedTitle: "Playlist atualizada",
      updatedDescription: "{{name}} foi atualizada",
      updatedFailedTitle: "Falha ao atualizar playlist",
      deletedTitle: "Playlist eliminada",
      deletedDescription: "{{name}} foi eliminada",
      deletedFailedTitle: "Falha ao eliminar playlist"
    },
    artists: {
      title: "Artistas",
      createdTitle: "Artista adicionado",
      createdDescription: "{{name}} foi adicionado",
      createdFailedTitle: "Falha ao adicionar artista",
      updatedTitle: "Artista atualizado",
      updatedDescription: "{{name}} foi atualizado",
      updatedFailedTitle: "Falha ao atualizar artista",
      deletedTitle: "Artista eliminado",
      deletedDescription: "{{name}} foi eliminado",
      deletedFailedTitle: "Falha ao eliminar artista"
    },
    settings: {
      title: "Definições",
      appearance: {
        title: "Aparência",
        description: "Seleciona o tema preferido",
        light: "Claro",
        dark: "Escuro",
        system: "Sistema"
      },
      language: {
        title: "Idioma",
        description: "Seleciona o idioma preferido"
      },
      sync: {
        title: "Sincronização",
        description: "Sincroniza os dados entre dispositivos"
      }
    },
    fastUpload: {
      title: "Envio rápido"
    },
    languages: {
      da: "Dinamarquês",
      de: "Alemão",
      en: "Inglês",
      es: "Espanhol",
      fi: "Finlandês",
      fr: "Francês",
      hi: "Hindi",
      it: "Italiano",
      ja: "Japonês",
      ko: "Coreano",
      nl: "Holandês",
      no: "Norueguês",
      pl: "Polaco",
      pt: "Português",
      ru: "Russo",
      sv: "Sueco",
      tr: "Turco",
      uk: "Ucraniano",
      vi: "Vietnamita",
      zh: "Chinês"
    }
  }
}
