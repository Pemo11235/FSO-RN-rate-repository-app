import { useQuery } from '@apollo/client'
import { StyleSheet, View } from 'react-native'
import { Navigate, Route, Routes } from 'react-router-native'
import { AUTHETICATED } from '../graphql/queries'
import theme from '../theme'
import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import SingleRepository from './SignleRepository'
import SignIn from './SignIn'
import SignOut from './SignOut'
import Review from './Review'
import SignUp from './SignUp'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
})

const Main = () => {
  const { data, loading } = useQuery(AUTHETICATED, {
    fetchPolicy: 'cache-and-network',
  })

  const isLoggedIn = data?.me?.username

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        {!isLoggedIn && !loading && (
          <Route path={'*'} element={<Navigate to={'/signin'} replace />} />
        )}
        {isLoggedIn && !loading && (
          <Route
            path={'*'}
            element={<Navigate to={'/repositories'} replace />}
          />
        )}
        <Route path={'/signin'} element={<SignIn />} exact />
        <Route path={'/signup'} element={<SignUp />} exact />
        <Route path={'/signout'} element={<SignOut />} exact />
        <Route path={'/repositories'} element={<RepositoryList />} exact />
        <Route path={'/:repositoryId'} element={<SingleRepository />} exact />
        <Route path={'/createreview'} element={<Review />} exact />
      </Routes>
    </View>
  )
}

export default Main
