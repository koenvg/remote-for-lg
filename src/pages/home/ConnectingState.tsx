import {MyText} from 'components/MyText';
import AnimatedLottieView from 'lottie-react-native';
import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {TV} from 'services/tvService';
import connectingAnimation from './connecting.json';

export interface Props {
  tv: TV;
}

export const ConnectingState: FunctionComponent<Props> = ({tv}) => {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        style={styles.animation}
        loop
        autoPlay
        source={connectingAnimation}
      />
      <MyText style={styles.header}>Connecting to {tv.name}</MyText>
    </View>
  );
};

ConnectingState.displayName = 'ConnectingState';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: 20,
  },
  animation: {
    alignSelf: 'center',
    width: '100%',
  },
  container: {
    marginVertical: 30,
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});
