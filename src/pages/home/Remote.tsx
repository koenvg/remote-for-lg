import React, {FunctionComponent, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useLGTVapi} from '../../api/lg/LGTVProvider';
import {GradientButton} from '../../components/GradientButton';
import {TransparentButton} from '../../components/TransparentButton';
import {theme} from '../../theme';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import {TV} from '../../services/tvService';

export interface Props {
  tv: TV;
}

export const Remote: FunctionComponent<Props> = ({tv}) => {
  const {api} = useLGTVapi();
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    const fn = async () => {
      const status = await api?.getVolume();
      setVolume(status?.volume || 0);
    };
    fn();
  }, [api]);

  const updateVolume = (to: number) => {
    api?.setVolume(to);
    setVolume(to);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBottomContainer}>
        <GradientButton
          style={styles.button}
          onPress={() => api?.press('HOME')}>
          <MaterialCommunityIcons
            name="home-outline"
            color={theme.primary[50]}
            size={30}
          />
        </GradientButton>

        <Text style={styles.tvName}>{tv.name}</Text>
        <GradientButton style={styles.button} onPress={() => api?.powerOff()}>
          <MaterialCommunityIcons
            name="power"
            color={theme.primary[50]}
            size={30}
          />
        </GradientButton>
      </View>
      <View style={styles.middleContainer}>
        <LinearGradient
          colors={[theme.primary[800], theme.primary[900]]}
          style={styles.circle}>
          <TransparentButton
            style={styles.button}
            onPress={() => api?.press('UP')}>
            <MaterialCommunityIcons
              name="chevron-up"
              color={theme.primary[50]}
              size={30}
            />
          </TransparentButton>
          <View style={styles.circleMiddleContainer}>
            <TransparentButton
              style={styles.button}
              onPress={() => api?.press('LEFT')}>
              <MaterialCommunityIcons
                name="chevron-left"
                color={theme.primary[50]}
                size={30}
              />
            </TransparentButton>
            <TransparentButton
              style={styles.button}
              onPress={() => api?.click()}>
              <LinearGradient
                colors={['#2dd4bf', '#22d3ee']}
                style={styles.clickButton}
              />
            </TransparentButton>
            <TransparentButton
              style={styles.button}
              onPress={() => api?.press('RIGHT')}>
              <MaterialCommunityIcons
                name="chevron-right"
                color={theme.primary[50]}
                size={30}
              />
            </TransparentButton>
          </View>
          <TransparentButton
            style={styles.button}
            onPress={() => api?.press('DOWN')}>
            <MaterialCommunityIcons
              name="chevron-down"
              color={theme.primary[50]}
              size={30}
            />
          </TransparentButton>
        </LinearGradient>
        <View style={styles.row}>
          <GradientButton
            style={styles.button}
            onPress={() => api?.press('BACK')}>
            <MaterialCommunityIcons
              name="arrow-u-left-bottom"
              color={theme.primary[50]}
              size={30}
            />
          </GradientButton>
          <GradientButton
            style={styles.button}
            onPress={() => api?.press('EXIT')}>
            <MaterialCommunityIcons
              name="exit-to-app"
              color={theme.primary[50]}
              size={30}
            />
          </GradientButton>
        </View>
      </View>
      <View style={[styles.topBottomContainer, styles.volumeSlider]}>
        <Text style={{color: theme.primary[50]}}>Volume</Text>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={0}
          maximumValue={20}
          step={1}
          value={volume}
          minimumTrackTintColor={theme.primary[100]}
          maximumTrackTintColor={theme.primary[500]}
          thumbTintColor={'#22d3ee'}
          onValueChange={updateVolume}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',

    flex: 1,
  },
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    margin: 18,
    flexDirection: 'column',
  },
  middleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 9999,
    display: 'flex',
    overflow: 'hidden',
  },
  circleMiddleContainer: {
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    marginTop: -25,
  },
  button: {
    marginHorizontal: 5,
  },
  clickButton: {
    height: 60,
    width: 60,
    borderRadius: 9999,
  },
  volumeSlider: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  tvName: {
    fontSize: 18,
    alignSelf: 'center',
  },
});

Remote.displayName = 'Remote';
