import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SplashScreen from '../screens/SplashScreen';

import LandingPage from '../screens/LandingPageScreen';
import FeedTab from '../screens/Tabs/FeedTab';
import DiscoverTab from '../screens/Tabs/DiscoverTab';;
import CartTab from '../screens/Tabs/CartTab';
import ProfileTab from '../screens/Tabs/ProfileTab';
import ProductInfo from '../screens/Tabs/FeedTab/ProductInfo/ProductInfo';
import PurchaseScreen from '../screens/Tabs/FeedTab/PurchaseScreen/PurchaseScreen';
import RegisterSuccessScreen from '../screens/RegisterSuccessScreen';
import { COLOURS } from '../utils/database/Database';
import PurchaseCompleteScreen from '../screens/Tabs/FeedTab/PurchaseCompleteScreen.js/PurchaseComplete';
import MessageTabScreen from '../screens/Tabs/MessageTabScreen/MessageTabScreen';
import NotificationTabScreen from '../screens/Tabs/NotificationTabScreen/NotificationTabScreen';
import BusinessRegistrationForm from '../screens/Tabs/ProfileTab/BusinessRegistrationForm/BusinessRegistrationForm';
import SuccessBusinessScreen from '../screens/Tabs/ProfileTab/SuccessBusinessScreen/SuccessBusinessScreen';
import MyShop from '../screens/Tabs/ProfileTab/MyShop/MyShop';
import MyProducts from '../screens/Tabs/ProfileTab/MyShop/MyProducts/MyProducts';
import MyOrder from '../screens/Tabs/MyOrders/MyOrder';
import Message from '../screens/Tabs/MessageTabScreen/Message';

import { auth } from '../utils/firebase'

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
                    //borderTopWidth: 2,
                    //borderTopColor: 'gray',
                    backgroundColor: COLOURS.white,
                    height: 65,
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
                                source={require('../../assets/icons/Home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: '#000000'
                                }}
                            />
                            {/* <Text
                                style={{
                                    color: '#748c94',
                                    fontSize: 12
                                }}
                            >
                                Feed
                            </Text> */}
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
                                source={require('../../assets/icons/Location.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: '#000000'
                                }}
                            />
                            {/* <Text
                                style={{
                                    color: '#748c94',
                                    fontSize: 12
                                }}
                            >
                                Find
                            </Text> */}
                        </View>
                    ),
                    headerShown: false
                }}
            />
            <BottomTab.Screen
                name="NotificationTabScreen"
                component={NotificationTabScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../../assets/icons/Notification.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: '#000000'
                                }}
                            />
                            {/* <Text
                                style={{
                                    color: '#748c94',
                                    fontSize: 12
                                }}
                            >
                                Cart
                            </Text> */}
                        </View>
                    ),
                    headerShown: false,
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
                                    width: 25,
                                    height: 25,
                                    tintColor: '#000000'
                                }}
                            />
                            {/* <Text
                                style={{
                                    color: '#748c94',
                                    fontSize: 12
                                }}
                            >
                                Profile
                            </Text> */}
                        </View>
                    ),
                    headerShown: false,
                }}
            />
        </BottomTab.Navigator>
    )
}

const Navigation = ({ navigation }) => {

    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        })
    }, [navigation])

    console.log(isLoggedIn)

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoggedIn ?
                    <>
                        <Stack.Screen
                            name="Home"
                            component={BottomTabNavigation}
                        />
                        <Stack.Screen
                            name="ProductInfo"
                            component={ProductInfo}
                        />
                        <Stack.Screen
                            name="Purchase"
                            component={PurchaseScreen}
                        />
                        <Stack.Screen
                            name="PurchaseComplete"
                            component={PurchaseCompleteScreen}
                        />
                        <Stack.Screen
                            name="MessageTabScreen"
                            component={MessageTabScreen}
                        />
                        <Stack.Screen
                            name="Message"
                            component={Message}
                        />
                        <Stack.Screen
                            name="BusinessRegistrationForm"
                            component={BusinessRegistrationForm}
                        />
                        <Stack.Screen
                            name="SuccessBusinessScreen"
                            component={SuccessBusinessScreen}
                        />
                        <Stack.Screen
                            name="MyShop"
                            component={MyShop}
                        />
                        <Stack.Screen
                            name="MyProducts"
                            component={MyProducts}
                        />
                        <Stack.Screen
                            name="MyOrder"
                            component={MyOrder}
                        />
                        <Stack.Screen
                            name="CartTab"
                            component={CartTab}
                        />
                    </> :
                    <>
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
                            name="RegisterSuccess"
                            component={RegisterSuccessScreen}
                        />
                        <Stack.Screen
                            name="ConfirmEmail"
                            component={ConfirmEmailScreen}
                        />
                        <Stack.Screen
                            name="ForgotPassword"
                            component={ForgotPasswordScreen}
                        />
                    </>
                }
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