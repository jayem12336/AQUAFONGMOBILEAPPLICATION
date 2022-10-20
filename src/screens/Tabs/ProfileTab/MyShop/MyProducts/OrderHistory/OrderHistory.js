import { ActivityIndicator, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS } from '../../../../../../utils/database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../../../utils/firebase';
import AllOrders from './AllOrders';
const initialLayout = { width: Dimensions.get('window').width };

const OrderHistory = ({ navigation, route }) => {

  const { userinfo } = route.params;

  const [isLoading, setIsLoading] = useState(false)

  const [orderProducts, setOrderProducts] = useState([]);

  const [toShipProducts, setToShipProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "Orders"), where("sellerID", "==", userinfo));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        })
      });
      setOrderProducts(data);
      setIsLoading(false);
    });
    return unsubscribe;
  }, [navigation])

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "Orders"), where("sellerID", "==", userinfo), where("status", "==", "To Ship"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        })
      });
      setToShipProducts(data);
      setIsLoading(false);
    });
    return unsubscribe;
  }, [navigation])

  const FirstRoute = () => (
    <ScrollView>
      <View style={{
        marginTop: 10,
        marginBottom: 10
      }}>
        {isLoading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
            <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
          </View>
          : <>
            {orderProducts.map(({ data, id }) => (
              <AllOrders data={data} key={id} location={"allOrders"} id={id} />
            ))}
          </>
        }
      </View>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView contentContainerStyle={{
      marginTop: 10,
      marginBottom: 10
    }}>
      <Text>OnHOld</Text>
    </ScrollView>
  );

  const ThirdRoute = () => (
    <ScrollView contentContainerStyle={{
      marginTop: 10,
      marginBottom: 10
    }}>
      {isLoading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
          <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
        </View>
        : <>
          {toShipProducts.map(({ data, id }) => (
            <AllOrders data={data} key={id} location={"to ship"} id={id} />
          ))}
        </>
      }
    </ScrollView>
  );

  const FourthRoute = () => (
    <ScrollView contentContainerStyle={{
      paddingBottom: 60
    }}>
      <Text>Hello fourth</Text>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'All Orders' },
    { key: 'second', title: 'On Hold' },
    { key: 'third', title: 'To Ship' },
    { key: 'fourth', title: 'Delivered' },
  ]);


  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({ focused, route }) => {
          return (
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: focused ? COLOURS.backgroundPrimary : COLOURS.black
              }}
            >
              {route.title}
            </Text>
          );
        }}
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabBar}
      />
    );
  };
  return (
    <View style={styles.root}>
      <StatusBar
        backgroundColor={COLOURS.white}
        barStyle="dark-content"
      />
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
            <Text style={styles.textStyle}> Order History </Text>
          </View>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
        renderTabBar={renderTabBar}
      />
    </View>
  )
}

export default OrderHistory

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
    paddingVertical: 12,
    paddingHorizontal: 5,
    backgroundColor: COLOURS.backgroundPrimary,
  },
  subHeaderContainer: {
    flexDirection: 'row',
  },
  backIconContainer: {
    fontSize: 30,
    color: COLOURS.white,
    padding: 12,
    borderRadius: 12,
  },
  textContainer: {
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 20,
    textTransform: 'none',
    marginLeft: 5,
    letterSpacing: 1.5,
    color: COLOURS.white,
    fontWeight: 'bold'
  },
  scene: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOURS.white,
    paddingHorizontal: 10,
    marginTop: 1
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  indicatorStyle: {
    backgroundColor: COLOURS.backgroundPrimary,
    padding: 1.5,
    marginBottom: -2,
  },
  divider: {
    zIndex: 100,
    position: 'absolute',
    width: 1,
    height: 48,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
})