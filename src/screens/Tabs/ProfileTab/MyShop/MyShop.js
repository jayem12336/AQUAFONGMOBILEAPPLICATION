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
} from 'react-native';
import React from 'react';
import { COLOURS } from '../../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TouchableRipple } from 'react-native-paper';

const MyShop = ({ navigation }) => {
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
                    onPress={() => navigation.goBack()}
                    name="chevron-left"
                    style={styles.backIconStyle}
                  />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.myShopText}> My Shop </Text>
                </View>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity>
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
                AQUA, ARDEZA FISH STORE
              </Text>
              <Text>
                San Rafael, Bulacan
              </Text>
            </View>
          </View>
          <View style={styles.itemsSection}>
            <Text>
              Item Status
            </Text>
            <View style={styles.itemStatusContainer}>
              <View style={styles.toShopContainer}>
                <Text>
                  0
                </Text>
                <Text style={{marginTop: 5}}>
                  To Ship
                </Text>
              </View>
              <View style={styles.toShopContainer}>
                <Text>
                  0
                </Text>
                <Text style={{marginTop: 5}}>
                  Cancelled
                </Text>
              </View>
              <View style={styles.purchaseContainer}>
                <MaterialCommunityIcons
                  name="account-supervisor"
                  style={{fontSize: 35}}
                />
                <Text style={{textAlign: 'center'}}>
                  Order History
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.footerSection}>
            <View style={styles.linkItem}>
              <TouchableOpacity onPress={() => navigation.navigate('MyProducts')}>
                <View style={styles.menuItem}>
                  <MaterialCommunityIcons name="shopping" color="black" size={25} />
                  <Text style={styles.menuItemText}>My Products</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.linkItem, {marginTop: 15}]}>
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