import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity
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

const ProfileTab = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View style={styles.userInfoSection}>
                        <View style={styles.userHeaderContainer}>
                            <Avatar.Image
                                source={require('../../../images/Jpeg/KoiFish.jpg')}
                                size={80}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Title style={[styles.title, {
                                    marginTop: 15,
                                    marginBottom: 5,
                                }]}>Joeprilardeza</Title>
                                <Caption style={styles.caption}>gulod.maguinao</Caption>
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
                    </View>
                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Icon name="map-marker-radius" color={COLOURS.black} size={20} />
                            <Text style={styles.userInformation}>Bustos Bulacan</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="phone" color={COLOURS.black} size={20} />
                            <Text style={styles.userInformation}>09125123456</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="email" color={COLOURS.black} size={20} />
                            <Text style={styles.userInformation}>Joeprilardeza@gmail.com</Text>
                        </View>
                    </View>
                    {/* <View style={styles.infoBoxWrapper}>
                    <View style={[styles.infoBox, {
                        borderRightColor: '#dddddd',
                        borderRightWidth: 1
                    }]}>
                        <Title>140.50</Title>
                        <Caption>Wallet</Caption>
                    </View>
                    <View style={styles.infoBox}>
                        <Title>12</Title>
                        <Caption>Orders</Caption>
                    </View>
                    </View> */}
                    <View style={styles.menuWrapper}>
                        {/* <TouchableRipple>
                            <View style={styles.menuItem}>
                                <Icon name="cart" color="#FF6347" size={25} />
                                <Text style={styles.menuItemText}>My Shop</Text>
                            </View>
                        </TouchableRipple> */}
                        <TouchableRipple onPress={() => navigation.navigate('BusinessRegistrationForm')}>
                            <View style={styles.menuItem}>
                                <Icon name="cart" size={25} style={styles.iconColor}/>
                                <Text style={styles.menuItemText}>Start Business</Text>
                            </View>
                        </TouchableRipple>
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
                        <TouchableRipple>
                            <View style={styles.menuItem}>
                                <IonIcon name="settings-outline" style={styles.iconColor} size={25} />
                                <Text style={styles.menuItemText}>Settings</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple>
                            <View style={styles.menuItem}>
                                <IonIcon name="help-circle-outline" style={styles.iconColor} size={25} />
                                <Text style={styles.menuItemText}>About</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => navigation.navigate('SignIn')}>
                            <View style={styles.menuItem}>
                                <IonIcon name="log-out-outline" style={styles.iconColor} size={25} />
                                <Text style={styles.menuItemText}>Logout</Text>
                            </View>
                        </TouchableRipple>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default ProfileTab;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOURS.white,
        height: '100%',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        backgroundColor: COLOURS.backgroundPrimary
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
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
        paddingTop: 50
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
        justifyContent: 'center',
        marginLeft: 10
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
        marginTop: 15
    }
});