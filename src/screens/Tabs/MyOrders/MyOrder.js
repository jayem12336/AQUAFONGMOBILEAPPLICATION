import { ActivityIndicator, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOURS } from '../../../utils/database/Database';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import AllOrders from '../ProfileTab/MyShop/MyProducts/OrderHistory/AllOrders'

const initialLayout = { width: Dimensions.get('window').width };

const MyOrder = ({ navigation, route }) => {

    const { userinfo } = route.params;
    const [isLoading, setIsLoading] = useState(false)
    const [toShipProducts, setToShipProducts] = useState([]);
    const [cancelledProducts, setCancelledProducts] = useState([]);
    const [deliveredProducts, setDeliveredProducts] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const q = query(collection(db, "Orders"), where("buyerID", "==", userinfo), where("status", "in", ["Ordered", "To Ship"]));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            setToShipProducts(data);
            setIsLoading(false);
        });
        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        setIsLoading(true);
        const q = query(collection(db, "Orders"), where("buyerID", "==", userinfo), where("status", "==", "Cancelled"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            setCancelledProducts(data);
            setIsLoading(false);
        });
        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        setIsLoading(true);
        const q = query(collection(db, "Orders"), where("buyerID", "==", userinfo), where("status", "==", "Delivered"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            setDeliveredProducts(data);
            setIsLoading(false);
        });
        return unsubscribe;
    }, [navigation])

    const FirstRoute = () => (
        <ScrollView>
            <View style={{
                marginTop: 10,
                marginBottom: 10
            }}>
                {
                    toShipProducts && toShipProducts.length < 1?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                            <Text>There is no ordered item to show</Text>
                        </View> :
                        <>
                            {isLoading ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                                    <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                                </View>
                                : <>
                                    {toShipProducts.map(({ data, id }) => (
                                        <AllOrders data={data} key={id} location={"myOrders"} id={id} />
                                    ))}
                                </>
                            }
                        </>
                }
            </View>
        </ScrollView>
    );

    const SecondRoute = () => (
        <ScrollView>
            <View style={{
                marginTop: 10,
                marginBottom: 10,
                paddingHorizontal: 5
            }}>
                {
                    cancelledProducts && cancelledProducts.length < 1?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                            <Text>There is no cancelled item to show</Text>
                        </View> :
                        <>
                            {isLoading ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                                    <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                                </View>
                                : <>
                                    {cancelledProducts.map(({ data, id }) => (
                                        <AllOrders data={data} key={id} location={"cancelledOrders"} id={id} />
                                    ))}
                                </>
                            }
                        </>
                }

            </View>
        </ScrollView>
    );

    const ThirdRoute = () => (
        <ScrollView>
            <View style={{
                marginTop: 10,
                marginBottom: 10
            }}>
                {
                    deliveredProducts && deliveredProducts.length < 1?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                            <Text>There is no products to show</Text>
                        </View> :
                        <>
                            {isLoading ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                                    <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                                </View>
                                : <>
                                    {deliveredProducts.map(({ data, id }) => (
                                        <AllOrders data={data} key={id} location={"PurchaseHistory"} id={id} />
                                    ))}
                                </>
                            }
                        </>
                }
            </View>
        </ScrollView>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Ordered' },
        { key: 'second', title: 'Cancelled' },
        { key: 'third', title: 'Purchase History' },
    ]);

    const renderTabBar = props => {
        return (
            <TabBar
                {...props}
                renderLabel={({ focused, route }) => {
                    return (
                        <Text
                            size={20}
                            category="Medium"
                            color={focused ? 'BLACK' : 'GRAY3'}
                            style={{ textAlign: 'center' }}
                        >
                            {route.title}
                        </Text>
                    );
                }}
                indicatorStyle={styles.indicatorStyle}
                style={styles.tabBar}
            />
        );
    };


    return (
        <View style={styles.root}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <View style={styles.headerContainer}>
                <View style={styles.subHeaderContainer}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons
                            onPress={() => navigation.goBack()}
                            name="chevron-left"
                            style={styles.backIconStyle}
                        />
                    </TouchableOpacity>
                    <View style={styles.orderContainer}>
                        <Text style={styles.orderText}> My Orders </Text>
                    </View>
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={styles.container}
                renderTabBar={renderTabBar}
            />
        </View>
    )
}

export default MyOrder

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
        backgroundColor: COLOURS.white
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2
    },
    scene: {
        flex: 1,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        marginTop: 10
    },
    tabBar: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: COLOURS.black,
    },
    indicatorStyle: {
        backgroundColor: COLOURS.backgroundPrimary,
        padding: 1.5,
        marginBottom: -2,
    },
    divider: {
        zIndex: 100,
        position: 'absolute',
        width: 1,
        height: 48,
        backgroundColor: 'black',
        alignSelf: 'center',
    },
    subHeaderContainer: {
        flexDirection: 'row',
    },
    backIconStyle: {
        fontSize: 20,
        color: COLOURS.primaryOrange,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 12,
    },
    orderContainer: {
        justifyContent: 'center'
    },
    orderText: {
        fontSize: 20,
        textTransform: 'uppercase',
        marginLeft: 5,
        letterSpacing: 1,
        fontWeight: 'bold'
    }
})