import AnimatedLottieView from 'lottie-react-native';
import React, {FunctionComponent} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {PrimaryButton} from '../../components/PrimaryButton';
import {theme} from '../../theme';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '../navigation';

export interface Props {}

export const Welcome: FunctionComponent<Props> = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome! Let's start by adding your first TV.
      </Text>
      <AnimatedLottieView
        style={styles.animation}
        source={require('./welcome.json')}
        autoPlay
        loop
      />
      <Button
        title="Add your first tv"
        color={theme.primary[700]}
        onPress={() => navigation.replace('SearchTV')}
      />
    </View>
  );
};

Welcome.displayName = 'Welcome';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: 30,
  },
  animation: {
    alignSelf: 'center',
    width: '120%',
  },
  container: {
    marginVertical: 30,
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    // alignItems: 'center',
  },
});
