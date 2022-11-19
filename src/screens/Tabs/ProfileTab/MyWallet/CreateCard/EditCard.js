import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { COLOURS } from '../../../../../utils/database/Database';
import Loader from '../../../../../components/Loader/Loader';
import Input from '../../../../../components/Input/Input';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../../../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

const EditCard = ({ route, navigation }) => {

    const { cardData, cardID, userinfo } = route.params;

    const [inputs, setInputs] = useState({
        accName: cardData.accName,
        accNumber: cardData.accNumber,
        qrCode: cardData.qrCode,
    })
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const editWallet = async (e) => {
        e.preventDefault();
        if (inputs.accName === cardData.accName && inputs.accNumber === cardData.accNumber && image === null) {
            Alert.alert(
                "Notice",
                "Are you sure you want to save changes?",
                [
                    {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Yes", onPress: () => {
                            navigation.navigate('MyWallet')
                        }
                    }
                ]
            );
        } else {
            if (image !== null) {
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response);
                    }
                    xhr.onerror = function () {
                        reject(new TypeError('Network request failed'));
                    }
                    xhr.responseType = 'blob';
                    xhr.open('GET', image, true);
                    xhr.send(null);
                });

                const metadata = {
                    contentType: 'image/jpeg'
                };
                const profileImgsRef = ref(storage, 'walletimages/' + new Date().toISOString());
                const uploadTask = uploadBytesResumable(profileImgsRef, blob, metadata);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        switch (snapshot.state) {
                            case 'paused':
                                break;
                            case 'running':
                                break;
                        }
                    },
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;
                            // ...
                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                            const cityRef = doc(db, "users", userinfo, "wallets", cardID);
                            await setDoc(cityRef, {
                                qrCode: downloadURL,
                            }, { merge: true })
                        })
                    }
                )
            }
            Alert.alert(
                "Warning",
                "Are you sure you want to save changes?",
                [
                    {
                        text: "No",
                        onPress: () => {
                            setLoading(false);
                        },
                        style: "cancel"
                    },
                    {
                        text: "Yes", onPress: async () => {
                            
                            setLoading(true);
                            const cityRef = doc(db, "users", userinfo, "wallets", cardID);
                            await setDoc(cityRef, {
                                accName: inputs.accName,
                                accNumber: inputs.accNumber,
                            }, { merge: true }).then(() => {
                                navigation.navigate('MyWallet')
                                setLoading(false)
                                Alert.alert("Successfully updated wallet")
                            })
                        }
                    }
                ]
            );

        }
    }

    return (
        <View style={styles.root}>
            <Loader visible={loading} />
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <ScrollView>
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
                            <Text style={styles.textStyle}> Edit Gcash Wallet </Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 20 }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'accName')}
                        onFocus={() => handleError(null, 'accName')}
                        iconName="account-outline"
                        label="New Account Name"
                        placeholder="Enter new Account name"
                        error={errors.accName}
                    />
                    <Input
                        keyboardType="numeric"
                        onChangeText={text => handleOnchange(text, 'accNumber')}
                        onFocus={() => handleError(null, 'accNumber')}
                        iconName="phone-outline"
                        label="New Gcash Number"
                        placeholder="Enter your new gcash no"
                        error={errors.accNumber}
                    />
                </View>
                <View style={styles.textFieldSubContainer}>
                    <Text style={{ marginBottom: 10 }}>
                        Gcash Qr Code *
                    </Text>
                    <View style={styles.btnValidIDContainer}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={pickImage}
                        >
                            <Text style={styles.buttonText}>
                                New Qr Code
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={editWallet}
                    >
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditCard

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
        backgroundColor: COLOURS.backgroundLight,
        paddingBottom: 10
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: COLOURS.white,
        elevation: 1
    },
    subHeaderContainer: {
        flexDirection: 'row',
    },
    backIconContainer: {
        fontSize: 30,
        color: COLOURS.backgroundPrimary,
        padding: 12,
        borderRadius: 12,
    },
    textContainer: {
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 22,
        textTransform: 'none',
        marginLeft: 5,
        letterSpacing: 1.5,
        color: COLOURS.black,
        fontWeight: 'bold'
    },
    textFieldSubContainer: {
        width: '100%',
        padding: 20,
        flexDirection: 'column'
    },
    btnValidIDContainer: {
        marginTop: 20,
        width: 150,
        height: 50
    },
    imageContainer: {
        width: '100%',
        maxWidth: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10
    },
    imageStyle: {
        width: 200,
        height: 200
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height: 100
    },
    btnSubContainer: {
        width: '100%',
        maxWidth: 400,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center'
    },
    btnSubmitContainer: {
        marginTop: 20,
        width: 200,
    },
    buttonStyle: {
        width: '100%',
        height: '90%',
        backgroundColor: COLOURS.primaryOrange,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.white,
        textTransform: 'none',
    },
})