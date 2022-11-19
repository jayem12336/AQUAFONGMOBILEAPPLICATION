import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput, Image
} from 'react-native';
import { COLOURS } from '../../utils/database/Database';

const SearchBar = ({ value, updateSearch, style }) => {

    const [query, setQuery] = useState();
    const [error, setError] = useState();

    return (
        <View style={[styles.container, style]}>
            <View style={styles.searchContainer}>
                <View style={styles.vwSearch}>
                    <Ionicons
                        name="search-outline"
                        style={styles.icSearch}
                    />
                </View>

                <TextInput
                    value={query}
                    placeholder="Search"
                    style={styles.textInput}
                    onChangeText={(text) => {
                        var letters = /^$|^[a-zA-Z._\b ]+$/;
                        if (text.length > 12)
                            setError("Query too long.")
                        else if (text.match(letters)) {
                            setQuery(text)
                            updateSearch(text)
                            if (error)
                                setError(false)
                        }
                        else setError("Please only enter alphabets")
                    }}
                />
                {
                    query ?
                        <TouchableOpacity
                            onPress={() => {
                                setQuery('')
                                updateSearch('')
                            }}
                            style={styles.vwClear}>
                            <MaterialCommunityIcons
                                name="backspace-outline"
                                style={styles.icSearch}
                            />
                        </TouchableOpacity>
                        : <View style={styles.vwClear} />
                }
            </View>
            {
                error &&
                <Text style={styles.txtError}>
                    {error}
                </Text>
            }
        </View >
    )
}

export default SearchBar

const styles = StyleSheet.create({
    txtError: {
        marginTop: '2%',
        width: '89%',
        color: 'white',
    },
    vwClear: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        color: COLOURS.darkBlue
    },

    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icSearch: {
        fontSize: 20,
        color: COLOURS.primaryOrange
    },
    searchContainer:
    {
        backgroundColor: '#F9FBFC',
        width: 220,
        height: 40,
        flexDirection: 'row',
        borderRadius: 10
    },
    container: {
        alignItems: 'center',
    },
})