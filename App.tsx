import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'react-native'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

    return (<SafeAreaProvider>
            { isLoadingComplete == false
                ? <Image 
                    source={require('./resources/specific/index_background.jpg')}
                    style={{ width: 313, height: 199, marginHorizontal: 'auto', marginTop: 154 }}
                /> 
                : <Navigation colorScheme={colorScheme} />
            }
        <StatusBar />
    </SafeAreaProvider>);
}
