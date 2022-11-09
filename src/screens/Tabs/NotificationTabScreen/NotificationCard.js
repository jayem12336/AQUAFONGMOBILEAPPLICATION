import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOURS } from '../../../utils/database/Database';
import { useNavigation } from '@react-navigation/native';

const NotificationCard = ({ data, id }) => {

    const navigation = useNavigation();


    const onPressBtn = () => {
        navigation.navigate('OrderDetails', {
            productData: data,
            productID: id,
            location: "Notification"
        })
    }
    return (
        <TouchableOpacity onPress={onPressBtn}>
            <View style={styles.notifContainer}>
                <View style={styles.notifCardContainer}>
                    <View style={styles.cardContainer}>
                        <Image source={{ uri: data.productImage }} alt="Profile"
                            style={styles.notifImage}
                        />
                        <View style={styles.notifTextContainer}>
                            {
                                data.status === "To Ship" ?
                                    <>
                                        <Text style={styles.textStatus}>
                                            Your order {data.productName} has been packed
                                        </Text>
                                        <Text>
                                            The seller is preparing to ship your order
                                        </Text>
                                    </>
                                    : data.status === "Delivered" ?
                                        <>
                                            <Text style={styles.textStatus}>
                                                Your order {data.productName} has been delivered
                                            </Text>
                                            <Text>
                                                The seller successfully delivered your order
                                            </Text>
                                        </> : <>
                                            <Text style={styles.textStatus}>
                                                Your order {data.productName} has been cancelled
                                            </Text>
                                            <Text>
                                                You successfully cancelled your order
                                            </Text>
                                        </>
                            }
                            <View style={{
                                marginTop: 10,
                            }}>
                                <Text style={{
                                    fontWeight: 'bold'
                                }}>click here for more information</Text>
                            </View>
                        </View>
                        <View style={styles.fixedIconContainer}>
                            <FontAwesome
                                name="circle"
                                style={[styles.fixedIconStyle, { color: data.status === "To Ship" ? COLOURS.orange : data.status === "Delivered" ? COLOURS.green : COLOURS.red }]}
                            />
                        </View>
                    </View>
                </View>
            </View >
        </TouchableOpacity>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    notificationTitle: {
        fontSize: 17,
        letterSpacing: 1,
        marginTop: 5
    },
    notifContainer: {
        width: '100%',
        maxWidth: 400,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    notifCardContainer: {
        width: '95%',
        paddingTop: 16,
        maxWidth: 400,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    notifImage: {
        width: 80,
        height: '100%',
        maxHeight: 100,
        borderRadius: 15
    },
    notifTextContainer: {
        paddingHorizontal: 10,
        width: 250,
        marginTop: 20,
    },
    textStatus: {
        fontWeight: '500',
        letterSpacing: .5
    },
    fixedIconContainer: {
        position: 'absolute',
        top: 2,
        right: 2
    },
    fixedIconStyle: {
        fontSize: 12,
        marginRight: 6,
    }
})