import { combineReducers } from 'redux'
import todos from './todos.js'
import searchReducer from './search.js'

export default combineReducers({
    todos,
    searchReducer
})