/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack';
import React, { useState/*, useEffect */} from 'react'
import { ColorSchemeName, View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native'
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
import { initial_root_list, ContentMapElement, contentItemListWithId, htmlForId, htmlForMarkdownId, mdTextForId } from './ContentMap'
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
        navigation.push("SubList", { list_id: item.list_id!, title: item.cell })
        return
    } else if (item.html_id) {
        navigation.push("WebContent", { html_id: item.html_id!, title: item.cell })
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
}
let WebContentScreen: React.FC<WebContentScreen_Props> = function(props)
{
    let route = props.route
    let params = route.params
    let html = htmlForId(params.html_id)
    return (
        <View style={{ flex: 1 }}>
            <WebView
                // originWhitelist={['*']}
                source={{ html: html }}
                style={{flex: 1 }}
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
let SearchableListScreen: React.FC = (props) =>
{
    const colorScheme = useColorScheme()
    // let tintColor = Colors[colorScheme].tint
    const [search, setSearch] = useState("")
    const [displayableDataSource, setDisplayableDataSource] = useState(initial_root_list)
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
    let navigation = useNavigation()
    let rowTapped_fn = (item: ContentMapElement) => { didSelect_rowWithItem(item, navigation) }
    return (<View>
        <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text: string) => updateDataSourceWithPossibleSearchText(text)}
            onClear={(_) => updateDataSourceWithPossibleSearchText('')}
            placeholder="Search Content"
            value={search}
        />
        <FlatList
            data={displayableDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({ item }: { item: ContentMapElement }) => {
                return (<ItemView item={item} rowTapped_fn={rowTapped_fn} />) 
            }}
        />
    </View>)
}
interface SubListScreenProps
{
    route: any
}
let SubListScreen: React.FC<SubListScreenProps> = (props) =>
{
    let route = props.route
    let list_id = route.params.list_id
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
            
            <RootStack.Screen name="Home" component={SearchableListScreen} options={{ title: 'Tathagata: Translated' }} />

            <RootStack.Screen name="SubList" component={SubListScreen} options={({route}) => ({ title: (route.params! as any).title })} />

            <RootStack.Screen name="WebContent" component={WebContentScreen} options={({route}) => ({ title: (route.params! as any).title })} />

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