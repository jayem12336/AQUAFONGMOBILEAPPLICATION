import React, { useEffect, useState } from 'react'
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { COLOURS } from '../../../utils/database/Database';
import IonIcons from 'react-native-vector-icons/Ionicons';

import { auth, db } from '../../../utils/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

const ProfileTab = ({ navigation }) => {

    const [userData, setUserData] = useState({});
    const [userID, setUserID] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            let itemArray = await AsyncStorage.getItem('@storage_Key');
            itemArray = JSON.parse(itemArray);
            setUserData(itemArray);
            setUserID(itemArray.uid);
            onSnapshot(doc(db, "users", itemArray.uid), (doc) => {
                setUserData(doc.data());
            })
            setIsLoading(false);
        }
        fetchData().catch((error) => {
            console.log(error)
        })
    }, [navigation])

    const logout = async () => {
        await AsyncStorage.removeItem('@storage_Key');
        auth.signOut().then(() => {
            navigation.navigate('SignIn')
        }).catch((err) => {
            const errorCode = err.code;
            console.log(errorCode)
        })
    }

    return (
        <View style={styles.container}>
            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <ActivityIndicator size={100} color={COLOURS.backgroundPrimary} />
                </View>
                :
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                    <SafeAreaView>
                        <StatusBar
                            backgroundColor={COLOURS.white}
                            barStyle="dark-content"
                        />
                        <View style={styles.userInfoSection}>
                            <View style={styles.userHeaderContainer}>
                                {
                                    userData.photoURL === '' ?
                                        <Avatar.Text
                                            label={userData.fullname.substring(0, 1)}
                                            size={80}
                                            style={{ color: COLOURS.white }}
                                        /> :
                                        <Avatar.Image
                                            source={{ uri: userData.photoURL }}
                                            size={80}
                                        />
                                }
                                <View style={{ marginLeft: 10, maxWidth: 130 }}>
                                    <Title style={[styles.title, {
                                        marginTop: 15,
                                        marginBottom: 5,
                                    }]}>{userData.fullname}</Title>
                                </View>
                                <View style={styles.headerIconContainer}>
                                    <TouchableOpacity onPress={() => navigation.navigate('CartTab')}>
                                        <Icon
                                            name="cart"
                                            style={styles.headerIconStyle}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('MessageTabScreen')}>
                                        <IonIcons
                                            name="mail-outline"
                                            style={styles.headerIconStyle}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <View style={styles.row}>
                                    <Icon name="map-marker-radius" color={COLOURS.black} size={20} />
                                    <Text style={styles.userInformation}>{userData.address}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Icon name="phone" color={COLOURS.black} size={20} />
                                    <Text style={styles.userInformation}>{userData.phone}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Icon name="email" color={COLOURS.black} size={20} />
                                    <Text style={styles.userInformation}>{userData.email}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox, {
                                borderRightColor: '#dddddd',
                                borderRightWidth: 1
                            }]}>
                                <Title>140.50</Title>
                                <Caption>Wallet</Caption>
                            </View>
                            <View style={styles.infoBox}>
                                <Title>0</Title>
                                <Caption>My Orders</Caption>
                            </View>
                        </View>
                        <View style={styles.menuWrapper}>
                            {userData.hasShop === true ?
                                <TouchableRipple onPress={() => {
                                    navigation.navigate('MyShop', {
                                        userID: userID,
                                        shopID: userData.shopID
                                    })
                                }}>
                                    <View style={styles.menuItem}>
                                        <Icon name="cart" color="#FF6347" size={25} />
                                        <Text style={styles.menuItemText}>My Shop</Text>
                                    </View>
                                </TouchableRipple>
                                : ''
                            }
                            {userData.hasShop === false ?
                                <TouchableRipple onPress={() => navigation.navigate('BusinessRegistrationForm', {
                                    userData: userData
                                })}>
                                    <View style={styles.menuItem}>
                                        <Icon name="cart" size={25} style={styles.iconColor} />
                                        <Text style={styles.menuItemText}>Start Business</Text>
                                    </View>
                                </TouchableRipple> : ''
                            }

                            <TouchableRipple onPress={() => navigation.navigate('MyOrder')}>
                                <View style={styles.menuItem}>
                                    <IonIcon name="bookmarks-outline" style={styles.iconColor} size={25} />
                                    <Text style={styles.menuItemText}>My Orders</Text>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple>
                                <View style={styles.menuItem}>
                                    <Icon name="account-check-outline" style={styles.iconColor} size={25} />
                                    <Text style={styles.menuItemText}>My Wallet</Text>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => navigation.navigate('UpdateProfile', {
                                userID: userID,
                                userData: userData
                            })}>
                                <View style={styles.menuItem}>
                                    <IonIcon name="settings-outline" style={styles.iconColor} size={25} />
                                    <Text style={styles.menuItemText}>Account Settings</Text>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => navigation.navigate('About')}>
                                <View style={styles.menuItem}>
                                    <IonIcon name="help-circle-outline" style={styles.iconColor} size={25} />
                                    <Text style={styles.menuItemText}>About</Text>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple onPress={logout}>
                                <View style={styles.menuItem}>
                                    <IonIcon name="log-out-outline" style={styles.iconColor} size={25} />
                                    <Text style={styles.menuItemText}>Logout</Text>
                                </View>
                            </TouchableRipple>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            }
        </View>
    );
};

export default ProfileTab;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOURS.white,
        height: '100%',
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        backgroundColor: COLOURS.backgroundPrimary
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
        maxWidth: 150
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        paddingTop: 10
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    headerIconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerIconStyle: {
        fontSize: 25,
        color: COLOURS.black,
        padding: 12,
        marginTop: 10,
    },
    userInformation: {
        color: COLOURS.black, marginLeft: 20
    },
    iconColor: {
        color: '#FF6347'
    },
    userHeaderContainer: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between'
    }
});