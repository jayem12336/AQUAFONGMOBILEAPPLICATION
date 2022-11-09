import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import { Avatar } from 'react-native-paper';
import { COLOURS } from '../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addDoc, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

const Message = ({ navigation, route }) => {

  const { buyerID, sellerID, userinfo, prodID } = route.params;

  const [messages, setMessages] = useState([]);
  const [buyerData, setBuyerData] = useState({});
  const [sellerData, setSellerData] = useState({});
  const [prodData, setProdData] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [user, setUser] = useState({})

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "feedproducts", prodID), (doc) => {
      setProdData(doc.data());
    })
    return unsub;
  }, [navigation])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", userinfo), (doc) => {
      setUser(doc.data());
    })
    return unsub;
  }, [navigation])


  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", buyerID), (doc) => {
      setBuyerData(doc.data());
    })
    return unsub;
  }, [navigation])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", sellerID), (doc) => {
      setSellerData(doc.data());
    })
    return unsub;
  }, [navigation])
  
  useEffect(() => {
    const collectionRef = collection(db, "rooms", buyerID, "chatUsers", sellerID, "messages");
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return () => unsubscribe();
  }, [navigation]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user, } = messages[0];
    try {
      if (buyerID && sellerID) {
        addDoc(collection(db,
          "rooms",
          buyerID,
          "chatUsers",
          sellerID, "messages"),
          {
            _id,
            createdAt,
            text,
            user,
          }
        )
        addDoc(
          collection(db,
            "rooms",
            sellerID,
            "chatUsers",
            buyerID, "messages"), {
          _id,
          createdAt,
          text,
          user,
        }
        );
      }
    } catch (error) {
    }
  }, []);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                onPress={() => navigation.goBack()}
                name="chevron-left"
                style={styles.backIconStyle}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.messageStyle}>
                {userinfo !== sellerID ? sellerData?.fullname : buyerData?.fullname}{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{
        paddingHorizontal: 10,
        height: '25%',
        zIndex: 1
      }}>
        <View style={{
          marginTop: 10,
          backgroundColor: COLOURS.white,
          borderRadius: 10,
          elevation: 5,
          width: '100%',
          padding: 10,
          paddingVertical: 10,
        }}
        >
          <View style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10
          }}>
            <View style={{
              width: '60%'
            }}>
              <Image
                source={{ uri: prodData.productImage }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            </View>
            <View style={{
              width: '40%'
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: '600',
                letterSpacing: 1,
                textAlign: 'right'
              }}>
                {prodData.productName}
              </Text>
              <Text style={{
                marginTop: 5,
                fontSize: 13,
                fontWeight: '600',
                letterSpacing: 1,
                textAlign: 'right'
              }}>
                &#x20B1;{prodData.productPrice}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        alwaysShowSend
        onSend={messages => onSend(messages)}
        user={{
          _id: userinfo === sellerID ? sellerID : buyerID,
          name: userinfo === sellerID ? sellerData.fullname : buyerData?.fullname,
          avatar: userinfo === sellerID ? sellerData.photoURL : buyerData.photoURL
        }}
      />
    </>
  )
}

export default Message

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomColor: COLOURS.backgroundMedium,
    borderBottomWidth: 1,
    backgroundColor: COLOURS.white
  },
  iconContainer: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  backIconStyle: {
    fontSize: 20,
    color: COLOURS.backgroundDark,
    padding: 12,
    backgroundColor: COLOURS.backgroundLight,
    borderRadius: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer: {
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageStyle: {
    fontSize: 17,
    letterSpacing: 1,
    fontWeight: 'bold'
  },
})