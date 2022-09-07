import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import React from 'react'

const SocialSignInButtons = () => {

    const onSignInFacebook = () => {
        //Has no function yet
        console.warn("Sign in with Facebook");
    }

    const onSignInWithGoogle = () => {
        //Has no function yet
        console.warn("Sign in with Google");
    }

    const onSignInWithApple = () => {
        //Has no function yet
        console.warn("Sign in with Apple");
    }

    return (
        <>
            <CustomButton
                text="Sign In with Facebook"
                onPress={onSignInFacebook}
                bgColor='#E7EAF4'
                fgColor='#4765A9'
            />
            <CustomButton
                text="Sign In with Google"
                onPress={onSignInWithGoogle}
                bgColor='#FAE9EA'
                fgColor='#DD4D44'
            />
            <CustomButton
                text="Sign In with Apple"
                onPress={onSignInWithApple}
                bgColor='#e3e3e3'
                fgColor='#363636'
            />
        </  >
    )
}

export default SocialSignInButtons

const styles = StyleSheet.create({})