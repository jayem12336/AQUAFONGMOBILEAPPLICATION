import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import { COLOURS } from '../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';

const MessageTabScreen = ({ navigation }) => {
    return (
        <View style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View style={styles.mainContainer}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    onPress={() => navigation.goBack()}
                                    name="chevron-left"
                                    style={styles.backIconStyle}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.messageStyle}>
                                    Messages
                                </Text>
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
                    <View style={styles.messageBoxContainer}>
                        <View style={styles.avatarContainer}>
                            <Avatar.Image size={50} source={require('../../../images/Jpeg/GoldFish.jpg')} />
                            <Text style={styles.textMessage}>NDRRMC</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text>Friday</Text>
                            <Text>4:50</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Message')}>
                        <View style={styles.messageBoxContainer}>
                            <View style={styles.avatarContainer}>
                                <Avatar.Image size={50} source={require('../../../images/Jpeg/Corals.jpg')} />
                                <Text style={styles.textMessage}>AquaFond Fisheries</Text>
                            </View>
                            <View style={styles.dateContainer}>
                                <Text>Friday</Text>
                                <Text>4:50</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.messageBoxContainer}>
                        <View style={styles.avatarContainer}>
                            <Avatar.Image size={50} source={require('../../../images/Jpeg/GoldFish.jpg')} />
                            <Text style={styles.textMessage}>Jayson</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text>Friday</Text>
                            <Text>4:50</Text>
                        </View>
                    </View>
                    <View style={styles.messageBoxContainer}>
                        <View style={styles.avatarContainer}>
                            <Avatar.Image size={50} source={require('../../../images/Jpeg/GoldFish.jpg')} />
                            <Text style={styles.textMessage}>Maria</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text>Friday</Text>
                            <Text>4:50</Text>
                        </View>
                    </View>
                    <View style={styles.messageBoxContainer}>
                        <View style={styles.avatarContainer}>
                            <Avatar.Image size={50} source={require('../../../images/Jpeg/GoldFish.jpg')} />
                            <Text style={styles.textMessage}>Lolong</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text>Friday</Text>
                            <Text>4:50</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default MessageTabScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        backgroundColor: COLOURS.white
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
        borderBottomWidth: 2.5,
    },
    iconContainer: {
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start'
    },
    backIconStyle: {
        fontSize: 20,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 12,
    },
    headerContainer: {
        marginTop: 20,
        marginBottom: -15,
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
        letterSpacing: 1
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
        height: 80,
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