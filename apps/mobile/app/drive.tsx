import React, { useEffect, useState } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useColorTheme } from "@hooks/useColorTheme"

import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import { ScrollView, View } from "react-native"

import { Button, IconButton, Text, TextInput, toast } from "@components/ui"
import { FlashList } from "@shopify/flash-list"

export default function Artists() {
  const insets = useSafeAreaInsets()

  const { colors } = useColorTheme()

  const [name, setName] = useState("")
  const [artistList, setArtistList] = useState<any[]>([])

  const fetchArtists = async () => {
    try {
      const result = await database.query.artists.findMany()
      setArtistList(result)
    } catch (error) {
      console.error("Error loading artists:", error)
    }
  }

  const handleAddArtist = async () => {
    if (name.trim()) {
      try {
        await database.insert(schema.artists).values({ name })
        setName("")
        fetchArtists()
      } catch (error) {
        console.error("Error adding artist:", error)
      }
    }
  }

  const handleRemoveArtist = async (id: number) => {
    const removeArtistToastId = toast("Remove Artist", {
      description: "Are you sure you want to remove this artist?",
      cancel: (
        <Button
          title="Cancel"
          color="secondary"
          onPress={() => toast.dismiss(removeArtistToastId)}
        />
      ),
      action: (
        <Button
          title="Remove Artist"
          onPress={async () => {
            toast.dismiss(removeArtistToastId)
            await database.delete(schema.artists).where(eq(schema.artists.id, id))
            fetchArtists()
          }}
        />
      ),
      close: <IconButton name="X" onPress={() => toast.dismiss(removeArtistToastId)} />,
      duration: Infinity
    })
  }

  const handleRemoveAll = async () => {
    const removeAllArtistsToastId = toast("Remove All", {
      description: "Are you sure you want to remove all artists?",
      cancel: (
        <Button
          title="Cancel"
          color="secondary"
          onPress={() => toast.dismiss(removeAllArtistsToastId)}
        />
      ),
      action: (
        <Button
          title="Remove All"
          onPress={async () => {
            toast.dismiss(removeAllArtistsToastId)
            await database.delete(schema.artists)
            fetchArtists()
          }}
        />
      ),
      close: <IconButton name="X" onPress={() => toast.dismiss(removeAllArtistsToastId)} />,
      duration: Infinity
    })
  }

  useEffect(() => {
    fetchArtists()
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{ gap: 16, padding: 16, paddingTop: insets.top + 16 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.muted
        }}
      >
        <Text variant="bold" size="xxLarge">
          {artistList.length} artist(s)
        </Text>
        <Button title="Remove All" onPress={handleRemoveAll} />
      </View>
      <TextInput placeholder="Artist Name" value={name} onChangeText={setName} />
      <View style={{ borderBottomWidth: 1, borderBottomColor: colors.muted, paddingBottom: 16 }}>
        <Button
          title="Add Artist"
          containerStyle={{ marginLeft: "auto" }}
          onPress={handleAddArtist}
        />
      </View>
      <FlashList
        data={artistList}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={60}
        renderItem={({ item }) => (
          <View
            style={{
              gap: 8,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: colors.muted
            }}
          >
            <Text>{JSON.stringify(item, null, 2)}</Text>
            <Button
              title="Remove"
              containerStyle={{ marginLeft: "auto" }}
              onPress={() => handleRemoveArtist(item.id)}
            />
          </View>
        )}
      />
    </ScrollView>
  )
}
