import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { COLOURS } from '../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import Loader from '../../../../components/Loader/Loader';

const PurchaseScreen = ({ navigation, route }) => {

  const { productID, userinfo, quantity } = route.params;

  const [buyerData, setBuyerData] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", userinfo), (doc) => {
      setBuyerData(doc.data());
    })
    return unsub;
  }, [navigation])

  const placeOrder = () => {
    Alert.alert(
      "Notification",
      "Are you sure you want to place order?",
      [
        {
          text: "No",
          onPress: () => {
            setLoading(false);
          },
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => {
            setLoading(true)
            addDoc(collection(db, "Orders"), {
              productName: productID.productName,
              productPrice: productID.productPrice,
              sellerID: productID.userID,
              productDescription: productID.productDescription,
              rating: productID.rating,
              productImage: productID.productImage,
              quantity: quantity,
              buyerID: userinfo,
              shopID: productID.shopID,
              dateOrder: new Date().toISOString(),
              status: "Ordered",
            }).then(() => {
              const cityRef = doc(db, 'feedproducts', productID.prodID);
              setDoc(cityRef, { productQuantity: productID.productQuantity - quantity }, { merge: true })
              .then(() => {
                const docRef = doc(db, 'users', productID.userID, 'shop', productID.shopID, 'products', productID.parentProductID);
                setDoc(docRef, { productQuantity: productID.productQuantity - quantity }, { merge: true })
                navigation.navigate('PurchaseComplete')
                setLoading(false)
              });
            })
          }
        }
      ]
    );
  }

  return (
    <>
      <View style={styles.root}>
        <Loader visible={loading} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView>
            <StatusBar
              backgroundColor={COLOURS.white}
              barStyle="dark-content"
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  onPress={() => navigation.goBack()}
                  name="chevron-left"
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.textHeader}>
                Purchase
              </Text>
            </View>
            <View style={styles.shippingContainer}>
              <Text style={styles.shippingTitle}>
                Shipping Information
              </Text>
              <Text style={styles.shippingName}>
                {buyerData.fullname}
              </Text>
              <Text style={styles.shippingNumber}>
                {buyerData.phone}
              </Text>
              <Text style={styles.shippingAddress}>
                {buyerData.address}
              </Text>
            </View>
            <View style={styles.subContainer}>
              <View style={{ height: '100%', justifyContent: 'center' }}>
                <Image
                  source={{ uri: productID.productImage }}
                  alt="product name"
                  style={styles.productImage}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoName}>
                  {productID.productName}
                </Text>
                <Text style={styles.infoItem}>
                  {quantity} Item
                </Text>
                <Text style={styles.infoPrice}>
                  &#x20B1; {productID.productPrice}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>
            Total: &#x20B1; {quantity * productID.productPrice}
          </Text>
          <View style={styles.footerSubContainer}>
            <TouchableOpacity
              onPress={placeOrder}
              style={styles.btnContainer}>
              <Text style={styles.btnText}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default PurchaseScreen

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLOURS.white,
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 100,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 20,
    color: COLOURS.backgroundDark,
    padding: 12,
    backgroundColor: COLOURS.backgroundLight,
    borderRadius: 12,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 80,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOURS.backgroundPrimary
  },
  textHeader: {
    fontSize: 20,
    marginLeft: 10,
    letterSpacing: 1,
    color: COLOURS.white
  },
  shippingContainer: {
    width: '100%',
    flexDirection: 'column',
    height: 180,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: COLOURS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLOURS.backgroundMedium,
  },
  shippingTitle: {
    fontSize: 20,
    letterSpacing: 1
  },
  shippingName: {
    marginTop: 20,
    fontSize: 15,
    letterSpacing: .5
  },
  shippingNumber: {
    fontSize: 15,
    letterSpacing: .5
  },
  shippingAddress: {
    fontSize: 15,
    letterSpacing: .5
  },
  subContainer: {
    width: '100%',
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLOURS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLOURS.backgroundMedium,
    flexDirection: 'row'
  },
  productImage: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    borderRadius: 20
  },
  infoContainer: {
    height: '100%',
    alignItems: 'flex-end'
  },
  infoName: {
    fontSize: 20,
    letterSpacing: 1
  },
  infoItem: {
    marginTop: 30,
    fontSize: 15,
    letterSpacing: 0.5
  },
  infoPrice: {
    fontSize: 15,
    letterSpacing: 0.5
  },
  footerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLOURS.dirtyWhiteBackground
  },
  footerSubContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 120,
    paddingVertical: 10,
  },
  btnContainer: {
    alignSelf: 'center',
    backgroundColor: COLOURS.backgroundLight,
    width: '100%',
    padding: 10,
    borderRadius: 2
  },
  btnText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLOURS.black,
    textTransform: 'uppercase',
    textAlign: 'center'
  }

})