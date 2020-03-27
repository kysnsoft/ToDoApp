import React, { } from 'react'
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback, Keyboard
} from 'react-native'
import DispatchTodo from './containers/DispatchTodo'

export default function TodoApp({ navigation }) {

    const navHandler = (id, taskParams) => {
        navigation.navigate('TaskDetails', { id, taskParams })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <DispatchTodo navHandler={navHandler} />
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})