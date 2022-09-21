import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../utils/database/Database'

const Completed = () => {
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.subContainer}>
                        <Image source={require('../../../images/Jpeg/GoldFish.jpg')} alt="Profile"
                            style={styles.imageStyle}
                        />
                        <View style={styles.nameInfo}>
                            <Text style={styles.textStyle}>GOLDFISH</Text>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.itemInfo}>
                            1 Item
                        </Text>
                        <Text style={styles.priceInfo}>
                            &#x20B1; 380
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Completed

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
        paddingHorizontal: 20,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2.5,
        flexDirection: 'column',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subContainer: {
        flexDirection: 'row'
    },
    imageStyle: {
        width: 80,
        height: 80,
        maxHeight: 100,
        borderRadius: 15
    },
    nameInfo: {
        flexDirection: 'column',
    },
    textStyle: {
        marginLeft: 10,
        fontSize: 15,
        letterSpacing: 1
    },
    rightContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'center'
    },
    itemInfo: {
        fontSize: 15,
        letterSpacing: 1
    },
    priceInfo: {
        fontSize: 15,
        letterSpacing: 1
    }
})