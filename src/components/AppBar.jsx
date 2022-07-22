import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../theme'
import { useQuery } from '@apollo/client'
import { AUTHETICATED } from '../graphql/queries'

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
        {isLoggedIn && <AppBarTab label={'Sign Out'} />}
      </ScrollView>
    </View>
  )
}

export default AppBar
