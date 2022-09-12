import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import CustomButton from '../../components/CustomButton';

import { useNavigation } from '@react-navigation/native';
import { COLOURS } from '../../utils/database/Database';

const SelectTypeOfUser = () => {

    const navigation = useNavigation();

    const onBuyerPress = () => {
        //Go to login
        navigation.navigate('SignIn');
    }

    const onSellerPress = () => {
        //Go to Login
        navigation.navigate('SignIn');
    }

    return (
        <View style={styles.root}>
            <Text style={styles.textStyle}>Select type of user to continue</Text>
            <CustomButton
                text="Buyer"
                type="ENTERSHOPBUTTON"
                onPress={onBuyerPress}
            />
            <Text style={styles.orStyles}> Or </Text>
            <CustomButton
                text="Seller"
                type="ENTERSHOPBUTTON"
                onPress={onSellerPress}
            />
        </View>
    )
}

export default SelectTypeOfUser

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLOURS.dirtyWhiteBackground,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    orStyles: {
        fontSize: 15,
        margin: 5
    }
})