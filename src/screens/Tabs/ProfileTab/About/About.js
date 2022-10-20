import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../../../images/aqualogo.png'

const About = ({ navigation }) => {
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
                            style={styles.backIconContainer}
                        />
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}> About </Text>
                    </View>
                </View>
            </View>
            <ScrollView >
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 250,
                }}>
                    <Image
                        source={Logo}
                        style={styles.logoStyle}
                    />
                    <Text style={{
                        marginTop: 10,
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>
                        v1.82.4.4.2
                    </Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    paddingHorizontal: 10,

                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 15
                    }}>
                        The Aquapond Fisheries is a mobile e-commerce application for pet fish and accessories, this application is made for fish stores and fish lovers to meet in one platform to find products they want and to give services. The aim of the study is to help fish stores to promote their products and become popular to people and have a good sales. Therefore, the researchers are aiming to give a smooth and secured transaction for the seller and buyer in creating a user-friendly application.
                        Aquapond Fisheries application will serve as the shopping platform of pet fish and fish accessories. The features of the application are the following, you can site the different stores near your location, and also you can search your preferred fish. Inside the application you can create your own shop to sell your products. In additional, the application are secured and not prone to scammers because it requires to register a full information of seller and it include a valid ID's for confirmation. In conclusion, Aquapond Fisheries is made for secured transaction and designed to become a well performing application.
                    </Text>
                </View>
            </ScrollView>
        </View>

    )
}

export default About

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
        backgroundColor: COLOURS.backgroundLight,
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
        flexDirection: 'row',
    },
    backIconContainer: {
        fontSize: 30,
        color: COLOURS.backgroundPrimary,
        padding: 12,
        borderRadius: 12,
    },
    textContainer: {
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 22,
        textTransform: 'none',
        marginLeft: 5,
        letterSpacing: 1.5,
        color: COLOURS.black,
        fontWeight: 'bold'
    },
    logoStyle: {
        maxHeight: 150,
        maxWidth: 150,
        borderRadius: 100,
    },
})