import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../utils/database/Database';

const MyWallet = ({ navigation, route }) => {
    return (
        <View style={styles.root}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.subHeaderContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left"
                                style={styles.backIconContainer}
                            />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>How would you like to top up ? </Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginTop: 20,
                    paddingHorizontal: 20
                }}>
                    <Text style={{
                        fontSize: 17,
                        color: COLOURS.grey,
                        fontWeight: '500',
                        letterSpacing: 1
                    }}>My Bank Card</Text>
                    <View style={{
                        backgroundColor: COLOURS.backgroundLight,
                        marginTop: 20,
                        padding: 15,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                onPress={() => navigation.goBack()}
                                name="plus-thick"
                                style={styles.plusIconContainer}
                            />
                        </TouchableOpacity>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 16,
                            fontWeight: 'bold',
                            letterSpacing: 1
                        }}>
                            New Card
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 20,
                    paddingHorizontal: 20
                }}>
                    <Text style={{
                        fontSize: 17,
                        color: COLOURS.grey,
                        fontWeight: '500',
                        letterSpacing: 1
                    }}>Bank Transfer</Text>
                    <View style={{
                        backgroundColor: COLOURS.backgroundLight,
                        marginTop: 20,
                        padding: 15,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 16,
                            fontWeight: 'bold',
                            letterSpacing: 1
                        }}>
                            Logo here
                        </Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                onPress={() => navigation.goBack()}
                                name="plus-thick"
                                style={styles.plusIconContainer}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: COLOURS.backgroundLight,
                        marginTop: 20,
                        padding: 15,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 16,
                            fontWeight: 'bold',
                            letterSpacing: 1
                        }}>
                            Logo here
                        </Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                onPress={() => navigation.goBack()}
                                name="plus-thick"
                                style={styles.plusIconContainer}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: 1
                    }}>
                        <MaterialCommunityIcons
                                onPress={() => navigation.goBack()}
                                name="plus-thick"
                                style={styles.plusIconContainer2}
                            />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MyWallet

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
        backgroundColor: COLOURS.white,
        paddingBottom: 10
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: COLOURS.white,
        elevation: 1
    },
    subHeaderContainer: {
        flexDirection: 'column',
    },
    backIconContainer: {
        fontSize: 30,
        color: COLOURS.backgroundPrimary,
        padding: 12,
        width: 60,
        borderRadius: 12,
    },
    textContainer: {
        justifyContent: 'center',
        paddingBottom: 10,
        marginLeft: 20
    },
    textStyle: {
        fontSize: 28,
        textTransform: 'none',
        color: COLOURS.black,
        fontWeight: 'bold',
        textAlign: 'justify',
        letterSpacing: 1.5
    },
    plusIconContainer: {
        fontSize: 25,
        color: COLOURS.white,
        backgroundColor: COLOURS.backgroundPrimary,
        padding: 10,
        borderRadius: 12,
    },
    plusIconContainer2: {
        fontSize: 30,
        color: COLOURS.white,
        backgroundColor: COLOURS.backgroundPrimary,
        padding: 10,
        borderRadius: 30,
    },
    footerContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLOURS.dirtyWhiteBackground
    },
})