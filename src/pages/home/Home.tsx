import {useRoute} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {LGTVProvider, useLGTV} from 'api/lg/LGTVProvider';
import {HomeRoute} from '../navigation';
import {Text, View} from 'react-native';
import {ConnectingState} from './ConnectingState';
import {ConnectedState} from './ConnectedState';
import {TurnedOffState} from './TurnedOffState';

export interface Props {}

export const Home: FunctionComponent<Props> = () => {
  const {params: tv} = useRoute<HomeRoute['route']>();
  const value = useLGTV(tv);
  const {state, turnOn, retryConnecting} = value;

  if (state.matches('disconnected')) {
    return (
      <View>
        <Text>Disconnected from {tv.name}</Text>
      </View>
    );
  }

  if (
    state.matches('connecting') ||
    state.matches('turningTVOn.sendingOnSignal')
  ) {
    return <ConnectingState tv={tv} />;
  }

  if (state.matches('turnedOff')) {
    return (
      <TurnedOffState
        tv={tv}
        turnOn={turnOn}
        retryConnecting={retryConnecting}
      />
    );
  }

  if (state.matches('connected')) {
    return (
      <LGTVProvider context={value}>
        <ConnectedState tv={tv} />
      </LGTVProvider>
    );
  }

  return null;
};

Home.displayName = 'Home';
