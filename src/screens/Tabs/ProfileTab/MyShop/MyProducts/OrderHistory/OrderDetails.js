import { ActivityIndicator, Alert, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS } from '../../../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../../../../../utils/firebase';
import moment from 'moment/moment';

const OrderDetails = ({ route, navigation }) => {

    const { userinfo, productData, productID } = route.params;

    const [buyerData, setBuyerData] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", productData.buyerID), (doc) => {
            setBuyerData(doc.data());
        })
        return unsub;
    }, [navigation])

    const acceptBtn = () => {
        Alert.alert(
            "Alert",
            "Are you sure you want to accept order?",
            [
                {
                    text: "No",
                    onPress: () => {
                    },
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: async () => {
                        const cityRef = doc(db, "Orders", productID);
                        await setDoc(cityRef, {
                            status: 'To Ship'
                        }, { merge: true }).then(() => {
                            Alert.alert("Successfuly accept order!")
                            navigation.goBack();
                        })
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.root}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
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
                            <Text style={styles.textStyle}> Order Details </Text>
                        </View>
                    </View>
                </View>
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
                            }}>Order ID</Text>
                            <Text style={{
                                marginTop: 10,
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>#{productID.substring(0, 7)}</Text>
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
                            }}>Ordered Date</Text>
                            <Text style={{
                                marginTop: 10
                            }}>{moment(productData.dateOrder).format("ll")}</Text>
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
                                buyerData.photoURL === '' ?
                                    <Avatar.Text
                                        label={buyerData.fullname.substring(0, 1)}
                                        size={50}
                                        style={{ color: COLOURS.white, backgroundColor: COLOURS.backgroundPrimary }}
                                    /> :
                                    <Avatar.Image
                                        source={{ uri: buyerData.photoURL }}
                                        size={80}
                                    />
                            }
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                marginLeft: 10,
                                color: COLOURS.backgroundPrimary
                            }}>{buyerData.fullname}</Text>
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
                                    }}>{buyerData.phone}</Text>
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
                                    }}>{buyerData.email}</Text>
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
                                    }}>Status</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: COLOURS.green
                                    }}>{productData.status}</Text>
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
                                    }}>{buyerData.address}</Text>
                                </View>
                            </View>
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
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{
                            marginTop: 10,
                            backgroundColor: COLOURS.white,
                            borderRadius: 10,
                            elevation: 5,
                            width: '100%',
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 20,
                            paddingHorizontal: 20
                        }}
                        >
                            <View style={{
                                width: '35%'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: COLOURS.backgroundMedium,
                                    fontWeight: 'bold'
                                }}>Product Name</Text>
                                <Text style={{
                                    marginTop: 10,
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>{productData.productName}</Text>
                            </View>
                            <View style={{
                                width: '30%',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: COLOURS.backgroundMedium,
                                    fontWeight: 'bold'
                                }}>Qty</Text>
                                <Text style={{
                                    marginTop: 10
                                }}>{productData.quantity}x</Text>
                            </View>
                            <View style={{
                                width: '35%'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: COLOURS.backgroundMedium,
                                    fontWeight: 'bold'
                                }}>Price</Text>
                                <Text style={{
                                    marginTop: 10
                                }}>&#x20B1;{productData.quantity * productData.productPrice}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {
                productData.status === "Ordered" ?
                    <View style={styles.footerContainer}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                width: '50%',
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity style={{
                                    padding: 7,
                                    borderColor: COLOURS.backgroundPrimary,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    width: 90,
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        color: COLOURS.backgroundPrimary,
                                        fontWeight: 'bold'
                                    }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: '50%',
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity style={{
                                    padding: 10,
                                    backgroundColor: COLOURS.backgroundPrimary,
                                    borderRadius: 5,
                                    width: 90,
                                    alignItems: 'center'
                                }}
                                    onPress={acceptBtn}
                                >
                                    <Text style={{
                                        color: COLOURS.white,
                                        fontWeight: 'bold'
                                    }}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    : ""
            }
        </View >
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
        backgroundColor: COLOURS.backgroundLight
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
    paymentMethodContainer: {
        paddingHorizontal: 10,
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
    footerContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLOURS.dirtyWhiteBackground
    },
})