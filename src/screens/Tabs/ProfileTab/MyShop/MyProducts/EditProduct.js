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
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import Loader from '../../../../../components/Loader/Loader';
import { COLOURS } from '../../../../../utils/database/Database';
import Input from '../../../../../components/Input/Input';
import { db, storage } from '../../../../../utils/firebase';

const EditProduct = ({ navigation, route }) => {

  const { productData, userID, shopID, productID, shopDetails } = route.params;

  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    productName: productData.productName,
    rating: '',
    productImage: productData.productImage,
    productPrice: productData.productPrice,
    productDescription: '',
    shopID: '',
    userID: '',
    productQuantity: productData.productQuantity
  })

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const updateItem = async (e) => {
    e.preventDefault();
    if (inputs.productName === '' && inputs.productPrice === '' && image === null) {
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
            text: "Yes", onPress: async () => {
              navigation.navigate("MyProducts", {
                userinfo: userID,
                shopID: shopID,
              });
            }
          }
        ]
      );
    }
    else {
      if (image !== "") {
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

        const metadata = {
          contentType: 'image/jpeg'
        };

        const profileImgsRef = ref(storage, 'shopimages/' + new Date().toISOString());
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
              inputs.productImage = downloadURL;
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
              const cityRef = doc(db, "users", userID, "shop", shopID, "products", productID);
              await setDoc(cityRef, {
                productName: inputs.productName,
                productPrice: Number(inputs.productPrice),
                productImage: inputs.productImage,
                productQuantity: Number(inputs.productQuantity)
              }, { merge: true }).then(async () => {
                const docRef = doc(db, "feedproducts", productData.prodID);
                await setDoc(docRef, {
                  productName: inputs.productName,
                  productPrice: Number(inputs.productPrice),
                  productImage: inputs.productImage,
                  productQuantity: Number(inputs.productQuantity)
                }, { merge: true }).then(() => {
                  navigation.navigate("MyProducts", {
                    userinfo: userID,
                    shopID: shopID,
                    shopDetails: shopDetails
                  });
                  Alert.alert("Successfully updated product");
                  setLoading(false);
                })
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
            style={{ width: '100%' }}>
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
                  <Text style={styles.myShopText}> Update Product </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <Input
              onChangeText={text => handleOnchange(text, 'productName')}
              onFocus={() => handleError(null, 'productName')}
              label="Product Name"
              placeholder="Enter new product name"
              error={errors.productName}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'productPrice')}
              onFocus={() => handleError(null, 'productPrice')}
              label="Product Price"
              placeholder="Enter new product price"
              error={errors.productPrice}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'productQuantity')}
              onFocus={() => handleError(null, 'productQuantity')}
              label="Product Quantity"
              placeholder="Enter your product quantity"
              error={errors.productQuantity}
            />
            <View style={styles.textFieldSubContainer}>
              <Text style={{ marginBottom: 10, fontSize: 14, color: COLOURS.grey, }}>
                Product Image
              </Text>
              <TouchableOpacity style={styles.btnContainer} onPress={pickImage}>
                <Text style={styles.btnText}>
                  Insert New Product Image
                </Text>
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.btnContainer2} onPress={updateItem}>
          <Text style={styles.btnText2}>
            Update item
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditProduct

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