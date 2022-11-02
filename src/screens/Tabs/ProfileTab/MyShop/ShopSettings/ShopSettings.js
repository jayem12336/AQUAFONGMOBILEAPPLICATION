import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOURS } from '../../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const ShopSettings = ({ navigation, route }) => {

    const { shopID, shopDetails } = route.params;

    return (
        <View style={styles.root}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <ScrollView>
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
                            <Text style={styles.textStyle}> Shop settings </Text>
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
                            }}>Date Created</Text>
                            <Text style={{
                                marginTop: 10
                            }}>{moment(shopDetails.dateCreated).format("ll")}</Text>
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
                            borderBottomColor: COLOURS.backgroundLight,
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            <Image
                                source={{ uri: shopDetails.imageShop }}
                                style={{
                                    height: 120,
                                    width: 200,
                                    borderRadius: 10
                                }}
                            />
                            <View style={{
                                marginTop: 10
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    color: COLOURS.backgroundPrimary
                                }}>{shopDetails.businessName}</Text>
                            </View>
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
                                    }}>Seller Contact</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>{shopDetails.contactNo}</Text>
                                </View>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>Seller FullName</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>{shopDetails.fullName}</Text>
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
                                    }}>Is Shop Verified</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: shopDetails.isShopVerified === true ? COLOURS.green : COLOURS.red
                                    }}>{shopDetails.isShopVerified === true ? "Verified" : "Not Verified"}</Text>
                                </View>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>Shop Location</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>{shopDetails.shopLocation}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={{
                    justifyContent: 'center'
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            padding: 10,
                            backgroundColor: COLOURS.backgroundPrimary,
                            borderRadius: 5,
                            width: 120,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => navigation.navigate('EditShopSettings', {
                            shopID: shopID,
                            shopDetails: shopDetails
                        })}
                        >
                            <Text style={{
                                color: COLOURS.white,
                                fontWeight: 'bold'
                            }}>Edit Shop</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ShopSettings

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
        backgroundColor: COLOURS.backgroundLight,
        paddingBottom: 10
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: COLOURS.white,
        elevation: 1
    },
    subHeaderContainer: {
        flexDirection: 'row',
    },
    backIconContainer: {
        fontSize: 30,
        color: COLOURS.backgroundPrimary,
        padding: 12,
        borderRadius: 12,
    },
    textContainer: {
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 22,
        textTransform: 'none',
        marginLeft: 5,
        letterSpacing: 1.5,
        color: COLOURS.black,
        fontWeight: 'bold'
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