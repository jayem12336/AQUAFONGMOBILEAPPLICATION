import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOURS } from '../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import MessageCard from './MessageCard';

const MessageTabScreen = ({ navigation, route }) => {

    const { userinfo } = route.params;

    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const q = query(collection(db, "rooms", userinfo, "chatUsers"))
        const unsub = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data(),
                })
            });
            setUsers(data);
            setLoading(false);
        });
        setLoading(false);
        return unsub;
    }, [navigation]);
    return (
        <View style={styles.root}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                onPress={() => navigation.goBack()}
                                name="chevron-left"
                                style={styles.backIconStyle}
                            />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.messageStyle}>
                                Messages
                            </Text>
                        </View>
                    </View>
                    <View style={styles.iconButtonContainer}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                name="magnify"
                                style={styles.headerIconStyle}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                name="dots-horizontal"
                                style={styles.headerIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {loading ?
                    <View style={{ flex: 1, alignItems: 'center', height: 500, marginTop: 50 }}>
                        <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                    </View>
                    : <>
                        {users.map(({ data, id }) => (
                            <View key={id}>
                                <MessageCard data={data} id={id} userinfo={userinfo} />
                            </View>
                        ))}
                    </>
                }
            </ScrollView>
        </View >
    )
}

export default MessageTabScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        backgroundColor: COLOURS.backgroundLight
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        height: '8%',
        width: '50%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        left: 12
    },
    buttonStyle: {
        width: '80%',
        height: '90%',
        backgroundColor: COLOURS.backgroundMedium,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 12,
        letterSpacing: 1,
        color: COLOURS.black,
        textTransform: 'uppercase',
    },
    mainContainer: {
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 1,
        backgroundColor: COLOURS.white
    },
    iconContainer: {
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    backIconStyle: {
        fontSize: 20,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContainer: {
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageStyle: {
        fontSize: 17,
        letterSpacing: 1,
        fontWeight: 'bold'
    },
    iconButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIconStyle: {
        fontSize: 25,
        color: COLOURS.backgroundDark,
        padding: 12,
    },
    messageBoxContainer: {
        width: '100%',
        paddingTop: 16,
        maxWidth: 400,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2.5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textMessage: {
        marginLeft: 10,
        maxWidth: 100,
        textAlign: 'center'
    },
    dateContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    }
})