import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FunctionComponent} from 'react';
import {AddTV} from './addTV/AddTV';
import {Home} from './home/Home';
import {StackParamList} from './navigation';
import {SearchTV} from './searchTV/SearchDevices';
import {Welcome} from './welcome/Welcome';
import {GeneralSettings} from './home/settings/GeneralSettings';
import {TVSettings} from './home/settings/TVSettings';
import {useMyTheme} from 'theme';
import {SelectTV} from './selectTV/selectTV';
import {useRegisteredTVs} from 'services/useRegisteredTVs';

export interface Props {}

const Stack = createNativeStackNavigator<StackParamList>();

export const AppLoader: FunctionComponent<Props> = ({}) => {
  const {theme, colorScheme} = useMyTheme();
  const {data: tvs, status} = useRegisteredTVs();

  const initialRouteName = ((): keyof StackParamList => {
    if (status === 'loading') {
      return 'SearchTV';
    }

    if (tvs?.length === 0) {
      return 'Welcome';
    }

    if (tvs?.length === 1) {
      return 'Home';
    }

    return 'SelectTV';
  })();

  if (status === 'loading' || !colorScheme) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerTintColor: theme.textColor,
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
          },
          headerStyle: {
            backgroundColor:
              colorScheme === 'light' ? theme.primary[50] : theme.primary[900],
          },
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchTV"
          component={SearchTV}
          options={{title: 'Add new TV'}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
          initialParams={status === 'success' && tvs ? tvs[0] : undefined}
        />
        <Stack.Screen
          name="SelectTV"
          component={SelectTV}
          options={{title: 'Connect to'}}
        />
        <Stack.Screen
          name="AddTV"
          component={AddTV}
          options={({route}) => ({
            presentation: 'modal',
            title: `Add ${route.params.description.friendlyName}`,
          })}
        />
        <Stack.Screen
          name="GeneralSettings"
          component={GeneralSettings}
          options={{title: 'Settings'}}
        />
        <Stack.Screen
          name="TVSettings"
          component={TVSettings}
          options={{title: 'My registered tvs'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppLoader.displayName = 'AppLoader';
