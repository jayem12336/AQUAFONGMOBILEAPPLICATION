import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import Input from '../../../../../components/Input/Input';
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../../../../utils/firebase';
import Loader from '../../../../../components/Loader/Loader';
import { async } from '@firebase/util';
import { useEffect } from 'react';

const EditShopSettings = ({ navigation, route }) => {

  const { shopDetails, shopID, userinfo } = route.params;

  const [inputs, setInputs] = useState({
    businessName: shopDetails.businessName,
    shopLocation: shopDetails.shopLocation,
  })

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataCount, setDataCount] = useState([]);
  const [smsData, setSmsData] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  useEffect(() => {
    const q = query(collection(db, "Orders"), where("shopID", "==", shopID));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        })
      });
      setDataCount(data);
    });
    return unsubscribe;
  }, [navigation])

  useEffect(() => {
    const sms = query(collection(db, "rooms", userinfo, "chatUsers"), where("shopID", "==", shopID));
    const unsubscribe = onSnapshot(sms, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        })
      });
      setSmsData(data)
    });
    return unsubscribe;
  }, [navigation])
  console.log(dataCount);
  console.log(smsData);
  const removeShop = () => {
    if (dataCount.length > 0) {
      setLoading(false);
      Alert.alert("Shop cannot be removed. Orders are still pending")
    } else {
      Alert.alert(
        "Warning",
        "Are you sure you want to delete your shop?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Yes", onPress: () => {
              setLoading(true);
              const q = query(collection(db, "feedproducts"), where("shopID", "==", shopID));
              //deleteMessages
              smsData.forEach(({ data, id }) => {
                const sellermessage = query(collection(db, "rooms", data.buyerID, "chatUsers", data.sellerID, "messages"));
                onSnapshot(sellermessage, (querySnapshot) => {
                  querySnapshot.forEach((docref) => {
                    deleteDoc(doc(db, "rooms", data.buyerID, "chatUsers", data.sellerID, "messages", docref.id))
                  });
                })
                const buyermessage = query(collection(db, "rooms", data.sellerID, "chatUsers", data.buyerID, "messages"));
                onSnapshot(buyermessage, (querySnapshot) => {
                  querySnapshot.forEach((refdoc) => {
                    deleteDoc(doc(db, "rooms", data.sellerID, "chatUsers", data.buyerID, "messages", refdoc.id))
                  });
                })
                deleteDoc(doc(db, "rooms", data.buyerID, "chatUsers", data.sellerID));
                deleteDoc(doc(db, "rooms", data.sellerID, "chatUsers", data.buyerID));
              })
              //deleteProducts
              onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((docref) => {
                  deleteDoc(doc(db, "feedproducts", docref.data().prodID))
                });
              })
              //deleteWholeShop
              deleteDoc(doc(db, "shops", shopID)).then(() => {
                deleteDoc(doc(db, "users", userinfo, "shop", shopID)).then(() => {
                  const cityRef = doc(db, 'users', userinfo);
                  setDoc(cityRef, { hasShop: false, shopID: '' }, { merge: true });
                  setLoading(false);
                })
              }) 
              Alert.alert("Removed Shop")
              navigation.navigate('ProfileTab')
            }
          }
        ]
      );
    }
  }

  const updateSettings = async (e) => {
    e.preventDefault();
    if (inputs.businessName === shopDetails.businessName && inputs.shopLocation === shopDetails.shopLocation && image === null) {
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
              navigation.navigate('ShopSettings', {
                shopID: shopID, shopDetails: shopDetails
              })
            }
          }
        ]
      );
    }
    else {
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
              const cityRef = doc(db, "users", userinfo, "shop", shopID);
              await setDoc(cityRef, {
                businessName: inputs.businessName,
                shopLocation: inputs.shopLocation,
              }, { merge: true }).then(async () => {
                const cityRef = doc(db, "shops", shopID);
                await setDoc(cityRef, {
                  businessName: inputs.businessName,
                  shopLocation: inputs.shopLocation,
                }, { merge: true }).then(() => {
                  setLoading(false);
                  Alert.alert("Successfully updated shop details");
                  navigation.navigate('MyShop', {
                    shopID: shopID,
                    userID: userinfo
                  })
                })
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
              <Text style={styles.textStyle}> Edit shop settings </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'businessName')}
            onFocus={() => handleError(null, 'businessName')}
            iconName="account-outline"
            label="New Business Name"
            placeholder="Enter new business name"
            error={errors.businessName}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'shopLocation')}
            onFocus={() => handleError(null, 'shopLocation')}
            iconName="account-outline"
            label="New Shop Location"
            placeholder="Enter your new shop location"
            error={errors.shopLocation}
          />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View style={{
            width: '50%',
            alignItems: 'center',
          }}>
            <TouchableOpacity style={{
              padding: 7,
              borderColor: COLOURS.backgroundPrimary,
              borderWidth: 1,
              borderRadius: 5,
              width: 120,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
              onPress={removeShop}
            >
              <Text style={{
                color: COLOURS.backgroundPrimary,
                fontWeight: 'bold'
              }}>Remove Shop</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            width: '50%',
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
              onPress={updateSettings}
            >
              <Text style={{
                color: COLOURS.white,
                fontWeight: 'bold'
              }}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default EditShopSettings

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
})