import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOURS } from '../../../utils/database/Database';
import { useNavigation } from '@react-navigation/native';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

const NotificationShop = ({ data, id }) => {

    const navigation = useNavigation();

    const [shopDetailss, setShopDetailss] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", data.ownerID, "shop", data.shopID), (doc) => {
            setShopDetailss(doc.data());
        })
        return unsub;
    }, [navigation])

    return (
        <TouchableOpacity onPress={() => navigation.navigate("ShopSettings", {
            shopID: data.shopID,
            userID: data.ownerID,
            shopDetails: shopDetailss,
            status: shopDetailss.status
        })}>
            <View style={styles.notifContainer}>
                <View style={styles.notifCardContainer}>
                    <View style={styles.cardContainer}>
                        <Image source={require('../../../../assets/icons/Shop.png')}
                            alt="Shop Icon"
                            style={styles.notifImage}
                        />
                        <View style={styles.notifTextContainer}>
                            {shopDetailss.status === "" ?
                                <Text style={styles.textStatus}>
                                    Your Shop is waiting to be verified
                                </Text> :
                                <Text style={styles.textStatus}>
                                    Your Shop has been rejected
                                </Text>
                            }
                            {shopDetailss.status === "" ?
                                <Text style={styles.textStatus}>
                                    Expect the verification for 2-3 days
                                </Text> :
                                <Text style={styles.textStatus}>
                                     You need to resubmit your valid ID
                                </Text>
                            }
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
                                style={[styles.fixedIconStyle, { color: shopDetailss.status === "" ? COLOURS.orange :COLOURS.red }]}
                            />
                        </View>
                    </View>
                </View>
            </View >
        </TouchableOpacity>
    )
}

export default NotificationShop

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
        height: 80,
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