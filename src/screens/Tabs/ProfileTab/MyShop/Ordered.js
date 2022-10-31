import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS } from '../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import AllOrders from './MyProducts/OrderHistory/AllOrders';
const Ordered = ({ navigation, route }) => {

    const { userinfo } = route.params;

    const [isLoading, setIsLoading] = useState(false)

    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const q = query(collection(db, "Orders"), where("sellerID", "==", userinfo), where("status", "==", "Ordered"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            setOrderProducts(data);
            setIsLoading(false);
        });
        return unsubscribe;
    }, [navigation])

    return (
        <View style={styles.root}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <View style={styles.subHeaderContainer}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                onPress={() => navigation.goBack()}
                                name="chevron-left"
                                style={styles.backIconContainer}
                            />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}> Pending Orders </Text>
                        </View>
                    </View>
                </View>
                {
                    orderProducts && orderProducts.length < 1 ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                            <Text>There is no pending order</Text>
                        </View> :
                        <>
                            {isLoading ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                                    <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                                </View>
                                : <>
                                    {orderProducts.map(({ data, id }) => (
                                        <View style={{
                                            paddingHorizontal: 5,
                                            paddingVertical: 5,
                                        }}
                                            key={id}
                                        >
                                            <AllOrders data={data} location={"pendingOrder"} id={id} />
                                        </View>
                                    ))}
                                </>
                            }
                        </>
                }
            </ScrollView>
        </View>
    )
}

export default Ordered

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        backgroundColor: COLOURS.white
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 5,
        backgroundColor: COLOURS.backgroundPrimary,
    },
    subHeaderContainer: {
        flexDirection: 'row',
    },
    backIconContainer: {
        fontSize: 30,
        color: COLOURS.white,
        padding: 12,
        borderRadius: 12,
    },
    textContainer: {
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 20,
        textTransform: 'none',
        marginLeft: 5,
        letterSpacing: 1.5,
        color: COLOURS.white,
        fontWeight: 'bold'
    },
})