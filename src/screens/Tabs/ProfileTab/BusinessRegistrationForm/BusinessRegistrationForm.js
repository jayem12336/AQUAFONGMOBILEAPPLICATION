import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Button,
    Alert,
    Keyboard,
} from 'react-native';

import SelectList from 'react-native-dropdown-select-list';

import * as ImagePicker from 'expo-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOURS } from '../../../../utils/database/Database';
import Loader from '../../../../components/Loader/Loader';
import { db, storage } from '../../../../utils/firebase';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import Input from '../../../../components/Input/Input';
import { async } from '@firebase/util';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import uuid from 'react-native-uuid'

const BusinessRegistrationForm = ({ navigation, route }) => {

    const { userinfo, userData } = route.params;

    const [inputs, setInputs] = useState({
        businessName: '',
        shopLocation: '',
        shopImage: null,
    })

    const [selected, setSelected] = useState("");

    const data = [
        { key: '0', value: 'Philhealth' },
        { key: '1', value: 'TinID' },
        { key: '2', value: 'Drivers Licence' },
        { key: '3', value: 'Passport' },
        { key: '4', value: 'Voters ID' },
        { key: '5', value: 'Postal ID' },
    ]

    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);

    const [errors, setErrors] = useState({});
    const [errorMessage2, setErrorMessage2] = useState('');
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

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

    const pickImage2 = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });

        if (!result.cancelled) {
            setImage2(result.uri);
        }

    };

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.businessName) {
            handleError('Please input business name', 'businessName');
            isValid = false;
        }

        if (!inputs.shopLocation) {
            handleError('Please input shop location', 'shopLocation');
            isValid = false;
        }

        if (image === null) {
            setErrorMessage('Please select and enter valid ID');
            isValid = false;
        }

        if (image2 === null) {
            setErrorMessage2('Please select image shop');
            isValid = false;
        }

        if (isValid) {
            createShop();
        }
    };

    const createShop = async () => {
        setLoading(true);
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

        const blobshop = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            }
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            }
            xhr.responseType = 'blob';
            xhr.open('GET', image2, true);
            xhr.send(null);
        });

        const metadata = {
            contentType: 'image/jpeg'
        };

        const profileImgsRef = ref(storage, 'shopimages/' + new Date().toISOString());
        const uploadTask = uploadBytesResumable(profileImgsRef, blob, metadata);

        const imageShopRef = ref(storage, 'shopsimages/' + new Date().toISOString());
        const uploadTaskShop = uploadBytesResumable(imageShopRef, blobshop, metadata);

        uploadTaskShop.on('state_changed',
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                inputs.shopImage = downloadURL
            })
        }
    )

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
                    await addDoc(collection(db, "users", userinfo, "shop"), {
                        businessName: inputs.businessName,
                        shopLocation: inputs.shopLocation,
                        fullName: userData.fullname,
                        contactNo: userData.phone,
                        idImage: downloadURL,
                        imageShop: inputs.shopImage,
                        userID: userinfo,
                        dateCreated: new Date().toISOString(),
                        isShopVerified: false,
                        typeofID: data[selected].value,
                        status: '',
                    }).then(async (docRef) => {
                        const shopRef = doc(db, 'shops', docRef.id);
                        await setDoc(shopRef, {
                            userID: userinfo,
                            shopID: docRef.id,
                            sellerID: userinfo,
                            isShopVerified: false,
                            businessName: inputs.businessName,
                            shopLocation: inputs.shopLocation,
                            fullName: userData.fullname,
                            contactNo: userData.phone,
                            idImage: downloadURL,
                            imageShop: inputs.shopImage,
                            dateCreated: new Date().toISOString(),
                            typeofID: data[selected].value,
                            status: '',
                        }).then(() => {
                            const anotherRef = doc(db, 'users', userinfo, 'shop', docRef.id);
                            setDoc(anotherRef, { imageShop: inputs.shopImage }, { merge: true });
                            const cityRef = doc(db, 'users', userinfo);
                            setDoc(cityRef, { hasShop: true, shopID: docRef.id }, { merge: true });
                            setInputs({});
                            setSelected('');
                            setImage(null);
                            navigation.navigate('MyShop', {
                                shopID: docRef.id,
                                userID: userinfo
                            });
                            Alert.alert("Success");
                            setLoading(false);
                        })
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <SafeAreaView>
                    <StatusBar
                        backgroundColor={COLOURS.white}
                        barStyle="dark-content"
                    />
                    <View style={styles.headerContainer}>
                        <View style={styles.subHeaderContainer}>
                            <View style={styles.backIconContainer}>
                                <TouchableOpacity onPress={() => navigation.goBack('ProfileTab')}>
                                    <Entypo
                                        name="chevron-left"
                                        style={styles.backIconStyle}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headerText}>
                                    Business Registration Form
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
                        <Input
                            onChangeText={text => handleOnchange(text, 'businessName')}
                            onFocus={() => handleError(null, 'businessName')}
                            iconName="account-outline"
                            label="Business Name *"
                            placeholder="Enter your business name"
                            error={errors.businessName}
                        />
                        <Input
                            onChangeText={text => handleOnchange(text, 'shopLocation')}
                            onFocus={() => handleError(null, 'shopLocation')}
                            iconName="account-outline"
                            label="Shop Location *"
                            placeholder="Enter your shop location"
                            error={errors.shopLocation}
                        />
                        <View style={styles.textFieldSubContainer}>
                            <Text style={{ marginBottom: 10 }}>
                                Valid ID *
                            </Text>
                            <SelectList data={data} setSelected={setSelected} placeholder="Select type of valid ID" />
                            {
                                selected ?
                                    <View style={styles.btnValidIDContainer}>
                                        <TouchableOpacity
                                            style={styles.buttonStyle}
                                            onPress={pickImage}
                                        >
                                            <Text style={styles.buttonText}>
                                                Insert Valid ID
                                            </Text>
                                        </TouchableOpacity>
                                    </View> : ""

                            }
                            {errorMessage &&
                                <Text style={{ marginTop: 7, color: COLOURS.red, fontSize: 12 }}>{errorMessage}</Text>
                            }
                            <View style={styles.imageContainer}>
                                {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
                            </View>
                        </View>
                        <View style={styles.textFieldSubContainer}>
                            <Text style={{ marginBottom: 10 }}>
                                Shop Image *
                            </Text>
                            <View style={styles.btnValidIDContainer}>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={pickImage2}
                                >
                                    <Text style={styles.buttonText}>
                                        Insert Shop Image
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.imageContainer}>
                                {image2 && <Image source={{ uri: image2 }} style={styles.imageStyle} />}
                            </View>
                            {errorMessage2 &&
                                <Text style={{ marginTop: 7, color: COLOURS.red, fontSize: 12 }}>{errorMessage2}</Text>
                            }
                        </View>
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

                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default BusinessRegistrationForm

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        backgroundColor: COLOURS.white,
    },
    backIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
    },
    backIconStyle: {
        fontSize: 18,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 10,
    },
    headerContainer: {
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomColor: COLOURS.backgroundMedium,
        borderBottomWidth: 3,
        marginBottom: 20
    },
    subHeaderContainer: {
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        flexDirection: 'column',
    },
    headerTextContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    headerText: {
        fontSize: 17,
        letterSpacing: 1,
        marginTop: 5,
        fontWeight: '500'
    },
    textFieldContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    textFieldSubContainer: {
        width: '100%',
        maxWidth: 400,
        flexDirection: 'column',
        marginTop: 15
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
        backgroundColor: COLOURS.backgroundPrimary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.white,
        textTransform: 'uppercase',
    },
})