/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { ColorSchemeName, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { SearchBar } from 'react-native-elements';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName })
{
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()
//
const ItemView = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => getItem(item)}>

            <View style={styles.itemContentContainer}>
                <Text style={styles.itemLabel}>
                    {item.id}{'. '}{item.title.toUpperCase()}
                </Text>
                <Text style={styles.arrow}>{"›"}</Text>
            </View>
        
        </TouchableOpacity>
    )
}

const ItemSeparatorView = () => {
    return ( // Flat List Item Separator
        <View
            style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#C8C8C8',
            }}
        />
    );
};

const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
};

function TreeRootAppScreen() {
    //
    const colorScheme = useColorScheme();
    // let tintColor = Colors[colorScheme].tint
    //

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((responseJson) => {
            setFilteredDataSource(responseJson);
            setMasterDataSource(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const searchFilterFunction = (text: string) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter((item: any) => {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                //
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    }

    //
    return (<View>
        <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Search Content"
            value={search}
        />
        <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
        />
    </View>)
}

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Home" component={TreeRootAppScreen} options={{ title: 'Tathagata Translated' }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'stretch',
        flex: 1
    },
    itemLabel: {
        padding: 10,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        // border: "1px solid red",
    },
    arrow: {
        color: '#9E9C9E',
        lineHeight: 16,
        fontSize: 16,
        paddingHorizontal: 8,
        fontWeight: 'bold',
        marginLeft: "auto",
        marginRight: 8
        // border: "1px solid green"
    }
});