import {MyText} from 'components/MyText';
import {useNavigation} from 'pages/navigation';
import React, {FunctionComponent} from 'react';
import {StyleSheet, Switch, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMyTheme} from 'theme';

export interface Props {}

export const GeneralSettings: FunctionComponent<Props> = () => {
  const navigation = useNavigation();
  const {theme, colorScheme, changeColorScheme} = useMyTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.setting}
        onPress={() => navigation.navigate('TVSettings')}>
        <MyText>Manage tvs</MyText>
        <MaterialCommunityIcons
          name="chevron-right"
          color={theme.iconColor}
          size={18}
        />
      </TouchableOpacity>
      <View style={styles.setting}>
        <MyText>Dark mode</MyText>
        <Switch
          trackColor={{false: theme.primary[300], true: theme.primary[500]}}
          thumbColor={
            colorScheme === 'dark' ? theme.accent : theme.primary[400]
          }
          ios_backgroundColor={theme.primary[600]}
          onValueChange={value =>
            value ? changeColorScheme('dark') : changeColorScheme('light')
          }
          value={colorScheme === 'dark'}
        />
      </View>
    </View>
  );
};

GeneralSettings.displayName = 'GeneralSettings';

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  setting: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
});
