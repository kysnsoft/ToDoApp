import { SEARCH_TODO } from '../actions/actionTypes'


const searchReducer = (state = [], action) => {
    switch (action.type) {
        case SEARCH_TODO:
            return action.filter
        default:
            return state
    }
}

export default searchReducer