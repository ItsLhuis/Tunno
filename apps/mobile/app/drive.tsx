import React, { useState, useEffect } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { TextInput, Text, Button, toast, IconButton, Image } from "@/components/ui"
import { database } from "@database/client"
import { artists } from "@database/schema"
import { eq } from "drizzle-orm"
import { FlashList } from "@shopify/flash-list"
import { useSettingsStore } from "@/stores/useSettingsStore"
import { useColorTheme } from "@/hooks/useColorTheme"

import Thumbnail1 from "@assets/thumbs/1.jpg"
import Thumbnail2 from "@assets/thumbs/2.jpg"
import Thumbnail3 from "@assets/thumbs/3.jpg"
import Thumbnail4 from "@assets/thumbs/4.jpg"
import Thumbnail5 from "@assets/thumbs/5.jpg"
import Thumbnail6 from "@assets/thumbs/6.jpg"

const thumbnails = [Thumbnail1, Thumbnail2, Thumbnail3, Thumbnail4, Thumbnail5, Thumbnail6]

const ArtistManager: React.FC = () => {
  const { colors } = useColorTheme()

  const [name, setName] = useState("")
  const [artistList, setArtistList] = useState<any[]>([])

  const fetchArtists = async () => {
    try {
      const result = await database.query.artists.findMany()
      setArtistList(result)
    } catch (error) {
      console.error("Erro ao carregar artistas:", error)
    }
  }

  const handleAddArtist = async () => {
    if (name.trim()) {
      try {
        await database.insert(artists).values({ name })
        setName("")
        fetchArtists()
      } catch (error) {
        console.error("Erro ao adicionar artista:", error)
      }
    }
  }

  const handleRemoveArtist = async (id: number) => {
    Alert.alert("Remover Artista", "Tem certeza que deseja remover este artista?", [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await database.delete(artists).where(eq(artists.id, id))
            fetchArtists()
          } catch (error) {
            console.error("Erro ao remover artista:", error)
          }
        }
      }
    ])
  }

  const handleRemoveAll = async () => {
    Alert.alert("Remover Tudo", "Tem certeza que deseja remover tudo?", [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await database.delete(artists)
            fetchArtists()
          } catch (error) {
            console.error("Erro ao remover artista:", error)
          }
        }
      }
    ])
  }

  useEffect(() => {
    fetchArtists()
  }, [])

  const [src, setSrc] = useState<string>(thumbnails[0])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % thumbnails.length)
    }, 2000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    setSrc(thumbnails[index])
  }, [index])

  return (
    <View style={styles.container}>
      <Image
        source={src}
        style={{ width: "100%", aspectRatio: 1 }}
      />
      {/* <Button
        title="Show Toast"
        onPress={() => {
          const id = toast.warning("Lorem ipsum dolor sit amet", {
            description:
              "Vivamus maximus. Morbi non eros vitae diam lacinia mattis. Aliquam pharetra enim vitae leo condimentum molestie",
            close: <IconButton name="X" onPress={() => toast.dismiss(id)} />
          })
        }}
      />
      <Image
        style={{ height: 200, aspectRatio: 4 / 3, backgroundColor: colors.muted }}
        source={require("@assets/thumbs/2.jpg")}
      />
      <TextInput placeholder="Nome do Artista" value={name} onChangeText={setName} />
      <Button title="Adicionar Artista" onPress={handleAddArtist} />
      <Button title="Remover tudo" onPress={handleRemoveAll} />
      <Text>{artistList.length}</Text>
      <FlashList
        estimatedItemSize={60}
        data={artistList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.artistItem}>
            <Text>{JSON.stringify(item)}</Text>
            <Button title="Remover" onPress={() => handleRemoveArtist(item.id)} />
          </View>
        )}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 44,
    gap: 16
  },
  artistItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  artistName: {
    fontSize: 16,
    flex: 1
  }
})

export default ArtistManager
