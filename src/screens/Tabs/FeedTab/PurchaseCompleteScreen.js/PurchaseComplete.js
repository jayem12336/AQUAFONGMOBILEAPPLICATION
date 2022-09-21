import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../../../../utils/database/Database';

const windowHeight = Dimensions.get('window').height - 150;

const PurchaseCompleteScreen = ({ navigation }) => {
    return (
        <View style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View style={styles.backIconContainer}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                onPress={() => navigation.goBack()}
                                name="chevron-left"
                                style={styles.backIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.successContainer}>
                            <Text style={styles.successText}>
                                You Successfully Purchased!
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Home")}
                                    style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>
                                        Done
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

export default PurchaseCompleteScreen

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
    },
    backIconContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 50,
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
    subContainer: {
        height: '100%',
        width: '100%',
        padding: 10
    },
    successContainer: {
        backgroundColor: COLOURS.white,
        height: windowHeight,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    successText: {
        textAlign: 'center',
        fontSize: 20
    }
})