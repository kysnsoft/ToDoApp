import { toggleTodo, displayTodo, dialogTodo, deleteTodo, editTodo, increasePrior, searchTodo } from '../actions/index'
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'

const getSearchTodos = (todos, search) => {
    if (search !== '')
        return todos.filter(todo => {
            const lowerCaseQuery = (todo.text).toLowerCase()
            const lowerCaseSearch = search.toLowerCase()

            return (lowerCaseQuery).includes(lowerCaseSearch)
        })

    return todos
}


const mapStateToProps = state => ({
    todos: getSearchTodos(state.todos, state.searchReducer)
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id)),
    displayTodo: id => dispatch(displayTodo(id)),
    dialogTodo: id => dispatch(dialogTodo(id)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    editTodo: (id, text) => dispatch(editTodo(id, text)),
    increasePrior: id => dispatch(increasePrior(id)),
    searchTodo: filter => dispatch(searchTodo(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)