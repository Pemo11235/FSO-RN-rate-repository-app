import { ApolloProvider } from '@apollo/client'
import { NativeRouter } from 'react-router-native'
import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient'
import Constants from 'expo-constants'
import { AuthStorageProvider } from './src/contexts/AuthStorageContext'
import AuthStorage from './src/utils/authStorage'
import { SelectOrderProvider } from './src/hooks/useSelectOrder'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
  console.log(Constants.manifest.extra)
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageProvider value={authStorage}>
          <SelectOrderProvider>
            <Main />
          </SelectOrderProvider>
        </AuthStorageProvider>
      </ApolloProvider>
    </NativeRouter>
  )
}

export default App
