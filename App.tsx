/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {LGTVProvider} from './src/api/LGTVProvider';
import {Home} from './src/pages/Home';
import {theme} from './src/theme';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: theme[700],
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <LGTVProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Home />
      </LGTVProvider>
    </SafeAreaView>
  );
};

export default App;
