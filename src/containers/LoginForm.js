import React, { useState } from 'react'
import {
    View,
    Text, KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, addUser } from '../actions/index'
import _ from 'lodash'

const LoginForm = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    const handleLogin = (userName, password) => {
        const checkExist = users.some(user => user.userName === userName)
        if (!checkExist) {
            if (userName !== '' && password !== '')
                dispatch(addUser(userName, password))
            else
                setErrorMsg('Username and Password cannot be blank!')
        }
        else {
            dispatch(loginUser(userName, password))
            const valid = users.some(user => user.isLogged === true)
            !userName ? setErrorMsg('') : !valid ? setErrorMsg('User existed, wrong password') : ''
        }
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TextInput onChangeText={(e) => setUserName(e)}
                style={styles.input} placeholder="Username" placeholderTextColor="#fff" />
            <TextInput onChangeText={(e) => setPassword(e)}
                style={styles.input}
                placeholder="Password" placeholderTextColor="#fff"
                secureTextEntry={true} />
            {errorMsg !== '' && <Text style={styles.text}>{errorMsg}</Text>}
            <TouchableOpacity style={styles.button} onPress={() => handleLogin(userName, password)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(loginUser('Anonymous', 'qwe123'))}>
                <Text style={styles.buttonText} >Anonymous</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default LoginForm


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        margin: 5
    },
    input: {
        fontSize: 18,
        width: 250,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: '#fff',
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
        paddingVertical: 5,
        width: 200,
        backgroundColor: '#aaa',
        borderRadius: 10
    }
})

