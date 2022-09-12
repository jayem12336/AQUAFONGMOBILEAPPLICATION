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

const ForgotPasswordScreen = () => {

    const navigation = useNavigation();

    const [username, setUsername] = useState('');

    const onSendPress = () => {
        // GO to new Password Screen 
        navigation.navigate('NewPassword');
    }

    const onSignInPress = () => {
        // Go to Signin Screen
        navigation.navigate('SignIn');
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
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                />

                <CustomButton
                    text="Send"
                    onPress={onSendPress}
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

export default ForgotPasswordScreen

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