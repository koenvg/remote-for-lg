import React, {FunctionComponent, useContext, useEffect, useMemo} from 'react';
import {connect, LGAPI} from './LGAPI';
import {useAppState} from '../../hooks/useAppState';
import {createMachine, assign, StateFrom} from 'xstate';
import {useMachine} from '@xstate/react';
import {wake} from '../wol';
export interface Props {
  context: LGContext;
}

interface LGContext {
  state: StateFrom<ReturnType<typeof createTVMachine>>;
  turnOn: () => void;
  turnOff: () => void;
}

const LGTVContext = React.createContext<LGContext>({} as any);

interface TVContext {
  tv: {ip: string; clientKey: string; mac?: string};
  api?: LGAPI;
}

type TVEvent =
  | {type: 'TURN_ON'}
  | {type: 'TURN_OFF'}
  | {type: 'CONNECTION_LOST'}
  | {type: 'DISCONNECT'}
  | {type: 'RECONNECT'}
  | {type: 'turnedOff'};

type TVTypestate =
  | {
      value: 'connecting';
      context: TVContext;
    }
  | {
      value: 'connected';
      context: TVContext & {api: LGAPI};
    }
  | {
      value: 'disconnected';
      context: TVContext;
    }
  | {
      value: 'turnedOff';
      context: TVContext;
    }
  | {
      value: 'turningTVOn.failed';
      context: TVContext;
    }
  | {
      value: 'turningTVOn.sendingOnSignal';
      context: TVContext;
    };

const createTVMachine = (myTv: {
  ip: string;
  clientKey: string;
  mac?: string;
}) => {
  return createMachine<TVContext, TVEvent, TVTypestate>(
    {
      context: {
        tv: myTv,
      },
      initial: 'connecting',
      states: {
        connecting: {
          id: 'connecting',
          invoke: {
            id: 'connect-to-tv',
            src: ({tv}) => connect({ip: tv.ip, clientKey: tv.clientKey}),
            onDone: {
              actions: assign<TVContext, any>({
                api: (context, event) => event.data,
              }),
              target: 'connected',
            },
            onError: 'turnedOff',
          },
        },
        connected: {
          on: {
            CONNECTION_LOST: 'connecting',
            DISCONNECT: 'disconnected',
            TURN_OFF: {
              actions: ['turningOff'],
              target: 'turnedOff',
            },
          },
        },
        disconnected: {
          on: {
            RECONNECT: 'connecting',
          },
        },
        turnedOff: {
          on: {TURN_ON: '#sendingOnSignal'},
        },
        turningTVOn: {
          initial: 'sendingOnSignal',
          states: {
            sendingOnSignal: {
              id: 'sendingOnSignal',
              invoke: {
                id: 'turning-tv-on',
                src: ({tv}) => {
                  return tv.mac ? wake(tv.mac) : Promise.resolve('');
                },
                onDone: '#connecting',
                onError: 'failed',
              },
            },
            failed: {},
          },
        },
      },
    },
    {
      actions: {
        turningOff: ({api}) => {
          api?.powerOff();
        },
      },
    },
  );
};

export const useLGTV = (tv: {ip: string; clientKey: string}): LGContext => {
  const tvMachine = useMemo(() => createTVMachine(tv), [tv]);
  const [state, dispatch] = useMachine(tvMachine);

  const appState = useAppState();

  useEffect(() => {
    if (appState !== 'active' && state.matches('connected')) {
      dispatch('DISCONNECT');
      state.context.api.close();
    }
  }, [appState, state, dispatch]);

  useEffect(() => {
    if (appState === 'active' && state.matches('disconnected')) {
      dispatch('RECONNECT');
    }
  }, [dispatch, appState, state]);

  useEffect(() => {
    if (!state.matches('connected')) return;

    const handler = () => dispatch('CONNECTION_LOST');
    state.context.api.socket.addEventListener('close', handler);

    return () =>
      state.context.api?.socket.removeEventListener('close', handler);
  }, [dispatch, state]);

  return {
    state,
    turnOff: () => dispatch('TURN_OFF'),
    turnOn: () => dispatch('TURN_ON'),
  };
};

export const LGTVProvider: FunctionComponent<Props> = ({children, context}) => {
  return (
    <LGTVContext.Provider value={context}>{children}</LGTVContext.Provider>
  );
};

LGTVProvider.displayName = 'LGTVProvider';

export const useLGConnected = () => {
  const {state, turnOff} = useContext(LGTVContext);

  if (!state.matches('connected')) {
    throw Error('Only allowed to use this hook when connected');
  }

  return {
    api: state.context.api,
    turnOff,
  };
};
