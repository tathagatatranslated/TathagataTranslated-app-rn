/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { ColorSchemeName, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import useColorScheme from '../hooks/useColorScheme'
import { SearchBar } from 'react-native-elements'
import { WebView } from 'react-native-webview'
// import Colors from '../constants/Colors'
//
import { initial_root_list, ContentMapElement, contentItemListWithId } from './ContentMap'
//
//
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName })
{
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    )
}
//
interface ItemViewProps
{
    item: ContentMapElement
}
//
const ItemView: React.FC<ItemViewProps> = (props) =>
{
    let item = props.item
    //
    return (
        <TouchableOpacity onPress={() => {
            didSelect_rowWithItem(item)
        }}>

            <View style={styles.itemContentContainer}>
                <Text style={styles.itemLabel}>{item.cell}</Text>
                {/* TOOD? conditionally include the chevron based on the type of item cell? (if e.g. nil .html) */}
                <Text style={styles.arrow}>{"›"}</Text>
            </View>
        
        </TouchableOpacity>
    )
}

const ItemSeparatorView = () => {
    return (
        <View style={styles.listItemSeparator} />
    )
}

const didSelect_rowWithItem = (item: ContentMapElement) =>
{
    console.log("item " , item)
}
//
//
interface WebContentScreen_Props
{
    html: string
}
let WebContentScreen: React.FC<WebContentScreen_Props> = function(props)
{
    let html = props.html
    return (
        <WebView
            // originWhitelist={['*']}
            source={{ html: html }}
        />
    )
}
//
function searchNormalizedString(aString: string)
{
    return aString.toLowerCase()
}
function __isMatchingContentItem(item: ContentMapElement, normalized_searchText: string)
{
    let normalized_item_searchableDataSet: string = searchNormalizedString(item.cell!)
    if (item.descr) {
        normalized_item_searchableDataSet += searchNormalizedString(item.descr!)
    }
    if (item.html) {
        normalized_item_searchableDataSet += searchNormalizedString(item.html!)
    }
    if (item.url) {
        normalized_item_searchableDataSet += searchNormalizedString(item.url!)
    }
    //
    return normalized_item_searchableDataSet.indexOf(normalized_searchText) > -1
}

function filteredListWithSearchText(searchText: string): ContentMapElement[]
{
    const normalized_searchText = searchNormalizedString(searchText)
    let initialList = initial_root_list
    //
    return _filteredListWithSearchText(initialList, normalized_searchText)
}
function _filteredListWithSearchText(searchingItemsList: ContentMapElement[], normalized_searchText: string): ContentMapElement[]
{
    let filteredList: ContentMapElement[] = []
    for (var i = 0 ; i < searchingItemsList.length ; i++) {
        let item = searchingItemsList[i]
        if (item.list_id) { // recursive
            filteredList = filteredList.concat(
                _filteredListWithSearchText(contentItemListWithId(item.list_id!), normalized_searchText)
            )
        }
        if (__isMatchingContentItem(item, normalized_searchText)) {
            filteredList.push(item)
        }
    }
    //
    return filteredList
}
//
function SearchableListScreen()
{
    const colorScheme = useColorScheme()
    // let tintColor = Colors[colorScheme].tint
    const [search, setSearch] = useState('')
    const [displayableDataSource, setDisplayableDataSource] = useState(initial_root_list)
    //
    const updateDataSourceWithPossibleSearchText = (searchText: string) =>
    {
        let dataSource: any;
        if (searchText && typeof searchText !== 'undefined') {
            dataSource = filteredListWithSearchText(searchText)
        } else { // inserted text is blank - revert to 'initialRoot' data source
            dataSource = initial_root_list
        }
        setDisplayableDataSource(dataSource)
        setSearch(searchText)
    }
    //
    return (<View>
        <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text) => updateDataSourceWithPossibleSearchText(text)}
            onClear={(text) => updateDataSourceWithPossibleSearchText('')}
            placeholder="Search Content"
            value={search}
        />
        <FlatList
            data={displayableDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
        />
    </View>)
}
//
//
const RootStack = createStackNavigator<RootStackParamList>()
function RootNavigator()
{
    return (
        <RootStack.Navigator screenOptions={{ headerShown: true }}>
            
            <RootStack.Screen name="Home" component={SearchableListScreen} options={{ title: 'Tathagata Translated' }} />
            <RootStack.Screen name="WebContent" component={WebContentScreen} />
            <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

        </RootStack.Navigator>
    )
}
//
//
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
    },
    listItemSeparator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
    }
})