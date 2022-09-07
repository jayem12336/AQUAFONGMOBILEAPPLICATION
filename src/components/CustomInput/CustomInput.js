import React from 'react';

import { StyleSheet, TextInput, View } from 'react-native';


const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.containerStyle}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.inputStyle}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5
    },
    inputStyle: {

    }
})