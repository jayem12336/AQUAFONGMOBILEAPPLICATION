import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Image
} from 'react-native'
import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { COLOURS } from '../../../utils/database/Database';
import SearchBar from '../../../components/Searchbar/SearchBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

const DiscoverTab = () => {

    const [value, setValue] = useState();

    const updateSearch = (value) => {

    }
    return (
        <View style={styles.root}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
            <View style={styles.headerContainer}>
                <SearchBar
                    value={value}
                    updateSearch={updateSearch}
                />
                <TouchableOpacity>
                    <MaterialCommunityIcons name="cart" style={styles.shoppingBagIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <IonIcons name="mail-outline" style={styles.shoppingBagIcon} />
                </TouchableOpacity>
            </View>
            <MapView
                style={styles.map}
                region={{
                    latitude: 14.937990185669209,
                    longitude: 120.92577185198749,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 14.93840483562316,
                        longitude: 120.92954840292788,
                    }}
                    image={require('../../../images/map_marker.png')}
                    title="Test Title"
                    description="This is the test description"
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>Name of Shop</Text>
                                {/* <Text>A short description</Text> */}
                                {/* <Text>
                                    <Image
                                        style={styles.image}
                                        source={require('./assets/food-banner1.jpg')}
                                        resizeMode="cover"
                                    />
                                    </Text> */}
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', }}>
                        <View>
                            <Image
                                source={require('../../../../assets/icons/Shop.png')}
                                alt="Shop Icon"
                                style={styles.shopIconStyle}
                            />
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.storeNameStyle}>Sheishei Fish Store</Text>
                            <Text style={styles.addressStyle}>San Rafael Bulacan</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.textStyle}>Visit</Text>
                        <IonIcons
                            name="chatbox-ellipses-outline"
                            style={styles.messageIcon}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', }}>
                        <View>
                            <Image
                                source={require('../../../../assets/icons/Shop.png')}
                                alt="Shop Icon"
                                style={styles.shopIconStyle}
                            />
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.storeNameStyle}>Pet Fisheries</Text>
                            <Text style={styles.addressStyle}>San Miguel Bulacan</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.textStyle}>Visit</Text>
                        <IonIcons
                            name="chatbox-ellipses-outline"
                            style={styles.messageIcon}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', }}>
                        <View>
                            <Image
                                source={require('../../../../assets/icons/Shop.png')}
                                alt="Shop Icon"
                                style={styles.shopIconStyle}
                            />
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.storeNameStyle}>KokaKola Fish Store</Text>
                            <Text style={styles.addressStyle}>Baliwag Bulacan</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.textStyle}>Visit</Text>
                        <IonIcons
                            name="chatbox-ellipses-outline"
                            style={styles.messageIcon}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DiscoverTab

const styles = StyleSheet.create({
    root: {
        height: '100%',
        flex: 1,
        backgroundColor: COLOURS.white
    },
    map: {
        height: '40%'
    },
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
    },
    // Character name
    name: {
        fontSize: 16,
    },
    // Character image
    image: {
        width: 100,
        height: 80,
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        height: 80,
        borderBottomWidth: 2,
        borderBottomColor: COLOURS.backgroundMedium,
    },
    shoppingBagIcon: {
        fontSize: 18,
        color: COLOURS.black,
        padding: 12,
        borderRadius: 10,
        backgroundColor: COLOURS.backgroundLight
    },
    cartIcon: {
        fontSize: 18,
        color: COLOURS.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        borderColor: COLOURS.backgroundLight
    },
    container: {
        width: '100%',
        height: 100,
        maxWidth: 400,
        paddingBottom: 16,
        paddingTop: 16,
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: COLOURS.backgroundPrimary,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    shopIconStyle: {
        height: '100%',
        maxWidth: 60
    },
    addressContainer: {
        justifyContent: 'center',
        maxWidth: 200
    },
    storeNameStyle: {
        marginLeft: 15,
        fontWeight: '500',
        letterSpacing: .5
    },
    addressStyle: {
        marginLeft: 15,
    },
    textStyle: {
        marginLeft: 15,
    },
    messageIcon: {
        fontSize: 25,
        color: COLOURS.black,
        marginLeft: 5
    }
});