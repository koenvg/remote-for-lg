import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRoute} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {LGTVProvider, useLGTV} from '../../api/lg/LGTVProvider';
import {MyText} from '../../components/MyText';
import {HomeRoute} from '../navigation';
import {Remote} from './remote/Remote';
import {VolumeControls} from './remote/VolumeControls';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme';
import {MyTabBar} from '../../components/MyTabBar';

export interface Props {}

const Tab = createBottomTabNavigator();
export const Home: FunctionComponent<Props> = () => {
  const {params: tv} = useRoute<HomeRoute['route']>();
  const value = useLGTV(tv);
  const {connected, error} = value;

  // if (error) return <MyText>{JSON.stringify(error)}</MyText>;

  // if (!connected) return <MyText>Connecting...</MyText>;

  return (
    <LGTVProvider context={value}>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        sceneContainerStyle={{backgroundColor: theme.primary[200]}}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Remote"
          component={Remote}
          options={{
            tabBarLabel: ({color}) => (
              <MaterialCommunityIcons
                name="remote-tv"
                color={color}
                size={18}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Apps"
          component={VolumeControls}
          options={{
            tabBarLabel: ({color}) => (
              <MaterialCommunityIcons name="apps" color={color} size={18} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={VolumeControls}
          options={{
            tabBarLabel: ({color}) => (
              <MaterialCommunityIcons name="cog" color={color} size={18} />
            ),
          }}
        />
      </Tab.Navigator>
    </LGTVProvider>
  );
};

Home.displayName = 'Home';
