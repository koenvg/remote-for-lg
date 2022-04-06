import React, {FunctionComponent, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useLGConnected} from 'api/lg/LGTVProvider';
import {PrimaryButton} from 'components/PrimaryButton';
import {theme} from 'theme';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import {TV} from 'services/tvService';
import {ArrowControls} from './ArrowControls';
import {MyText} from 'components/MyText';

export interface Props {
  tv: TV;
}

export const Remote: FunctionComponent<Props> = ({}) => {
  const {api, turnOff} = useLGConnected();
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
      <View style={styles.row}>
        <PrimaryButton onPress={() => api?.press('HOME')}>
          <MaterialCommunityIcons
            name="home-outline"
            color={theme.iconColor}
            size={theme.iconSize}
          />
        </PrimaryButton>
        <PrimaryButton onPress={turnOff}>
          <MaterialCommunityIcons name="power" color={theme.red} size={24} />
        </PrimaryButton>
      </View>

      <View style={styles.arrowContainer}>
        <ArrowControls />

        <View style={[styles.row, {marginTop: -25}]}>
          <PrimaryButton onPress={() => api?.press('BACK')}>
            <MaterialCommunityIcons
              name="arrow-u-left-bottom"
              color={theme.iconColor}
              size={theme.iconSize}
            />
          </PrimaryButton>
          <PrimaryButton onPress={() => api?.press('EXIT')}>
            <MaterialCommunityIcons
              name="exit-to-app"
              color={theme.iconColor}
              size={theme.iconSize}
            />
          </PrimaryButton>
        </View>
      </View>

      <View style={styles.volumeContainer}>
        <MyText style={{color: theme.accent}}>Volume</MyText>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={0}
          maximumValue={20}
          step={1}
          value={volume}
          minimumTrackTintColor={theme.primary[400]}
          maximumTrackTintColor={theme.primary[400]}
          thumbTintColor={theme.accent}
          onValueChange={updateVolume}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  arrowContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  volumeContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginVertical: 30,
  },
});

Remote.displayName = 'Remote';
