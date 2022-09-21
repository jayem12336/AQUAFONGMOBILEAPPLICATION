import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar
} from 'react-native';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';

import { useNavigation } from '@react-navigation/native';
import { COLOURS } from '../../utils/database/Database';

const SignUp = () => {

    const navigation = useNavigation();

    const [contact, setContact] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const onRegisterPress = () => {
        //Go to Email Confirmation
        navigation.navigate('RegisterSuccess');
    }

    const onSignInPress = () => {
        //Go to Signin Screen
        navigation.navigate('SignIn');
    }

    const onPressTermsOfUse = () => {
        //On Proccess
        console.warn("Terms of Use");
    }

    const onPressPrivacyPolicy = () => {
        //On Proccess
        console.warn("Privacy Policy");
    }
    //contentContainerStyle={styles.contentContainer}

    return (
        <ScrollView showsVerticalScrollIndicator={false}>    
            <StatusBar
                backgroundColor={COLOURS.dirtyWhiteBackground}
                barStyle="dark-content"
            />
            <View style={styles.root}>
                <Text style={styles.titleStyle}>Create an Account</Text>
                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder="Contact No."
                    value={contact}
                    setValue={setContact}
                />
                <CustomInput
                    placeholder="Email"
                    value={address}
                    setValue={setAddress}
                />
                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                />
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    secureTextEntry
                />
                <CustomButton
                    text="Register"
                    onPress={onRegisterPress}
                />

                <Text style={styles.text}>
                    By Registering, you confirm that you accept our {' '}
                    <Text style={styles.link} onPress={onPressTermsOfUse}>Terms of Use </Text>and {' '}
                    <Text style={styles.link} onPress={onPressPrivacyPolicy}>Privacy Policy</Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton
                    text="Have an account? Sign in"
                    onPress={onSignInPress}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    root: {
        padding: 20,
        backgroundColor: COLOURS.dirtyWhiteBackground,
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
    },
    contentContainer: {
        flex: 1,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        paddingTop: 20,
        paddingBottom: 20
    },
})