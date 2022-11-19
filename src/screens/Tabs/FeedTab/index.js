import React, {
    useState,
    useEffect
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    Animated,
    FlatList,
} from 'react-native'
import SearchBarComponent from '../../../components/Searchbar/SearchBar';
import { COLOURS, Items } from '../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../../utils/firebase';
import logo1 from '../../../images/Adsfirst.png'
import logo2 from '../../../images/Adssecond.png';
import logo3 from '../../../images/Adsthird.png'

const FeedTab = ({ navigation }) => {


    const [value, setValue] = useState();

    const [productData, setProductData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [userID, setUserID] = useState('');

    const width = Dimensions.get('window').width;

    const scrollX = new Animated.Value(0);

    let position = Animated.divide(scrollX, width);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe =
            auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                    setUserID(authUser.uid)
                    const q = query(collection(db, "feedproducts"), where("userID", "!=", authUser.uid));
                    onSnapshot(q, (querySnapshot) => {
                        const data = [];
                        querySnapshot.forEach((doc) => {
                            if (doc.data().productQuantity > 0) {
                                data.push({
                                    id: doc.id,
                                    data: doc.data()
                                })
                            }
                        });
                        setProductData(data);
                        setIsLoading(false);
                    });
                } else {
                    setUserID(null)
                    setIsLoading(false);
                }
            })
        setIsLoading(false);
        return unsubscribe;
    }, [navigation])

    const updateSearch = (value) => {

    }


    const ProductCard = ({ data, productID }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("NewProductInfo", { productID: productID })}
            >
                <View style={styles.productImageContainer}>
                    <Image
                        source={{ uri: data.productImage }}
                        style={styles.imageStyle}
                    />
                </View>
                <Text
                    style={styles.imageTextStyle}
                >
                    {data.productName}
                </Text>
                <Text style={{
                    paddingLeft: 5
                }}>&#x20B1; {data.productPrice}</Text>
            </TouchableOpacity>
        )
    }
    const Item = ({ image }) => {
        return (
            <View style={{
                width: width,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 20,
                paddingHorizontal: 20
            }}>
                <Image source={image} style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'stretch'
                }} />
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <Item name={item.name} image={item.image} />
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
            <View style={styles.headerContainer}>
                <SearchBarComponent
                    value={searchTerm}
                    updateSearch={setSearchTerm}
                />
                <TouchableOpacity onPress={() => navigation.navigate('CartTab')}>
                    <MaterialCommunityIcons name="cart" style={styles.shoppingBagIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MessageTabScreen')}>
                    <IonIcons name="mail-outline" style={styles.shoppingBagIcon} />
                </TouchableOpacity>
            </View>
            <View style={{
                backgroundColor: COLOURS.primaryOrange,
                height: 300
            }}>
                <FlatList
                    data={countries}
                    horizontal
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0.8}
                    snapToInterval={width}
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )}
                />
                <View style={styles.imageListContainer}>
                    {countries.map((data, index) => {
                        let opacity = position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.2, 1, 0.2],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={index}
                                style={{
                                    width: '16%',
                                    height: 2.4,
                                    backgroundColor: COLOURS.white,
                                    opacity,
                                    marginHorizontal: 4,
                                    borderRadius: 100,
                                }}></Animated.View>
                        );
                    })
                    }
                </View>
            </View>
            <View style={{ width: '100%' }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                    <View style={styles.productContainer}>
                        {isLoading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
                                <ActivityIndicator size={50} color={COLOURS.backgroundPrimary} />
                            </View>
                            : <>
                                {productData.filter(({ data }) => data.productName.toLowerCase().includes(searchTerm.toLowerCase())).map(({ data, id }) => (
                                    <View key={id} style={styles.productCardContainer}>
                                        <ProductCard data={data} key={data.id} productID={id} />
                                    </View>
                                ))}
                            </>
                        }
                    </View>
                </ScrollView>
            </View>
        </View >
    )
}

export default FeedTab

const countries = [
    {
        id: '1',
        name: 'first ads',
        image: logo1
    },
    {
        id: '2',
        name: 'second ads',
        image: logo2
    },
    {
        id: '3',
        name: 'third ads',
        image: logo3
    },
];

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLOURS.primaryOrange,
    },
    shoppingBagIcon: {
        fontSize: 18,
        color: COLOURS.primaryOrange,
        padding: 12,
        borderRadius: 10,
        backgroundColor: COLOURS.white
    },
    cartIcon: {
        fontSize: 18,
        color: COLOURS.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        borderColor: COLOURS.backgroundLight
    },
    textTitleContainer: {
        marginBottom: 10,
        padding: 16,
        marginTop: -20
    },
    titleStyle: {
        fontSize: 26,
        color: COLOURS.black,
        fontWeight: '400',
        marginBottom: 10,
        letterSpacing: 1
    },
    textStyle: {
        fontSize: 14,
        color: COLOURS.black,
        fontWeight: '400',
        marginBottom: 10,
        letterSpacing: 1
    },
    capstionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textCaptionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textCapstionStyle: {
        fontSize: 18,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1
    },
    textCapstionLengthStyle: {
        fontSize: 14,
        color: COLOURS.black,
        fontWeight: '400',
        opacity: 0.5,
        marginLeft: 10
    },
    secondaryCapstionStyle: {
        fontSize: 14,
        color: COLOURS.blue,
        fontWeight: '400',
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: COLOURS.white,
        marginBottom: 80,
        padding: 10,
    },
    productCardContainer: {
        width: '48%',
        marginVertical: 14,
        height: 180,
        padding: 5,
        borderRadius: 10,
        backgroundColor: COLOURS.dirtyWhiteBackground,
    },
    productImageContainer: {
        width: '100%',
        height: 100,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        maxHeight: 200,
        maxWidth: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    imageTextStyle: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '600',
        marginBottom: 5,
        //height: 30
    },
    item: {
        backgroundColor: 'orange',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    imageListContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 32,
    },
})