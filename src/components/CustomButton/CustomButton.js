import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.containerStyle,
                styles[`container_${type}`],
                bgColor ? { backgroundColor: bgColor } : {}
            ]}
        >
            <Text style={[
                styles.textStyle,
                styles[`text_${type}`],
                fgColor ? { color: fgColor } : {}
            ]}
            >{text}</Text>
        </Pressable>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5
    },
    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },
    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2
    },
    container_TERTIARY: {

    },
    container_ENTERSHOPBUTTON: {
        width: '50%',
        backgroundColor: '#DDDDDD',
        marginTop: 10
    },
    textStyle: {
        fontWeight: 'bold',
        color: 'white'
    },
    text_SECONDARY: {
        color: '#3B71F3'
    },
    text_TERTIARY: {
        color: 'gray'
    },
    text_ENTERSHOPBUTTON: {
        color: 'black'
    }
})