import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../theme'
import { useQuery } from '@apollo/client'
import { AUTHETICATED } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage'
import { useMemo } from 'react'

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
  const authStorage = useAuthStorage()

  const isLoggedIn = data?.me?.username

  console.log('isLoggedIn: ', isLoggedIn)

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {isLoggedIn && <AppBarTab label={'Repositories'} />}
        {!isLoggedIn && <AppBarTab label={'Sign In'} />}
        {isLoggedIn && <AppBarTab label={'Sign Out'} />}
      </ScrollView>
    </View>
  )
}

export default AppBar
