import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO, IMPORTANT_TODO, SEARCH_TODO } from './actionTypes'
import { LOGIN_USER, LOGOUT_USER, ADD_USER } from './actionTypes'


export const loginUser = (userName, password) => ({
    type: LOGIN_USER,
    userName,
    password
})

export const logoutUser = (userName) => ({
    type: LOGOUT_USER,
    userName
})

export const addUser = (userName, password) => ({
    type: ADD_USER,
    userName,
    password
})

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export const addTodo = (task, user) => ({
    type: ADD_TODO,
    id: guidGenerator(),
    task,
    user
})

export const toggleTodo = (id, completeTime) => ({
    type: TOGGLE_TODO,
    id,
    completeTime
})

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id
})

export const editTodo = (id, taskParams) => ({
    type: EDIT_TODO,
    id,
    task: taskParams
})

export const importantTodo = (id) => ({
    type: IMPORTANT_TODO,
    id
})

export const searchTodo = (filter) => ({
    type: SEARCH_TODO,
    filter
})

