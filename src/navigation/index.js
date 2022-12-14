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

import { auth, db } from '../utils/firebase'
import CreateProduct from '../screens/Tabs/ProfileTab/MyShop/MyProducts/CreateProduct';
import EditProduct from '../screens/Tabs/ProfileTab/MyShop/MyProducts/EditProduct';
import NewProductInfo from '../screens/Tabs/FeedTab/NewProductInfo/NewProductInfo';
import UpdateProfile from '../screens/Tabs/ProfileTab/AccountSetting/UpdateProfile';
import Ordered from '../screens/Tabs/ProfileTab/MyShop/Ordered';
import OrderHistory from '../screens/Tabs/ProfileTab/MyShop/MyProducts/OrderHistory/OrderHistory';
import CancelledOrder from '../screens/Tabs/ProfileTab/MyShop/CancelledOrder';
import OrderDetails from '../screens/Tabs/ProfileTab/MyShop/MyProducts/OrderHistory/OrderDetails';
import About from '../screens/Tabs/ProfileTab/About/About';
import ShopSettings from '../screens/Tabs/ProfileTab/MyShop/ShopSettings/ShopSettings';
import EditShopSettings from '../screens/Tabs/ProfileTab/MyShop/ShopSettings/EditShopSettings';
import MyWallet from '../screens/Tabs/ProfileTab/MyWallet/MyWallet';
import ShopView from '../screens/Tabs/DiscoverTab/ShopView/ShopView';
import Reviews from '../screens/Tabs/FeedTab/NewProductInfo/Reviews';
import { doc, onSnapshot } from 'firebase/firestore';
import CreateCard from '../screens/Tabs/ProfileTab/MyWallet/CreateCard/CreateCard';
import CardInfo from '../screens/Tabs/ProfileTab/MyWallet/CreateCard/CardInfo';
import EditCard from '../screens/Tabs/ProfileTab/MyWallet/CreateCard/EditCard';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const Navigation = ({ navigation }) => {

    const [isLoggedIn, setIsLoggedIn] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setIsLoggedIn(true)
                setUser(authUser.uid)
            } else {
                setIsLoggedIn(false)
                setUser(null)
            }
        })
    }, [navigation])

    function BottomTabNavigation() {
        return (
            <BottomTab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        elevation: 1,
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
                                        tintColor: COLOURS.primaryOrange
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
                                        tintColor: COLOURS.primaryOrange
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
                    initialParams={{
                        userinfo: user,
                    }}
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
                                        tintColor: COLOURS.primaryOrange
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
                                        tintColor: COLOURS.primaryOrange
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
                    initialParams={{
                        userinfo: user,
                    }}
                />
            </BottomTab.Navigator>
        )
    }

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
                            name="NewProductInfo"
                            component={NewProductInfo}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="Purchase"
                            component={PurchaseScreen}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="PurchaseComplete"
                            component={PurchaseCompleteScreen}
                        />
                        <Stack.Screen
                            name="MessageTabScreen"
                            component={MessageTabScreen}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="Reviews"
                            component={Reviews}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="Message"
                            component={Message}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="About"
                            component={About}
                        />
                        <Stack.Screen
                            name="BusinessRegistrationForm"
                            component={BusinessRegistrationForm}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="MyWallet"
                            component={MyWallet}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="CreateCard"
                            component={CreateCard}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="CardInfo"
                            component={CardInfo}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="EditCard"
                            component={EditCard}
                            initialParams={{
                                userinfo: user
                            }}
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
                            name="Ordered"
                            component={Ordered}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="OrderDetails"
                            component={OrderDetails}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="OrderHistory"
                            component={OrderHistory}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="CancelledOrder"
                            component={CancelledOrder}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="ShopView"
                            component={ShopView}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="MyProducts"
                            component={MyProducts}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="UpdateProfile"
                            component={UpdateProfile}
                        />
                        <Stack.Screen
                            name="CreateProduct"
                            component={CreateProduct}
                        />
                        <Stack.Screen
                            name="EditProduct"
                            component={EditProduct}
                        />
                        <Stack.Screen
                            name="MyOrder"
                            component={MyOrder}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="ShopSettings"
                            component={ShopSettings}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="EditShopSettings"
                            component={EditShopSettings}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="CartTab"
                            component={CartTab}
                            initialParams={{
                                userinfo: user
                            }}
                        />
                        <Stack.Screen
                            name="RegisterSuccess"
                            component={RegisterSuccessScreen}
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