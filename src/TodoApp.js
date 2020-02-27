import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import DispatchTodo from './containers/DispatchTodo'

class TodoApp extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <DispatchTodo />
                </View>
            </View>
        )
    }
}

export default TodoApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})