import {PrimaryButton} from 'components/PrimaryButton';
import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {TV} from 'services/tvService';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from 'pages/navigation';
import {useMyTheme} from 'theme';
import {MyText} from 'components/MyText';

export interface Props {
  tv: TV;
  turnOn: () => void;
}

export const TurnedOffState: FunctionComponent<Props> = ({tv, turnOn}) => {
  const navigation = useNavigation();
  const {theme} = useMyTheme();
  return (
    <View style={styles.container}>
      <PrimaryButton
        containerStyle={styles.settings}
        onPress={() => navigation.navigate('GeneralSettings')}>
        <MaterialCommunityIcons name="cog" color={theme.iconColor} size={18} />
      </PrimaryButton>
      <MyText style={styles.header}>{tv.name} is turned off</MyText>
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
