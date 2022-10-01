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

    const { userinfo } = route.params;

    const [inputs, setInputs] = useState({
        businessName: '',
        shopLocation: '',
        fullName: '',
        contactNo: '',
    })

    const hasUnsavedChanges = Boolean(inputs);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }

            e.preventDefault();
            Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure to discard them and leave the screen?',
                [
                    { text: "Don't leave", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        // If the user confirmed, then we dispatch the action we blocked earlier
                        // This will continue the action that had triggered the removal of the screen
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]
            );
        })
    }, [navigation, hasUnsavedChanges])

    const [selected, setSelected] = useState("");

    const data = [
        { key: '1', value: 'Philhealth' },
        { key: '2', value: 'TinID' },
        { key: '3', value: 'Drivers Licence' },
        { key: '4', value: 'Passport' },
        { key: '5', value: 'Voters ID' },
        { key: '6', value: 'Postal ID' },
    ]

    const [image, setImage] = useState(null);

    const [errors, setErrors] = useState({});
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

        console.log(result)
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

        if (!inputs.fullName) {
            handleError('Please input full name', 'fullName');
            isValid = false;
        }

        if (!inputs.contactNo) {
            handleError('Please input phone number', 'contactNo');
            isValid = false;
        } else if (/^(09|\+639)\d{9}$/.test(inputs.contactNo) === false && /^[0-9]{8}$/.test(inputs.contactNo) === false) {
            handleError('Please enter a valid phone number', 'contactNo');
            isValid = false;
        }

        if (image === null) {
            setErrorMessage('Please select and enter valid ID');
            isValid = false;
        }

        if (isValid) {
            createShop();
        }
    };

    const createShop = async () => {
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

        const profileImgsRef = ref(storage, 'shopimages/' + new Date().toISOString());
        const uploadTask = uploadBytesResumable(profileImgsRef, blob, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                setLoading(true);
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
                    addDoc(collection(db, "users", userinfo, "shop"), {
                        businessName: inputs.businessName,
                        shopLocation: inputs.shopLocation,
                        fullName: inputs.fullName,
                        contactNo: inputs.contactNo,
                        imageShop: downloadURL,
                        userID: userinfo
                    }).then((docRef) => {
                        const cityRef = doc(db, 'users', userinfo);
                        setDoc(cityRef, { hasShop: true, shopID: docRef.id }, { merge: true });
                        console.log("Document written with ID: ", docRef.id);
                        setInputs({});
                        setSelected('');
                        setImage(null);
                        navigation.navigate('MyShop', {
                            shopID: docRef.id,
                            userID: userinfo
                        });
                        Alert.alert("Success");
                        console.log(downloadURL);
                        setLoading(false);
                    })
                })
            }
        )
    }

    console.log(userinfo);

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
                        <Input
                            onChangeText={text => handleOnchange(text, 'fullName')}
                            onFocus={() => handleError(null, 'fullName')}
                            iconName="account-outline"
                            label="Full Name *"
                            placeholder="Enter your full name"
                            error={errors.fullName}
                        />
                        <Input
                            keyboardType="numeric"
                            onChangeText={text => handleOnchange(text, 'contactNo')}
                            onFocus={() => handleError(null, 'contactNo')}
                            iconName="phone-outline"
                            label="Phone Number*"
                            placeholder="Enter your contact no"
                            error={errors.contactNo}
                        />
                        <View style={styles.textFieldSubContainer}>
                            <Text style={{ marginBottom: 10 }}>
                                Valid ID *
                            </Text>
                            <SelectList data={data} setSelected={setSelected} placeholder="Select type of valid ID" />
                            {
                                selected ?
                                    <View style={styles.btnValidIDContainer}>
                                        <Button title="Insert Valid ID" onPress={pickImage} />
                                    </View> : ""

                            }
                            {errorMessage &&
                                <Text style={{ marginTop: 7, color: COLOURS.red, fontSize: 12 }}>{errorMessage}</Text>
                            }
                            <View style={styles.imageContainer}>
                                {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
                            </View>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnSubContainer}>
                            <View style={styles.btnSubmitContainer}>
                                <Button title="Submit" onPress={validate} />
                            </View>
                        </View>
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
        width: 150
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
        paddingHorizontal: 20
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
    }
})