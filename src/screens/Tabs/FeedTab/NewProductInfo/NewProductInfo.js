import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../../../../components/Loader/Loader';
import { COLOURS } from '../../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating } from 'react-native-ratings';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';

const NewProductInfo = ({ navigation, route }) => {

    const { productID } = route.params;

    const [loading, setLoading] = useState(false);
    const [buyNowButton, setBuyNowButton] = useState(false);

    const [productInfo, setProductInfo] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "feedproducts", productID), (doc) => {
            console.log("Current data: ", doc.data());
            setProductInfo(doc.data());
        })
        return unsub;
    }, [navigation])

    console.log(productInfo)
    return (
        <View style={styles.root}>
            <Loader visible={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View
                        style={{ width: '100%' }}>
                        <View style={styles.headerContainer}>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons
                                        onPress={() => navigation.goBack()}
                                        name="chevron-left"
                                        style={styles.backIconStyle}
                                    />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.myShopText}> Product Info </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <Image source={{ uri: productInfo.productImage }} style={styles.imageStyle} />
                        </View>
                        <View style={{
                            marginTop: 10,
                            paddingLeft: 5
                        }}>
                            <Text style={styles.textStyle}>
                                {productInfo.productName}
                            </Text>
                            <Text style={styles.priceStyle}>
                                &#x20B1;{productInfo.productPrice}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Rating
                                //onFinishRating={(rating) => { Alert.alert('Star Rating: ' + JSON.stringify(rating)); }}
                                imageSize={28}
                                startingValue={productInfo.rating}
                                readonly
                                style={{ paddingTop: 10 }}
                            />
                        </View>
                    </View>
                    {
                        buyNowButton === false ?
                            <View style={{ paddingHorizontal: 16, marginTop: 6, }}>
                                <View style={styles.addressContainer}>
                                    <View style={styles.addressStyle}>
                                        <View style={styles.addressIconContainer}>
                                            <Entypo name="location-pin" style={{ fontSize: 16, color: COLOURS.blue, }} />
                                        </View>
                                        <Text>Concepcion,{'\n'}Bustos, Bulacan</Text>
                                    </View>
                                    <Entypo name="chevron-right" style={{ fontSize: 22, color: COLOURS.backgroundDark, }} />
                                </View><View>
                                    <Text>
                                        Discount Rate 2%~ &#x20B1;{productInfo.productPrice / productInfo.productPrice} (&#x20B1;
                                        {productInfo.productPrice + productInfo.productPrice / 20})
                                    </Text>
                                </View>
                            </View>
                            :
                            <View style={styles.quantityView}>
                                <View style={styles.quantitySubView}>
                                    <View style={styles.imagesContainer}>
                                        <Image source={{ uri: productInfo.productImage }} alt="Product Image" style={styles.productImageStyle} />
                                        <Image source={{ uri: productInfo.productImage }} alt="Product Image" style={styles.productImageStyle} />
                                        <Image source={{ uri: productInfo.productImage }} alt="Product Image" style={styles.productImageStyle} />
                                    </View>
                                    <View style={styles.headquantityContainer}>
                                        <View style={styles.quantityTextContainer}>
                                            <Text>Quantity</Text>
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
                                        </View>
                                    </View>
                                </View>
                            </View>
                    }
                </SafeAreaView>
            </ScrollView>
            {
                buyNowButton === false ?
                    <View style={styles.footerContainer}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.buttonContainer}>
                                <View style={styles.buttonSubContainer}>
                                    <TouchableOpacity>
                                        <Ionicons name="mail-outline" style={styles.shoppingBagIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons name="cart" style={styles.shoppingBagIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buyNowSubContainer}>
                                    <TouchableOpacity
                                        onPress={() => setBuyNowButton(true)}
                                        style={styles.buttonStyle}
                                    >
                                        <Text style={styles.buttonTextStyle}>
                                            Buy now
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View> :
                    <View style={styles.footerContainer}>
                        <View style={styles.buyNowContainer2}>
                            <View style={styles.buyNowSubContainer2}>
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate('Purchase'), setBuyNowButton(false) }}
                                    style={styles.buyBtnContainer}
                                >
                                    <Text style={styles.buyBtnText}>
                                        Buy now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            }
        </View>

    )
}

export default NewProductInfo

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        backgroundColor: COLOURS.white,
        width: '100%',
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2
    },
    backIconStyle: {
        fontSize: 20,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 12,
    },
    myShopText: {
        fontSize: 20,
        textTransform: 'uppercase',
        marginLeft: 5,
        letterSpacing: 1
    },
    container: {
        width: '100%',
        borderColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    imageStyle: {
        width: '100%',
        maxWidth: 500,
        height: 200,
        borderRadius: 20
    },
    textStyle: {
        fontSize: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 5
    },
    priceStyle: {
        fontSize: 15,
        letterSpacing: 1,
        marginTop: 5
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
    buttonContainer: {
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonStyle: {
        backgroundColor: COLOURS.white,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    buttonIconsStyle: {
        height: '90%',
        backgroundColor: COLOURS.blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.black,
        textTransform: 'uppercase',
    },
    shoppingBagIcon: {
        fontSize: 25,
        color: COLOURS.black,
        borderRadius: 10,
        marginLeft: 5,
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
    buyNowContainer: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyNowSubContainer: {
        width: '60%',
        height: '100%',
        marginLeft: 20
    },
    buyNowContainer2: {
        width: '80%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.white
    },
    buyNowSubContainer2: {
        height: '100%',
        backgroundColor: COLOURS.white
    },
    buyBtnContainer: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyBtnText: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.black,
        textTransform: 'uppercase',
    },
    headquantityContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20
    },
    quantityTextContainer: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    productImageStyle: {
        resizeMode: 'contain',
        height: 80,
        width: 80,
        borderRadius: 60
    },
    imagesContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20
    },
    quantityView: {
        padding: 10,
        backgroundColor: COLOURS.backgroundPrimary,
        height: 300,
    },
    quantitySubView: {
        width: '100%',
        backgroundColor: COLOURS.white
    },
    buttonSubContainer: {
        width: '30%',
        height: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    footerContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLOURS.dirtyWhiteBackground
    },
    btnContainer2: {
        alignSelf: 'center',
        backgroundColor: COLOURS.backgroundLight,
        width: '100%',
        padding: 15,
        borderRadius: 2
    },
    btnText2: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.black,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
})