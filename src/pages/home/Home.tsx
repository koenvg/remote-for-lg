import {useRoute} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {Text} from 'react-native';
import {LGTVProvider, useLGTV} from '../../api/lg/LGTVProvider';
import {HomeRoute} from '../navigation';

import {Remote} from './Remote';

export interface Props {}

export const Home: FunctionComponent<Props> = () => {
  const {params: tv} = useRoute<HomeRoute['route']>();
  const value = useLGTV(tv);
  const {connected, error} = value;

  if (!connected) return <Text>Connecting...</Text>;

  if (error) return <Text>{JSON.stringify(error)}</Text>;

  return (
    <LGTVProvider context={value}>
      <Remote tv={tv} />
    </LGTVProvider>
  );
};

Home.displayName = 'Home';
