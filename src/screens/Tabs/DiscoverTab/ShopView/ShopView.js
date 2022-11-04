import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { useState } from 'react';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import moment from 'moment';
import { Avatar } from 'react-native-paper';

const ShopView = ({ navigation, route }) => {

    const { shopdata, shopID } = route.params;

    const [shopData, setShopData] = useState({});
    const [sellerData, setSellerData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "shops", shopID), (doc) => {
            setShopData(doc.data());
            getSellerData(doc.data());
        })
        return unsub;
    }, [navigation])

    const getSellerData = (data) => {
        onSnapshot(doc(db, 'users', data.sellerID), (doc) => {
            setSellerData(doc.data());
        })
    }

    useEffect(() => {
        setIsLoading(true);
        const q = query(collection(db, "feedproducts"), where("shopID", "==", shopID));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().productQuantity > 0) {
                    data.push({
                        id: doc.id,
                        data: doc.data()
                    })
                }
            });
            setProducts(data);
            setIsLoading(false);
        });
        setIsLoading(false);
        return unsubscribe;
    }, [navigation])


    const ProductCard = ({ data, productID }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("NewProductInfo", { productID: productID })}
            >
                <View style={styles.productImageContainer}>
                    <Image
                        source={{ uri: data.productImage }}
                        style={styles.imageStyle}
                    />
                </View>
                <Text
                    style={styles.imageTextStyle}
                >
                    {data.productName}
                </Text>
                <Text style={{
                    paddingLeft: 5
                }}>&#x20B1; {data.productPrice}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.root}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <View style={styles.headerContainer}>
                <View style={styles.subHeaderContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            style={styles.backIconContainer}
                        />
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{shopData.businessName}</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                }}>
                    <View style={{
                        marginTop: 10,
                        backgroundColor: COLOURS.white,
                        borderRadius: 10,
                        elevation: 5,
                        width: '100%',
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 20
                    }}
                    >
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '50%'
                        }}>
                            <Text style={{
                                fontSize: 15,
                                color: COLOURS.backgroundMedium,
                                fontWeight: 'bold'
                            }}>Shop ID</Text>
                            <Text style={{
                                marginTop: 10,
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>#{shopID.substring(0, 7)}</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '50%',
                        }}>
                            <Text style={{
                                fontSize: 15,
                                color: COLOURS.backgroundMedium,
                                fontWeight: 'bold'
                            }}>Date created</Text>
                            <Text style={{
                                marginTop: 10
                            }}>{moment(shopData.dateCreated).format("ll")}</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 10,
                        backgroundColor: COLOURS.white,
                        borderRadius: 10,
                        elevation: 5,
                        width: '100%',
                        padding: 10,
                        paddingVertical: 10,
                    }}
                    >
                        <View style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '100%',
                            flexDirection: 'row',
                            borderBottomColor: COLOURS.backgroundLight,
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            {
                                sellerData.photoURL === '' ?
                                    <Avatar.Text
                                        label={sellerData.fullname?.substring(0, 1)}
                                        size={50}
                                        style={{ color: COLOURS.white, backgroundColor: COLOURS.backgroundPrimary }}
                                    /> :
                                    <Avatar.Image
                                        source={{ uri: sellerData.photoURL }}
                                        size={80}
                                    />
                            }
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                marginLeft: 10,
                                color: COLOURS.backgroundPrimary
                            }}>{sellerData.fullname}</Text>
                        </View>
                        <View style={{
                            paddingHorizontal: 10,
                            marginTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>Phone</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>{sellerData.phone}</Text>
                                </View>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>Email</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>{sellerData.email}</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 20
                            }}>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>isVerified</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: shopData.isShopVerified === true ? COLOURS.green : COLOURS.red
                                    }}>{shopData.isShopVerified === true ? "Yes" : "No"}</Text>
                                </View>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>Detail Address</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>{sellerData.address}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginTop: 20,
                    paddingHorizontal: 10
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '600',
                        letterSpacing: 1
                    }}>List of products</Text>
                    <View style={styles.productContainer}>
                        {
                            products && products.length < 1 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }}>
                                    <Text>There is no products to show</Text>
                                </View> :
                                <>
                                    {isLoading ?
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }}>
                                            <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                                        </View>
                                        : <>
                                            {products.map(({ data, id }) => (
                                                <View key={id} style={styles.productCardContainer}>
                                                    <ProductCard data={data} key={data.id} productID={id} />
                                                </View>
                                            ))}
                                        </>
                                    }
                                </>
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ShopView

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
        backgroundColor: COLOURS.white,
        paddingBottom: 10
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: COLOURS.backgroundPrimary,
        elevation: 1
    },
    subHeaderContainer: {
        flexDirection: 'row',
    },
    backIconContainer: {
        fontSize: 30,
        color: COLOURS.white,
        padding: 12,
        width: 60,
        borderRadius: 12,
    },
    textContainer: {
        justifyContent: 'center',
        width: '80%'
    },
    textStyle: {
        fontSize: 20,
        textTransform: 'none',
        color: COLOURS.white,
        fontWeight: 'bold',
        textAlign: 'justify',
        letterSpacing: 1.5
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: COLOURS.white,
        marginBottom: 80,
        padding: 10,
    },
    productCardContainer: {
        width: '48%',
        marginVertical: 14,
        height: 180,
        borderRadius: 10,
        backgroundColor: COLOURS.dirtyWhiteBackground,
    },
    productImageContainer: {
        width: '100%',
        height: 100,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        maxHeight: 200,
        maxWidth: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    imageTextStyle: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '600',
        marginBottom: 5,
        //height: 30
    }
})