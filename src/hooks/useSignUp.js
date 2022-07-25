import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER)

  const signUp = async ({ username, password }) => {
    const user = { username, password }
    const { data } = await createUser({ variables: { user } })

    return data?.createUser?.username
  }

  return [signUp, result]
}

export default useSignUp
