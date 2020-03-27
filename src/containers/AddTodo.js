import React, { useState } from 'react'
import {
    Text,
    View,
    Modal,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useDispatch } from 'react-redux'
import { addTodo } from '../actions'
import TaskForm from './taskForm'

export default function AddTodo(props) {

    const { currentUser } = props

    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()

    const handleAdd = (task) => {
        dispatch(addTodo(task, currentUser))
        setModalOpen(false)
    }

    const handleCancel = () => {
        setModalOpen(false)
    }

    return (
        <View style={{ flex: 1, alignItems: 'space-around' }}>
            <Modal visible={modalOpen} animationType="fade"
                onRequestClose={() => setModalOpen(false)}>
                <TaskForm handleAdd={handleAdd} handleCancel={handleCancel} />
            </Modal>
            <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee',
                        borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#4b191b',
                        padding: 5, margin: 5, justifyContent: 'center'
                    }}>
                        <Icon size={25} color="#4b191b" name="add-to-list"
                            style={{ marginRight: 5 }} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#49191b' }}>Add new Task</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

