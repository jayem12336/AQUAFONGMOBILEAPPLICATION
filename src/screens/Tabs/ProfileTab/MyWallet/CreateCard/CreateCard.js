import { Alert, Image, Keyboard, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Input from '../../../../../components/Input/Input';
import Loader from '../../../../../components/Loader/Loader';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../../../utils/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const CreateCard = ({ navigation, route }) => {

    const { userinfo } = route.params;

    const [inputs, setInputs] = useState({
        accName: '',
        accNumber: '',
    })

    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

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

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.accName) {
            handleError('Please input account name', 'accName');
            isValid = false;
        }

        if (!inputs.accNumber) {
            handleError('Please input gcash number', 'accNumber');
            isValid = false;
        } else if (/^(09|\+639)\d{9}$/.test(inputs.accNumber) === false && /^[0-9]{8}$/.test(inputs.accNumber) === false) {
            handleError('Please enter a valid gcash number', 'accNumber');
            isValid = false;
        }

        if (image === null) {
            setErrorMessage('Please select and enter qr code');
            isValid = false;
        }

        if (isValid) {
            createWallet();
        }
    };

    const createWallet = async () => {
        setLoading(true)
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
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await addDoc(collection(db, "users", userinfo, "wallets"), {
                        accName: inputs.accName,
                        accNumber: inputs.accNumber,
                        qrCode: downloadURL,
                        type: 'Gcash',
                        userID: userinfo
                    }).then(async (docRef) => {
                        const shopRef = doc(db, 'users', userinfo);
                        setDoc(shopRef, { walletID: docRef.id }, { merge: true }).then(() => {
                            Alert.alert("Congrats")
                            navigation.navigate('MyWallet')
                            setLoading(false)
                        });
                    })
                })
            }
        )
    }

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };


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
                                style={styles.backIconStyle}
                            />
                        </TouchableOpacity>
                        <View style={styles.orderContainer}>
                            <Text style={styles.orderText}> Create Gcash Card </Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 20 }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'accName')}
                        onFocus={() => handleError(null, 'accName')}
                        iconName="account-outline"
                        label="Account Name *"
                        placeholder="Enter your account name"
                        error={errors.accName}
                    />
                    <Input
                        keyboardType="numeric"
                        onChangeText={text => handleOnchange(text, 'accNumber')}
                        onFocus={() => handleError(null, 'accNumber')}
                        iconName="phone-outline"
                        label="Account Number"
                        placeholder="Enter your gcash no"
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
                                Qr Code
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
                    </View>
                    {errorMessage &&
                        <Text style={{ marginTop: 7, color: COLOURS.red, fontSize: 12 }}>{errorMessage}</Text>
                    }
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={validate}
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

export default CreateCard

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
        backgroundColor: COLOURS.white
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2
    },
    subHeaderContainer: {
        flexDirection: 'row',
    },
    backIconStyle: {
        fontSize: 20,
        color: COLOURS.primaryOrange,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 12,
    },
    orderContainer: {
        justifyContent: 'center'
    },
    orderText: {
        fontSize: 20,
        textTransform: 'uppercase',
        marginLeft: 5,
        letterSpacing: 1,
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