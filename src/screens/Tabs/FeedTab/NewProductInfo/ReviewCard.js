import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOURS } from '../../../../utils/database/Database';
import { useState } from 'react';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import moment from 'moment';

const ReviewCard = ({ data, id, navigation }) => {

    const [userData, setUserData] = useState({});
    const [prodData, setProdData] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", data.buyerID), (doc) => {
            setUserData(doc.data());
        })
        return unsub;
    }, [navigation])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "feedproducts", data.prodID), (doc) => {
            setProdData(doc.data());
        })
        return unsub;
    }, [navigation])

    return (
        <View style={styles.notifContainer}>
            <View style={styles.notifCardContainer}>
                <View style={styles.cardContainer}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '500',
                        letterSpacing: 1
                    }}>
                        {userData.fullname}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '500',
                        letterSpacing: 1,
                        color: COLOURS.grey
                    }}>
                        {moment(data.dateCreated).format("ll")}
                    </Text>
                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        source={{uri: prodData.productImage}}
                        alt="Product Icon"
                        style={{
                            width: 70,
                            height: 70
                        }}
                    />
                    <Text style={{
                        marginLeft: 10,
                        fontSize: 15,
                        fontWeight: '400',
                        letterSpacing: 1,
                    }}>
                        {prodData.productName}
                    </Text>
                </View>
                <View style={{
                    marginTop: 10,
                    justifyContent: 'flex-start'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '400',
                        letterSpacing: 1,
                    }}>
                        Comment
                    </Text>
                    <Text style={{
                        textAlign: 'justify',
                        marginTop: 5
                    }}>
                         {data.comment}
                    </Text>
                </View>
            </View>
        </View >
    )
}

export default ReviewCard

const styles = StyleSheet.create({
    notificationTitle: {
        fontSize: 17,
        letterSpacing: 1,
        marginTop: 5
    },
    notifContainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center'
    },
    notifCardContainer: {
        width: '95%',
        paddingTop: 16,
        maxWidth: 400,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        borderColor: COLOURS.primaryOrange,
        borderWidth: 2,
    },
    cardContainer: {
        justifyContent: 'space-between',
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