import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../utils/database/Database'
import { Avatar, Menu, Provider } from 'react-native-paper'
import { useState } from 'react'
import { useEffect } from 'react'
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../../utils/firebase'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../../components/Loader/Loader'

const MessageCard = ({ data, id, userinfo }) => {

    const navigation = useNavigation();

    const [buyerData, setBuyerData] = useState({});
    const [sellerData, setSellerData] = useState({});
    const [productData, setProductData] = useState({});

    const [visible, setVisible] = React.useState(false);

    const [loading, setLoading] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const [smsData, setSmsData] = useState([]);

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

    useEffect(() => {
        const sms = query(collection(db, "rooms", userinfo, "chatUsers", userinfo === data.buyerID ? data.sellerID : data.buyerID, "messages"));
        const unsub = onSnapshot(sms, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            setSmsData(data)
        });
        return unsub;
    }, [navigation]);


    const onDelete = (e) => {
        setVisible(false)
        e.preventDefault();
        Alert.alert(
            "Warning",
            "Are you sure you want to remove message?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        setLoading(true);
                        // for (let index = 0; index < smsData.length; index++) {
                        //     deleteDoc(doc(db, "rooms", userinfo, "chatUsers", userinfo === data.buyerID ? data.sellerID : data.buyerID, "messages", smsData[index].id))                     
                        // }
                        deleteDoc(doc(db, "rooms", userinfo, "chatUsers", userinfo === data.buyerID ? data.sellerID : data.buyerID))
                        Alert.alert("Successfully delete conversation")
                        setLoading(false);
                    }
                }
            ]
        );
    }


    return (
        <Provider>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                height: '100%',
                backgroundColor: COLOURS.backgroundLight
            }}>
                <Loader visible={loading} />
                <TouchableOpacity key={id} onPress={() => {
                    setVisible(false)
                    navigation.navigate('Message', {
                        buyerID: data.buyerID,
                        sellerID: data.sellerID,
                        prodID: data.prodID
                    })
                }
                }>
                    <View style={styles.messageBoxContainer}>
                        <View style={styles.avatarContainer}>
                            {
                                buyerData.photoURL === '' || sellerData.photoURL === '' ?
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
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            width: '50%'
                        }}>
                            <View>
                                <Menu
                                    visible={visible}
                                    style={{
                                        zIndex: 10,
                                        position: 'absolute',
                                        top: 40,
                                    }}
                                    contentStyle={{
                                        height: 60,
                                    }}
                                    onDismiss={closeMenu}
                                    anchor={
                                        <TouchableOpacity onPress={openMenu}>
                                            <MaterialCommunityIcons
                                                name="dots-horizontal"
                                                style={styles.headerIconStyle}
                                            />
                                        </TouchableOpacity>

                                    }>
                                    <Menu.Item onPress={onDelete} title="Delete" />
                                </Menu>
                            </View>
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
        </Provider>
    )
}

export default MessageCard

const styles = StyleSheet.create({
    messageBoxContainer: {
        width: '100%',
        paddingTop: 20,
        maxWidth: 400,
        paddingBottom: 20,
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
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    headerIconStyle: {
        fontSize: 25,
        color: COLOURS.backgroundDark,
    },
})