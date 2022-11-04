import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ActivityIndicator
} from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { COLOURS } from '../../../utils/database/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../../utils/firebase';
import NotificationCard from './NotificationCard';
import NotificationProduct from './NotificationProduct';
import Loader from '../../../components/Loader/Loader';

const NotificationTabScreen = ({ navigation }) => {

    const [userID, setUserID] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setIsLoading(true)
            if (authUser) {
                const q = query(collection(db, "Orders"), where("buyerID", "==", authUser.uid), where("status", "in", ['To Ship', 'Cancelled', 'Delivered']));
                onSnapshot(q, (querySnapshot) => {
                    const data = [];
                    querySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    });
                    setOrders(data);
                    setIsLoading(false)
                });
            } else {
                setUserID(null)
            }
        })
    }, [navigation])

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setIsLoading(true)
            if (authUser) {
                const q = query(collection(db, "feedproducts"), where("userID", "==", authUser.uid));
                onSnapshot(q, (querySnapshot) => {
                    const data = [];
                    querySnapshot.forEach((doc) => {
                        if (doc.data().productQuantity === 0) {
                            data.push({
                                id: doc.id,
                                data: doc.data()
                            })
                        }
                    });
                    setProducts(data);
                    setIsLoading(false)
                });
            } else {
                setUserID(null)
            }
        })
        setIsLoading(false);
    }, [navigation])

    return (
        <View style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View style={styles.headerContainer}>
                        <View style={styles.subHeaderContainer}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    onPress={() => navigation.goBack()}
                                    name="bell"
                                    style={styles.bellIconStyle}
                                />
                            </TouchableOpacity>
                            <Text style={styles.notificationTitle}>
                                Orders Notifications
                            </Text>
                        </View>
                    </View>
                    {isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                            <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                        </View>
                        : <>
                            {products.map(({ data, id }) => (
                                <View key={id}>
                                    <NotificationProduct data={data} id={id} />
                                </View>
                            ))}
                            {orders.map(({ data, id }) => (
                                <View key={id}>
                                    <NotificationCard data={data} id={id} />
                                </View>
                            ))}
                        </>
                    }
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default NotificationTabScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        backgroundColor: COLOURS.white
    },
    headerContainer: {
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2.5,
    },
    subHeaderContainer: {
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: -20
    },
    bellIconStyle: {
        fontSize: 30,
        color: COLOURS.black,
        padding: 12,
        borderRadius: 12,
    },
})