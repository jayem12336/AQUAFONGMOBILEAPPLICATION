import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    Keyboard,
    Alert
} from 'react-native';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import { useNavigation } from '@react-navigation/native';
import { COLOURS } from '../../utils/database/Database';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase'

const ForgotPasswordScreen = () => {

    const navigation = useNavigation();

    const [inputs, setInputs] = useState({
        email: '',
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
        if (isValid) {
            onSendPress();
        }
    };
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const onSendPress = () => {
        setLoading(true);
        sendPasswordResetEmail(auth, inputs.email)
        .then(() => {
            setLoading(false);
            Alert.alert("Password reset email sent!")
            navigation.navigate('SignIn');
        }).catch((error) => {
            const errorMessage = error.message;
            setLoading(false);
            Alert.alert(errorMessage)
        })
    }

    const onSignInPress = () => {
        // Go to Signin Screen
        navigation.navigate('SignIn');
    }

    return (
        <View style={styles.root}>
            <Loader visible={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                    backgroundColor={COLOURS.dirtyWhiteBackground}
                    barStyle="dark-content"
                />
                <View style={{ padding: 20 }}>
                    <Text style={styles.titleStyle}>Reset your password</Text>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />
                    <CustomButton
                        text="Send"
                        onPress={validate}
                    />
                    <CustomButton
                        text="Back to Sign In"
                        onPress={onSignInPress}
                        type="TERTIARY"
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ForgotPasswordScreen

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
    }
})