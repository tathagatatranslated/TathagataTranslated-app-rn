import React, {} from 'react'
import { View, Text, Image } from 'react-native';

interface LandingContentViewProps
{
    is_for_loading_splash: boolean
}
let height_of_nav_plus_search_bars = 130
let possible = [
    {
        quote: 'There are things in the world that cannot be believed.\nYet when time passes, people can come to know even such things.\nWhat remains certain is only this: within one and the same fact,\ntruth and falsehood are both revealed.\n\nWho are you?\n> I am a Tathāgata.\n'
    }
]
let chosen_idx = 0;
let chosen_possible = possible[chosen_idx];
let quote = chosen_possible.quote
//
let LandingContentView: React.FC<LandingContentViewProps> = function(props)
{
    return (<View style={{ paddingBottom: 14, paddingTop: 24, backgroundColor: 'white' /* blend into intro img */, marginTop: props.is_for_loading_splash?height_of_nav_plus_search_bars:0 }}>
        <Image 
            source={require('../resources/specific/index_background.jpg')}
            style={{ width: 313, height: 199, marginHorizontal: 'auto' }}
        />
        <Text style={{ width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontFamily: 'monospace', paddingBottom: 8, paddingTop: 6, fontSize: 15, borderLeftWidth: 3, backgroundColor: 'rgb(238, 238, 238)', borderLeftColor: '#ccc', paddingLeft: 10, paddingRight: 6, marginBottom: 6, marginTop: 3 }}>{quote}</Text>
        <Text style={{ fontStyle: 'italic', width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontSize: 12 }}>
            from AI Translations {'>'} Books - Poetry: Traveler, Chapter 9
        </Text>
        <Text style={{ fontStyle: 'italic', width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontSize: 12 }}>
            Last Updated: Aug 17 2025
        </Text>
        {
            props.is_for_loading_splash ? (<Text style={{ fontStyle: 'normal', fontWeight: 'bold', width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontSize: 17, marginTop: 20 }}>Downloading Content... Please Wait...</Text>) : (<></>)
        }
    </View>);
}
export default LandingContentView;
export { LandingContentViewProps }; 