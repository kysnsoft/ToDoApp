import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

class AddTodo extends Component {

    state = {
        text: ''
    }

    addTodo = (text) => {
        //redux store
        if (text == "")
            return alert('Field cannot be Empty')
        this.props.dispatch(addTodo(text))
        this.setState({ text: '' })
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                <TextInput
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    placeholder="What need to be done?"
                    style={{
                        borderWidth: 1,
                        borderColor: '#f2f2e1',
                        backgroundColor: '#eaeaea',
                        height: 40, flex: 1, padding: 10, fontSize: 18, borderRadius: 10
                    }}
                />
                <TouchableOpacity onPress={() => this.addTodo(this.state.text)}>
                    <View style={{ height: 40, backgroundColor: '#eaeaea', borderRadius: 10 }}>
                        <Icon size={30} color="#de9595" name="add-to-list"
                            style={{ padding: 10, paddingTop: 5 }} />
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}

export default connect()(AddTodo);
