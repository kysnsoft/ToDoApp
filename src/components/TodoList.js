import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native'
import { SearchBar, CheckBox } from 'react-native-elements';
import AddTodo from '../containers/AddTodo'
import Icon from 'react-native-vector-icons/Entypo'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/index'
import moment from 'moment'


const TodoList = ({ ownProps, todos, toggleTodo, deleteTodo, importantTodo, searchTodo }) => {

    const currentDate = new Date()


    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const currentUser = users.find(user => user.isLogged === true).userName
    const userTodos = todos.filter(todo => todo.user === currentUser)

    const { navHandler } = ownProps

    const useDebounce = (value, delay) => {
        const [debounceValue, setDebounceValue] = useState(value);

        useEffect(() => {
            const timer = setTimeout(() => {
                setDebounceValue(value);
            }, delay);

            return () => {
                clearTimeout(timer);
            };
        }, [value, delay]);

        return debounceValue;
    };

    ////Search
    const [search, setSearch] = useState('')
    const debounceSearch = useDebounce(search, 300)
    useEffect(() => {
        searchTodo(debounceSearch)
    }, [debounceSearch])
    ////Search

    //Sort according completed, important, due date
    const sortTodo = _.orderBy(userTodos, ['completed', 'important',
        function (o) { return new moment(o.endDate) }, ['asc']], ['asc', 'desc'])

    const totalTask = sortTodo.filter(todo => todo.completed === '').length

    const logout = (currentUser) => {
        Alert.alert(
            'Confirm Logout?',
            totalTask > 0 ? `${totalTask} TASK INCOMPLETED` : `Well done, you have done all the task!`,
            [
                { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                { text: 'OK', onPress: () => dispatch(logoutUser(currentUser)) },
            ],
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', margin: 5 }}>
                <Text style={styles.smallText}>Welcome back, </Text>
                <Text style={[styles.smallText, { fontWeight: 'bold' }]}>{currentUser}</Text>
                <TouchableOpacity onPress={() => logout(currentUser)}>
                    <Icon size={30} color="#4b191b" name="log-out"
                        style={{ paddingHorizontal: 15 }} />
                </TouchableOpacity>
            </View>
            <SearchBar
                placeholder="Search your task..."
                platform='ios'
                onChangeText={setSearch}
                value={search}
                inputContainerStyle={{ backgroundColor: '#eaeaea' }}
                containerStyle={{ margin: 5, height: 50 }}
            />

            <ScrollView style={styles.scrollView}>
                {sortTodo.map(
                    todo => {
                        const handleDelete = () => {
                            Alert.alert(
                                'Confirm Delete?',
                                (todo.title),
                                [
                                    { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                                    { text: 'OK', onPress: () => deleteTodo(todo.id) },
                                ],
                            )
                        }

                        const displayDetail = (task) => {
                            const msg =
                                `${task.desc} \n\nDue: ${moment(task.endDate).format('ddd, MMM Do YYYY')}`
                            Alert.alert(
                                `${task.title}`,
                                msg,
                                [
                                    { text: `${task.important ? 'unstar' : 'star'}`, onPress: () => importantTodo(task.id), style: 'cancel' },
                                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                                    { text: `Mark ${task.completed !== '' ? 'undone' : 'done'}`, onPress: () => toggleTodo(todo.id) },

                                ],
                            )
                        }

                        return (
                            <View key={todo.id} style={{ flex: 1 }} >
                                < TouchableOpacity
                                    style={[styles.listItem,
                                    todo.completed !== '' ?
                                        styles.listCompletedItem : todo.important ?
                                            styles.listImportantItem : '']}
                                    onPress={() => displayDetail(todo)}
                                >
                                    <CheckBox checked={todo.completed !== '' ? true : false} size={15} onPress={() => toggleTodo(todo.id, currentDate)}
                                        checkedColor='green' uncheckedColor='black' />
                                    <View style={{ flex: 0.85, alignSelf: 'stretch', justifyContent: 'space-around' }}>
                                        <Text
                                            style={[{ fontSize: 16, color: 'black', fontWeight: '700' },
                                            todo.completed !== '' ? styles.completed : ""]}>{todo.title}
                                        </Text>
                                        {todo.completed === '' ?
                                            <Text
                                                style={[{ fontSize: 13, color: 'red', fontWeight: 'bold' },
                                                todo.completed !== '' ? styles.completed : ""]}>
                                                Due: {moment(todo.endDate).startOf('day').fromNow()} on {moment(todo.endDate).format('dddd')}
                                            </Text> :
                                            <Text
                                                style={{ fontSize: 13, color: 'green', fontWeight: 'bold' }}>
                                                Done in: {moment(todo.completed).format('ddd, MMM Do YYYY')}
                                            </Text>
                                        }
                                    </View>
                                    {todo.important && <Icon size={25} name="star"
                                        color={todo.completed !== '' ? 'green' : '#4b191b'}
                                        style={{ flex: 0.1 }} />}

                                    <View style={{ flex: 0.15 }}>
                                        <TouchableOpacity onPress={() => { handleDelete(todo.id); }}>
                                            <Icon size={25} color={todo.completed !== '' ? "green" : "#4b191b"} name="trash"
                                                style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navHandler(todo.id, todo)}>
                                            <Icon size={25} color={todo.completed !== '' ? "green" : "#4b191b"} name="edit"
                                                style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>

            {/* ----------------Add ToDo---------------- */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {totalTask > 0 &&
                    <Text style={{ flex: 1, marginLeft: 10, fontSize: 25, fontWeight: 'bold', color: '#3b191b' }}>
                        {totalTask} / {sortTodo.length} Tasks</Text>}
                <AddTodo currentUser={currentUser} />
            </View>
            {/* ----------------Add ToDo---------------- */}
        </View>
    )
}

export default TodoList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        padding: 10,
        margin: 10,
        flexGrow: 1,
    },
    listItem: {
        backgroundColor: '#eaeaea',
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 5,
        padding: 5,
        alignItems: 'center'
    },
    listCompletedItem: {
        borderColor: 'green',
        borderLeftWidth: 10,
        borderRightWidth: 5
    },
    listImportantItem: {
        borderColor: '#4b191b',
        borderLeftWidth: 10,
        borderRightWidth: 5
    },
    icon: {
        padding: 5
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'green',
        fontWeight: 'bold'
    },
    smallText: {
        fontSize: 22,
        color: '#3b191b',
    }
})
