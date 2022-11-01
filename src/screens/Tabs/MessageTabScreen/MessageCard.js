import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../utils/database/Database'
import { Avatar } from 'react-native-paper'
import { useState } from 'react'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../utils/firebase'
import { useNavigation } from '@react-navigation/native'


const MessageCard = ({ data, id, userinfo }) => {

    const navigation = useNavigation();

    const [buyerData, setBuyerData] = useState({});
    const [sellerData, setSellerData] = useState({});
    const [productData, setProductData] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", data.buyerID), (doc) => {
            setBuyerData(doc.data());
        })
        return unsub;
    }, [navigation])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", data.sellerID), (doc) => {
            setSellerData(doc.data());
        })
        return unsub;
    }, [navigation])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "feedproducts", data.prodID), (doc) => {
            setProductData(doc.data());
        })
        return unsub;
    }, [navigation])

    return (
        <View>
            <TouchableOpacity key={id} onPress={() => navigation.navigate('Message', {
                buyerID: data.buyerID,
                sellerID: data.sellerID,
                prodID: data.prodID
            })}>
                <View style={styles.messageBoxContainer}>
                    <View style={styles.avatarContainer}>
                        {
                            buyerData.photoURL === '' || sellerData.photoURL === ''?
                                <Avatar.Text
                                    label={userinfo !== data.sellerID ? sellerData.fullname?.substring(0, 1) : buyerData.fullname?.substring(0, 1)}
                                    size={50}
                                    style={{ color: COLOURS.white }}
                                /> :
                                <Avatar.Image
                                    source={{ uri: userinfo !== data.sellerID ? sellerData.photoURL : buyerData.photoURL }}
                                    size={50}
                                />
                        }
                        <Text style={styles.textMessage}>{userinfo !== data.sellerID ? sellerData.fullname : buyerData?.fullname}</Text>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 14,
                            letterSpacing: 1,
                            fontWeight: '500'
                        }}>
                            Item
                        </Text>
                        <Text style={{
                            marginTop: 5,
                            letterSpacing: 1,
                            fontWeight: '500',
                            color: COLOURS.grey
                        }}>
                            {productData.productName}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MessageCard

const styles = StyleSheet.create({
    messageBoxContainer: {
        width: '100%',
        paddingTop: 16,
        maxWidth: 400,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2.5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textMessage: {
        marginLeft: 10,
        maxWidth: 100,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    dateContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    }
})