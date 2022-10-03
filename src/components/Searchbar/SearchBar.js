import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput, Image
} from 'react-native';

const SearchBar = ({ value, updateSearch, style }) => {

    const [query, setQuery] = useState();
    const [error, setError] = useState();

    return (
        <View style={[styles.container, style]}>
            <View style={styles.searchContainer}>
                <View style={styles.vwSearch}>
                    <Image
                        style={styles.icSearch}
                        source={require('../../../assets/icons/ic_search.png')} />
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
                            onPress={() => setQuery('')}
                            style={styles.vwClear}>
                            <Image
                                style={styles.icClear}
                                source={require('../../../assets/icons/ic_clear.png')} />
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
    },

    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icSearch: {
        height: 18,
        width: 18
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