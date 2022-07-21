import { Formik } from 'formik'
import { StyleSheet, View } from 'react-native'
import * as yup from 'yup'
import theme from '../theme'
import Button from './Button'
import FormikTextInput from './FormikTextInput'
import useSignIn from '../hooks/useSignIn'
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.large,
  },
})


export const SignInContainer = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput
            name='password'
            placeholder='Password'
            secureTextEntry
          />
          <Button onPress={handleSubmit} label='Sign In' />
        </View>
      )}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const authStorage = useAuthStorage()
  const navigate = useNavigate()

  const onSubmit = async ({ username, password }) => {
    try {
      await signIn({
        username,
        password,
      })
      navigate('/repositories')
    } catch (error) {
      console.log(error)
    }
    console.log('saved token: ', await authStorage.getAccessToken())
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
