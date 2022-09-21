import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { COLOURS } from '../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PurchaseScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
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
              Maria Falcon
            </Text>
            <Text style={styles.shippingNumber}>
              09876555367
            </Text>
            <Text style={styles.shippingAddress}>
              San Miguel,Bulacan
            </Text>
          </View>
          <View style={styles.subContainer}>
            <View style={{ height: '100%' }}>
              <Image
                source={require('../../../../images/Jpeg/Corals.jpg')}
                alt="product name"
                style={styles.productImage}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoName}>
                Gold Fish
              </Text>
              <Text style={styles.infoItem}>
                1 Item
              </Text>
              <Text style={styles.infoPrice}>
                &#x20B1; 380
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text>
          Total: &#x20B1; 380
        </Text>
        <View style={styles.footerSubContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PurchaseComplete')}
            style={styles.btnContainer}>
            <Text style={styles.btnText}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PurchaseScreen

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLOURS.white,
    height: '100%'
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
    height: '100%',
    maxWidth: 120,
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
    padding: 8,
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