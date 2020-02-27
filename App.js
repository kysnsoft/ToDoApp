import React, { Component } from 'react'
import TodoApp from './src/TodoApp'
import { Provider } from 'react-redux'
import { persistor, store } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <TodoApp />
        </PersistGate>
      </Provider>
    )
  }
}
