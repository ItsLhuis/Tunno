import { useEffect, useState } from "react"
import axios from "axios"
import { useThemeColor } from "@hooks/useThemeColor"
import { iconSize, spacing, zIndex } from "@constants/styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { BackIcon } from "@components/navigation"
import { Text, Button, TextInput, View, ActivityIndicator } from "@components/ui"
import { Alert, StyleSheet } from "react-native"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { router } from "expo-router"

export default function Drive() {
  const { colors } = useThemeColor()

  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [fileId, setFileId] = useState<string>("")
  const [fileContentLoaded, setFileContentLoaded] = useState<boolean>(false)
  const [fileContent, setFileContent] = useState<string>("")

  async function getAccessToken(): Promise<string> {
    await GoogleSignin.hasPlayServices()
    const tokens = await GoogleSignin.getTokens()
    return tokens.accessToken
  }

  useEffect(() => {
    async function initialize() {
      const token = await getAccessToken()
      setAccessToken(token)
    }
    initialize()
  }, [])

  useEffect(() => {
    if (!accessToken) return

    async function fetchOrCreateFolderAndFile() {
      const folderId = await getOrCreateBackupFolder()

      if (folderId) {
        const existingFileId = await getFileId("wave", folderId)
        if (existingFileId) {
          setFileId(existingFileId)
          await loadFileContent(existingFileId)
        } else {
          const createdFileId = await createFile("wave", folderId)
          if (createdFileId) setFileId(createdFileId)
        }
      }
    }
    fetchOrCreateFolderAndFile()
  }, [accessToken])

  async function getOrCreateBackupFolder(): Promise<string | null> {
    const folderName = `Wave_${GoogleSignin.getCurrentUser()?.user?.id}`

    try {
      const response = await axios.get("https://www.googleapis.com/drive/v3/files", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
          fields: "files(id)"
        }
      })

      if (response.data.files.length > 0) {
        return response.data.files[0].id
      } else {
        const createResponse = await axios.post(
          "https://www.googleapis.com/drive/v3/files",
          {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder"
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          }
        )
        return createResponse.data.id
      }
    } catch (error) {
      console.error("Erro ao buscar ou criar a pasta de backup:", error)
      return null
    }
  }

  async function getFileId(filename: string, folderId: string): Promise<string | null> {
    try {
      const response = await axios.get("https://www.googleapis.com/drive/v3/files", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          q: `name='${filename}' and '${folderId}' in parents and mimeType='text/plain'`,
          fields: "files(id)"
        }
      })
      return response.data.files.length > 0 ? response.data.files[0].id : null
    } catch (error) {
      console.error("Erro ao procurar arquivo:", error)
      return null
    }
  }

  async function loadFileContent(fileId: string) {
    try {
      const response = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { alt: "media" }
      })
      setFileContent(response.data)
      setFileContentLoaded(true)
    } catch (error) {
      console.error("Erro ao carregar conteúdo do arquivo:", error)
    }
  }

  async function createFile(filename: string, folderId: string): Promise<string | null> {
    try {
      const response = await axios.post(
        "https://www.googleapis.com/drive/v3/files",
        {
          name: filename,
          parents: [folderId],
          mimeType: "text/plain"
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      )
      Alert.alert("Sucesso", `Arquivo '${filename}' criado com ID: ${response.data.id}`)
      setFileContentLoaded(true)
      return response.data.id
    } catch (error) {
      console.error("Erro ao criar arquivo:", error)
      Alert.alert("Erro", "Falha ao criar o arquivo")
      return null
    }
  }

  async function updateFile() {
    try {
      if (!accessToken || !fileId) throw new Error("Dados insuficientes para atualização")

      await axios.patch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}`, fileContent, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain"
        },
        params: { uploadType: "media" }
      })
      Alert.alert("Sucesso", "Arquivo atualizado.")
    } catch (error) {
      console.error("Erro ao atualizar arquivo:", error)
      Alert.alert("Erro", "Falha ao atualizar o arquivo")
    }
  }

  async function deleteFile() {
    try {
      if (!accessToken || !fileId) throw new Error("Dados insuficientes para exclusão")

      await axios.delete(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      Alert.alert("Sucesso", "Arquivo excluído.")
      router.back()
      setFileId("")
      setFileContent("")
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error)
      Alert.alert("Erro", "Falha ao excluir o arquivo")
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: spacing.medium,
        paddingHorizontal: spacing.large,
        gap: spacing.medium
      }}
    >
      {!fileContentLoaded && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.background,
              opacity: 0.7,
              zIndex: zIndex.max,
              justifyContent: "center",
              alignItems: "center"
            }
          ]}
        >
          <ActivityIndicator color={colors.primary} size={iconSize.xLarge} />
        </View>
      )}
      <BackIcon />
      <TextInput
        placeholder="Digite o conteúdo do arquivo"
        value={fileContent}
        onChangeText={setFileContent}
        placeholderTextColor={colors.placeholder}
        style={{
          backgroundColor: colors.secondary,
          paddingHorizontal: spacing.small,
          marginTop: spacing.medium
        }}
        multiline
      />
      <Button
        containerStyle={{ width: "100%" }}
        style={{ width: "100%" }}
        title="Atualizar Arquivo"
        onPress={updateFile}
        disabled={!fileId}
      />
      <Button
        containerStyle={{ width: "100%" }}
        style={{ width: "100%" }}
        title="Excluir Arquivo"
        onPress={deleteFile}
        disabled={!fileId}
      />
      <Text>{accessToken}</Text>
      <Text>{fileId}</Text>
    </SafeAreaView>
  )
}
