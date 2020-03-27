import React, { useState } from 'react'
import {
    StyleSheet, View, TextInput, Text, Button,
    TouchableWithoutFeedback,
    Keyboard, KeyboardAvoidingView, Platform
} from 'react-native'
import { CheckBox } from 'react-native-elements';
import { Formik } from 'formik'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Icon from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { editTodo } from './actions'
import * as yup from 'yup'

const editSchema = yup.object({
    title: yup.string()
        .required('Title is a required field'),
    desc: yup.string()
        .required('Description is a required field'),
    endDate: yup.date()
        .min(yup.ref('startDate'), `End date should be later than start date`)
})
export default function TaskDetails({ navigation }) {

    const date = new Date()
    const dispatch = useDispatch()
    const { id } = navigation.state.params
    console.log(navigation.state.params.taskParams)

    const { title, desc, startDate, endDate, important, completed } = navigation.state.params.taskParams

    const [startDatePicker, setStartDatePicker] = useState(false)
    const [endDatePicker, setEndDatePicker] = useState(false)

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    title, desc,
                    startDate, endDate,
                    important, completed
                }}
                validationSchema={editSchema}
                onSubmit={(values) => {
                    dispatch(editTodo(id, values))
                    navigation.goBack()
                }}
            >
                {(props) => {
                    const { initialValues, values, handleChange, handleSubmit, setFieldValue } = props

                    return (
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={styles.taskContainer}>
                                <Text style={styles.header}>Task Details</Text>
                                <KeyboardAvoidingView style={styles.taskDetail} behavior="padding"
                                    keyboardVerticalOffset={0} >
                                    <Text style={styles.text}>Title: </Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={handleChange('title')}
                                        values={values.title}
                                        selectTextOnFocus >{initialValues.title}</TextInput>
                                    <Text style={styles.errorText}>{props.touched.title && props.errors.title}</Text>

                                    <Text style={styles.text}>Description: </Text>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={5}
                                        style={[styles.input, { textAlignVertical: 'top', borderWidth: 0.5 }]}
                                        onChangeText={handleChange('desc')}
                                        values={values.desc}
                                        selectTextOnFocus >{initialValues.desc}</TextInput>
                                    <Text style={styles.errorText}>{props.touched.title && props.errors.title}</Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ flex: 0.5 }}
                                            onPress={() => { setStartDatePicker(true); Keyboard.dismiss() }}>

                                            <DateTimePicker
                                                isVisible={startDatePicker}
                                                mode='date'
                                                minimumDate={new Date()}
                                                onCancel={() => setStartDatePicker(false)}
                                                onConfirm={(e) => {
                                                    setStartDatePicker(false);
                                                    setFieldValue('startDate', e);
                                                }} />

                                            <Text style={styles.text}>
                                                Start Date: <Icon size={25} name="calendar" color='maroon' />
                                            </Text>

                                            <TextInput
                                                editable={false}
                                                style={styles.input}
                                                placeholder={moment(values.startDate).format('ddd, MMM Do YYYY')}
                                                placeholderTextColor='black' />

                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ flex: 0.5 }}
                                            onPress={() => { setEndDatePicker(true); Keyboard.dismiss() }}>
                                            <DateTimePicker
                                                isVisible={endDatePicker}
                                                mode='date'
                                                minimumDate={new Date()}
                                                onCancel={() => setEndDatePicker(false)}
                                                onConfirm={(e) => {
                                                    setEndDatePicker(false);
                                                    setFieldValue('endDate', e);
                                                }}
                                            />
                                            <Text style={styles.text} >
                                                End Date: <Icon size={25} name="calendar" color='maroon' />
                                            </Text>

                                            <TextInput
                                                editable={false}
                                                style={styles.input}
                                                placeholder={moment(values.endDate).format('ddd, MMM Do YYYY')}
                                                placeholderTextColor='black' />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.errorText}>{props.touched.endDate && props.errors.endDate}</Text>

                                    <CheckBox checked={values.important} size={18} onPress={() => setFieldValue('important', !values.important)}
                                        checkedColor='#4b191b' uncheckedColor='black' title="Important Task" />
                                    <CheckBox checked={values.completed !== '' ? true : false} size={18}
                                        onPress={() => setFieldValue('completed', values.completed === '' ? date : '')}
                                        checkedColor='#4b191b' uncheckedColor='black' title="Mark as Completed" />
                                    <View style={{ padding: 5 }}>
                                        <Button title='edit' color='#4b191b' onPress={handleSubmit} />
                                        <Button title='back' color='#d3d3d3' onPress={() => navigation.goBack(null)} />
                                    </View>
                                </KeyboardAvoidingView>

                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            </Formik>

        </View >
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        letterSpacing: 1,
        backgroundColor: '#3b191b',
        padding: 10
    },
    taskContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    taskDetail: {
        flex: 1,
        justifyContent: 'center',
        margin: 25,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5,
        letterSpacing: 0.5,
        color: '#3b191b'
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft: 10
    },
    input: {
        backgroundColor: '#f8f8f8',
        borderColor: 'black',
        borderBottomWidth: 1,
        padding: 5,
        fontSize: 15,
        marginHorizontal: 5,
    }
})