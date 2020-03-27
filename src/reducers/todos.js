import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO, IMPORTANT_TODO } from '../actions/actionTypes'

const date1 = new Date()
const date2 = new Date()
const date3 = new Date()
date1.setDate(date1.getDate() + 1);
date2.setDate(date1.getDate() + 2);
date3.setDate(date2.getDate() + 3);

const initialState = [
    {
        id: 'Important1',
        title: 'Every task should include the following fields',
        desc: '-Title\nDescription\nStartDate/ EndDate',
        startDate: date1,
        endDate: date2,
        completed: '',
        important: true,
        user: 'Anonymous',
    },
    {
        id: 'Completed1',
        title: 'Full screen',
        desc: '-Remove status bar\n-Remove navigation bar',
        startDate: date1,
        endDate: date2,
        completed: date1,
        important: false,
        user: 'Anonymous',
    },
    {
        id: 'Task1',
        title: 'Testing Purpose',
        desc: 'Did I miss out any requirements',
        startDate: date2,
        endDate: date3,
        completed: '',
        important: false,
        user: 'Anonymous',
    }

]
const todos = (state = initialState, { type, id, task, user, completeTime }) => {
    switch (type) {
        case ADD_TODO:
            return [...state, {
                id,
                title: task.title,
                desc: task.desc,
                startDate: task.startDate,
                endDate: task.endDate,
                completed: '',
                important: false,
                user
            }]
        case TOGGLE_TODO: {
            return state.map(todo => (todo.id === id) ?
                { ...todo, completed: todo.completed === '' ? completeTime : '' } : todo)
        }
        case DELETE_TODO:
            return state.filter(todo => todo.id !== id);
        case EDIT_TODO:
            return state.map(todo =>
                (todo.id === id) ?
                    {
                        ...todo,
                        title: task.title,
                        desc: task.desc,
                        startDate: task.startDate,
                        endDate: task.endDate,
                        important: task.important,
                        completed: task.completed
                    } : todo)
        case IMPORTANT_TODO:
            return state.map(todo => (todo.id === id) ?
                { ...todo, important: !todo.important } : todo)
        default:
            return state
    }
}

export default todos