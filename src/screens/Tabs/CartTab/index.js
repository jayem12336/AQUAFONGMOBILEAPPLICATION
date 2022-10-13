import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Items, COLOURS } from '../../../utils/database/Database';
import { Checkbox } from 'react-native-paper';
import { db } from '../../../utils/firebase';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import RenderProduct from './RenderProduct/RenderProduct';


const CartTab = ({ navigation, route }) => {
    const { userinfo } = route.params;
    const [checked, setChecked] = useState(false);
    const [product, setProduct] = useState();
    const [total, setTotal] = useState(0);

    const [userData, setUserData] = useState({})
    const [cartProducts, setCartProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", userinfo), (doc) => {
            setUserData(doc.data());
        })
        return unsub;
    }, [navigation])

    useEffect(() => {
        setIsLoading(true);
        const q = query(collection(db, "Mycart", userinfo, "CartOrder"), where("buyerID", "==", userinfo));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            const total = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                })
                total.push({
                    priceTotal: doc.data().productPrice * doc.data().quantity,
                })
            });
            setCartProducts(data);
            getTotal(total)
            setIsLoading(false);
        });
        return unsubscribe;
    }, [navigation]);

    //get total price of all items in the cart
    const getTotal = data => {
        let total = 0;
        for (let index = 0; index < data.length; index++) {
            let productPrice = data[index].priceTotal;
            total += productPrice;
        }
        setTotal(total);
    };

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            style={styles.backIconStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTextStyle}>
                        My Order Details
                    </Text>
                    <View></View>
                </View>
                <Text style={styles.headerCapstionStyle}>
                    My Cart
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.headerSubCapstionStyle}>
                        Select All
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    {
                        isLoading === true ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
                                <ActivityIndicator size={60} color={COLOURS.backgroundPrimary} />
                            </View> :
                            <>
                                {
                                    cartProducts.map(({ data, id }) => (
                                        <View
                                            key={id}
                                            style={styles.productRoot}>
                                            <RenderProduct data={data} check={checked} userid={userData.ownerId} id={id} />
                                        </View>
                                    ))
                                }
                            </>
                    }
                </View>
                <View>
                    <View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
                        <Text style={styles.deliveryTextStyle}>
                            Delivery Location
                        </Text>
                        <View style={styles.container}>
                            <View style={styles.subContainer}>
                                <View style={styles.truckIconContainer}>
                                    <MaterialCommunityIcons
                                        name="truck-delivery-outline"
                                        style={styles.truckIconStyle}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.streetStyle}>
                                        Address
                                    </Text>
                                    <Text style={styles.addressStyle}>
                                        {userData.address}
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" style={styles.iconRightStyle}
                            />
                        </View>
                    </View>
                    <View style={styles.paymentMethodContainer}>
                        <Text style={styles.paymentMethodStyle}>
                            Payment Method
                        </Text>
                        <View style={styles.paymentSubContainer}>
                            <View style={styles.paymentAlignment}>
                                <View style={styles.methodContainer}>
                                    <Text style={styles.methodTextStyle}>
                                        GCASH
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.methodCaption}>
                                        Gcash
                                    </Text>
                                    <Text style={styles.methodNumber}>
                                        {userData.phone}
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" style={styles.iconRightStyle} />
                        </View>
                    </View>
                    <View style={styles.orderContainer}>
                        <Text style={styles.orderSubContainer}>
                            Order Info
                        </Text>
                        <View style={styles.subTotalContainer}>
                            <Text style={styles.subTotalText}>
                                Subtotal
                            </Text>
                            <Text style={styles.subTotal}>
                                &#x20B1;{total}.00
                            </Text>
                        </View>
                        <View style={styles.shippingContainer}>
                            <Text style={styles.shippingText}>
                                Shipping Tax
                            </Text>
                            <Text style={styles.shipping}>
                                &#x20B1;{total / 20}
                            </Text>
                        </View>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>
                                Total
                            </Text>
                            <Text style={styles.total}>
                                &#x20B1;{total + total / 20}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => (total != 0 ? checkOut() : null)}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                        CHECKOUT ALL (&#x20B1;{total + total / 20} )
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartTab;

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backIconStyle: {
        fontSize: 18,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 12,
    },
    headerTextStyle: {
        fontSize: 16,
        color: COLOURS.black,
        fontWeight: '400',
    },
    headerCapstionStyle: {
        fontSize: 20,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        paddingTop: 20,
        paddingLeft: 16,
        marginBottom: 10,
    },
    headerSubCapstionStyle: {
        fontSize: 15,
        color: COLOURS.black,
        fontWeight: '400',

    },
    deliveryTextStyle: {
        fontSize: 16,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 20,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subContainer: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
    },
    truckIconContainer: {
        color: COLOURS.blue,
        backgroundColor: COLOURS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
        marginRight: 18,
    },
    truckIconStyle: {
        fontSize: 18,
        color: COLOURS.blue,
    },
    streetStyle: {
        fontSize: 14,
        color: COLOURS.black,
        fontWeight: '500',
    },
    addressStyle: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '400',
        lineHeight: 20,
        opacity: 0.5,
    },
    iconRightStyle: {
        fontSize: 22,
        color: COLOURS.black
    },
    paymentMethodContainer: {
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    paymentMethodStyle: {
        fontSize: 16,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 20,
    },
    paymentSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paymentAlignment: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
    },
    methodContainer: {
        color: COLOURS.blue,
        backgroundColor: COLOURS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
        marginRight: 18,
    },
    methodTextStyle: {
        fontSize: 10,
        fontWeight: '900',
        color: COLOURS.blue,
        letterSpacing: 1,
    },
    methodCaption: {
        fontSize: 14,
        color: COLOURS.black,
        fontWeight: '500',
    },
    methodNumber: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '400',
        lineHeight: 20,
        opacity: 0.5,
    },
    orderContainer: {
        paddingHorizontal: 16,
        marginTop: 40,
        marginBottom: 80,
    },
    orderSubContainer: {
        fontSize: 16,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 20,
    },
    subTotalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    subTotalText: {
        fontSize: 12,
        fontWeight: '400',
        maxWidth: '80%',
        color: COLOURS.black,
        opacity: 0.5,
    },
    subTotal: {
        fontSize: 12,
        fontWeight: '400',
        color: COLOURS.black,
        opacity: 0.8,
    },
    shippingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 22,
    },
    shippingText: {
        fontSize: 12,
        fontWeight: '400',
        maxWidth: '80%',
        color: COLOURS.black,
        opacity: 0.5,
    },
    shipping: {
        fontSize: 12,
        fontWeight: '400',
        color: COLOURS.black,
        opacity: 0.8,
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalText: {
        fontSize: 12,
        fontWeight: '400',
        maxWidth: '80%',
        color: COLOURS.black,
        opacity: 0.5,
    },
    total: {
        fontSize: 18,
        fontWeight: '500',
        color: COLOURS.black,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        width: '86%',
        height: '90%',
        backgroundColor: COLOURS.backgroundPrimary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.white,
        textTransform: 'uppercase',
    },

    //RenderProducts Style
    productRoot: {
        width: '100%',
        height: 100,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        backgroundColor: COLOURS.dirtyWhiteBackground
    },
    productImageContainer: {
        width: '30%',
        height: 100,
        marginRight: 22,
        height: 100,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    productImageStyle: {
        width: '100%',
        height: 80,
        resizeMode: 'stretch'
    },
    producSubContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-around',
    },
    productNameStyle: {
        fontSize: 14,
        maxWidth: '100%',
        color: COLOURS.black,
        fontWeight: '600',
        letterSpacing: 1,
    },
    productPriceStyle: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.6,
    },
    productPriceText: {
        fontSize: 14,
        fontWeight: '400',
        maxWidth: '85%',
        marginRight: 4,
    },
    productQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantitySubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    plusIconContainer: {
        borderRadius: 100,
        padding: 4,
        borderWidth: 1,
        borderColor: COLOURS.backgroundMedium,
        opacity: 0.5,
    },
    iconStyle: {
        fontSize: 16,
        color: COLOURS.backgroundDark,
    },
    deleteIcon: {
        fontSize: 16,
        color: COLOURS.backgroundDark,
        backgroundColor: COLOURS.backgroundLight,
        padding: 8,
        borderRadius: 100,
    },
    transactButton: {
        width: 80,
        height: 25,
        backgroundColor: COLOURS.blue,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactText: {
        color: COLOURS.white,
        textTransform: 'uppercase',
        fontSize: 10
    }
})