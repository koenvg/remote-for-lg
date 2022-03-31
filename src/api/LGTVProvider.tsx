import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {connect, LGAPI} from './LGAPI';
import {useAppState} from '../hooks/useAppState';

export interface Props {}

interface LGContext {
  connected: boolean;
  api?: LGAPI;
}

const LGTVContext = React.createContext<LGContext>({
  connected: false,
});

export const LGTVProvider: FunctionComponent<Props> = ({children}) => {
  const appState = useAppState();
  const [context, setContext] = useState<LGContext>({connected: false} as any);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (context.connected || appState !== 'active') return;
    const fn = async () => {
      try {
        const api = await connect({});
        setContext({connected: true, api});
      } catch (e) {
        setError(e as any);
      }
    };
    fn();
  }, [appState, context.connected]);

  useEffect(() => {
    if (!context.api) return;

    const handler = () => setContext({connected: false});
    context.api.socket.addEventListener('close', handler);

    return () => context.api?.socket.removeEventListener('close', handler);
  }, [context.api]);

  if (error)
    return <Text style={{color: 'white'}}>Error: {JSON.stringify(error)}</Text>;

  if (!context.connected)
    return <Text style={{color: 'white'}}>Connecting...</Text>;

  return (
    <LGTVContext.Provider value={context}>{children}</LGTVContext.Provider>
  );
};

LGTVProvider.displayName = 'LGTVProvider';

export const useLGTVapi = () => useContext(LGTVContext);
