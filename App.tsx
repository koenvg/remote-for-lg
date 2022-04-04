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
import {QueryClient, QueryClientProvider} from 'react-query';
import {AppLoader} from './src/pages/AppLoader';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLoader />
    </QueryClientProvider>
  );
};

export default App;
