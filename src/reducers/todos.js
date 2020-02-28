import { ADD_TODO, TOGGLE_TODO, DISPLAY_TODO, DIALOG_TODO, DELETE_TODO, EDIT_TODO, INCREASE_PRIOR } from '../actions/actionTypes'

const todos = (state = [], action) => {

    switch (action.type) {
        case ADD_TODO:
            return [...state, {
                id: action.id,
                text: action.text,
                completed: false,
                display: false,
                dialog: false,
                level: false
            }]
        case TOGGLE_TODO:
            return state.map(todo => (todo.id === action.id) ?
                { ...todo, completed: !todo.completed } : todo)
        case DISPLAY_TODO:
            return state.map(todo => (todo.id === action.id) ?
                { ...todo, display: !todo.display } : todo)
        case DIALOG_TODO:
            return state.map(todo => (todo.id === action.id) ?
                { ...todo, dialog: !todo.dialog } : todo)
        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.id);
        case EDIT_TODO:
            return state.map(todo => (todo.id === action.id) ?
                { ...todo, text: action.text } : todo)
        case INCREASE_PRIOR:
            return state.map(todo => (todo.id === action.id) ?
                { ...todo, level: !todo.level } : todo)
        default:
            return state
    }
}


export default todos