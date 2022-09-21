import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PurchaseHistory = () => {
  return (
    <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }} >
        <Text style={{
            fontSize: 12
        }}>No Purchased items</Text>
    </View>
  )
}

export default PurchaseHistory

const styles = StyleSheet.create({})