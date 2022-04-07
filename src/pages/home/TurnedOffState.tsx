import {PrimaryButton} from 'components/PrimaryButton';
import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TV} from 'services/tvService';
import {colorScheme, theme} from 'theme';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from 'pages/navigation';

export interface Props {
  tv: TV;
  turnOn: () => void;
}

const color = colorScheme === 'light' ? theme.primary[800] : theme.primary[200];

export const TurnedOffState: FunctionComponent<Props> = ({tv, turnOn}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <PrimaryButton
        containerStyle={styles.settings}
        onPress={() => navigation.navigate('GeneralSettings')}>
        <MaterialCommunityIcons name="cog" color={color} size={18} />
      </PrimaryButton>
      <Text style={styles.header}>{tv.name} is turned off</Text>
      {tv.mac ? (
        <PrimaryButton onPress={turnOn} radius={9999}>
          <MaterialCommunityIcons name="power" color={theme.green} size={150} />
        </PrimaryButton>
      ) : null}
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
  settings: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  container: {
    position: 'relative',
    margin: 30,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
