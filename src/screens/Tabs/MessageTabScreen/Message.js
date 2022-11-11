import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import { COLOURS } from '../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionic from 'react-native-vector-icons/Ionicons';
import { addDoc, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, storage } from '../../../utils/firebase';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable } from 'firebase/storage';

const Message = ({ navigation, route }) => {

  const { buyerID, sellerID, userinfo, prodID } = route.params;
  const [sms, setSms] = useState("");
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
          image: doc.data().image
        }))
      );
    });
    return () => unsubscribe();
  }, [navigation]);

  const onSend = useCallback((messages = [], text, image) => {
    const sendMsg = setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const { _id, createdAt, user } = messages[0];
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
          image,
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
        image,
      }
      )
    }
    setImageURI(null)
    setSms('')
  }, []);

  const [imageURI, setImageURI] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      setImageURI(result.uri);
    }

  };

  const renderActions = () => {
    return (<View style={{
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      paddingBottom: 10,
      paddingLeft: 10
    }}>
      <TouchableOpacity style={{
        padding: 2,
      }} onPress={pickImage}>
        <MaterialCommunityIcons
          name="image"
          style={{
            fontSize: 20
          }}
        />
      </TouchableOpacity>
    </View >);
  };

  // const renderImage = () => {
  //   const source = imageURI;
  //   if (source !== null) {
  //     return (
  //       <View key={messages._id}>
  //         <Image
  //           height={156}
  //           width={242}
  //           muted={true}
  //           source={{ uri: source }}>
  //         </Image>
  //       </View>
  //     );
  //   }
  //   return <></>;
  // };

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
        text={imageURI !== null ? " ": sms}
        onInputTextChanged={text => text === "" ? setSms("") : setSms(text)}
        user={{
          _id: userinfo === sellerID ? sellerID : buyerID,
          name: userinfo === sellerID ? sellerData.fullname : buyerData?.fullname,
          avatar: userinfo === sellerID ? sellerData.photoURL : buyerData.photoURL
        }}
        alwaysShowSend={true}
        onSend={messages => onSend(messages, sms, imageURI)}
        renderActions={renderActions}
        scrollToBottom
        isAnimated
        renderAvatarOnTop
        scrollToBottomComponent={() => (
          <MaterialCommunityIcons name='chevron-double-down' size={30} color='#000' />
        )}
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
    color: COLOURS.primaryOrange,
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