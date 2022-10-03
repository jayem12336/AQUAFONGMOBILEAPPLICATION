import { StatusBar, StyleSheet, View } from 'react-native'
import React from 'react';

import AnimatedLottieView from 'lottie-react-native';

import { useNavigation } from '@react-navigation/native';
import { COLOURS } from '../../utils/database/Database';

const SplashScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <AnimatedLottieView
                source={require('../../../assets/LoadingAnimation.json')}
                autoPlay
                loop={false}
                onAnimationFinish={() => navigation.navigate('LandingPage')}
                speed={2}
            />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})