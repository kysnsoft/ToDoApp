import { toggleTodo, deleteTodo, editTodo, importantTodo, searchTodo } from '../actions/index'
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'

const getSearchTodos = (todos, search) => {
    if (search !== '')
        return todos.filter(
            todo => {
                let tempText = todo.title
                search = search.toLowerCase()
                return (tempText.toLowerCase()).includes(search)
            }
        )

    return todos
}


const mapStateToProps = state => ({
    todos: getSearchTodos(state.todos, state.searchReducer)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addTodo: task => dispatch(addTodo(task)),
    toggleTodo: (id, completed) => dispatch(toggleTodo(id, completed)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    editTodo: (id, text) => dispatch(editTodo(id, text)),
    importantTodo: id => dispatch(importantTodo(id)),
    searchTodo: filter => dispatch(searchTodo(filter)),
    ownProps
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)