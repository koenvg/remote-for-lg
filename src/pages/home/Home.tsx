import {useRoute} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {LGTVProvider, useLGTV} from '../../api/lg/LGTVProvider';
import {MyText} from '../../components/MyText';
import {HomeRoute} from '../navigation';

import {Remote} from './Remote';

export interface Props {}

export const Home: FunctionComponent<Props> = () => {
  const {params: tv} = useRoute<HomeRoute['route']>();
  const value = useLGTV(tv);
  const {connected, error} = value;

  if (error) return <MyText>{JSON.stringify(error)}</MyText>;

  if (!connected) return <MyText>Connecting...</MyText>;

  return (
    <LGTVProvider context={value}>
      <Remote tv={tv} />
    </LGTVProvider>
  );
};

Home.displayName = 'Home';
