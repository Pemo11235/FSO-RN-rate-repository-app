import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken() {
    // Get the access token for the storage
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:access_token`
    )

    return accessToken
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    accessToken && (await this.removeAccessToken())
    accessToken &&
      (await AsyncStorage.setItem(
        `${this.namespace}:access_token`,
        accessToken
      ))
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    const actualToken = await this.getAccessToken()
    actualToken &&
      (await AsyncStorage.removeItem(`${this.namespace}:access_token`))
  }
}

export default AuthStorage
