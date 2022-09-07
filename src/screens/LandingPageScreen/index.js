import React from "react";

import {
    StyleSheet,
    Text,
    View,
    Image,
} from "react-native";

import Logo from '../../images/aqualogo.png';
import CustomButton from "../../components/CustomButton";

import { useNavigation } from "@react-navigation/native";

export default function LandingPage() {

    const navigation = useNavigation();

    const onEnterShopPress = () => {
        //go to select Type of User
        navigation.navigate('TypeOfUser');
    }

    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logoStyle}
            />
            <Text style={styles.textColor}>BulAquaPond Fisheries</Text>
            <CustomButton
                text="Enter Shop"
                type="ENTERSHOPBUTTON"
                onPress={onEnterShopPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF9967",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    textColor: {
        color: "black",
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
    buttonStyle: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 20,
        width: 150
    },
});
