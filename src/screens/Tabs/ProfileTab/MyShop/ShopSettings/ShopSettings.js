import { Image, Keyboard, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOURS } from '../../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import SelectList from 'react-native-dropdown-select-list';

import * as ImagePicker from 'expo-image-picker';
import Loader from '../../../../../components/Loader/Loader';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../../../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

const ShopSettings = ({ navigation, route }) => {

    const { shopID, shopDetails, userinfo, status } = route.params;
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState("");
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    console.log(selected)

    const data = [
        { key: '0', value: 'Philhealth' },
        { key: '1', value: 'TinID' },
        { key: '2', value: 'Drivers Licence' },
        { key: '3', value: 'Passport' },
        { key: '4', value: 'Voters ID' },
        { key: '5', value: 'Postal ID' },
    ]

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true

        if (image === null) {
            setErrorMessage('Please select and enter valid ID');
            isValid = false;
        }

        if (isValid) {
            resubmitValidID();
        }
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

    const resubmitValidID = async () => {
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

        const profileImgsRef = ref(storage, `/shopsimages` + new Date().toISOString());
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
                    const cityRef = doc(db, "users", userinfo, "shop", shopID);
                    await setDoc(cityRef, {
                        idImage: downloadURL,
                        status: "",
                        typeofID: data[selected].value,
                    }, { merge: true }).then(async () => {
                        const cityRefs = doc(db, "shops", shopID);
                        await setDoc(cityRefs, {
                            idImage: downloadURL,
                            status: "",
                            typeofID: data[selected].value,
                        }, { merge: true }).then(async () => {
                            const cityRefs = doc(db, "notifications", shopID);
                            await setDoc(cityRefs, {
                                status: "",
                            }, { merge: true }).then(() => {
                                setLoading(false)
                                navigation.navigate("MyShop", {
                                    shopID: shopID,
                                    userID: userinfo
                                })
                            })

                        })
                    })

                })
            }
        )
    }

    return (
        <View style={styles.root}>
            <StatusBar
                backgroundColor={COLOURS.white}
                barStyle="dark-content"
            />
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
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
                            <Text style={styles.textStyle}> Shop settings </Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                }}>
                    <View style={{
                        marginTop: 10,
                        backgroundColor: COLOURS.white,
                        borderRadius: 10,
                        elevation: 5,
                        width: '100%',
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 20
                    }}
                    >
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '50%'
                        }}>
                            <Text style={{
                                fontSize: 15,
                                color: COLOURS.backgroundMedium,
                                fontWeight: 'bold'
                            }}>Shop ID</Text>
                            <Text style={{
                                marginTop: 10,
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>#{shopID.substring(0, 7)}</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '50%',
                        }}>
                            <Text style={{
                                fontSize: 15,
                                color: COLOURS.backgroundMedium,
                                fontWeight: 'bold'
                            }}>Date Created</Text>
                            <Text style={{
                                marginTop: 10
                            }}>{moment(shopDetails.dateCreated).format("ll")}</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 10,
                        backgroundColor: COLOURS.white,
                        borderRadius: 10,
                        elevation: 5,
                        width: '100%',
                        padding: 10,
                        paddingVertical: 10,
                    }}
                    >
                        <View style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '100%',
                            borderBottomColor: COLOURS.backgroundLight,
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            <Image
                                source={{ uri: shopDetails.imageShop }}
                                style={{
                                    height: 120,
                                    width: 200,
                                    borderRadius: 10
                                }}
                            />
                            <View style={{
                                marginTop: 10
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    color: COLOURS.backgroundPrimary
                                }}>{shopDetails.businessName}</Text>
                            </View>
                        </View>
                        <View style={{
                            paddingHorizontal: 10,
                            marginTop: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>Seller Contact</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>{shopDetails.contactNo}</Text>
                                </View>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>Seller FullName</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>{shopDetails.fullName}</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 20
                            }}>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>Is Shop Verified</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: shopDetails.isShopVerified === true ? COLOURS.green : COLOURS.red
                                    }}>{shopDetails.isShopVerified === true ? "Verified" : "Not Verified"}</Text>
                                </View>
                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: COLOURS.backgroundMedium,
                                        fontWeight: 'bold'
                                    }}>Shop Location</Text>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>{shopDetails.shopLocation}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 10,
                        backgroundColor: COLOURS.white,
                        borderRadius: 10,
                        elevation: 5,
                        width: '100%',
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 20
                    }}
                    >
                        {
                            status === "" ?
                                <View style={{
                                    padding: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 14,
                                        fontWeight: '500',
                                        letterSpacing: 1
                                    }}>
                                        Please wait for 1-2 days for your shop to be verified
                                    </Text>
                                </View>
                                : status === "rejected" ?
                                    <View style={{
                                        padding: 5,
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 14,
                                            fontWeight: '500',
                                            letterSpacing: 1,
                                            color: COLOURS.red
                                        }}>
                                            Your shop verification is rejected please resubmit another valid id
                                        </Text>
                                        <Text style={{
                                            textAlign: 'left',
                                            fontSize: 14,
                                            fontWeight: '500',
                                            letterSpacing: 1,
                                            marginTop: 10,
                                            marginBottom: 5
                                        }}>
                                            Important Notice *
                                        </Text>
                                        <Text style={{
                                            textAlign: 'left',
                                            fontSize: 14,
                                            fontWeight: '500',
                                            letterSpacing: 1
                                        }}>
                                            Make sure that your valid id is not edited {"\n"}
                                            Send a clear photo of your valid id {"\n"}
                                            Make sure your id number is readable {"\n"}
                                        </Text>
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
                                    </View> : ""
                        }
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={{
                    justifyContent: 'center'
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            padding: 10,
                            backgroundColor: COLOURS.backgroundPrimary,
                            borderRadius: 5,
                            width: 120,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                            onPress={() => navigation.navigate('EditShopSettings', {
                                shopID: shopID,
                                shopDetails: shopDetails
                            })}
                        >
                            <Text style={{
                                color: COLOURS.white,
                                fontWeight: 'bold'
                            }}>Edit Shop</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ShopSettings

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
    footerContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLOURS.dirtyWhiteBackground
    },
    textFieldContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    textFieldSubContainer: {
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