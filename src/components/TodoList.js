import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert
} from 'react-native'
import { SearchBar } from 'react-native-elements';
import AddTodo from '../containers/AddTodo'
import Icon from 'react-native-vector-icons/Entypo'
import Dialog from "react-native-dialog";
import _ from 'lodash'


const TodoList = ({ todos, toggleTodo, dialogTodo, deleteTodo, editTodo, increasePrior, searchTodo }) => {

    const [editText, setEdit] = useState('')
    const onChange = editText => setEdit(editText)

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
    const [search, setSearch] = useState('')

    const debounceSearch = useDebounce(search, 300)

    const sortTodo = _.orderBy(todos, ['completed', 'level'], ['asc', 'desc'])

    useEffect(() => {
        searchTodo(debounceSearch)
    }, [debounceSearch])

    return (
        <React.Fragment>
            <View style={{
                flexDirection: 'row', backgroundColor: 'rgba(21,21,35,0.618)',
                paddingTop: 10
            }}>
                <Text style={{
                    fontSize: 35, marginLeft: 30, marginBottom: 10,
                    fontWeight: 'bold'
                }}> ToDo</Text>

                {sortTodo.filter(todo => todo.completed === false).length > 0 && <Text style={{
                    fontSize: 20, marginLeft: 'auto', marginRight: 20,
                    textAlignVertical: 'center'
                }}>{sortTodo.filter(todo => todo.completed === false).length}个未完成</Text>}

            </View>
            <SearchBar
                placeholder="Search your task...."
                platform='ios'
                onChangeText={setSearch}
                value={search}
            />
            <AddTodo />

            <ScrollView style={{ margin: 20, flexGrow: 1, marginBottom: 'auto' }}>
                {sortTodo.map(
                    todo => {
                        const handleDelete = (e) => {
                            Alert.alert(
                                'Confirm Delete?',
                                (e.text),
                                [
                                    { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                                    { text: 'OK', onPress: () => deleteTodo(todo.id) },
                                ],
                            )
                        }
                        return (
                            <View key={todo.id} >
                                < TouchableOpacity onPress={() => increasePrior(todo.id)}
                                    style={[styles.listItem, {
                                        marginBottom: 5,
                                        borderLeftWidth: todo.completed ? 10 : todo.level ? 15 : 0,
                                        borderRightWidth: todo.completed ? 0 : todo.level ? 15 : 0,
                                        borderColor: todo.completed ? 'green' : 'red',
                                        borderBottomColor: todo.completed ? 'green' : '#ff6700',
                                    }]}
                                >

                                    <TouchableOpacity onPress={() => toggleTodo(todo.id)} style={{ flexDirection: 'row', flex: 1 }}>
                                        {todo.completed && <Icon size={25} color="green" name="check"
                                            style={{ marginTop: 10 }} />}
                                        <TextInput multiline={true}
                                            style={{
                                                width: 250,
                                                fontSize: 18, marginBottom: 5,
                                                textDecorationLine: todo.completed ? 'line-through' : 'none',
                                                color: todo.completed ? 'green' : 'black',
                                                fontWeight: todo.completed ? 'normal' : todo.level ? 'bold' : 'normal'
                                            }} value={todo.text} editable={false} />
                                        {todo.level && <Icon size={25} name="star"
                                            color={todo.completed ? 'green' : 'red'}
                                            style={{ marginTop: 10 }} />}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnDelete} onPress={() => { handleDelete(todo); }}>
                                        <View style={styles.iconView}>
                                            <Icon size={25} color={todo.completed ? "green" : "#de9595"} name="cross"
                                                style={styles.icon} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnEdit} onPress={() => dialogTodo(todo.id)}>
                                        <View style={styles.iconView}>
                                            <Icon size={25} color={todo.completed ? "green" : "#de9595"} name="edit"
                                                style={styles.icon} />
                                        </View>
                                    </TouchableOpacity>
                                </TouchableOpacity>

                                <Dialog.Container visible={todo.dialog ? true : false}>
                                    <Dialog.Title style={{ fontWeight: 'bold' }}>Edit Todo: </Dialog.Title>
                                    <Dialog.Input
                                        placeholder={todo.text}
                                        onChangeText={onChange}
                                        style={{ borderBottomWidth: 1, margin: 10 }}
                                    />
                                    <Dialog.Button label="Cancel" onPress={() => dialogTodo(todo.id)} />
                                    <Dialog.Button label="Edit" onPress={() => { dialogTodo(todo.id); editTodo(todo.id, editText) }} />
                                </Dialog.Container>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </React.Fragment >
    )
}

export default TodoList

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#eaeaea',
        borderBottomWidth: 1,
        padding: 20,
        flexDirection: 'row'
    },

    btnDelete: {
        position: 'absolute',
        top: 5,
        right: 0
    },

    btnEdit: {
        position: 'absolute',
        right: 0,
        top: 40
    },

    iconView: {
        height: 40,
        margin: 5
    },
    icon: {
        padding: 5
    }
})
