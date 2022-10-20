import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper';
import { COLOURS } from '../../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';

const RenderProduct = ({ data, navigation, check, userid, id, userinfo }) => {

  const [checked, setChecked] = useState(false);

  const removeItemFromCart = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: async () => {
            await deleteDoc(doc(db, "Mycart", userid, "CartOrder", id))
          }
        }
      ]
    );
  }


  const onChecked = async (id) => {
    setChecked(!checked);
    const cityRef = doc(db, "Mycart", userinfo, "CartOrder", id);
    await setDoc(cityRef, {
      checked: checked
    }, { merge: true })
  }



  return (
    <>
      <View style={{
        position: 'relative',
        paddingBottom: 68,
      }}>
        <Checkbox
          status={data.checked === true ? 'checked' : 'unchecked'}
          onPress={() => onChecked(id)}
        />
      </View>
      <TouchableOpacity style={styles.productImageContainer}>
        <Image
          source={{ uri: data.productImage }}
          style={styles.productImageStyle}
        />
      </TouchableOpacity>
      <View style={styles.producSubContainer}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={styles.productNameStyle}>
              {data.productName}
            </Text>
            <TouchableOpacity onPress={removeItemFromCart}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.productPriceStyle}>
            <Text style={styles.productPriceText}>
              &#x20B1;{data.productPrice}
            </Text>
            <Text>
              (&#x20B1;
              {data.productPrice + data.productPrice / 20})
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default RenderProduct

const styles = StyleSheet.create({
  productRoot: {
    width: '100%',
    height: 100,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    backgroundColor: COLOURS.dirtyWhiteBackground
  },
  productImageContainer: {
    width: '30%',
    height: 100,
    marginRight: 22,
    height: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImageStyle: {
    width: '100%',
    height: 80,
    resizeMode: 'stretch'
  },
  producSubContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
  },
  productNameStyle: {
    fontSize: 14,
    maxWidth: '100%',
    color: COLOURS.black,
    fontWeight: '600',
    letterSpacing: 1,
  },
  productPriceStyle: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },
  productPriceText: {
    fontSize: 14,
    fontWeight: '400',
    maxWidth: '85%',
    marginRight: 4,
  },
  productQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantitySubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIconContainer: {
    borderRadius: 100,
    padding: 4,
    borderWidth: 1,
    borderColor: COLOURS.backgroundMedium,
    opacity: 0.5,
  },
  iconStyle: {
    fontSize: 16,
    color: COLOURS.backgroundDark,
  },
  deleteIcon: {
    fontSize: 16,
    color: COLOURS.backgroundDark,
    backgroundColor: COLOURS.backgroundLight,
    padding: 8,
    borderRadius: 100,
  },
  transactButton: {
    width: 80,
    height: 25,
    backgroundColor: COLOURS.blue,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactText: {
    color: COLOURS.white,
    textTransform: 'uppercase',
    fontSize: 10
  }

})