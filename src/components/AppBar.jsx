import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
  // ...
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label={'Repositories'} />
        <AppBarTab label={'Sign In'} />
      </ScrollView>
    </View>
  )
}

export default AppBar
