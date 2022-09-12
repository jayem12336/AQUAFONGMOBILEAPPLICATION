import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import IonIcon from 'react-native-vector-icons/Ionicons';

import files from '../../../images/Jpeg/KoiFish.jpg';

import { COLOURS } from '../../../utils/database/Database';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

const ProfileTab = ({ navigation }) => {

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ backgroundColor: COLOURS.white }}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingTop: 16,
                            paddingBottom: 16,
                            paddingHorizontal: 16,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left"
                                style={{
                                    fontSize: 20,
                                    color: COLOURS.backgroundDark,
                                    padding: 12,
                                    backgroundColor: COLOURS.backgroundLight,
                                    borderRadius: 12,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IonIcons
                                name="mail-outline"
                                style={{
                                    fontSize: 20,
                                    color: COLOURS.backgroundDark,
                                    padding: 12,
                                    borderRadius: 12,
                                    backgroundColor: COLOURS.backgroundLight,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={require('../../../images/Jpeg/KoiFish.jpg')}
                                size={80}
                            />
                            <View style={{ marginLeft: 20 }}>
                                <Title style={[styles.title, {
                                    marginTop: 15,
                                    marginBottom: 5,
                                }]}>Joeprilardeza</Title>
                                <Caption style={styles.caption}>gulod.maguinao</Caption>
                            </View>
                        </View>
                    </View>
                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Icon name="map-marker-radius" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>Bustos Bulacan</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="phone" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>09125123456</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="email" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>Joeprilardeza@gmail.com</Text>
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
                        <TouchableRipple>
                            <View style={styles.menuItem}>
                                <Icon name="cart" color="#FF6347" size={25} />
                                <Text style={styles.menuItemText}>My Cart</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple>
                            <View style={styles.menuItem}>
                                <IonIcon name="pricetag-outline" color="#FF6347" size={25} />
                                <Text style={styles.menuItemText}>My Vouchers</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple>
                            <View style={styles.menuItem}>
                                <Icon name="account-check-outline" color="#FF6347" size={25} />
                                <Text style={styles.menuItemText}>Start Selling</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple>
                            <View style={styles.menuItem}>
                                <IonIcon name="bookmarks-outline" color="#FF6347" size={25} />
                                <Text style={styles.menuItemText}>My Orders</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple>
                            <View style={styles.menuItem}>
                                <IonIcon name="newspaper-outline" color="#FF6347" size={25} />
                                <Text style={styles.menuItemText}>Feed</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple>
                            <View style={styles.menuItem}>
                                <IonIcon name="settings-outline" color="#FF6347" size={25} />
                                <Text style={styles.menuItemText}>Account Settings</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple>
                            <View style={styles.menuItem}>
                                <IonIcon name="help-circle-outline" color="#FF6347" size={25} />
                                <Text style={styles.menuItemText}>Help Center</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => navigation.navigate('SignIn')}>
                            <View style={styles.menuItem}>
                                <IonIcon name="log-out-outline" color="#FF6347" size={25} />
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

    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
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
        marginTop: 10,
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
});