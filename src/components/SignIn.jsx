import { Formik } from 'formik'
import { StyleSheet, View } from 'react-native'
import theme from '../theme'
import Button from './Button'
import FormikTextInput from './FormikTextInput'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
})

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik initialValues={{ Username: '', Password: '' }} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name='Username' placeholder='Username' />
          <FormikTextInput
            name='Password'
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
