import React, { useEffect, useState } from 'react'

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
    FlatList,
    Image,
    Dimensions,
    Animated,
    ToastAndroid
} from 'react-native';

import { COLOURS, Items } from '../../../../utils/database/Database';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductInfo = ({ route, navigation }) => {

    const { productID } = route.params;

    const [product, setProduct] = useState({})

    const width = Dimensions.get('window').width;

    const scrollX = new Animated.Value(0);

    let position = Animated.divide(scrollX, width);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        })

        return unsubscribe;
    }, [navigation])


    //get ProductFish Data
    const getDataFromDB = async () => {
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].id == productID) {
                await setProduct(Items[index])
                return;
            }

        }
    }

    //ProductFish horizontal scroll product card
    const renderProduct = ({ item, index }) => {
        return (
            <View style={{
                width: width,
                height: 240,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20
            }}>
                <Image source={item} style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain'
                }} />
            </View>
        )
    }

    //Logic for add to cart
    const addToCart = async (id) => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    "Item Added Successfully to cart", ToastAndroid.SHORT,
                );
                navigation.navigate('Home');
            } catch (error) {
                return error;
            }
        } else {
            let array = [];
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    "Item Added Successfully to cart", ToastAndroid.SHORT,
                );
                navigation.navigate('Home');
            } catch (error) {
                return error;
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLOURS.backgroundLight}
                barStyle="dark-content"
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <View style={styles.backIconContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                            <Entypo
                                name="chevron-left"
                                style={styles.backIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={product.productImageList ? product.productImageList : null}
                        horizontal
                        renderItem={renderProduct}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        snapToInterval={width}
                        bounces={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false },
                        )}
                    />
                    <View style={styles.imageListContainer}>
                        {product.productImageList
                            ? product.productImageList.map((data, index) => {
                                let opacity = position.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [0.2, 1, 0.2],
                                    extrapolate: 'clamp',
                                });
                                return (
                                    <Animated.View
                                        key={index}
                                        style={{
                                            width: '16%',
                                            height: 2.4,
                                            backgroundColor: COLOURS.black,
                                            opacity,
                                            marginHorizontal: 4,
                                            borderRadius: 100,
                                        }}></Animated.View>
                                );
                            })
                            : null}
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16, marginTop: 6, }}>
                    <View style={styles.shoppingContainer}>
                        <Entypo
                            name="shopping-cart"
                            style={styles.shoppingCartIconStyle}
                        />
                        <Text style={styles.textShoppingCartStyle}>
                            Shopping
                        </Text>
                    </View>
                    <View style={styles.productNameContainer}>
                        <Text style={styles.productNameStyle}>
                            {product.productName}
                        </Text>
                        <Ionicons
                            name="link-outline"
                            style={styles.linkIconStyle}
                        />
                    </View>
                    <Text style={styles.productDescriptionStyle}>
                        {product.description} Optional
                    </Text>
                    <View style={styles.addressContainer}>
                        <View style={styles.addressStyle}>
                            <View style={styles.addressIconContainer}>
                                <Entypo name="location-pin" style={{ fontSize: 16, color: COLOURS.blue, }} />
                            </View>
                            <Text> Concepcion,{'\n'}Bustos, Bulacan</Text>
                        </View>
                        <Entypo name="chevron-right" style={{ fontSize: 22, color: COLOURS.backgroundDark, }} />
                    </View>
                    <View>
                        <Text style={styles.productPriceStyle}>
                            &#x20B1; {product.productPrice}.00
                        </Text>
                        <Text>
                            Discount Rate 2%~ &#x20B1;{product.productPrice / 20} (&#x20B1;
                            {product.productPrice + product.productPrice / 20})
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => product.isAvailable ? addToCart(product.id) : null}
                        style={styles.buttonStyle}
                    >
                    <Text style={styles.buttonTextStyle}>
                        {product.isAvailable ? 'Add to cart' : 'Not Avialable'}
                    </Text>
                </TouchableOpacity>
        </View>
            </ScrollView >
        </View >
    )
}

export default ProductInfo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
    },
    headerContainer: {
        width: '100%',
        backgroundColor: COLOURS.backgroundLight,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    backIconContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingLeft: 16,
    },
    backIconStyle: {
        fontSize: 18,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.white,
        borderRadius: 10,
    },
    imageListContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 32,
    },
    shoppingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 14,
    },
    shoppingCartIconStyle: {
        fontSize: 18,
        color: COLOURS.blue,
        marginRight: 6,
    },
    textShoppingCartStyle: {
        fontSize: 18,
        color: COLOURS.blue,
        marginRight: 6,
    },
    productNameContainer: {
        flexDirection: 'row',
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productNameStyle: {
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginVertical: 4,
        color: COLOURS.black,
        maxWidth: '84%',
    },
    linkIconStyle: {
        fontSize: 24,
        color: COLOURS.blue,
        backgroundColor: COLOURS.blue + 10,
        padding: 8,
        borderRadius: 100,
    },
    productDescriptionStyle: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '400',
        letterSpacing: 1,
        opacity: 0.5,
        lineHeight: 20,
        maxWidth: '85%',
        maxHeight: 44,
        marginBottom: 18,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 14,
        borderBottomColor: COLOURS.backgroundLight,
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    addressStyle: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
    },
    addressIconContainer: {
        color: COLOURS.blue,
        backgroundColor: COLOURS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 100,
        marginRight: 10,
    },
    productPriceStyle: {
        fontSize: 18,
        fontWeight: '500',
        maxWidth: '85%',
        color: COLOURS.black,
        marginBottom: 4,
    },
    buttonContainer: {
        position: 'relative',
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    buttonStyle: {
        width: '86%',
        height: '90%',
        backgroundColor: COLOURS.blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.white,
        textTransform: 'uppercase',
    }
})