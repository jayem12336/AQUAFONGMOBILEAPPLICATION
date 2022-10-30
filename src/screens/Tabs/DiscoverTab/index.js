import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native'
import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { COLOURS } from '../../../utils/database/Database';
import SearchBar from '../../../components/Searchbar/SearchBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../../../utils/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect } from 'react';

const DiscoverTab = ({ navigation }) => {

    const [value, setValue] = useState();
    const [userID, setUserID] = useState('');
    const [shopList, setShopList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const updateSearch = (value) => {

    }

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe =
            auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                    setUserID(authUser.uid)
                    const q = query(collection(db, "shops"), where("userID", "!=", authUser.uid));
                    onSnapshot(q, (querySnapshot) => {
                        const data = [];
                        querySnapshot.forEach((doc) => {
                            data.push({
                                id: doc.id,
                                data: doc.data()
                            })
                        });
                        setShopList(data);
                        setIsLoading(false);
                    });
                } else {
                    setUserID(null)
                    setIsLoading(false);
                }
            })
        return unsubscribe;
    }, [navigation])

    return (
        <View style={styles.root}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
            <View style={styles.headerContainer}>
                <SearchBar
                    value={searchTerm}
                    updateSearch={setSearchTerm}
                />
                <TouchableOpacity onPress={() => navigation.navigate('CartTab')}>
                    <MaterialCommunityIcons name="cart" style={styles.shoppingBagIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MessageTabScreen')}>
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
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {
                    shopList === [] ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                            <Text>There is no created shop to show</Text>
                        </View> :
                        <>
                            {isLoading ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                                    <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                                </View>
                                : <>
                                    {shopList.filter(({ data }) => data.businessName.toLowerCase().includes(searchTerm.toLowerCase())).map(({ data, id }) => (
                                        <View style={styles.container} key={id}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                    <Image
                                                        source={require('../../../../assets/icons/Shop.png')}
                                                        alt="Shop Icon"
                                                        style={styles.shopIconStyle}
                                                    />
                                                </View>
                                                <View style={styles.addressContainer}>
                                                    <Text style={styles.storeNameStyle}>{data.businessName}</Text>
                                                    <Text style={styles.addressStyle}>{data.shopLocation}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <Text style={styles.textStyle}>Visit</Text>
                                                <IonIcons
                                                    name="chatbox-ellipses-outline"
                                                    style={styles.messageIcon}
                                                />
                                            </View>
                                        </View>
                                    ))}
                                </>
                            }
                        </>
                }
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
        marginTop: 5
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