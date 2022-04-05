import AnimatedLottieView from 'lottie-react-native';
import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
      <PrimaryButton
        style={{backgroundColor: theme.primary[700]}}
        onPress={() => navigation.replace('SearchTV')}>
        <Text style={{color: theme.primary[50]}}>Add your first tv</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          color={theme.primary[50]}
          size={14}
        />
      </PrimaryButton>
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
