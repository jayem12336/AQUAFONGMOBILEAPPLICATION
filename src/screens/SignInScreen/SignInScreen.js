import React, { useState } from 'react';

import {
    StyleSheet,
    Image,
    View,
    useWindowDimensions,
    ScrollView
} from 'react-native'

import Logo from '../../images/aqualogo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';

import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions();

    const onSignInPress = () => {
        //Validate user
        navigation.navigate('Home');
    }

    const onForgotPress = () => {
        //Go to Forgot password Screen
        navigation.navigate('ForgotPassword')
    }

    const onSignUpPress = () => {
        //Go to Sign up Screen
        navigation.navigate('SignUp')
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />
                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomButton
                    text="Sign In"
                    onPress={onSignInPress}
                />

                <CustomButton
                    text="Forgot Password?"
                    onPress={onForgotPress}
                    type="TERTIARY"
                />
                <SocialSignInButtons />
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPress}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'F9FBFC',
        marginTop: 50
    },
    logo: {
        width: "70%",
        maxHeight: 200,
        maxWidth: 300,
        marginBottom: 5
    }
})