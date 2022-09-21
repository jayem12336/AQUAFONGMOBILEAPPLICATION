import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Sold = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }} >
            <Text style={{
                fontSize: 12
            }}>No sold items</Text>
        </View>
    )
}

export default Sold

const styles = StyleSheet.create({})