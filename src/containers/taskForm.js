import React, { useState } from 'react'
import {
    StyleSheet, TextInput, Text, Button,
    View, KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { Formik } from 'formik'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Icon from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native'
import moment from 'moment'
import * as yup from 'yup'

const taskSchema = yup.object({
    title: yup.string()
        .required('Title is a required field'),
    desc: yup.string()
        .required('Description is a required field'),
    endDate: yup.date()
        .min(yup.ref("startDate"), "End date should be later than start date")
})

const taskForm = ({ handleAdd, handleCancel }) => {

    const todayDate = new Date()
    const tmrDate = new Date()
    tmrDate.setDate(tmrDate.getDate() + 1);

    const [startDatePicker, setStartDatePicker] = useState(false)
    const [endDatePicker, setEndDatePicker] = useState(false)

    return (
        <View style={{ margin: 25, flex: 1, }}>
            <Formik
                initialValues={{
                    title: '',
                    desc: '',
                    startDate: todayDate,
                    endDate: tmrDate
                }}
                validationSchema={taskSchema}
                onSubmit={(values) => handleAdd(values)}
            >
                {(props) => {
                    const { values, handleChange, handleSubmit, setFieldValue } = props
                    return (
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <KeyboardAvoidingView style={styles.keyboardAvoid}
                                behavior="padding">
                                <Icon size={25} name="cross" onPress={handleCancel}
                                    style={styles.icon} />
                                <Text style={styles.text}>Title: </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="What to do?"
                                    onChangeText={handleChange('title')}
                                    values={values.title}
                                    onBlur={props.handleBlur('title')} />
                                <Text style={styles.errorText}>{props.touched.title && props.errors.title}</Text>
                                <Text style={styles.text}>Description: </Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={5}
                                    style={[styles.input, { textAlignVertical: 'top', borderWidth: 0.5 }]}
                                    placeholder="Enter something..."
                                    onChangeText={handleChange('desc')}
                                    values={values.desc}
                                    onBlur={props.handleBlur('desc')} />
                                <Text style={styles.errorText}>{props.touched.desc && props.errors.desc}</Text>
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
                                            }}
                                        />

                                        <Text style={styles.text}>
                                            Start Date: <Icon size={25} name="calendar" color='maroon' />
                                        </Text>
                                        <TextInput
                                            editable={false}
                                            style={styles.input}
                                            placeholder={moment(values.startDate).format('ddd, MMM Do YYYY')}
                                            placeholderTextColor='black'
                                            onChangeText={handleChange('startDate')}
                                        />

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
                                        <Text style={styles.text} disabled>
                                            End Date: <Icon size={25} name="calendar" color='maroon' />
                                        </Text>

                                        <TextInput
                                            editable={false}
                                            style={styles.input}
                                            placeholder={moment(values.endDate).format('ddd, MMM Do YYYY')}
                                            placeholderTextColor='black'
                                            onChangeText={handleChange('endDate')}
                                            onBlur={props.handleBlur('endDate')} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.errorText}>{props.touched.endDate && props.errors.endDate}</Text>

                                <View style={{ padding: 5 }}>
                                    <Button title='submit' color='#4b191b' onPress={handleSubmit} />
                                    <Button title='cancel' color='#d3d3d3' onPress={handleCancel} />
                                </View>
                            </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>

                    )
                }}
            </Formik>
        </View >

    )
}

export default taskForm

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5,
        letterSpacing: 0.5,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10
    },
    input: {
        backgroundColor: '#f8f8f8',
        borderColor: 'black',
        borderBottomWidth: 1,
        padding: 5,
        fontSize: 15,
        margin: 5,
    },
    keyboardAvoid: {
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        padding: 10,
        margin: 10,
        alignSelf: 'center',
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
    }

})