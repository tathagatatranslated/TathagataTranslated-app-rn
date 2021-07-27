import React, {} from 'react'
import { View, Text, Image } from 'react-native';

interface LandingContentViewProps
{
    is_for_loading_splash: boolean
}
let height_of_nav_plus_search_bars = 130
let LandingContentView: React.FC<LandingContentViewProps> = function(props)
{
    return (<View style={{ paddingBottom: 14, paddingTop: 24, backgroundColor: 'white' /* blend into intro img */, marginTop: props.is_for_loading_splash?height_of_nav_plus_search_bars:0 }}>
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
            New Translations {'>'} Books - Poetry: The Traveler, Chapter 9
        </Text>
    </View>);
}
export default LandingContentView;
export { LandingContentViewProps }; 