import { ADD_TODO, TOGGLE_TODO, DIALOG_TODO, DELETE_TODO, EDIT_TODO, INCREASE_PRIOR, SEARCH_TODO } from './actionTypes'

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export const addTodo = (text) => ({
    type: ADD_TODO,
    id: guidGenerator(),
    text
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
})

export const dialogTodo = (id) => ({
    type: DIALOG_TODO,
    id
})

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id
})

export const editTodo = (id, text) => ({
    type: EDIT_TODO,
    id,
    text: text
})

export const increasePrior = (id) => ({
    type: INCREASE_PRIOR,
    id
})

export const searchTodo = (filter) => ({
    type: SEARCH_TODO,
    filter
})

