import {
    ActivityIndicator,
    Alert,
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
import { collection, deleteDoc, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import MessageCard from './MessageCard';
import SearchBar from '../../../components/Searchbar/SearchBar';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { async } from '@firebase/util';

const MessageTabScreen = ({ navigation, route }) => {

    const { userinfo } = route.params;

    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [sample, setSample] = useState({})

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setLoading(true);
        const q = query(collection(db, "rooms", userinfo, "chatUsers"))
        const unsub = onSnapshot(q, (querySnapshot) => {
            const data = [];
            let obj = {};
            querySnapshot.forEach(async (docrefs) => {
                const ref = doc(db, "users", userinfo === docrefs.data().buyerID ? docrefs.data().sellerID : docrefs.data().buyerID)
                const docSnap = await getDoc(ref);
                if (docSnap.exists()) {
                    const city = docSnap.data();
                    // Use a City instance method
                    setUsers(current => [...current, {
                        id: docrefs.id,
                        data: docrefs.data(),
                        usedata: docSnap.data()
                    }]);
                } else {
                    console.log("No such document!");
                }
            });
            setUsers(data);
            setLoading(false);
        });
        setLoading(false);
        return unsub;
    }, [navigation]);

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const onDeleteAll = (e) => {
        setVisible(false)
        e.preventDefault();
        Alert.alert(
            "Warning",
            "Are you sure you want to remove all your messages?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        setLoading(true);
                        // for (let index = 0; index < smsData.length; index++) {
                        //     deleteDoc(doc(db, "rooms", userinfo, "chatUsers", userinfo === data.buyerID ? data.sellerID : data.buyerID, "messages", smsData[index].id))                     
                        // }
                        const q = query(collection(db, "rooms", userinfo, "chatUsers"));
                        onSnapshot(q, (querySnapshot) => {
                            querySnapshot.forEach((docref) => {
                                deleteDoc(doc(db, "rooms", userinfo, "chatUsers", docref.id))
                            });
                        });
                        Alert.alert("Successfully deleted all conversation")
                        setLoading(false);
                    }
                }
            ]
        );
    }

    return (
        <Provider>
            <View style={styles.root}>
                <StatusBar
                    backgroundColor={COLOURS.white}
                    barStyle="dark-content"
                />
                <View style={styles.mainContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.iconContainer}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                {
                                    showSearch === false ?
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
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
                                        </View> :
                                        <View style={{
                                            alignItems: 'flex-start',
                                            marginTop: 10
                                        }}>
                                            <SearchBar
                                                value={searchTerm}
                                                updateSearch={setSearchTerm}
                                            />
                                        </View>
                                }
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View>
                                    {
                                        showSearch === false ?
                                            <TouchableOpacity onPress={() => setShowSearch(true)}>
                                                <MaterialCommunityIcons
                                                    name="magnify"
                                                    style={styles.headerIconStyle}
                                                />
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={() => setShowSearch(false)}>
                                                <MaterialCommunityIcons
                                                    name="close-circle"
                                                    style={styles.headerIconStyle}
                                                />
                                            </TouchableOpacity>
                                    }
                                </View>
                                <View>
                                    <Menu
                                        visible={visible}
                                        style={{
                                        }}
                                        onDismiss={closeMenu}
                                        anchor={
                                            <TouchableOpacity onPress={openMenu}>
                                                <MaterialCommunityIcons
                                                    name="dots-horizontal"
                                                    style={styles.headerIconStyle}
                                                />
                                            </TouchableOpacity>

                                        }>
                                        <Menu.Item onPress={onDeleteAll} title="Delete All" />
                                    </Menu>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {loading ?
                        <View style={{ flex: 1, alignItems: 'center', height: 500, marginTop: 50 }}>
                            <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                        </View>
                        : <>
                            {users.filter(({ usedata }) => usedata.fullname.toLowerCase().includes(searchTerm.toLowerCase())).map(({ data, id }) => (
                                <View key={id}>
                                    <MessageCard data={data} id={id} userinfo={userinfo} />
                                </View>
                            ))}
                        </>
                    }
                </ScrollView>
            </View >
        </Provider>
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
        justifyContent: 'space-between',
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
        flexDirection: 'column',
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