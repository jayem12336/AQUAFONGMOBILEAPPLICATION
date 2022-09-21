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
import { COLOURS } from '../../utils/database/Database';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('window').height - 150;

const RegisterSuccessScreen = ({navigation}) => {
    return (
        <View style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingTop: 16,
                            paddingBottom: 16,
                            paddingHorizontal: 16,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                onPress={() => navigation.goBack()}
                                name="chevron-left"
                                style={{
                                    fontSize: 20,
                                    color: COLOURS.backgroundDark,
                                    padding: 12,
                                    backgroundColor: COLOURS.backgroundLight,
                                    borderRadius: 12,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        height: '100%',
                        width: '100%',
                        padding: 10
                    }}>
                        <View style={{
                            backgroundColor: COLOURS.white,
                            height: windowHeight,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 17
                            }}>
                                Hi KaFishy! You Successfully Registered {'\n'}
                                Welcome to AquaFond Fisheries!
                            </Text>
                            <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignIn")}
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

export default RegisterSuccessScreen

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
})