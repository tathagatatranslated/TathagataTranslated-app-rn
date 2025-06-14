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
        <Text style={{ width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontFamily: 'monospace', paddingBottom: 8, paddingTop: 6, fontSize: 15, borderLeftWidth: 3, backgroundColor: 'rgb(238, 238, 238)', borderLeftColor: '#ccc', paddingLeft: 10, paddingRight: 6, marginBottom: 6, marginTop: 3 }}>There are things in this world that cannot be believed.{'\n'}
However, with time, people{'\n'}
come to understand even those things.{'\n'}
What is clear even then is only this:{'\n'}
that truth and falsehood are revealed{'\n'}
within a single reality.{'\n'}
{'\n'}
Q: Who are you?{'\n'}
A: I am a Tathagata.{'\n'}
        </Text>
        <Text style={{ fontStyle: 'italic', width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontSize: 12 }}>
            from AI Translations {'>'} Books - Poetry: Traveler, Chapter 9
        </Text>
        <Text style={{ fontStyle: 'italic', width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontSize: 12 }}>
            Last Updated: May 22 2025
        </Text>
        {
            props.is_for_loading_splash ? (<Text style={{ fontStyle: 'normal', fontWeight: 'bold', width: '65%', minWidth: 320, maxWidth: 660, marginHorizontal: 'auto', fontSize: 17, marginTop: 20 }}>Downloading Content... Please Wait...</Text>) : (<></>)
        }
    </View>);
}
export default LandingContentView;
export { LandingContentViewProps }; 