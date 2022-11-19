import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { COLOURS } from '../../../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../../utils/firebase';
import Loader from '../../../../../components/Loader/Loader';

const CardInfo = ({ route, navigation }) => {

  const { cardData, cardID, userinfo } = route.params;

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteWallet = (e) => {
    e.preventDefault();
    Alert.alert(
      "Warning",
      "Are you sure you want to remove your wallet?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: async () => {
            setLoading(true)
            const cityRef = doc(db, "users", userinfo);
            await setDoc(cityRef, {
              walletID: ''
            }, { merge: true }).then(async() => {
              await deleteDoc(doc(db, "users", userinfo, "wallets", cardID)).then(() => {
                setLoading(false);
                Alert.alert("Successfully deleted wallet")
                navigation.navigate("MyWallet")
              })
            })
          }
        }
      ]
    );
  }

  const showAlert = (e) => {
    e.preventDefault();
    Alert.alert(
      "Warning",
      "Are you sure you want to remove this product?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: async () => {
            await deleteDoc(doc(db, "feedproducts", data.prodID))
              .then(async () => {
                await deleteDoc(doc(db, "users", userID, "shop", shopID, "products", productID))
                Alert.alert("Successfully deleted product!")
              });
          }
        }
      ]
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar
        backgroundColor={COLOURS.white}
        barStyle="dark-content"
      />
      <Loader visible={loading} />
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
              <Text style={styles.orderText}> Gcash Information </Text>
            </View>
          </View>
        </View>
        <View style={{
          paddingHorizontal: 5,
          paddingVertical: 5,
        }}>
          <View style={{
            marginTop: 30,
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
              }}>Account Name</Text>
              <Text style={{
                marginTop: 10,
                fontSize: 15,
                fontWeight: 'bold'
              }}>{cardData.accName}</Text>
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
              }}>Account number</Text>
              <Text style={{
                marginTop: 10
              }}>{cardData.accNumber}</Text>
            </View>
          </View>
          <View style={{
            marginTop: 30,
            backgroundColor: COLOURS.white,
            borderRadius: 10,
            elevation: 5,
            width: '100%',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20
          }}>
            <Text style={{
              fontSize: 15,
              color: COLOURS.backgroundMedium,
              fontWeight: 'bold'
            }}>QR code</Text>
            <Image
              source={{ uri: cardData.qrCode }}
              style={{
                height: 300,
                width: '100%',
                marginTop: 10
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={{
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}>
          <View style={{
            alignItems: 'center',
          }}>
            <TouchableOpacity style={{
              padding: 10,
              backgroundColor: COLOURS.primaryOrange,
              borderRadius: 5,
              width: 120,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
              onPress={() => navigation.navigate("EditCard", {
                cardData: cardData,
                cardID: cardID
              })}
            >
              <Text style={{
                color: COLOURS.white,
                fontWeight: 'bold'
              }}>Edit Card</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            alignItems: 'center',
          }}>
            <TouchableOpacity style={{
              padding: 10,
              backgroundColor: COLOURS.red,
              borderRadius: 5,
              width: 120,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
              onPress={deleteWallet}
            >
              <Text style={{
                color: COLOURS.white,
                fontWeight: 'bold'
              }}>Delete Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CardInfo

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
    borderColor: COLOURS.primaryOrange,
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
  footerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLOURS.dirtyWhiteBackground
  },
})