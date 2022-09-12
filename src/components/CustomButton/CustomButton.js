import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react';

import { COLOURS } from '../../utils/database/Database';

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
        backgroundColor: COLOURS.buttonContainerPrimary,
    },
    container_SECONDARY: {
        borderColor: COLOURS.buttonContainerSecondary,
        borderWidth: 2
    },
    container_TERTIARY: {

    },
    container_ENTERSHOPBUTTON: {
        width: '50%',
        backgroundColor: COLOURS.buttonContainerPrimary,
        marginTop: 10
    },
    textStyle: {
        fontWeight: 'bold',
        color: COLOURS.white
    },
    text_SECONDARY: {
        color: COLOURS.buttonTextSecondary
    },
    text_TERTIARY: {
        color: COLOURS.buttonTextTertiary
    },
    text_ENTERSHOPBUTTON: {
        color: COLOURS.white
    }
})