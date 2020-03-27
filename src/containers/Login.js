import React, { useState, useContext } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import Logo from './Logo'
import LoginForm from './LoginForm'

const Login = () => {

    return (
        <View style={styles.container}>
            <Logo />
            <LoginForm />
        </View>
    )
}

export default Login


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

