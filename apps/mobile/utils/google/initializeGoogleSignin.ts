import Constants from "expo-constants"

import { GoogleSignin } from "@react-native-google-signin/google-signin"

export const initializeGoogleSignin = async (): Promise<void> => {
  await GoogleSignin.configure({
    webClientId: Constants.expoConfig.extra.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/drive.file"
    ]
  })
}
