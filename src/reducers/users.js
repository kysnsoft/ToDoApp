import { LOGIN_USER, LOGOUT_USER, ADD_USER } from '../actions/actionTypes'

const initialState = [
    {
        userName: 'Anonymous',
        password: 'qwe123',
        isLogged: false
    },
    {
        userName: 'ky123',
        password: 'qwe123',
        isLogged: false
    }
]

const users = (state = initialState, { type, userName, password }) => {
    switch (type) {
        case ADD_USER:
            return [...state, {
                userName,
                password,
                isLogged: true
            }]
        case LOGIN_USER:
            return state.map(user => (user.userName === userName && user.password === password) ?
                { ...user, isLogged: !user.isLogged } : user)
        case LOGOUT_USER:
            return state.map(user => (user.userName === userName) ?
                { ...user, isLogged: !user.isLogged } : user)
        default:
            return state
    }
}

export default users