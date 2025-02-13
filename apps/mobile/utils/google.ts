import Constants from "@constants/expo"

import { useSettings } from "@stores/useSettings"

import { GoogleSignin, isSuccessResponse } from "@react-native-google-signin/google-signin"

export const initializeGoogleSignin = async (): Promise<void> => {
  await GoogleSignin.configure({
    webClientId: Constants.expoConfig.extra.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/drive.file"
    ]
  })
}

export const signIn = async (): Promise<void> => {
  const { setUser } = useSettings.getState()

  await GoogleSignin.hasPlayServices()

  const response = await GoogleSignin.signIn()
  if (isSuccessResponse(response)) {
    setUser(response.data)
  }
}

export const signInSilently = async (): Promise<void> => {
  const { user, setUser } = useSettings.getState()

  if (!user) return

  await GoogleSignin.signInSilently().then((response) => setUser(response.data))
}

export const signOut = async (): Promise<void> => {
  const { setUser } = useSettings.getState()

  await GoogleSignin.signOut().then(() => setUser(undefined))
}
