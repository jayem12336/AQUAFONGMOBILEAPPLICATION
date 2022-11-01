import { Alert, Keyboard, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
    Avatar,
} from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../../../components/Loader/Loader';
import { COLOURS } from '../../../../utils/database/Database';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../../../utils/firebase';
import Input from '../../../../components/Input/Input';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateEmail, updateProfile } from 'firebase/auth/react-native';

const UpdateProfile = ({ navigation, route }) => {

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const { userData } = route.params;

    const [inputs, setInputs] = useState({
        address: userData.address,
        email: userData.email,
        firstName: userData.firstname,
        lastName: userData.lastname,
        fullname: userData.fullname,
        phone: userData.phone,
        photoURL: userData.photoURL,
        firstLetter: userData.fullname.substring(0, 1)
    })

    const [image, setImage] = useState(userData.photoURL);

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const saveChanges = async (e) => {
        e.preventDefault();
        if (inputs.firstName === userData.firstname &&  inputs.lastName === userData.lastname && inputs.address === userData.address && inputs.phone === userData.phone && inputs.email === userData.email && image === '') {
            Alert.alert(
                "Notice",
                "Are you sure you want to save changes?",
                [
                    {
                        text: "No",
                        style: "cancel"
                    },
                    {
                        text: "Yes", onPress: async () => {
                            navigation.navigate("ProfileTab");
                        }
                    }
                ]
            );
        } else {
            if (image !== "") {
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

                const profileImgsRef = ref(storage, `/userProfile/${userData.ownerId}` + new Date().toISOString());
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
                        setLoading(false)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImage(downloadURL);
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
                            if (inputs.email !== userData.email) {
                                updateEmail(auth.currentUser, inputs.email).then(() => {
                                    // Email updated!
                                    // ...
                                    console.log("Email Updated");
                                  }).catch((error) => {
                                    // An error occurred
                                    // ...
                                    console.log(error);
                                  });
                                  
                            }
                            const cityRef = doc(db, "users", userData.ownerId);
                            await setDoc(cityRef, {
                                address: inputs.address,
                                email: inputs.email,
                                fullname: inputs.firstName + " " + inputs.lastName,
                                firstname: inputs.firstName,
                                lastname: inputs.lastName,
                                phone: inputs.phone,
                                photoURL: image
                            }, { merge: true }).then(async () => {
                                if (userData.hasShop === true) {
                                    const docRef = doc(db, "users", userData.ownerId, "shop", userData.shopID);
                                    await setDoc(docRef, {
                                        address: inputs.address,
                                        email: inputs.email,
                                        firstname: inputs.firstName,
                                        lastname: inputs.lastName,
                                        fullName: inputs.firstName + " " + inputs.lastName,
                                        phone: inputs.phone,
                                    }, { merge: true }).then(async() => {
                                        const shopRef = doc(db,"shops", userData.shopID);
                                        await setDoc(shopRef, {
                                            address: inputs.address,
                                            email: inputs.email,
                                            firstname: inputs.firstName,
                                            lastname: inputs.lastName,
                                            fullName: inputs.firstName + " " + inputs.lastName,
                                            phone: inputs.phone,
                                        }, { merge: true })
                                    })
                                }
                            }).then(() => {
                                setLoading(false);
                                Alert.alert("Successfully updated profile");
                                navigation.navigate("ProfileTab");
                            })
                        }
                    }
                ]
            );
        }
    }

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

    return (
        <View style={styles.root}>
            <Loader visible={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View
                        style={{ width: '100%', maxWidth: 500 }}>
                        <View style={styles.headerContainer}>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons
                                        onPress={() => navigation.goBack()}
                                        name="chevron-left"
                                        style={styles.backIconStyle}
                                    />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.myShopText}> Update Profile </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
                        <View style={{
                            alignItems: 'center',
                        }}>
                            {
                                image === '' ?
                                    <Avatar.Text
                                        label={inputs.firstLetter}
                                        size={80}
                                        style={{ color: COLOURS.white }}
                                    /> :
                                    <Avatar.Image
                                        source={{ uri: image }}
                                        size={80}
                                    />
                            }
                        </View>
                        <View style={{
                            marginTop: 10,
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity style={{
                                height: 40,
                                width: '100%',
                                maxWidth: 200,
                                backgroundColor: COLOURS.dirtyWhiteBackground,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={pickImage}
                            >
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    color: COLOURS.black,
                                    textTransform: 'uppercase',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    Change profile picture
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'email')}
                                onFocus={() => handleError(null, 'email')}
                                label="New Email"
                                placeholder="Enter new email"
                                error={errors.productName}
                            />
                            <Input
                                onChangeText={text => handleOnchange(text, 'firstName')}
                                onFocus={() => handleError(null, 'firstName')}
                                label="New first name"
                                placeholder="Enter new first name"
                                error={errors.firstName}
                            />
                            <Input
                                onChangeText={text => handleOnchange(text, 'lastName')}
                                onFocus={() => handleError(null, 'lastName')}
                                label="New last name"
                                placeholder="Enter new last name"
                                error={errors.lastName}
                            />
                            <Input
                                keyboardType="numeric"
                                onChangeText={text => handleOnchange(text, 'phone')}
                                onFocus={() => handleError(null, 'phone')}
                                label="New contact no."
                                placeholder="Enter new phone"
                                error={errors.phone}
                            />
                            <Input
                                onChangeText={text => handleOnchange(text, 'address')}
                                onFocus={() => handleError(null, 'address')}
                                label="New address"
                                placeholder="Enter new address"
                                error={errors.address}
                            />
                        </View>
                        <View style={{
                            marginTop: 10,
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity style={{
                                height: 50,
                                width: '100%',
                                maxWidth: 150,
                                backgroundColor: COLOURS.backgroundPrimary,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                                onPress={saveChanges}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    color: COLOURS.white,
                                    textTransform: 'uppercase',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    Save Changes
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default UpdateProfile

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
        padding: 16,
        borderColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2
    },
    backIconStyle: {
        fontSize: 20,
        color: COLOURS.white,
        padding: 12,
        backgroundColor: COLOURS.backgroundPrimary,
        borderRadius: 12,
    },
    myShopText: {
        fontSize: 20,
        textTransform: 'uppercase',
        marginLeft: 5,
        letterSpacing: 1
    },
})