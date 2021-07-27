/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack';
import React, { useState/*, useEffect */} from 'react'
import { ColorSchemeName, View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Platform, Button, Image } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { WebView } from 'react-native-webview'
//
import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import useColorScheme from '../hooks/useColorScheme'
// import Colors from '../constants/Colors'
//
//
import { initial_root_list, ContentMapElement, contentItemListWithId, htmlForId, lookedUp_contentMapElementWithListId, lookedUp_contentMapElementWithHTMLId } from './ContentMap'
import { useEffect } from 'react';
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
    rowTapped_fn: (item: ContentMapElement) => void
}
//
const ItemView: React.FC<ItemViewProps> = (props) =>
{
    let item = props.item
    //
    return (
        <TouchableOpacity onPress={() => {
            props.rowTapped_fn(item)
        }}>

            <View style={styles.itemContentContainer}>
                <View style={styles.itemLabelsContainer}>
                    <Text style={styles.itemLabels_title}>{item.cell}</Text>
                    { item.descr && item.descr != "" && typeof item.descr !== 'undefined' ? (
                    <Text style={styles.itemLabels_description}>{item.descr}</Text>
                    ) : (<></>) }
                </View>
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

const didSelect_rowWithItem = (item: ContentMapElement, navigation: any) =>
{
    if (item.list_id) {
        navigation.push("SubList", { list_id: item.list_id!/*, title: item.cell */})
        return
    } else if (item.html_id) {
        navigation.push("WebContent", { html_id: item.html_id!/*, title: item.cell */})
        return
    } else if (item.url) {
        if (Platform.OS == 'web') { // branching in order to get 'new tab' behavior on web
            window.open(item.url!, '_blank')
        } else {
            Linking.openURL(item.url!)
        }
        return
    }
    console.warn("Unable to determine how to present item:", item)
    throw new Error("Expected pushable content or list on item.")
}
//
//
interface WebContentScreen_Props
{
    // html: string
    route: any
    navigation: any
}
let WebContentScreen: React.FC<WebContentScreen_Props> = function(props)
{
    let params = props.route.params
    let html = htmlForId(params.html_id)
    //
    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(238, 238, 238)'}}>
            <WebView
                // originWhitelist={['*']}
                source={{ html: html, baseUrl:'' }}
                style={{flex: 1 }}
                onShouldStartLoadWithRequest={event => {
                    console.log("onShouldStartLoadWithRequest", event)
                    // if (!/^[data:text, about:blank]/.test(event.url)) {
                    if (event.url.slice(0,4) === 'http') {
                        Linking.openURL(event.url)
                        return false
                    }
                    return true
                }}
            >
            </WebView>
        </View>
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
    if (item.html_id) {
        normalized_item_searchableDataSet += searchNormalizedString(htmlForId(item.html_id!))
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
    let map = _filteredContentMapElementsByRuntimeUUIDWithSearchText(initialList, normalized_searchText, 'root list')
    //
    return Object.values(map)
}
function _filteredContentMapElementsByRuntimeUUIDWithSearchText(searchingItemsList: ContentMapElement[], normalized_searchText: string, list_id: string): { [key: string]: ContentMapElement }
{
    let filtered_map: { [key: string]: ContentMapElement } = {}
    if (!searchingItemsList || typeof searchingItemsList == 'undefined') {
        alert("This is a bug: searchingItemsList for '" + list_id + "' was nil")
    }
    for (var i = 0 ; i < searchingItemsList.length ; i++) {
        let item = searchingItemsList[i]
        if (item.list_id) { // recursive
            let filtered_submap = _filteredContentMapElementsByRuntimeUUIDWithSearchText(
                contentItemListWithId(item.list_id!), 
                normalized_searchText, 
                item.list_id
            )
            // console.log("filtered_submap " , filtered_submap)
            // if (filtered_submap.length > 0) {
            filtered_map = Object.assign({}, filtered_submap, filtered_map) // using a map functions as a de-dupe in case the same list is linked from multiple locations
            // }
            // v-- commented since algo might as well match title/descr too
            // continue // move to next iteration
        }
        if (__isMatchingContentItem(item, normalized_searchText)) {
            filtered_map[item.runtimeUUID!/*will not be nil if setup_content called*/] = item
        }
    }
    //
    return filtered_map
}
//
let SearchableListScreen: React.FC = (props) =>
{
    // const colorScheme = useColorScheme()
    // let tintColor = Colors[colorScheme].tint
    const [state_searchText, setState_searchText] = useState("")
    const [displayableDataSource, setDisplayableDataSource] = useState(initial_root_list)
    //
    let state_isSearching = state_searchText && typeof state_searchText !== 'undefined' ? true : false

    const updateDataSourceWithPossibleSearchText = (this_searchText: string) =>
    {
        let dataSource: any;
        let this_isSearching = this_searchText && typeof this_searchText !== 'undefined' ? true : false
        if (this_isSearching) {
            dataSource = filteredListWithSearchText(this_searchText)
        } else { // inserted text is blank - revert to 'initialRoot' data source
            let introPaneContentItem = {}
            dataSource = initial_root_list
        }
        setDisplayableDataSource(dataSource)
        setState_searchText(this_searchText)
    }
    //
    let navigation = useNavigation()
    let rowTapped_fn = (item: ContentMapElement) =>
    {
        didSelect_rowWithItem(item, navigation)
    }
    //
    return (<View>
        <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text: string) => updateDataSourceWithPossibleSearchText(text)}
            onClear={(_) => updateDataSourceWithPossibleSearchText('')}
            placeholder="Search Content"
            value={state_searchText}
        />
        { state_isSearching != true ? <View style={{ paddingBottom: 14, paddingTop: 24, backgroundColor: 'white' /* blend into intro img */ }}>
            <Image 
                source={require('../resources/specific/index_background.jpg')}
                style={{ width: 313, height: 199, marginHorizontal: 'auto' }}
            />
            <Text style={{ width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontFamily: 'monospace', paddingBottom: 8, paddingTop: 6, fontSize: 15, borderLeftWidth: 3, backgroundColor: 'rgb(238, 238, 238)', borderLeftColor: '#ccc', paddingLeft: 10, paddingRight: 6, marginBottom: 6, marginTop: 3 }}>There is something we can not believe in the world.{'\n'}
                However, as time goes by, people come to know such a thing.{'\n'}
                And then it is clear that truth and falsehood can be proven by a fact.{'\n'}
                {'\n'}
                Who are you?{'\n'}
                > I am a Tathagata.{'\n'}
            </Text>
            <Text style={{ fontStyle: 'italic', width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontSize: 12 }}>
                New Translations > Books - Poetry: The Traveler, Chapter 9
            </Text>
        </View> : <></> }
        <FlatList
            data={displayableDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            style={{ backgroundColor: 'white' }}
            renderItem={({ item }: { item: ContentMapElement }) => {
                return (<ItemView item={item} rowTapped_fn={rowTapped_fn} />) 
            }}
        />
    </View>)
}
interface SubListScreenProps
{
    route: any
    navigation: any
}
let SubListScreen: React.FC<SubListScreenProps> = (props) =>
{
    let route = props.route
    let params = route.params
    let list_id = params.list_id
    let dataItems = contentItemListWithId(list_id)
    //
    let navigation = useNavigation()
    let rowTapped_fn = (item: ContentMapElement) => { didSelect_rowWithItem(item, navigation) }
    //
    return (<View>
        <FlatList
            data={dataItems}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            style={{ backgroundColor: 'white' }}
            renderItem={({ item }: { item: ContentMapElement }) => {
                return (<ItemView item={item} rowTapped_fn={rowTapped_fn} />) 
            }}
        />
    </View>)
}
//
//
const base_screenOptions: StackNavigationOptions =
{
    cardStyle: { flex: 1 }, // to cause screen to fill full height
    //
    // headerStyle: {
        // backgroundColor: '#0099CC',
        // shadowRadius: 5,
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowColor: 'rgba(0, 0, 0, 0.25)',
        // elevation: 3,
    // },
    // headerTitleStyle: {
    //     fontWeight: 'normal',
    //     color: '#FCFBFC',
    // },
    // headerTitleAlign: 'center',
    // headerTintColor: '#fff'
}
const RootStack = createStackNavigator<RootStackParamList>()

function _navigationScreenOptionsFor_subScreen(route: any, navigation: any, optl_staticTitleOverride: string|undefined)
{
    let params = route.params
    let options: { [key: string]: any } = {}
    if (typeof optl_staticTitleOverride != 'undefined' && optl_staticTitleOverride) {
        options.title = optl_staticTitleOverride
    } else {
        if (params.title && typeof params.title !== 'undefined') { // if for some reason it's provided in params, use that - which would be convenient - but in this case, we don't want the URL to be polluted by the title so that URLs can be short and essential
            options.title = params.title
        } else {
            let item: ContentMapElement|null = null
            if (params.list_id) {
                item = lookedUp_contentMapElementWithListId(params.list_id!)
            } else if (params.html_id) {
                item = lookedUp_contentMapElementWithHTMLId(params.html_id!)
            }
            if (!item) {
                throw new Error("Item loaded in sub-screen without static title override had neither list_id nor html_id")
            }
            let title = item.cell
            options.title = title
        }
    }
    if (navigation.canGoBack() == false) { // if the page was loaded directly and does not have a back button - here's a janky way to resolve that in the UI
        options.headerLeftContainerStyle = { paddingLeft: 20 }
        options.headerTitleStyle = { paddingLeft: 30 }
        options.headerLeft = () => ( <Button title="Home" onPress={() => { navigation.replace("Home") }} /> )
    }
    return options
}

function RootNavigator()
{
    return (
        <RootStack.Navigator screenOptions={{
            // support for horizontal web animations
            animationEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            //
            ...base_screenOptions
        }}>
            
            <RootStack.Screen name="Home" component={SearchableListScreen} options={{ title: 'The Teaching of Tathagata' }} />

            <RootStack.Screen name="SubList" component={SubListScreen} 
                options={({route, navigation}) => (_navigationScreenOptionsFor_subScreen(route, navigation, undefined)) } 
            />

            <RootStack.Screen name="WebContent" component={WebContentScreen} 
                options={({route, navigation}) => (_navigationScreenOptionsFor_subScreen(route, navigation, undefined)) } 
            />

            <RootStack.Screen name="NotFound" component={NotFoundScreen}
                options={({route, navigation}) => (_navigationScreenOptionsFor_subScreen(route, navigation, "Oops!")) }
            />

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
        flex: 1,
        minHeight: 46
    },
    itemLabelsContainer: {
        paddingLeft: 14,
        paddingRight: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
        // border: "1px solid red",
    },
    itemLabels_title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    itemLabels_description: {
        fontSize: 13,
        fontStyle: 'italic'
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