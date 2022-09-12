import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Items, COLOURS } from '../../../utils/database/Database';
import { Checkbox } from 'react-native-paper';


const CartTab = ({ navigation }) => {

    const [checked, setChecked] = React.useState(false);
    const [product, setProduct] = useState();
    const [total, setTotal] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    //get data from local DB by ID
    const getDataFromDB = async () => {
        let items = await AsyncStorage.getItem('cartItems');
        items = JSON.parse(items);
        let productData = [];
        if (items) {
            Items.forEach(data => {
                if (items.includes(data.id)) {
                    productData.push(data);
                    return;
                }
            });
            setProduct(productData);
            getTotal(productData);
        } else {
            setProduct(false);
            getTotal(false);
        }
    };

    //get total price of all items in the cart
    const getTotal = productData => {
        let total = 0;
        for (let index = 0; index < productData.length; index++) {
            let productPrice = productData[index].productPrice;
            total = total + productPrice;
        }
        setTotal(total);
    };

    //remove data from Cart

    const removeItemFromCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;
            for (let index = 0; index < array.length; index++) {
                if (array[index] == id) {
                    array.splice(index, 1);
                }

                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                getDataFromDB();
            }
        }
    };

    //checkout

    const checkOut = async () => {
        try {
            await AsyncStorage.removeItem('cartItems');
        } catch (error) {
            return error;
        }

        ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);

        navigation.navigate('Home');
    };

    const renderProducts = (data, index) => {
        return (
            <View
                key={data.id}
                style={styles.productRoot}>
                <View style={{
                    position: 'relative',
                    paddingBottom: 68,
                }}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.productImageContainer} onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}>
                    <Image
                        source={data.productImage}
                        style={styles.productImageStyle}
                    />
                </TouchableOpacity>
                <View style={styles.producSubContainer}>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent:'space-between',marginBottom: 5}}>
                            <Text style={styles.productNameStyle}>
                                {data.productName}
                            </Text>
                            <TouchableOpacity style={styles.transactButton}>
                                <Text style={styles.transactText}>
                                    Transact
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.productPriceStyle}>
                            <Text style={styles.productPriceText}>
                                &#x20B1;{data.productPrice}
                            </Text>
                            <Text>
                                (&#x20B1;
                                {data.productPrice + data.productPrice / 20})
                            </Text>
                        </View>
                    </View>
                    <View style={styles.productQuantityContainer}>
                        <View style={styles.quantitySubContainer}>
                            <View
                                style={[styles.plusIconContainer, { marginRight: 20 }]}>
                                <MaterialCommunityIcons
                                    name="minus"
                                    style={styles.iconStyle}
                                />
                            </View>
                            <Text>1</Text>
                            <View style={[styles.plusIconContainer, { marginLeft: 20 }]}>
                                <MaterialCommunityIcons
                                    name="plus"
                                    style={styles.iconStyle}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
                            <MaterialCommunityIcons
                                name="delete-outline"
                                style={styles.deleteIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
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
                    {product ? product.map(renderProducts) : null}
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
                                        2 Conception Street
                                    </Text>
                                    <Text style={styles.addressStyle}>
                                        Bustos Bulacan
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
                                        ******9092
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
                        CHECKOUT (&#x20B1;{total + total / 20} )
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
        backgroundColor: COLOURS.blue,
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
        color:COLOURS.white,
        textTransform: 'uppercase',
        fontSize: 10
    }

})