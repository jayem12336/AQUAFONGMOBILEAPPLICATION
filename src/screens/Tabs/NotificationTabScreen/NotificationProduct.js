import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOURS } from '../../../utils/database/Database';
import { useState } from 'react';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { useNavigation } from '@react-navigation/native';

const NotificationProduct = ({ data, id }) => {

    const [shopDetails, setShopDetails] = useState({});

    const navigation = useNavigation();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", data.userID, "shop", data.shopID), (doc) => {
            setShopDetails(doc.data());
        })
        return unsub;
    }, [navigation])

    console.log(shopDetails)

    return (
        <TouchableOpacity onPress={() => navigation.navigate("MyProducts", {
            shopDetails: shopDetails,
            shopID: data.shopID
        })}>
            <View style={styles.notifContainer}>
                <View style={styles.notifCardContainer}>
                    <View style={styles.cardContainer}>
                        <Image source={{ uri: data.productImage }} alt="Profile"
                            style={styles.notifImage}
                        />
                        <View style={styles.notifTextContainer}>
                            <Text style={styles.textStatus}>
                                Your product {data.productName} is out of stock
                            </Text>
                            <Text>
                                Please re stock your product
                            </Text>
                            <View style={{
                                marginTop: 10,
                            }}>
                                <Text style={{
                                    fontWeight: 'bold'
                                }}>click here for more information</Text>
                            </View>
                        </View>
                        <View style={styles.fixedIconContainer}>
                            <FontAwesome
                                name="circle"
                                style={[styles.fixedIconStyle, { color: COLOURS.red }]}
                            />
                        </View>
                    </View>
                </View>
            </View >
        </TouchableOpacity>
    )
}

export default NotificationProduct

const styles = StyleSheet.create({
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
        width: 250,
        marginTop: 20,
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