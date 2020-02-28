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


const TodoList = ({ todos, toggleTodo, displayTodo, dialogTodo, deleteTodo, editTodo, increasePrior, searchTodo }) => {

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

    const [editText, setEdit] = useState('')
    const onChange = editText => setEdit(editText)

    const [search, setSearch] = useState('')
    const debounceSearch = useDebounce(search, 300)

    const [editDialog, setEditDialog] = useState(false)
    const [tempId, setTempId] = useState('')
    const [tempText, setTempText] = useState('')

    const sortTodo = _.orderBy(todos, ['completed', 'level'], ['asc', 'desc'])

    useEffect(() => {
        searchTodo(debounceSearch)
    }, [debounceSearch])


    const handleEdit = (id, text) => {
        setTempId(id)
        setTempText(text)
    }

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
                inputContainerStyle={{ backgroundColor: '#eaeaea' }}
                containerStyle={{ margin: 5, height: 50 }}
            />
            <AddTodo />

            <ScrollView style={{ margin: 15, flexGrow: 1, marginBottom: 'auto' }}>
                {sortTodo.map(
                    todo => {
                        const handleDelete = (e) => {
                            Alert.alert(
                                'Confirm Delete?',
                                (todo.text),
                                [
                                    { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                                    { text: 'OK', onPress: () => deleteTodo(todo.id) },
                                ],
                            )
                        }


                        return (
                            <View key={todo.id} >
                                < TouchableOpacity onLongPress={() => increasePrior(todo.id)} onPress={() => displayTodo(todo.id)}
                                    style={[styles.listItem, {
                                        padding: 30,
                                        marginBottom: 5,
                                        borderLeftWidth: todo.completed ? 10 : todo.level ? 10 : 0,
                                        borderRightWidth: todo.completed ? 0 : todo.level ? 10 : 0,
                                        borderColor: todo.completed ? 'green' : 'red',
                                        borderBottomColor: todo.completed ? 'green' : '#ff6700',
                                    }]}
                                >

                                    <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }}>
                                        {todo.completed && <Icon size={25} color="green" name="check" style={{ flex: 0.1 }} />}
                                        <Text
                                            onPress={() => toggleTodo(todo.id)}
                                            numberOfLines={todo.display ? 5 : 1}
                                            style={{
                                                flex: 0.8, fontSize: 18,
                                                textDecorationLine: todo.completed ? 'line-through' : 'none',
                                                color: todo.completed ? 'green' : 'black',
                                                fontWeight: todo.completed ? 'normal' : todo.level ? 'bold' : 'normal'
                                            }}  >{todo.text}</Text>
                                        {todo.level && <Icon size={25} name="star"
                                            color={todo.completed ? 'green' : 'red'}
                                            style={{ flex: 0.1 }} />}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnDelete} onPress={() => { handleDelete(todo.id); }}>
                                        <View style={styles.iconView}>
                                            <Icon size={25} color={todo.completed ? "green" : "#de9595"} name="cross"
                                                style={styles.icon} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnEdit} onPress={() => { setEditDialog(true); handleEdit(todo.id, todo.text); }}>
                                        <View style={styles.iconView}>
                                            <Icon size={25} color={todo.completed ? "green" : "#de9595"} name="edit"
                                                style={styles.icon} />
                                        </View>
                                    </TouchableOpacity>
                                </TouchableOpacity>


                            </View>
                        )
                    })
                }
            </ScrollView>
            <Dialog.Container visible={editDialog}>
                <Dialog.Title style={{ fontWeight: 'bold' }}>Edit Todo: </Dialog.Title>
                <Dialog.Input
                    placeholder={tempText}
                    onChangeText={onChange}
                    style={{ borderBottomWidth: 1, margin: 10 }}
                />
                <Dialog.Button label="Cancel" onPress={() => setEditDialog(false)} />
                <Dialog.Button label="Edit" onPress={() => { setEditDialog(false); editTodo(tempId, editText) }} />
            </Dialog.Container>
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
