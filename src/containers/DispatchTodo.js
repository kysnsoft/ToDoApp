import { toggleTodo, displayTodo, deleteTodo, editTodo, increasePrior, searchTodo } from '../actions/index'
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'

const getSearchTodos = (todos, search) => {
    if (search !== '')
        return todos.filter(
            todo => {
                let tempText = todo.text
                search = search.toLowerCase()
                return (tempText.toLowerCase()).includes(search)
            }
        )

    return todos
}


const mapStateToProps = state => ({    
    todos: getSearchTodos(state.todos, state.searchReducer)
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id)),
    displayTodo: id => dispatch(displayTodo(id)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    editTodo: (id, text) => dispatch(editTodo(id, text)),
    increasePrior: id => dispatch(increasePrior(id)),
    searchTodo: filter => dispatch(searchTodo(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)