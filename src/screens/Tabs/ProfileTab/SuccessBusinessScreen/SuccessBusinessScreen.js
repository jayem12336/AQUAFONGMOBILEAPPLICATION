import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { COLOURS } from '../../../../utils/database/Database';

const windowHeight = Dimensions.get('window').height - 150;

const SuccessBusinessScreen = ({ navigation }) => {
    return (
        <View style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View style={styles.headerContainer}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                name="chevron-left"
                                style={styles.backIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.messageContainer}>
                        <View style={styles.messageSubContainer}>
                            <Text style={styles.textStyle}>
                                Hi KaFishy! You Successfully {'\n'}
                                Created a Business!
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("MyShop")}
                                    style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>
                                        Proceed
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default SuccessBusinessScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        backgroundColor: COLOURS.backgroundPrimary
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
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 12,
        letterSpacing: 1,
        color: COLOURS.black,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backIconStyle: {
        fontSize: 20,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 12,
    },
    messageContainer: {
        height: '100%',
        width: '100%',
        padding: 10
    },
    messageSubContainer: {
        backgroundColor: COLOURS.white,
        height: windowHeight,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 17
    }
})