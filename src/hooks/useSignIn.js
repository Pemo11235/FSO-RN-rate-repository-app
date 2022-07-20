import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'

const useSignIn = () => {
  const [authenticate, result] = useMutation(SIGN_IN)
  const signIn = async ({ username, password }) => {
    const credentials = { username, password }
    return await authenticate({ variables: { credentials } })
  }
  return [signIn, result]
}

export default useSignIn
