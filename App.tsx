import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image, Text } from 'react-native'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import LandingContentView from './components/LandingContentView'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

    return (<SafeAreaProvider>
            { isLoadingComplete == false
                ? <LandingContentView is_for_loading_splash={true} />
                : <Navigation colorScheme={colorScheme} />
            }
        <StatusBar />
    </SafeAreaProvider>);
}
