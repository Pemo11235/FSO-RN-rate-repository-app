import { Pressable, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.h3,
    padding: theme.spacing.small,
    marginHorizontal: theme.spacing.large,
  },
})

const AppBarTab = ({ label }) => {
  return (
    <Pressable>
      <Link to={label.replace(/\s+/g, '').toLowerCase()}>
        <Text style={styles.tab}>{label}</Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
