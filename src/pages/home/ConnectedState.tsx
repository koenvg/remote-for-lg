import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyTabBar} from 'components/MyTabBar';
import React, {FunctionComponent} from 'react';
import {colorScheme, theme} from 'theme';
import {Remote} from './remote/Remote';
import {TVApps} from './tvApps/TVApps';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeParamList} from 'pages/navigation';
import {GeneralSettings} from './settings/GeneralSettings';

export interface Props {}
const Tab = createBottomTabNavigator<HomeParamList>();
export const ConnectedState: FunctionComponent<Props> = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      sceneContainerStyle={{
        backgroundColor:
          colorScheme === 'light' ? theme.primary[200] : theme.primary[800],
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Remote"
        component={Remote}
        options={{
          tabBarLabel: ({color}) => (
            <MaterialCommunityIcons name="remote-tv" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Apps"
        component={TVApps}
        options={{
          tabBarLabel: ({color}) => (
            <MaterialCommunityIcons name="apps" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={GeneralSettings}
        options={{
          tabBarLabel: ({color}) => (
            <MaterialCommunityIcons name="cog" color={color} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

ConnectedState.displayName = 'ConnectedState';
