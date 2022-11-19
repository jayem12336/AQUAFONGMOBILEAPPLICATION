import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Card = ({ data, id }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("CardInfo", {
            cardData: data,
            cardID: id
        })}
        >
            <View>
                <View style={{
                    backgroundColor: COLOURS.backgroundLight,
                    marginTop: 20,
                    padding: 15,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 15,
                            fontWeight: 'bold',
                            letterSpacing: 1
                        }}>
                            {data.accName}
                        </Text>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 15,
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            marginTop: 5
                        }}>
                            {data.accNumber}
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.plusIconContainer}
                        >
                            <Text style={{
                                color: COLOURS.white,
                                textTransform: 'uppercase',
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                {data.type}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    plusIconContainer: {
        backgroundColor: COLOURS.blue,
        padding: 15,
        borderRadius: 12,
    },
})