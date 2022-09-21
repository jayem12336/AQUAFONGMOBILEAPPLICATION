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
} from 'react-native'
import SearchBarComponent from '../../../components/Searchbar/SearchBar';
import { COLOURS, Items } from '../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

const FeedTab = ({ navigation }) => {

    const [value, setValue] = useState();

    const updateSearch = (value) => {

    }
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDb();
        })

        return unsubscribe;
    }, [navigation])

    const getDataFromDb = () => {
        let productList = [];
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].category == "product") {
                productList.push(Items[index]);
            }
        }
        setProducts(productList);
    }

    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("ProductInfo", { productID: data.id })}
                style={styles.productCardContainer}
            >
                <View style={styles.productImageContainer}>
                    <Image
                        source={data.productImage}
                        style={styles.imageStyle}
                    />
                </View>
                <Text
                    style={styles.imageTextStyle}
                >
                    {data.productName}
                </Text>
                <Text>&#x20B1; {data.productPrice}</Text>
                {/* <View style={{ paddingHorizontal: 10 }}>
                    <Rating
                        //onFinishRating={(rating) => { Alert.alert('Star Rating: ' + JSON.stringify(rating)); }}
                        imageSize={28}
                        startingValue={data.rating}
                        readonly
                        style={{ paddingVertical: 10 }} />
                </View> */}
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
                <View style={styles.headerContainer}>
                    <SearchBarComponent
                        value={value}
                        updateSearch={updateSearch}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('CartTab')}>
                        <MaterialCommunityIcons name="cart" style={styles.shoppingBagIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MessageTabScreen')}>
                        <IonIcons name="mail-outline" style={styles.shoppingBagIcon} />
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.textTitleContainer}>
                    <Text style={styles.titleStyle}>
                        BulAquaPond Fisheries
                    </Text>
                    <Text style={styles.textStyle}>
                        Details about the shop.
                        {'\n'}This shop offers both products and services
                    </Text>
                </View> */}
                <View style={{ padding: 16 }}>
                    {/* <View style={styles.capstionContainer}>
                        <View style={styles.textCaptionContainer}>
                            <Text style={styles.textCapstionStyle}>Fish</Text>
                            <Text style={styles.textCapstionLengthStyle}>{Items.length}</Text>
                        </View>
                        <Text style={styles.secondaryCapstionStyle}>
                            SeeAll
                        </Text>
                    </View> */}
                    <View style={styles.productContainer}>
                        {
                            products.map((data) => {
                                return <ProductCard data={data} key={data.id} />
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FeedTab

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.backgroundPrimary,
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: -50
    },
    shoppingBagIcon: {
        fontSize: 18,
        color: COLOURS.black,
        padding: 12,
        borderRadius: 10,
        backgroundColor: COLOURS.backgroundLight
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
        justifyContent: 'space-around',
        backgroundColor: COLOURS.white,
        marginBottom: 80,
        padding: 10
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
        resizeMode: 'stretch',
        borderRadius: 10,
    },
    imageTextStyle: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '600',
        marginBottom: 5,
        //height: 30
    }
})