import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../../utils/database/Database'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../../../utils/firebase';
import { useNavigation } from '@react-navigation/native';

const Items = ({ data, userID, shopID, productID, shopDetails }) => {

    const navigation = useNavigation();

    const showAlert = (e) => {
        e.preventDefault();
        Alert.alert(
            "Warning",
            "Are you sure you want to remove this product?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: async () => {
                        await deleteDoc(doc(db, "feedproducts", data.prodID))
                            .then(async () => {
                                await deleteDoc(doc(db, "users", userID, "shop", shopID, "products", productID))
                                Alert.alert("Successfully deleted product!")
                            });
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Image source={{ uri: data.productImage }} alt="Profile"
                        style={styles.imageStyle}
                    />
                    <View style={styles.infoItemContainer}>
                        <Text style={styles.textInfo}>{data.productName}</Text>
                        <Text style={styles.priceInfo}>&#x20B1; {data.productPrice}</Text>
                    </View>
                </View>
                {
                    data.productQuantity === 0 ?
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                            marginBottom: -10
                        }}>
                            <Text style={{
                                color: COLOURS.red,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}> Your product is out of stock</Text>
                        </View>
                        : ""
                }
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnStyle} onPress={showAlert}>
                        <Text style={styles.btnText}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('EditProduct', {
                        productData: data,
                        userID: userID,
                        shopID: shopID,
                        productID: productID,
                        shopDetails: shopDetails
                    })}>
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