import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'
import { Provider } from 'react-redux'
import { persistor, store } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import Navigator from './src/routes/Navigator'
import Login from './src/containers/Login'
import { useSelector } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'


export default function App() {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  function Main() {

    const users = useSelector(state => state.users)
    const loggedUser = users.some(user => user.isLogged === true)
    const todos = useSelector(state => state.todos)

    console.log(todos)
   
    if (!loggedUser) {
      return (
        <View style={styles.container}>
          <Login />
        </View>
      )
    }
    return <Navigator />
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(42, 15, 16,1)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
