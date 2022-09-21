import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Cancelled = () => {
  return (
    <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }} >
        <Text style={{
            fontSize: 12
        }}>No Cancelled items</Text>
    </View>
  )
}

export default Cancelled

const styles = StyleSheet.create({})