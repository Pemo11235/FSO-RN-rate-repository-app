import { Formik } from 'formik'
import { StyleSheet, View } from 'react-native'
import * as yup from 'yup'
import theme from '../theme'
import Button from './Button'
import FormikTextInput from './FormikTextInput'
import { useNavigate } from 'react-router-native'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.large,
  },
})

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const validationSchema = yup.object().shape({
    username: yup.string().min(1).max(30).required('Username is required'),
    password: yup.string().min(5).max(50).required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  })

  const onSubmit = async (userCredentials) => {
    delete userCredentials.passwordConfirm
    try {
      const username = await signUp(userCredentials)

      if (username === userCredentials.username.toLowerCase()) {
        await signIn(userCredentials)
        navigate('/repositories')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirm: '' }}
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
          <FormikTextInput
            name='passwordConfirm'
            placeholder='Password confirmation'
            secureTextEntry
          />
          <Button onPress={handleSubmit} label='Sign Up' />
        </View>
      )}
    </Formik>
  )
}

export default SignUp
