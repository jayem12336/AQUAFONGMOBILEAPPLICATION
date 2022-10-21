import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CancelledOrder = ({navigation}) => {
  return (
    <View style={styles.root}>
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
              <Text style={styles.textStyle}> Cancelled Order </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CancelledOrder

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: COLOURS.backgroundLight
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
})