import {PrimaryButton} from 'components/PrimaryButton';
import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TV} from 'services/tvService';
import {theme} from 'theme';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface Props {
  tv: TV;
  turnOn: () => void;
}

export const TurnedOffState: FunctionComponent<Props> = ({tv, turnOn}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{tv.name} is turned off</Text>
      <PrimaryButton onPress={turnOn} style={styles.button} radius={9999}>
        <MaterialCommunityIcons name="power" color={theme.green} size={150} />
      </PrimaryButton>
    </View>
  );
};

TurnedOffState.displayName = 'TurnedOffState';

const styles = StyleSheet.create({
  header: {
    marginBottom: 30,
    fontSize: 30,
    textAlign: 'center',
  },
  button: {},
  container: {
    margin: 30,
    flex: 1,
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center',
  },
});
