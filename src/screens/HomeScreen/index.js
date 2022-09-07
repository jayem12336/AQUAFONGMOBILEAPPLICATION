import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
        <View style={styles.root}>
            <Text style={styles.textStyle}>Home Screen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 24,
        alignSelf: 'center'
    }

})