import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar
} from 'react-native'

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import { useNavigation } from '@react-navigation/native';
import { COLOURS } from '../../utils/database/Database';

const NewPasswordScreen = () => {

    const navigation = useNavigation();

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const onSubmitPress = () => {
        //Go to Home or Back to Login
        navigation.navigate('Home');
    }

    const onSignInPress = () => {
        //back to Sign In
        navigation.navigate('SignIn')
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar
                backgroundColor={COLOURS.dirtyWhiteBackground}
                barStyle="dark-content"
            />
            <View style={styles.root}>
                <Text style={styles.titleStyle}>Reset your password</Text>
                <CustomInput
                    placeholder="Code"
                    value={code}
                    setValue={setCode}
                />

                <CustomInput
                    placeholder="Enter your new password"
                    value={newPassword}
                    setValue={setNewPassword}
                />

                <CustomButton
                    text="Submit"
                    onPress={onSubmitPress}
                />

                <CustomButton
                    text="Back to Sign In"
                    onPress={onSignInPress}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    )
}

export default NewPasswordScreen

const styles = StyleSheet.create({
    root: {
        padding: 20,
        backgroundColor: 'F9FBFC',
        marginTop: 50
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
        alignSelf: 'center'
    },
    text: {
        color: 'gray',
        marginVertical: 10
    },
    link: {
        color: '#FDB075'
    }
})