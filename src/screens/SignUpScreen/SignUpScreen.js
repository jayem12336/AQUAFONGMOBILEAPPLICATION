import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    Keyboard,
    Alert
} from 'react-native';

import Loader from '../../components/Loader/Loader';

import CustomButton from '../../components/CustomButton';

import { useNavigation } from '@react-navigation/native';
import { COLOURS } from '../../utils/database/Database';

import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Input from '../../components/Input/Input';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {

    const navigation = useNavigation();

    const [inputs, setInputs] = useState({
        email: '',
        phone: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

        if (!inputs.firstName) {
            handleError('Please input first name', 'firstName');
            isValid = false;
        }

        if (!inputs.lastName) {
            handleError('Please input last name', 'lastName');
            isValid = false;
        }

        if (!inputs.address) {
            handleError('Please input address', 'address');
            isValid = false;
        }

        if (!inputs.phone) {
            handleError('Please input phone number', 'phone');
            isValid = false;
        } else if (/^(09|\+639)\d{9}$/.test(inputs.phone) === false && /^[0-9]{8}$/.test(inputs.phone) === false) {
            handleError('Please enter a valid phone number', 'phone');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('Min password length of 5', 'password');
            isValid = false;
        }

        if (!inputs.confirmPassword) {
            handleError('Please input password', 'confirmPassword');
            isValid = false;
        } else if (inputs.confirmPassword.length < 5) {
            handleError('Min password length of 5', 'confirmPassword');
            isValid = false;
        }
        if (inputs.password !== inputs.confirmPassword) {
            handleError('Password do not match', 'password');
            handleError('Password do not match', 'confirmPassword');
            isValid = false;
        }

        if (isValid) {
            register();
        }
    };

    const mapAuthCodeToMessage = (authCode) => {
        switch (authCode) {
            case "auth/email-already-in-use":
                return "Email is already taken";
            case "auth/invalid-email":
                return "Email provided is invalid";
            // Many more authCode mapping here...
            default:
        }
    }

    const register = async () => {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setDoc(doc(db, 'users', user.uid),
                    {
                        firstname: inputs.firstName,
                        lastname: inputs.lastName,
                        fullname: inputs.firstName + " " + inputs.lastName,
                        email: inputs.email,
                        address: inputs.address,
                        phone: inputs.phone,
                        ownerId: user.uid,
                        hasShop: false,
                        shopID: '',
                        photoURL: '',
                        walletID: ''
                    }
                );
                const jsonValue = JSON.stringify(user)
                AsyncStorage.setItem('@storage_Key', jsonValue)
                setLoading(false);
                navigation.navigate('RegisterSuccess');
            }).catch((err) => {
                const errorMessage = err.code;
                handleError(mapAuthCodeToMessage(errorMessage), 'email');
                setLoading(false);
            })
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };



    const onSignInPress = () => {
        //Go to Signin Screen
        navigation.navigate('SignIn');
        setErrors({})
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
        <View style={styles.root}>
            <Loader visible={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                    backgroundColor={COLOURS.dirtyWhiteBackground}
                    barStyle="dark-content"
                />
                <View style={{ padding: 20 }}>
                    <Text style={styles.titleStyle}>Create an Account</Text>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'firstName')}
                        onFocus={() => handleError(null, 'firstName')}
                        iconName="account-outline"
                        label="First Name"
                        placeholder="Enter your first name"
                        error={errors.firstName}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'lastName')}
                        onFocus={() => handleError(null, 'lastName')}
                        iconName="account-outline"
                        label="Last name"
                        placeholder="Enter your last name"
                        error={errors.lastName}
                    />
                    <Input
                        keyboardType="numeric"
                        onChangeText={text => handleOnchange(text, 'phone')}
                        onFocus={() => handleError(null, 'phone')}
                        iconName="phone-outline"
                        label="Phone Number"
                        placeholder="Enter your contact no"
                        error={errors.phone}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'address')}
                        onFocus={() => handleError(null, 'address')}
                        iconName="map-marker-outline"
                        label="Address"
                        placeholder="Enter your address"
                        error={errors.address}
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
                    <Input
                        onChangeText={text => handleOnchange(text, 'confirmPassword')}
                        onFocus={() => handleError(null, 'confirmPassword')}
                        iconName="lock-outline"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        error={errors.confirmPassword}
                        password
                    />
                    <CustomButton
                        text="Register"
                        onPress={validate}
                    />

                    <Text style={styles.text}>
                        By Registering, you confirm that you accept our {' '}
                        <Text style={styles.link} onPress={onPressTermsOfUse}>Terms of Use </Text>and {' '}
                        <Text style={styles.link} onPress={onPressPrivacyPolicy}>Privacy Policy</Text>
                    </Text>

                    {/* <SocialSignInButtons /> */}

                    <CustomButton
                        text="Have an account? Sign in"
                        onPress={onSignInPress}
                        type="TERTIARY"
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOURS.dirtyWhiteBackground,
        flex: 1
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