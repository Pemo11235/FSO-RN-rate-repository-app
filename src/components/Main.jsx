import Constants from 'expo-constants'
import { Text, StyleSheet, View } from 'react-native'
import { Navigate, Route, Routes } from 'react-router-native'
import theme from '../theme'
import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import SignOut from './SignOut'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path={'/signin'} element={<SignIn />} exact />
        <Route path={'/repositories'} element={<RepositoryList />} exact />
        <Route path={'/signout'} element={<SignOut />} exact />
        <Route path={'*'} element={<Navigate to={'/signin'} replace />} />
      </Routes>
    </View>
  )
}

export default Main
