import { Formik } from 'formik'
import { StyleSheet, View } from 'react-native'
import * as yup from 'yup'
import theme from '../theme'
import Button from './Button'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import useSignIn from '../hooks/useSignIn'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.large,
  },
})

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await signIn({
        username,
        password,
      })
      console.log('submit', data)
    } catch (error) {
      console.log(error)
    }
  }

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

export default SignIn
