import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {taskEither} from 'fp-ts';
import {pipe} from 'fp-ts/lib/function';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {AddTV} from './addTV/AddTV';
import {Home} from './home/Home';
import {StackParamList} from './navigation';
import {SearchDevices} from './newDevice/SearchDevices';
import {TV, tvService} from '../services/tvService';
import {theme} from '../theme';

export interface Props {}

const Stack = createNativeStackNavigator<StackParamList>();

interface Loading {
  type: 'loading';
}
interface NoDefaultTV {
  type: 'no_default_tv';
}
interface DefaultTV {
  type: 'default_tv';
  tv: TV;
}
type State = Loading | NoDefaultTV | DefaultTV;

export const AppLoader: FunctionComponent<Props> = ({}) => {
  const [state, setState] = useState<State>({type: 'loading'});

  useEffect(() => {
    pipe(
      tvService.getRegisteredTVs,
      taskEither.map((tvs): State => {
        if (tvs.length === 0) {
          return {type: 'no_default_tv'};
        }

        const defaultTV = tvs.find(tv => tv.default);

        if (!defaultTV) {
          return {type: 'no_default_tv'};
        }

        return {type: 'default_tv', tv: defaultTV};
      }),
      taskEither.map(setState),
    )();
  }, []);

  if (state.type === 'loading') {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={state.type === 'no_default_tv' ? 'SearchTV' : 'Home'}
        screenOptions={{contentStyle: {backgroundColor: theme.primary[200]}}}>
        <Stack.Screen
          name="SearchTV"
          component={SearchDevices}
          options={{title: 'Add new TV'}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
          initialParams={state.type === 'default_tv' ? state.tv : undefined}
        />
        <Stack.Screen
          name="AddTV"
          component={AddTV}
          options={({route}) => ({
            title: `Add ${route.params.description.friendlyName}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppLoader.displayName = 'AppLoader';
