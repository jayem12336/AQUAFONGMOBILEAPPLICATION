import React, { useCallback, useState } from 'react';

import {
    StyleSheet,
    Image,
    View,
    useWindowDimensions,
    ScrollView,
    StatusBar,
    Keyboard,
    BackHandler
} from 'react-native';

import Logo from '../../images/Aquapond.png';
import CustomButton from '../../components/CustomButton';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLOURS } from '../../utils/database/Database';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';

import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    const navigation = useNavigation();

    const { height } = useWindowDimensions();

    const [inputs, setInputs] = useState({
        password: '',
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                // Do Whatever you want to do on back button click
                // Return true to stop default back navigaton
                // Return false to keep default back navigaton
                return true;
            };

            BackHandler.addEventListener(
                'hardwareBackPress', onBackPress
            );

            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress', onBackPress
                );
        }, [])
    );

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('Min password length of 5', 'password');
            isValid = false;
        }

        if (isValid) {
            login();
        }
    };

    const mapAuthCodeToMessage = (authCode) => {
        switch (authCode) {
            case "auth/wrong-password":
                return "Password provided is not correct";
            case "auth/invalid-email":
                return "Email provided is invalid";
            case "auth/requires-recent-login":
                return "Sign in error";
            case "auth/user-not-found":
                return "User does not exist";
            // Many more authCode mapping here...
            default:
        }
    }

    const login = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, inputs.email, inputs.password)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    //AsyncStorage.setItem('@userid', user.uid.toString());
                    const jsonValue = JSON.stringify(user)
                    AsyncStorage.setItem('@storage_Key', jsonValue)
                    setLoading(false);
                    navigation.navigate('Home');
                }).catch((error) => {
                    const errorMessage = error.code;
                    handleError(mapAuthCodeToMessage(errorMessage), 'password');
                    console.log(errorMessage)
                    setLoading(false);
                });
        }
        catch (err) {
            console.warn(err)
        }
    };

    const onForgotPress = () => {
        //Go to Forgot password Screen
        navigation.navigate('ForgotPassword')
        setErrors({})
        setInputs({})
    }

    const onSignUpPress = () => {
        //Go to Sign up Screen
        navigation.navigate('SignUp')
        setErrors({})
        setInputs({})
    }

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (
        <View style={styles.root}>
            <Loader visible={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                    backgroundColor={COLOURS.dirtyWhiteBackground}
                    barStyle="dark-content"
                />
                <View style={{ padding: 20, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={Logo}
                            style={[styles.logo, { height: height * 0.3 }]}
                            resizeMode="contain"
                        />
                    </View>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                    />
                    <CustomButton
                        text="Sign In"
                        onPress={validate}
                    />

                    <CustomButton
                        text="Forgot Password?"
                        onPress={onForgotPress}
                        type="TERTIARY"
                    />
                    {/* <SocialSignInButtons /> */}
                    <CustomButton
                        text="Don't have an account? Create one"
                        onPress={onSignUpPress}
                        type="TERTIARY"
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOURS.white,
        flex: 1
    },
    logo: {
        width: "70%",
        maxHeight: 200,
        maxWidth: 300,
        marginBottom: 5
    },
    contentContainer: {
        flex: 1,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        paddingTop: 20
    },
})