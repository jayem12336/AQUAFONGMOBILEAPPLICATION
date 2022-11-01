import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOURS } from '../../../utils/database/Database';

const NotificationProduct = ({ data, id, navigation }) => {

    return (
        <View style={styles.notifContainer}>
            <View style={styles.notifCardContainer}>
                <View style={styles.cardContainer}>
                    <Image source={{ uri: data.productImage }} alt="Profile"
                        style={styles.notifImage}
                    />
                    <View style={styles.notifTextContainer}>
                        <Text style={styles.textStatus}>
                            Your order {data.productName} is out of stock
                        </Text>
                        <Text>
                            The seller is preparing to ship your order
                        </Text>
                    </View>
                    <View style={styles.fixedIconContainer}>
                        <FontAwesome
                            name="circle"
                            style={[styles.fixedIconStyle, { color: COLOURS.red }]}
                        />
                    </View>
                </View>
            </View>
        </View >
    )
}

export default NotificationProduct

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