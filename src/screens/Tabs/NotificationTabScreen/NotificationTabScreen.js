import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { COLOURS } from '../../../utils/database/Database';

const NotificationTabScreen = () => {
    return (
        <View style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View style={styles.headerContainer}>
                        <View style={styles.subHeaderContainer}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    onPress={() => navigation.goBack()}
                                    name="bell"
                                    style={styles.bellIconStyle}
                                />
                            </TouchableOpacity>
                            <Text style={styles.notificationTitle}>
                                Orders Notifications
                            </Text>
                        </View>
                    </View>
                    <View style={styles.notifContainer}>
                        <View style={styles.notifCardContainer}>
                            <View style={styles.cardContainer}>
                                <Image source={require('../../../images/Jpeg/Corals.jpg')} alt="Profile"
                                    style={styles.notifImage}
                                />
                                <View style={styles.notifTextContainer}>
                                    <Text style={styles.textStatus}>
                                        Your order has been packed
                                    </Text>
                                    <Text>
                                        The seller is preparing to ship your order
                                    </Text>
                                </View>
                                <View style={styles.fixedIconContainer}>
                                    <FontAwesome
                                        name="circle"
                                        style={[styles.fixedIconStyle, {color: COLOURS.green}]}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.notifContainer}>
                        <View style={styles.notifCardContainer}>
                            <View style={styles.cardContainer}>
                                <Image source={require('../../../images/Jpeg/Corals.jpg')} alt="Profile"
                                    style={styles.notifImage}
                                />
                                <View style={styles.notifTextContainer}>
                                    <Text style={styles.textStatus}>
                                        Cancelled Order
                                    </Text>
                                    <Text>
                                        Your order is successfully cancelled
                                    </Text>
                                </View>
                                <View style={styles.fixedIconContainer}>
                                    <FontAwesome
                                        name="circle"
                                        style={[styles.fixedIconStyle, {color: COLOURS.red}]}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.notifContainer}>
                        <View style={styles.notifCardContainer}>
                            <View style={styles.cardContainer}>
                                <Image source={require('../../../images/Jpeg/Corals.jpg')} alt="Profile"
                                    style={styles.notifImage}
                                />
                                <View style={styles.notifTextContainer}>
                                    <Text style={styles.textStatus}>
                                        Your order has been packed
                                    </Text>
                                    <Text>
                                        The seller is preparing to ship your order
                                    </Text>
                                </View>
                                <View style={styles.fixedIconContainer}>
                                    <FontAwesome
                                        name="circle"
                                        style={[styles.fixedIconStyle, {color: COLOURS.green}]}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.notifContainer}>
                        <View style={styles.notifCardContainer}>
                            <View style={styles.cardContainer}>
                                <Image source={require('../../../images/Jpeg/Corals.jpg')} alt="Profile"
                                    style={styles.notifImage}
                                />
                                <View style={styles.notifTextContainer}>
                                    <Text style={styles.textStatus}>
                                        Hello KaFishy!
                                    </Text>
                                    <Text>
                                        Your order is successfully cancelled
                                    </Text>
                                </View>
                                <View style={styles.fixedIconContainer}>
                                    <FontAwesome
                                        name="circle"
                                        style={[styles.fixedIconStyle, {color: COLOURS.green}]}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default NotificationTabScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        backgroundColor: COLOURS.white
    },
    headerContainer: {
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2.5,
    },
    subHeaderContainer: {
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: -20
    },
    bellIconStyle: {
        fontSize: 30,
        color: COLOURS.black,
        padding: 12,
        borderRadius: 12,
    },
    notificationTitle: {
        fontSize: 17,
        letterSpacing: 1,
        marginTop: 5
    },
    notifContainer: {
        width: '100%',
        maxWidth: 400,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    notifCardContainer: {
        width: '95%',
        height: 100,
        paddingTop: 16,
        maxWidth: 400,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    notifImage: {
        width: 80,
        height: '100%',
        maxHeight: 100,
        borderRadius: 15
    },
    notifTextContainer: {
        paddingHorizontal: 10,
        maxWidth: 250,
        marginTop: 20
    },
    textStatus: {
        fontWeight: '500',
        letterSpacing: .5
    },
    fixedIconContainer: {
        position: 'absolute',
        top: 2,
        right: 2
    },
    fixedIconStyle: {
        fontSize: 12,
        marginRight: 6,
    }
})