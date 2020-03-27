import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'

const Logo = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Image style={{ width: 210, height: 120 }}
                source={require('../images/myLogo2.png')} />
            <Text style={{
                fontSize: 25, fontWeight: 'bold', marginVertical: 5, color: 'white'
            }}>Welcome!</Text>
        </View >
    )
}

export default Logo
