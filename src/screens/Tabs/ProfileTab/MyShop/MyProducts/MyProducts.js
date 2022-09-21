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
    useWindowDimensions
} from 'react-native';
import React from 'react';
import { COLOURS, Items } from '../../../../../utils/database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ItemsComponent from './Items'
import Sold from './Sold';

const FirstRoute = () => (
    <ScrollView contentContainerStyle={{
        paddingBottom: 60
    }}>
        <ItemsComponent />
        <ItemsComponent />
        <ItemsComponent />
        <ItemsComponent />
    </ScrollView>
);

const SecondRoute = () => (
    <Sold />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const initialLayout = { width: Dimensions.get('window').width };

const MyProducts = ({ navigation }) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Items' },
        { key: 'second', title: 'Sold' },
    ]);


    const renderTabBar = props => {
        return (
            <TabBar
                {...props}
                renderLabel={({ focused, route }) => {
                    return (
                        <Text
                            size={20}
                            category="Medium"
                            color={focused ? 'BLACK' : 'GRAY3'}>
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
                        <Text style={styles.textStyle}> My products </Text>
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
            {
                index === 0 ?
                    <View style={styles.footerContainer}>
                        <TouchableOpacity style={styles.btnContainer}>
                            <Text style={styles.btnText}>
                                Add items
                            </Text>
                        </TouchableOpacity>
                    </View> : ""
            }
        </View>
    )
}

export default MyProducts

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
        borderColor: COLOURS.backgroundMedium,
        borderBottomWidth: 2
    },
    scene: {
        flex: 1,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white
    },
    tabBar: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: COLOURS.black,
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
    subHeaderContainer: {
        flexDirection: 'row',
    },
    backIconContainer: {
        fontSize: 20,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 12,
    },
    textContainer: {
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 20,
        textTransform: 'uppercase',
        marginLeft: 5,
        letterSpacing: 1
    },
    footerContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLOURS.dirtyWhiteBackground
    },
    btnContainer: {
        alignSelf: 'center',
        backgroundColor: COLOURS.backgroundLight,
        width: '100%',
        padding: 15,
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