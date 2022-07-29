import { Pressable, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.medium,
    margin: theme.spacing.medium,
    borderRadius: theme.radius.small,
  },
  label: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.h1,
  },
})

const Button = ({ label, style, labelStyle, ...props }) => {
  const buttonStyle = [styles.wrapper, style]
  const buttonLabelStyle = [styles.label, labelStyle]

  return (
    <Pressable style={buttonStyle} {...props}>
      <Text style={buttonLabelStyle}>{label}</Text>
    </Pressable>
  )
}

export default Button
