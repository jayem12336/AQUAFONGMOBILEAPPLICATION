import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ScrollView
} from 'react-native';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';

import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {

    const navigation = useNavigation();

    const [code, setCode] = useState('');

    const { height } = useWindowDimensions();

    const onConfirmPress = () => {
        navigation.navigate('Home')

    }

    const onSignInPress = () => {
        console.warn("Sign Up");
    }

    const onResendCodePress = () => {
        console.warn("Resend Code");
    }

    const onPressPrivacyPolicy = () => {
        console.warn("Privacy Policy");
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.titleStyle}>Confirm your email</Text>
                <CustomInput
                    placeholder="Enter your confirmation code"
                    value={code}
                    setValue={setCode}
                />

                <CustomButton
                    text="Confirm"
                    onPress={onConfirmPress}
                />

                <CustomButton
                    onPress={onResendCodePress}
                    type="SECONDARY"
                    text="Resend Code"
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

export default ConfirmEmailScreen

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