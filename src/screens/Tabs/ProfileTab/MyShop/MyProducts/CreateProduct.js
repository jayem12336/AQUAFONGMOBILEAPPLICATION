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
  Alert,
  Keyboard,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Loader from '../../../../../components/Loader/Loader';
import { COLOURS } from '../../../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../../../../components/Input/Input';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../../../utils/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const CreateProduct = ({ navigation, route }) => {

  const { userID, shopID, shopDetails } = route.params;

  const [inputs, setInputs] = useState({
    productName: '',
    rating: 0,
    productImage: '',
    productPrice: 0,
    productDescription: '',
    shopID: '',
    userID: '',
    productQuantity: 0,
  })

  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [parentProdID, setParentProdID] = useState('');
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.productName) {
      handleError('Please input product name', 'productName');
      isValid = false;
    }

    if (!inputs.productPrice) {
      handleError('Please input product price', 'productPrice');
      isValid = false;
    } else if (inputs.productPrice < 0) {
      handleError('Please input a valid product price', 'productPrice');
      isValid = false;
    }

    if (!inputs.productQuantity) {
      handleError('Please input quantity', 'productQuantity');
      isValid = false;
    } else if (inputs.productPrice < 0) {
      handleError('Please input a valid quantity', 'productQuantity');
      isValid = false;
    }

    if (image === null) {
      setErrorMessage('Please select and enter valid ID');
      isValid = false;
    }

    if (isValid) {
      btnCreateProduct();
    }
  };

  const btnCreateProduct = async () => {
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

    const profileImgsRef = ref(storage, `productImages/${shopID}` + new Date().toISOString());
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
          addDoc(collection(db, "feedproducts"), {
            productName: inputs.productName,
            productPrice: Number(inputs.productPrice),
            productDescription: inputs.productDescription,
            rating: inputs.rating,
            productImage: downloadURL,
            productQuantity: Number(inputs.productQuantity),
            userID: userID,
            shopID: shopID,
            dateCreated: new Date().toISOString()
          }).then((docRef) => {
            const cityRef = doc(db, 'feedproducts', docRef.id);
            setDoc(cityRef, { prodID: docRef.id }, { merge: true });
            setParentProdID(docRef.id)
            addDoc(collection(db, "users", userID, "shop", shopID, "products"), {
              productName: inputs.productName,
              productPrice: Number(inputs.productPrice),
              productDescription: inputs.productDescription,
              productQuantity: Number(inputs.productQuantity),
              rating: inputs.rating,
              productImage: downloadURL,
              prodID: docRef.id,
              dateCreated: new Date().toISOString()
            }).then((newRef) => {
              setDoc(cityRef, { parentProductID: newRef.id }, { merge: true });
              navigation.navigate("MyProducts", {
                userinfo: userID,
                shopID: shopID,
                shopDetails: shopDetails
              });
              Alert.alert("Successfully create a product");
              setLoading(false);
            })
          })
        })
      }
    )
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true,
      //aspect: [1, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.root}>
      <Loader visible={loading} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50}}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={COLOURS.white}
            barStyle="dark-content"
          />
          <View
            style={{ width: '100%' }}>
            <View style={styles.headerContainer}>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    onPress={() => navigation.navigate('MyProducts', {
                      userID: userID,
                      shopID: shopID,
                      shopDetails: shopDetails
                    })}
                    name="chevron-left"
                    style={styles.backIconStyle}
                  />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.myShopText}> Create Product </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <Input
              onChangeText={text => handleOnchange(text, 'productName')}
              onFocus={() => handleError(null, 'productName')}
              label="Product Name *"
              placeholder="Enter your product name"
              error={errors.productName}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'productPrice')}
              onFocus={() => handleError(null, 'productPrice')}
              label="Product Price *"
              placeholder="Enter your product price"
              error={errors.productPrice}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'productQuantity')}
              onFocus={() => handleError(null, 'productQuantity')}
              label="Product Quantity *"
              placeholder="Enter your product quantity"
              error={errors.productQuantity}
            />
            <View style={styles.textFieldSubContainer}>
              <Text style={{ marginBottom: 10, fontSize: 14, color: COLOURS.grey, }}>
                Product Image *
              </Text>
              <TouchableOpacity style={styles.btnContainer} onPress={pickImage}>
                <Text style={styles.btnText}>
                  Insert Product Image
                </Text>
              </TouchableOpacity>
              {errorMessage &&
                <Text style={{ marginTop: 7, color: COLOURS.red, fontSize: 12 }}>{errorMessage}</Text>
              }
              <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.btnContainer2} onPress={validate}>
          <Text style={styles.btnText2}>
            Add item
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateProduct

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
    color: COLOURS.backgroundDark,
    padding: 12,
    backgroundColor: COLOURS.backgroundLight,
    borderRadius: 12,
  },
  myShopText: {
    fontSize: 20,
    textTransform: 'uppercase',
    marginLeft: 5,
    letterSpacing: 1
  },
  textFieldSubContainer: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'column',
    marginTop: 15
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
    alignSelf: 'flex-start',
    backgroundColor: COLOURS.backgroundLight,
    padding: 15,
    borderRadius: 2,
  },
  btnText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLOURS.black,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  footerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLOURS.dirtyWhiteBackground
  },
  btnContainer2: {
    alignSelf: 'center',
    backgroundColor: COLOURS.backgroundLight,
    width: '100%',
    padding: 15,
    borderRadius: 2
  },
  btnText2: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLOURS.black,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
})