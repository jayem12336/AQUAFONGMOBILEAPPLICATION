import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLOURS } from '../../../utils/database/Database';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Completed from './Completed';
import Cancelled from './Cancelled';
import PurchaseHistory from './PurchaseHistory';

const FirstRoute = () => (
    <ScrollView>
        <Completed />
        <Completed />
        <Completed />
        <Completed />
        <Completed />
        <Completed />
    </ScrollView>
);

const SecondRoute = () => (
    <Cancelled />
);

const ThirdRoute = () => (
    <PurchaseHistory />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});

const initialLayout = { width: Dimensions.get('window').width };

const MyOrder = ({ navigation }) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Completed' },
        { key: 'second', title: 'Cancelled' },
        { key: 'third', title: 'Purchase History' },
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
                            color={focused ? 'BLACK' : 'GRAY3'}
                            style={{textAlign: 'center'}}
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
                            style={styles.backIconStyle}
                        />
                    </TouchableOpacity>
                    <View style={styles.orderContainer}>
                        <Text style={styles.orderText}> My Orders </Text>
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

export default MyOrder

const styles = StyleSheet.create({
    root: {
        flex: 1,
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
        backgroundColor: COLOURS.white,
        marginTop: 10
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
    backIconStyle: {
        fontSize: 20,
        color: COLOURS.white,
        padding: 12,
        backgroundColor: COLOURS.backgroundPrimary,
        borderRadius: 12,
    },
    orderContainer: {
        justifyContent: 'center'
    },
    orderText: {
        fontSize: 20,
        textTransform: 'uppercase',
        marginLeft: 5,
        letterSpacing: 1
    }
})