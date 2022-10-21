import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../../../utils/database/Database'
import { useNavigation } from '@react-navigation/native'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../../../../utils/firebase'

const AllOrders = ({ data, location, id }) => {

    const navigation = useNavigation();

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
                        const cityRef = doc(db, "Orders", id);
                        await setDoc(cityRef, {
                            status: 'To Ship'
                        }, { merge: true }).then(() => {
                            Alert.alert("Successfuly accept order!")
                        })
                    }
                }
            ]
        );
    }

    return (
        <View style={{
            marginTop: 5,
            backgroundColor: COLOURS.white,
            borderRadius: 10,
            elevation: 5,
            width: '100%',
            padding: 10
        }}
        >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                    Order No:{id.substring(0, 7)}
                </Text>
                <Text style={{
                    fontSize: 13,
                    color: COLOURS.backgroundMedium,
                    alignItems: 'center'
                }}>
                    05-12-2022
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                marginTop: 10
            }}>
                <Text style={{
                    fontSize: 15,
                    color: COLOURS.backgroundMedium
                }}>
                    Tracking number:
                </Text>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginLeft: 10
                }}>
                    2025532125
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 7
            }}>
                <View style={{
                    flexDirection: 'row',
                }}
                >
                    <Text style={{
                        fontSize: 15,
                        color: COLOURS.backgroundMedium
                    }}>
                        Quantity:
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>
                        {data.quantity}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: COLOURS.backgroundMedium
                    }}>
                        Total Amount:
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>
                        &#x20B1; {data.productPrice * data.quantity}
                    </Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10
            }}>
                <TouchableOpacity style={{
                    padding: 7,
                    borderColor: COLOURS.black,
                    borderWidth: 1,
                    borderRadius: 18,
                    width: 90,
                    alignItems: 'center'
                }}
                    onPress={() => navigation.navigate('OrderDetails', {
                        productData: data,
                        productID: id
                    })}
                >
                    <Text>Details</Text>
                </TouchableOpacity>
                {data.status != "To Ship" && location === "myOrders" ? <TouchableOpacity style={{
                    padding: 7,
                    borderColor: COLOURS.black,
                    borderWidth: 1,
                    borderRadius: 18,
                    width: 90,
                    alignItems: 'center'
                }}
                    onPress={() => navigation.navigate('OrderDetails', {
                        productData: data,
                        productID: id,
                        location: location
                    })}
                >
                    <Text>Cancel</Text>
                </TouchableOpacity> : ''}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: COLOURS.backgroundMedium
                    }}>
                        Status:
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 10,
                        color: data.status === "Cancelled"? COLOURS.red : data.status === "To Ship" ? COLOURS.orange : COLOURS.green
                    }}>
                        {data.status}
                    </Text>
                </View>
            </View>
            {
                location === "pendingOrder" ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10
                    }}>
                        <TouchableOpacity style={{
                            padding: 7,
                            borderColor: COLOURS.green,
                            borderWidth: 1,
                            borderRadius: 18,
                            width: 90,
                            alignItems: 'center'
                        }}
                            onPress={acceptBtn}
                        >
                            <Text>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            padding: 7,
                            borderColor: COLOURS.red,
                            borderWidth: 1,
                            borderRadius: 18,
                            width: 90,
                            alignItems: 'center'
                        }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View> : ""
            }
        </View>
    )
}

export default AllOrders

const styles = StyleSheet.create({})