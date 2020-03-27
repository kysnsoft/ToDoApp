import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 0
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#f9f9f9',
        letterSpacing: 1,
    }
})