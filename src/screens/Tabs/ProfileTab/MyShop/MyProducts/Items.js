import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../../utils/database/Database'

const Items = () => {
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Image source={require('../../../../../images/Jpeg/GoldFish.jpg')} alt="Profile"
                        style={styles.imageStyle}
                    />
                    <View style={styles.infoItemContainer}>
                        <Text style={styles.textInfo}>NDRRMC</Text>
                        <Text style={styles.priceInfo}>&#x20B1; 303</Text>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.btnText}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.btnText}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Items

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        alignItems: 'center',
    },
    container: {
        width: '100%',
        paddingTop: 16,
        maxWidth: 400,
        paddingBottom: 16,
        paddingHorizontal: 40,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2.5,
        flexDirection: 'column',
    },
    subContainer: {
        flexDirection: 'row',
    },
    imageStyle: {
        width: 80,
        height: 80,
        maxHeight: 100,
        borderRadius: 15
    },
    infoItemContainer: {
        flexDirection: 'column',
    },
    textInfo: {
        marginLeft: 10,
        fontSize: 15,
        letterSpacing: 1
    },
    priceInfo: {
        marginLeft: 10,
        fontSize: 15,
        letterSpacing: 1
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btnStyle: {
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 120
    },
    btnText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.black,
        textTransform: 'uppercase',
    }
})