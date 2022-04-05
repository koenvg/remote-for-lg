import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRoute} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {LGTVProvider, useLGTV} from 'api/lg/LGTVProvider';
import {MyText} from 'components/MyText';
import {HomeRoute} from '../navigation';
import {Remote} from './remote/Remote';
import {VolumeControls} from './remote/VolumeControls';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorScheme, theme} from 'theme';
import {MyTabBar} from 'components/MyTabBar';
import connectingAnimation from './connecting.json';
import AnimatedLottieView from 'lottie-react-native';
import {StyleSheet, View} from 'react-native';

export interface Props {}

const Tab = createBottomTabNavigator();
export const Home: FunctionComponent<Props> = () => {
  const {params: tv} = useRoute<HomeRoute['route']>();
  const value = useLGTV(tv);
  const {connected, error} = value;

  if (error) return <MyText>{JSON.stringify(error)}</MyText>;

  if (!connected) {
    return (
      <View style={styles.loadingContainer}>
        <AnimatedLottieView
          style={styles.loadingAnimation}
          loop
          autoPlay
          source={connectingAnimation}
        />
        <MyText style={styles.loadingHeader}>Connecting to {tv.name}</MyText>
      </View>
    );
  }

  return (
    <LGTVProvider context={value}>
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

const styles = StyleSheet.create({
  loadingHeader: {
    alignSelf: 'center',
    fontSize: 20,
  },
  loadingAnimation: {
    alignSelf: 'center',
    width: '100%',
  },
  loadingContainer: {
    marginVertical: 30,
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});
