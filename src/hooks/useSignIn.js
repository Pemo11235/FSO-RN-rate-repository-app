import { useApolloClient, useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [authenticate, result] = useMutation(SIGN_IN)

  const signIn = async ({ username, password }) => {
    const credentials = { username, password }
    const { data } = await authenticate({ variables: { credentials } })
    console.log('data: ', data.authenticate.accessToken)
    await authStorage.setAccessToken(data?.authenticate?.accessToken)
    apolloClient.resetStore()

    return data
  }

  return [signIn, result]
}

export default useSignIn
