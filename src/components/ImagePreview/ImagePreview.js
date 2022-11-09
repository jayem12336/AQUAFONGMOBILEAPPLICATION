import React from 'react';
import { useState } from 'react';
import {
    useWindowDimensions,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { COLOURS } from '../../utils/database/Database';

const ImagePreview = ({ visible = false, url }) => {
    const { width, height } = useWindowDimensions();
    const [visibles, setVisibles] = useState(visible)
    return (
        visibles && (
            <View style={[style.container, { height, width }]}>
                <View style={style.loader}>

                    <View style={{
                        position: 'absolute',
                        top: 5,
                        right: 10
                    }}>
                        <TouchableOpacity onPress={() => setVisibles(false)}>
                            <Text> x </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image source={require('../../images/Jpeg/Aquarium.jpg')} alt="productImage" style={{
                            width: width,
                            height: 200,
                            resizeMode: 'contain',
                        }} />
                    </View>
                </View>
            </View>
        )
    );
};

const style = StyleSheet.create({
    loader: {
        height: '70%',
        backgroundColor: COLOURS.white,
        borderRadius: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        position: 'absolute',
        padding: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
});

export default ImagePreview;