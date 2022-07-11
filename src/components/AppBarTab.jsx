import { Pressable, StyleSheet, Text } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.h1,
    padding: theme.spacing.small,
  },
})

const AppBarTab = ({ label }) => {
  return (
    <Pressable>
      <Text style={styles.tab}>{label}</Text>
    </Pressable>
  )
}

export default AppBarTab
