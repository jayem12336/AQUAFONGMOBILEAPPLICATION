import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import ReviewCard from './ReviewCard';

const Reviews = ({ navigation, route }) => {

    const { reviews } = route.params;

    return (
        <View style={styles.root}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <ScrollView showsVerticalScrollIndicator={false}>
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
                            <Text style={styles.textStyle}> Reviews </Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    {reviews.map(({ data, id }) => (
                        <View key={id} style={{
                            marginTop: 10
                        }}>
                            <ReviewCard data={data} id={id} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Reviews

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        backgroundColor: COLOURS.white
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: COLOURS.backgroundLight,
    },
    subHeaderContainer: {
        flexDirection: 'row',
    },
    backIconContainer: {
        fontSize: 20,
        color: COLOURS.primaryOrange,
        padding: 12,
        borderRadius: 12,
        backgroundColor: COLOURS.white
    },
    textContainer: {
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 20,
        textTransform: 'none',
        marginLeft: 5,
        letterSpacing: 1.5,
        color: COLOURS.black,
        fontWeight: 'bold'
    },
})