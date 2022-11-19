import React from "react";

import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
} from "react-native";

import Logo from '../../images/Aquapond.png';
import CustomButton from "../../components/CustomButton";

import { useNavigation } from "@react-navigation/native";
import { COLOURS } from "../../utils/database/Database";

export default function LandingPage() {

    const navigation = useNavigation();

    const onEnterShopPress = () => {
        navigation.navigate('SignIn');
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLOURS.dirtyWhiteBackground}
                barStyle="dark-content"
            />
            <Image
                source={Logo}
                style={styles.logoStyle}
            />
            <Text style={styles.textColor}>BULACAN FISHERIES</Text>
            <CustomButton
                text="START FREE TRIAL"
                type="ENTERSHOPBUTTON"
                onPress={onEnterShopPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOURS.backgroundPrimary,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    textColor: {
        color: COLOURS.black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 20
    },
    logoStyle: {
        maxHeight: 200,
        maxWidth: 200,
        borderRadius: 100
    },
});
