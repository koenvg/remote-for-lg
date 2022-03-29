import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useLGTVapi} from '../api/LGTVProvider';
import {GradientButton} from '../components/GradientButton';
import {TransparentButton} from '../components/TransparentButton';
import {theme} from '../theme';

export interface Props {}

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
    // backgroundColor: 'blue',
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

  button: {
    marginHorizontal: 5,
    // flex: 1,
  },
});

export const Home: FunctionComponent<Props> = () => {
  const {api} = useLGTVapi();

  return (
    <View style={styles.container}>
      <View style={styles.topBottomContainer}>
        <GradientButton style={styles.button} onPress={() => api?.powerOff()}>
          OFF
        </GradientButton>
        <GradientButton
          style={styles.button}
          onPress={() => api?.press('HOME')}>
          HOME
        </GradientButton>
      </View>
      <View style={styles.middleContainer}>
        <LinearGradient colors={[theme[800], theme[900]]} style={styles.circle}>
          <TransparentButton style={styles.button}>Up</TransparentButton>
          <View style={styles.circleMiddleContainer}>
            <TransparentButton style={styles.button}>Left</TransparentButton>
            <TransparentButton style={styles.button}>Middle</TransparentButton>
            <TransparentButton style={styles.button}>Right</TransparentButton>
          </View>
          <TransparentButton style={styles.button}>Down</TransparentButton>
        </LinearGradient>
      </View>
      <View style={styles.topBottomContainer}></View>
    </View>
  );
};

Home.displayName = 'Home';
