import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import SelectTypeOfUser from '../screens/SelectTypeOfUserScreen';
import SplashScreen from '../screens/SplashScreen';

import LandingPage from '../screens/LandingPageScreen';
import FeedTab from '../screens/Tabs/FeedTab';
import DiscoverTab from '../screens/Tabs/DiscoverTab';;
import CartTab from '../screens/Tabs/CartTab';
import ProfileTab from '../screens/Tabs/ProfileTab';
import ProductInfo from '../screens/Tabs/FeedTab/ProductInfo/ProductInfo';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigation() {
    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    height: 80,
                    ...styles.shadow
                },
                tabBarHideOnKeyboard: true
            }}
        >
            <BottomTab.Screen
                name="FeedTab"
                component={FeedTab}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../../assets/icons/Feed.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: '#000000'
                                }}
                            />
                            <Text
                                style={{
                                    color: '#748c94',
                                    fontSize: 12
                                }}
                            >
                                Feed
                            </Text>
                        </View>
                    ),
                    headerShown: false
                }}
            />
            <BottomTab.Screen
                name="DiscoverTab"
                component={DiscoverTab}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../../assets/icons/people.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: '#000000'
                                }}
                            />
                            <Text
                                style={{
                                    color: '#748c94',
                                    fontSize: 12
                                }}
                            >
                                Find
                            </Text>
                        </View>
                    ),
                }}
            />
            <BottomTab.Screen
                name="CartTab"
                component={CartTab}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../../assets/icons/Cart.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: '#000000'
                                }}
                            />
                            <Text
                                style={{
                                    color: '#748c94',
                                    fontSize: 12
                                }}
                            >
                                Cart
                            </Text>
                        </View>
                    ),
                    headerShown: false,
                    tabBarStyle: {display: 'none'}
                }}
            />
            <BottomTab.Screen
                name="ProfileTab"
                component={ProfileTab}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../../assets/icons/Profile.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: '#000000'
                                }}
                            />
                            <Text
                                style={{
                                    color: '#748c94',
                                    fontSize: 12
                                }}
                            >
                                Profile
                            </Text>
                        </View>
                    ),
                    headerShown: false,
                    tabBarStyle: { display: 'none'}
                }}
            />
        </BottomTab.Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="LandingPage"
                    component={LandingPage}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="TypeOfUser"
                    component={SelectTypeOfUser}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                />
                <Stack.Screen
                    name="ConfirmEmail"
                    component={ConfirmEmailScreen}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                />
                <Stack.Screen
                    name="NewPassword"
                    component={NewPasswordScreen}
                />
                <Stack.Screen
                    name="Home"
                    component={BottomTabNavigation}
                />
                <Stack.Screen
                    name="ProductInfo"
                    component={ProductInfo}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },

})