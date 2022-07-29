import { useQuery } from '@apollo/client'
import Constants from 'expo-constants'
import { ScrollView, StyleSheet, View } from 'react-native'
import { AUTHETICATED } from '../graphql/queries'
import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
    paddingBottom: theme.spacing.medium,
  },
  // ...
})

const AppBar = () => {
  const { data } = useQuery(AUTHETICATED, { fetchPolicy: 'cache-and-network' })

  const isLoggedIn = data?.me?.username

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {isLoggedIn && <AppBarTab label={'Repositories'} />}
        {isLoggedIn && <AppBarTab label={'Create Review'} />}
        {!isLoggedIn && <AppBarTab label={'Sign In'} />}
        {!isLoggedIn && <AppBarTab label={'Sign Up'} />}
        {isLoggedIn && <AppBarTab label={'My Reviews'} />}
        {isLoggedIn && <AppBarTab label={'Sign Out'} />}
      </ScrollView>
    </View>
  )
}

export default AppBar
