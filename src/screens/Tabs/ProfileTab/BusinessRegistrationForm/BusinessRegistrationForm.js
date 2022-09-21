import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Button
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOURS } from '../../../../utils/database/Database';
import CustomInput from '../../../../components/CustomInput';

const BusinessRegistrationForm = ({ navigation }) => {

    const [businessName, setBusinessName] = useState('');
    const [shopLocation, setShopLocation] = useState('');
    const [fullName, setFullName] = useState('');
    const [contactNo, setContactNo] = useState('');

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <SafeAreaView style={styles.container}>
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
                    <View style={styles.textFieldContainer}>
                        <View style={styles.textFieldSubContainer}>
                            <Text>
                                Business Name *
                            </Text>
                            <CustomInput
                                placeholder="Business Name"
                                value={businessName}
                                setValue={setBusinessName}
                            />
                        </View>
                    </View>
                    <View style={styles.textFieldContainer}>
                        <View style={styles.textFieldSubContainer}>
                            <Text>
                                Shop Location *
                            </Text>
                            <CustomInput
                                placeholder="Shop Location"
                                value={shopLocation}
                                setValue={setShopLocation}
                            />
                        </View>
                    </View>
                    <View style={styles.textFieldContainer}>
                        <View style={styles.textFieldSubContainer}>
                            <Text>
                                Full Name *
                            </Text>
                            <CustomInput
                                placeholder="Full Name"
                                value={fullName}
                                setValue={setFullName}
                            />
                        </View>
                    </View>
                    <View style={styles.textFieldContainer}>
                        <View style={styles.textFieldSubContainer}>
                            <Text>
                                Contact No *
                            </Text>
                            <CustomInput
                                placeholder="Contact N0"
                                value={contactNo}
                                setValue={setContactNo}
                            />
                        </View>
                    </View>
                    <View style={styles.textFieldContainer}>
                        <View style={styles.textFieldSubContainer}>
                            <Text>
                                Valid ID *
                            </Text>
                            <View style={styles.btnValidIDContainer}>
                                <Button title="Insert Valid ID" onPress={pickImage} />
                            </View>
                            <View style={styles.imageContainer}>
                                {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
                            </View>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnSubContainer}>
                            <View style={styles.btnSubmitContainer}>
                                <Button title="Submit" onPress={() => navigation.navigate('SuccessBusinessScreen')} />
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
        marginTop: 10,
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