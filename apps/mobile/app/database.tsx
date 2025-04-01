import React, { useEffect, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import { theme } from "@styles/theme"

import { Image, View } from "react-native"

import { BackButton, FadingScreen } from "@components/navigation"
import {
  Button,
  Header,
  IconButton,
  LargeHeader,
  LargeHeaderSubtitle,
  LegendListWithHeaders,
  Text,
  TextInput,
  toast
} from "@components/ui"

export default function Artists() {
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
    <FadingScreen style={{ flex: 1 }}>
      <LegendListWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerLeft={<BackButton />}
            headerCenter={
              <Text variant="bold" size="large">
                {artistList.length} artist(s)
              </Text>
            }
            headerRight={<IconButton name="Trash" color="primary" onPress={handleRemoveAll} />}
            headerRightFadesIn
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: theme.styles.spacing.small
            }}
          >
            <IconButton
              name="Trash"
              color="primary"
              variant="contained"
              noMargin
              onPress={handleRemoveAll}
            />
            <Text variant="bold" size="xxxLarge">
              {artistList.length} artist(s)
            </Text>
          </LargeHeader>
        )}
        LargeHeaderSubtitleComponent={() => (
          <LargeHeaderSubtitle style={{ gap: theme.styles.spacing.medium }}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Artist Name"
              value={name}
              onChangeText={setName}
            />
            <IconButton name="Plus" onPress={handleAddArtist} />
          </LargeHeaderSubtitle>
        )}
        contentContainerStyle={{
          paddingHorizontal: theme.styles.spacing.large,
          paddingBottom: theme.styles.spacing.large
        }}
        data={artistList}
        recycleItems
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={168}
        getEstimatedItemSize={() => 168}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: theme.styles.spacing.medium,
              borderRadius: theme.styles.borderRadius.xSmall,
              backgroundColor: colors.secondary,
              borderWidth: theme.styles.border.thin,
              borderColor: colors.muted,
              marginBottom:
                index % 1 === 0 && index !== artistList.length - 1 ? theme.styles.spacing.medium : 0
            }}
          >
            {item.thumbnail && (
              <View style={{ marginRight: 16 }}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 64, height: 64, borderRadius: 8 }}
                />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text
                variant="bold"
                size="large"
                style={{ marginBottom: theme.styles.spacing.xSmall }}
              >
                {item.name}
              </Text>
              <Text size="small" affects={["capitalize", "strikethrough"]}>
                {item.releaseYear ? `Released: ${item.releaseYear}` : "Release year unknown"}
              </Text>
              <Text size="small">
                {item.duration ? `Duration: ${item.duration} mins` : "Duration unknown"}
              </Text>
            </View>
            <IconButton name="Trash" color="primary" onPress={() => handleRemoveArtist(item.id)} />
          </View>
        )}
      />
    </FadingScreen>
  )
}
