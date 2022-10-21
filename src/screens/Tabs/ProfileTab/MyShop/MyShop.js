import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOURS } from '../../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TouchableRipple } from 'react-native-paper';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';

const MyShop = ({ navigation, route }) => {

  const { shopID, userID } = route.params;

  const [shopDetails, setShopDetails] = useState({});

  const [orderCount, setOrderCount] = useState();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", userID, "shop", shopID), (doc) => {
      console.log("Current data: ", doc.data());
      setShopDetails(doc.data());
    })
    return unsub;
  }, [navigation])

  useEffect(() => {
    const q = query(collection(db, "Orders"), where("sellerID", "==", userID), where("status", "==", "Ordered"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                data: doc.data()
            })
        });
        setOrderCount(data.length);
    });
    return unsubscribe;
}, [navigation])


  console.log(shopID);
  console.log(userID);
  console.log(shopDetails);

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={COLOURS.white}
            barStyle="dark-content"
          />
          <View
            style={{ width: '100%', paddingHorizontal: 16, }}>
            <View style={styles.headerContainer}>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    onPress={() => navigation.navigate('ProfileTab')}
                    name="chevron-left"
                    style={styles.backIconStyle}
                  />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.myShopText}> My Shop </Text>
                </View>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ShopSettings', {
                  shopID: shopID,
                  userID: userID,
                  shopDetails: shopDetails
                })}>
                  <IonIcons
                    name="settings-outline"
                    style={styles.headerIconStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <IonIcons
                    name="mail-outline"
                    style={styles.headerIconStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.userInfoSection}>
            <View>
              <Image
                source={require('../../../../../assets/icons/Shop.png')}
                alt="Shop Icon"
                style={styles.shopImageStyle}
              />
            </View>
            <View style={styles.addressContainer}>
              <Text>
                {shopDetails.businessName}
              </Text>
              <Text>
                {shopDetails.shopLocation}
              </Text>
            </View>
          </View>
          <View style={styles.itemsSection}>
            <Text>
              Item Status
            </Text>
            <View style={styles.itemStatusContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Ordered')}>
                <View style={styles.toShopContainer}>
                  <Text>
                    {orderCount}
                  </Text>
                  <Text style={{ marginTop: 5 }}>
                    Ordered
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('CancelledOrder')}>
                <View style={styles.toShopContainer}>
                  <Text>
                    0
                  </Text>
                  <Text style={{ marginTop: 5 }}>
                    Cancelled
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}>
                <View style={styles.purchaseContainer}>
                  <MaterialCommunityIcons
                    name="account-supervisor"
                    style={{ fontSize: 35 }}
                  />
                  <Text style={{ textAlign: 'center' }}>
                    Order History
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footerSection}>
            <View style={styles.linkItem}>
              <TouchableOpacity onPress={() => navigation.navigate('MyProducts', {
                shopID: shopID,
                shopDetails: shopDetails
              })}>
                <View style={styles.menuItem}>
                  <MaterialCommunityIcons name="shopping" color="black" size={25} />
                  <Text style={styles.menuItemText}>My Products</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.linkItem, { marginTop: 15 }]}>
              <TouchableOpacity onPress={() => navigation.navigate('FeedTab')}>
                <View style={styles.menuItem}>
                  <MaterialCommunityIcons name="home" color="black" size={25} />
                  <Text style={styles.menuItemText}>Back to Feed</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export default MyShop

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
  },
  userInfoSection: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: COLOURS.backgroundPrimary,
    flexDirection: 'row'
  },
  itemsSection: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: COLOURS.dirtyWhiteBackground,
  },
  footerSection: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: COLOURS.white,
    marginTop: 10
  },
  menuItem: {
    flexDirection: 'row',
  },
  menuItemText: {
    color: COLOURS.black,
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
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
  iconContainer: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center'
  },
  headerIconStyle: {
    fontSize: 25,
    color: COLOURS.backgroundDark,
    padding: 12,
    backgroundColor: COLOURS.white,
    borderRadius: 12,
    marginLeft: 5
  },
  shopImageStyle: {
    width: 70,
    height: 70
  },
  addressContainer: {
    justifyContent: 'center',
    marginLeft: 10,
    flexDirection: 'column'
  },
  itemStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  toShopContainer: {
    padding: 10,
    backgroundColor: COLOURS.backgroundPrimary,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1
  },
  purchaseContainer: {
    padding: 10,
    backgroundColor: COLOURS.backgroundPrimary,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})