import { combineReducers } from 'redux'
import todos from './todos'
import searchReducer from './search'
import users from './users'

export default combineReducers({
    todos,
    searchReducer,
    users
})