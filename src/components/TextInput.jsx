import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  textInput: {
    borderColor: theme.colors.textSecondary,
    borderRadius: theme.radius.small,
    borderWidth: 1,
    padding: theme.spacing.medium,
    margin: theme.spacing.medium,
    backgroundColor: theme.colors.white,
  },
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.textInput]

  return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput
