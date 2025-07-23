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
      yesterday: "Ontem",
      goBack: "Voltar",
      goFoward: "Avançar",
      favorite: "Favorito",
      unfavorite: "Remover dos favoritos",
      enableShuffle: "Ativar reprodução aleatória",
      disableShuffle: "Desativar reprodução aleatória",
      previous: "Anterior",
      play: "Reproduzir",
      pause: "Pausar",
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
      more: "Mais"
    },
    form: {
      titles: {
        createSong: "Criar Música",
        updateSong: "Atualizar Música",
        deleteSong: "Eliminar Música",
        createArtist: "Criar Artista",
        updateArtist: "Atualizar Artista",
        deleteArtist: "Eliminar Artista",
        createPlaylist: "Criar Lista de Reprodução",
        updatePlaylist: "Atualizar Lista de Reprodução",
        deletePlaylist: "Eliminar Lista de Reprodução",
        confirmation: "Confirmação",
        warning: "Aviso"
      },
      labels: {
        name: "Nome",
        thumbnail: "Miniatura",
        file: "Ficheiro",
        releaseYear: "Ano de Lançamento",
        album: "Álbum",
        artists: "Artistas",
        isSingle: "É Single"
      },
      buttons: {
        cancel: "Cancelar",
        delete: "Eliminar",
        update: "Atualizar",
        create: "Criar"
      },
      descriptions: {
        thumbnail: "Imagem de fundo (opcional)",
        dragAndDrop: "Arraste e largue o ficheiro aqui",
        fileSize: "Tamanho máximo: {{size}}",
        supportedFormats: "Formatos suportados: {{formats}}"
      },
      messages: {
        confirmDelete: "Tem a certeza que pretende eliminar?",
        unsavedChanges: "Existem alterações não guardadas"
      }
    },
    validation: {
      name: {
        required: "O nome é obrigatório",
        max: "O nome deve ter no máximo 200 caracteres"
      },
      file: {
        required: "O ficheiro é obrigatório"
      },
      duration: {
        required: "A duração é obrigatória",
        min: "A duração deve ser no mínimo 0"
      },
      releaseYear: {
        invalid: "Ano de lançamento inválido",
        min: "O ano de lançamento deve ser no mínimo 0",
        max: "O ano de lançamento não pode ser no futuro"
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
        "Uma nova atualização está disponível e está a ser instalada automaticamente",
      installedSuccess: "Atualização instalada com sucesso",
      failed: "Falha na instalação da atualização"
    },
    breadcrumbs: {
      home: { title: "Início" },
      songs: { title: "Músicas" },
      favorites: { title: "Favoritos" },
      playlists: { title: "Listas de Reprodução" },
      artists: { title: "Artistas" },
      fastUpload: { title: "Upload Rápido" },
      settings: {
        title: "Definições",
        appearance: { title: "Aparência" },
        language: { title: "Idioma" },
        sync: { title: "Sincronização" }
      }
    },
    home: { title: "Início" },
    songs: {
      title: "Músicas",
      createdTitle: "Música criada com sucesso",
      createdDescription: "{{name}} foi criada",
      createdFailedTitle: "Falha ao criar música",
      updatedTitle: "Música atualizada com sucesso",
      updatedDescription: "{{name}} foi atualizada",
      updatedFailedTitle: "Falha ao atualizar música",
      deletedTitle: "Música eliminada com sucesso",
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
      title: "Listas de Reprodução",
      createdTitle: "Lista de reprodução criada com sucesso",
      createdDescription: "{{name}} foi criada",
      createdFailedTitle: "Falha ao criar lista de reprodução",
      updatedTitle: "Lista de reprodução atualizada com sucesso",
      updatedDescription: "{{name}} foi atualizada",
      updatedFailedTitle: "Falha ao atualizar lista de reprodução",
      deletedTitle: "Lista de reprodução eliminada com sucesso",
      deletedDescription: "{{name}} foi eliminada",
      deletedFailedTitle: "Falha ao eliminar lista de reprodução"
    },
    artists: {
      title: "Artistas",
      createdTitle: "Artista criado com sucesso",
      createdDescription: "{{name}} foi criado",
      createdFailedTitle: "Falha ao criar artista",
      updatedTitle: "Artista atualizado com sucesso",
      updatedDescription: "{{name}} foi atualizado",
      updatedFailedTitle: "Falha ao atualizar artista",
      deletedTitle: "Artista eliminado com sucesso",
      deletedDescription: "{{name}} foi eliminado",
      deletedFailedTitle: "Falha ao eliminar artista"
    },
    settings: {
      title: "Definições",
      appearance: {
        title: "Aparência",
        description: "Selecione o modo de aparência preferido",
        light: "Claro",
        dark: "Escuro",
        system: "Sistema"
      },
      language: {
        title: "Idioma",
        description: "Escolha o idioma preferido"
      },
      sync: {
        title: "Sincronização",
        description: "Sincronize os seus dados entre dispositivos"
      }
    },
    fastUpload: { title: "Upload Rápido" },
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
