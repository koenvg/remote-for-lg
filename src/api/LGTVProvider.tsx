import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {connect, LGAPI} from './LGAPI';
import {useAppState} from '../hooks/useAppState';
import {TV} from '../services/tvService';

export interface Props {
  context: LGContext;
}

interface LGContext {
  connected: boolean;
  error?: any;
  api?: LGAPI;
}

const LGTVContext = React.createContext<LGContext>({
  connected: false,
});

export const useLGTV = (tv: TV) => {
  const appState = useAppState();

  const [context, setContext] = useState<LGContext>({connected: false} as any);

  useEffect(() => {
    if (context.connected || appState !== 'active') return;
    const fn = async () => {
      try {
        const api = await connect({ip: tv.ip, clientKey: tv.clientKey});
        setContext({connected: true, api});
      } catch (e) {
        setContext({connected: false, error: e});
      }
    };
    fn();

    return () => context.api?.close();
  }, [appState, context.connected, tv, context.api]);

  useEffect(() => {
    if (!context.api) return;

    const handler = () => setContext({connected: false});
    context.api.socket.addEventListener('close', handler);

    return () => context.api?.socket.removeEventListener('close', handler);
  }, [context.api]);

  return context;
};

export const LGTVProvider: FunctionComponent<Props> = ({children, context}) => {
  return (
    <LGTVContext.Provider value={context}>{children}</LGTVContext.Provider>
  );
};

LGTVProvider.displayName = 'LGTVProvider';

export const useLGTVapi = () => useContext(LGTVContext);
